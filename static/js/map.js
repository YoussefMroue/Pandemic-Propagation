var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);
function makeMap(cases, deaths, day_num){
  var geojson;
  L.geoJson(world_geography, {
    style: function(feature) {
      return {
        color: 'black',
        fillColor: chooseColor(feature, cases, day_num),
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
      layer.bindPopup(getPopup(feature, cases, deaths, day_num));
    }
  }).addTo(myMap);
}

function chooseColor(feature, countries, day_num){
  // list_o_counties = countries.find(country => {
  //   return feature.properties.name == country['Country'];
  // });
  var sum = 0;
  var max = 0;
  var day_string = 'Day ' + String(day_num);
  //console.log(countries);
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
  else if (sum > 30){
    return '#66c2a5';
  }
  else if (sum > 10){
    return '#3288bd';
  }
  else {
    return '#5e4fa2';
  }
}

function getPopup(feature, countries, deaths, day_num){
  var popup = `<strong>${feature.properties.name}: Day ${day_num}</strong><hr>`;
  var day_string = 'Day ' + String(day_num);
  for (country in countries){
    if (countries[country]['Country'] == feature.properties.name){
      if ((day_num > 23) && (countries[country]['Virus'] == 'Coronavirus')){
        popup = popup.concat(`Coronavirus Cases: ${countries[country['Day 23']]}<br>`);
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
        popup = popup.concat(`Coronavirus Deaths: ${deaths[country['Day 23']]}<br>`);
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