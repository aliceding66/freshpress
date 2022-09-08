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
/******/ 		"blocks-fpbk-logo-group-index": 0
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
/******/ 	deferredModules.push([149,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/logo-group/block.json":
/*!********************************************!*\
  !*** ../blocks/fpbk/logo-group/block.json ***!
  \********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/logo-group\",\"title\":\"Logo Group\",\"category\":\"freshblocks\",\"description\":\"A reconfigurable or wrappable row of logos with optional title.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true},\"styles\":[{\"name\":\"logo-group_single-line\",\"label\":\"Single Line\",\"isDefault\":true},{\"name\":\"logo-group_multiline\",\"label\":\"Multiline\"},{\"name\":\"logo-group_above-the-fold\",\"label\":\"Above the Fold\"}]}");

/***/ }),

/***/ "../blocks/fpbk/logo-group/src/_edit.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/logo-group/src/_edit.js ***!
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_logo_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/logo.partial.mustache */ "../blocks/fpbk/logo-group/templates/logo.partial.mustache");
/* harmony import */ var _templates_logo_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_logo_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _state_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/_reducer */ "../blocks/fpbk/logo-group/src/state/_reducer.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/_actions */ "../blocks/fpbk/logo-group/src/state/_actions.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/logo-group/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/logo-group/block.json", 1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }














