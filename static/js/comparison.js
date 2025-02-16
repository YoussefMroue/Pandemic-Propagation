function drawComparisonChart(cases, deaths){
	//get basic variables and determine which virus we are working with
	var active_virus = last_button[0];
	var num_days = 0;
	if (active_virus == 'Coronavirus'){
		num_days = 23;
	}
	else if(active_virus == 'H1N1'){
		num_days = 44;
	}
	else{
		num_days = 116;
	}
	var labels = [];
	var case_values = [];
	var death_values = [];
	//we get our chart data from the complete data by summing per day
	for (var i = 0; i < num_days+1; i++){
		var day_string = 'Day ' + String(i);
		labels.push(day_string);
		var cases_sum = 0;
		var deaths_sum = 0;
		for (var country in cases){
			cases_sum += cases[country][day_string];
		}
		for (var country in deaths){
			deaths_sum += deaths[country][day_string];
		}
		case_values.push(cases_sum);
		death_values.push(deaths_sum);
	}
	//we build our chart
	var casetrace = {
		x: labels,
		y: case_values,
		name: 'Cases',
		type: 'bar'
	};
	var deathstrace = {
		x: labels,
		y: death_values,
		name: 'Deaths',
		type: 'bar'
	}
	var data = [casetrace, deathstrace];
	var layout = {
		barmode: 'group',
		title: {text: `Cases and Deaths over Time: ${active_virus}`},
		xaxis: {title: {text: 'Number of Cases and Deaths'}, automargin: true},
		yaxis: {title: {text: 'Day'}, automargin: true},
		paper_bgcolor: '#d4d4dc',
		plot_bgcolor: '#d4d4dc'
	};
	Plotly.newPlot('comparison_chart', data, layout);
}