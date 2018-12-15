// // Create map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  // center: [169.4464, -21.9685, 10],
  zoom: 13
});

// Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  // "https://api.tiles.mapbox.com/v4/{id}//{x}/{y}.png?access_token={accessToken}", 
  // https://api.mapbox.com/{endpoint}?access_token=your-access-token
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: "pk.eyJ1Ijoicm9oaXRyYW8xIiwiYSI6ImNqcG45ZXA2YjAwb3U0M21manRjc2lxbXoifQ.LqjhWhT0e2j5IUHXadLfcA"
}).addTo(myMap);
// Create a map object
// var myMap = L.map("map", {
//   center: [15.5994, -28.6731],
//   zoom: 3
// });
// console.log(myMap)

// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets-basic",
//   accessToken: "pk.eyJ1Ijoicm9oaXRyYW8xIiwiYSI6ImNqcDR2ejVsajBseTczcXBqcDlsZDltN3UifQ.nzS6dVJWy6ZAx88sOVQ8tg"
// }).addTo(myMap);

// Link to GeoJSON data (to add to map)
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(link, function(data) {
  // L.geoJson(data).addTo(myMap); 
  // Add circular markers + popups 
  var earthquakes = data.features;
  for (var i = 0; i < earthquakes.length; i++) {
    var earthquake = earthquakes[i];
    var color = "";
    var magnitude = earthquake.properties.mag; 

    // Color-coding
    if (magnitude > 0.5) {
      color = "#ffffb2";
    }
    else if (magnitude > 1.0) {
      color = "#fed976";
    }
    else if (magnitude > 1.5) {
      color = "feb24c";
    }
    else {
      color = "red";
    }
    //console.log(earthquake.geometry.coordinates[0], " - ", earthquake.geometry.coordinates[1])
  // Adding circular markers with color-coding + dynamic sizes 
    L.circle([earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: magnitude * 1500
    }).addTo(myMap); 
  }; 
  // console.log("finished looping")

}); 


// // Add legend 
// // L.control(); 


