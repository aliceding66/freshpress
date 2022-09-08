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
/******/ 		"blocks-fpbk-feature-grid-index": 0
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
/******/ 	deferredModules.push([117,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/feature-grid/block.json":
/*!**********************************************!*\
  !*** ../blocks/fpbk/feature-grid/block.json ***!
  \**********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/feature-grid\",\"title\":\"Feature Grid\",\"category\":\"freshblocks\",\"description\":\"FreshPress block.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/feature-grid/src/_edit.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/_edit.js ***!
  \************************************************/
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
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/feature-grid/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _templates_tile_with_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/tile_with_image.partial.mustache */ "../blocks/fpbk/feature-grid/templates/tile_with_image.partial.mustache");
/* harmony import */ var _templates_tile_with_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_tile_with_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_tile_without_image_partial_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/tile_without_image.partial.mustache */ "../blocks/fpbk/feature-grid/templates/tile_without_image.partial.mustache");
/* harmony import */ var _templates_tile_without_image_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_tile_without_image_partial_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/tiles/_actions */ "../blocks/fpbk/feature-grid/src/state/tiles/_actions.js");
/* harmony import */ var _state_tiles_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/tiles/_reducer */ "../blocks/fpbk/feature-grid/src/state/tiles/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/feature-grid/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/feature-grid/block.json", 1);














/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "feature-grid wide-block row my-0 ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes))
  });
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_7__["BlockStateManager"](attributes, setAttributes);
  const [tiles, tileDispatch] = blockStateManager.addReducerManager(_state_tiles_reducer__WEBPACK_IMPORTED_MODULE_12__["default"], 'grid_tiles');
  const tilesPartials = [];
  tiles.forEach((tile, index) => {
    const {
      key
    } = tile;
    tilesPartials.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
      attributes: tile,
      key: key,
      template: tile.image.id ? _templates_tile_with_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a : _templates_tile_without_image_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default.a,
      components: {
        heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert tile heading', 'freshpress-website'),
          value: tile.heading,
          onChange: value => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_TILE_HEADING"],
              index,
              value
            });
          }
        }),
        description: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert tile description', 'freshpress-website'),
          value: tile.description,
          onChange: value => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_TILE_DESCRIPTION"],
              index,
              value
            });
          }
        }),
        image: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image, {
          inline: true,
          value: tile.image,
          onChange: value => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_TILE_IMAGE"],
              index,
              value
            });
          }
        }),
        admin_controls: /*#__PURE__*/React.createElement("div", {
          className: "block-editor__block-controls position-absolute"
        }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          isSecondary: true,
          icon: "arrow-left-alt2",
          onClick: () => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_TILE_LEFT"],
              index
            });
          }
        }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          isDestructive: true,
          icon: "no-alt",
          onClick: () => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["REMOVE_TILE"],
              index
            });
          }
        }), index < tiles.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          isSecondary: true,
          icon: "arrow-right-alt2",
          onClick: () => {
            tileDispatch({
              type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_TILE_RIGHT"],
              index
            });
          }
        }))
      }
    }));
  });

  if (tilesPartials.length < 10) {
    tilesPartials.push( /*#__PURE__*/React.createElement("div", {
      className: "feature-grid__tile d-flex align-items-center justify-content-center"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSecondary: true,
      key: "admin_add_button",
      onClick: () => {
        tileDispatch({
          type: _state_tiles_actions__WEBPACK_IMPORTED_MODULE_11__["ADD_TILE"]
        });
      },
      icon: "plus",
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Add tile', 'freshpress-website')
    })));
  }

  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_13__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    attributes: attributes,
    components: {
      cta_box_before_heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        isSimple: true,
        name: "cta_box_before_heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert before heading', 'freshpress-website')
      }),
      cta_box_heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        isSimple: true,
        name: "cta_box_heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert heading', 'freshpress-website')
      }),
      cta_box_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Link, {
        inline: true,
        className: "btn btn-cta-green feature-grid__cta-box__cta-button px-5 px-lg-3 px-xxl-5 py-2 mt-5 font-weight-medium h4 text-left text-nowrap",
        name: "cta_box_cta"
      }),
      cta_box_after_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        name: "cta_box_after_cta",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert after CTA', 'freshpress-website')
      }),
      grid_main_tile_heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        isSimple: true,
        name: "grid_main_tile_heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert main tile heading', 'freshpress-website')
      }),
      grid_main_tile_description: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
        isSimple: true,
        name: "grid_main_tile_description",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert main tile description', 'freshpress-website')
      }),
      grid_main_tile_image: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image, {
        inline: true,
        className: "feature-grid__tile-image d-block m-auto rounded",
        name: "grid_main_tile_image"
      }),
      admin_tiles_partials: /*#__PURE__*/React.createElement(React.Fragment, null, tilesPartials)
    }
  })));
});

