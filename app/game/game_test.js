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

    it('checkAnswer with secret [blue, red, green, purple] should return {wellPlaced: 1, missPlaced: 1} if guess is  [yellow, red, blue, grey] ', inject(function($controller) {
      controller.secret = ['blue', 'red', 'green', 'purple'];
      var response = {wellPlaced: 1, missPlaced: 1};
      controller.guess = ['yellow', 'red', 'blue', 'grey'];

      expect(controller.checkAnswer(controller.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [blue, blue, blue, blue] should return {wellPlaced: 0, missPlaced: 0} if guess is [red, yellow, grey, grey]', inject(function($controller) {
      controller.secret = ['blue', 'blue', 'blue', 'blue'];
      var response = {wellPlaced: 0, missPlaced: 0};
      controller.guess = ['red', 'yellow', 'grey', 'grey'];

      expect(controller.checkAnswer(controller.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [blue, blue, blue, blue] should return {wellPlaced: 1, missPlaced: 0} if guess is [blue, grey, grey, grey]', inject(function($controller) {
      controller.secret = ['blue', 'blue', 'blue', 'blue'];
      var response = {wellPlaced: 1, missPlaced: 0};
      controller.guess = ['blue', 'grey', 'grey', 'grey'];

      expect(controller.checkAnswer(controller.guess)).toEqual(response);
    }));

    it('checkAnswer with secret [red, yellow, grey, grey] should return {wellPlaced: 0, missPlaced: 1} if guess is [blue, red, green, green]', inject(function($controller) {
      controller.secret = ['red', 'yellow', 'grey', 'grey'];
      var response = {wellPlaced: 0, missPlaced: 1};
      controller.guess =  ['blue', 'red', 'green', 'green'];

      expect(controller.checkAnswer(controller.guess)).toEqual(response);
    }));


  });
});