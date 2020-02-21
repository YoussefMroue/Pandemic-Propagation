function getdata(url){
	d3.json(url).then(function(response) {
		var json_response = JSON.parse(response);
		return json_response;
	})
}

cases = getdata("/api/cases");
deaths = getdata("/api/deaths");

var SARS_button = d3.select("#SARS")
var H1N1_button = d3.select("#H1N1")
var coronavirus_button = d3.select("#Coronavirus")