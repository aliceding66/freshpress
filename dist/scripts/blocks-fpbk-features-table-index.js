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
/******/ 		"blocks-fpbk-features-table-index": 0
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
/******/ 	deferredModules.push([123,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/features-table/block.json":
/*!************************************************!*\
  !*** ../blocks/fpbk/features-table/block.json ***!
  \************************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/features-table\",\"title\":\"Features Table\",\"category\":\"freshblocks\",\"description\":\"A block containing a table with FreshBooks Features and comparisonsck.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true}}");

/***/ }),

/***/ "../blocks/fpbk/features-table/src/_edit.js":
/*!**************************************************!*\
  !*** ../blocks/fpbk/features-table/src/_edit.js ***!
  \**************************************************/
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
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _components_partials_ColumnPartials__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/partials/ColumnPartials */ "../blocks/fpbk/features-table/src/components/partials/ColumnPartials.js");
/* harmony import */ var _components_partials_RowPartials__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/partials/RowPartials */ "../blocks/fpbk/features-table/src/components/partials/RowPartials.js");
/* harmony import */ var _state_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/_manager */ "../blocks/fpbk/features-table/src/state/_manager.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/_actions */ "../blocks/fpbk/features-table/src/state/_actions.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/features-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/features-table/block.json", 1);











const columnWidthTimeouts = [];
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "features-table ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes))
  });
  const [state, dispatch] = new _state_manager__WEBPACK_IMPORTED_MODULE_8__["FeaturesTableStateManager"](attributes, setAttributes);
  /**
   * Helper function to dispatch and auto add 'px' to width if missing.
   *
   * @param {string} action
   * @param {any} value
   * @param {Object} restParams
   */

  const dispatchWidth = (action, value, restParams = {}) => {
    dispatch({
      type: action,
      value,
      ...restParams
    });

    if (columnWidthTimeouts[action]) {
      clearTimeout(columnWidthTimeouts[action]);
    }

    columnWidthTimeouts[action] = setTimeout(() => {
      if (/^\d+$/.test(value)) {
        dispatch({
          type: action,
          value: "".concat(value, "px"),
          ...restParams
        });
      }
    }, 1000);
  };

  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_10__["name"],
      clientId,
      setAttributes,
      state,
      dispatch,
      dispatchWidth
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TrueFalse, {
    value: state.table_rotate_titles,
    onChange: value => {
      dispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_ROTATE_TITLES_ON_MOBILE"],
        value
      });
    },
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Rotate titles on mobile', 'freshpress-website')
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
    value: state.table_min_width,
    onChange: value => {
      dispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_TABLE_MIN_WIDTH"],
        value
      });
    },
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Table min width', 'freshpress-website')
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
    value: state.title_column_width,
    onChange: value => {
      dispatchWidth(_state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_TITLE_COLUMN_WIDTH"], value);
    },
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Title column width', 'freshpress-website')
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("table", {
    className: "w-100",
    style: state.table_min_width ? {
      minWidth: state.table_min_width
    } : {}
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "mw-100",
    scope: "col",
    style: state.title_column_width ? {
      width: state.title_column_width
    } : {}
  }), /*#__PURE__*/React.createElement(_components_partials_ColumnPartials__WEBPACK_IMPORTED_MODULE_6__["default"], null))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(_components_partials_RowPartials__WEBPACK_IMPORTED_MODULE_7__["default"], null)))));
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/RepeatedElementControls.js":
/*!*******************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/RepeatedElementControls.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");


/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    dispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsContext"])();
  const {
    vertical = false,
    movePreviousAction,
    removeAction,
    moveNextAction,
    indexName,
    index
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "block-editor__block-controls  d-inline-flex p-1 rounded shadow-sm bg-white ".concat(vertical ? 'flex-column' : 'mb-1')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSmall: true,
    onClick: () => {
      dispatch({
        type: movePreviousAction,
        [indexName]: index
      });
    },
    icon: "arrow-".concat(vertical ? 'up' : 'left', "-alt2")
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isDestructive: true,
    isSmall: true,
    onClick: () => {
      dispatch({
        type: removeAction,
        [indexName]: index
      });
    },
    icon: "no-alt"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSmall: true,
    onClick: () => {
      dispatch({
        type: moveNextAction,
        [indexName]: index
      });
    },
    icon: "arrow-".concat(vertical ? 'down' : 'right', "-alt2")
  }));
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/ColumnPartials.js":
/*!*******************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/ColumnPartials.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _RepeatedElementControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../RepeatedElementControls */ "../blocks/fpbk/features-table/src/components/RepeatedElementControls.js");
/* harmony import */ var _templates_column_header_partial_mustache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../templates/column/header.partial.mustache */ "../blocks/fpbk/features-table/templates/column/header.partial.mustache");
/* harmony import */ var _templates_column_header_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_column_header_partial_mustache__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../state/_actions */ "../blocks/fpbk/features-table/src/state/_actions.js");
/* harmony import */ var _state_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../state/_manager */ "../blocks/fpbk/features-table/src/state/_manager.js");









