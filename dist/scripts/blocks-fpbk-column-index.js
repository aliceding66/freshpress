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
/******/ 		"blocks-fpbk-column-index": 0
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
/******/ 	deferredModules.push([91,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components"]);
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

/***/ "../blocks/fpbk/column/block.json":
/*!****************************************!*\
  !*** ../blocks/fpbk/column/block.json ***!
  \****************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/column\",\"title\":\"Column\",\"category\":\"freshblocks\",\"description\":\"Column housed in our Columns block.\",\"textdomain\":\"fpbk\",\"supports\":{\"__experimental_jsx\":true,\"align\":false,\"defaultStylePicker\":false,\"html\":false,\"anchor\":false,\"inserter\":false}}");

/***/ }),

/***/ "../blocks/fpbk/column/src/_edit.js":
/*!******************************************!*\
  !*** ../blocks/fpbk/column/src/_edit.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _utils_BootstrapClassParser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/_BootstrapClassParser */ "../blocks/fpbk/column/utils/_BootstrapClassParser.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/column/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/column/block.json", 1);








const widthsInPercentage = ['0%', '8.33%', '16.67%', '25%', '33.33%', '41.67%', '50%', '58.33%', '66.67%', '75%', '83.33%', '91.67%', '100%'];
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  setAttributes
}) {
  var _columnBreakpoints$se9;

  const bootstrapParser = new _utils_BootstrapClassParser__WEBPACK_IMPORTED_MODULE_6__["default"](attributes.bootstrap_class);

  const initBreakpointOptions = (breakpoint, skipEnabled = false) => {
    const options = {
      auto_width: bootstrapParser.isAutoWidth(breakpoint),
      width: bootstrapParser.getWidth(breakpoint, 12),
      offset: bootstrapParser.getOffset(breakpoint, 0),
      order: bootstrapParser.getOrder(breakpoint, 0),
      hidden: bootstrapParser.isHidden(breakpoint)
    };

    if (!skipEnabled) {
      options.enabled = bootstrapParser.breakpointExists(breakpoint);
    }

    return options;
  };

  const [columnBreakpoints, setColumnBreakpoints] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    general: initBreakpointOptions('general', true),
    sm: initBreakpointOptions('sm'),
    md: initBreakpointOptions('md'),
    lg: initBreakpointOptions('lg'),
    xl: initBreakpointOptions('xl'),
    xxl: initBreakpointOptions('xxl')
  });
  const enabledBreakpoints = Object.entries(columnBreakpoints).filter(([, val]) => val.enabled || val.enabled === undefined).map(([key]) => key);
  const [selectedSize, setSelectedSize] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(_utils_BootstrapClassParser__WEBPACK_IMPORTED_MODULE_6__["default"].getViewportBreakpoint(enabledBreakpoints));

  const enabledChar = size => {
    const {
      enabled = true
    } = columnBreakpoints[size];
    return "[".concat(enabled ? '✓' : '✗', "] ");
  };

  const labels = {
    general: enabledChar('general') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('General', 'freshpress-website'),
    sm: enabledChar('sm') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Mobile (sm)', 'freshpress-website'),
    md: enabledChar('md') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Tablet', 'freshpress-website'),
    lg: enabledChar('lg') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Desktop', 'freshpress-website'),
    xl: enabledChar('xl') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Desktop FullHD', 'freshpress-website'),
    xxl: enabledChar('xxl') + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Desktop HD', 'freshpress-website')
  };
  const bootstrapClass = _utils_BootstrapClassParser__WEBPACK_IMPORTED_MODULE_6__["default"].buildClassFromBreakpoints(columnBreakpoints);
  setAttributes({
    bootstrap_class: bootstrapClass
  });
  let activeControls = null;
  let screenRange = null;

  if (columnBreakpoints[selectedSize].enabled || typeof columnBreakpoints[selectedSize].enabled === 'undefined') {
    var _columnBreakpoints$se, _columnBreakpoints$se2, _columnBreakpoints$se3, _columnBreakpoints$se4, _columnBreakpoints$se5, _columnBreakpoints$se6, _columnBreakpoints$se7, _columnBreakpoints$se8;

    activeControls = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Auto width', 'freshpress-website'),
      value: (_columnBreakpoints$se = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se === void 0 ? void 0 : _columnBreakpoints$se.auto_width,
      onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
        [selectedSize]: { ...columnBreakpoints[selectedSize],
          auto_width: value
        }
      })
    }), ((_columnBreakpoints$se2 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se2 === void 0 ? void 0 : _columnBreakpoints$se2.auto_width) < 1 && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Range, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Width', 'freshpress-website') + " (".concat(widthsInPercentage[(_columnBreakpoints$se3 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se3 === void 0 ? void 0 : _columnBreakpoints$se3.width], ")"),
      min: 1,
      max: 12,
      value: (_columnBreakpoints$se4 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se4 === void 0 ? void 0 : _columnBreakpoints$se4.width,
      onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
        [selectedSize]: { ...columnBreakpoints[selectedSize],
          offset: Math.min(12 - value, columnBreakpoints[selectedSize].offset),
          width: value
        }
      })
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Range, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Offset', 'freshpress-website') + " (".concat(widthsInPercentage[(_columnBreakpoints$se5 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se5 === void 0 ? void 0 : _columnBreakpoints$se5.offset], ")"),
      min: 0,
      max: 11,
      value: (_columnBreakpoints$se6 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se6 === void 0 ? void 0 : _columnBreakpoints$se6.offset,
      onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
        [selectedSize]: { ...columnBreakpoints[selectedSize],
          offset: value,
          width: Math.min(columnBreakpoints[selectedSize].width, 12 - value)
        }
      })
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Number, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Order', 'freshpress-website'),
      value: (_columnBreakpoints$se7 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se7 === void 0 ? void 0 : _columnBreakpoints$se7.order,
      instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('0 is default order', 'freshpress-website'),
      min: 0,
      max: 99,
      onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
        [selectedSize]: { ...columnBreakpoints[selectedSize],
          order: value
        }
      })
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Hide block', 'freshpress-website'),
      value: (_columnBreakpoints$se8 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se8 === void 0 ? void 0 : _columnBreakpoints$se8.hidden,
      onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
        [selectedSize]: { ...columnBreakpoints[selectedSize],
          hidden: value
        }
      })
    }));
    screenRange = /*#__PURE__*/React.createElement("p", null, _utils_BootstrapClassParser__WEBPACK_IMPORTED_MODULE_6__["default"].getRangeForBreakpoint(columnBreakpoints, selectedSize));
  }

  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "column mr-0 my-2 ".concat(bootstrapClass)
  });
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Context.Provider, {
    value: {
      attributes,
      setAttributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_7__["name"]
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Select screen size', 'freshpress-website'),
    choices: labels,
    value: selectedSize,
    onChange: newSelectedSize => {
      setSelectedSize(newSelectedSize);
    }
  }), screenRange, typeof columnBreakpoints[selectedSize].enabled !== 'undefined' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Enable screen size', 'freshpress-website'),
    value: (_columnBreakpoints$se9 = columnBreakpoints[selectedSize]) === null || _columnBreakpoints$se9 === void 0 ? void 0 : _columnBreakpoints$se9.enabled,
    onChange: value => setColumnBreakpoints({ ...columnBreakpoints,
      [selectedSize]: { ...columnBreakpoints[selectedSize],
        enabled: value
      }
    })
  }), activeControls), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"], {
    renderAppender: () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].ButtonBlockAppender, null)
  })));
});

