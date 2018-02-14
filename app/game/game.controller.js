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
    missPlaced: 0,
    wellPlaced: 0
  };

  function init() {
    vm.generateSecret();
  }

  vm.checkAnswer = () => {
    const evaluation = vm.checkWellPlaced(vm.guess, vm.secret);
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
      vm.checkAnswer();
    }
  }

  vm.getColorByName = (colorName) => {
    let codeColor= "#000000";

    if(vm.cheat) {
      vm.colorsChoice.forEach((color, index) => {
        if(color.name === colorName){
          codeColor = color.code;
        }
      });
    }
    return codeColor;
  }

  vm.getStyle = function(name){
    const color = vm.getColorByName(name);
    return {"background-color": color};
  }

  vm.checkWellPlaced = (guess, secret) => {

    const wellPlacedResult = {
      wellPlaced: 0,
      guessForMissPlaced: [],
      secretForMissPlaced: []
    };

    secret.forEach((color, index) => {
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

  init();

}]);