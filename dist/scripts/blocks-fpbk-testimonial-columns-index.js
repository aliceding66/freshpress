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
/******/ 		"blocks-fpbk-testimonial-columns-index": 0
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
/******/ 	deferredModules.push([198,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/testimonial-columns/block.json":
/*!*****************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/block.json ***!
  \*****************************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/testimonial-columns\",\"title\":\"Testimonial Columns\",\"category\":\"freshblocks\",\"description\":\"Wrappable columns featuring a rounded photo, italicised quote, quote author, and author company/association.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/src/_edit.js":
/*!*******************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/_edit.js ***!
  \*******************************************************/
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
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_header_partial_mustache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/header.partial.mustache */ "../blocks/fpbk/testimonial-columns/templates/header.partial.mustache");
/* harmony import */ var _templates_header_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_templates_header_partial_mustache__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _templates_column_partial_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/column.partial.mustache */ "../blocks/fpbk/testimonial-columns/templates/column.partial.mustache");
/* harmony import */ var _templates_column_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_column_partial_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/columns/_actions */ "../blocks/fpbk/testimonial-columns/src/state/columns/_actions.js");
/* harmony import */ var _state_columns_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/columns/_reducer */ "../blocks/fpbk/testimonial-columns/src/state/columns/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/testimonial-columns/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/testimonial-columns/block.json", 1);













/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: 'testimonial-columns container-fluid px-md-4'
  });
  const columnsAmount = attributes.columns.length;
  let commonColumnClass = 'col-12';

  if (2 === columnsAmount) {
    commonColumnClass = 'col-12 col-md-6';
  } else if (3 === columnsAmount) {
    commonColumnClass = 'col-12 col-md-6 col-lg-4';
  }

  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_9__["BlockStateManager"](attributes, setAttributes);
  const [columns, columnDispatch] = blockStateManager.addReducerManager(_state_columns_reducer__WEBPACK_IMPORTED_MODULE_11__["default"], 'columns');
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      setAttributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_12__["name"]
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TrueFalse, {
    name: "include_header"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes)
  }, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    template: _templates_header_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default.a,
    attributes: { ...attributes
    },
    components: {
      header: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        isSimple: true,
        name: "header",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert header', 'freshpress-website')
      })
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "row position-relative",
    style: {
      minHeight: '10px'
    }
  }, columns.map((column, index) => {
    const templateColumn = { ...column
    };
    const marginBottomClass = index === columnsAmount - 1 ? ' mb-0' : ' mb-5 mb-md-0';
    const displayAdjustClass = index > 1 ? ' d-md-none d-lg-flex' : '';
    templateColumn.column_classes = "".concat(commonColumnClass).concat(marginBottomClass).concat(displayAdjustClass, " position-relative");
    return /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: "column_".concat(column.key),
      template: _templates_column_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
      attributes: { ...templateColumn
      },
      components: {
        testimonial_quote: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          value: templateColumn.testimonial_quote,
          onChange: value => columnDispatch({
            type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_COLUMN_TESTIMONIAL_QUOTE"],
            index,
            value
          }),
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert quote', 'freshpress-website')
        }),
        author_photo_html: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image, {
          inline: true,
          className: "testimonial__photo h-auto",
          value: templateColumn.author_photo,
          onChange: value => columnDispatch({
            type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_COLUMN_AUTHOR_PHOTO"],
            index,
            value
          }),
          previewSize: "thumbnail"
        }),
        author_name: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          value: templateColumn.author_name,
          onChange: value => columnDispatch({
            type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_COLUMN_AUTHOR_NAME"],
            index,
            value
          }),
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert author name', 'freshpress-website')
        }),
        author_title: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          value: templateColumn.author_title,
          onChange: value => columnDispatch({
            type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_COLUMN_AUTHOR_TITLE"],
            index,
            value
          }),
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert author title', 'freshpress-website')
        }),
        admin_controls: /*#__PURE__*/React.createElement("div", {
          className: "block-editor__block-controls position-absolute"
        }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          onClick: () => {
            columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["MOVE_COLUMN_LEFT"],
              index
            });
          },
          icon: "arrow-left-alt2"
        }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isDestructive: true,
          isSmall: true,
          onClick: () => {
            columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["REMOVE_COLUMN"],
              index
            });
          },
          icon: "no-alt"
        }), index < columns.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          onClick: () => {
            columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["MOVE_COLUMN_RIGHT"],
              index
            });
          },
          icon: "arrow-right-alt2"
        }))
      }
    });
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    isSecondary: true,
    className: "d-block mx-auto mt-4",
    disabled: columnsAmount >= 3,
    onClick: () => {
      columnDispatch({
        type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_10__["ADD_COLUMN"]
      });
    },
    icon: "plus",
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Add testimonial column', 'freshpress-website')
  })))));
});

/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/src/editor.scss":
/*!**********************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/editor.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/src/index.js":
/*!*******************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/index.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/testimonial-columns/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/testimonial-columns/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/testimonial-columns/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/testimonial-columns/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/testimonial-columns/src/style.scss");
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

/***/ "../blocks/fpbk/testimonial-columns/src/state/columns/_actions.js":
/*!************************************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/state/columns/_actions.js ***!
  \************************************************************************/