/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    dispatch,
    dispatchWidth,
    state
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__["getEditorControlsContext"])();
  const columnPartials = state.columns.map((column, columnIndex) => /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: column.key,
    template: _templates_column_header_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default.a,
    attributes: column,
    components: {
      heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        value: column.heading,
        onChange: value => {
          dispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_COLUMN_HEADING"],
            value,
            columnIndex
          });
        }
      }),
      admin_column_controls: /*#__PURE__*/React.createElement("div", {
        className: "d-inline-flex flex-column align-items-center"
      }, /*#__PURE__*/React.createElement(_RepeatedElementControls__WEBPACK_IMPORTED_MODULE_5__["default"], {
        dispatch: dispatch,
        indexName: "columnIndex",
        index: columnIndex,
        movePreviousAction: _state_actions__WEBPACK_IMPORTED_MODULE_7__["MOVE_COLUMN_LEFT"],
        removeAction: _state_actions__WEBPACK_IMPORTED_MODULE_7__["REMOVE_COLUMN"],
        moveNextAction: _state_actions__WEBPACK_IMPORTED_MODULE_7__["MOVE_COLUMN_RIGHT"]
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
        inline: true,
        isSmall: true,
        value: column.background_colour,
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])(' Background colour', 'freshpress-website'),
        onChange: value => {
          dispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_COLUMN_BACKGROUND_COLOUR"],
            columnIndex,
            value
          });
        }
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
        // eslint-disable-next-line @wordpress/i18n-translator-comments
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Width (e.g. 200px, 30% etc.)', 'freshpress-website'),
        value: column.width,
        onChange: value => {
          dispatchWidth(_state_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_COLUMN_WIDTH"], value, {
            columnIndex
          });
        }
      }))
    }
  }));
  columnPartials.push( /*#__PURE__*/React.createElement("th", {
    key: "add-column-admin-button"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    disabled: state.columns.length >= _state_manager__WEBPACK_IMPORTED_MODULE_8__["MAX_COLUMNS_AMOUNT"],
    isSecondary: true,
    icon: "plus",
    showTooltip: true,
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add column', 'freshpress-website'),
    onClick: () => {
      dispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_7__["ADD_COLUMN"]
      });
    }
  })));
  return columnPartials;
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/RowPartials.js":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/RowPartials.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_column_row_item_partial_mustache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../templates/column/row-item.partial.mustache */ "../blocks/fpbk/features-table/templates/column/row-item.partial.mustache");
/* harmony import */ var _templates_column_row_item_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_templates_column_row_item_partial_mustache__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _RepeatedElementControls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../RepeatedElementControls */ "../blocks/fpbk/features-table/src/components/RepeatedElementControls.js");
/* harmony import */ var _row_components_ToolbarGroupRepeatedControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./row-components/ToolbarGroupRepeatedControls */ "../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarGroupRepeatedControls.js");
/* harmony import */ var _row_components_ImageToggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./row-components/ImageToggle */ "../blocks/fpbk/features-table/src/components/partials/row-components/ImageToggle.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../state/_actions */ "../blocks/fpbk/features-table/src/state/_actions.js");
/* harmony import */ var _row_components_ToolbarListItemStyleButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./row-components/ToolbarListItemStyleButton */ "../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarListItemStyleButton.js");
/* harmony import */ var _row_components_RowTitleSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./row-components/RowTitleSelect */ "../blocks/fpbk/features-table/src/components/partials/row-components/RowTitleSelect.js");












