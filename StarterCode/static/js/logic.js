var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";




// Perform a GET request to the query URL/
d3.json(URL).then(function (data) {
    console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });


    for (var i = 0; i < data.length; i++) {
        L.circle(data[i].features.geometry.coordinates, {
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: markerSize(data[i].features.geometry.coordinates[2])
        }).bindPopup(`<h1>${data[i].features.properties.place}</h1> <hr> <h3>${data[i].features.properties.time}</h3>`).addTo(myMap);
  }

  function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -20.71
      ],
      zoom: 2,
      layers: [topo, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
   }


  









// d3.json(URL).then(function (data) {
//     console.log(data);
//     createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }

//     var earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });
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
//     myMap.addLayer(markers);