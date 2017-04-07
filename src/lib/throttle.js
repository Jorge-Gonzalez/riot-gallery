/**
 * Super simple throttle, leading only, not greedy.
 * Based on @jonathansampson post Simple Throttle Function.
 * http://sampsonblog.com/749/simple-throttle-function
 *
 * @param      {Function}  targetFunc  The target function.
 * @param      {Number}    lapse       The time that the target function will be blocked in ms.
 * @return     {Function}              A throttled function.
 */
module.exports = function throttle (targetFunc, lapse) {   // Using the Throttle analogy:
  let isOpen = true                                        // Valve's state.

  return function throttled () {                           // Returns a function that
    if (isOpen) {                                          // when the valve is 'open' allows one call to the target function
      isOpen = false                                       // and 'closes', prevents future calls of being executed,
      setTimeout(() => (isOpen = true), lapse)             // and later after a lapse 'opens' the valve back.
      return targetFunc.apply(this, arguments)             // Returning the result of the target applying the throttled scope and args.
    }
  }
}