const {
  mark_check_green_src: markCheckGreenSrc,
  mark_check_grey_src: markCheckGreySrc,
  mark_x_src: markXSrc
} = featuresTableTemplateData; // eslint-disable-line no-undef

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    dispatch,
    state
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])();
  const rowPartials = state.row_titles.map((rowTitle, rowIndex) => {
    const columnRowItems = [];
    state.columns.forEach((column, columnIndex) => {
      var _column$rows$rowIndex;

      const columnRow = (_column$rows$rowIndex = column.rows[rowIndex]) !== null && _column$rows$rowIndex !== void 0 ? _column$rows$rowIndex : {};
      const rowTemplateData = { ...columnRow,
        background_colour: column === null || column === void 0 ? void 0 : column.background_colour,
        list_exists: columnRow.list.length > 0,
        // All below are true to show editable elements.
        mark_check_green: true,
        mark_check_grey: true,
        mark_x: true
      };
      const paragraphItems = columnRow.paragraphs.map((paragraph, paragraphIndex) => /*#__PURE__*/React.createElement("div", {
        key: paragraph.key,
        className: "block-editor-rich-text__toolbar-wrapper position-relative"
      }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "mb-2".concat(paragraph.bolded ? ' font-weight-bold' : ''),
        value: paragraph.text,
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert paragraph', 'freshpress-website'),
        onChange: value => {
          dispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_PARAGRAPH_TEXT"],
            value,
            columnIndex,
            rowIndex,
            paragraphIndex
          });
        }
      }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Toolbar"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Paragraph', 'freshpress-website'),
        className: "position-absolute block-editor-rich-text__toolbar"
      }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarGroup"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarButton"], {
        icon: "editor-bold",
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Bold', 'freshpress-website'),
        isActive: paragraph.bolded,
        onClick: () => {
          dispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_PARAGRAPH_BOLDED"],
            value: !paragraph.bolded,
            columnIndex,
            rowIndex,
            paragraphIndex
          });
        }
      })), /*#__PURE__*/React.createElement(_row_components_ToolbarGroupRepeatedControls__WEBPACK_IMPORTED_MODULE_7__["default"], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        indexName: "paragraphIndex",
        index: paragraphIndex,
        moveUpAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_COLUMN_ROW_PARAGRAPH_UP"],
        moveDownAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_COLUMN_ROW_PARAGRAPH_DOWN"],
        removeAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["REMOVE_COLUMN_ROW_PARAGRAPH"]
      }))));
      const listItems = columnRow.list.map((listItem, listIndex) => /*#__PURE__*/React.createElement("li", {
        key: listItem.key,
        className: "block-editor-rich-text__toolbar-wrapper position-relative d-flex mb-2 ".concat(listItem.style)
      }, /*#__PURE__*/React.createElement("span", {
        className: "features-table__list--icon"
      }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "text-center position-relative",
        value: listItem.text,
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert list item', 'freshpress-website'),
        onChange: value => {
          dispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_LIST_TEXT"],
            value,
            columnIndex,
            rowIndex,
            listIndex
          });
        }
      })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Toolbar"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('List item', 'freshpress-website'),
        className: "position-absolute block-editor-rich-text__toolbar"
      }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarGroup"], null, /*#__PURE__*/React.createElement(_row_components_ToolbarListItemStyleButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        listIndex: listIndex,
        listItem: listItem,
        src: markCheckGreenSrc,
        value: 'normal',
        label: 'Normal'
      }), /*#__PURE__*/React.createElement(_row_components_ToolbarListItemStyleButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        listIndex: listIndex,
        listItem: listItem,
        src: markCheckGreySrc,
        value: 'grey-check',
        label: 'With Grey Check Mark'
      }), /*#__PURE__*/React.createElement(_row_components_ToolbarListItemStyleButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        listIndex: listIndex,
        listItem: listItem,
        src: markXSrc,
        value: 'greyed-out',
        label: 'Greyed Out with Cross Mark'
      })), /*#__PURE__*/React.createElement(_row_components_ToolbarGroupRepeatedControls__WEBPACK_IMPORTED_MODULE_7__["default"], {
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        indexName: "listIndex",
        index: listIndex,
        moveUpAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_COLUMN_ROW_LIST_UP"],
        moveDownAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_COLUMN_ROW_LIST_DOWN"],
        removeAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["REMOVE_COLUMN_ROW_LIST"]
      }))));
      columnRowItems.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__["default"], {
        key: "column_".concat(columnIndex, "_row_").concat(rowIndex),
        template: _templates_column_row_item_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default.a,
        attributes: rowTemplateData,
        components: {
          mark_check_green_image: /*#__PURE__*/React.createElement(_row_components_ImageToggle__WEBPACK_IMPORTED_MODULE_8__["default"], {
            src: markCheckGreenSrc,
            active: (columnRow === null || columnRow === void 0 ? void 0 : columnRow.mark_check_green) === true,
            action: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_MARK_CHECK_GREEN"],
            columnIndex: columnIndex,
            rowIndex: rowIndex
          }),
          mark_check_grey_image: /*#__PURE__*/React.createElement(_row_components_ImageToggle__WEBPACK_IMPORTED_MODULE_8__["default"], {
            src: markCheckGreySrc,
            active: (columnRow === null || columnRow === void 0 ? void 0 : columnRow.mark_check_grey) === true,
            action: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_MARK_CHECK_GREY"],
            columnIndex: columnIndex,
            rowIndex: rowIndex
          }),
          mark_x_image: /*#__PURE__*/React.createElement(_row_components_ImageToggle__WEBPACK_IMPORTED_MODULE_8__["default"], {
            src: markXSrc,
            active: (columnRow === null || columnRow === void 0 ? void 0 : columnRow.mark_x) === true,
            action: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_COLUMN_ROW_MARK_X"],
            columnIndex: columnIndex,
            rowIndex: rowIndex
          }),
          admin_paragraphs: paragraphItems,
          admin_add_paragraph: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
            isSecondary: true,
            isSmall: true,
            className: "w-auto d-block",
            icon: "plus",
            text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add paragraph', 'freshpress-website'),
            onClick: () => {
              dispatch({
                type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["ADD_COLUMN_ROW_PARAGRAPH"],
                columnIndex,
                rowIndex
              });
            }
          }),
          admin_list: listItems,
          admin_add_list: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
            isSecondary: true,
            isSmall: true,
            className: "w-auto d-block",
            icon: "plus",
            text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add list item', 'freshpress-website'),
            onClick: () => {
              dispatch({
                type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["ADD_COLUMN_ROW_LIST"],
                columnIndex,
                rowIndex
              });
            }
          })
        }
      }));
    });
    return /*#__PURE__*/React.createElement("tr", {
      key: rowTitle.key
    }, /*#__PURE__*/React.createElement("td", {
      className: "text-uppercase text-left font-".concat(rowTitle.font_size, " padding-").concat(rowTitle.padding)
    }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
      isSimple: true,
      value: rowTitle.title,
      onChange: value => {
        dispatch({
          type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_ROW_TITLE_TITLE"],
          rowIndex,
          value
        });
      }
    }), /*#__PURE__*/React.createElement(_row_components_RowTitleSelect__WEBPACK_IMPORTED_MODULE_11__["default"], {
      rowIndex: rowIndex,
      action: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_ROW_TITLE_PADDING"],
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Padding', 'freshpress-website'),
      value: rowTitle.padding
    }), /*#__PURE__*/React.createElement(_row_components_RowTitleSelect__WEBPACK_IMPORTED_MODULE_11__["default"], {
      rowIndex: rowIndex,
      action: _state_actions__WEBPACK_IMPORTED_MODULE_9__["EDIT_ROW_TITLE_FONT_SIZE"],
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Font size', 'freshpress-website'),
      value: rowTitle.font_size
    })), columnRowItems, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(_RepeatedElementControls__WEBPACK_IMPORTED_MODULE_6__["default"], {
      vertical: true,
      indexName: "rowIndex",
      index: rowIndex,
      movePreviousAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_ROW_UP"],
      removeAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["REMOVE_ROW"],
      moveNextAction: _state_actions__WEBPACK_IMPORTED_MODULE_9__["MOVE_ROW_DOWN"]
    })));
  });
  rowPartials.push( /*#__PURE__*/React.createElement("tr", {
    key: "add-row-admin-button"
  }, /*#__PURE__*/React.createElement("td", {
    colSpan: state.columns.length + 2
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSecondary: true,
    icon: "plus",
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add row', 'freshpress-website'),
    onClick: () => {
      dispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_9__["ADD_ROW"]
      });
    }
  }))));
  return rowPartials;
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/row-components/ImageToggle.js":
/*!*******************************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/row-components/ImageToggle.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");


/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    dispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsContext"])();
  const {
    action,
    active,
    columnIndex,
    rowIndex,
    src
  } = props;
  const altTitleAttribute = active ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Toggle off', 'freshpress-website') : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Toggle on', 'freshpress-website');
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    React.createElement("img", {
      alt: altTitleAttribute,
      title: altTitleAttribute,
      className: "px-2 cursor-pointer",
      src: src,
      style: {
        opacity: active === true ? 1 : 0.3,
        minWidth: '45px'
      },
      onClick: () => {
        dispatch({
          type: action,
          value: !active,
          columnIndex,
          rowIndex
        });
      }
    })
  );
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/row-components/RowTitleSelect.js":
/*!**********************************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/row-components/RowTitleSelect.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");


/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    dispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsContext"])();
  const {
    action,
    label,
    rowIndex,
    value
  } = props;
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_0__["default"].Select, {
    label: label,
    choices: {
      normal: 'Normal',
      medium: 'Medium',
      small: 'Small'
    },
    value: value,
    onChange: newValue => {
      dispatch({
        type: action,
        value: newValue,
        rowIndex
      });
    }
  });
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarGroupRepeatedControls.js":
/*!************************************************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarGroupRepeatedControls.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");


/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    dispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsContext"])();
  const {
    columnIndex,
    indexName,
    index,
    moveDownAction,
    moveUpAction,
    rowIndex,
    removeAction
  } = props;
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarGroup"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarButton"], {
    icon: "arrow-up-alt2",
    onClick: () => {
      dispatch({
        type: moveUpAction,
        columnIndex,
        rowIndex,
        [indexName]: index
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarButton"], {
    icon: "arrow-down-alt2",
    onClick: () => {
      dispatch({
        type: moveDownAction,
        columnIndex,
        rowIndex,
        [indexName]: index
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarButton"], {
    icon: "no-alt",
    onClick: () => {
      dispatch({
        type: removeAction,
        columnIndex,
        rowIndex,
        [indexName]: index
      });
    }
  }));
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarListItemStyleButton.js":
/*!**********************************************************************************************************!*\
  !*** ../blocks/fpbk/features-table/src/components/partials/row-components/ToolbarListItemStyleButton.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../state/_actions */ "../blocks/fpbk/features-table/src/state/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    dispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsContext"])();
  const {
    columnIndex,
    rowIndex,
    listIndex,
    listItem,
    label,
    src,
    value
  } = props;
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToolbarButton"], {
    label: label,
    icon: /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: label
    }),
    isActive: (listItem === null || listItem === void 0 ? void 0 : listItem.style) === value,
    onClick: () => {
      dispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_LIST_STYLE"],
        value,
        columnIndex,
        rowIndex,
        listIndex
      });
    }
  });
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/editor.scss":
/*!*****************************************************!*\
  !*** ../blocks/fpbk/features-table/src/editor.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/features-table/src/index.js":
/*!**************************************************!*\
  !*** ../blocks/fpbk/features-table/src/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/features-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/features-table/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/features-table/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/features-table/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/features-table/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! images/logos/freshbooks-logomark-reacty.svg */ "./images/logos/freshbooks-logomark-reacty.svg");






