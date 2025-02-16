var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Adding tile layer after building basic map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);
function makeMap(cases, deaths, day_num){
  var geojson;
  //we plot our data using our geoJSON
  L.geoJson(world_geography, {
    style: function(feature) {
      return {
        color: 'black',
        fillColor: chooseColor(feature, cases, day_num), //here we must link our data to the map
        fillOpacity: 0.5,
        weight: 1.5
      }
    },
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        }
      });
      layer.bindPopup(getPopup(feature, cases, deaths, day_num)); //here again we link our data to the map
    }
  }).addTo(myMap);
}

function chooseColor(feature, countries, day_num){
  //here we link our map to our data using country name, which is common across both data sets
  var sum = 0;
  var max = 0;
  var day_string = 'Day ' + String(day_num);
  
  for (country in countries){
    if (countries[country]['Country'] == feature.properties.name){
      if ((day_num > 23) && (countries[country]['Virus'] == 'Coronavirus')){
        sum += countries[country]['Day 23'];
      }
      else if ((day_num > 44) && (countries[country]['Virus'] == 'H1N1')){
        sum += countries[country]['Day 44'];
      }
      else{
        sum += countries[country][day_string];
      }
    }
  }
  //total cases across all viruses selected determines the color of the country
  if (sum > 10000){
    return '#9e0142';
  }
  else if (sum > 5000){
    return '#d53e4f';
  }
  else if (sum > 1000){
    return '#f46d43';
  }
  else if (sum > 500){
    return '#fdae61';
  }
  else if (sum > 200){
    return '#fee08b';
  }
  else if (sum > 100){
    return '#ffffbf';
  }
  else if (sum > 75){
    return '#e6f598';
  }
  else if (sum > 50){
    return '#abdda4';
  }
  else if (sum > 25){
    return '#66c2a5';
  }
  else if (sum > 0){
    return '#3288bd';
  }
  else {
    return '#5e4fa2';
  }
}

function getPopup(feature, countries, deaths, day_num){
  //again we link our data sets by country name
  var popup = `<strong>${feature.properties.name}: Day ${day_num}</strong><hr>`;
  var day_string = 'Day ' + String(day_num);
  //add popup specifying virus, # of cases or deaths, depending on country and day
  for (country in countries){
    if (countries[country]['Country'] == feature.properties.name){
      if ((day_num > 23) && (countries[country]['Virus'] == 'Coronavirus')){
        popup = popup.concat(`Coronavirus Cases: ${countries[country]['Day 23']}<br>`);
      }
      else if ((day_num > 44) && (countries[country]['Virus'] == 'H1N1')){
        popup = popup.concat(`H1N1 Cases: ${countries[country]['Day 44']}<br>`);
      }
      else{
        popup = popup.concat(`${countries[country]['Virus']} Cases: ${countries[country][day_string]}<br>`);
      }
    }
  }
  popup = popup.concat("<hr>");
  for (country in deaths){
    if (deaths[country]['Country'] == feature.properties.name){
      if ((day_num > 23) && (deaths[country]['Virus'] == 'Coronavirus')){
        popup = popup.concat(`Coronavirus Deaths: ${deaths[country]['Day 23']}<br>`);
      }
      else if ((day_num > 44) && (deaths[country]['Virus'] == 'H1N1')){
        popup = popup.concat(`H1N1 Deaths: ${deaths[country]['Day 44']}<br>`);
      }
      else{
        popup = popup.concat(`${deaths[country]['Virus']} Deaths: ${deaths[country][day_string]}<br>`);
      }
    }
  }
  return popup;
}
//we add the legend for our colors
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
  var div = L.DomUtil.create('div', 'info legend');
  var limits = ['1','25','50','75','100','200','500','1000','5000','10000'];
  var colors = ['#5e4fa2','#3288bd','#66c2a5','#abdda4','#e6f598','#ffffbf','#fee08b','#fdae61','#f46d43','#d53e4f','#9e0142'];
  var labels = [];
  div.innerHTML = '<b>Number of Cases</b><br>'
  div.innerHTML += '<i style=background:' + colors[0] +'></i>0<br>';
  for(var i=0; i<limits.length; i++){
    div.innerHTML += '<i style=background:' + colors[i+1] + '></i>' + limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
  }
  return div;
};

legend.addTo(myMap);