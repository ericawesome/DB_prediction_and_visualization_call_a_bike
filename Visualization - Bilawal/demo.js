let routesData, stationData;

let stationDoneLoading = false;
let routesDoneLoading = false;
let selectedStation;

let tmpCounter = 0;


function handleFiles(files) {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    if (files[0].name === "hourly_rentals_with_destination.csv") {
      getRoutes(files[0]);
    } else if (files[1].name === "hourly_rentals_with_destination.csv") {
      getRoutes(files[1]);
    }

    if (files[0].name === "OPENDATA_RENTAL_ZONE_CALL_A_BIKE.csv") {
      getStation(files[0]);
    } else if (files[1].name === "OPENDATA_RENTAL_ZONE_CALL_A_BIKE.csv") {
      getStation(files[1]);
    }

  } else {
    alert('FileReader are not supported in this browser.');
  }
}


// Routes

function getRoutes(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadHRoutes;
  reader.onerror = errorHandler;
}

function loadHRoutes(event) {
  var csv = event.target.result;
  routesJSON(csv);
}

function routesJSON(csv) {

  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  let output = JSON.stringify(result);

  let jsonObj = JSON.parse(output)

  //140791, 138384
  const filtered = jsonObj.filter(d => d.StartStation === "140791").slice(0, 50)
  // const filtered = jsonObj.filter(d => d.Time === "2016-01-01 12")


  routesData = filtered;

  console.log("Route", filtered);

  this.routesDoneLoading = true;
  console.log("Routes Done");
  if (this.stationDoneLoading && this.routesDoneLoading) {
    console.log("Routes init called map");
    this.initMap(filtered);
  }
}







// Station

function getStation(fileToRead) {
  var reader = new FileReader();
  // Read file into memory as UTF-8      
  reader.readAsText(fileToRead);
  // Handle errors load
  reader.onload = loadStation;
  reader.onerror = errorHandler;
}

function loadStation(event) {
  var csv = event.target.result;
  stationJSON(csv);
}

function stationJSON(csv) {

  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  let output = JSON.stringify(result);

  let jsonObj = JSON.parse(output)
  stationData = jsonObj;
  this.selectedStation = jsonObj.filter(d => d.RENTAL_ZONE_HAL_ID === "140791")
  // // const filtered = jsonObj.filter(d => d.Time === "2016-01-01 12")

  console.log("station", stationData);

  this.stationDoneLoading = true;
  console.log("Station done");
  // if (this.stationDoneLoading && this.routesDoneLoading) {
  //   console.log("Station init called map");
  //   this.initMap();
  // }
}


function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}




// if (this.stationDoneLoading && this.routesDoneLoading) {




