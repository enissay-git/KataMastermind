'use strict';

angular.module('mastermind.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'gameCtrl',
    controllerAs: 'gameCtrl'
  });
}])

.controller('gameCtrl', ['$scope', function($scope) {

  var vm = this;
  $scope.secret = [];
  $scope.guess = [];
  $scope.trials = [];
  vm.colorsChoice = [
    {name: 'gray', code: '#808080'},
    {name: 'red', code: '#FF0000'},
    {name: 'yellow', code: '#FFFF00'},
    {name: 'green', code: '#008000'},
    {name: 'blue', code: '#0000FF'},
    {name: 'purple', code: '#800080'},
  ];

  vm.checkAnswer = (guess) => {
    return {wellPlaced: 1, missPlaced: 1};
  }

}]);