const {
  name: blockName,
  ...restConfig
} = _block_json__WEBPACK_IMPORTED_MODULE_1__;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(blockName, { ...restConfig,
  icon: /*#__PURE__*/React.createElement("img", {
    src: images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    alt: "FreshBooks Logo"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/state/_actions.js":
/*!***********************************************************!*\
  !*** ../blocks/fpbk/features-table/src/state/_actions.js ***!
  \***********************************************************/
/*! exports provided: EDIT_ROTATE_TITLES_ON_MOBILE, EDIT_TABLE_MIN_WIDTH, EDIT_TITLE_COLUMN_WIDTH, ADD_ROW, REMOVE_ROW, MOVE_ROW_UP, MOVE_ROW_DOWN, EDIT_ROW_TITLE_TITLE, EDIT_ROW_TITLE_PADDING, EDIT_ROW_TITLE_FONT_SIZE, ADD_COLUMN, REMOVE_COLUMN, EDIT_COLUMN_HEADING, EDIT_COLUMN_BACKGROUND_COLOUR, EDIT_COLUMN_WIDTH, MOVE_COLUMN_LEFT, MOVE_COLUMN_RIGHT, EDIT_COLUMN_ROW_MARK_CHECK_GREEN, EDIT_COLUMN_ROW_MARK_CHECK_GREY, EDIT_COLUMN_ROW_MARK_X, ADD_COLUMN_ROW_LIST, REMOVE_COLUMN_ROW_LIST, EDIT_COLUMN_ROW_LIST_STYLE, EDIT_COLUMN_ROW_LIST_TEXT, MOVE_COLUMN_ROW_LIST_UP, MOVE_COLUMN_ROW_LIST_DOWN, ADD_COLUMN_ROW_PARAGRAPH, REMOVE_COLUMN_ROW_PARAGRAPH, EDIT_COLUMN_ROW_PARAGRAPH_BOLDED, EDIT_COLUMN_ROW_PARAGRAPH_TEXT, MOVE_COLUMN_ROW_PARAGRAPH_UP, MOVE_COLUMN_ROW_PARAGRAPH_DOWN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ROTATE_TITLES_ON_MOBILE", function() { return EDIT_ROTATE_TITLES_ON_MOBILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TABLE_MIN_WIDTH", function() { return EDIT_TABLE_MIN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TITLE_COLUMN_WIDTH", function() { return EDIT_TITLE_COLUMN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ROW", function() { return ADD_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ROW", function() { return REMOVE_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_ROW_UP", function() { return MOVE_ROW_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_ROW_DOWN", function() { return MOVE_ROW_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ROW_TITLE_TITLE", function() { return EDIT_ROW_TITLE_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ROW_TITLE_PADDING", function() { return EDIT_ROW_TITLE_PADDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ROW_TITLE_FONT_SIZE", function() { return EDIT_ROW_TITLE_FONT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COLUMN", function() { return ADD_COLUMN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_COLUMN", function() { return REMOVE_COLUMN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_HEADING", function() { return EDIT_COLUMN_HEADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_BACKGROUND_COLOUR", function() { return EDIT_COLUMN_BACKGROUND_COLOUR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_WIDTH", function() { return EDIT_COLUMN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_LEFT", function() { return MOVE_COLUMN_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_RIGHT", function() { return MOVE_COLUMN_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_MARK_CHECK_GREEN", function() { return EDIT_COLUMN_ROW_MARK_CHECK_GREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_MARK_CHECK_GREY", function() { return EDIT_COLUMN_ROW_MARK_CHECK_GREY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_MARK_X", function() { return EDIT_COLUMN_ROW_MARK_X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COLUMN_ROW_LIST", function() { return ADD_COLUMN_ROW_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_COLUMN_ROW_LIST", function() { return REMOVE_COLUMN_ROW_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_LIST_STYLE", function() { return EDIT_COLUMN_ROW_LIST_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_LIST_TEXT", function() { return EDIT_COLUMN_ROW_LIST_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_ROW_LIST_UP", function() { return MOVE_COLUMN_ROW_LIST_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_ROW_LIST_DOWN", function() { return MOVE_COLUMN_ROW_LIST_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COLUMN_ROW_PARAGRAPH", function() { return ADD_COLUMN_ROW_PARAGRAPH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_COLUMN_ROW_PARAGRAPH", function() { return REMOVE_COLUMN_ROW_PARAGRAPH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_PARAGRAPH_BOLDED", function() { return EDIT_COLUMN_ROW_PARAGRAPH_BOLDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_ROW_PARAGRAPH_TEXT", function() { return EDIT_COLUMN_ROW_PARAGRAPH_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_ROW_PARAGRAPH_UP", function() { return MOVE_COLUMN_ROW_PARAGRAPH_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_ROW_PARAGRAPH_DOWN", function() { return MOVE_COLUMN_ROW_PARAGRAPH_DOWN; });
/**
 * Standard items.
 */
const EDIT_ROTATE_TITLES_ON_MOBILE = 'ertom';
const EDIT_TABLE_MIN_WIDTH = 'etmw';
const EDIT_TITLE_COLUMN_WIDTH = 'etcw';
/**
 * Row titles + Column rows.
 */

const ADD_ROW = 'ar';
const REMOVE_ROW = 'rr';
const MOVE_ROW_UP = 'mru';
const MOVE_ROW_DOWN = 'mrd';
/**
 * Row titles.
 */

const EDIT_ROW_TITLE_TITLE = 'ertt';
const EDIT_ROW_TITLE_PADDING = 'ertp';
const EDIT_ROW_TITLE_FONT_SIZE = 'ertfs';
/**
 * Columns.
 */

const ADD_COLUMN = 'ac';
const REMOVE_COLUMN = 'rc';
const EDIT_COLUMN_HEADING = 'ech';
const EDIT_COLUMN_BACKGROUND_COLOUR = 'ecbc';
const EDIT_COLUMN_WIDTH = 'ecw';
const MOVE_COLUMN_LEFT = 'mcl';
const MOVE_COLUMN_RIGHT = 'mcr';
/**
 * Column rows.
 */

const EDIT_COLUMN_ROW_MARK_CHECK_GREEN = 'ecrmcgreen';
const EDIT_COLUMN_ROW_MARK_CHECK_GREY = 'ecrmcgrey';
const EDIT_COLUMN_ROW_MARK_X = 'ecrmx';
/**
 * Column row lists.
 */

const ADD_COLUMN_ROW_LIST = 'acrl';
const REMOVE_COLUMN_ROW_LIST = 'rcrl';
const EDIT_COLUMN_ROW_LIST_STYLE = 'ecrmls';
const EDIT_COLUMN_ROW_LIST_TEXT = 'ecrmlt';
const MOVE_COLUMN_ROW_LIST_UP = 'mcrlu';
const MOVE_COLUMN_ROW_LIST_DOWN = 'mcrld';
/**
 * Column row paragraphs.
 */

const ADD_COLUMN_ROW_PARAGRAPH = 'acrp';
const REMOVE_COLUMN_ROW_PARAGRAPH = 'rcrp';
const EDIT_COLUMN_ROW_PARAGRAPH_BOLDED = 'ecrmpb';
const EDIT_COLUMN_ROW_PARAGRAPH_TEXT = 'ecrmpt';
const MOVE_COLUMN_ROW_PARAGRAPH_UP = 'mcrpu';
const MOVE_COLUMN_ROW_PARAGRAPH_DOWN = 'mcrpd';

/***/ }),

/***/ "../blocks/fpbk/features-table/src/state/_manager.js":
/*!***********************************************************!*\
  !*** ../blocks/fpbk/features-table/src/state/_manager.js ***!
  \***********************************************************/
/*! exports provided: MAX_COLUMNS_AMOUNT, FeaturesTableStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_COLUMNS_AMOUNT", function() { return MAX_COLUMNS_AMOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesTableStateManager", function() { return FeaturesTableStateManager; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_reducer */ "../blocks/fpbk/features-table/src/state/_reducer.js");


function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }




