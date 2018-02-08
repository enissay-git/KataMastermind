'use strict';

// Declare app level module which depends on views, and components
angular.module('mastermind', [
  'ngRoute',
  'mastermind.game',
  'mastermind.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/game'});
}]);
