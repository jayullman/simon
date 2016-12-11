"use strict";
/**********************
         VIEW
**********************/

var pads = document.getElementsByClassName('pad');


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
  for (var i = 0; i < pads.length; i++) {
    // TODO: add event listeners for mouse/touch down and up
    pads[i].addEventListener('', clickPad);

    //
  }


}
