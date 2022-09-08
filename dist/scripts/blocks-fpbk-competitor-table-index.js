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
/******/ 		"blocks-fpbk-competitor-table-index": 0
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
/******/ 	deferredModules.push([99,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/nanoid/index.browser.js":
/*!*******************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/nanoid/index.browser.js ***!
  \*******************************************************************************/
/*! exports provided: nanoid, customAlphabet, customRandom, urlAlphabet, random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nanoid", function() { return nanoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customAlphabet", function() { return customAlphabet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customRandom", function() { return customRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "../../../node_modules/nanoid/url-alphabet/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__["urlAlphabet"]; });


if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "../../../node_modules/nanoid/url-alphabet/index.js":
/*!************************************************************************************!*\
  !*** /Users/xue.ding/freshpress-website/node_modules/nanoid/url-alphabet/index.js ***!
  \************************************************************************************/
/*! exports provided: urlAlphabet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlAlphabet", function() { return urlAlphabet; });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ }),

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

/***/ "../blocks/fpbk/competitor-table/block.json":
/*!**************************************************!*\
  !*** ../blocks/fpbk/competitor-table/block.json ***!
  \**************************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/competitor-table\",\"title\":\"Competitor Table\",\"category\":\"freshblocks\",\"description\":\"A table to compare Freshbooks against a competitor.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/_edit.js":
/*!****************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/_edit.js ***!
  \****************************************************/
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/competitor-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/competitor-table/block.json", 1);
/* harmony import */ var _components_FeatureRows__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/FeatureRows */ "../blocks/fpbk/competitor-table/src/components/FeatureRows.js");
/* harmony import */ var _components_CompetitorScreenshots__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/CompetitorScreenshots */ "../blocks/fpbk/competitor-table/src/components/CompetitorScreenshots.js");
/* harmony import */ var _components_CompetitorNames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/CompetitorNames */ "../blocks/fpbk/competitor-table/src/components/CompetitorNames.js");
/* harmony import */ var _state_competitors_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/competitors/_reducer */ "../blocks/fpbk/competitor-table/src/state/competitors/_reducer.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



 // eslint-disable-line

 // eslint-disable-line









/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "competitor-table position-relative ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_7__["name"])
    });
  }

  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["BlockStateManager"](attributes, setAttributes);
  const [competitors, competitorsDispatch] = blockStateManager.addReducerManager(_state_competitors_reducer__WEBPACK_IMPORTED_MODULE_11__["default"], 'competitors');
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_7__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].ColourPicker, {
    name: "freshbooks_column_colour"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", _extends({}, blockProps, {
    style: {
      padding: '0 5rem'
    }
  }), /*#__PURE__*/React.createElement("style", null, "#".concat(attributes.id, " tr td:nth-child(2), #").concat(attributes.id, " tr th:nth-child(2) {\n\t\t\t\t\t\t\tbackground-color: ").concat(attributes.freshbooks_column_colour, ";\n\t\t\t\t\t\t}")), /*#__PURE__*/React.createElement("table", {
    className: "w-100"
  }, /*#__PURE__*/React.createElement("tr", {
    className: "position-relative"
  }, /*#__PURE__*/React.createElement("th", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["_x"])('Product Comparison', 'Competitor Table Block', 'freshpress-website')), /*#__PURE__*/React.createElement(_components_CompetitorNames__WEBPACK_IMPORTED_MODULE_10__["default"], {
    attributes: attributes,
    competitors: competitors,
    competitorsDispatch: competitorsDispatch
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["_x"])('Product Screenshot', 'Competitor Table Block', 'freshpress-website')), /*#__PURE__*/React.createElement(_components_CompetitorScreenshots__WEBPACK_IMPORTED_MODULE_9__["default"], {
    competitors: competitors,
    competitorsDispatch: competitorsDispatch
  })), /*#__PURE__*/React.createElement(_components_FeatureRows__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: attributes,
    setAttributes: setAttributes
  })), /*#__PURE__*/React.createElement("span", {
    className: "competitor-table__subtext mx-auto d-block",
    style: {
      maxWidth: '320px'
    }
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
    name: "subtext",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["_x"])('Enter Subtext Here', 'Competitor Table Block', 'freshpress-website')
  }))));
});

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/components/CompetitorNames.js":
/*!*************************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/components/CompetitorNames.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/competitors/_actions */ "../blocks/fpbk/competitor-table/src/state/competitors/_actions.js");
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