const MAX_COLUMNS_AMOUNT = 9;
/**
 * @param {Object} state
 * @return {Object} Translated state to attributes.
 */

const stateToAttributes = state => {
  const attributes = {
    table_rotate_titles: state.table_rotate_titles,
    table_min_width: state.table_min_width,
    table_width_0: state.title_column_width,
    table_row_titles: state.row_titles
  };

  for (let inStateColumnIndex = 0; inStateColumnIndex < MAX_COLUMNS_AMOUNT; ++inStateColumnIndex) {
    const columnIndex = inStateColumnIndex + 1;
    const {
      heading = '',
      background_colour: backgroundColour = {
        hex: ''
      },
      width = '',
      rows = []
    } = state.columns[inStateColumnIndex] ? state.columns[inStateColumnIndex] : {};
    attributes["table_heading_".concat(columnIndex)] = heading;
    attributes["table_background_colour_".concat(columnIndex)] = backgroundColour;
    attributes["table_width_".concat(columnIndex)] = width;
    attributes["table_column_".concat(columnIndex, "_rows")] = rows;
  }

  return attributes;
};
/**
 * @param {Object} attributes
 * @return {Object} Translated attributes to state.
 */


const attributesToState = attributes => {
  const state = {
    table_rotate_titles: attributes.table_rotate_titles,
    table_min_width: attributes.table_min_width,
    title_column_width: attributes.table_width_0,
    row_titles: attributes.table_row_titles,
    columns: []
  };
  let processData = false;

  for (let inStateColumnIndex = MAX_COLUMNS_AMOUNT - 1; inStateColumnIndex >= 0; --inStateColumnIndex) {
    const columnIndex = inStateColumnIndex + 1; // Due to title column that is always first.

    if (processData || attributes["table_heading_".concat(columnIndex)] && attributes["table_heading_".concat(columnIndex)] !== '') {
      if (!processData) {
        processData = true;
      }

      state.columns[inStateColumnIndex] = {
        heading: attributes["table_heading_".concat(columnIndex)],
        background_colour: attributes["table_background_colour_".concat(columnIndex)],
        width: attributes["table_width_".concat(columnIndex)],
        rows: []
      };
      Object.keys(state.row_titles).forEach(rowIndex => {
        state.columns[inStateColumnIndex].rows[rowIndex] = attributes["table_column_".concat(columnIndex, "_rows")][rowIndex];
      });
    }
  } // Set default values if nothing is there.


  if (state.row_titles.length === 0 && state.columns.length === 0) {
    // Set 1 row and 2 columns.
    state.row_titles.push(Object(_reducer__WEBPACK_IMPORTED_MODULE_3__["getEmptyRowTitle"])());
    state.columns.push(Object(_reducer__WEBPACK_IMPORTED_MODULE_3__["getEmptyColumn"])(state.row_titles));
    state.columns.push(Object(_reducer__WEBPACK_IMPORTED_MODULE_3__["getEmptyColumn"])(state.row_titles));
  }

  return state;
};
/**
 * Outputs single state that matches ACF fields and translates them back to attributes properly.
 */


