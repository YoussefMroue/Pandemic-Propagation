start_dates = [];
SARS_button = d3.select("#SARS");
H1N1_button = d3.select("#H1N1");
Coronavirus_button = d3.select("#Coronavirus");
active_buttons = [];
last_button = [""];
slider = document.getElementById("myRange");
sliderLabel = document.getElementById("DayLabel");

cases_promise = d3.json("/api/cases");
deaths_promise = d3.json("/api/deaths");

Promise.all([cases_promise,deaths_promise]).then(data => {
	const og_cases = data[0];
	const og_deaths = data[1];
	cases = og_cases;
	deaths = og_deaths;
	sliderLabel.innerText = 'Day 116';
	bubblecheckbox = document.getElementById('bubblecheck');
	initialBuild(cases, deaths, slider.value);
	SARS_button.on("click", function(){
	    if (active_buttons.includes('SARS')){
      		active_buttons = removeValue(active_buttons, 'SARS');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			SARS_button.style("background-color","#A9A9A9");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);
	    }
	    else{
			active_buttons.push('SARS');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			SARS_button.style("background-color","#337AB7");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);
	    }
	});
	H1N1_button.on("click", function(){
	    if (active_buttons.includes('H1N1')){
			active_buttons = removeValue(active_buttons, 'H1N1');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			H1N1_button.style("background-color","#A9A9A9");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths, style_h1n1);
	    }
	    else{
			active_buttons.push('H1N1');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			H1N1_button.style("background-color","#337AB7");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);
	    }
	});
	Coronavirus_button.on("click", function(){
	    if (active_buttons.includes('Coronavirus')){
			active_buttons = removeValue(active_buttons, 'Coronavirus');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			Coronavirus_button.style("background-color","#A9A9A9");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);
	    }
	    else{
			active_buttons.push('Coronavirus');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			Coronavirus_button.style("background-color","#337AB7");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);
	    }
	});

	slider.onchange = function(){
		sliderLabel.innerText = 'Day ' + String(slider.value);
		slideBuild(cases, deaths, slider.value, og_cases, og_deaths);
	}
	function bubblecheckfunction(){
		bubbleValues(cases,deaths,slider.value);
	}
});


function removeValue(arr, value){
	return arr.filter(function(element){
		return element != value;
	});
}

function filterViruses(country){
 	return active_buttons.includes(country.Virus);
}

function filterLast(country){
	if (active_buttons.length > 0){
		last_button = active_buttons.slice(-1);
	}
	return last_button.includes(country.Virus);
}

function initialBuild(cases, deaths, slide_num){
	makeMap(cases, deaths, slide_num);
	confirmedCasesData(cases, slide_num);
	deathCasesData(deaths, slide_num);
	totalLabels(cases, deaths, slide_num);
}

function buttonBuild(cases, deaths, slide_num, last_cases, last_deaths){
	drawGlobe(last_cases);
	bubbleValues(cases, deaths, slide_num);
	makeMap(cases, deaths, slide_num);
	drawComparisonChart(last_cases, last_deaths);
	totalLabels(cases, deaths, slide_num);
}

function slideBuild(cases, deaths, slide_num, og_cases, og_deaths){
	bubbleValues(cases, deaths, slide_num);
	makeMap(cases, deaths, slide_num);
	confirmedCasesData(og_cases, slide_num);
	deathCasesData(og_deaths, slide_num);
	totalLabels(cases, deaths, slide_num);
}