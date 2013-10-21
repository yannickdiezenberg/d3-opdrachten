		var visitA = [];
		var visitB = [];
		var visitnewA = [];
		var visitnewB = [];
		var data = visitA;
        var    clicks = 0;
        
             
        d3.csv("dataset_abtest.csv", function(loadedRows) {
          rows = loadedRows;
          handleLoadedRows();
        })
        
         function handleLoadedRows() {
            $.each(rows, function(i,item){
                if (item.Version == "A") visitA.push(parseFloat(item.Visit));
                if (item.Version == "B")visitB.push(parseFloat(item.Visit));
                if (item.Version == "A") visitnewA.push(parseFloat(item.VisitNew));
                if (item.Version == "B")visitnewB.push(parseFloat(item.VisitNew));


            });

            makeChart(visitA);
            makeChart(visitB);
        }
       
       

 function makeChart(dataset){
    
        var height = 19,
            width = 500,
            margin = 4;
            
            
        var chart1 = d3.select("#column2")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", (height+margin) * visitA.length)
            .attr("align", "right")
            .attr("class", "chart");
    
        var chart2 = d3.select("#column2")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", (height+margin) * visitB.length)
            .attr("align", "right")
            .attr("class", "chart");
            
            
            

            
        var visitBMax = d3.max(visitB);
        var visitBMin = d3.min(visitB);
        var visitAMax = d3.max(visitA);
        var visitAMin = d3.min(visitA);
/*            
            if (visitA > visitB) {
	        var depthColorsA = d3.scale.linear()
            .domain([0, visitAMax ])
            .range(["#37748b", "#82cce7"] )
        } else  {
	        var depthColorsA = d3.scale.linear()
            .domain([0, visitAMax ])
            .range(["#000", "#FFFFF"] )
        }; 

*/
				
	    var depthColorsA = d3.scale.linear()
            .domain([0, visitAMax ])
            .range(["#37748b", "#82cce7"] )
	     
            
        var depthColorsB = d3.scale.linear()
            .domain([visitBMin, visitBMax ])
            .range(["#37748b", "#82cce7"] )
   
   
        
        var x = d3.scale.linear()
            .domain([0, d3.max(visitB)])
            .range([0, width]);
           
        var y = d3.scale.linear()
            .domain([0, d3.max(visitB)])
            .rangeRound([0, width]);
            

        chart1.selectAll("rect")
            .data(visitA)
            .enter().append("rect")
                .attr("x", function(d, i) {return y(visitBMax)-y(visitA[i]) - 15})
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return y(d);})
                .attr("height", height)
                .attr("fill", function(d, i) { 
	                if(visitA[i] > visitB[i]) {
		                return "#72cd8a";}
		                if (visitA[i] < visitB[i]) {
			                return "#be3737";}
			                else {
				                return "#369697";}
        }
      );


                
       chart1.selectAll("text")
           .data(visitA)
           .enter()
           .append("text")
               .text(function(d){ return d; })
               .attr("x", function(d, i) { return y(visitBMax)-y(visitA[i]) - 55 })
               .attr("y", function(d, i) { return (i*(height+margin))+((height/2)+margin); })
               .attr("fill", "#00000");
               
               
         chart2.selectAll("text")
           .data(visitB)
           .enter()
           .append("text")
               .text(function(d){ return d; })
               .attr("x", function(d, i) { return y(visitB[i]) + 10 })
               .attr("y", function(d, i) { return (i*(height+margin))+((height/2)+margin); })
               .attr("fill", "#00000");
               
                         
      
        chart2.selectAll("rect")
            .data(visitB)
            .enter().append("rect")
                .attr("x", function(d, i) {0})
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return y(d);})
                .attr("height", height)
                .attr("fill", function(d, i) { 
	                if(visitB[i] > visitA[i]) {
		                return "#72cd8a";}
		                if (visitB[i] < visitB[i]) {
			                return "#be3737";}
			                else {
				                return "#369697";}
        }
      );
      
      
         chart1.selectAll("rect2")
            .data(visitnewA)
            .enter().append("rect")
                .attr("x", function(d, i) {return y(visitBMax)-y(visitA[i]) - 15})
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return (y(d));})
                .attr("height", height )
                .attr("fill", function(d, i) { 
	                if(visitnewA[i] > visitnewB[i]) {
		                return "#72cd8a";}
		                if (visitnewA[i] < visitnewB[i]) {
			                return "#be3737";}
			                else {
				                return "#369697";}
        }
      );

                
                
                
         chart2.selectAll("rect2")
            .data(visitnewB)
            .enter().append("rect")
                .attr("x", function(d, i) {return 0})
                .attr("y", function(d, i) { return i * (height + margin);})
                .attr("width", function(d) { return (y(d) );})
                .attr("height", height )    
                .attr("fill", function(d, i) { 
	                if(visitnewB[i] > visitnewA[i]) {
		                return "#72cd8a";}
		                if (visitnewB[i] < visitnewB[i]) {
			                return "#be3737";}
			                else {
				                return "#369697";}

		}
      );


      

                console.log(visitnewA);
                console.log(visitnewB);
       
}      