const CompetitorNames = ({
  attributes,
  competitors,
  competitorsDispatch
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, competitors.length && competitors.map((competitor, competitorIndex) => /*#__PURE__*/React.createElement("th", {
    key: "competitorName_".concat(competitorIndex)
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-editor__block-controls d-flex justify-content-center position-relative mb-3"
  }, competitorIndex > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSmall: true,
    onClick: () => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_MOVE_LEFT"],
        index: competitorIndex
      });
    },
    icon: "arrow-left-alt2"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isDestructive: true,
    isSmall: true,
    onClick: () => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_REMOVE"],
        index: competitorIndex
      });
    },
    icon: "no-alt"
  }), competitorIndex < competitors.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSmall: true,
    onClick: () => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_MOVE_RIGHT"],
        index: competitorIndex
      });
    },
    icon: "arrow-right-alt2"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].TrueFalse, {
    value: competitor.has_logo,
    label: 'Use logo?',
    onChange: value => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_EDIT_HAS_LOGO"],
        index: competitorIndex,
        value
      });
    }
  }), competitor.has_logo ? /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Image, {
    inline: true,
    className: "img-fluid",
    value: competitor.logo,
    onChange: value => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_EDIT_LOGO"],
        index: competitorIndex,
        value
      });
    },
    previewSize: "large"
  }) : /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
    isSimple: true,
    value: competitor.name,
    onChange: value => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["COMPETITOR_EDIT_NAME"],
        index: competitorIndex,
        value
      });
    },
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["_x"])('Enter Competitor Name', 'Competitor Table Block', 'freshpress-website')
  }))), competitors.length < 3 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSmall: true,
    className: "position-absolute",
    style: {
      left: 'calc( 100% + 25px )',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    onClick: () => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_1__["ADD_COMPETITOR"],
        featuresNumber: attributes.features.length
      });
    },
    icon: "plus-alt2"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (CompetitorNames);

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/components/CompetitorScreenshots.js":
/*!*******************************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/components/CompetitorScreenshots.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_competitors_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/competitors/_actions */ "../blocks/fpbk/competitor-table/src/state/competitors/_actions.js");
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");



const CompetitorScreenshots = ({
  competitors,
  competitorsDispatch
}) => {
  return competitors.length && competitors.map((competitor, competitorIndex) => /*#__PURE__*/React.createElement("td", {
    key: competitorIndex
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, 'Desktop Screenshot'), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Image, {
    inline: true,
    className: "img-fluid",
    value: competitor.screenshot,
    onChange: value => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_0__["COMPETITOR_EDIT_SCREENSHOT"],
        index: competitorIndex,
        value
      });
    },
    previewSize: "large"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-2"
  }, 'Mobile Screenshot'), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Image, {
    inline: true,
    className: "img-fluid",
    value: competitor.mobile_screenshot,
    onChange: value => {
      competitorsDispatch({
        type: _state_competitors_actions__WEBPACK_IMPORTED_MODULE_0__["COMPETITOR_EDIT_MOBILE_SCREENSHOT"],
        index: competitorIndex,
        value
      });
    },
    previewSize: "large"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (CompetitorScreenshots);

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/components/FeatureRows.js":
/*!*********************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/components/FeatureRows.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/competitor-features */ "../blocks/fpbk/competitor-table/src/utils/competitor-features.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _state_features_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/features/_actions */ "../blocks/fpbk/competitor-table/src/state/features/_actions.js");
/* harmony import */ var _state_features_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../state/features/_reducer */ "../blocks/fpbk/competitor-table/src/state/features/_reducer.js");
/* harmony import */ var images_icons_checkmark_green_gradient_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! images/icons/checkmark-green-gradient.svg */ "./images/icons/checkmark-green-gradient.svg");
/* harmony import */ var images_icons_crossmark_red_gradient_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! images/icons/crossmark-red-gradient.svg */ "./images/icons/crossmark-red-gradient.svg");











