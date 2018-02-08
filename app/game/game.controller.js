'use strict';

angular.module('mastermind.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'gameCtrl'
  });
}])

.controller('gameCtrl', [function() {

  var vm = this;

  vm.checkAnswer = (guess) => {
    return {wellPlaced: 1, missPlaced: 1};
  }

}]);