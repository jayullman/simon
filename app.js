
function computerRandomChoice() {
  return Math.floor(Math.random() * 4);
}

// function produces a closure to keep track of current round number
function outerFunctionPlayerChoice() {
  var currentCount = 0;

  var inner = function(choice) {
    if (choice === computerSelections[currentCount]) {
      console.log('correct!');
      currentCount++;
      if (currentCount === computerSelections.length) {
        console.log("Computer's Turn!");
      }
    } else {
      console.log('Incorrect. Try again!');
    }
  };
  return inner;
}

// playerChoice() selects the appropriate index within the players turn
var playerChoice = outerFunctionPlayerChoice();

var computerSelections = [0,1,2,3];

// this bool will allow/disallow interaction with app
var isPlayersTurn = false;

function computerTurn() {
  var computerChoice = computerRandomChoice();

  computerSelection.push(computerChoice);

}

function displayComputerSelection() {
  // this function will display the computer choice
  var displaySelection = function(selection) {
    /** use console.log(on: choice) to simulate when a selection is on
            console.log(off: choice) when selection is turned off
      */

    console.log(selection + ' ON');

    // create closure with IIFE to capture value of selection
    (function(selection) {
      setTimeout(function() {
        console.log(selection + ' OFF');
      }, 2000);
    })(selection);


  };

  for (var i = 0; i < computerSelections.length; i++) {
    // sets timeout function for increasingly longer periods of time

    // create closure with IIFE to capture value of i upon loop execution

    (function(y) {
      setTimeout(function() {
        displaySelection(computerSelections[y]);
      }, i * 3000);
    })(i);

  } // END for-loop
} // END displayComputerSelection
