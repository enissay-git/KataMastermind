'use strict';

describe('mastermind.game module', function() {

  beforeEach(module('mastermind.game'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
 }));

  describe('game controller test', function(){

    var $scope, controller;
 
    beforeEach(function() {
      $scope = {};
      controller = $controller('gameCtrl', { $scope: $scope });
    });

    it('should return true if the controller is defined', inject(function($controller) {
      expect(controller).toBeDefined();
    }));

    it('checkAnswer with secret [blue, red, green, pink] should return {wellPlaced: 1, missPlaced: 1} if guess is  [yellow, red, blue, purple] ', inject(function($controller) {
      $scope.secret = ['blue', 'red', 'green', 'pink'];
      var response = {wellPlaced: 1, missPlaced: 1};
      $scope.guess = ['yellow', 'red', 'blue', 'purple'];

      expect(controller.checkAnswer($scope.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [blue] should return {wellPlaced: 0, missPlaced: 0} if guess is [red]', inject(function($controller) {
      $scope.secret = ['red'];
      var response = {wellPlaced: 0, missPlaced: 0};
      $scope.guess = ['blue'];

      expect(controller.checkAnswer($scope.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [blue] should return {wellPlaced: 1, missPlaced: 0} if guess is [blue]', inject(function($controller) {
      $scope.secret = ['blue'];
      var response = {wellPlaced: 1, missPlaced: 0};
      $scope.guess = ['blue'];

      expect(controller.checkAnswer($scope.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [red, yellow] should return {wellPlaced: 0, missPlaced: 1} if guess is [blue, red]', inject(function($controller) {
      $scope.secret = ['red', 'yellow'];
      var response = {wellPlaced: 0, missPlaced: 1};
      $scope.guess =  ['blue', 'red'];

      expect(controller.checkAnswer($scope.guess)).toEqual(response);
    }));


  });
});