/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const hideLines = attributes.logo_group_hide_lines ? 'hide-lines' : '';
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "logo-group position-relative pb-7 ".concat(hideLines, " ").concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getCommonBlockSettingsClass"])(attributes))
  });
  const logoTypeDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getBlockAttributeSubfieldDefinition"])(_block_json__WEBPACK_IMPORTED_MODULE_12__["name"], 'logos', 'logo_type');
  const adjustLogoSizeDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getBlockAttributeSubfieldDefinition"])(_block_json__WEBPACK_IMPORTED_MODULE_12__["name"], 'logos', 'adjust_logo_size');
  const imageTypesMap = {
    svg: ['image/svg+xml'],
    raster: ['image/jpg', 'image/png', 'image/gif']
  };
  const rangeCommonConfig = {
    min: 0,
    max: 100,
    step: 5
  };
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_7__["BlockStateManager"](attributes, setAttributes);
  const [logoState, logoDispatch] = blockStateManager.addReducerManager(_state_reducer__WEBPACK_IMPORTED_MODULE_10__["default"], 'logos');

  const formatLogos = (logo, index) => {
    var _logo$decrease_logo_s, _logo$increase_logo_s;

    let logoResizeClass = '';
    const adjustLogoSize = logo === null || logo === void 0 ? void 0 : logo.adjust_logo_size;
    const decreaseLogoSize = parseInt(logo === null || logo === void 0 ? void 0 : logo.decrease_logo_size);
    const increaseLogoSize = parseInt(logo === null || logo === void 0 ? void 0 : logo.increase_logo_size);

    if ('0' !== adjustLogoSize) {
      const logoResizeDirection = '+1' === adjustLogoSize ? 'increase' : 'decrease';
      const logoResizeAmount = '+1' === adjustLogoSize ? increaseLogoSize : decreaseLogoSize;
      logoResizeClass = "logo-group__logo_".concat(logoResizeDirection, "_").concat(logoResizeAmount);
    }

    return {
      logo: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Image, {
        inline: true,
        className: "logo-group__logo w-100 ".concat(logoResizeClass),
        value: logo.logo_type === 'svg' ? logo.logo_svg : logo.logo_image,
        allowedTypes: imageTypesMap[logo.logo_type],
        onChange: value => {
          logoDispatch({
            type: logo.logo_type === 'svg' ? _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_LOGO_SVG"] : _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_LOGO_IMAGE"],
            index,
            value
          });
        }
      }),
      admin_logo_edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
        choices: logoTypeDefinition === null || logoTypeDefinition === void 0 ? void 0 : logoTypeDefinition.choices,
        value: logo.logo_type,
        onChange: value => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_LOGO_TYPE"],
            index,
            value
          });
        }
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
        choices: adjustLogoSizeDefinition === null || adjustLogoSizeDefinition === void 0 ? void 0 : adjustLogoSizeDefinition.choices,
        value: logo.adjust_logo_size,
        onChange: value => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_ADJUST_LOGO_SIZE"],
            index,
            value
          });
        }
      }), (logo === null || logo === void 0 ? void 0 : logo.adjust_logo_size) === '-1' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Range, _extends({}, rangeCommonConfig, {
        value: (_logo$decrease_logo_s = logo === null || logo === void 0 ? void 0 : logo.decrease_logo_size) !== null && _logo$decrease_logo_s !== void 0 ? _logo$decrease_logo_s : 0,
        onChange: value => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_DECREASE_LOGO_SIZE"],
            index,
            value
          });
        }
      })), (logo === null || logo === void 0 ? void 0 : logo.adjust_logo_size) === '+1' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Range, _extends({}, rangeCommonConfig, {
        value: (_logo$increase_logo_s = logo === null || logo === void 0 ? void 0 : logo.increase_logo_size) !== null && _logo$increase_logo_s !== void 0 ? _logo$increase_logo_s : 0,
        onChange: value => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_INCREASE_LOGO_SIZE"],
            index,
            value
          });
        }
      }))),
      admin_controls: /*#__PURE__*/React.createElement("div", {
        className: "block-editor__block-controls text-center"
      }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        isSmall: true,
        onClick: () => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_LOGO_LEFT"],
            index
          });
        },
        icon: "arrow-left-alt2"
      }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        isDestructive: true,
        isSmall: true,
        onClick: () => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["REMOVE_LOGO"],
            index
          });
        },
        icon: "no-alt"
      }), index < logoState.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        isSmall: true,
        onClick: () => {
          logoDispatch({
            type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["MOVE_LOGO_RIGHT"],
            index
          });
        },
        icon: "arrow-right-alt2"
      }))
    };
  };

  const logoPartials = logoState.map((logo, index) => {
    return /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_8__["default"], {
      attributes: logo,
      template: _templates_logo_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a,
      key: logo.key,
      components: formatLogos(logo, index)
    });
  });

  const isStyleType = type => {
    return blockProps.className.includes("is-style-logo-group_".concat(type));
  };

  const isLogoLimitReached = logoState.length >= 8 && (isStyleType('single-line') || isStyleType('above-the-fold'));
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    if (isLogoLimitReached) {
      logoDispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["SLICE_TO_LIMIT"]
      });
    }
  }, [attributes.className]);
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_12__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, isStyleType('single-line') && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    name: "logo_group_hide_lines"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: "logo-group__logos"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "logo_group__headline"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
    name: "headline",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert headline', 'freshpress-website')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "logo-group__logo d-flex justify-content-around ".concat(isStyleType('multiline') ? 'flex-wrap h-auto' : '')
  }, logoPartials), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    isSecondary: true,
    disabled: isLogoLimitReached,
    className: "d-block mx-auto position-absolute",
    style: {
      bottom: 0,
      left: '50%',
      transform: 'translateX( -50% )'
    },
    onClick: () => {
      logoDispatch({
        type: _state_actions__WEBPACK_IMPORTED_MODULE_11__["ADD_LOGO"]
      });
    },
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add Logo', 'freshpress-website'),
    icon: "plus"
  })));
});

/***/ }),

/***/ "../blocks/fpbk/logo-group/src/index.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/logo-group/src/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/logo-group/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/logo-group/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/logo-group/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/logo-group/src/style.scss");
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

/***/ "../blocks/fpbk/logo-group/src/state/_actions.js":
/*!*******************************************************!*\
  !*** ../blocks/fpbk/logo-group/src/state/_actions.js ***!
  \*******************************************************/