/**
 * Adds a circle over New Delhi with a radius of 1000 metres onto the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addCircleToMap(map) {

  //1

  map.addObject(new H.map.Circle(
    // The central point of the circle
    {
      //52.513757, 13.418093
      lat: 52.513757,
      lng: 13.418093
    },
    // The radius of the circle in meters
    100, {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)' // Color of the circle
      }
    }
  ));

  //2 


  map.addObject(new H.map.Circle(
    // The central point of the circle
    {
      //52.513560, 13.413900
      lat: 52.513560,
      lng: 13.413900
    },
    // The radius of the circle in meters
    100, {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)' // Color of the circle
      }
    }
  ));


  // 3


  map.addObject(new H.map.Circle(
    // The central point of the circle
    {
      //52.511327, 13.413618
      lat: 52.511327,
      lng: 13.413618
    },
    // The radius of the circle in meters
    1000, {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)' // Color of the circle
      }
    }
  ));


  // 4  

  map.addObject(new H.map.Circle(
    // The central point of the circle
    {
      //52.520623, 13.405386
      lat: 52.513757,
      lng: 13.405386
    },
    // The radius of the circle in meters
    100, {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)' // Color of the circle
      }
    }
  ));
}






/**
 * Adds markers to the map highlighting the locations of the captials of
 * France, Italy, Germany, Spain and the United Kingdom.
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addMarkersToMap(map) {


  var parisMarker = new H.map.Marker({
    lat: parseFloat(this.selectedStation[0].LONGITUDE),
    lng: parseFloat(this.selectedStation[0].LATITUDE)
  });
  map.addObject(parisMarker);
}


function addMarkersToMapForStations(map, station) {


  var svgMarkup = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">T</text></svg>';

  // Create an icon, an object holding the latitude and longitude, and a marker:
  var icon = new H.map.Icon(svgMarkup),
    coords = {
      lat: parseFloat(station[0].LONGITUDE),
      lng: parseFloat(station[0].LATITUDE)
    },
    marker = new H.map.Marker(coords, {
      icon: icon
    });

  // Add the marker to the map and center the map at the location of the marker:
  map.addObject(marker);
  map.setCenter(coords);




  // var marker = new H.map.Marker({
  //   lat: parseFloat(station[0].LONGITUDE),
  //   lng: parseFloat(station[0].LATITUDE)
  // });
  // map.addObject(marker);
}



Number.prototype.toMMSS = function () {
  return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds.';
}

let tempCountStation;
let min = 100000;
let max = 0;
let average = 0;

function initMap(filteredStationToShow) {



  function calculateRouteFromAtoB(platform, target) {
    try {
      var router = platform.getRoutingService(),
        routeRequestParams = {
          mode: 'shortest;pedestrian',
          representation: 'display',
          waypoint0: parseFloat(this.selectedStation[0].LONGITUDE) + ',' + this.selectedStation[0].LATITUDE,
          waypoint1: parseFloat(target[0].LONGITUDE) + ',' + target[0].LATITUDE,
          routeattributes: 'waypoints,summary,shape,legs',
          maneuverattributes: 'direction,action'
        };


      router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
      );
    } catch {

    }

  }

  function onSuccess(result) {
    var route = result.response.route[0];
    addRouteShapeToMap(route);
  }

  function onError(error) {
    alert('Can\'t reach the remote server');
  }







  /**
   * Boilerplate map initialization code starts below:
   */

  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: window.apikey
  });
  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over New Delhi
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
      center: {
        // lat: 52.513757,
        // lng: 13.418093

        // lat: 52.518478,
        // lng: 13.407584
        lat: parseFloat(this.selectedStation[0].LONGITUDE),
        lng: parseFloat(this.selectedStation[0].LATITUDE)

      },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1
    });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  function addRouteShapeToMap(route) {

    var lineString = new H.geo.LineString(),
      routeShape = route.shape,
      polyline;

    routeShape.forEach(function (point) {
      var parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });


    let color = 'rgba(0, 255, 0, 1.0)';
    let width = 4;

    if (parseInt(filteredStationToShow[tmpCounter].Count) < (max / 3)) {
      color = 'rgba(0, 255, 0, 1.0)';
      width = 3;
    } else if (parseInt(filteredStationToShow[tmpCounter].Count) > (max / 3) && parseInt(filteredStationToShow[tmpCounter].Count) < max - (max / 3)) {
      color = 'rgba(255, 255, 0, 1.0)';
      width = 6;
    } else if (parseInt(filteredStationToShow[tmpCounter].Count) > max - (max / 3)) {
      color = 'rgba(255, 0, 0, 1.0)';
      width = 8;
    }


    polyline = new H.map.Polyline(lineString, {
      style: {
        lineWidth: width,
        strokeColor: color
      },

    });

    if (width === 3) {
      polyline.setZIndex(2);
    } else if (width === 6) {
      polyline.setZIndex(1);
    } else if (width === 8) {
      polyline.setZIndex(0);
    }

    // Add the polyline to the map
    map.addObject(polyline);
    // And zoom to its bounding rectangle
    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox()
    });

    tmpCounter++;
  }



  // Now use the map as required...
  // addCircleToMap(map);
  addMarkersToMap(map);



  console.log(filteredStationToShow.length)


  for (i = 0; i < filteredStationToShow.length; i++) {
    min = parseInt(filteredStationToShow[i].Count) < min ? parseInt(filteredStationToShow[i].Count) : min;
    max = parseInt(filteredStationToShow[i].Count) > max ? parseInt(filteredStationToShow[i].Count) : max;
  }
  console.log("min", min, "max", max);

  average = (min + max) / 2;

  for (i = 0; i < filteredStationToShow.length; i++) {

    tempStation = stationData.filter(d => d.RENTAL_ZONE_HAL_ID === filteredStationToShow[i].StopStation)

    calculateRouteFromAtoB(platform, tempStation);
    addMarkersToMapForStations(map, tempStation);


  }



  // calculateRouteFromAtoB(platform);




}