var _setProxy = /*#__PURE__*/_classPrivateFieldLooseKey("setProxy");

class FeaturesTableStateManager {
  constructor(attributes, setAttributes) {
    Object.defineProperty(this, _setProxy, {
      value: _setProxy2
    });
    this.attributes = attributes;
    this.setAttributes = setAttributes;
    this.timeout = null; // eslint-disable-next-line react-hooks/rules-of-hooks

    const {
      lockPostSaving,
      unlockPostSaving
    } = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])('core/editor');
    const lockEditorKey = 'BlockStateManagerProxy';

    this.lockEditor = () => lockPostSaving(lockEditorKey);

    this.unlockEditor = () => unlockPostSaving(lockEditorKey); // eslint-disable-next-line react-hooks/rules-of-hooks


    const [_state, dispatch] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(_reducer__WEBPACK_IMPORTED_MODULE_3__["default"], attributesToState(attributes));

    _classPrivateFieldLooseBase(this, _setProxy)[_setProxy](_state);

    return [_state, dispatch];
  }

}

function _setProxy2(state) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
      this.lockEditor();

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.setAttributes(stateToAttributes(state));
        this.unlockEditor();
      }, 100);
    }, [state]);
  } catch (_) {
    this.unlockEditor();
  }
}

/***/ }),

/***/ "../blocks/fpbk/features-table/src/state/_reducer.js":
/*!***********************************************************!*\
  !*** ../blocks/fpbk/features-table/src/state/_reducer.js ***!
  \***********************************************************/
/*! exports provided: getEmptyColumn, getEmptyRow, getEmptyRowTitle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEmptyColumn", function() { return getEmptyColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEmptyRow", function() { return getEmptyRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEmptyRowTitle", function() { return getEmptyRowTitle; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/features-table/src/state/_actions.js");



/**
 * @param {Array} array
 * @param {number} index
 * @return {Array} Array with moved item left/up.
 */

const moveArrayItemPrevious = (array, index) => {
  const movedArray = [...array];
  const previousItem = movedArray[index - 1];
  movedArray[index - 1] = movedArray[index];
  movedArray[index] = previousItem;
  return movedArray;
};
/**
 * @param {Array} array
 * @param {number} index
 * @return {Array} Array with moved item right/down.
 */


const moveArrayItemNext = (array, index) => {
  const movedArray = [...array];
  const nextItem = movedArray[index + 1];
  movedArray[index + 1] = movedArray[index];
  movedArray[index] = nextItem;
  return movedArray;
};
/**
 * @param {Array} rowTitles Row titles.
 * @return {Object} Empty column item.
 */


const getEmptyColumn = (rowTitles = []) => {
  return {
    key: "column_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
    heading: '',
    background_colour: {
      hex: ''
    },
    width: '',
    rows: rowTitles.map(() => getEmptyRow())
  };
};
/**
 * @return {Object} Empty row item.
 */

const getEmptyRow = () => {
  return {
    mark_check_green: false,
    mark_check_grey: false,
    mark_x: false,
    list: [],
    paragraphs: []
  };
};
/**
 * @return {Object} Empty row title item.
 */

const getEmptyRowTitle = () => {
  return {
    key: "row_title_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
    title: '',
    padding: 'normal',
    font_size: 'normal'
  };
};
/**
 * @param {Object} state
 * @param {Object} action
 * @param {string} action.type Action to be executed.
 * @param {number} action.columnIndex columns index (optional).
 * @param {number} action.rowIndex columns[*].row and row_titles index (optional).
 * @param {number} action.listIndex columns[*].rows[*].list index (optional).
 * @param {number} action.paragraphIndex columns[*].rows[*].paragraph index (optional).
 * @return {Object} Edited state bu reducer action.
 */

