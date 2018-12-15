var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopUp("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
  }; 

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature 
  });

  createMap(earthquakes); 
}; 


// Function to create map
function createMap(earthquakes) {

}

// Function to create markers 
function createMarkers(response) {

}

// Perform API Call 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);