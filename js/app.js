'use strict';

angular.module('beerApp', [
  'ngRoute',
  'beerApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', { 
        templateUrl: 'partials/list.html', 
        controller: 'BreweriesListController'
      })
      .when('/map', { 
        templateUrl: 'partials/map.html', 
        controller: 'BreweriesMapViewController'
      })
      //.otherwise({ redirectTo: '/' });    
  }]);