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
/******/ 		"blocks-fpbk-product-tour-index": 0
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
/******/ 	deferredModules.push([171,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/product-tour/block.json":
/*!**********************************************!*\
  !*** ../blocks/fpbk/product-tour/block.json ***!
  \**********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, example, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/product-tour\",\"title\":\"Product Tour\",\"category\":\"freshblocks\",\"description\":\"Product Tour Carousel Widget.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true},\"styles\":[{\"name\":\"default\",\"label\":\"Default\",\"isDefault\":true},{\"name\":\"with-video\",\"label\":\"With video\"}],\"example\":{\"attributes\":{}}}");

/***/ }),

/***/ "../blocks/fpbk/product-tour/src/_edit.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/_edit.js ***!
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Arrow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_Arrow */ "../blocks/fpbk/product-tour/src/components/_Arrow.js");
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_carousel_item_default_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/carousel-item/default.partial.mustache */ "../blocks/fpbk/product-tour/templates/carousel-item/default.partial.mustache");
/* harmony import */ var _templates_carousel_item_default_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_carousel_item_default_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_carousel_item_with_video_partial_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/carousel-item/with-video.partial.mustache */ "../blocks/fpbk/product-tour/templates/carousel-item/with-video.partial.mustache");
/* harmony import */ var _templates_carousel_item_with_video_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_carousel_item_with_video_partial_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _state_items_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/items/_actions */ "../blocks/fpbk/product-tour/src/state/items/_actions.js");
/* harmony import */ var _state_items_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/items/_reducer */ "../blocks/fpbk/product-tour/src/state/items/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/product-tour/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/product-tour/block.json", 1);















