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
/******/ 		"blocks-fpbk-tabbed-cards-index": 0
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
/******/ 	deferredModules.push([192,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/tabbed-cards/block.json":
/*!**********************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/block.json ***!
  \**********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, example, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/tabbed-cards\",\"title\":\"Tabbed Cards\",\"category\":\"freshblocks\",\"description\":\"Tabbed Cards\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true},\"styles\":[{\"name\":\"old\",\"label\":\"Old\",\"isDefault\":true},{\"name\":\"new\",\"label\":\"New\"}],\"example\":{\"attributes\":{\"cards\":[{\"tab_title\":\"Tab 1\",\"card_content\":\"Card 1\"},{\"tab_title\":\"Tab 2\",\"card_content\":\"Card 2\"}]}}}");

/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/src/_edit.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/_edit.js ***!
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
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _templates_tab_content_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/tab-content.partial.mustache */ "../blocks/fpbk/tabbed-cards/templates/tab-content.partial.mustache");
/* harmony import */ var _templates_tab_content_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_tab_content_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_nav_item_partial_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/nav-item.partial.mustache */ "../blocks/fpbk/tabbed-cards/templates/nav-item.partial.mustache");
/* harmony import */ var _templates_nav_item_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_nav_item_partial_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/cards/_actions */ "../blocks/fpbk/tabbed-cards/src/state/cards/_actions.js");
/* harmony import */ var _state_cards_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/cards/_reducer */ "../blocks/fpbk/tabbed-cards/src/state/cards/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/tabbed-cards/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/tabbed-cards/block.json", 1);














/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "tabbed-cards ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getCommonBlockSettingsClass"])(attributes))
  });
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_8__["BlockStateManager"](attributes, setAttributes);
  const [cards, cardDispatch] = blockStateManager.addReducerManager(_state_cards_reducer__WEBPACK_IMPORTED_MODULE_12__["default"], 'cards');
  const [activeCard, setActiveCard] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(0);
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    if (cards.length > 0 && activeCard >= cards.length) {
      setActiveCard(cards.length - 1);
    }
  }, [cards.length]);
  const templateData = { ...attributes
  };
  templateData.tab_y_padding = 'py-3 pb-4';
  templateData.card_content_position = 'static';

  if (blockProps.className.indexOf('is-style-new') >= 0) {
    templateData.tab_y_padding = 'pt-2 pb-4';
    templateData.card_content_position = 'relative';
  }

  const partialTemplates = {
    navItems: [],
    tabContents: []
  };
  {
    cards.forEach((card, index) => {
      const {
        key
      } = card;
      card.card_id = "card-".concat(index);
      card.active = activeCard === index ? 'active' : '';
      partialTemplates.navItems.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__["default"], {
        attributes: { ...card,
          ...templateData
        },
        key: "nav_item_".concat(key),
        template: _templates_nav_item_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default.a,
        components: {
          admin_tab: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
            className: "nav-link ".concat(templateData.tab_y_padding, " px-2 px-sm-4 px-md-2 px-xl-4 ").concat(card.active),
            onClick: () => {
              setActiveCard(index);
            }
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            isSimple: true,
            value: card.tab_title,
            onChange: value => {
              cardDispatch({
                type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_CARD_TAB_TITLE"],
                index,
                value
              });
            },
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert title', 'freshpress-website')
          }), /*#__PURE__*/React.createElement("div", {
            className: "block-editor__block-controls block-editor__tabbed-cards-controls position-absolute m-0"
          }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            isSmall: true,
            onClick: event => {
              event.stopPropagation();
              event.preventDefault();
              cardDispatch({
                type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_CARD_LEFT"],
                index
              });

              if (activeCard === index) {
                setActiveCard(activeCard - 1);
              }
            },
            icon: "arrow-left-alt2"
          }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            isDestructive: true,
            isSmall: true,
            onClick: event => {
              event.stopPropagation();
              event.preventDefault();
              cardDispatch({
                type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["REMOVE_CARD"],
                index
              });
            },
            icon: "no-alt"
          }), index < cards.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            isSmall: true,
            onClick: event => {
              event.stopPropagation();
              event.preventDefault();
              cardDispatch({
                type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_CARD_RIGHT"],
                index
              });

              if (activeCard === index) {
                setActiveCard(activeCard + 1);
              }
            },
            icon: "arrow-right-alt2"
          }))))
        }
      }));
      partialTemplates.tabContents.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__["default"], {
        attributes: { ...card
        },
        key: "tab_content_".concat(key),
        template: _templates_tab_content_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a,
        components: {
          card_content: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            value: card.card_content,
            onChange: value => {
              cardDispatch({
                type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_CARD_CONTENT"],
                index,
                value
              });
            },
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert content', 'freshpress-website')
          })
        }
      }));
    });
  }
  partialTemplates.navItems.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: { ...templateData
    },
    key: 'tab_admin',
    template: _templates_nav_item_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default.a,
    components: {
      admin_tab:
      /*#__PURE__*/

      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
      React.createElement("span", {
        className: "nav-link ".concat(templateData.tab_y_padding, " px-2 px-sm-4 px-md-2 px-xl-4 cursor-pointer"),
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add tab', 'freshpress-website'),
        onClick: () => {
          cardDispatch({
            type: _state_cards_actions__WEBPACK_IMPORTED_MODULE_11__["ADD_CARD"]
          });

          if (cards.length > 0) {
            setActiveCard(cards.length);
          }
        }
      }, "+")
    }
  }));
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Context.Provider, {
    value: {
      attributes,
      setAttributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_13__["name"]
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: "tabbed-cards__cards w-100 mx-auto"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav nav-tabs border-0",
    id: "myTab",
    role: "tablist"
  }, partialTemplates.navItems), /*#__PURE__*/React.createElement("div", {
    className: "tab-content card mt-0 position-".concat(templateData.card_content_position),
    id: "myTabContent"
  }, partialTemplates.tabContents))));
});

