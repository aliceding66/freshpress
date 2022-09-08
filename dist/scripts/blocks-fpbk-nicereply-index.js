/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"blocks-fpbk-nicereply-index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/wp-content/themes/freshpress/dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([161,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../blocks/fpbk/nicereply/block.json":
/*!*******************************************!*\
  !*** ../blocks/fpbk/nicereply/block.json ***!
  \*******************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/nicereply\",\"title\":\"Nicereply\",\"category\":\"freshblocks\",\"description\":\"Nicereply form block.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true}}");

/***/ }),

/***/ "../blocks/fpbk/nicereply/src/_edit.js":
/*!*********************************************!*\
  !*** ../blocks/fpbk/nicereply/src/_edit.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/nicereply/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/nicereply/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/nicereply/block.json", 1);






/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "nicereply ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__["getCommonBlockSettingsClass"])(attributes))
  }); // eslint-disable-next-line no-undef

  const templateData = { ...nicereplyTemplateData,
    is_editor: true
  };
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_5__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_3__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_4___default.a,
    attributes: templateData
  })));
});

/***/ }),

/***/ "../blocks/fpbk/nicereply/src/index.js":
/*!*********************************************!*\
  !*** ../blocks/fpbk/nicereply/src/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/nicereply/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/nicereply/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/nicereply/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/nicereply/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! images/logos/freshbooks-logomark-reacty.svg */ "./images/logos/freshbooks-logomark-reacty.svg");