/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "product-tour pb-5 pb-xl-0 position-relative ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_7__["getCommonBlockSettingsClass"])(attributes))
  });
  const [activeItemIndex, setActiveItemIndex] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(0);
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_11__["BlockStateManager"](attributes, setAttributes);
  const [items, itemDispatch] = blockStateManager.addReducerManager(_state_items_reducer__WEBPACK_IMPORTED_MODULE_13__["default"], 'product_tour_items');
  const activeItem = items[activeItemIndex];
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    if (items.length > 0 && activeItemIndex >= items.length) {
      setActiveItemIndex(items.length - 1);
    }
  }, [items.length]);
  const isWithVideoTheme = (attributes === null || attributes === void 0 ? void 0 : attributes.className) && attributes.className.includes('is-style-with-video');
  const itemVideoIdFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_7__["getBlockAttributeSubfieldDefinition"])(_block_json__WEBPACK_IMPORTED_MODULE_14__["name"], 'product_tour_items', 'product_tour_item_video_id');
  const partialNavs = [];
  items.forEach((item, index) => {
    partialNavs.push(
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    React.createElement("a", {
      key: item.key,
      className: "product-tour__nav-link mx-1 pb-2 px-1 text-decoration-none ".concat(activeItemIndex === index ? 'product-tour__nav-link_active' : ''),
      onClick: () => {
        setActiveItemIndex(index);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "block-editor__block-controls"
    }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSmall: true,
      onClick: event => {
        event.stopPropagation();
        event.preventDefault();
        itemDispatch({
          type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["MOVE_ITEM_LEFT"],
          index
        });

        if (activeItemIndex === index) {
          setActiveItemIndex(activeItemIndex - 1);
        }
      },
      icon: "arrow-left-alt2"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isDestructive: true,
      isSmall: true,
      onClick: event => {
        event.stopPropagation();
        event.preventDefault();
        itemDispatch({
          type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["REMOVE_ITEM"],
          index
        });
      },
      icon: "no-alt"
    }), index < items.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSmall: true,
      onClick: event => {
        event.stopPropagation();
        event.preventDefault();
        itemDispatch({
          type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["MOVE_ITEM_RIGHT"],
          index
        });

        if (activeItemIndex === index) {
          setActiveItemIndex(activeItemIndex + 1);
        }
      },
      icon: "arrow-right-alt2"
    })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
      isSimple: true,
      value: item.product_tour_item_nav_title,
      onChange: value => {
        itemDispatch({
          type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_NAV_TITLE"],
          index,
          value
        });
      },
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert nav title', 'freshpress-website')
    })));
  });
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_14__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].TrueFalse, {
    name: "mobile_carousel"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, isWithVideoTheme && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "reversed-corner reversed-corner_down reversed-corner_white d-none d-lg-block"
  }, /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement("h2", {
    className: "mb-4 pb-2 mb-md-4 section-heading section-heading_first text-center"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
    isSimple: true,
    name: "product_tour_title",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert main title', 'freshpress-website')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "product-tour__nav-container d-flex mb-0 mx-auto"
  }, partialNavs), items.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "product-tour__content-container d-flex"
  }, /*#__PURE__*/React.createElement(_components_Arrow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeItemIndex > 0,
    onClick: () => {
      if (activeItemIndex > 0) {
        setActiveItemIndex(activeItemIndex - 1);
      }
    },
    type: "previous"
  }), /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: { ...activeItem,
      item_active_class: 'product-tour__item_active mx-auto',
      is_with_video_theme: isWithVideoTheme
    },
    key: "product_tour_item_".concat(activeItemIndex),
    template: isWithVideoTheme ? _templates_carousel_item_with_video_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default.a : _templates_carousel_item_default_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a,
    components: {
      product_tour_item_title: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
        isSimple: true,
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_title,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_TITLE"],
            index: activeItemIndex,
            value
          });
        },
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert title', 'freshpress-website')
      }),
      product_tour_item_description: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_description,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_DESCRIPTION"],
            index: activeItemIndex,
            value
          });
        },
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert description', 'freshpress-website')
      }),
      product_tour_item_link: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Link, {
        inline: true,
        className: "product-tour__item-cta ".concat(isWithVideoTheme ? 'product-tour__item-cta py-2 d-inline-block' : 'btn btn-outline-grey py-2 px-4 mx-auto'),
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_link,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_LINK"],
            index: activeItemIndex,
            value
          });
        }
      }),
      product_tour_item_image: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Image, {
        inline: true,
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_image,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_IMAGE"],
            index: activeItemIndex,
            value
          });
        },
        previewSize: "large"
      }),
      has_mobile_image: true,
      product_tour_item_mobile_image: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Mobile image: "), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Image, {
        inline: true,
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_mobile_image,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_MOBILE_IMAGE"],
            index: activeItemIndex,
            value
          });
        },
        previewSize: "large"
      })),
      product_tour_item_watch_video_label: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
        isSimple: true,
        className: "px-0",
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_watch_video_label,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_WATCH_VIDEO_LABEL"],
            index: activeItemIndex,
            value
          });
        }
      }),
      product_tour_item_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Link, {
        inline: true,
        className: "py-2 px-3 btn btn-cta-green cta__button",
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_cta,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_CTA"],
            index: activeItemIndex,
            value
          });
        }
      }),
      product_tour_item_cta_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].RichText, {
        isSimple: true,
        className: "px-0",
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_cta_text,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_CTA_TEXT"],
            index: activeItemIndex,
            value
          });
        }
      }),
      product_tour_item_edit_video_id: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Text, {
        key: "product_tour_item_edit_video_id_".concat(activeItemIndex),
        label: itemVideoIdFieldDefinition.label,
        value: activeItem === null || activeItem === void 0 ? void 0 : activeItem.product_tour_item_video_id,
        onChange: value => {
          itemDispatch({
            type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["EDIT_ITEM_VIDEO_ID"],
            index: activeItemIndex,
            value
          });
        },
        placeholder: itemVideoIdFieldDefinition.placeholder
      })
    }
  }), /*#__PURE__*/React.createElement(_components_Arrow__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeItemIndex < items.length - 1,
    onClick: () => {
      if (activeItemIndex < items.length - 1) {
        setActiveItemIndex(activeItemIndex + 1);
      }
    },
    type: "next"
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    isSecondary: true,
    className: "d-block mx-auto mt-4 position-relative",
    style: {
      zIndex: 2000
    },
    disabled: items.length >= 8,
    onClick: () => {
      itemDispatch({
        type: _state_items_actions__WEBPACK_IMPORTED_MODULE_12__["ADD_ITEM"]
      });

      if (items.length > 0) {
        setActiveItemIndex(items.length);
      }
    },
    icon: "plus",
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add item', 'freshpress-website')
  })));
});

/***/ }),

