		var conversies =[];
        var weeknummer = [];
        var ratio = [];
        var target = 11000;
        
        $.each(weeknummer, function(i){
            $('chart').append('<a class="info'+i+'">Week '+ i+1 +'</a>');
        });
        
        
        d3.csv("dataset_target.csv", function(loadedRows) {
          rows = loadedRows;
          handleLoadedRows();
        })
        
         function handleLoadedRows() {
            $.each(rows, function(i,item){
                conversies.push(parseFloat(item.Conversies));
                weeknummer.push(parseFloat(item.Weeknummer));
                ratio.push(parseFloat(item.Ratio));
            });
            console.log(conversies);
            makeChart(conversies);
        }
       
        
 function makeChart(dataSet){

            
        // Hoogste en laagste getal in conversies[]    
	 	var conversiesMax = d3.max(conversies);
	 	var conversiesMin = d3.min(conversies);
                
        var depthColors = d3.scale.linear()
            .domain([0, target, target, conversiesMax])
            .range(["#000", "#C92E29", "#27963E", "#27BF45"] )
    
        var height = 19,
            width = 500,
            margin = 4;
    
        var chart = d3.select("#column")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", (height+margin) * conversies.length)
            .attr("align", "right")
            .attr("class", "chart");
            
        var x = d3.scale.linear()
            .domain([0, d3.max(conversies)])
            .range([0, width]);
            
        var y = d3.scale.linear()
            .domain([0, d3.max(conversies)])
            .rangeRound([0, width]);
            
      
        chart.selectAll("rect")
            .data(conversies)
            .enter().append("rect")
                .attr("x", function(d, i) {0})
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return y(d);})
                .attr("height", height)
                .attr("fill", function(d) { return depthColors(d); });
                
                
       // Labels
                
       chart.selectAll("text")
           .data(conversies)
           .enter()
           .append("text")
               .text(function(d){ return d; })
               .attr("x", function(d) { return 0 + margin; })
               .attr("y", function(d, i) { return (i*(height+margin))+((height/2)+margin); })
               .attr("fill", "#00000");
               

 
        chart.selectAll("week")
           .data(weeknummer)
           .enter()
           .append("text")
               .text(function(d){ return "week " + d; })
               .attr("x", function(d) { return (x(d) +100); }) 
               .attr("y", function(d, i) { return (i*(height+margin))+((height/2)+margin); })
               .attr("fill", "#00000");

         $("#ratio").click(function() {
         chart.selectAll("rect2")
            .data(conversies)
            .enter().append("rect")
                .attr("x", function(d, i) {  return (y(d) ) })
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return (y(d) / 10);})
                .attr("height", height )
                .attr("fill", "black")
                .attr("opacity", "0.5")
                });
        
}        
