(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-dashify"],{

/***/ "../../../node_modules/dashify/index.js":
/*!************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/dashify/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * dashify <https://github.com/jonschlinkert/dashify>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */


__webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");

module.exports = (str, options) => {
  if (typeof str !== 'string') throw new TypeError('expected a string');
  return str.trim().replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\W/g, m => /[À-ž]/.test(m) ? m : '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, m => options && options.condense ? '-' : m).toLowerCase();
};

/***/ })

}]);
//# sourceMappingURL=vendor-dashify.js.map