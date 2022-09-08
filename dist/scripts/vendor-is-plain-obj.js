(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-is-plain-obj"],{

/***/ "../../../node_modules/is-plain-obj/index.js":
/*!*****************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/is-plain-obj/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = value => {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
};

/***/ })

}]);
//# sourceMappingURL=vendor-is-plain-obj.js.map