const FeatureRows = ({
  attributes,
  setAttributes
}) => {
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["BlockStateManager"](attributes, setAttributes);
  const [features, featuresDispatch] = blockStateManager.addReducerManager(_state_features_reducer__WEBPACK_IMPORTED_MODULE_7__["default"], 'features');
  return /*#__PURE__*/React.createElement(React.Fragment, null, features.length && features.map((feature, featureIndex) => /*#__PURE__*/React.createElement("tr", {
    key: "".concat(feature.key, "_feature_row"),
    className: "competitor-table__feature-row"
  }, /*#__PURE__*/React.createElement("td", {
    className: "position-relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "block-editor__block-controls d-flex flex-column justify-content-center position-absolute",
    style: {
      top: '50%',
      left: '-50px',
      transform: 'translateY( -50% )'
    }
  }, featureIndex > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isSmall: true,
    onClick: () => {
      featuresDispatch({
        type: _state_features_actions__WEBPACK_IMPORTED_MODULE_6__["FEATURE_MOVE_UP"],
        index: featureIndex
      });
      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(false, featureIndex, false, 'move_up', attributes.competitors, setAttributes);
    },
    icon: "arrow-up-alt2"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isDestructive: true,
    isSmall: true,
    onClick: () => {
      featuresDispatch({
        type: _state_features_actions__WEBPACK_IMPORTED_MODULE_6__["FEATURE_REMOVE"],
        index: featureIndex
      });
      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(false, featureIndex, false, 'remove', attributes.competitors, setAttributes);
    },
    icon: "no-alt"
  }), featureIndex < features.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isSmall: true,
    onClick: () => {
      featuresDispatch({
        type: _state_features_actions__WEBPACK_IMPORTED_MODULE_6__["FEATURE_MOVE_DOWN"],
        index: featureIndex
      });
      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(false, featureIndex, false, 'move_down', attributes.competitors, setAttributes);
    },
    icon: "arrow-down-alt2"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
    isSimple: true,
    value: feature.name,
    onChange: value => {
      featuresDispatch({
        type: _state_features_actions__WEBPACK_IMPORTED_MODULE_6__["FEATURE_EDIT_NAME"],
        index: featureIndex,
        value
      });
    },
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert Name', 'freshpress-website')
  })), attributes.competitors.map((competitor, competitorIndex) => /*#__PURE__*/React.createElement("td", {
    key: "".concat(competitor.key, "_feature_row")
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "".concat(competitor.key, "_feature_row-checkmark"),
    className: "competitor-table__feature-row-label position-relative overflow-hidden mx-2"
  }, /*#__PURE__*/React.createElement("input", {
    id: "".concat(competitor.key, "_feature_row-checkmark"),
    type: "checkbox",
    value: competitor.features[featureIndex].checkmark,
    checked: competitor.features[featureIndex].checkmark,
    onChange: () => {
      const newFeature = { ...competitor.features[featureIndex]
      };

      if (newFeature.checkmark) {
        newFeature.checkmark = false;
      } else if (!newFeature.checkmark && newFeature.crossmark) {
        newFeature.crossmark = !competitor.features[featureIndex].crossmark;
        newFeature.checkmark = !competitor.features[featureIndex].checkmark;
      } else {
        newFeature.checkmark = true;
      }

      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(competitorIndex, featureIndex, newFeature, 'update', attributes.competitors, setAttributes);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: images_icons_checkmark_green_gradient_svg__WEBPACK_IMPORTED_MODULE_8__["default"],
    alt: "checkmark"
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "".concat(competitor.key, "_feature_row-crossmark"),
    className: "competitor-table__feature-row-label position-relative overflow-hidden mx-2"
  }, /*#__PURE__*/React.createElement("input", {
    id: "".concat(competitor.key, "_feature_row-crossmark"),
    type: "checkbox",
    value: competitor.features[featureIndex].crossmark,
    checked: competitor.features[featureIndex].crossmark,
    onChange: () => {
      const newFeature = { ...competitor.features[featureIndex]
      };

      if (newFeature.crossmark) {
        newFeature.crossmark = false;
      } else if (!newFeature.crossmark && newFeature.checkmark) {
        newFeature.crossmark = !competitor.features[featureIndex].crossmark;
        newFeature.checkmark = !competitor.features[featureIndex].checkmark;
      } else {
        newFeature.crossmark = true;
      }

      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(competitorIndex, featureIndex, newFeature, 'update', attributes.competitors, setAttributes);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: images_icons_crossmark_red_gradient_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
    alt: "crossmark"
  }))), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
    isSimple: true,
    value: competitor.features[featureIndex].text,
    onChange: value => {
      const newFeature = { ...competitor.features[featureIndex]
      };
      newFeature.text = value;
      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(competitorIndex, featureIndex, newFeature, 'update', attributes.competitors, setAttributes);
    },
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert Text', 'freshpress-website')
  }))))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isSmall: true,
    className: "position-absolute",
    style: {
      bottom: '36px',
      left: '33px'
    },
    onClick: () => {
      featuresDispatch({
        type: _state_features_actions__WEBPACK_IMPORTED_MODULE_6__["ADD_FEATURE"]
      });
      Object(_utils_competitor_features__WEBPACK_IMPORTED_MODULE_3__["changeCompetitorFeature"])(false, false, false, 'add', attributes.competitors, setAttributes);
    },
    icon: "plus-alt2"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (FeatureRows);

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/index.js":
/*!****************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/index.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/competitor-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/competitor-table/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/competitor-table/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/competitor-table/src/style.scss");
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

/***/ "../blocks/fpbk/competitor-table/src/state/competitors/_actions.js":
/*!*************************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/state/competitors/_actions.js ***!
  \*************************************************************************/
