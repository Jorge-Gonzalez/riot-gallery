let _ = {};

// Based on @jonathansampson post Simple Throttle Function.
// http://sampsonblog.com/749/simple-throttle-function

_.throttle = function (targetFunc, lapse) {       // Using the Throttle analogy:

  let isOpen = true;                              // Keep valve's state.

  return function (...args) {                     // Returns a wrapper that
    if (isOpen) {                                 // when the valve is 'open' allows
      targetFunc.call(this, ...args);             // the execution of the target function
      isOpen = false;                             // and 'closes', prevents future calls of being executed
      setTimeout(() => isOpen = true, lapse);     // for a while, and finally 'opens' it again.
    }
  }
}


// borrowed from: Underscore
var is = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error']
	.forEach((name) => _['is' + name] = (obj) => Object.prototype.toString.call(obj) === '[object ' + name + ']');

// borrowed from: gascrolldepth.js | v0.9 Licensed under the MIT and GPL licenses.
// Copyright (c) 2015 Rob Flaherty (@robflaherty), Leigh McCulloch (@___leigh___)
_.getDocumentHeight = function getDocumentHeight() {
  return Math.max(
    document.documentElement.scrollHeight, document.body.scrollHeight,
    document.documentElement.offsetHeight, document.body.offsetHeight,
    document.documentElement.clientHeight
  );
}
_.getWindowWidth = function() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
_.getWindowHeight = function() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
_.getPageYOffset = function() {
  return window.pageYOffset || (document.compatMode === "CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop);
}
_.getElementYOffsetToDocumentTop = function(element) {
  return element.getBoundingClientRect().top + getPageYOffset();
}
_.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default _