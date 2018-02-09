'use strict';

angular.module('mastermind.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'gameCtrl',
    controllerAs: 'gameCtrl'
  });
}])

.controller('gameCtrl', ['$scope', '$log', function($scope, $log) {

  var vm = this;
  vm.secret = [];
  vm.guess = [];
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
    const evaluation = {
      wellPlaced: 0,
      missPlaced: 0
    };

    const checkWellPlaced = vm.checkWellPlaced(guess, vm.secret);

    return checkWellPlaced;
  }

  vm.setSecret = (secret) => {
    if(secret.length === 4){
      vm.secret = secret;
    }
  }

  vm.setGuess = (guess) => {
    if(guess.length === 4) {
      vm.guess = guess;
    }
  }

  vm.checkWellPlaced = (guess, secret) => {

    const wellPlacedResult = {
      wellPlaced: 0,
      guessForMissPlaced: [],
      secretForMissPlaced: []
    };

    secret.forEach((color, index) => {
      $log.log(`Color secret : ${color} Color guess : ${guess[index]}, Index : ${index}`);
      if(guess[index] === color){
        wellPlacedResult.wellPlaced++;
      }
      else{
        wellPlacedResult.guessForMissPlaced.push(guess[index]);
        wellPlacedResult.secretForMissPlaced.push(secret[index]);
      }
    });

    return vm.checkMissPlaced(wellPlacedResult);
  }

  vm.checkMissPlaced = (wellPlacedResult) => {
    //use indexof
    const missPlacedResult = {
      missPlaced: 0,
      wellPlaced: wellPlacedResult.wellPlaced
    }
    const guessForMissPlacedTmp = wellPlacedResult.guessForMissPlaced;

    wellPlacedResult.secretForMissPlaced.forEach((color, index) => {
      if(guessForMissPlacedTmp.indexOf(color) > -1){
        missPlacedResult.missPlaced++;
      }
      guessForMissPlacedTmp.splice(guessForMissPlacedTmp.indexOf(color), 1);
    });

    return missPlacedResult;
  }

}]);