/***/ "../blocks/fpbk/product-tour/src/components/_Arrow.js":
/*!************************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/components/_Arrow.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    active,
    onClick,
    type
  } = props;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    React.createElement("a", {
      className: "product-tour__item-nav-link product-tour__item-nav-link_".concat(type, " ").concat(active > 0 ? 'product-tour__item-nav-link_active cursor-pointer' : ''),
      onClick: onClick
    })
  );
});

/***/ }),

/***/ "../blocks/fpbk/product-tour/src/index.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/product-tour/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/product-tour/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/product-tour/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/product-tour/src/style.scss");
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

/***/ "../blocks/fpbk/product-tour/src/state/items/_actions.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/state/items/_actions.js ***!
  \***************************************************************/
/*! exports provided: ADD_ITEM, REMOVE_ITEM, EDIT_ITEM_NAV_TITLE, EDIT_ITEM_TITLE, EDIT_ITEM_DESCRIPTION, EDIT_ITEM_LINK, EDIT_ITEM_IMAGE, EDIT_ITEM_MOBILE_IMAGE, EDIT_ITEM_VIDEO_ID, EDIT_ITEM_WATCH_VIDEO_LABEL, EDIT_ITEM_CTA, EDIT_ITEM_CTA_TEXT, MOVE_ITEM_LEFT, MOVE_ITEM_RIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ITEM", function() { return ADD_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ITEM", function() { return REMOVE_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_NAV_TITLE", function() { return EDIT_ITEM_NAV_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_TITLE", function() { return EDIT_ITEM_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_DESCRIPTION", function() { return EDIT_ITEM_DESCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_LINK", function() { return EDIT_ITEM_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_IMAGE", function() { return EDIT_ITEM_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_MOBILE_IMAGE", function() { return EDIT_ITEM_MOBILE_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_VIDEO_ID", function() { return EDIT_ITEM_VIDEO_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_WATCH_VIDEO_LABEL", function() { return EDIT_ITEM_WATCH_VIDEO_LABEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_CTA", function() { return EDIT_ITEM_CTA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ITEM_CTA_TEXT", function() { return EDIT_ITEM_CTA_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_ITEM_LEFT", function() { return MOVE_ITEM_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_ITEM_RIGHT", function() { return MOVE_ITEM_RIGHT; });
const ADD_ITEM = 'ai';
const REMOVE_ITEM = 'ri';
const EDIT_ITEM_NAV_TITLE = 'eint';
const EDIT_ITEM_TITLE = 'eit';
const EDIT_ITEM_DESCRIPTION = 'eid';
const EDIT_ITEM_LINK = 'eil';
const EDIT_ITEM_IMAGE = 'eii';
const EDIT_ITEM_MOBILE_IMAGE = 'eimi';
const EDIT_ITEM_VIDEO_ID = 'eivi';
const EDIT_ITEM_WATCH_VIDEO_LABEL = 'eiwvl';
const EDIT_ITEM_CTA = 'eic';
const EDIT_ITEM_CTA_TEXT = 'eict';
const MOVE_ITEM_LEFT = 'mil';
const MOVE_ITEM_RIGHT = 'mir';

/***/ }),

/***/ "../blocks/fpbk/product-tour/src/state/items/_reducer.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/state/items/_reducer.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/product-tour/src/state/items/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Link */ "./scripts/components/EditorControls/components/universal/_Link.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");





