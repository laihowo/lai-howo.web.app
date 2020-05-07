boxTag.innerHTML = Origin.id+': ';
boxTag2.innerHTML = Destination.id+': ';
function check() {
	if (!Origin.checkValidity()) {
		alert("Fill in the Origin!");
	}
	else if (!Destination.checkValidity()) {
		alert("Fill in the Destination!");
	}
	else {
		setCookie("dest", Destination.value, 30);
		route();
	} 
}
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else { 
		alert("Geolocation is not supported by this browser.");
	}
	}
function showPosition(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var latlon = new google.maps.LatLng(lat, lon);
	//console.log(latlon);
	
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({'location': latlon}, function(results, status) {
	  if (status === 'OK') {
		if (results[0]) {
			document.getElementById("Origin").value = results[0].formatted_address;
			//console.log(results[0].formatted_address);
		} else {
		  window.alert('No results found');
		}
	  } else {
		window.alert('Geocoder failed due to: ' + status);
	  }
	});
}
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
	}
}
function route() {
	//var bounds = new google.maps.LatLngBounds;
	//var markersArray = [];

	var origin1 = document.getElementById("Origin").value+", Hong Kong";
	//var origin2 = 'Central, Hong Kong';
	var destinationA = document.getElementById("Destination").value+", Hong Kong";
	//var destinationB = 'Hung Hom, Hong Kong';
	
	/*
	var destinationIcon = 'https://chart.googleapis.com/chart?' +
		'chst=d_map_pin_letter&chld=D|FF0000|000000';
	var originIcon = 'https://chart.googleapis.com/chart?' +
		'chst=d_map_pin_letter&chld=O|FFFF00|000000';
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 55.53, lng: 9.4},
	  zoom: 10
	});
	*/
	

	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	  origins: [origin1],
	  destinations: [destinationA],
	  travelMode: 'TRANSIT',
	  unitSystem: google.maps.UnitSystem.METRIC,
	  avoidHighways: false,
	  avoidTolls: false
	}, function(response, status) {
	  if (status !== 'OK') {
		alert('Error was: ' + status);
	  } else {
		var originList = response.originAddresses;
		var destinationList = response.destinationAddresses;
		var outputDiv = document.getElementById('output');
		outputDiv.innerHTML = '';
		//deleteMarkers(markersArray);
		/*
		var showGeocodedAddressOnMap = function(asDestination) {
		  var icon = asDestination ? destinationIcon : originIcon;
		  return function(results, status) {
			if (status === 'OK') {
			  map.fitBounds(bounds.extend(results[0].geometry.location));
			  markersArray.push(new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				icon: icon
			  }));
			} else {
			  alert('Geocode was not successful due to: ' + status);
			}
		  };
		};
		*/
		for (var i = 0; i < originList.length; i++) {
		  var results = response.rows[i].elements;
		  //geocoder.geocode({'address': originList[i]},
			  //showGeocodedAddressOnMap(false));
		  for (var j = 0; j < results.length; j++) {
			//geocoder.geocode({'address': destinationList[j]},
				//showGeocodedAddressOnMap(true));
			outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
				': ' + results[j].distance.text + ' in ' +
				results[j].duration.text;
		  }
		}
		result.style.display = 'block';
		inputs.style.display = 'none';
	  }
	});
  }
	/*
  function deleteMarkers(markersArray) {
	for (var i = 0; i < markersArray.length; i++) {
	  markersArray[i].setMap(null);
	}
	markersArray = [];
  }
  */