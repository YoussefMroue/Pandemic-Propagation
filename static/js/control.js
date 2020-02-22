cases = d3.json("/api/cases").then(function(response) {return response;});
deaths = d3.json("/api/deaths").then(function(response) {return response;});
start_dates = []

var SARS_button = d3.select("#SARS");
var H1N1_button = d3.select("#H1N1");
var Coronavirus_button = d3.select("#Coronavirus");
var active_buttons = [];
var new_cases = cases;

SARS_button.on("click", function(){
	if (active_buttons.includes('SARS')){
		active_buttons = removeValue(active_buttons, 'SARS');
		new_cases = filterViruses(cases);
	}
	else{
		active_buttons.push('SARS');
		new_cases = filterViruses(cases);
	}
});
H1N1_button.on("click", function(){
	if (active_buttons.includes('H1N1')){
		active_buttons = removeValue(active_buttons, 'H1N1');
		new_cases = filterViruses(cases);
	}
	else{
		active_buttons.push('H1N1');
		new_cases = filterViruses(cases);
	}
});
Coronavirus_button.on("click", function(){
	if (active_buttons.includes('Coronavirus')){
		active_buttons = removeValue(active_buttons, 'Coronavirus');
		new_cases = filterViruses(cases);
	}
	else{
		active_buttons.push('Coronavirus');
		new_cases = filterViruses(cases);
	}
});

function removeValue(arr, value){
	return arr.filter(function(element){
		return element != value;
	});
}

function filterViruses(country, active_buttons){
	return active_buttons.includes(country.virus)
}

console.log(cases);