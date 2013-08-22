$(document).ready( function(){


  renderCal.init();
  
  testDate = new Date();
  
  renderCal.drawEvent(testDate,2,"blah blah");
  
  testDate.setMonth(7);
  testDate.setDate(8);
  renderCal.drawEvent(testDate,4,"blah blah");
  
  testDate.setMonth(12);
  testDate.setDate(3);
  renderCal.drawEvent(testDate,2,"blah blah");
  
  testDate.setMonth(1);
  testDate.setDate(2);
  renderCal.drawEvent(testDate,5,"blah blah");
  
  
});

var renderCal = {

  width: 800,
  height: 600,
  
  unitX: 17.8,
  unitY: 42.8,

  measure: function(){
    this.width = .9 * $(window).width();
    this.height =.9 * $(window).height();
  },
  
  init:function(){
    this.measure();
    this.unitX = this.width / 40;
    this.unitY = this.height / 14;
    
    this.drawField();  
    
    console.log("initialized...")
    console.log("height: " + this.height + " width: " + this.width + " unitX: " + this.unitX + " unitY: " + this.unitY);
  },
  
  drawEvent:function(startDate, length,summary){
  
    var today = new Date();
    var day = startDate.getDate();
    var month = ( startDate.getMonth() - today.getMonth() + 12) % 12 + 1 ;
    
    startDate.setDate(1);
    leading = startDate.getDay();
    if (leading == 0) leading = 7;
    
    d3.select("#field").append("rect").attr("width", this.unitX * (.25 + length))
                                        .attr("height", .8*this.unitX)
                                        .attr("x", (day + leading - 1.625) * this.unitX)
                                        .attr("y", this.unitY * month - .17*this.unitX)
                                        .attr("rx", .4*this.unitX)
                                        .attr("ry", .2*this.unitX)
                                        .attr("class","event");
                                        
    d3.select("#field").append("text").text(summary)
                                  .attr("x", (day + leading - 1.625 + .5*(.25 + length)) * this.unitX)
                                  .attr("y", this.unitY * month - .17*this.unitX)
                                  .attr("class","summary");
  
  },
  
  drawField:function(){
       
    var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT","NOV","DEC"];
    var NUMDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var DAYWEEK = ["M", "T", "W", "H", "F", "S", "S"];

    var today = new Date();
    
    d3.select("#calendar").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "field");
    
    for (var i =0; i <35; i++){
    
      d3.select("#field").append("text").text(DAYWEEK[ i % 7 ])
                                  .attr("x", (i + 1) * this.unitX)
                                  .attr("y", "1em" )
                                  .attr("class","date");
      if (i % 7 == 6){
        d3.select("#field").append("rect").attr("width", .9*this.unitX )
                                        .attr("height", 13.5 * this.unitY)
                                        .attr("x", (i-.505) * this.unitX)
                                        .attr("y", 0)
                                        .attr("rx", .5*this.unitX)
                                        .attr("ry", .5*this.unitX)
                                        .attr("class","weekend");
        d3.select("#field").append("rect").attr("width", .9*this.unitX )
                                        .attr("height", 13.5 * this.unitY)
                                        .attr("x", (i+.505) * this.unitX)
                                        .attr("y", 0)
                                        .attr("rx", .5*this.unitX)
                                        .attr("ry", .5*this.unitX)
                                        .attr("class","weekend");
      }
    }
    
    for (var i = 1; i <=12; i++){
    
      //add leading blanks so the month starts on the correct day of the week.
      //works by setting the date to the first of the month and asking what day of the week it is.
      
      
      
      
      
      today.setDate(1);
      
      //the days are numbered 0-6, with Sunday as 0, but my calendar starts on monday
      var leading = today.getDay();
      if (leading == 0) leading = 7;
      
      d3.select("#field").append("rect").attr("width", this.unitX * (.25 + NUMDAYS[today.getMonth()]))
                                        .attr("height", .5*this.unitX)
                                        .attr("x", (leading - .5) * this.unitX)
                                        .attr("y", this.unitY * i)
                                        .attr("rx", .25*this.unitX)
                                        .attr("ry", .25*this.unitX)
                                        .attr("class","month");
      d3.select("#field").append("text").text(MONTHS[today.getMonth()])
                                        .attr("x", leading * this.unitX)
                                        .attr("y", this.unitY * i)
                                        .attr("class","date");
                                        
      for (var j = 0; j < NUMDAYS[today.getMonth()]; j++){
            d3.select("#field").append("text").text(j + 1)
                                              .attr("x", (j + leading) * this.unitX)
                                              .attr("y", i * this.unitY + .33*this.unitX)
                                              .attr("class","date");
      }
      
      today.setMonth(today.getMonth() + 1);
      
    }
    
  
  }
  
  
  

};



/*

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
  
  for (item in data.items){ 
  
    render(data.items[item]);
    
  }
}

function render(item)
{
  var startDay
  var endDay
  
  var OFFSET = -.5;
  var OFFSET_Y = 1.15;

  var UNIT = $("#testMeasure").width();
  var UNIT_Y = $("#testMeasure").height() * 1.33 ;

  var length = 1;

  //parses the JSON for dates
  if ('date' in item.start){
    
    startDay = new Date(item.start.date + "T00:00:00-0500");
    endDay = new Date(item.end.date + "T00:00:00-0500");
    
  }
  else if ('dateTime' in item.start){
   
    startDay = new Date(item.start.dateTime);
    endDay = new Date(item.end.dateTime);

  }

  //calculate the length of the event
  if ((endDay.getMonth() - startDay.getMonth() + ( endDay.getYear() - startDay.getYear() ) * 12) == 0)
  {
    //this code is for events that do not spill over the end of the month
    length = endDay.getDate() - startDay.getDate() + 1; 
    
  }
  else{
    //for events that spill over, it splits the event up and add the event
    //with a new start date on the first of the next month.

    oldDay = new Date(endDay);

    endDay.setDate(1);
    console.log(endDay);

    //basically breaks the date off and recursivly calls itself to render again
    render({
      'start': {'dateTime': endDay.toISOString()},
      'end': {'dateTime': oldDay.toISOString()},
      'summary': item.summary
    });

    endDay.setDate(0);
    length = endDay.getDate() - startDay.getDate() + 1; 
    
  }



  //calculate X position in units of days of calendar space
  var x = startDay.getDate();
  //console.log("x: " + data.item.summary + " " + startDay);

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

  $("<div class='event'><div class='summary'>" + item.summary + "</div></div>").css(   {"left" : UNIT * (OFFSET + 4 * x) ,"top" : UNIT_Y * (OFFSET_Y + y), "width" : 4 * UNIT * length - 8 } ).appendTo(".wrap") ;
  }
  
}
*/  