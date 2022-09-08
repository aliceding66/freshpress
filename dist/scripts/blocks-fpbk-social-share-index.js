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
/******/ 		"blocks-fpbk-social-share-index": 0
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
/******/ 	deferredModules.push([183,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/social-share/block.json":
/*!**********************************************!*\
  !*** ../blocks/fpbk/social-share/block.json ***!
  \**********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/social-share\",\"title\":\"Social Share\",\"category\":\"freshblocks\",\"description\":\"A block containing social share buttons.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true}}");

/***/ }),

/***/ "../blocks/fpbk/social-share/src/_edit.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/social-share/src/_edit.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_utils */ "../blocks/fpbk/social-share/src/_utils.js");
/* harmony import */ var _components_SharePlatformGroups__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_SharePlatformGroups */ "../blocks/fpbk/social-share/src/components/_SharePlatformGroups.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/social-share/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/social-share/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/social-share/block.json", 1);










/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "social-share ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getCommonBlockSettingsClass"])(attributes))
  });
  const shareIconsOrderDefinition = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(select => {
    var _select$getBlockType, _select$getBlockType$;

    return (_select$getBlockType = select('core/blocks').getBlockType(_block_json__WEBPACK_IMPORTED_MODULE_9__["name"])) === null || _select$getBlockType === void 0 ? void 0 : (_select$getBlockType$ = _select$getBlockType.attributes) === null || _select$getBlockType$ === void 0 ? void 0 : _select$getBlockType$.share_icons_order;
  }, []);
  const templateData = { ...attributes
  };
  templateData.social_info = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["generateSocialInfo"])(attributes, shareIconsOrderDefinition);
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_9__["name"],
      clientId,
      setAttributes,
      shareIconsOrderDefinition
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "share_text_colour"
  }), /*#__PURE__*/React.createElement(_components_SharePlatformGroups__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: Object(_utils__WEBPACK_IMPORTED_MODULE_6__["getAlignClass"])(attributes === null || attributes === void 0 ? void 0 : attributes.align)
  }, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    attributes: templateData,
    components: {
      share_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "share_text"
      })
    }
  }))));
});

/***/ }),

/***/ "../blocks/fpbk/social-share/src/_utils.js":
/*!*************************************************!*\
  !*** ../blocks/fpbk/social-share/src/_utils.js ***!
  \*************************************************/
/*! exports provided: getAlignClass, generateSocialInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlignClass", function() { return getAlignClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSocialInfo", function() { return generateSocialInfo; });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const getAlignClass = (align = '') => {
  if (align === 'right') {
    return 'text-right ml-md-auto mr-md-0';
  } else if (align === 'left') {
    return 'text-left mr-md-auto ml-md-0';
  }

  return 'text-center mr-md-auto ml-md-0';
};
const generateSocialInfo = (attributes, shareIconsOrderDefinition) => {
  return attributes.share_icons_order.map(shareIconOrder => {
    let sharingTitle = attributes["share_on_".concat(shareIconOrder, "_group_sharing_title")];

    if (!sharingTitle) {
      // translators: 'Share on ___' where ___ is the social media service (eg, Facebook or LinkedIn).
      sharingTitle = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["sprintf"])('Share on %s', [shareIconsOrderDefinition.choices[shareIconOrder]]);
    }

    return {
      share_url: '#',
      share_icon: socialShareTemplateData.icons[shareIconOrder],
      // eslint-disable-line no-undef
      sharing_title: sharingTitle
    };
  });
};

/***/ }),

/***/ "../blocks/fpbk/social-share/src/components/_SharePlatformGroups.js":
/*!**************************************************************************!*\
  !*** ../blocks/fpbk/social-share/src/components/_SharePlatformGroups.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _state_share_icons_order_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/share_icons_order/_actions */ "../blocks/fpbk/social-share/src/state/share_icons_order/_actions.js");
/* harmony import */ var _state_share_icons_order_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../state/share_icons_order/_reducer */ "../blocks/fpbk/social-share/src/state/share_icons_order/_reducer.js");








const excludeSharePlatforms = ['youtube', 'instagram'];
/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    attributes,
    setAttributes,
    shareIconsOrderDefinition
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getEditorControlsContext"])();
  const [shareIconsOrder, dispatchShareIconOrder] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(_state_share_icons_order_reducer__WEBPACK_IMPORTED_MODULE_7__["default"], attributes.share_icons_order);
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    setAttributes({
      share_icons_order: shareIconsOrder
    });
  }, [shareIconsOrder]);
  return Object.keys(shareIconsOrderDefinition.choices).map(sharePlatform => {
    if (!excludeSharePlatforms.includes(sharePlatform)) {
      const sharePlatformEnabled = Array.isArray(shareIconsOrder) && shareIconsOrder.includes(sharePlatform);
      return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], null, /*#__PURE__*/React.createElement("div", {
        className: "position-relative"
      }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TrueFalse, {
        label: "".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Enable', 'freshpress-website'), " ").concat(shareIconsOrderDefinition.choices[sharePlatform]),
        value: sharePlatformEnabled,
        onChange: enabled => {
          if (enabled) {
            dispatchShareIconOrder({
              type: _state_share_icons_order_actions__WEBPACK_IMPORTED_MODULE_6__["ENABLE_SHARE_ICON"],
              value: sharePlatform
            });
          } else if (!enabled) {
            dispatchShareIconOrder({
              type: _state_share_icons_order_actions__WEBPACK_IMPORTED_MODULE_6__["DISABLE_SHARE_ICON"],
              value: sharePlatform
            });
          }
        }
      })), sharePlatformEnabled === true && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Range, {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Order', 'freshpress-website'),
        value: shareIconsOrder.indexOf(sharePlatform) + 1,
        onChange: newIndex => {
          dispatchShareIconOrder({
            type: _state_share_icons_order_actions__WEBPACK_IMPORTED_MODULE_6__["SET_SHARE_ICON_ORDER"],
            index: newIndex,
            value: sharePlatform
          });
        },
        min: 1,
        max: shareIconsOrder.length
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.Group, {
        key: "share_icon_group_".concat(sharePlatform),
        name: "share_on_".concat(sharePlatform, "_group")
      })));
    }

    return null;
  });
});

