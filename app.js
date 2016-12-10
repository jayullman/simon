
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
        // --> go to computer's turn
        computerTurn();
      }
    } else {
      console.log('Incorrect. Try again!');
    }
  };
  return inner;
}

var playerChoice = playersTurn();

function playersTurn() {
  return outerFunctionPlayerChoice();
}

var computerSelections = [];

// this bool will allow/disallow interaction with app
var isPlayersTurn = false;

function computerTurn() {
  isPlayersTurn = false;
  var computerChoice = computerRandomChoice();

  computerSelections.push(computerChoice);

  displayComputerSelections();
}

function displayComputerSelections() {
  // this function will display the computer choice
  var displaySelection = function(selection, lastInSeries) {
    /** use console.log(on: choice) to simulate when a selection is on
            console.log(off: choice) when selection is turned off
      */

    console.log(selection + ' ON');

    // create closure with IIFE to capture value of selection
    (function(selection) {
      setTimeout(function() {
        console.log(selection + ' OFF');
        // if last in series, will change isPlayersTurn to true
        if (lastInSeries === true) {
          console.log('Player\'s Turn!');
          // --> playersTurn()
        }
      }, 1000);
    })(selection);

  };

  /** lastInSeries: bool, will be set to true once computer finishes displaying
      the last selection
    */

  var lastInSeries = false;
  for (var i = 0; i < computerSelections.length; i++) {
    // sets timeout function for increasingly longer periods of time

    // create closure with IIFE to capture value of i upon loop execution

    (function(y, lastInSeries) {
      if (y === computerSelections.length - 1) {
        lastInSeries = true;
      }
      setTimeout(function() {
        displaySelection(computerSelections[y], lastInSeries);
      }, i * 3000);
    })(i, lastInSeries);

  } // END for-loop
} // END displayComputerSelection
