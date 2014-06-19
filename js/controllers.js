angular.module('beerApp.controllers', [])

.controller('BreweriesListController', function($scope, $http) { 

  $http.get('beer/breweries.json').success(function(data) {
    $scope.breweries = data;
  });

  $scope.orderProp = 'name';

})

.controller('BreweriesMapViewController', function($scope, $http) { 

  $http.get('beer/breweries.json').success(function(data) {

    $scope.items = data;

    // initialize Google Map
    var Indy = new google.maps.LatLng(39.7683333, -86.1580556);
    var myOptions = {
      zoom: 11,
      center: Indy,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{ "visibility": "off" }]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{ 'visibility': 'off' }]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{ "visibility": "off" },{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{ "visibility": "off" }]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}]
    }
    map = new google.maps.Map(document.getElementById("google-map"), myOptions);

    // initialize InfoWindow
    infowindow = new google.maps.InfoWindow;

    // for each JSON object in the array...
    angular.forEach($scope.items, function(item, data) {

      if (item.latitude > 0) {

        // create a new marker
        marker = new google.maps.Marker({
          id: item.id,
          position: new google.maps.LatLng(item.latitude, item.longitude),
          map: map,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|EB4',
          title: item.name,
          html: '<a class=\"map-card\" href=\"' + item.url + '\"><img class=\"image\" height=\"60\" width=\"60\" src=\"http://res.cloudinary.com/skligerman/image/twitter/' + item.twitterID + '".jpg\"><span class=\"details\"><span class=\"name\">' + item.name + '</span><span class=\"address\">' + item.address + '</span></span></a>'
        });

        // Bind InfoWindow listener to the marker
        bindInfoWindow(marker, map, infowindow, marker.title, marker.html, marker.id);
    }

    });
  });

  function bindInfoWindow(marker, map, infoWindow, title, html, markerID) {
      google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
      });
    }

});