
var demoCal = {

  width: 800,
  height: 600,
  
  unitX: 17.8,
  unitY: 42.8,
  
  force: null,
  nodes: [],
  links: [],
  nodeElements: d3.select("#field").selectAll(".node"),
  linkElements: d3.select("#field").selectAll(".link"),
  
  eventList:[],

  measure: function(){
    this.width = .9 * $(window).width();
    this.height =.9 * $(window).height();
  },
  
  init:function(){
    this.measure();
    this.unitX = this.width / 40;
    this.unitY = this.height / 14;
    $("html").css("font-size", .016 * this.height);
    
    this.force = d3.layout.force()
                            .charge(-10)
                            .linkDistance(.05*this.unitX)
                            .size([this.width,this.height])
                            .gravity(0)
                            .on("tick",this.tick);
                            
    this.nodes = this.force.nodes();
    this.links = this.force.links();

    
    this.drawField();  
    
    console.log("initialized...")
    console.log("height: " + this.height + " width: " + this.width + " unitX: " + this.unitX + " unitY: " + this.unitY);
  },
   
  mapOverField:function(){
  
    var today = new Date();
    
    this.eventList.forEach(function(d){
    
      var newNodeAnchor = {x: calcX(d) + (demoCal.unitX * .5*(.25 + d.length)),
                           y: calcY(d),
                           fixed: true}
      var newNodeText = {x: calcX(d) + demoCal.unitX*.5*(.25 + d.length),
                         y: demoCal.unitY,
                         summary: d.summary};
    
      demoCal.nodes.push(newNodeAnchor);
      demoCal.nodes.push(newNodeText);
      demoCal.links.push({source:newNodeAnchor,target:newNodeText});
    
    
    });
    
    d3.select("#field").selectAll(".node").data(this.nodes).enter().append("g").attr("class", "node");
      
    d3.select("#field").selectAll(".node").filter(function(d){
                                                                return !d.fixed;
                                                              }).append("text")
                                                              .attr("class", "summary")
                                                              .text(function(d){return d.summary;});
                                                              
                                                              
      
    d3.select("#field").selectAll(".link").data(this.links).enter().append("line").attr("class", "link");    

    this.force.start();
  
    d3.select("#field").selectAll(".event")
                      .data(this.eventList)
                      .enter()
                      .append("g").attr("class","event");
                      

    d3.selectAll(".event").append("rect")
                          .attr("width", function(d){return (demoCal.unitX * (.25 + d.length));})
                          .attr("height", .6 * demoCal.unitX)
                          .attr("x", calcX)
                          .attr("y", function(d){return  calcY(d) - (.05 * demoCal.unitX); })
                          .attr("rx", .4*demoCal.unitX)
                          .attr("ry", .2*demoCal.unitY)
                          .attr("class","eventBlock");
                                              
      function calcX(d){
        var day = d.start.getDate();
        var month = ( d.start.getMonth() - today.getMonth() + 12) % 12 + 1 ;
        
        d.start.setDate(1);
        leading = d.start.getDay();
        
        if (leading == 0) leading = 7;
        
        d.start.setDate(day);
        
        return (day + leading - 1.625) * demoCal.unitX;
      }
      
      function calcY(d){
        return demoCal.unitY * ((d.start.getMonth() - today.getMonth() + 12) % 12 + 1);
      }
  
  },
  
  
  drawField:function(){
       
    var MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT","NOV","DEC"];
    var NUMDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var DAYWEEK = ["M", "T", "W", "H", "F", "S", "S"];

    var today = new Date();
    
    d3.select("#calendar").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "field");
    
    for (var i =0; i <35; i++){
    
      //day of week
      d3.select("#field").append("text").text(DAYWEEK[ i % 7 ])
                                  .attr("x", (i + 1) * this.unitX)
                                  .attr("y", "1em" )
                                  .attr("class","dayOfWeek");
      if (i % 7 == 6){
        
        //weekend bars
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
      
      //month outlines
      d3.select("#field").append("rect").attr("width", this.unitX * (.25 + NUMDAYS[today.getMonth()]))
                                        .attr("height", .5*this.unitX)
                                        .attr("x", (leading - .5) * this.unitX)
                                        .attr("y", this.unitY * i)
                                        .attr("rx", .25*this.unitX)
                                        .attr("ry", .25*this.unitX)
                                        .attr("class","month");
      //month name title
      d3.select("#field").append("text").text(MONTHS[today.getMonth()])
                                        .attr("x", (leading - .75) * this.unitX)
                                        .attr("y", (this.unitY * i) + (.47 * this.unitX))
                                        .attr("class","monthTitle");
      
      //day numbers
      for (var j = 0; j < NUMDAYS[today.getMonth()]; j++){
            d3.select("#field").append("text").text(j + 1)
                                              .attr("x", (j + leading) * this.unitX)
                                              .attr("y", i * this.unitY+ (.35 * this.unitX))
                                              .attr("class","date");
      }
      
      today.setMonth(today.getMonth() + 1);
      
    }
    
  
  },
  
  processEvents:function(data){
  //expects a JSON object using google's RESTful calendar API v3 
  
    for (item in data.items){ 
    
      this.eventHelper(data.items[item]);
      
    }
  },

  
  eventHelper:function(item){
      var startDay;
      var endDay;
      var today = new Date();
      
      //parses the JSON for dates
      if ('date' in item.start){
             
        startDay = new Date(item.start.date);
        endDay = new Date(item.end.date);
        
        startDay.setMinutes(startDay.getMinutes() + startDay.getTimezoneOffset());  //dates need to be shifted to local timezone
        endDay.setMinutes(endDay.getMinutes() + endDay.getTimezoneOffset());
        endDay.setDate(endDay.getDate()-1);
        
      }
      else if ('dateTime' in item.start){
       
        startDay = new Date(item.start.dateTime);
        endDay = new Date(item.end.dateTime);
      }
      
      
      if (startDay < today.setDate(1)) {return;}

      
      //calculate the length of the event
      if (endDay.getMonth() == startDay.getMonth() )
      {
        //this code is for events that do not spill over the end of the month
        length = endDay.getDate() - startDay.getDate() + 1;
        if (length == 0) {length = 1;}
        
        this.eventList.push({"start":startDay,"length":length,"summary":item.summary});
        
      }
      else {
        //for events that spill over, it splits the event up and add the event
        //with a new start date on the first of the next month.

        oldDay = new Date(endDay);

        endDay.setDate(1);
        
//        console.log("spillover:");
//        console.log(item.summary);
//        console.log(endDay);
//        console.log(oldDay);

        //basically breaks the date off and recursivly calls itself to process again
        this.eventHelper({
          'start': {'dateTime': endDay.toISOString()},
          'end': {'dateTime': oldDay.toISOString()},
          'summary': item.summary
        });

        endDay.setDate(0);  //sets the first half of the broken off event so it ends on the last day of the month
        length = endDay.getDate() - startDay.getDate()+1; //the +1 is a weird bugfix relating to end of month spillover
        if (length == 0) {length = 1;}
        

        this.eventList.push({"start":startDay,"length":length,"summary":item.summary});

        
      }
  
  
  },
  
  tick: function(e) {
  
    var k = 5 * e.alpha;
      demoCal.links.forEach(function(d){
        d.source.y +=k;
        d.target.y -=k;
      });
  
    d3.select("#field").selectAll(".node").filter(function(d){return d.fixed;})
                                          .attr("cx", function(d) { return d.x; })
                                          .attr("cy", function(d) { return d.y; })
                                          
    d3.select("#field").selectAll(".node").filter(function(d){return !d.fixed;})
                                          .selectAll("text")
                                          .attr("x", function(d) { return d.x; })
                                          .attr("y", function(d) { return d.y; })                                          

    d3.select("#field").selectAll(".link").attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
  },
  

};