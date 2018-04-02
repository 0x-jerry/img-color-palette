const sigbits = 5
// get reduced-space color index for a pixel
function getColorIndex(r, g, b) {
  return (r << (2 * sigbits)) + (g << sigbits) + b;
}

// fill out a couple protovis dependencies
/*!
* Block below copied from Protovis: http://mbostock.github.com/protovis/
* Copyright 2010 Stanford Visualization Group
* Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
* @license
*/
let pv = {
    map: function(array, f) {
      var o = {};
      return f ? array.map(function(d, i) { o.index = i; return f.call(o, d); }) : array.slice();
    },
    naturalOrder: function(a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
    },
    sum: function(array, f) {
      var o = {};
      return array.reduce(f ? function(p, d, i) { o.index = i; return p + f.call(o, d); } : function(p, d) { return p + d; }, 0);
    },
    max: function(array, f) {
      return Math.max.apply(null, f ? pv.map(array, f) : array);
    }
};

export {
  pv,
  getColorIndex,
}
