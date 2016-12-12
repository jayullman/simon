"use strict";
/**********************
         VIEW
**********************/

// loads all sound files
var sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// function adds a class to the passed-in elem
function addClass(elem, style) {
  elem.className += ' ' + style;
}

// function removes a class from the passed-in elem
function removeClass(elem, style) {
  var elemClassList = elem.className;
  var startIndex = elemClassList.indexOf(' ' + style);
  if (startIndex > -1) {
    var revertedClassList = elemClassList.slice(0, startIndex);
    elem.className = revertedClassList;
  }
}


var pads = document.getElementsByClassName('pad');

function pressDown(e) {
  if (isPlayersTurn) {
    var padNumber = e.target.id.slice(-1);
    illuminateOn(padNumber);
  }

}

function  pressUp(e) {
  if (isPlayersTurn) {
    var padNumber = Number(e.target.id.slice(-1));
    illuminateOff(padNumber);
    playerChoice(padNumber);
    console.log(padNumber);
  }
}

function illuminateOn(padNumber) {
  var soundFile = 'sound' + padNumber;

  pads[padNumber].className += ' pad-' + padNumber + '-on';

  // plays the appropriate sound for the corresponding pad
  window[soundFile].play();

}


function illuminateOff(padNumber) {
  var elemClassList = pads[padNumber].className;
  var startIndex = elemClassList.indexOf(' ' + 'pad-' + padNumber + '-on');
  if (startIndex > -1) {
    var revertedClassList = elemClassList.slice(0, startIndex);
    pads[padNumber].className = revertedClassList;
  }
}

// event handler when a control button is pressed
function buttonDown(e) {
  addClass(e.target, 'button-down');

}

// event handler when a control button is released
function buttonUp(e) {
  var button = document.getElementById('e.target.id');
  removeClass(e.target, 'button-down');

}


window.onload = function() {
  // attach event handlers to all the pads
  // add event listeners for touch screens
  if ('ontouchstart' in window) {
    for (var i = 0; i < pads.length; i++) {
      pads[i].addEventListener('touchstart', pressDown);
      pads[i].addEventListener('touchend', pressUp);
    }
  }

  for (var i = 0; i < pads.length; i++) {
    pads[i].addEventListener('mousedown', pressDown);
    pads[i].addEventListener('mouseup', pressUp);
  }


  // CONTROL CENTER EVENT HANDLERS
  var onSwitch = document.getElementById("on-switch");
  var onSwitchKnob = document.getElementById("on-switch-knob");
  var strictButton = document.getElementById("strict-button");
  var buttons = document.getElementsByClassName('button');

  // handler for the strict mode button
  strictButton.addEventListener('click', function() {
    if (!strictMode) {
      /*
      * turn console on
      * turn light on button
      */
      addClass(strictButton, 'strict-button-on');
      turnStrictModeOn();
    } else {
      removeClass(strictButton, 'strict-button-on');
      turnStrictModeOff();
    }
  });

  // handlers for button presses
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mousedown', buttonDown);
    buttons[i].addEventListener('mouseup', buttonUp);
  }

  if ('ontouchstart' in window) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('touchstart', buttonDown);
      buttons[i].addEventListener('touchend', buttonUp);
    }
  }


  // Handler for the on switch for the console
  onSwitch.addEventListener('click', function() {
    if (onSwitchKnob.className.indexOf('knob-on') < 0) {
      addClass(onSwitchKnob, 'on-switch-knob-on');
      // Turns console on
      turnConsoleOn();

    } else {
      removeClass(onSwitchKnob, 'on-switch-knob-on');
      // Turns console off
      turnConsoleOff();
    }
  });

}
