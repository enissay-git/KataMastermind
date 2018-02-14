'use strict';

describe('mastermind.game module', function() {

  beforeEach(module('mastermind.game'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
 }));

  describe('game controller test', function(){

    var mastermindCtrl;
 
    beforeEach(function() {
      mastermindCtrl = $controller('gameCtrl');
    });

    it('should return true if the controller is defined', inject(function($controller) {
      expect(mastermindCtrl).toBeDefined();
    }));

    it('should indicate that no color is well placed nor misplaced when user guessed totally wrong', inject(function($controller) {
      mastermindCtrl.setSecret(['blue', 'blue', 'blue', 'blue']);
      mastermindCtrl.setGuess(['red', 'yellow', 'grey', 'grey']);

      var evaluation = mastermindCtrl.evaluateGuess();

      expect(evaluation).toEqual({wellPlaced: 0, misplaced: 0});
    }));

    it('should indicate only one color is at the right place and not misplaced even if the user guess one color by put it multiple time', inject(function($controller) {
      mastermindCtrl.setSecret(['blue', 'blue', 'blue', 'blue']);
      mastermindCtrl.setGuess(['blue', 'grey', 'grey', 'grey']);

      var evaluation = mastermindCtrl.evaluateGuess();

      expect(evaluation).toEqual({wellPlaced: 1, misplaced: 0});
    }));

    it('should indicate one color is misplaced when the user guessed one color but at the wrong location', inject(function($controller) {
      mastermindCtrl.setSecret(['red', 'yellow', 'grey', 'grey']);
      mastermindCtrl.setGuess(['blue', 'red', 'green', 'green']);

      var evaluation = mastermindCtrl.evaluateGuess();

      expect(evaluation).toEqual({wellPlaced: 0, misplaced: 1});
    }));

    it('should indicate that one color is well placed and one is misplaced when user guess one good color at right place and one at the wrong', inject(function($controller) {
      mastermindCtrl.setSecret(['blue', 'red', 'green', 'purple']);
      mastermindCtrl.setGuess(['yellow', 'red', 'blue', 'grey']);

      var evaluation = mastermindCtrl.evaluateGuess();

      expect(evaluation).toEqual({wellPlaced: 1, misplaced: 1});
    }));

  });
});