/***/ }),

/***/ "../blocks/fpbk/feature-grid/src/editor.scss":
/*!***************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/editor.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/feature-grid/src/index.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/feature-grid/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/feature-grid/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/feature-grid/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/feature-grid/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/feature-grid/src/style.scss");
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

/***/ "../blocks/fpbk/feature-grid/src/state/tiles/_actions.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/state/tiles/_actions.js ***!
  \***************************************************************/
/*! exports provided: ADD_TILE, REMOVE_TILE, EDIT_TILE_HEADING, EDIT_TILE_DESCRIPTION, EDIT_TILE_IMAGE, MOVE_TILE_LEFT, MOVE_TILE_RIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_TILE", function() { return ADD_TILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_TILE", function() { return REMOVE_TILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TILE_HEADING", function() { return EDIT_TILE_HEADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TILE_DESCRIPTION", function() { return EDIT_TILE_DESCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TILE_IMAGE", function() { return EDIT_TILE_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_TILE_LEFT", function() { return MOVE_TILE_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_TILE_RIGHT", function() { return MOVE_TILE_RIGHT; });
const ADD_TILE = 'at';
const REMOVE_TILE = 'rt';
const EDIT_TILE_HEADING = 'eth';
const EDIT_TILE_DESCRIPTION = 'etd';
const EDIT_TILE_IMAGE = 'eti';
const MOVE_TILE_LEFT = 'mtl';
const MOVE_TILE_RIGHT = 'mtr';

/***/ }),

/***/ "../blocks/fpbk/feature-grid/src/state/tiles/_reducer.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/state/tiles/_reducer.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/feature-grid/src/state/tiles/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");