/*! exports provided: REMOVE_LOGO, ADD_LOGO, EDIT_LOGO_IMAGE, EDIT_LOGO_SVG, EDIT_LOGO_TYPE, EDIT_ADJUST_LOGO_SIZE, EDIT_DECREASE_LOGO_SIZE, EDIT_INCREASE_LOGO_SIZE, MOVE_LOGO_LEFT, MOVE_LOGO_RIGHT, SLICE_TO_LIMIT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_LOGO", function() { return REMOVE_LOGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_LOGO", function() { return ADD_LOGO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_LOGO_IMAGE", function() { return EDIT_LOGO_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_LOGO_SVG", function() { return EDIT_LOGO_SVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_LOGO_TYPE", function() { return EDIT_LOGO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_ADJUST_LOGO_SIZE", function() { return EDIT_ADJUST_LOGO_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_DECREASE_LOGO_SIZE", function() { return EDIT_DECREASE_LOGO_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_INCREASE_LOGO_SIZE", function() { return EDIT_INCREASE_LOGO_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_LOGO_LEFT", function() { return MOVE_LOGO_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_LOGO_RIGHT", function() { return MOVE_LOGO_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SLICE_TO_LIMIT", function() { return SLICE_TO_LIMIT; });
const REMOVE_LOGO = 'rl';
const ADD_LOGO = 'al';
const EDIT_LOGO_IMAGE = 'eli';
const EDIT_LOGO_SVG = 'els';
const EDIT_LOGO_TYPE = 'elt';
const EDIT_ADJUST_LOGO_SIZE = 'eals';
const EDIT_DECREASE_LOGO_SIZE = 'edls';
const EDIT_INCREASE_LOGO_SIZE = 'eils';
const MOVE_LOGO_LEFT = 'mll';
const MOVE_LOGO_RIGHT = 'mlr';
const SLICE_TO_LIMIT = 'stl';

/***/ }),

/***/ "../blocks/fpbk/logo-group/src/state/_reducer.js":
/*!*******************************************************!*\
  !*** ../blocks/fpbk/logo-group/src/state/_reducer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/logo-group/src/state/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");




/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_LOGO"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_LOGO"]:
      return [...state, {
        logo_type: 'svg',
        logo_image: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__["emptyImageObject"],
        logo_svg: scripts_components_EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_3__["emptyImageObject"],
        adjust_logo_size: 0,
        decrease_logo_size: 0,
        increase_logo_size: 0,
        key: "logo_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_LOGO_IMAGE"]:
      return editAtIndex('logo_image');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_LOGO_SVG"]:
      return editAtIndex('logo_svg');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_LOGO_TYPE"]:
      return editAtIndex('logo_type');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_ADJUST_LOGO_SIZE"]:
      return editAtIndex('adjust_logo_size');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_DECREASE_LOGO_SIZE"]:
      return editAtIndex('decrease_logo_size');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_INCREASE_LOGO_SIZE"]:
      return editAtIndex('increase_logo_size');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_LOGO_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_LOGO_RIGHT"]:
      const movedRightState = [...state];
      const nextItem = movedRightState[action.index + 1];
      movedRightState[action.index + 1] = movedRightState[action.index];
      movedRightState[action.index] = nextItem;
      return movedRightState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["SLICE_TO_LIMIT"]:
      return state.slice(0, 8);

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/logo-group/src/style.scss":
/*!************************************************!*\
  !*** ../blocks/fpbk/logo-group/src/style.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/logo-group/templates/logo.partial.mustache":
/*!*****************************************************************!*\
  !*** ../blocks/fpbk/logo-group/templates/logo.partial.mustache ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"{{ logo_class }}\">\n\t{{{ logo }}}\n    {{# admin_logo_edit }}\n        <div>\n            {{{ admin_logo_edit }}}\n        </div>\n    {{/ admin_logo_edit }}\n\t{{{ admin_controls }}}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"{{ logo_class }}\">\n\t{{{ logo }}}\n    {{# admin_logo_edit }}\n        <div>\n            {{{ admin_logo_edit }}}\n        </div>\n    {{/ admin_logo_edit }}\n\t{{{ admin_controls }}}\n</div>\n";


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

/***/ 149:
/*!****************************************************!*\
  !*** multi ../blocks/fpbk/logo-group/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/logo-group/src/index.js */"../blocks/fpbk/logo-group/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-logo-group-index.js.map