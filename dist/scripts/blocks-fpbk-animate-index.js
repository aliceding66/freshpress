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
/******/ 		"blocks-fpbk-animate-index": 0
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
/******/ 	deferredModules.push([72,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/animate/block.json":
/*!*****************************************!*\
  !*** ../blocks/fpbk/animate/block.json ***!
  \*****************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/animate\",\"title\":\"Animate\",\"category\":\"freshblocks\",\"description\":\"FreshPress block.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true}}");

/***/ }),

/***/ "../blocks/fpbk/animate/src/_edit.js":
/*!*******************************************!*\
  !*** ../blocks/fpbk/animate/src/_edit.js ***!
  \*******************************************/
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
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _components_AnimationsRepeater__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_AnimationsRepeater */ "../blocks/fpbk/animate/src/components/_AnimationsRepeater.js");
/* harmony import */ var _components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_AnimationsPlaybackControl */ "../blocks/fpbk/animate/src/components/_AnimationsPlaybackControl.js");
/* harmony import */ var _state_animations_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/animations/_reducer */ "../blocks/fpbk/animate/src/state/animations/_reducer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_utils */ "../blocks/fpbk/animate/src/_utils.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/animate/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/animate/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/animate/block.json", 1);














/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "animate position-relative pb-4 ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes))
  });
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__["BlockStateManager"](attributes, setAttributes);
  const [animations, animationDispatch] = blockStateManager.addReducerManager(_state_animations_reducer__WEBPACK_IMPORTED_MODULE_9__["default"], 'animations');
  const [playbackState, setPlaybackState] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(_components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_8__["PLAYBACK_STATE_NO_ANIMATION"]);
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      animations,
      animationDispatch,
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_13__["name"],
      clientId,
      playbackState,
      setAttributes,
      setPlaybackState
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(_components_AnimationsRepeater__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_11__["default"], {
    attributes: Object(_utils__WEBPACK_IMPORTED_MODULE_10__["getTemplateData"])(attributes, playbackState),
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_12___default.a,
    components: {
      inner_blocks_content: /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"], null),
      admin_playback_control: /*#__PURE__*/React.createElement(_components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_8__["default"], null)
    }
  })));
});

/***/ }),

/***/ "../blocks/fpbk/animate/src/_utils.js":
/*!********************************************!*\
  !*** ../blocks/fpbk/animate/src/_utils.js ***!
  \********************************************/
/*! exports provided: getTemplateData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTemplateData", function() { return getTemplateData; });
/* harmony import */ var _components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/_AnimationsPlaybackControl */ "../blocks/fpbk/animate/src/components/_AnimationsPlaybackControl.js");

/**
 *
 * @param {Object} attributes
 * @param {number} playbackState
 * @return {Object} Formatted data to be used in Mustache template.
 */

const getTemplateData = (attributes, playbackState) => {
  const templateData = { ...attributes
  };

  if (Array.isArray(templateData.animations)) {
    templateData.multiple_animations = templateData.animations.length > 1;
    templateData.animations = templateData.animations.map(animation => {
      let animationClass = 'fp-animate';
      let animationName = animation.animation; // Use "_alt" zoom animations as they are easier to properly preview in Editor.

      if (animationName.includes('zoom')) {
        animationName += '_alt';
      }

      if (animation.trigger === 'hover') {
        animationClass += " fp-animate__".concat(animationName);
        animationClass += " fp-animate__".concat(animationName, "--on-hover");
      } else {
        if (playbackState <= _components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_0__["PLAYBACK_STATE_ANIMATION_LOAD"]) {
          animationClass += ' no-animations';
        }

        if (playbackState >= _components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_0__["PLAYBACK_STATE_ANIMATION_LOAD"]) {
          animationClass += " fp-animate__".concat(animationName);
        }

        if (playbackState === _components_AnimationsPlaybackControl__WEBPACK_IMPORTED_MODULE_0__["PLAYBACK_STATE_ANIMATION_START"]) {
          animationClass += " fp-animate__".concat(animationName, "--animate");
        }

        if (animation.delay > 0) {
          animationClass += " fp-animate--delay-".concat(animation.delay);
        }

        if (animation.offscreen_reset) {
          animationClass += ' fp-animate--offscreen-reset';
        }
      }

      animation.animation_class = animationClass;
      return animation;
    });
  }

  return templateData;
};

