var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Test 1', 'Test 2', 'Test 3'];

//Data
var d = [
		  [
			{axis:"Ball Control",value:0.56},
			{axis:"Accuracy",value:0.59},
			{axis:"Positioning",value:0.42},
			{axis:"Complex Situation Ability",value:0.48},
			{axis:"Safe Ability",value:0.34},
			{axis:"Special Shot Ability",value:0.48},
			{axis:"Break Ability",value:0.48},
		  ],
		  [
			{axis:"Ball Control",value:0.9},
			{axis:"Accuracy",value:0.9},
			{axis:"Positioning",value:0.9},
			{axis:"Complex Situation Ability",value:0.48},
			{axis:"Safe Ability",value:0.34},
			{axis:"Special Shot Ability",value:0.11},
			{axis:"Break Ability",value:0.2},
		  ],
		  [
			{axis:"Ball Control",value:0.1},
			{axis:"Accuracy",value:0.1},
			{axis:"Positioning",value:0.1},
			{axis:"Complex Situation Ability",value:0.1},
			{axis:"Safe Ability",value:0.1},
			{axis:"Special Shot Ability",value:0.5},
			{axis:"Break Ability",value:0.3},
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1,
  levels: 5,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#000")
	.text("Exam Result Statistics");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#000")
	  .text(function(d) { return d; })
	  ;	