/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  /**
   * @param {string} fieldName
   * @return {Object} Edited state.
   */
  const editRowTitleFieldAtIndex = fieldName => {
    const editedState = { ...state
    };
    editedState.row_titles[action.rowIndex][fieldName] = action.value;
    return editedState;
  };
  /**
   * @param {string} fieldName
   * @return {Object} Edited state.
   */


  const editColumnFieldAtIndex = fieldName => {
    const editedState = { ...state
    };
    editedState.columns[action.columnIndex][fieldName] = action.value;
    return editedState;
  };
  /**
   * @param {string} fieldName
   * @return {Object} Edited state.
   */


  const editColumnRowFieldAtIndex = fieldName => {
    const editedState = { ...state
    };
    editedState.columns[action.columnIndex].rows[action.rowIndex][fieldName] = action.value;
    return editedState;
  };
  /**
   * @param {string} fieldName
   * @return {Object} Edited state.
   */


  const editColumnRowListFieldAtIndex = fieldName => {
    const editedState = { ...state
    };
    editedState.columns[action.columnIndex].rows[action.rowIndex].list[action.listIndex][fieldName] = action.value;
    return editedState;
  };
  /**
   * @param {string} fieldName
   * @return {Object} Edited state.
   */


  const editColumnRowParagraphFieldAtIndex = fieldName => {
    const editedState = { ...state
    };
    editedState.columns[action.columnIndex].rows[action.rowIndex].paragraphs[action.paragraphIndex][fieldName] = action.value;
    return editedState;
  };
  /**
   * Reducer main switch.
   */


  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ROTATE_TITLES_ON_MOBILE"]:
      return { ...state,
        table_rotate_titles: action.value
      };

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TABLE_MIN_WIDTH"]:
      return { ...state,
        table_min_width: action.value
      };

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TITLE_COLUMN_WIDTH"]:
      return { ...state,
        title_column_width: action.value
      };

    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_ROW"]:
      const newRowState = { ...state,
        row_titles: [...state.row_titles, getEmptyRowTitle()]
      };
      newRowState.columns = newRowState.columns.map(column => {
        column.rows.push(getEmptyRow());
        return column;
      });
      return newRowState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_ROW"]:
      const removeRowTitleState = { ...state
      };
      removeRowTitleState.row_titles.splice(action.rowIndex, 1);
      removeRowTitleState.columns = removeRowTitleState.columns.map(column => {
        column.rows.splice(action.rowIndex, 1);
        return column;
      });
      return removeRowTitleState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_ROW_UP"]:
      if (action.rowIndex > 0) {
        const moveRowUpState = { ...state
        };
        moveRowUpState.row_titles = moveArrayItemPrevious(moveRowUpState.row_titles, action.rowIndex);
        moveRowUpState.columns = moveRowUpState.columns.map(column => {
          column.rows = moveArrayItemPrevious(column.rows, action.rowIndex);
          return column;
        });
        return moveRowUpState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_ROW_DOWN"]:
      if (action.rowIndex < state.row_titles.length - 1) {
        const moveRowDownState = { ...state
        };
        moveRowDownState.row_titles = moveArrayItemNext(moveRowDownState.row_titles, action.rowIndex);
        moveRowDownState.columns = moveRowDownState.columns.map(column => {
          column.rows = moveArrayItemNext(column.rows, action.rowIndex);
          return column;
        });
        return moveRowDownState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ROW_TITLE_TITLE"]:
      return editRowTitleFieldAtIndex('title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ROW_TITLE_PADDING"]:
      return editRowTitleFieldAtIndex('padding');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ROW_TITLE_FONT_SIZE"]:
      return editRowTitleFieldAtIndex('font_size');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_COLUMN"]:
      const newColumnState = { ...state
      };
      newColumnState.columns.push(getEmptyColumn(state.row_titles));
      return newColumnState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_COLUMN"]:
      const removeColumnState = { ...state
      };
      removeColumnState.columns.splice(action.columnIndex, 1);
      return removeColumnState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_HEADING"]:
      return editColumnFieldAtIndex('heading');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_BACKGROUND_COLOUR"]:
      return editColumnFieldAtIndex('background_colour');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_WIDTH"]:
      return editColumnFieldAtIndex('width');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_LEFT"]:
      if (action.columnIndex > 0) {
        const moveColumnLeftState = { ...state
        };
        moveColumnLeftState.columns = moveArrayItemPrevious(moveColumnLeftState.columns, action.columnIndex);
        return moveColumnLeftState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_RIGHT"]:
      if (action.columnIndex < state.columns.length - 1) {
        const moveColumnRightState = { ...state
        };
        moveColumnRightState.columns = moveArrayItemNext(moveColumnRightState.columns, action.columnIndex);
        return moveColumnRightState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_MARK_CHECK_GREEN"]:
      return editColumnRowFieldAtIndex('mark_check_green');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_MARK_CHECK_GREY"]:
      return editColumnRowFieldAtIndex('mark_check_grey');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_MARK_X"]:
      return editColumnRowFieldAtIndex('mark_x');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_COLUMN_ROW_LIST"]:
      const addColumnRowListState = { ...state
      };
      addColumnRowListState.columns[action.columnIndex].rows[action.rowIndex].list.push({
        key: "list_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
        style: 'normal',
        text: ''
      });
      return addColumnRowListState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_COLUMN_ROW_LIST"]:
      const removeColumnRowListState = { ...state
      };
      removeColumnRowListState.columns[action.columnIndex].rows[action.rowIndex].list.splice(action.listIndex, 1);
      return removeColumnRowListState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_LIST_STYLE"]:
      return editColumnRowListFieldAtIndex('style');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_LIST_TEXT"]:
      return editColumnRowListFieldAtIndex('text');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_ROW_LIST_UP"]:
      if (action.listIndex > 0) {
        const moveColumnRowListUpState = { ...state
        };
        moveColumnRowListUpState.columns[action.columnIndex].rows[action.rowIndex].list = moveArrayItemPrevious(moveColumnRowListUpState.columns[action.columnIndex].rows[action.rowIndex].list, action.listIndex);
        return moveColumnRowListUpState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_ROW_LIST_DOWN"]:
      if (action.listIndex < state.columns[action.columnIndex].rows[action.rowIndex].list.length - 1) {
        const moveColumnRowListDownState = { ...state
        };
        moveColumnRowListDownState.columns[action.columnIndex].rows[action.rowIndex].list = moveArrayItemNext(moveColumnRowListDownState.columns[action.columnIndex].rows[action.rowIndex].list, action.listIndex);
        return moveColumnRowListDownState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_COLUMN_ROW_PARAGRAPH"]:
      const addColumnRowParagraphState = { ...state
      };
      addColumnRowParagraphState.columns[action.columnIndex].rows[action.rowIndex].paragraphs.push({
        key: "paragraph_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()),
        bolded: false,
        text: ''
      });
      return addColumnRowParagraphState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_COLUMN_ROW_PARAGRAPH"]:
      const removeColumnRowParagraphState = { ...state
      };
      removeColumnRowParagraphState.columns[action.columnIndex].rows[action.rowIndex].paragraphs.splice(action.paragraphIndex, 1);
      return removeColumnRowParagraphState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_PARAGRAPH_BOLDED"]:
      return editColumnRowParagraphFieldAtIndex('bolded');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_ROW_PARAGRAPH_TEXT"]:
      return editColumnRowParagraphFieldAtIndex('text');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_ROW_PARAGRAPH_UP"]:
      if (action.paragraphIndex > 0) {
        const moveColumnRowParagraphUpState = { ...state
        };
        moveColumnRowParagraphUpState.columns[action.columnIndex].rows[action.rowIndex].paragraphs = moveArrayItemPrevious(moveColumnRowParagraphUpState.columns[action.columnIndex].rows[action.rowIndex].paragraphs, action.paragraphIndex);
        return moveColumnRowParagraphUpState;
      }

      return state;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_ROW_PARAGRAPH_DOWN"]:
      if (action.paragraphIndex < state.columns[action.columnIndex].rows[action.rowIndex].paragraphs.length - 1) {
        const moveColumnRowParagraphDownState = { ...state
        };
        moveColumnRowParagraphDownState.columns[action.columnIndex].rows[action.rowIndex].paragraphs = moveArrayItemNext(moveColumnRowParagraphDownState.columns[action.columnIndex].rows[action.rowIndex].paragraphs, action.paragraphIndex);
        return moveColumnRowParagraphDownState;
      }

      return state;

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/features-table/src/style.scss":
/*!****************************************************!*\
  !*** ../blocks/fpbk/features-table/src/style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/features-table/templates/column/header.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/features-table/templates/column/header.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<th\n    style=\"{{# background_colour.hex }}background-color:{{ background_colour.hex }};{{/ background_colour.hex }}{{# width }}width:{{ width }};{{/ width }}\"\n    class=\"mw-100 align-middle text-center {{# table_rotate_titles }} rotate-mobile{{/ table_rotate_titles }}\" scope=\"col\"\n>\n    <span>{{ heading }}</span>\n    {{{ admin_column_controls }}}\n</th>", data, partials);
}
module.exports.templateString = "<th\n    style=\"{{# background_colour.hex }}background-color:{{ background_colour.hex }};{{/ background_colour.hex }}{{# width }}width:{{ width }};{{/ width }}\"\n    class=\"mw-100 align-middle text-center {{# table_rotate_titles }} rotate-mobile{{/ table_rotate_titles }}\" scope=\"col\"\n>\n    <span>{{ heading }}</span>\n    {{{ admin_column_controls }}}\n</th>";


/***/ }),

/***/ "../blocks/fpbk/features-table/templates/column/row-item.partial.mustache":
/*!********************************************************************************!*\
  !*** ../blocks/fpbk/features-table/templates/column/row-item.partial.mustache ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<td {{# background_colour.hex }}style=\"background-color: {{ background_colour.hex }};\"{{/ background_colour.hex }}\n    class=\"align-middle text-center\">\n    {{# mark_check_green }}\n        {{{ mark_check_green_image }}}\n    {{/ mark_check_green }}\n\n    {{# mark_check_grey }}\n        {{{ mark_check_grey_image }}}\n    {{/ mark_check_grey }}\n\n    {{# mark_x }}\n        {{{ mark_x_image }}}\n    {{/ mark_x }}\n\n    {{# admin_paragraphs }}\n        {{{ admin_paragraphs }}}\n    {{/ admin_paragraphs }}\n    {{^ admin_paragraphs }}\n        {{# paragraphs }}\n            <p class=\"mb-2{{# bolded }} bolded{{/bolded}}\">{{{ text }}}</p>\n        {{/ paragraphs }}\n    {{/ admin_paragraphs }}\n    {{{ admin_add_paragraph }}}\n\n    {{# list_exists }}\n        <ul class=\"pl-0\">\n            {{# admin_list }}\n                {{{ admin_list }}}\n            {{/ admin_list }}\n            {{^ admin_list }}\n                {{# list }}\n                    <li class=\"{{ style }}\">\n                        <span class=\"text-center position-relative features-table__list--icon\"> {{{ text }}}</span>\n                    </li>\n                {{/ list }}\n            {{/ admin_list }}\n        </ul>\n    {{/ list_exists }}\n    {{{ admin_add_list }}}\n</td>", data, partials);
}
module.exports.templateString = "<td {{# background_colour.hex }}style=\"background-color: {{ background_colour.hex }};\"{{/ background_colour.hex }}\n    class=\"align-middle text-center\">\n    {{# mark_check_green }}\n        {{{ mark_check_green_image }}}\n    {{/ mark_check_green }}\n\n    {{# mark_check_grey }}\n        {{{ mark_check_grey_image }}}\n    {{/ mark_check_grey }}\n\n    {{# mark_x }}\n        {{{ mark_x_image }}}\n    {{/ mark_x }}\n\n    {{# admin_paragraphs }}\n        {{{ admin_paragraphs }}}\n    {{/ admin_paragraphs }}\n    {{^ admin_paragraphs }}\n        {{# paragraphs }}\n            <p class=\"mb-2{{# bolded }} bolded{{/bolded}}\">{{{ text }}}</p>\n        {{/ paragraphs }}\n    {{/ admin_paragraphs }}\n    {{{ admin_add_paragraph }}}\n\n    {{# list_exists }}\n        <ul class=\"pl-0\">\n            {{# admin_list }}\n                {{{ admin_list }}}\n            {{/ admin_list }}\n            {{^ admin_list }}\n                {{# list }}\n                    <li class=\"{{ style }}\">\n                        <span class=\"text-center position-relative features-table__list--icon\"> {{{ text }}}</span>\n                    </li>\n                {{/ list }}\n            {{/ admin_list }}\n        </ul>\n    {{/ list_exists }}\n    {{{ admin_add_list }}}\n</td>";


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

/***/ 123:
/*!********************************************************!*\
  !*** multi ../blocks/fpbk/features-table/src/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/features-table/src/index.js */"../blocks/fpbk/features-table/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-features-table-index.js.map