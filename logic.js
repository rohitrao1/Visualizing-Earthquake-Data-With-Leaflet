// Create a map object
var myMap = L.map("map", {
  // center: [39.8283, -98.5795],
  // center: [169.4464, -21.9685, 10],
  // zoom: 5
  center: [37.7749, -122.4194],
  zoom: 9
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: "pk.eyJ1Ijoicm9oaXRyYW8xIiwiYSI6ImNqcG45ZXA2YjAwb3U0M21manRjc2lxbXoifQ.LqjhWhT0e2j5IUHXadLfcA"
}).addTo(myMap);

function circleColor(magnitude) {
    // Color-coding
    if (magnitude <= 0.75) {
      return "yellow";
    }
    else if (magnitude > 0.75 && magnitude <= 1.5) {
      return "green";
    }
    else {
      return "red";
    }
}


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
    // if (magnitude <= 0.75) {
    //   color = "yellow";
    // }
    // else if (magnitude > 0.75 && magnitude <= 1.5) {
    //   color = "green";
    // }
    // else {
    //   color = "red";
    // }
    //console.log(earthquake.geometry.coordinates[0])
    //console.log(earthquake.geometry.coordinates[0], " - ", earthquake.geometry.coordinates[1])
  // Adding circular markers with color-coding + dynamic sizes 
    //L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]).addTo(myMap);
    L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: circleColor(+magnitude),
      // fillColor: color,
      // fillColor: "yellow", 
      radius: magnitude * 1500
    }).bindPopup("<h1>" + earthquake.properties.place + "</h1> <hr> <h3>Magnitude: " + magnitude + "</h3>").addTo(myMap).addTo(myMap); 
  };
});
  // console.log("finished looping")
  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var labels = ["0-0.75", "0.75-1.5", "1.50+"];
    var levels = [0.75, 1.5, 2]
    // var colors = ["yellow", "green", "red"];
    div.innerHTML = '<div><strong>Legend</strong></div>';
    for(var i = 0; i < labels.length; i++) {
      div.innerHTML += '<i style = "background: ' + circleColor(levels[i]) + '">&nbsp;</i>&nbsp;&nbsp;'
      + labels[i] + '<br/>';
    };
    return div;
  };
  legend.addTo(myMap);
// }); 
// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function() {
//   var div = L.DomUtil.create('div', 'info legend');
//   var labels = ["0-0.75", "0.75-1.5", "1.50+"];
//   var grades = [1, 2, 3];
//   div.innerHTML = '<div><strong>Legend</strong></div>';
//   for(var i = 0; i < grades.length; i++) {
//     div.innerHTML += '<i style = "background: ' + circleColor(grades[i]) + '">&nbsp;</i>&nbsp;&nbsp;'
//     + labels[i] + '<br/>';
//   };
//   return div;
// };
// legend.addTo(myMap);

// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function() {
//     //create a legend element
//     var div = L.DomUtil.create('div', 'info legend');

//     //create labels and values to find colors
//     var labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
//     var grades = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];

//     //create legend html
//     div.innerHTML = '<div><strong>Legend</strong></div>';
//     for(var i = 0; i < grades.length; i++) {
//         div.innerHTML += '<i style = "background: ' + circleColor(grades[i]) + '">&nbsp;</i>&nbsp;&nbsp;'
//         + labels[i] + '<br/>';
//     };
//     return div;
// };
// //add legend to map
// legend.addTo(myMap);