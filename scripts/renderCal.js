$(document).ready( function(){


  drawCalendar();
  drawWeekendBars();
 
  renderEvents( getData() );
  
});



function drawWeekendBars(){
  var OFFSET = 21.5;
  var WEEKSIZE = 21;

  var UNIT = $("#testMeasure").width();

  $(".weekend").css("width", 6 * UNIT );
  
  $("#week1").css("left", OFFSET * UNIT);
  $("#week2").css("left", (OFFSET + WEEKSIZE) * UNIT);
  $("#week3").css("left", (OFFSET + 2 * WEEKSIZE) * UNIT);
  $("#week4").css("left", (OFFSET + 3 * WEEKSIZE) * UNIT);
  $("#week5").css("left", (OFFSET + 4 * WEEKSIZE) * UNIT);

}

function drawCalendar(){


 var MONTHS = new Array();
 MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT","NOV","DEC"]
 
 var NUMDAYS = new Array();
 NUMDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
 
 var today = new Date();
 var monthStart = today.getMonth();       //starts the calendar with this month's month
 var string
 
 $(".calendar").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp; T&nbsp; W&nbsp; H&nbsp; F&nbsp; S&nbsp; S&nbsp;&nbsp;M&nbsp; T&nbsp; W&nbsp; H&nbsp; F&nbsp; S&nbsp; S&nbsp;&nbsp;M&nbsp; T&nbsp; W&nbsp; H&nbsp; F&nbsp; S&nbsp; S&nbsp;&nbsp;M&nbsp; T&nbsp; W&nbsp; H&nbsp; F&nbsp; S&nbsp; S&nbsp;&nbsp;M&nbsp; T&nbsp; W&nbsp; H&nbsp; F&nbsp; S&nbsp; S&nbsp;</p>");
 
 
  for (var month in MONTHS)
  {
  
    //writes out the name of the month
    string = "<p>" + MONTHS[today.getMonth()] + "&nbsp;";

    //add leading blanks so the month starts on the correct day of the week.
    //works by setting the date to the first of the month and asking what day of the week it is.
    
    today.setDate(1);
    
    //the days are numbered 0-6, with Sunday as 0, but my calendar starts on monday
    var leading = today.getDay();
    if (leading == 0) leading = 7;
    
    while (leading > 0){
    
      string = string + " &nbsp;&nbsp;";
      leading--;
    }
        
    
    //writes out the days in each month
    for (var day = 1; day <= NUMDAYS[month]; day++){
    
      if (day < 10){
        string = string + "0"
      }
      string = string + day + " ";
      
    }
    
    string = string + "</p>"
 
    //after writing everything out, it's ok to advance the loop
    today.setMonth(today.getMonth()+1);
   
    $(".calendar").append(string);
  
  }

}

function getData()
{
  return set2;
}

function renderEvents(data){
  //expects a JSON object using google's RESTful calendar API v3
  var startDay
  var endDay
  
  
  var OFFSET = .5;
  var OFFSET_Y = 1.05;


  var UNIT = $("#testMeasure").width();
  var UNIT_Y = $("#testMeasure").height() * .75;

  
  
  for (item in data.items){
  
    //parses the JSON for dates
    if ('date' in data.items[item].start){
      
      startDay = new Date(data.items[item].start.date + "T00:00:00-0500");
      endDay = new Date(data.items[item].end.date + "T00:00:00-0500");
      
    }
    else if ('dateTime' in data.items[item].start){
     
      startDay = new Date(data.items[item].start.dateTime);
      endDay = new Date(data.items[item].end.dateTime);

    }
    
    //calculate X position in units of days of calendar space
    var x = startDay.getDate();
    console.log("x: " + data.items[item].summary + " " + startDay);
    
    startDay.setDate(1);
    if (startDay.getDay() == 0){
      x = x + 7;
    }
    else{
      x = x + startDay.getDay();
    }
    
    
    var today = new Date();
    var y = startDay.getMonth() - today.getMonth() + ( startDay.getYear() - today.getYear() ) * 12;
    console.log("y: " + y )
    
    if (y >= 0) //meaning the month is not in the past
    {

    $("<div class='event'><div class='summary'>" + data.items[item].summary + "</div></div>").css(   {"left" : UNIT * (OFFSET + 3 * x) ,"top" : UNIT_Y * (OFFSET_Y + y), "width" : 3 * UNIT } ).appendTo(".wrap") ;
    
    }
  
  }
}