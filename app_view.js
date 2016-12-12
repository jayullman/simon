"use strict";
/**********************
         VIEW
**********************/

var pads = document.getElementsByClassName('pad');

function pressDown(e) {
  var padNumber = e.target.id.slice(-1);
  illuminateOn(padNumber);

}

function  pressUp(e) {
  var padNumber = Number(e.target.id.slice(-1));
  illuminateOff(padNumber);
  playerChoice(padNumber);
  console.log(padNumber);
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

  // add event listeners for touch screens
  if ('ontouchstart' in window) {
    pads[i].addEventListener('touchstart', pressDown);
    pads[i].addEventListener('touchend', pressUp);
  }

  for (var i = 0; i < pads.length; i++) {
    pads[i].addEventListener('mousedown', pressDown);
    pads[i].addEventListener('mouseup', pressUp);
  }
}