/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_ITEM"]:
      return [...state, {
        product_tour_item_nav_title: '',
        product_tour_item_title: '',
        product_tour_item_description: '',
        product_tour_item_link: scripts_components_EditorControls_components_universal_Link__WEBPACK_IMPORTED_MODULE_3__["emptyLinkObject"],
        product_tour_item_video_id: '',
        product_tour_item_watch_video_label: 'Watch video',
        product_tour_item_cta: scripts_components_EditorControls_components_universal_Link__WEBPACK_IMPORTED_MODULE_3__["emptyLinkObject"],
        product_tour_item_cta_text: 'Try It Free for 30 Days. No credit card required. Cancel anytime.',
        product_tour_item_image: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_4__["emptyImageObject"],
        product_tour_item_mobile_image: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_4__["emptyImageObject"],
        key: "product_tour_item_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_ITEM"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_NAV_TITLE"]:
      return editAtIndex('product_tour_item_nav_title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_TITLE"]:
      return editAtIndex('product_tour_item_title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_DESCRIPTION"]:
      return editAtIndex('product_tour_item_description');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_LINK"]:
      return editAtIndex('product_tour_item_link');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_IMAGE"]:
      return editAtIndex('product_tour_item_image');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_MOBILE_IMAGE"]:
      return editAtIndex('product_tour_item_mobile_image');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_VIDEO_ID"]:
      return editAtIndex('product_tour_item_video_id');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_WATCH_VIDEO_LABEL"]:
      return editAtIndex('product_tour_item_watch_video_label');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_CTA"]:
      return editAtIndex('product_tour_item_cta');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ITEM_CTA_TEXT"]:
      return editAtIndex('product_tour_item_cta_text');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_ITEM_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_ITEM_RIGHT"]:
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

/***/ "../blocks/fpbk/product-tour/src/style.scss":
/*!**************************************************!*\
  !*** ../blocks/fpbk/product-tour/src/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/product-tour/templates/carousel-item/default.partial.mustache":
/*!************************************************************************************!*\
  !*** ../blocks/fpbk/product-tour/templates/carousel-item/default.partial.mustache ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div\n\tclass=\"product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }} {{ item_active_class }}\"\n\tdata-id=\"{{ nav_title_id }}\"\n>\n\t<div class=\"product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0\">\n\t\t<h2 class=\"product-tour__item-title mb-4 mb-lg-3\">\n\t\t\t{{{ product_tour_item_title }}}\n\t\t</h2>\n\n\t\t<div class=\"product-tour__item-description mb-4\">\n\t\t\t{{{ product_tour_item_description }}}\n\t\t</div>\n\n\t\t{{# product_tour_item_link.html }}\n\t\t\t{{{ product_tour_item_link.html }}}\n\t\t{{/ product_tour_item_link.html }}\n\t\t{{^ product_tour_item_link.html }}\n\t\t\t{{{ product_tour_item_link }}}\n\t\t{{/ product_tour_item_link.html }}\n\t</div>\n\n\t<div class=\"product-tour__item-image-container position-relative mx-auto text-center\">\n\t\t{{{ product_tour_item_image }}}\n\t</div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div\n\tclass=\"product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }} {{ item_active_class }}\"\n\tdata-id=\"{{ nav_title_id }}\"\n>\n\t<div class=\"product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0\">\n\t\t<h2 class=\"product-tour__item-title mb-4 mb-lg-3\">\n\t\t\t{{{ product_tour_item_title }}}\n\t\t</h2>\n\n\t\t<div class=\"product-tour__item-description mb-4\">\n\t\t\t{{{ product_tour_item_description }}}\n\t\t</div>\n\n\t\t{{# product_tour_item_link.html }}\n\t\t\t{{{ product_tour_item_link.html }}}\n\t\t{{/ product_tour_item_link.html }}\n\t\t{{^ product_tour_item_link.html }}\n\t\t\t{{{ product_tour_item_link }}}\n\t\t{{/ product_tour_item_link.html }}\n\t</div>\n\n\t<div class=\"product-tour__item-image-container position-relative mx-auto text-center\">\n\t\t{{{ product_tour_item_image }}}\n\t</div>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/product-tour/templates/carousel-item/with-video.partial.mustache":
/*!***************************************************************************************!*\
  !*** ../blocks/fpbk/product-tour/templates/carousel-item/with-video.partial.mustache ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div\n\tclass=\"product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }} {{ item_active_class }}\"\n\tdata-id=\"{{ nav_title_id }}\"\n>\n\t<div class=\"product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0\">\n\t\t<h2 class=\"product-tour__item-title mb-2\">\n\t\t\t{{{ product_tour_item_title }}}\n\t\t</h2>\n\n\t\t<div class=\"product-tour__item-description mb-4\">\n\t\t\t{{{ product_tour_item_description }}}\n\t\t</div>\n\n\t\t<div class=\"product-tour__buttons mx-auto ml-lg-0 {{# product_tour_item_edit_video_id }}mb-1{{/product_tour_item_edit_video_id}}\">\n\t\t\t<div class=\"product-tour__watch\">\n\t\t\t\t{{{ product_tour_item_watch_video_label }}}\n\t\t\t</div>\n            {{# product_tour_item_link.html }}\n                {{{ product_tour_item_link.html }}}\n            {{/ product_tour_item_link.html }}\n            {{^ product_tour_item_link.html }}\n                {{{ product_tour_item_link }}}\n            {{/ product_tour_item_link.html }}\n\t\t</div>\n\n\t\t{{# product_tour_item_edit_video_id }}\n\t\t\t{{{ product_tour_item_edit_video_id }}}\n\t\t{{/ product_tour_item_edit_video_id }}\n\n\t\t<div class=\"product-tour__try-it-free mx-auto ml-lg-0\">\n\t\t\t{{# product_tour_item_cta.html }}\n\t\t\t\t{{{ product_tour_item_cta.html }}}\n\t\t\t{{/ product_tour_item_cta.html }}\n\t\t\t{{^ product_tour_item_cta.html }}\n\t\t\t\t{{{ product_tour_item_cta }}}\n\t\t\t{{/ product_tour_item_cta.html }}\n\t\t\t<p>{{{ product_tour_item_cta_text }}}</p>\n\t\t</div>\n\n\t</div>\n\n\t<div class=\"product-tour__item-image-container position-relative mx-auto text-center\">\n\t\t{{{ product_tour_item_image }}}\n\t\t{{# has_mobile_image }}\n\t\t\t{{{ product_tour_item_mobile_image }}}\n\t\t{{/ has_mobile_image }}\n\n\t\t<lite-youtube id=\"video{{ product_tour_item_index }}\" videoid=\"{{ product_tour_item_video_id }}\" params=\"enablejsapi=1\" class=\"product-tour__item-video\"></lite-youtube>\n\t\t<div class=\"product-tour__item-close-video\">Close video</div>\n\t</div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div\n\tclass=\"product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }} {{ item_active_class }}\"\n\tdata-id=\"{{ nav_title_id }}\"\n>\n\t<div class=\"product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0\">\n\t\t<h2 class=\"product-tour__item-title mb-2\">\n\t\t\t{{{ product_tour_item_title }}}\n\t\t</h2>\n\n\t\t<div class=\"product-tour__item-description mb-4\">\n\t\t\t{{{ product_tour_item_description }}}\n\t\t</div>\n\n\t\t<div class=\"product-tour__buttons mx-auto ml-lg-0 {{# product_tour_item_edit_video_id }}mb-1{{/product_tour_item_edit_video_id}}\">\n\t\t\t<div class=\"product-tour__watch\">\n\t\t\t\t{{{ product_tour_item_watch_video_label }}}\n\t\t\t</div>\n            {{# product_tour_item_link.html }}\n                {{{ product_tour_item_link.html }}}\n            {{/ product_tour_item_link.html }}\n            {{^ product_tour_item_link.html }}\n                {{{ product_tour_item_link }}}\n            {{/ product_tour_item_link.html }}\n\t\t</div>\n\n\t\t{{# product_tour_item_edit_video_id }}\n\t\t\t{{{ product_tour_item_edit_video_id }}}\n\t\t{{/ product_tour_item_edit_video_id }}\n\n\t\t<div class=\"product-tour__try-it-free mx-auto ml-lg-0\">\n\t\t\t{{# product_tour_item_cta.html }}\n\t\t\t\t{{{ product_tour_item_cta.html }}}\n\t\t\t{{/ product_tour_item_cta.html }}\n\t\t\t{{^ product_tour_item_cta.html }}\n\t\t\t\t{{{ product_tour_item_cta }}}\n\t\t\t{{/ product_tour_item_cta.html }}\n\t\t\t<p>{{{ product_tour_item_cta_text }}}</p>\n\t\t</div>\n\n\t</div>\n\n\t<div class=\"product-tour__item-image-container position-relative mx-auto text-center\">\n\t\t{{{ product_tour_item_image }}}\n\t\t{{# has_mobile_image }}\n\t\t\t{{{ product_tour_item_mobile_image }}}\n\t\t{{/ has_mobile_image }}\n\n\t\t<lite-youtube id=\"video{{ product_tour_item_index }}\" videoid=\"{{ product_tour_item_video_id }}\" params=\"enablejsapi=1\" class=\"product-tour__item-video\"></lite-youtube>\n\t\t<div class=\"product-tour__item-close-video\">Close video</div>\n\t</div>\n</div>\n";


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

/***/ 171:
/*!******************************************************!*\
  !*** multi ../blocks/fpbk/product-tour/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/product-tour/src/index.js */"../blocks/fpbk/product-tour/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-product-tour-index.js.map