const {
  name: blockName,
  ...restConfig
} = _block_json__WEBPACK_IMPORTED_MODULE_1__;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(blockName, { ...restConfig,
  icon: /*#__PURE__*/React.createElement("img", {
    src: images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    alt: "FreshBooks Logo"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "../blocks/fpbk/nicereply/src/style.scss":
/*!***********************************************!*\
  !*** ../blocks/fpbk/nicereply/src/style.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/nicereply/templates/block.mustache":
/*!*********************************************************!*\
  !*** ../blocks/fpbk/nicereply/templates/block.mustache ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div>\n\t<section class='nicereply__step-one text-center my-4'>\n\t\t<h1 class='text-center'>{{ tell_us }}</h1>\n\t\t<p class='text-center mb-0 mt-5'>{{ product_feedback }}</p>\n\t\t<p class='text-center'>{{ rating }}</p>\n\n\t\t{{{ product_boxes }}}\n\t\t<p class='text-center mb-0 mt-5'>{{ support_feedback }}</p>\n\t\t<p class='text-center'>{{ rating }}</p>\n\n\t\t{{{ support_boxes }}}\n\t\t{{{ continue_button }}}\n\t</section>\n\n\t<section class='nicereply__step-two my-4 d-none'>\n\t\t<form action='/wp-json/nicereply/send' method='post' class='w-100 d-flex flex-column flex-wrap justify-content-center align-items-center'>\n\t\t\t<div class='nicereply__responses'>\n\t\t\t\t{{# responses }}\n\t\t\t\t\t<div class='nicereply__response--{{ type }} d-none'>\n\t\t\t\t\t\t<h1 class='nicereply__response-title text-center thankyou'>\n\t\t\t\t\t\t\t{{ title }}\n\t\t\t\t\t\t</h1>\n\t\t\t\t\t\t<p class='nicereply__response-body text-center'>\n\t\t\t\t\t\t\t{{ body }}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t{{/ responses }}\n\t\t\t</div>\n\n\t\t\t{{^ is_editor }}\n\t\t\t\t<textarea id='nicereply-feedback' name='nicereply-feedback' class='nicereply__feedback w-100 mx-auto my-0 border p-3' cols='30' rows='10'></textarea>\n\t\t\t{{/ is_editor }}\n\n\t\t\t<input type='hidden' name='done'>\n\t\t\t<input type='hidden' name='user'>\n\t\t\t<input type='hidden' name='ticketid'>\n\t\t\t<input type='hidden' name='supportExperienceScore'>\n\t\t\t<input type='hidden' name='productFeedbackScore'>\n\t\t\t<input type='hidden' name='comment'>\n\n\t\t\t{{{ submit_button }}}\n\t\t</form>\n\t</section>\n\n\t<section class='nicereply__step-three text-center my-4 d-none'>\n\t\t<h1 class='nicereply__thankyou mx-auto'>\n\t\t\t{{ thank_you }}\n\t\t</h1>\n\t</section>\n\n\t<section class='nicereply__footer'>\n\t\t<div class='nicereply__error text-center d-flex flex-column flex-wrap justify-content-center align-items-center'>\n\t\t\t<span class='nicereply__error--supportExperience text-center d-none'>\n\t\t\t\t{{ rate_support }}\n\t\t\t</span>\n\t\t\t<span id='nicereply__submission--error' class='nicereply__error--submit text-center d-none'>\n\t\t\t\t{{ error }}\n\t\t\t</span>\n\t\t</div>\n\n\t\t<div class='nicereply__page-dots d-flex justify-content-between'>\n\t\t\t<svg viewBox='0 0 12 12' class='nicereply__page-dot active'><circle cx='6' cy='6' r='6'/></svg>\n\t\t\t<svg viewBox='0 0 12 12' class='nicereply__page-dot'><circle cx='6' cy='6' r='6'/></svg>\n\t\t</div>\n\t</section>\n\n</div>\n", data, partials);
}
module.exports.templateString = "<div>\n\t<section class='nicereply__step-one text-center my-4'>\n\t\t<h1 class='text-center'>{{ tell_us }}</h1>\n\t\t<p class='text-center mb-0 mt-5'>{{ product_feedback }}</p>\n\t\t<p class='text-center'>{{ rating }}</p>\n\n\t\t{{{ product_boxes }}}\n\t\t<p class='text-center mb-0 mt-5'>{{ support_feedback }}</p>\n\t\t<p class='text-center'>{{ rating }}</p>\n\n\t\t{{{ support_boxes }}}\n\t\t{{{ continue_button }}}\n\t</section>\n\n\t<section class='nicereply__step-two my-4 d-none'>\n\t\t<form action='/wp-json/nicereply/send' method='post' class='w-100 d-flex flex-column flex-wrap justify-content-center align-items-center'>\n\t\t\t<div class='nicereply__responses'>\n\t\t\t\t{{# responses }}\n\t\t\t\t\t<div class='nicereply__response--{{ type }} d-none'>\n\t\t\t\t\t\t<h1 class='nicereply__response-title text-center thankyou'>\n\t\t\t\t\t\t\t{{ title }}\n\t\t\t\t\t\t</h1>\n\t\t\t\t\t\t<p class='nicereply__response-body text-center'>\n\t\t\t\t\t\t\t{{ body }}\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t{{/ responses }}\n\t\t\t</div>\n\n\t\t\t{{^ is_editor }}\n\t\t\t\t<textarea id='nicereply-feedback' name='nicereply-feedback' class='nicereply__feedback w-100 mx-auto my-0 border p-3' cols='30' rows='10'></textarea>\n\t\t\t{{/ is_editor }}\n\n\t\t\t<input type='hidden' name='done'>\n\t\t\t<input type='hidden' name='user'>\n\t\t\t<input type='hidden' name='ticketid'>\n\t\t\t<input type='hidden' name='supportExperienceScore'>\n\t\t\t<input type='hidden' name='productFeedbackScore'>\n\t\t\t<input type='hidden' name='comment'>\n\n\t\t\t{{{ submit_button }}}\n\t\t</form>\n\t</section>\n\n\t<section class='nicereply__step-three text-center my-4 d-none'>\n\t\t<h1 class='nicereply__thankyou mx-auto'>\n\t\t\t{{ thank_you }}\n\t\t</h1>\n\t</section>\n\n\t<section class='nicereply__footer'>\n\t\t<div class='nicereply__error text-center d-flex flex-column flex-wrap justify-content-center align-items-center'>\n\t\t\t<span class='nicereply__error--supportExperience text-center d-none'>\n\t\t\t\t{{ rate_support }}\n\t\t\t</span>\n\t\t\t<span id='nicereply__submission--error' class='nicereply__error--submit text-center d-none'>\n\t\t\t\t{{ error }}\n\t\t\t</span>\n\t\t</div>\n\n\t\t<div class='nicereply__page-dots d-flex justify-content-between'>\n\t\t\t<svg viewBox='0 0 12 12' class='nicereply__page-dot active'><circle cx='6' cy='6' r='6'/></svg>\n\t\t\t<svg viewBox='0 0 12 12' class='nicereply__page-dot'><circle cx='6' cy='6' r='6'/></svg>\n\t\t</div>\n\t</section>\n\n</div>\n";


/***/ }),

/***/ "./images/logos/freshbooks-logomark-reacty.svg":
/*!*****************************************************!*\
  !*** ./images/logos/freshbooks-logomark-reacty.svg ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/logos/freshbooks-logomark-reacty.svg");

/***/ }),

/***/ 161:
/*!***************************************************!*\
  !*** multi ../blocks/fpbk/nicereply/src/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/nicereply/src/index.js */"../blocks/fpbk/nicereply/src/index.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["richText"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-nicereply-index.js.map