/*! exports provided: ADD_COMPETITOR, COMPETITOR_REMOVE, COMPETITOR_EDIT_HAS_LOGO, COMPETITOR_EDIT_LOGO, COMPETITOR_EDIT_NAME, COMPETITOR_EDIT_SCREENSHOT, COMPETITOR_EDIT_MOBILE_SCREENSHOT, COMPETITOR_MOVE_RIGHT, COMPETITOR_MOVE_LEFT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COMPETITOR", function() { return ADD_COMPETITOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_REMOVE", function() { return COMPETITOR_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_EDIT_HAS_LOGO", function() { return COMPETITOR_EDIT_HAS_LOGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_EDIT_LOGO", function() { return COMPETITOR_EDIT_LOGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_EDIT_NAME", function() { return COMPETITOR_EDIT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_EDIT_SCREENSHOT", function() { return COMPETITOR_EDIT_SCREENSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_EDIT_MOBILE_SCREENSHOT", function() { return COMPETITOR_EDIT_MOBILE_SCREENSHOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_MOVE_RIGHT", function() { return COMPETITOR_MOVE_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPETITOR_MOVE_LEFT", function() { return COMPETITOR_MOVE_LEFT; });
const ADD_COMPETITOR = 'ac';
const COMPETITOR_REMOVE = 'cr';
const COMPETITOR_EDIT_HAS_LOGO = 'cehl';
const COMPETITOR_EDIT_LOGO = 'cel';
const COMPETITOR_EDIT_NAME = 'cen';
const COMPETITOR_EDIT_SCREENSHOT = 'ces';
const COMPETITOR_EDIT_MOBILE_SCREENSHOT = 'cems';
const COMPETITOR_MOVE_RIGHT = 'cmr';
const COMPETITOR_MOVE_LEFT = 'cml';

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/state/competitors/_reducer.js":
/*!*************************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/state/competitors/_reducer.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/competitor-table/src/state/competitors/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_COMPETITOR"]:
      return [...state, {
        key: "competitor_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
        has_logo: false,
        name: '',
        logo: '',
        screenshot: '',
        mobile_screenshot: '',
        features: [...Array(action.featuresNumber).keys()].map(() => ({
          key: "competitor-feature_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
          text: '',
          checkmark: false,
          crossmark: false
        }))
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_REMOVE"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_EDIT_HAS_LOGO"]:
      return editAtIndex('has_logo');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_EDIT_LOGO"]:
      return editAtIndex('logo');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_EDIT_NAME"]:
      return editAtIndex('name');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_EDIT_SCREENSHOT"]:
      return editAtIndex('screenshot');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_EDIT_MOBILE_SCREENSHOT"]:
      return editAtIndex('mobile_screenshot');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_MOVE_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["COMPETITOR_MOVE_RIGHT"]:
      const movedRightState = [...state];
      const nextItem = movedRightState[action.index + 1];
      movedRightState[action.index + 1] = movedRightState[action.index];
      movedRightState[action.index] = nextItem;
      return movedRightState;

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/state/features/_actions.js":
/*!**********************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/state/features/_actions.js ***!
  \**********************************************************************/
