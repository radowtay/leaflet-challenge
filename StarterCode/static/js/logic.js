var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
// var plateURL = "static/js/plates.js";


// Perform a GET request to the query URL/
d3.json(quakeURL).then(function (data) {
  console.log(data);
  createFeatures(data.features);
});

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
// Run the onEachFeature function once for each piece of data in the array.


// d3.json(plateURL).then(function (data) {
//   console.log(data);
// });


function createFeatures(earthquakeData) {
  function onEachFeature(features, layer) {
    layer.bindPopup(`<h3>Location:${features.properties.place}</h3><hr><p>Depth:${(features.geometry.coordinates[2])}<br>Magnitude:${(features.properties.mag)}</p>`);
  }

  function style(features) {
    var size = (features.properties.mag) * 5;
    var color;
    var depth = features.geometry.coordinates[2];

    if (depth <= 10) color = "#ff944d";
    else if (depth >= 11 && depth < 25) color = "#ff3300";
    else if (depth >= 25 && depth < 50) color = "#bf4040";
    else if (depth >= 50 && depth < 80) color = "#99004d";
    else if (depth >= 80 && depth < 100) color = "#6f0166";
    else color = "#240066";

    return {
      fillOpacity: .80,
      fillColor: color,
      color: "black",
      radius: size,
    };
  }

  // function styleDepth(features){
  //   var shade = (features.geometry.coordinates[2]);
  //     return{
  //       color: shade,
  //     }
  // }
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (features, latlong) {
      return L.circleMarker(latlong);
    },
    style: style,
  });


  createMap(earthquakes);
}

function addLegend(myMap) {
  var legend = L.control({ position: "topright" });

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Depth by Color</h4>";
    div.innerHTML += '<i style="background: #ff944d"></i><span>Less than 10</span><br>';
    div.innerHTML += '<i style="background: #ff5c33"></i><span>11 - 25</span><br>';
    div.innerHTML += '<i style="background: #bf4040"></i><span>25 - 50</span><br>';
    div.innerHTML += '<i style="background: #99004d"></i><span>50 - 80</span><br>';
    div.innerHTML += '<i style="background: #6f0166"></i><span>80 - 100</span><br>';
    div.innerHTML += '<i style="background: #240066"></i><span> > 100</span><br>';
    return div;
  };
  legend.addTo(myMap);
}
// Send our earthquakes layer to the createMap function

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Satellite Map": sat,
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Earthquakes Size 4.5+ From Past 7 Days": earthquakes,
  };

  // Create our map, giving it the topographic and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      20.00, -0
    ],
    zoom: 2,
    layers: [topo, earthquakes],
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
  }).addTo(myMap);

  addLegend(myMap);
}










// --------Attempts----------

// d3.json(URL).then(function (data) {
//     console.log(data);
//     createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }


//     createMap(earthquakes);
// }

// function createMap(earthquakes) {

//     var layer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       });

//     var overlayMaps = {
//         Earthquakes: earthquakes
//     };


//     var myMap = L.map("map",{
//         center:[37, -95],
//         zoom: 5,
//         layers: [layer1, overlayMaps]
// });
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }



// var markers = L.markerClusterGroup();
//     for (var i=0; i< response.length; i++) {
//         var location = response[i].features.geometry.coordinates;
//         if (location) {
//             markers.addLayer(L.marker([features.geometry.coordinates[2], features.geometry.coordinates[1], features.geometry.coordinates[0]])
//             .bindPopup(data[i].descriptor));

//         }

//     }
    // myMap.addLayer(markers)