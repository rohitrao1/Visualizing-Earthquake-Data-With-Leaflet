// Create a map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  // center: [169.4464, -21.9685, 10],
  zoom: 13
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

// // Country data
// var countries = [
//   {
//     name: "Brazil",
//     location: [-14.2350, -51.9253],
//     points: 227
//   },
//   {
//     name: "Germany",
//     location: [51.1657, 10.4515],
//     points: 218
//   },
//   {
//     name: "Italy",
//     location: [41.8719, 12.5675],
//     points: 156
//   },
//   {
//     name: "Argentina",
//     location: [-38.4161, -63.6167],
//     points: 140
//   },
//   {
//     name: "Spain",
//     location: [40.4637, -3.7492],
//     points: 99
//   },
//   {
//     name: "England",
//     location: [52.355, 1.1743],
//     points: 98
//   },
//   {
//     name: "France",
//     location: [46.2276, 2.2137],
//     points: 96
//   },
//   {
//     name: "Netherlands",
//     location: [52.1326, 5.2913],
//     points: 93
//   },
//   {
//     name: "Uruguay",
//     location: [-32.4228, -55.7658],
//     points: 72
//   },
//   {
//     name: "Sweden",
//     location: [60.1282, 18.6435],
//     points: 61
//   }
// ];


// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < countries.length; i++) {

//   // Conditionals for countries points
//   var color = "";
//   if (countries[i].points > 200) {
//     color = "yellow";
//   }
//   else if (countries[i].points > 100) {
//     color = "blue";
//   }
//   else if (countries[i].points > 90) {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }

//   // Add circles to map
//   L.circle(countries[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: countries[i].points * 1500
//   }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// }
