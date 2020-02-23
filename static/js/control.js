var cases = d3.json("/api/cases").then(function(response) {return response;});
var deaths = d3.json("/api/deaths").then(function(response) {return response;});;

var SARS_button = d3.select("#SARS");
var H1N1_button = d3.select("#H1N1");
var coronavirus_button = d3.select("#Coronavirus");

var buttons = d3.select(".button");
buttons.on("change", function(){
	console.log(d3.event.target);
})