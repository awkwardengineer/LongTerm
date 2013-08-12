$(document).ready( function(){

  drawCalendar();
  drawWeekendBars();
 



});



function drawWeekendBars(){
  var OFFSET = 21.5;
  var WEEKSIZE = 21;

  var unit = $("#testMeasure").width();

  $(".weekend").css("width", 6 * unit );
  
  $("#week1").css("left", OFFSET * unit);
  $("#week2").css("left", (OFFSET + WEEKSIZE) * unit);
  $("#week3").css("left", (OFFSET + 2 * WEEKSIZE) * unit);
  $("#week4").css("left", (OFFSET + 3 * WEEKSIZE) * unit);
  $("#week5").css("left", (OFFSET + 4 * WEEKSIZE) * unit);

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