/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_TILE"]:
      return [...state, {
        heading: '',
        description: '',
        image: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__["emptyImageObject"],
        key: "tile_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_TILE"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TILE_HEADING"]:
      return editAtIndex('heading');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TILE_DESCRIPTION"]:
      return editAtIndex('description');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TILE_IMAGE"]:
      return editAtIndex('image');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_TILE_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_TILE_RIGHT"]:
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

/***/ "../blocks/fpbk/feature-grid/src/style.scss":
/*!**************************************************!*\
  !*** ../blocks/fpbk/feature-grid/src/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/feature-grid/templates/block.mustache":
/*!************************************************************!*\
  !*** ../blocks/fpbk/feature-grid/templates/block.mustache ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-grid__container d-block w-100\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"feature-grid__cta-box col-12 col-lg-4 col-xl-3 offset-xl-1 text-center text-lg-left pt-lg-6\">\n                <p class=\"feature-grid__cta-box__before-heading text-white-50 text-uppercase font-weight-medium h6\">\n                    {{ cta_box_before_heading }}\n                </p>\n                <h2 class=\"feature-grid__cta-box__heading text-white h1\">\n                    {{ cta_box_heading }}\n                </h2>\n\t\t\t\t<div class=\"d-inline-flex flex-column text-center\">\n\t\t\t\t\t{{# cta_box_cta.html }}\n\t\t\t\t\t\t{{{ cta_box_cta.html }}}\n\t\t\t\t\t{{/ cta_box_cta.html }}\n\t\t\t\t\t{{^ cta_box_cta.html }}\n\t\t\t\t\t\t{{{ cta_box_cta }}}\n\t\t\t\t\t{{/ cta_box_cta.html }}\n\t\t\t\t\t<p class=\"feature-grid__cta-box__after-cta-button text-white-50 mt-2\">\n\t\t\t\t\t\t{{{ cta_box_after_cta }}}\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n            </div>\n            <div class=\"feature-grid__grid col-12 col-lg-8 col-xl-7 mt-5 mt-lg-0 ml-0\">\n                <div class=\"feature-grid__tile  feature-grid__tile--main-tile\">\n                    <p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n                        {{ grid_main_tile_heading }}\n                    </p>\n                    <p class=\"feature-grid__tile-description text-white-50\">\n                        {{ grid_main_tile_description }}\n                    </p>\n                    {{{ grid_main_tile_image }}}\n                </div>\n\n                {{# grid_tiles }}\n                    {{# image }}\n                        {{> partial__tile_with_image }}\n                    {{/ image }}\n                    {{^ image }}\n                        {{> partial__tile_without_image }}\n                    {{/ image }}\n                {{/ grid_tiles }}\n                {{# admin_tiles_partials }}\n                    {{{ admin_tiles_partials }}}\n                {{/ admin_tiles_partials }}\n            </div>\n        </div>\n    </div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-grid__container d-block w-100\">\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"feature-grid__cta-box col-12 col-lg-4 col-xl-3 offset-xl-1 text-center text-lg-left pt-lg-6\">\n                <p class=\"feature-grid__cta-box__before-heading text-white-50 text-uppercase font-weight-medium h6\">\n                    {{ cta_box_before_heading }}\n                </p>\n                <h2 class=\"feature-grid__cta-box__heading text-white h1\">\n                    {{ cta_box_heading }}\n                </h2>\n\t\t\t\t<div class=\"d-inline-flex flex-column text-center\">\n\t\t\t\t\t{{# cta_box_cta.html }}\n\t\t\t\t\t\t{{{ cta_box_cta.html }}}\n\t\t\t\t\t{{/ cta_box_cta.html }}\n\t\t\t\t\t{{^ cta_box_cta.html }}\n\t\t\t\t\t\t{{{ cta_box_cta }}}\n\t\t\t\t\t{{/ cta_box_cta.html }}\n\t\t\t\t\t<p class=\"feature-grid__cta-box__after-cta-button text-white-50 mt-2\">\n\t\t\t\t\t\t{{{ cta_box_after_cta }}}\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n            </div>\n            <div class=\"feature-grid__grid col-12 col-lg-8 col-xl-7 mt-5 mt-lg-0 ml-0\">\n                <div class=\"feature-grid__tile  feature-grid__tile--main-tile\">\n                    <p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n                        {{ grid_main_tile_heading }}\n                    </p>\n                    <p class=\"feature-grid__tile-description text-white-50\">\n                        {{ grid_main_tile_description }}\n                    </p>\n                    {{{ grid_main_tile_image }}}\n                </div>\n\n                {{# grid_tiles }}\n                    {{# image }}\n                        {{> partial__tile_with_image }}\n                    {{/ image }}\n                    {{^ image }}\n                        {{> partial__tile_without_image }}\n                    {{/ image }}\n                {{/ grid_tiles }}\n                {{# admin_tiles_partials }}\n                    {{{ admin_tiles_partials }}}\n                {{/ admin_tiles_partials }}\n            </div>\n        </div>\n    </div>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/feature-grid/templates/tile_with_image.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/feature-grid/templates/tile_with_image.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-grid__tile feature-grid__tile--image-tile position-relative\">\n\t{{{ admin_controls }}}\n\n\t<div class=\"row h-100\">\n\t\t<div class=\"col-12 col-lg-6\">\n\t\t\t<p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n\t\t\t\t{{ heading }}\n\t\t\t</p>\n\t\t\t<p class=\"feature-grid__tile-description text-white-50\">\n\t\t\t\t{{ description }}\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"col-12 col-lg-6 d-none d-lg-block align-self-center\">\n\t\t\t{{{ image }}}\n\t\t</div>\n\t</div>\n</div>\n\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-grid__tile feature-grid__tile--image-tile position-relative\">\n\t{{{ admin_controls }}}\n\n\t<div class=\"row h-100\">\n\t\t<div class=\"col-12 col-lg-6\">\n\t\t\t<p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n\t\t\t\t{{ heading }}\n\t\t\t</p>\n\t\t\t<p class=\"feature-grid__tile-description text-white-50\">\n\t\t\t\t{{ description }}\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"col-12 col-lg-6 d-none d-lg-block align-self-center\">\n\t\t\t{{{ image }}}\n\t\t</div>\n\t</div>\n</div>\n\n";


/***/ }),

/***/ "../blocks/fpbk/feature-grid/templates/tile_without_image.partial.mustache":
/*!*********************************************************************************!*\
  !*** ../blocks/fpbk/feature-grid/templates/tile_without_image.partial.mustache ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-grid__tile position-relative\">\n\t{{{ admin_controls }}}\n\n\t<p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n\t\t{{ heading }}\n\t</p>\n\t<p class=\"feature-grid__tile-description text-white-50\">\n\t\t{{ description }}\n\t</p>\n\t{{{ image }}}\n</div>\n\n\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-grid__tile position-relative\">\n\t{{{ admin_controls }}}\n\n\t<p class=\"feature-grid__tile-heading font-weight-medium mb-2 text-white h4\">\n\t\t{{ heading }}\n\t</p>\n\t<p class=\"feature-grid__tile-description text-white-50\">\n\t\t{{ description }}\n\t</p>\n\t{{{ image }}}\n</div>\n\n\n";


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

/***/ 117:
/*!******************************************************!*\
  !*** multi ../blocks/fpbk/feature-grid/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/feature-grid/src/index.js */"../blocks/fpbk/feature-grid/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-feature-grid-index.js.map