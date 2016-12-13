"use strict";
/**********************
  MODEL / CONTROLLER
**********************/

/* GAME STATE VARIABLES */
/*****************************/

var WIN_GOAL = 20;
var consoleIsOn = false;

/** bool that interupts some functionality of buttons
    such as when there is a message to the player
  */
var holdButtonFunctons = false;

/*****************************/

function turnConsoleOn() {

  console.log('console is on');
  updateLED('ON');
  setTimeout(function() {
    updateLED('');
  }, 1000);

  setTimeout(function() {
    updateLED('--');
    consoleIsOn = true;
  }, 1500);
}

function turnConsoleOff() {
  consoleIsOn = false;
  game.isPlayersTurn = false;
  console.log('console is off');

}

function turnStrictModeOn() {
  game.strictMode = true;
  console.log('strict mode is on');
}

function turnStrictModeOff() {
  game.strictMode = false;
  console.log('strict mode is off');

}

// start button functionality
function startGame() {
  if (consoleIsOn) {
    console.log('starting game!');

    game = new Game();

    computerTurn();

  }
}

function computerRandomChoice() {
  return Math.floor(Math.random() * 4);
}

/** will reset the game, either through player action or getting a wrong
    answer in strict mode.
  */
function resetGame() {
  console.log('Restarting');
  game = new Game();
}

// when player reaches the WIN_GOAL number
function playerWin() {
  game.isPlayersTurn = false;
  holdButtonFunctons = true;
  updateLED('WIN!');
  blinkLED(3);
  setTimeout(function() {
    holdButtonFunctons = false;
    startGame();
  }, 4000);
}

// when a player guesses incorrectly
function wrongGuess() {
  game.isPlayersTurn = false;
  console.log('Incorrect. Try again!');

  illuminateOn(0);
  illuminateOn(1);
  illuminateOn(2);
  illuminateOn(3);

  setTimeout(function() {
    illuminateOff(0);
    illuminateOff(1);
    illuminateOff(2);
    illuminateOff(3);
  }, 500);

  updateLED('--');
  blinkLED(2);

  setTimeout(function() {
    if (game.strictMode === true) {
      console.log('Game restarting');
      startGame();
    } else {
      setTimeout(function() {
        updateLED(game.getCurrentCount())
        displayComputerSelections();
      }, 1000);
    }
  }, 2000);


}

// function produces a closure to keep track of current round number
function outerFunctionPlayerChoice() {
  var guessNumber = 0;

  var inner = function(choice) {
    // correct guess
    if (choice === game.computerSelections[guessNumber]) {
      console.log('correct!');
      guessNumber++;

      if (guessNumber === WIN_GOAL) {
        guessNumber = 0;
        playerWin();
      } else if (guessNumber === game.computerSelections.length) {
        console.log("Computer's Turn!");
        guessNumber = 0;
        game.incrementCount();
        // --> go to computer's turn after slight pause
        setTimeout(function() {
          computerTurn();
        }, 1500);
      }

    // incorrect guess
    } else {
      wrongGuess();
    }
  };
  return inner;
}
var playerChoice = outerFunctionPlayerChoice();



// constructor function creates new instance of game
function Game() {
  var currentCount = 1;
  this.strictMode = false;
  this.computerSelections = [];

  // this bool will allow/disallow interaction with app
  this.isPlayersTurn = false;

  this.incrementCount = function() {
    currentCount++;
  };
  this.getCurrentCount = function() {
    return currentCount;
  };
}
var game = new Game();



function computerTurn() {
  updateLED(game.getCurrentCount());
  game.isPlayersTurn = false;
  var computerChoice = computerRandomChoice();

  game.computerSelections.push(computerChoice);

  displayComputerSelections();
}

// TODO: find a way to stop comp from displayer after user presses start
function displayComputerSelections() {
  // this function will display the computer choice
  var displaySelection = function(selection, lastInSeries) {
    /** use console.log(on: choice) to simulate when a selection is on
            console.log(off: choice) when selection is turned off
      */

    console.log(selection + ' ON');
    // if (game.computerSelections[0] !== undefined) {
    illuminateOn(selection);

    // create closure with IIFE to capture value of selection
    (function(selection) {
      setTimeout(function() {
        console.log(selection + ' OFF');
        illuminateOff(selection);
        // if last in series, will change isPlayersTurn to true
        if (lastInSeries === true) {
          console.log('Player\'s Turn!');
          game.isPlayersTurn = true;
        }
        // the number below determines how long the ON/OFF state is
      }, 800);
    })(selection);
// }
  };

  /** lastInSeries: bool, will be set to true once computer finishes displaying
      the last selection
    */

  var lastInSeries = false;


  for (var i = 0; i < game.computerSelections.length; i++) {
    // sets timeout function for increasingly longer periods of time

    // create closure with IIFE to capture value of i upon loop execution

    (function(y, lastInSeries) {
      if (y === game.computerSelections.length - 1) {
        lastInSeries = true;
      }
      setTimeout(function() {
        displaySelection(game.computerSelections[y], lastInSeries);
        // i * number determines the delay between computerSelections
      }, i * 1000);
    })(i, lastInSeries);

  } // END for-loop

} // END displayComputerSelection
