// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: "pk.eyJ1Ijoicm9oaXRyYW8xIiwiYSI6ImNqcG45ZXA2YjAwb3U0M21manRjc2lxbXoifQ.LqjhWhT0e2j5IUHXadLfcA"
}).addTo(myMap);


var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(link, function(data) {
  // L.geoJson(data).addTo(myMap); 
  // Add circular markers + popups 
  var earthquakes = data.features;
  console.log(earthquakes)
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
    //console.log(earthquake.geometry.coordinates[0])
    //console.log(earthquake.geometry.coordinates[0], " - ", earthquake.geometry.coordinates[1])
  // Adding circular markers with color-coding + dynamic sizes 
    //L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]).addTo(myMap);
    L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: magnitude * 1500
    }).addTo(myMap); 
  }; 
  // console.log("finished looping")

}); 
