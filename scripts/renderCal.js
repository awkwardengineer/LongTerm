$(document).ready( function(){


  drawCalendar();
  drawWeekendBars();
  
  //right now, the code is written in a very bad way
  //renderEvents( getData() );
  
});



function drawWeekendBars(){
  var OFFSET = 27;
  var WEEKSIZE = 28;

  var UNIT = $("#testMeasure").width();

  $(".weekend").css("width", 8 * UNIT );
  
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
 
 $(".calendar").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp; T&nbsp;&nbsp; W&nbsp;&nbsp; H&nbsp;&nbsp; F&nbsp;&nbsp; S&nbsp;&nbsp; S&nbsp;&nbsp; M&nbsp;&nbsp; T&nbsp;&nbsp; W&nbsp;&nbsp; H&nbsp;&nbsp; F&nbsp;&nbsp; S&nbsp;&nbsp; S&nbsp;&nbsp; M&nbsp;&nbsp; T&nbsp;&nbsp; W&nbsp;&nbsp; H&nbsp;&nbsp; F&nbsp;&nbsp; S&nbsp;&nbsp; S&nbsp;&nbsp; M&nbsp;&nbsp; T&nbsp;&nbsp; W&nbsp;&nbsp; H&nbsp;&nbsp; F&nbsp;&nbsp; S&nbsp;&nbsp; S&nbsp;&nbsp; M&nbsp;&nbsp; T&nbsp;&nbsp; W&nbsp;&nbsp; H&nbsp;&nbsp; F&nbsp;&nbsp; S&nbsp;&nbsp; S&nbsp;&nbsp;</p>");
 
 
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
    
      string = string + " &nbsp;&nbsp;&nbsp;";
      leading--;
    }
        
    
    //writes out the days in each month
    for (var day = 1; day <= NUMDAYS[today.getMonth()]; day++){
    
      if (day < 10){
        string = string + "0"
      }
      string = string + day + " &nbsp;";
      
    }
    
    string = string + "</p>"
 
    //after writing everything out, it's ok to advance the loop
    today.setMonth(today.getMonth()+1);
   
    $(".calendar").append(string);
  
  }

}

function getData()
{
  return set1;
}

function renderEvents(data){
  //expects a JSON object using google's RESTful calendar API v3
  var startDay
  var endDay
  
  
  
  var OFFSET = -.5;
  var OFFSET_Y = 1.15;


  var UNIT = $("#testMeasure").width();
  var UNIT_Y = $("#testMeasure").height() * 1.33 ;

  
  
  for (item in data.items){ 
  
    var length = 1;
  
    //parses the JSON for dates
    if ('date' in data.items[item].start){
      
      startDay = new Date(data.items[item].start.date + "T00:00:00-0500");
      endDay = new Date(data.items[item].end.date + "T00:00:00-0500");
      
    }
    else if ('dateTime' in data.items[item].start){
     
      startDay = new Date(data.items[item].start.dateTime);
      endDay = new Date(data.items[item].end.dateTime);

    }
    
    //calculate the length of the even
    if ((endDay.getMonth() - startDay.getMonth() + ( endDay.getYear() - startDay.getYear() ) * 12) == 0)
    {
      //this code is for events that do not spill over the end of the month
      length = endDay.getDate() - startDay.getDate() + 1; 
      console.log('no spill: ' + data.items[item].summary);
    }
    else{
      console.log('spillover: ' + data.items[item].summary);
//      endDay.setMonth(endDay.getMonth()+1);
      endDay.setDate(0);
      console.log(startDay.getDate());
      console.log(endDay.getDate());
      console.log(endDay.getMonth());
      length = endDay.getDate() - startDay.getDate() + 1; 
    }
    
    
    
    //calculate X position in units of days of calendar space
    var x = startDay.getDate();
    //console.log("x: " + data.items[item].summary + " " + startDay);
    
    startDay.setDate(1);
    if (startDay.getDay() == 0){
      x = x + 7;
    }
    else{
      x = x + startDay.getDay();
    }    
        
    //calculates the Y position in units of calendar space
    // also hides out of range events
    var today = new Date();
    var y = startDay.getMonth() - today.getMonth() + ( startDay.getYear() - today.getYear() ) * 12;
    //console.log("y: " + y )
    
    if (y >= 0) //meaning the month is not in the past
    {

    $("<div class='event'><div class='summary'>" + data.items[item].summary + "</div></div>").css(   {"left" : UNIT * (OFFSET + 4 * x) ,"top" : UNIT_Y * (OFFSET_Y + y), "width" : 4 * UNIT * length - 8 } ).appendTo(".wrap") ;
    
    }
  
  }
}