/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/src/editor.scss":
/*!***************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/editor.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/src/index.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/tabbed-cards/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/tabbed-cards/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/tabbed-cards/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/tabbed-cards/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/tabbed-cards/src/style.scss");
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

/***/ "../blocks/fpbk/tabbed-cards/src/state/cards/_actions.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/state/cards/_actions.js ***!
  \***************************************************************/
/*! exports provided: ADD_CARD, REMOVE_CARD, EDIT_CARD_TAB_TITLE, EDIT_CARD_CONTENT, MOVE_CARD_LEFT, MOVE_CARD_RIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CARD", function() { return ADD_CARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_CARD", function() { return REMOVE_CARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CARD_TAB_TITLE", function() { return EDIT_CARD_TAB_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CARD_CONTENT", function() { return EDIT_CARD_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_CARD_LEFT", function() { return MOVE_CARD_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_CARD_RIGHT", function() { return MOVE_CARD_RIGHT; });
const ADD_CARD = 'ac';
const REMOVE_CARD = 'rc';
const EDIT_CARD_TAB_TITLE = 'ectt';
const EDIT_CARD_CONTENT = 'ecc';
const MOVE_CARD_LEFT = 'mcl';
const MOVE_CARD_RIGHT = 'mcr';

/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/src/state/cards/_reducer.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/state/cards/_reducer.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/tabbed-cards/src/state/cards/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_CARD"]:
      return [...state, {
        tab_title: '',
        card_content: '',
        key: "topic_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_CARD"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_CARD_TAB_TITLE"]:
      return editAtIndex('tab_title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_CARD_CONTENT"]:
      return editAtIndex('card_content');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_CARD_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_CARD_RIGHT"]:
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

/***/ "../blocks/fpbk/tabbed-cards/src/style.scss":
/*!**************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/src/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/templates/nav-item.partial.mustache":
/*!***********************************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/templates/nav-item.partial.mustache ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<li class=\"nav-item {{# admin_tab}} position-relative {{/ admin_tab }}\">\n\t{{# admin_tab }}\n\t\t{{{ admin_tab }}}\n\t{{/ admin_tab }}\n\t{{^ admin_tab }}\n\t\t<a\n\t\t\tid=\"{{ card_id }}-tab\"\n\t\t\tclass=\"nav-link {{ tab_y_padding }} px-2 px-sm-4 px-md-2 px-xl-4 {{ active }}\"\n\t\t\tdata-toggle=\"tab\"\n\t\t\thref=\"#{{ card_id }}\"\n\t\t\trole=\"tab\"\n\t\t\taria-controls=\"home\"\n\t\t\taria-selected=\"true\"\n\t\t>\n\t\t\t{{ tab_title }}\n\t\t</a>\n\t{{/ admin_tab }}\n</li>\n", data, partials);
}
module.exports.templateString = "<li class=\"nav-item {{# admin_tab}} position-relative {{/ admin_tab }}\">\n\t{{# admin_tab }}\n\t\t{{{ admin_tab }}}\n\t{{/ admin_tab }}\n\t{{^ admin_tab }}\n\t\t<a\n\t\t\tid=\"{{ card_id }}-tab\"\n\t\t\tclass=\"nav-link {{ tab_y_padding }} px-2 px-sm-4 px-md-2 px-xl-4 {{ active }}\"\n\t\t\tdata-toggle=\"tab\"\n\t\t\thref=\"#{{ card_id }}\"\n\t\t\trole=\"tab\"\n\t\t\taria-controls=\"home\"\n\t\t\taria-selected=\"true\"\n\t\t>\n\t\t\t{{ tab_title }}\n\t\t</a>\n\t{{/ admin_tab }}\n</li>\n";


/***/ }),

/***/ "../blocks/fpbk/tabbed-cards/templates/tab-content.partial.mustache":
/*!**************************************************************************!*\
  !*** ../blocks/fpbk/tabbed-cards/templates/tab-content.partial.mustache ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div\n\tid=\"{{ card_id }}\"\n\tclass=\"tab-pane card-body px-5 pb-5 pt-4 fade show {{ active }}\"\n\trole=\"tabpanel\"\n\taria-labelledby=\"{{ card_id }}-tab\"\n>\n\t{{{ card_content }}}\n</div>\n", data, partials);
}
module.exports.templateString = "<div\n\tid=\"{{ card_id }}\"\n\tclass=\"tab-pane card-body px-5 pb-5 pt-4 fade show {{ active }}\"\n\trole=\"tabpanel\"\n\taria-labelledby=\"{{ card_id }}-tab\"\n>\n\t{{{ card_content }}}\n</div>\n";


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

/***/ 192:
/*!******************************************************!*\
  !*** multi ../blocks/fpbk/tabbed-cards/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/tabbed-cards/src/index.js */"../blocks/fpbk/tabbed-cards/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-tabbed-cards-index.js.map