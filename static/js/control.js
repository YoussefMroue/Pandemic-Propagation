start_dates = [];
SARS_button = d3.select("#SARS");
H1N1_button = d3.select("#H1N1");
Coronavirus_button = d3.select("#Coronavirus");
active_buttons = [];

d3.json("/api/cases").then(function(response) {
	og_cases = response;
	cases = og_cases;

	SARS_button.on("click", function(){
		if (active_buttons.includes('SARS')){
			active_buttons = removeValue(active_buttons, 'SARS');
			cases = og_cases.filter(filterViruses);
		}
		else{
			active_buttons.push('SARS');
			cases = og_cases.filter(filterViruses);
		}
	});
	H1N1_button.on("click", function(){
		if (active_buttons.includes('H1N1')){
			active_buttons = removeValue(active_buttons, 'H1N1');
			cases = og_cases.filter(filterViruses);
		}
		else{
			active_buttons.push('H1N1');
			cases = og_cases.filter(filterViruses);
		}
	});
	Coronavirus_button.on("click", function(){
		if (active_buttons.includes('Coronavirus')){
			active_buttons = removeValue(active_buttons, 'Coronavirus');
			cases = og_cases.filter(filterViruses);
		}
		else{
			active_buttons.push('Coronavirus');
			cases = og_cases.filter(filterViruses);
		}
	});
});

d3.json("/api/deaths").then(function(response) {
	og_deaths = response;
	deaths = og_deaths;

	SARS_button.on("click", function(){
		if (active_buttons.includes('SARS')){
			active_buttons = removeValue(active_buttons, 'SARS');
			deaths = og_deaths.filter(filterViruses);
		}
		else{
			active_buttons.push('SARS');
			deaths = og_deaths.filter(filterViruses);
		}
	});
	H1N1_button.on("click", function(){
		if (active_buttons.includes('H1N1')){
			active_buttons = removeValue(active_buttons, 'H1N1');
			deaths = og_deaths.filter(filterViruses);
		}
		else{
			active_buttons.push('H1N1');
			deaths = og_deaths.filter(filterViruses);
		}
	});
	Coronavirus_button.on("click", function(){
		if (active_buttons.includes('Coronavirus')){
			active_buttons = removeValue(active_buttons, 'Coronavirus');
			deaths = og_deaths.filter(filterViruses);
		}
		else{
			active_buttons.push('Coronavirus');
			deaths = og_deaths.filter(filterViruses);
		}
	});
});


function removeValue(arr, value){
	return arr.filter(function(element){
		return element != value;
	});
}

function filterViruses(country){
	return active_buttons.includes(country.Virus)
}