/*! exports provided: ADD_FEATURE, FEATURE_REMOVE, FEATURE_EDIT_NAME, FEATURE_MOVE_UP, FEATURE_MOVE_DOWN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_FEATURE", function() { return ADD_FEATURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURE_REMOVE", function() { return FEATURE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURE_EDIT_NAME", function() { return FEATURE_EDIT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURE_MOVE_UP", function() { return FEATURE_MOVE_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FEATURE_MOVE_DOWN", function() { return FEATURE_MOVE_DOWN; });
const ADD_FEATURE = 'af';
const FEATURE_REMOVE = 'fr';
const FEATURE_EDIT_NAME = 'fen';
const FEATURE_MOVE_UP = 'fmu';
const FEATURE_MOVE_DOWN = 'fmd';

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/state/features/_reducer.js":
/*!**********************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/state/features/_reducer.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/competitor-table/src/state/features/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_FEATURE"]:
      return [...state, {
        key: "feature_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
        name: ''
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["FEATURE_REMOVE"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["FEATURE_EDIT_NAME"]:
      return editAtIndex('name');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["FEATURE_MOVE_UP"]:
      const movedUpState = [...state];
      const previousItem = movedUpState[action.index - 1];
      movedUpState[action.index - 1] = movedUpState[action.index];
      movedUpState[action.index] = previousItem;
      return movedUpState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["FEATURE_MOVE_DOWN"]:
      const movedDownState = [...state];
      const nextItem = movedDownState[action.index + 1];
      movedDownState[action.index + 1] = movedDownState[action.index];
      movedDownState[action.index] = nextItem;
      return movedDownState;

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/style.scss":
/*!******************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/competitor-table/src/utils/competitor-features.js":
/*!************************************************************************!*\
  !*** ../blocks/fpbk/competitor-table/src/utils/competitor-features.js ***!
  \************************************************************************/
/*! exports provided: changeCompetitorFeature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCompetitorFeature", function() { return changeCompetitorFeature; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");


const changeCompetitorFeature = (competitorIndex, featureIndex, featureValues, FLAG = 'update', competitors, setAttributes) => {
  if (competitors.length > 0) {
    const newCompetitors = [...competitors];

    switch (FLAG) {
      case 'update':
        if (competitorIndex !== false) {
          newCompetitors[competitorIndex].features[featureIndex] = featureValues;
        } else {
          newCompetitors.forEach(competitor => {
            competitor.features[featureIndex] = featureValues;
          });
        }

        break;

      case 'add':
        newCompetitors.forEach(competitor => {
          competitor.features.push({
            key: "competitor-feature_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
            text: '',
            checkmark: false,
            crossmark: false
          });
        });
        break;

      case 'remove':
        newCompetitors.forEach(competitor => {
          competitor.features.splice(featureIndex, 1);
        });
        break;

      case 'move_up':
        newCompetitors.forEach(competitor => {
          const fromIndex = featureIndex;
          const toIndex = featureIndex - 1;
          const row = competitor.features.splice(fromIndex, 1)[0];
          competitor.features.splice(toIndex, 0, row);
        });
        break;

      case 'move_down':
        newCompetitors.forEach(competitor => {
          const fromIndex = featureIndex;
          const toIndex = featureIndex + 1;
          const row = competitor.features.splice(fromIndex, 1)[0];
          competitor.features.splice(toIndex, 0, row);
        });
        break;

      default:
        break;
    }

    setAttributes({
      competitors: newCompetitors
    });
  }
};

/***/ }),

/***/ "./images/icons/checkmark-green-gradient.svg":
/*!***************************************************!*\
  !*** ./images/icons/checkmark-green-gradient.svg ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/icons/checkmark-green-gradient.svg");

/***/ }),

/***/ "./images/icons/crossmark-red-gradient.svg":
/*!*************************************************!*\
  !*** ./images/icons/crossmark-red-gradient.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/icons/crossmark-red-gradient.svg");

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

/***/ 99:
/*!**********************************************************!*\
  !*** multi ../blocks/fpbk/competitor-table/src/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/competitor-table/src/index.js */"../blocks/fpbk/competitor-table/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-competitor-table-index.js.map