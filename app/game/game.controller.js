'use strict';

angular.module('mastermind.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'gameCtrl',
    controllerAs: 'gameCtrl'
  });
}])

.controller('gameCtrl', ['$log', function($log) {

  var vm = this;
  vm.secret = [];
  vm.secretSize = 4;
  vm.guess = [];
  vm.trials = [];
  vm.cheat = false;
  vm.colorsChoice = [
    {name: 'gray', code: '#808080'},
    {name: 'red', code: '#FF0000'},
    {name: 'yellow', code: '#FFFF00'},
    {name: 'green', code: '#008000'},
    {name: 'blue', code: '#0000FF'},
    {name: 'purple', code: '#800080'},
  ];
  vm.currentEvaluation = {
    misplaced: 0,
    wellPlaced: 0
  };

  function init() {
    vm.generateSecret();
  }

  vm.evaluateGuess = () => {
    const evaluation = {
      wellPlaced: vm.countWellPlaced(),
      misplaced: vm.countMisplaced()
    }

    vm.currentEvaluation = evaluation;
    return evaluation;
  }

  vm.setSecret = (secret) => {
    if(secret.length === vm.secretSize){
      vm.secret = secret;
    }
  }

  vm.generateSecret = () => {
    const secret = [];

    for (let index = 0; index < vm.secretSize; index++) {
      const indexColor = Math.floor(Math.random() * vm.colorsChoice.length);
      secret.push(vm.colorsChoice[indexColor].name);
    }

    vm.setSecret(secret);
  }

  vm.setGuess = (guess) => {
    if(guess.length === vm.secretSize) {
      vm.guess = guess;
      vm.evaluateGuess();
    }
  }

  vm.getColorByName = (colorName) => {
    let codeColor= "#000000";

    if(vm.cheat) {
      vm.colorsChoice.forEach((color, index) => {
        if(color.name === colorName){
          codeColor = color.code;
          return codeColor;
        }
      });
    }
    return codeColor;
  }

  vm.getStyle = function(name){
    const color = vm.getColorByName(name);
    return {"background-color": color};
  }

  vm.countWellPlaced = () => {

    let wellPlacedResult = 0;

    vm.secret.forEach((color, index) => {
      if(vm.guess[index] === color){
        wellPlacedResult++;
      }
    });

    return wellPlacedResult;
  }

  vm.deleteWellPlaced = () => {
    const misplacedToTestValue = {
      guessForMisplaced: [],
      secretForMisplaced: []
    }

    vm.secret.forEach((color, index) => {
      if(vm.guess[index] !== color){
        misplacedToTestValue.guessForMisplaced.push(vm.guess[index]);
        misplacedToTestValue.secretForMisplaced.push(vm.secret[index]);
      }
    });

    return misplacedToTestValue;
  }

  vm.countMisplaced = () => {
    const misplacedToTestValue = vm.deleteWellPlaced();
    let misplacedResult = 0;
    const guessForMisplacedTmp = misplacedToTestValue.guessForMisplaced;

    misplacedToTestValue.secretForMisplaced.forEach((color, index) => {
      if(guessForMisplacedTmp.indexOf(color) > -1){
        misplacedResult++;
      }
      guessForMisplacedTmp.splice(guessForMisplacedTmp.indexOf(color), 1);
    });

    return misplacedResult;
  }

  init();

}]);