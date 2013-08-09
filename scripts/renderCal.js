$(document).ready( function(){

  var OFFSET = 21.5;
  var WEEKSIZE = 21;

  console.log("Ok, we're in")
  var unit = $("#testMeasure").width();

  $(".weekend").css("width", 6 * unit );
  
  $("#week1").css("left", OFFSET * unit);
  $("#week2").css("left", (OFFSET + WEEKSIZE) * unit);
  $("#week3").css("left", (OFFSET + 2 * WEEKSIZE) * unit);
  $("#week4").css("left", (OFFSET + 3 * WEEKSIZE) * unit);
  $("#week5").css("left", (OFFSET + 4 * WEEKSIZE) * unit);
 



});