/***/ }),

/***/ "../blocks/fpbk/animate/src/components/_AnimationsPlaybackControl.js":
/*!***************************************************************************!*\
  !*** ../blocks/fpbk/animate/src/components/_AnimationsPlaybackControl.js ***!
  \***************************************************************************/
/*! exports provided: LONGEST_ANIMATION_DURATION, LONGEST_DELAY_DURATION, PLAYBACK_STATE_NO_ANIMATION, PLAYBACK_STATE_ANIMATION_LOAD, PLAYBACK_STATE_ANIMATION_PRE_START, PLAYBACK_STATE_ANIMATION_START, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LONGEST_ANIMATION_DURATION", function() { return LONGEST_ANIMATION_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LONGEST_DELAY_DURATION", function() { return LONGEST_DELAY_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYBACK_STATE_NO_ANIMATION", function() { return PLAYBACK_STATE_NO_ANIMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYBACK_STATE_ANIMATION_LOAD", function() { return PLAYBACK_STATE_ANIMATION_LOAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYBACK_STATE_ANIMATION_PRE_START", function() { return PLAYBACK_STATE_ANIMATION_PRE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYBACK_STATE_ANIMATION_START", function() { return PLAYBACK_STATE_ANIMATION_START; });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");




const LONGEST_ANIMATION_DURATION = 2000;
const LONGEST_DELAY_DURATION = 10000;
const PLAYBACK_STATE_NO_ANIMATION = 0;
const PLAYBACK_STATE_ANIMATION_LOAD = 1;
const PLAYBACK_STATE_ANIMATION_PRE_START = 2;
const PLAYBACK_STATE_ANIMATION_START = 3;
const timeouts = [null, null]; //Placeholder for 2 timeouts.

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    animations,
    playbackState,
    setPlaybackState
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])(); // 1. Sets animation start classes.

  const play = () => {
    clearTimeout(timeouts[0]);
    clearTimeout(timeouts[1]);
    setPlaybackState(PLAYBACK_STATE_ANIMATION_LOAD);
  }; // 2. Adds class that triggers actual animation.


  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (playbackState === PLAYBACK_STATE_ANIMATION_LOAD || playbackState === PLAYBACK_STATE_ANIMATION_PRE_START) {
      clearTimeout(timeouts[0]);
      timeouts[0] = setTimeout(() => {
        clearTimeout(timeouts[1]);
        setPlaybackState(playbackState + 1);
        timeouts[1] = setTimeout(() => {
          stop();
        }, LONGEST_ANIMATION_DURATION + LONGEST_DELAY_DURATION);
      }, 250);
    }
  }, [playbackState]); // 3. Resets animation state.

  const stop = () => {
    clearTimeout(timeouts[0]);
    clearTimeout(timeouts[1]);
    setPlaybackState(PLAYBACK_STATE_NO_ANIMATION);
  }; // Stop playback if animation has changed when still playing.


  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (playbackState !== PLAYBACK_STATE_NO_ANIMATION) {
      stop();
    }
  }, [animations]);
  return /*#__PURE__*/React.createElement("div", {
    className: "wp-block-fpbk-animate__playback-control position-absolute d-flex align-items-center"
  }, playbackState === PLAYBACK_STATE_NO_ANIMATION && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    variant: "link",
    icon: "controls-play",
    onClick: () => {
      play();
    },
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Animation preview for "Page load" ones.', 'freshpress-website'),
    showTooltip: true
  }), playbackState !== PLAYBACK_STATE_NO_ANIMATION && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    variant: "link",
    icon: "controls-pause",
    onClick: () => {
      stop();
    }
  }));
});

/***/ }),

/***/ "../blocks/fpbk/animate/src/components/_AnimationsRepeater.js":
/*!********************************************************************!*\
  !*** ../blocks/fpbk/animate/src/components/_AnimationsRepeater.js ***!
  \********************************************************************/
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
/* harmony import */ var _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/animations/_actions */ "../blocks/fpbk/animate/src/state/animations/_actions.js");





