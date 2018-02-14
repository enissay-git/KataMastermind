# KataMastermind

This little project is a Kata for wemanity.

The purpose of this kata is to replace the work of the player who create the code and who have to check the response of the other player who try to break the code.

I have choose the subject "mastermind".

The purpose of the game is to guess the randomly generated secret composed of colors.

The rules are the following :

    - If a user guess totaly wrong then the result indicate no color is well placed nor misplaced
    - If a user guess only one color even by propose it multiple time then the result indicate that one color is well placed and do not indicate misplaced color
    - If a user guess one well placed color and one misplaced then the result indicate one color is well placed and one is misplaced
    - If the user guess all the colors but misplaced then the result indicate that all the colors are misplaced
    - If the user guess all the colors well placed then the result indicate that all the colors are well placed

To run the project use : npm start

To run the test use : npm test

I have choose to make some tests to check if the evaluation of the answer is alright and to test some usefull cases.