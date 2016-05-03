/**
 * TinyAnimate
 *  version 0.3.0
 *
 * Source:  https://github.com/branneman/TinyAnimate
 * Author:  Bran van der Meer <branmovic@gmail.com> (http://bran.name/)
 * License: MIT
 *
 * Functions:
 *  TinyAnimate.animate(from, to, duration, update, easing, done)
 *  TinyAnimate.animateCSS(element, property, unit, from, to, duration, easing, done)
 *
 * Parameters:
 *  element   HTMLElement        A dom node
 *  property  string             Property name, as available in element.style, i.e. 'borderRadius', not 'border-radius'
 *  unit      string             Property unit, like 'px'
 *  from      int                Property value to animate from
 *  to        int                Property value to animate to
 *  duration  int                Duration in milliseconds
 *  update    function           Function to implement updating the DOM, get's called with a value between `from` and `to`
 *  easing    string | function  Optional: A string when the easing function is available in TinyAnimate.easings,
 *                                or a function with the signature: function(t, b, c, d) {...}
 *  done      function           Optional: To be executed when the animation has completed.
 */

var animate = exports.animate = function(from, to, duration, update, easing, done) {

    // Early bail out if called incorrectly
    if (typeof from !== 'number' ||
        typeof to !== 'number' ||
        typeof duration !== 'number' ||
        typeof update !== 'function')
        return;

    // Determine easing
    if (typeof easing === 'string' && ease(easing)) {
        easing = ease(easing);
    }
    if (typeof easing !== 'function') {
        easing = ease('linear');
    }

    // Create mock done() function if necessary
    if (typeof done !== 'function') {
        done = function() {};
    }

    // Pick implementation (requestAnimationFrame | setTimeout)
    var rAF = window.requestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    var now = window.performance && window.performance.now 
        ? function () { return window.performance.now() }
        : function () { return +new Date() };


    // Animation loop
    var change = to - from;
    function loop(timestamp) {
        var time = (timestamp || now()) - start;
        var progress = easing(time/duration);
        
        var currVal = from + progress*(change-from);

        update(currVal);

        if (time >= duration) {
            update(to);
            done();
        } else {
            rAF(loop);
        }
    }
    update(from);

    // Start animation loop
    var start = now();

    rAF(loop);
};

/**
 * TinyAnimate.animateCSS()
 *  Shortcut method for animating css properties
 */
exports.animateCSS = function(element, property, unit, from, to, duration, easing, done) {

    var update = function(value) {
        element.style[property] = value + unit;
    };
    animate(from, to, duration, update, easing, done);
};

// EASE @Lloyd Zhou
var ease = exports.ease = function(name){
    var p = Math.pow, e = function(i){
        var o = function(n,i){return i * p( 2, (i>0?-10:10)*(i>.5?n:(n-=1)) ) * Math.sin( ( n - .1  ) * ( 2 * Math.PI  ) / .4  ) + (i>0?1:0);}
        return function(n){
            if (n === 0 || n === 1) return n;
            if (i) return o(n,i)
            return ((n*=2)<1)?o(n,-.5):o(n,.5)
        }
    };
    var outbounce = function(n){
        return n<(1/2.75)?7.5625*n*n:n<(2/2.75)?7.5625*(n-=(1.5/2.75))*n+0.75:n<(2.5/2.75)?7.5625*(n-=(2.25/2.75))*n+0.9375:7.5625*(n-=(2.625/2.75))*n+0.984375;
    }, q = function(k,i){
        var t = k%2?1:-1
        return function(n){
            return i==-1?p(n,k):1==i?--n*p(n,k-1)*t+1: n<.5?.5*p(n*2,k):--n*p(n*2,k-1)*t+1
        }
    }, _ = {
        linear: function(n){return n},
        insine: function(n){return 1-Math.cos(n*Math.PI/2)},
        outsine: function(n){return Math.sin(n*Math.PI/2)},
        inoutsine: function(n){return .5*(1-Math.cos(Math.PI*n))},
        inquad: q(2,-1),
        outquad: q(2,1),
        inoutquad: q(2),
        incube: q(3,-1),
        outcube: q(3,1),
        inoutcube: q(3),
        inquart: q(4,-1),
        outquart: q(4,1),
        inoutquart: q(4),
        inquint: q(5,-1),
        outquint: q(5,1),
        inoutquint: q(5),
        inexpo: function(n){return 0==n?0:p(1024, n-1)},
        outexpo: function(n){return 1==n?n:1-p(2, -10*n)},
        inoutexpo: function(n){return 0==n||1==n?n:(n*=2)<1?.5*p(1024, n-1):.5*(-p(2,-10*(n-1))+2)},
        incirc: function(n){return 1 - Math.sqrt(1 - n * n);},
        outcirc: function(n){return Math.sqrt(1 - (--n * n));},
        inoutcirc: function(n){n*=2;return n<1?-0.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)},
        inback: function(n){var s = 1.70158;return n * n * (( s + 1  ) * n - s);},
        outback: function(n){var s = 1.70158;return --n * n * ((s + 1) * n + s) + 1;},
        inoutback: function(n){var s = 1.70158 * 1.525; return (n*=2)<1?.5*(n*n*((s+1)*n-s)):.5*((n-=2)*n*((s+1)*n+s)+2)},
        inbounce: function(n){return 1-outbounce(1-n)},
        outbounce: outbounce,
        inoutbounce: function(n){return n<.5?(1-outbounce(1-n*2))*.5:outbounce(n*2-1)*.5+.5},
        inelastic: e(-1),
        outelastic: e(1),
        inoutelastic: e(),
    }
    var ename = name.toLowerCase().replace(/ease|[_-]/g, '');
    console.log(ename)
    return _[ename] || _.linear;
};

