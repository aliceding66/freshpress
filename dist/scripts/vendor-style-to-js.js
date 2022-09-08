(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor-style-to-js"],{

/***/ "../../../node_modules/style-to-js/cjs/index.js":
/*!********************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/style-to-js/cjs/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var style_to_object_1 = __importDefault(__webpack_require__(/*! style-to-object */ "../../../node_modules/style-to-object/index.js"));
var utilities_1 = __webpack_require__(/*! ./utilities */ "../../../node_modules/style-to-js/cjs/utilities.js");
function StyleToJS(style, options) {
    var output = {};
    if (!style || typeof style !== 'string') {
        return output;
    }
    style_to_object_1["default"](style, function (property, value) {
        if (property && value) {
            output[utilities_1.camelCase(property, options)] = value;
        }
    });
    return output;
}
exports["default"] = StyleToJS;


/***/ }),

/***/ "../../../node_modules/style-to-js/cjs/utilities.js":
/*!************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/style-to-js/cjs/utilities.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.camelCase = void 0;
var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
var HYPHEN_REGEX = /-([a-z])/g;
var NO_HYPHEN_REGEX = /^[^-]+$/;
var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
var skipCamelCase = function (property) {
    return !property ||
        NO_HYPHEN_REGEX.test(property) ||
        CUSTOM_PROPERTY_REGEX.test(property);
};
var capitalize = function (match, character) {
    return character.toUpperCase();
};
var trimHyphen = function (match, prefix) { return prefix + "-"; };
var camelCase = function (property, options) {
    if (options === void 0) { options = {}; }
    if (skipCamelCase(property)) {
        return property;
    }
    property = property.toLowerCase();
    if (!options.reactCompat) {
        property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
    }
    return property.replace(HYPHEN_REGEX, capitalize);
};
exports.camelCase = camelCase;


/***/ })

}]);
//# sourceMappingURL=vendor-style-to-js.js.map