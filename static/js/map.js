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
function makeMap(cases, deaths){

  console.log(world_geography);
  var geojson;
  L.geoJson(world_geography, {
    style: function(feature) {
      return {
        color: 'black',
        fillColor: chooseColor(feature, cases),
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
        },
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
    }
  }).addTo(myMap);
}

function chooseColor(feature, countries){
  list_o_counties = countries.find(country => {
    return feature.properties.name == country['Country'];
  });
  console.log(feature.properties.name);
  console.log(list_o_counties);
  return 'blue';
}