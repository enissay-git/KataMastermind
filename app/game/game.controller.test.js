'use strict';

describe('mastermind.game module', function() {

  beforeEach(module('mastermind.game'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
 }));

  describe('game controller test', function(){

    var controller;
 
    beforeEach(function() {
      controller = $controller('gameCtrl');
    });

    it('should return true if the controller is defined', inject(function($controller) {
      expect(controller).toBeDefined();
    }));

    it('should indicate that one color is well placed and one is misplaced when user guess one good color at right place and one at the wrong', inject(function($controller) {
      var response = {wellPlaced: 1, missPlaced: 1};
      controller.setSecret(['blue', 'red', 'green', 'purple']);
      controller.setGuess(['yellow', 'red', 'blue', 'grey']);

      expect(controller.checkAnswer()).toEqual(response);
    }));

    it('should indicate that no color is well placed nor misplaced when user guessed totally wrong', inject(function($controller) {
      var response = {wellPlaced: 0, missPlaced: 0};
      controller.setSecret(['blue', 'blue', 'blue', 'blue']);
      controller.setGuess(['red', 'yellow', 'grey', 'grey']);

      expect(controller.checkAnswer()).toEqual(response);
    }));

    it('should indicate only one color is at the right place and not misplaced even if the user guess one color by put it multiple time', inject(function($controller) {
      var response = {wellPlaced: 1, missPlaced: 0};
      controller.setSecret(['blue', 'blue', 'blue', 'blue']);
      controller.setGuess(['blue', 'grey', 'grey', 'grey']);

      expect(controller.checkAnswer()).toEqual(response);
    }));

    it('should indicate one color is misplaced when the user guessed one color but at the wrong location', inject(function($controller) {
      var response = {wellPlaced: 0, missPlaced: 1};
      controller.setSecret(['red', 'yellow', 'grey', 'grey']);
      controller.setGuess(['blue', 'red', 'green', 'green']);

      expect(controller.checkAnswer()).toEqual(response);
    }));


  });
});