/*! exports provided: ADD_COLUMN, REMOVE_COLUMN, EDIT_COLUMN_AUTHOR_PHOTO, EDIT_COLUMN_AUTHOR_NAME, EDIT_COLUMN_AUTHOR_TITLE, EDIT_COLUMN_TESTIMONIAL_QUOTE, MOVE_COLUMN_LEFT, MOVE_COLUMN_RIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COLUMN", function() { return ADD_COLUMN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_COLUMN", function() { return REMOVE_COLUMN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_AUTHOR_PHOTO", function() { return EDIT_COLUMN_AUTHOR_PHOTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_AUTHOR_NAME", function() { return EDIT_COLUMN_AUTHOR_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_AUTHOR_TITLE", function() { return EDIT_COLUMN_AUTHOR_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_TESTIMONIAL_QUOTE", function() { return EDIT_COLUMN_TESTIMONIAL_QUOTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_LEFT", function() { return MOVE_COLUMN_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_COLUMN_RIGHT", function() { return MOVE_COLUMN_RIGHT; });
const ADD_COLUMN = 'ac';
const REMOVE_COLUMN = 'rc';
const EDIT_COLUMN_AUTHOR_PHOTO = 'ecau';
const EDIT_COLUMN_AUTHOR_NAME = 'ecan';
const EDIT_COLUMN_AUTHOR_TITLE = 'ecat';
const EDIT_COLUMN_TESTIMONIAL_QUOTE = 'ectc';
const MOVE_COLUMN_LEFT = 'mcl';
const MOVE_COLUMN_RIGHT = 'mcr';

/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/src/state/columns/_reducer.js":
/*!************************************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/state/columns/_reducer.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/testimonial-columns/src/state/columns/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");




/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_COLUMN"]:
      return [...state, {
        author_photo: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__["emptyImageObject"],
        author_name: '',
        author_title: '',
        testimonial_quote: '',
        key: "topic_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_COLUMN"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_AUTHOR_PHOTO"]:
      return editAtIndex('author_photo');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_AUTHOR_NAME"]:
      return editAtIndex('author_name');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_AUTHOR_TITLE"]:
      return editAtIndex('author_title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_COLUMN_TESTIMONIAL_QUOTE"]:
      return editAtIndex('testimonial_quote');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_COLUMN_RIGHT"]:
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

/***/ "../blocks/fpbk/testimonial-columns/src/style.scss":
/*!*********************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/src/style.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/templates/column.partial.mustache":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/templates/column.partial.mustache ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"testimonial {{ column_classes }} text-center d-flex flex-wrap flex-column justify-content-between\">\n\t{{{ admin_controls }}}\n\n\t{{# testimonial_quote }}\n\t\t<div class=\"testimonial__quote\">\n\t\t\t{{# author_photo_html }}\n\t\t\t\t{{{ author_photo_html }}}\n\t\t\t{{/ author_photo_html }}\n\n\t\t\t<div class=\"py-4\">\n\t\t\t\t<p class=\"testimonial__quote-text mx-auto font-italic\">\n\t\t\t\t\t{{ testimonial_quote }}\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t{{/ testimonial_quote}}\n\n\t<div class=\"testimonial__author\">\n\t\t<div class=\"row divider_blue mx-auto\"></div>\n\n\t\t<div class=\"testimonial__author-details mt-4\">\n\t\t\t{{# author_name }}\n\t\t\t\t<p class=\"testimonial__author-name text-uppercase w-100 mb-1\">{{ author_name }}</p>\n\t\t\t{{/ author_name }}\n\n\t\t\t{{# author_title }}\n\t\t\t\t<p class=\"testimonial__author-title text-uppercase w-100\">{{ author_title }}</p>\n\t\t\t{{/ author_title }}\n\t\t</div>\n\t</div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"testimonial {{ column_classes }} text-center d-flex flex-wrap flex-column justify-content-between\">\n\t{{{ admin_controls }}}\n\n\t{{# testimonial_quote }}\n\t\t<div class=\"testimonial__quote\">\n\t\t\t{{# author_photo_html }}\n\t\t\t\t{{{ author_photo_html }}}\n\t\t\t{{/ author_photo_html }}\n\n\t\t\t<div class=\"py-4\">\n\t\t\t\t<p class=\"testimonial__quote-text mx-auto font-italic\">\n\t\t\t\t\t{{ testimonial_quote }}\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t{{/ testimonial_quote}}\n\n\t<div class=\"testimonial__author\">\n\t\t<div class=\"row divider_blue mx-auto\"></div>\n\n\t\t<div class=\"testimonial__author-details mt-4\">\n\t\t\t{{# author_name }}\n\t\t\t\t<p class=\"testimonial__author-name text-uppercase w-100 mb-1\">{{ author_name }}</p>\n\t\t\t{{/ author_name }}\n\n\t\t\t{{# author_title }}\n\t\t\t\t<p class=\"testimonial__author-title text-uppercase w-100\">{{ author_title }}</p>\n\t\t\t{{/ author_title }}\n\t\t</div>\n\t</div>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/testimonial-columns/templates/header.partial.mustache":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/testimonial-columns/templates/header.partial.mustache ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"row\">\n\t{{# include_header }}\n\t\t<h2 class=\"testimonial-header mx-auto mb-5 text-center\">{{ header }}</h2>\n\t{{/ include_header }}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"row\">\n\t{{# include_header }}\n\t\t<h2 class=\"testimonial-header mx-auto mb-5 text-center\">{{ header }}</h2>\n\t{{/ include_header }}\n</div>\n";


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

/***/ 198:
/*!*************************************************************!*\
  !*** multi ../blocks/fpbk/testimonial-columns/src/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/testimonial-columns/src/index.js */"../blocks/fpbk/testimonial-columns/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-testimonial-columns-index.js.map