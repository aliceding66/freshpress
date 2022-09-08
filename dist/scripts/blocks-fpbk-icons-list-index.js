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
/******/ 		"blocks-fpbk-icons-list-index": 0
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
/******/ 	deferredModules.push([143,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/icons-list/block.json":
/*!********************************************!*\
  !*** ../blocks/fpbk/icons-list/block.json ***!
  \********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/icons-list\",\"title\":\"Icons List\",\"category\":\"freshblocks\",\"description\":\"A collection of sets of icons/numbers and text.\",\"textdomain\":\"fpbk\",\"supports\":{\"align\":true,\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/icons-list/src/_edit.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/icons-list/src/_edit.js ***!
  \**********************************************/
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
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "../blocks/fpbk/icons-list/src/utils.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_topic_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/topic.partial.mustache */ "../blocks/fpbk/icons-list/templates/topic.partial.mustache");
/* harmony import */ var _templates_topic_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_topic_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/topics/_actions */ "../blocks/fpbk/icons-list/src/state/topics/_actions.js");
/* harmony import */ var _state_topics_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/topics/_reducer */ "../blocks/fpbk/icons-list/src/state/topics/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/icons-list/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/icons-list/block.json", 1);













/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "icons-list px-4 mx-auto icons-list_".concat(attributes.block_settings_icons_list_columns, "-col ").concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_12__["name"])
    });
  } // Sets common attributes.


  const commonTopicAttributes = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setCommonAttributes"])(attributes);
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__["BlockStateManager"](attributes, setAttributes);
  const [topics, topicDispatch] = blockStateManager.addReducerManager(_state_topics_reducer__WEBPACK_IMPORTED_MODULE_11__["default"], 'icons_list_topic');
  const topicPartials = [];
  topics.forEach((iconListTopic, index) => {
    iconListTopic = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setTopicAttributes"])(iconListTopic, index);
    topicPartials.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: iconListTopic.key,
      attributes: { ...commonTopicAttributes,
        ...iconListTopic
      },
      template: _templates_topic_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a,
      components: {
        icons_list_topic_icon: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image, {
          className: "icons-list__topic-image mx-md-0 mb-2 mr-md-4 ".concat(commonTopicAttributes.topic_icon_class),
          inline: true,
          value: iconListTopic.icons_list_topic_icon,
          onChange: value => {
            topicDispatch({
              type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_TOPIC_ICON"],
              index,
              value
            });
          }
        }),
        icons_list_topic_title: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          isSimple: true,
          className: "icons-list__topic-title",
          value: iconListTopic.icons_list_topic_title,
          onChange: value => {
            topicDispatch({
              type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_TOPIC_TITLE"],
              index,
              value
            });
          },
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert title', 'freshpress-website')
        }),
        icons_list_topic_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
          className: "icons-list__topic-text",
          value: iconListTopic.icons_list_topic_text,
          onChange: value => {
            topicDispatch({
              type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["EDIT_TOPIC_TEXT"],
              index,
              value
            });
          },
          placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert text', 'freshpress-website')
        }),
        admin_controls: /*#__PURE__*/React.createElement("div", {
          className: "block-editor__block-controls d-flex flex-column"
        }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          onClick: () => {
            topicDispatch({
              type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["MOVE_TOPIC_UP"],
              index
            });
          },
          icon: "arrow-up-alt2"
        }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"] // className="icon__remove-button"
        , {
          isDestructive: true,
          isSmall: true,
          onClick: () => {
            const newIconsListTopic = [...attributes.icons_list_topic];
            newIconsListTopic.splice(index, 1);
            setAttributes({
              icons_list_topic: newIconsListTopic
            });
          },
          icon: "no-alt"
        }), index < topics.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          isSmall: true,
          onClick: () => {
            topicDispatch({
              type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["MOVE_TOPIC_DOWN"],
              index
            });
          },
          icon: "arrow-down-alt2"
        }))
      }
    }));
  });
  topicPartials.push( /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    key: "admin_add_button",
    isSecondary: true,
    className: "icon__add-button d-block mx-auto",
    onClick: () => {
      topicDispatch({
        type: _state_topics_actions__WEBPACK_IMPORTED_MODULE_10__["ADD_TOPIC"]
      });
    },
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Add topic', 'freshpress-website'),
    icon: "plus"
  }));
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_12__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.Group, {
    name: "block_settings"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "icons-list__title text-center"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
    name: "icons_list_title",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert title', 'freshpress-website')
  })), /*#__PURE__*/React.createElement("div", {
    className: "icons-list__topics row"
  }, topicPartials))));
});

/***/ }),

