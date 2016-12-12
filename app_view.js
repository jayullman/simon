"use strict";
/**********************
         VIEW
**********************/

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
  pads[padNumber].className += ' pad-' + padNumber + '-on';
}


function illuminateOff(padNumber) {
  var elemClassList = pads[padNumber].className;
  var startIndex = elemClassList.indexOf(' ' + 'pad-' + padNumber + '-on');
  if (startIndex > -1) {
    var revertedClassList = elemClassList.slice(0, startIndex);
    pads[padNumber].className = revertedClassList;
  }
}

window.onload = function() {
  // attach event handlers to all the pads
  console.log(pads);
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
  console.log(onSwitch);
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