/***/ }),

/***/ "../blocks/fpbk/column/src/editor.scss":
/*!*********************************************!*\
  !*** ../blocks/fpbk/column/src/editor.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/column/src/index.js":
/*!******************************************!*\
  !*** ../blocks/fpbk/column/src/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/column/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/column/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/column/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/column/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/column/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! images/logos/freshbooks-logomark-reacty.svg */ "./images/logos/freshbooks-logomark-reacty.svg");







const {
  name: blockName,
  ...restConfig
} = _block_json__WEBPACK_IMPORTED_MODULE_2__;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(blockName, { ...restConfig,
  icon: /*#__PURE__*/React.createElement("img", {
    src: images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
    alt: "FreshBooks Logo"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].Content, null)
});

/***/ }),

/***/ "../blocks/fpbk/column/src/style.scss":
/*!********************************************!*\
  !*** ../blocks/fpbk/column/src/style.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/column/utils/_BootstrapClassParser.js":
/*!************************************************************!*\
  !*** ../blocks/fpbk/column/utils/_BootstrapClassParser.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BootstrapClassParser; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);

const breakpoints = {
  general: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1600
};
class BootstrapClassParser {
  constructor(className) {
    this.class = '';
    this.class = className;
  }

  static getViewportBreakpoint(enabledBreakpoints) {
    const {
      innerWidth
    } = window;
    const entries = Object.entries(breakpoints).filter(([key]) => enabledBreakpoints.includes(key));

    for (let i = 0; i < entries.length; i++) {
      const [, val] = entries[i];

      if (innerWidth < val) {
        return entries[i - 1][0];
      }
    }

    return entries[entries.length - 1][0];
  }

  static buildClassFromBreakpoints(columnBreakpoints) {
    let bootstrapClass = '';

    for (let [currentSize, {
      auto_width: autoWidth,
      width,
      offset,
      order,
      hidden,
      enabled = true
    }] of Object.entries(columnBreakpoints)) {
      if (enabled) {
        currentSize = currentSize === 'general' ? '' : "-".concat(currentSize);

        if (autoWidth) {
          bootstrapClass += "col".concat(currentSize, " ");
        } else {
          bootstrapClass += "col".concat(currentSize, "-").concat(width, " ");
        }

        bootstrapClass += "offset".concat(currentSize, "-").concat(offset, " ");

        if (order > 0) {
          bootstrapClass += "order".concat(currentSize, "-").concat(order, " ");
        }

        if (hidden) {
          bootstrapClass += "d".concat(currentSize, "-none ");
        } else {
          bootstrapClass += "d".concat(currentSize, "-flex ");
        }
      }
    }

    return bootstrapClass;
  }

  static getRangeForBreakpoint(columnBreakpoints, selectedSize) {
    const enabledSizes = [];

    for (const [key, {
      enabled = true
    }] of Object.entries(columnBreakpoints)) {
      if (enabled) {
        enabledSizes.push(key);
      }
    }

    let x = '';
    let y = '';

    if (enabledSizes.includes(selectedSize)) {
      const nextSmallest = enabledSizes[enabledSizes.indexOf(selectedSize) + 1];
      x = breakpoints[selectedSize];
      y = breakpoints[nextSmallest] - 1 || '∞ ';
    }

    return "Column width on screen range: ".concat(x, "px- ").concat(y, "px");
  }

  formatBreakpoint(breakpoint) {
    return breakpoint === 'general' ? '' : "-".concat(breakpoint);
  }

  isAutoWidth(breakpoint) {
    const regex = new RegExp("col".concat(this.formatBreakpoint(breakpoint), "(?!-)"));
    return !!this.class.match(regex);
  }

  getWidth(breakpoint, defaultValue) {
    const regex = new RegExp("col".concat(this.formatBreakpoint(breakpoint), "-(\\d\\d?)"));
    return this.returnResult(regex.exec(this.class), defaultValue);
  }

  getOffset(breakpoint, defaultValue) {
    const regex = new RegExp("offset".concat(this.formatBreakpoint(breakpoint), "-(\\d\\d?)"));
    return this.returnResult(regex.exec(this.class), defaultValue);
  }

  getOrder(breakpoint, defaultValue) {
    const regex = new RegExp("order".concat(this.formatBreakpoint(breakpoint), "-(\\d\\d?)"));
    return this.returnResult(regex.exec(this.class), defaultValue);
  }

  isHidden(breakpoint) {
    const regex = new RegExp("d".concat(this.formatBreakpoint(breakpoint), "-none"));
    return !!this.class.match(regex);
  }

  breakpointExists(breakpoint) {
    return this.isAutoWidth(breakpoint) || this.getWidth(breakpoint) > 0;
  }

  returnResult(result, defaultValue) {
    if (!result) {
      return defaultValue;
    }

    switch (typeof defaultValue) {
      case 'number':
        return parseInt(result[1]);

      default:
        return result[1];
    }
  }

}

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

/***/ 91:
/*!************************************************!*\
  !*** multi ../blocks/fpbk/column/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/column/src/index.js */"../blocks/fpbk/column/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-column-index.js.map