/***/ "../blocks/fpbk/icons-list/src/editor.scss":
/*!*************************************************!*\
  !*** ../blocks/fpbk/icons-list/src/editor.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/icons-list/src/index.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/icons-list/src/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/icons-list/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/icons-list/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/icons-list/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/icons-list/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/icons-list/src/style.scss");
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

/***/ "../blocks/fpbk/icons-list/src/state/topics/_actions.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/icons-list/src/state/topics/_actions.js ***!
  \**************************************************************/
/*! exports provided: ADD_TOPIC, REMOVE_TOPIC, EDIT_TOPIC_TITLE, EDIT_TOPIC_TEXT, EDIT_TOPIC_ICON, MOVE_TOPIC_UP, MOVE_TOPIC_DOWN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_TOPIC", function() { return ADD_TOPIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_TOPIC", function() { return REMOVE_TOPIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TOPIC_TITLE", function() { return EDIT_TOPIC_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TOPIC_TEXT", function() { return EDIT_TOPIC_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TOPIC_ICON", function() { return EDIT_TOPIC_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_TOPIC_UP", function() { return MOVE_TOPIC_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_TOPIC_DOWN", function() { return MOVE_TOPIC_DOWN; });
const ADD_TOPIC = 'at';
const REMOVE_TOPIC = 'rt';
const EDIT_TOPIC_TITLE = 'etti';
const EDIT_TOPIC_TEXT = 'ettx';
const EDIT_TOPIC_ICON = 'eti';
const MOVE_TOPIC_UP = 'mtu';
const MOVE_TOPIC_DOWN = 'mtd';

/***/ }),

/***/ "../blocks/fpbk/icons-list/src/state/topics/_reducer.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/icons-list/src/state/topics/_reducer.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/icons-list/src/state/topics/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");




/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_TOPIC"]:
      return [...state, {
        icons_list_topic_title: '',
        icons_list_topic_text: '',
        icons_list_topic_icon: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__["emptyImageObject"],
        key: "topic_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_TOPIC"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TOPIC_TITLE"]:
      return editAtIndex('icons_list_topic_title');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TOPIC_TEXT"]:
      return editAtIndex('icons_list_topic_text');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_TOPIC_ICON"]:
      return editAtIndex('icons_list_topic_icon');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_TOPIC_UP"]:
      const movedUpState = [...state];
      const previousItem = movedUpState[action.index - 1];
      movedUpState[action.index - 1] = movedUpState[action.index];
      movedUpState[action.index] = previousItem;
      return movedUpState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_TOPIC_DOWN"]:
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

/***/ "../blocks/fpbk/icons-list/src/style.scss":
/*!************************************************!*\
  !*** ../blocks/fpbk/icons-list/src/style.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/icons-list/src/utils.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/icons-list/src/utils.js ***!
  \**********************************************/
/*! exports provided: setCommonAttributes, setTopicAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommonAttributes", function() { return setCommonAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTopicAttributes", function() { return setTopicAttributes; });
function setCommonAttributes(attributes) {
  // Starter object.
  const commonTopicAttributes = {}; // Columns Number/Class.

  const columnsNumber = attributes.block_settings_icons_list_columns;
  let columnsClass = 'col-12';

  if ('2' === columnsNumber) {
    columnsClass += ' col-sm-6';
  } else if ('3' === columnsNumber) {
    columnsClass += ' col-sm-6 col-md-4';
  } else if ('4' === columnsNumber) {
    columnsClass += ' col-sm-6 col-md-4 col-lg-3';
  } // Stack.


  if (attributes.block_settings_topic_elements_stack) {
    columnsClass += ' flex-column justify-content-center';
  }

  commonTopicAttributes.columns_class = columnsClass; // Topic Icon Class.

  let topicIconClass = 'mr-3';

  if (attributes.block_settings_topic_elements_stack) {
    topicIconClass = 'mx-auto';
  }

  commonTopicAttributes.topic_icon_class = topicIconClass; // Description Class.

  let numberedTopicInfoClass = '';
  let showIcons = true;

  if (attributes.block_settings_numbered_topics) {
    numberedTopicInfoClass = 'pl-3 pl-md-1';
    showIcons = false;
  }

  commonTopicAttributes.show_icons = showIcons;
  commonTopicAttributes.numbered_topic_info_class = numberedTopicInfoClass; // Mobile Align Class.

  let mobileAlignClass = 'ml-0';

  if (attributes.block_settings_numbered_topics) {
    mobileAlignClass = 'text-left';
  } else if (attributes.block_settings_topic_elements_stack) {
    mobileAlignClass = 'mx-auto text-center';
  }

  commonTopicAttributes.mobile_align_class = mobileAlignClass;
  return commonTopicAttributes;
}
function setTopicAttributes(iconListTopic, topicIndex) {
  // Index.
  iconListTopic.index = topicIndex + 1; // Title Vertical Align Class / Has Description.

  let titleVerticalAlignClass = 'align-self-center';

  if (iconListTopic.icons_list_topic_text) {
    titleVerticalAlignClass = '';
  }

  iconListTopic.title_vertical_align_class = titleVerticalAlignClass;
  return iconListTopic;
}

/***/ }),