const animationsMap = [{
  label: 'Fade In',
  name: 'fade_in',
  mode: 'page_load',
  exclude_regex: /fade_/
}, {
  label: 'Fade Away',
  name: 'fade_away',
  mode: 'both',
  exclude_regex: /fade_/
}, {
  label: 'Slide in left',
  name: 'slide_in_left',
  mode: 'page_load',
  exclude_regex: /slide|swing_in_/
}, {
  label: 'Slide in right',
  name: 'slide_in_right',
  mode: 'page_load',
  exclude_regex: /slide|swing_in_/
}, {
  label: 'Swing in bottom',
  name: 'swing_in_bottom',
  mode: 'page_load',
  exclude_regex: /slide|swing_in_/
}, {
  label: 'Swing in top',
  name: 'swing_in_top',
  mode: 'page_load',
  exclude_regex: /slide|swing_in_/
}, {
  label: 'Zoom in',
  name: 'zoom_in',
  mode: 'both',
  exclude_regex: /zoom_/
}, {
  label: 'Zoom out',
  name: 'zoom_out',
  mode: 'both',
  exclude_regex: /zoom_/
}];

const getAvailableAnimations = (currentItemAnimation, selectedAnimationExcludeRegexes = []) => {
  const availableAnimations = {};
  animationsMap.filter(animation => {
    return animation.name === currentItemAnimation || selectedAnimationExcludeRegexes.filter(regex => animation.name.match(regex)).length === 0;
  }).forEach(animation => {
    availableAnimations[animation.name] = animation.label;
  });
  return availableAnimations;
};

const getAvailableTriggers = currentItemAnimation => {
  const allTriggers = {
    page_load: 'Page load',
    hover: 'Hover'
  };

  if (!currentItemAnimation || !currentItemAnimation.mode || currentItemAnimation.mode === 'both') {
    return allTriggers;
  }

  return {
    [currentItemAnimation.mode]: allTriggers[currentItemAnimation.mode]
  };
};

/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    animations,
    animationDispatch
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])();
  const selectedAnimations = animations.map(a => a.animation);
  const animationFields = animations.map((animation, index) => {
    const selectedAnimation = animationsMap.filter(a => a.name === animation.animation)[0];
    const selectedAnimationsExcludeRegexes = animationsMap.filter(a => selectedAnimations.includes(a.name) && (selectedAnimation === null || selectedAnimation === void 0 ? void 0 : selectedAnimation.exclude_regex) !== a.exclude_regex).map(a => a.exclude_regex);
    return /*#__PURE__*/React.createElement("div", {
      key: animation.key
    }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Select, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Animation', 'freshpress-website'),
      emptyChoice: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Select animation', 'freshpress-website'),
      choices: getAvailableAnimations(animation.animation, selectedAnimationsExcludeRegexes),
      value: animation.animation,
      onChange: value => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_ANIMATION_ANIMATION"],
          value,
          index
        });
        const newSelectedAnimation = animationsMap.filter(a => a.name === value)[0];

        if (newSelectedAnimation && newSelectedAnimation !== null && newSelectedAnimation !== void 0 && newSelectedAnimation.mode && (newSelectedAnimation === null || newSelectedAnimation === void 0 ? void 0 : newSelectedAnimation.mode) !== '' && (newSelectedAnimation === null || newSelectedAnimation === void 0 ? void 0 : newSelectedAnimation.mode) !== 'both') {
          animationDispatch({
            type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_ANIMATION_TRIGGER"],
            value: newSelectedAnimation.mode,
            index
          });
        }
      }
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Select, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Triggered on', 'freshpress-website'),
      choices: getAvailableTriggers(selectedAnimation),
      value: animation.trigger,
      onChange: value => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_ANIMATION_TRIGGER"],
          value,
          index
        });
      }
    }), animation.trigger === 'page_load' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Range, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Delay', 'freshpress-website'),
      instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Delay of animation is seconds.', 'freshpress-website'),
      min: 0,
      max: 10,
      value: animation.delay,
      onChange: value => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_ANIMATION_DELAY"],
          value,
          index
        });
      }
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].TrueFalse, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Offscreen reset', 'freshpress-website'),
      instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Whether animation state should be resetted when element get scrolled away screen.', 'freshpress-website'),
      value: animation.offscreen_reset,
      onChange: value => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_ANIMATION_OFFSCREEN_RESET"],
          value,
          index
        });
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "block-editor__block-controls"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
      isSmall: true,
      isDestructive: true,
      onClick: () => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["REMOVE_ANIMATION"],
          index
        });
      },
      icon: "no-alt"
    })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["CardDivider"], null));
  });
  return (
    /*#__PURE__*/
    // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
    React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["BaseControl"], {
      label: /*#__PURE__*/React.createElement("strong", {
        style: {
          lineHeight: '2rem'
        }
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Animations', 'freshpress-website'))
    }, /*#__PURE__*/React.createElement("div", null, animationFields, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
      isPrimary: true,
      onClick: () => {
        animationDispatch({
          type: _state_animations_actions__WEBPACK_IMPORTED_MODULE_4__["ADD_ANIMATION"]
        });
      },
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add Animation', 'freshpress-website')
    })))
  );
});

