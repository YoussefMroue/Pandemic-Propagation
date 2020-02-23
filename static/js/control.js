start_dates = [];
SARS_button = d3.select("#SARS");
H1N1_button = d3.select("#H1N1");
Coronavirus_button = d3.select("#Coronavirus");
active_buttons = [];

slider = document.getElementById("myRange");

cases_promise = d3.json("/api/cases");
deaths_promise = d3.json("/api/deaths");


Promise.all([cases_promise,deaths_promise]).then(data => {
	const og_cases = data[0];
	const og_deaths = data[1];
	cases = og_cases;
	deaths = og_deaths;
	buildPage(cases, deaths, slider.value);
	SARS_button.on("click", function(){
		console.log(active_buttons);
	    if (active_buttons.includes('SARS')){
	      active_buttons = removeValue(active_buttons, 'SARS');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	    else{
	      active_buttons.push('SARS');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	});
	H1N1_button.on("click", function(){
	    if (active_buttons.includes('H1N1')){
	      active_buttons = removeValue(active_buttons, 'H1N1');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	    else{
	      active_buttons.push('H1N1');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	});
	Coronavirus_button.on("click", function(){
	    if (active_buttons.includes('Coronavirus')){
	      active_buttons = removeValue(active_buttons, 'Coronavirus');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	    else{
	      active_buttons.push('Coronavirus');
	      cases = og_cases.filter(filterViruses);
	      deaths = og_deaths.filter(filterViruses);
		  buildPage(cases, deaths, slider.value);
	    }
	});

	slider.onchange = function(){
		buildPage(cases, deaths, slider.value);
	}
	
});


function removeValue(arr, value){
  return arr.filter(function(element){
    return element != value;
  });
}

function filterViruses(country){
  return active_buttons.includes(country.Virus)
}

function buildPage(cases, deaths, slide_num){
	drawGlobe(cases);
	bubbleValues(cases, deaths, slide_num);
	makeMap(cases,deaths);
}