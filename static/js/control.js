start_dates = [];
SARS_button = d3.select("#SARS");
H1N1_button = d3.select("#H1N1");
Coronavirus_button = d3.select("#Coronavirus");
active_buttons = [];
last_button = [""];
slider = document.getElementById("myRange");
sliderLabel = document.getElementById("DayLabel");

//having loaded our page's interactive elements and defined some global variables for use in other scripts,
//we read in our data

cases_promise = d3.json("/api/cases");
deaths_promise = d3.json("/api/deaths");

Promise.all([cases_promise,deaths_promise]).then(data => {
	//set up values for on load
	const og_cases = data[0];
	const og_deaths = data[1];
	cases = og_cases;
	deaths = og_deaths;
	sliderLabel.innerText = 'Day 116';
	bubblecheckbox = document.getElementById('bubblecheck');
	initialBuild(cases, deaths, slider.value); //load the initial charts
	SARS_button.on("click", function(){//add interactivity with the buttons
	    if (active_buttons.includes('SARS')){
      		active_buttons = removeValue(active_buttons, 'SARS');
			cases = og_cases.filter(filterViruses);
			deaths = og_deaths.filter(filterViruses);
			last_cases = og_cases.filter(filterLast);
			last_deaths = og_deaths.filter(filterLast);
			SARS_button.style("background-color","#A9A9A9");
			buttonBuild(cases, deaths, slider.value, last_cases, last_deaths);//reload charts based on buttons
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

	slider.onchange = function(){//add slider functionality
		sliderLabel.innerText = 'Day ' + String(slider.value);
		slideBuild(cases, deaths, slider.value, og_cases, og_deaths);//reload slides based on new slider value
	}
	function bubblecheckfunction(){
		bubbleValues(cases,deaths,slider.value);//swap between cases and deaths for the bubble chart
	}
});


function removeValue(arr, value){//this is to help keep track of which buttons are currently active
	return arr.filter(function(element){
		return element != value;
	});
}

function filterViruses(country){//filter by the active buttons
 	return active_buttons.includes(country.Virus);
}

function filterLast(country){//filter by last button pressed (this will always be the last value in active_buttons)
	if (active_buttons.length > 0){//if we have no active buttons, skip this and retain the last active one
		last_button = active_buttons.slice(-1);
	}
	return last_button.includes(country.Virus);
}

function initialBuild(cases, deaths, slide_num){//our initial build (only the top row! for the wow factor, naturally)
	makeMap(cases, deaths, slide_num);
	confirmedCasesData(cases, slide_num);
	deathCasesData(deaths, slide_num);
	totalLabels(cases, deaths, slide_num);
}

function buttonBuild(cases, deaths, slide_num, last_cases, last_deaths){//rebuild based on button press
	drawGlobe(last_cases);
	bubbleValues(cases, deaths, slide_num);
	makeMap(cases, deaths, slide_num);
	drawComparisonChart(last_cases, last_deaths);
	totalLabels(cases, deaths, slide_num);
}

function slideBuild(cases, deaths, slide_num, og_cases, og_deaths){//rebuild based on slide
	bubbleValues(cases, deaths, slide_num);
	makeMap(cases, deaths, slide_num);
	confirmedCasesData(og_cases, slide_num);
	deathCasesData(og_deaths, slide_num);
	totalLabels(cases, deaths, slide_num);
}