/***/ }),

/***/ "../blocks/fpbk/social-share/src/editor.scss":
/*!***************************************************!*\
  !*** ../blocks/fpbk/social-share/src/editor.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/social-share/src/index.js":
/*!************************************************!*\
  !*** ../blocks/fpbk/social-share/src/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/social-share/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/social-share/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/social-share/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/social-share/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
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

/***/ "../blocks/fpbk/social-share/src/state/share_icons_order/_actions.js":
/*!***************************************************************************!*\
  !*** ../blocks/fpbk/social-share/src/state/share_icons_order/_actions.js ***!
  \***************************************************************************/
/*! exports provided: ENABLE_SHARE_ICON, DISABLE_SHARE_ICON, SET_SHARE_ICON_ORDER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENABLE_SHARE_ICON", function() { return ENABLE_SHARE_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISABLE_SHARE_ICON", function() { return DISABLE_SHARE_ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SHARE_ICON_ORDER", function() { return SET_SHARE_ICON_ORDER; });
const ENABLE_SHARE_ICON = 'esi';
const DISABLE_SHARE_ICON = 'dsi';
const SET_SHARE_ICON_ORDER = 'shio';

/***/ }),

/***/ "../blocks/fpbk/social-share/src/state/share_icons_order/_reducer.js":
/*!***************************************************************************!*\
  !*** ../blocks/fpbk/social-share/src/state/share_icons_order/_reducer.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/social-share/src/state/share_icons_order/_actions.js");


/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_1__["ENABLE_SHARE_ICON"]:
      const stateWithEnabled = [...state];
      stateWithEnabled.push(action.value);
      return stateWithEnabled;

    case _actions__WEBPACK_IMPORTED_MODULE_1__["DISABLE_SHARE_ICON"]:
      return state.filter(item => item !== action.value);

    case _actions__WEBPACK_IMPORTED_MODULE_1__["SET_SHARE_ICON_ORDER"]:
      const newIndex = action.index - 1;
      const stateWithOrderChanged = [...state].filter(item => item !== action.value);
      stateWithOrderChanged.splice(newIndex, 0, action.value);
      return stateWithOrderChanged;

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/social-share/templates/block.mustache":
/*!************************************************************!*\
  !*** ../blocks/fpbk/social-share/templates/block.mustache ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<p\n\tclass=\"social-share__text\"\n\t{{# share_text_colour.hex }}style=\"color: {{ share_text_colour.hex }}\"{{/ share_text_colour.hex }}\n>\n\t{{ share_text }}\n</p>\n<div class=\"social-share__buttons\">\n\t{{# social_info }}\n\t\t<a\n\t\t\tclass=\"social-share__button text-decoration-none\"\n\t\t\thref=\"{{ share_url }}\"\n\t\t\ttitle=\"{{ sharing_title }}\"\n\t\t\ttarget=\"_blank\"\n\t\t\trel=\"noopener\"\n\t\t>\n\t\t\t{{{ share_icon }}}\n\t\t</a>\n\t{{/ social_info }}\n</div>\n", data, partials);
}
module.exports.templateString = "<p\n\tclass=\"social-share__text\"\n\t{{# share_text_colour.hex }}style=\"color: {{ share_text_colour.hex }}\"{{/ share_text_colour.hex }}\n>\n\t{{ share_text }}\n</p>\n<div class=\"social-share__buttons\">\n\t{{# social_info }}\n\t\t<a\n\t\t\tclass=\"social-share__button text-decoration-none\"\n\t\t\thref=\"{{ share_url }}\"\n\t\t\ttitle=\"{{ sharing_title }}\"\n\t\t\ttarget=\"_blank\"\n\t\t\trel=\"noopener\"\n\t\t>\n\t\t\t{{{ share_icon }}}\n\t\t</a>\n\t{{/ social_info }}\n</div>\n";


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

/***/ 183:
/*!******************************************************!*\
  !*** multi ../blocks/fpbk/social-share/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/social-share/src/index.js */"../blocks/fpbk/social-share/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-social-share-index.js.map