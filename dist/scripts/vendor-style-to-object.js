(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-style-to-object"],{

/***/ "../../../node_modules/style-to-object/index.js":
/*!********************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/style-to-object/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! inline-style-parser */ "../../../node_modules/inline-style-parser/index.js");

/**
 * Parses inline style to object.
 *
 * @example
 * // returns { 'line-height': '42' }
 * StyleToObject('line-height: 42;');
 *
 * @param  {String}      style      - The inline style.
 * @param  {Function}    [iterator] - The iterator function.
 * @return {null|Object}
 */
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== 'string') {
    return output;
  }

  var declaration;
  var declarations = parse(style);
  var hasIterator = typeof iterator === 'function';
  var property;
  var value;

  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }

  return output;
}

module.exports = StyleToObject;


/***/ })

}]);
//# sourceMappingURL=vendor-style-to-object.js.map