/***/ "../blocks/fpbk/icons-list/templates/topic.partial.mustache":
/*!******************************************************************!*\
  !*** ../blocks/fpbk/icons-list/templates/topic.partial.mustache ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"icons-list__topic d-flex {{ columns_class }} justify-content-md-start flex-md-row mb-{{ block_settings_topic_bottom_margin }}\">\n\t{{# block_settings_numbered_topics }}\n\t\t<span class=\"icons-list__topic-number {{ topic_icon_class }} mx-md-0 mb-2 mr-md-4 position-absolute position-md-relative d-flex align-items-center justify-content-center text-white p-2\">\n\t\t\t<p class=\"mx-auto mb-1 m-md-0\">{{ index }}</p>\n\t\t</span>\n\t{{/ block_settings_numbered_topics }}\n\n\t{{# show_icons }}\n\t\t{{# icons_list_topic_icon }}\n\t\t\t{{{ icons_list_topic_icon }}}\n\t\t{{/ icons_list_topic_icon }}\n\t{{/ show_icons }}\n\n\t<div class=\"icons-list__topic-info d-flex flex-wrap w-100\">\n\t\t{{# icons_list_topic_title }}\n\t\t\t<h3 class=\"icons-list__topic-title mb-2 {{ numbered_topic_info_class }} {{ mobile_align_class }} text-md-left w-100 {{ title_vertical_align_class }}\">\n\t\t\t\t{{ icons_list_topic_title }}\n\t\t\t</h3>\n\t\t{{/ icons_list_topic_title }}\n\t\t<!-- /.icons-list__topic-title -->\n\n\t\t{{# icons_list_topic_text }}\n\t\t\t<div class=\"icons-list__topic-text {{ mobile_align_class }} ml-md-0 text-md-left {{ numbered_topic_info_class }}\">\n                {{{ icons_list_topic_text }}}\n\t\t\t</div>\n\t\t{{/ icons_list_topic_text }}\n\t</div>\n\t<!-- /.icons-list__topic-info -->\n\n\t{{{ admin_controls }}}\n\n</div>\n<!-- /.icons-list__topic -->\n\n", data, partials);
}
module.exports.templateString = "<div class=\"icons-list__topic d-flex {{ columns_class }} justify-content-md-start flex-md-row mb-{{ block_settings_topic_bottom_margin }}\">\n\t{{# block_settings_numbered_topics }}\n\t\t<span class=\"icons-list__topic-number {{ topic_icon_class }} mx-md-0 mb-2 mr-md-4 position-absolute position-md-relative d-flex align-items-center justify-content-center text-white p-2\">\n\t\t\t<p class=\"mx-auto mb-1 m-md-0\">{{ index }}</p>\n\t\t</span>\n\t{{/ block_settings_numbered_topics }}\n\n\t{{# show_icons }}\n\t\t{{# icons_list_topic_icon }}\n\t\t\t{{{ icons_list_topic_icon }}}\n\t\t{{/ icons_list_topic_icon }}\n\t{{/ show_icons }}\n\n\t<div class=\"icons-list__topic-info d-flex flex-wrap w-100\">\n\t\t{{# icons_list_topic_title }}\n\t\t\t<h3 class=\"icons-list__topic-title mb-2 {{ numbered_topic_info_class }} {{ mobile_align_class }} text-md-left w-100 {{ title_vertical_align_class }}\">\n\t\t\t\t{{ icons_list_topic_title }}\n\t\t\t</h3>\n\t\t{{/ icons_list_topic_title }}\n\t\t<!-- /.icons-list__topic-title -->\n\n\t\t{{# icons_list_topic_text }}\n\t\t\t<div class=\"icons-list__topic-text {{ mobile_align_class }} ml-md-0 text-md-left {{ numbered_topic_info_class }}\">\n                {{{ icons_list_topic_text }}}\n\t\t\t</div>\n\t\t{{/ icons_list_topic_text }}\n\t</div>\n\t<!-- /.icons-list__topic-info -->\n\n\t{{{ admin_controls }}}\n\n</div>\n<!-- /.icons-list__topic -->\n\n";


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

/***/ 143:
/*!****************************************************!*\
  !*** multi ../blocks/fpbk/icons-list/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/icons-list/src/index.js */"../blocks/fpbk/icons-list/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-icons-list-index.js.map