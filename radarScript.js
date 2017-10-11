var w = 500,
h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = [];

//Data
var d = [];

getUser()



//Options for the Radar chart, other than default
var mycfg = {
	w: w,
	h: h,
	maxValue: 1,
	levels: 5,
	ExtraWidthX: 300
}

function getUser(){
	function reqListener () {
		console.log("here1")
		var user = JSON.parse(this.responseText)
		console.log( user )
		setChart( user )
		console.log(LegendOptions)
		console.log(d)
		createChart()

	}

	var oReq = new XMLHttpRequest();

	console.log("here2")
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "/getUser");
	oReq.send();
}


function setChart(user){
	console.log("Bye")

	var exam1Length = 0
	var exam2Length = 0
	var numExams = 0

	Object.keys(user.userData).forEach(function(key){

        if(key == "Exam1"){
          exam1Length = Object.keys(user.userData.Exam1).length
        }
        if(key == "Exam2"){
          exam2Length = Object.keys(user.userData.Exam2).length
        }
    })

	

	if(exam1Length >= exam2Length){
		numExams = exam1Length
	}
	else {
		numExams = exam2Length
	}
	console.log(numExams)

	for(var i = 0; i < numExams; i++){
		var temp = []
		LegendOptions.push("Test " + (i+1))
		d.push(temp)
	}

	console.log("HERE")
	console.log(LegendOptions)

	createData(user, numExams)

}



function createData(user, numExams){  
	var exam1Scores = document.getElementById("exam1Results");
	var i = 0

	var exam1Length = 0
	var exam2Length = 0

	Object.keys(user.userData).forEach(function(key){

	    if(key == "Exam1"){
	      exam1Length = Object.keys(user.userData.Exam1).length
	    }
	    if(key == "Exam2"){
	      exam2Length = Object.keys(user.userData.Exam2).length
	    }
    })

	if(exam1Length != 0){
		Object.keys(user.userData.Exam1).forEach(function(key){

			d[i].push(
				{axis:"Ball Control",value: (user.userData.Exam1[key].ballControl * .01) / .6},
				{axis:"Accuracy",value: (user.userData.Exam1[key].accuracy * .01) / .2},
				{axis:"Positioning",value: (user.userData.Exam1[key].positioning * .01) / .2})

			i++
		});
	}


	if(exam1Length < numExams){
		d[numExams-1].push(
			{axis:"Ball Control",value:0},
			{axis:"Accuracy",value:0},
			{axis:"Positioning",value:0})
	}

	if(exam2Length < numExams){
		d[numExams-1].push(
			{axis:"Complex Situation Ability",value:0},
			{axis:"Safe Ability",value:0},
			{axis:"Special Shot Ability",value:0},
			{axis:"Break Ability",value:0})
	}

	i = 0

	if(exam2Length != 0){
		Object.keys(user.userData.Exam2).forEach(function(key){

			d[i].push(
				{axis:"Complex Situation Ability",value: (user.userData.Exam2[key].complexSituationAbility * .01) / .31},
				{axis:"Safe Ability",value: (user.userData.Exam2[key].safeAbility * .01) / .06},
				{axis:"Special Shot Ability",value: (user.userData.Exam2[key].specialShotAbility * .01) / .12},
				{axis:"Break Ability",value: (user.userData.Exam2[key].breakAbility * .01) / .05})


			i++
		});
	}
}

function createChart(){
	console.log("here3")
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
}