/***/ }),

/***/ "../blocks/fpbk/animate/src/editor.scss":
/*!**********************************************!*\
  !*** ../blocks/fpbk/animate/src/editor.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/animate/src/index.js":
/*!*******************************************!*\
  !*** ../blocks/fpbk/animate/src/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/animate/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/animate/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/animate/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/animate/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_4__);
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

/***/ "../blocks/fpbk/animate/src/state/animations/_actions.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/animate/src/state/animations/_actions.js ***!
  \***************************************************************/
/*! exports provided: ADD_ANIMATION, REMOVE_ANIMATION, EDIT_ANIMATION_ANIMATION, EDIT_ANIMATION_TRIGGER, EDIT_ANIMATION_DELAY, EDIT_ANIMATION_OFFSCREEN_RESET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ANIMATION", function() { return ADD_ANIMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ANIMATION", function() { return REMOVE_ANIMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ANIMATION_ANIMATION", function() { return EDIT_ANIMATION_ANIMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ANIMATION_TRIGGER", function() { return EDIT_ANIMATION_TRIGGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ANIMATION_DELAY", function() { return EDIT_ANIMATION_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ANIMATION_OFFSCREEN_RESET", function() { return EDIT_ANIMATION_OFFSCREEN_RESET; });
const ADD_ANIMATION = 'aa';
const REMOVE_ANIMATION = 'ra';
const EDIT_ANIMATION_ANIMATION = 'eaa';
const EDIT_ANIMATION_TRIGGER = 'eat';
const EDIT_ANIMATION_DELAY = 'ead';
const EDIT_ANIMATION_OFFSCREEN_RESET = 'eaor';

/***/ }),

/***/ "../blocks/fpbk/animate/src/state/animations/_reducer.js":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/animate/src/state/animations/_reducer.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/animate/src/state/animations/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_ANIMATION"]:
      return [...state, {
        animation: '',
        trigger: 'page_load',
        delay: 0,
        offscreen_reset: false,
        key: "animation_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_ANIMATION"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ANIMATION_ANIMATION"]:
      return editAtIndex('animation');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ANIMATION_TRIGGER"]:
      return editAtIndex('trigger');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ANIMATION_DELAY"]:
      return editAtIndex('delay');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ANIMATION_OFFSCREEN_RESET"]:
      return editAtIndex('offscreen_reset');

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/animate/templates/block.mustache":
/*!*******************************************************!*\
  !*** ../blocks/fpbk/animate/templates/block.mustache ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("{{# animations }}\n    <div class=\"{{ animation_class }}\">\n{{/ animations }}\n    {{{ inner_blocks_content }}}\n{{# animations }}\n    </div>\n{{/ animations }}\n\n{{{ admin_playback_control }}}\n", data, partials);
}
module.exports.templateString = "{{# animations }}\n    <div class=\"{{ animation_class }}\">\n{{/ animations }}\n    {{{ inner_blocks_content }}}\n{{# animations }}\n    </div>\n{{/ animations }}\n\n{{{ admin_playback_control }}}\n";


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

/***/ 72:
/*!*************************************************!*\
  !*** multi ../blocks/fpbk/animate/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/animate/src/index.js */"../blocks/fpbk/animate/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-animate-index.js.map