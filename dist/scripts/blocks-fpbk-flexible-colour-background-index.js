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
/******/ 		"blocks-fpbk-flexible-colour-background-index": 0
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
/******/ 	deferredModules.push([127,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components"]);
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

/***/ "../blocks/fpbk/flexible-colour-background/block.json":
/*!************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/block.json ***!
  \************************************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/flexible-colour-background\",\"title\":\"Flexible Background\",\"category\":\"freshblocks\",\"description\":\"A block used as an container (with custom background colour or image) for other blocks.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"html\":false,\"color\":false}}");

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/_edit.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/_edit.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _components_BackgroundImages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/BackgroundImages */ "../blocks/fpbk/flexible-colour-background/src/components/BackgroundImages.js");
/* harmony import */ var _components_ReversedCorners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/ReversedCorners */ "../blocks/fpbk/flexible-colour-background/src/components/ReversedCorners.js");
/* harmony import */ var _components_Styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Styles */ "../blocks/fpbk/flexible-colour-background/src/components/Styles.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/flexible-colour-background/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/flexible-colour-background/block.json", 1);









/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "position-relative w-auto px-3 ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_4__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_8__["name"])
    });
  }

  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Context.Provider, {
    value: {
      attributes,
      setAttributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_8__["name"],
      blockProps
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].ColourPicker, {
    name: "background_colour",
    disableAlpha: true
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Acf.Accordion, {
    name: "background_images"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Acf.Accordion, {
    name: "reversed_corners"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_components_Styles__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/React.createElement("div", {
    className: " position-absolute flexible-colour-background__background-wrapper",
    style: {
      zIndex: '0'
    }
  }, /*#__PURE__*/React.createElement(_components_ReversedCorners__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/React.createElement(_components_BackgroundImages__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], null)));
});

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/components/BackgroundImages.js":
/*!************************************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/components/BackgroundImages.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");

/**
 * @param {Array} backgroundImages Background images.
 * @return {Object} Return array of display classes per screen size.
 */

const getVisibilityClassesForBackgroundImages = backgroundImages => {
  const visibilityClasses = {};
  const visibilityMaxBreakpoint = backgroundImages.map(backgroundImage => {
    return backgroundImage.screen_size;
  }).filter((value, index, self) => {
    return self.indexOf(value) === index;
  }).sort((a, b) => a < b ? 1 : -1).slice(0, 1)[0];
  visibilityClasses[visibilityMaxBreakpoint] = true;
  return visibilityClasses;
};

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    attributes
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__["getEditorControlsContext"])();
  const backgroundImages = attributes === null || attributes === void 0 ? void 0 : attributes.background_images;
  let backgroundImageNodes = [];

  if (Array.isArray(backgroundImages)) {
    const visibilityClasses = getVisibilityClassesForBackgroundImages(backgroundImages);
    backgroundImageNodes = backgroundImages.filter(backgroundImage => {
      var _backgroundImage$back;

      return (backgroundImage === null || backgroundImage === void 0 ? void 0 : (_backgroundImage$back = backgroundImage.background_image) === null || _backgroundImage$back === void 0 ? void 0 : _backgroundImage$back.url) && visibilityClasses[backgroundImage === null || backgroundImage === void 0 ? void 0 : backgroundImage.screen_size];
    }).map((backgroundImage, index) => {
      const styles = {
        backgroundImage: "url(".concat(backgroundImage.background_image.url, ")"),
        backgroundPosition: backgroundImage === null || backgroundImage === void 0 ? void 0 : backgroundImage.background_position,
        backgroundSize: backgroundImage !== null && backgroundImage !== void 0 && backgroundImage.custom_background_size ? backgroundImage.custom_background_size : backgroundImage === null || backgroundImage === void 0 ? void 0 : backgroundImage.background_size
      };

      if (backgroundImage !== null && backgroundImage !== void 0 && backgroundImage.max_width) {
        styles.maxWidth = backgroundImage.max_width;
        styles.marginLeft = 'auto';
        styles.marginRight = 'auto';
      }

      if (backgroundImage !== null && backgroundImage !== void 0 && backgroundImage.min_height) {
        styles.minHeight = backgroundImage.min_height;
      }

      let offset = parseInt(backgroundImage === null || backgroundImage === void 0 ? void 0 : backgroundImage.offset);

      if (offset !== 0) {
        const direction = offset > 0 ? 'bottom' : 'top';
        offset = Math.abs(offset);
        const offsetDoubled = offset * 2;
        styles.height = "calc(100% + ".concat(offsetDoubled, "px)");
        styles[direction] = "-".concat(offset, "px");
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "flexible-colour-background__background-image position-absolute d-block",
        style: styles,
        key: "bg_img_".concat(index)
      });
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, backgroundImageNodes);
});

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/components/ReversedCorners.js":
/*!***********************************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/components/ReversedCorners.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");

/* harmony default export */ __webpack_exports__["default"] = (() => {
  var _attributes$reversed_;

  const {
    attributes
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__["getEditorControlsContext"])();
  return /*#__PURE__*/React.createElement(React.Fragment, null, attributes === null || attributes === void 0 ? void 0 : (_attributes$reversed_ = attributes.reversed_corners) === null || _attributes$reversed_ === void 0 ? void 0 : _attributes$reversed_.map((corner, index) => {
    var _corner$placement, _corner$colour;

    return /*#__PURE__*/React.createElement("div", {
      key: "corner_".concat(index),
      className: "d-none d-md-block reversed-corner reversed-corner_".concat((_corner$placement = corner === null || corner === void 0 ? void 0 : corner.placement) !== null && _corner$placement !== void 0 ? _corner$placement : 'up-left', " reversed-corner_").concat((_corner$colour = corner === null || corner === void 0 ? void 0 : corner.colour) !== null && _corner$colour !== void 0 ? _corner$colour : 'white')
    }, /*#__PURE__*/React.createElement("div", null));
  }));
});

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/components/Styles.js":
/*!**************************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/components/Styles.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    attributes,
    blockProps
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_0__["getEditorControlsContext"])();
  const selector = "#".concat(blockProps.id);
  let style = '';

  if (attributes.background_colour) {
    style += "".concat(selector, " {\n\t\t\t\tbackground-color: ").concat(attributes.background_colour.hex, "\n\t\t\t}");
  }

  if (Array.isArray(attributes.background_images)) {
    attributes.background_images.forEach(background => {
      const backgroundColour = background.background_colour ? "background-color: ".concat(background.background_colour.hex, ";") : '';
      const maxWidth = background.max_width ? "max-width: ".concat(background.max_width, "; margin-left: auto; margin-right: auto;") : '';
      const minHeight = background.min_height ? "min-height: ".concat(background.min_height, ";") : '';
      style += "@media screen and (min-width: ".concat(background.screen_size, "px) {\n\t\t\t\t\t").concat(selector, " {\n\t\t\t\t\t\t").concat(backgroundColour, "\n\t\t\t\t\t\t").concat(maxWidth, "\n\t\t\t\t\t\t").concat(minHeight, "\n\t\t\t\t\t}\n\t\t\t\t}");
    });
  }

  return /*#__PURE__*/React.createElement("style", null, style);
});

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/index.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/index.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/flexible-colour-background/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/flexible-colour-background/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/flexible-colour-background/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/flexible-colour-background/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! images/logos/freshbooks-logomark-reacty.svg */ "./images/logos/freshbooks-logomark-reacty.svg");






const {
  name: blockName,
  ...restConfig
} = _block_json__WEBPACK_IMPORTED_MODULE_2__;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(blockName, { ...restConfig,
  icon: /*#__PURE__*/React.createElement("img", {
    src: images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    alt: "FreshBooks Logo"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].Content, null)
});

/***/ }),

/***/ "../blocks/fpbk/flexible-colour-background/src/style.scss":
/*!****************************************************************!*\
  !*** ../blocks/fpbk/flexible-colour-background/src/style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ 127:
/*!********************************************************************!*\
  !*** multi ../blocks/fpbk/flexible-colour-background/src/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/flexible-colour-background/src/index.js */"../blocks/fpbk/flexible-colour-background/src/index.js");


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

/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-flexible-colour-background-index.js.map