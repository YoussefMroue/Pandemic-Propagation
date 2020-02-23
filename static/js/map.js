function makeMap(cases, deaths){
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
}