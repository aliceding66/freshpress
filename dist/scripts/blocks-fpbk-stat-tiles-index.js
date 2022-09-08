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
/******/ 		"blocks-fpbk-stat-tiles-index": 0
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
/******/ 	deferredModules.push([184,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/stat-tiles/block.json":
/*!********************************************!*\
  !*** ../blocks/fpbk/stat-tiles/block.json ***!
  \********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/stat-tiles\",\"title\":\"Stat Tiles\",\"category\":\"freshblocks\",\"description\":\"A block containing FreshBooks statistics and support card with contact info.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/src/_edit.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/stat-tiles/src/_edit.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _components_StatAbout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/_StatAbout */ "../blocks/fpbk/stat-tiles/src/components/_StatAbout.js");
/* harmony import */ var _components_StatTiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/_StatTiles */ "../blocks/fpbk/stat-tiles/src/components/_StatTiles.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/stat-tiles/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/stat-tiles/block.json", 1);







/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "stat-tiles ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_2__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_3__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_6__["name"])
    });
  }

  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_3__["BlockStateManager"](attributes, setAttributes);
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_6__["name"],
      blockStateManager,
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_components_StatTiles__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/React.createElement(_components_StatAbout__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
});

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/src/components/_StatAbout.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/src/components/_StatAbout.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../state/contact_links/_actions */ "../blocks/fpbk/stat-tiles/state/contact_links/_actions.js");
/* harmony import */ var _state_contact_links_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../state/contact_links/_reducer */ "../blocks/fpbk/stat-tiles/state/contact_links/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../block.json */ "../blocks/fpbk/stat-tiles/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../block.json */ "../blocks/fpbk/stat-tiles/block.json", 1);









/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    attributes,
    blockStateManager
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getEditorControlsContext"])();
  const [contactLinks, contactLinkDispatch] = blockStateManager.addReducerManager(_state_contact_links_reducer__WEBPACK_IMPORTED_MODULE_7__["default"], 'about_team_contact_links');
  /**
   * TODO refactor after merging Logo Group block
   * const typeDefinition = getBlockAttributeSubfieldDefinition( blockName, 'about_team_contact_links', 'type' );
   */

  const columnsDefinitions = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["useSelect"])(select => {
    var _select$getBlockType, _select$getBlockType$;

    return (_select$getBlockType = select('core/blocks').getBlockType(_block_json__WEBPACK_IMPORTED_MODULE_8__["name"])) === null || _select$getBlockType === void 0 ? void 0 : (_select$getBlockType$ = _select$getBlockType.attributes) === null || _select$getBlockType$ === void 0 ? void 0 : _select$getBlockType$.about_team_contact_links;
  }, []);

  const getColumnFieldDefinition = fieldName => {
    return columnsDefinitions.sub_fields.filter(field => field.name === fieldName)[0];
  };

  const contactLinkElements = contactLinks.map((contactLink, index) => {
    const {
      key,
      type,
      value,
      label
    } = contactLinks[index];
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "d-flex mt-3 align-items-center justify-content-between"
    }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Select, {
      value: type,
      choices: getColumnFieldDefinition('type').choices // choices={ typeDefinition?.choices } // TODO refactor after merging Logo Group block.
      ,
      style: {
        flex: '0 0 33.3%'
      },
      onChange: valueChange => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["EDIT_CONTACT_LINK_TYPE"],
          index,
          value: valueChange
        });
      }
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
      isSimple: true,
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert value', 'freshpress-website'),
      value: value,
      style: {
        flex: '0 0 33.3%'
      },
      onChange: valueChange => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["EDIT_CONTACT_LINK_VALUE"],
          index,
          value: valueChange
        });
      }
    }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
      isSimple: true,
      placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert label', 'freshpress-website'),
      value: label,
      style: {
        flex: '0 0 33.3%'
      },
      onChange: valueChange => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["EDIT_CONTACT_LINK_LABEL"],
          index,
          value: valueChange
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "block-editor__block-controls d-flex flex-column"
    }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      onClick: () => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["MOVE_CONTACT_LINK_UP"],
          index
        });
      },
      icon: "arrow-up-alt2"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSecondary: true,
      className: "is-destructive",
      onClick: () => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["REMOVE_CONTACT_LINK"],
          index
        });
      },
      icon: "no-alt"
    }), index < contactLinks.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      onClick: () => {
        contactLinkDispatch({
          type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["MOVE_CONTACT_LINK_DOWN"],
          index
        });
      },
      icon: "arrow-down-alt2"
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "stat-tiles__about d-flex flex-column-reverse px-4 px-lg-5 pt-md-4 mx-md-1 mx-lg-auto flex-md-row align-items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-tiles__about-content d-flex flex-column px-2 pr-md-2 pl-md-4 pl-lg-5 mt-md-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "stat-tiles__about-heading mb-4"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert heading', 'freshpress-website'),
    name: "about_team_heading"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-tiles__about-body"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert body', 'freshpress-website'),
    name: "about_team_body"
  })), contactLinkElements, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    isSecondary: true,
    className: "mt-4",
    onClick: () => {
      contactLinkDispatch({
        type: _state_contact_links_actions__WEBPACK_IMPORTED_MODULE_6__["ADD_CONTACT_LINK"]
      });
    },
    text: 'Add contact link',
    icon: "plus"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image, {
    inline: true,
    value: attributes.about_team_image,
    name: "about_team_image"
  }));
});

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/src/components/_StatTiles.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/src/components/_StatTiles.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_stat_partial_mustache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../templates/stat.partial.mustache */ "../blocks/fpbk/stat-tiles/templates/stat.partial.mustache");
/* harmony import */ var _templates_stat_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_templates_stat_partial_mustache__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _state_stats_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../state/stats/_reducer */ "../blocks/fpbk/stat-tiles/state/stats/_reducer.js");
/* harmony import */ var _state_stats_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../state/stats/_actions */ "../blocks/fpbk/stat-tiles/state/stats/_actions.js");








/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    blockStateManager
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])();
  const [stats, statDispatch] = blockStateManager.addReducerManager(_state_stats_reducer__WEBPACK_IMPORTED_MODULE_6__["default"], 'stats');
  const partialTemplates = stats.map((stat, index) => /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: stat,
    template: _templates_stat_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default.a,
    key: stat.key,
    components: {
      number: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        value: stat.number,
        onChange: value => {
          statDispatch({
            type: _state_stats_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_STAT_NUMBER"],
            index,
            value
          });
        },
        placeholder: "000"
      }),
      description: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        value: stat.description,
        onChange: value => {
          statDispatch({
            type: _state_stats_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_STAT_DESCRIPTION"],
            index,
            value
          });
        },
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert description', 'freshpress-website')
      })
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "stat-tiles__bg-row px-md-3 px-xl-5 text-center"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "stat-tiles__heading px-3 mt-lg-3"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert Heading', 'freshpress-website'),
    name: "heading"
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-tiles__stats d-md-flex px-md-3 px-lg-4"
  }, partialTemplates));
});

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/src/index.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/stat-tiles/src/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/stat-tiles/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/stat-tiles/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/stat-tiles/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/stat-tiles/src/style.scss");
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

/***/ "../blocks/fpbk/stat-tiles/src/style.scss":
/*!************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/src/style.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/state/contact_links/_actions.js":
/*!*****************************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/state/contact_links/_actions.js ***!
  \*****************************************************************/
/*! exports provided: ADD_CONTACT_LINK, REMOVE_CONTACT_LINK, EDIT_CONTACT_LINK_TYPE, EDIT_CONTACT_LINK_LABEL, EDIT_CONTACT_LINK_VALUE, MOVE_CONTACT_LINK_UP, MOVE_CONTACT_LINK_DOWN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CONTACT_LINK", function() { return ADD_CONTACT_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_CONTACT_LINK", function() { return REMOVE_CONTACT_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CONTACT_LINK_TYPE", function() { return EDIT_CONTACT_LINK_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CONTACT_LINK_LABEL", function() { return EDIT_CONTACT_LINK_LABEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CONTACT_LINK_VALUE", function() { return EDIT_CONTACT_LINK_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_CONTACT_LINK_UP", function() { return MOVE_CONTACT_LINK_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_CONTACT_LINK_DOWN", function() { return MOVE_CONTACT_LINK_DOWN; });
const ADD_CONTACT_LINK = 'acl';
const REMOVE_CONTACT_LINK = 'rcl';
const EDIT_CONTACT_LINK_TYPE = 'eclt';
const EDIT_CONTACT_LINK_LABEL = 'ecll';
const EDIT_CONTACT_LINK_VALUE = 'eclv';
const MOVE_CONTACT_LINK_UP = 'mclu';
const MOVE_CONTACT_LINK_DOWN = 'mcld';

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/state/contact_links/_reducer.js":
/*!*****************************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/state/contact_links/_reducer.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/stat-tiles/state/contact_links/_actions.js");



/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_CONTACT_LINK"]:
      return [...state, {
        type: 'mailto',
        label: '',
        value: '',
        key: "contact_link_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_CONTACT_LINK"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_CONTACT_LINK_TYPE"]:
      return editAtIndex('type');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_CONTACT_LINK_LABEL"]:
      return editAtIndex('label');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_CONTACT_LINK_VALUE"]:
      return editAtIndex('value');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_CONTACT_LINK_UP"]:
      const movedUpState = [...state];
      const leftItem = movedUpState[action.index - 1];
      movedUpState[action.index - 1] = movedUpState[action.index];
      movedUpState[action.index] = leftItem;
      return movedUpState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_CONTACT_LINK_DOWN"]:
      const movedDownState = [...state];
      const rightItem = movedDownState[action.index + 1];
      movedDownState[action.index + 1] = movedDownState[action.index];
      movedDownState[action.index] = rightItem;
      return movedDownState;

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/state/stats/_actions.js":
/*!*********************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/state/stats/_actions.js ***!
  \*********************************************************/
/*! exports provided: EDIT_STAT_NUMBER, EDIT_STAT_DESCRIPTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_STAT_NUMBER", function() { return EDIT_STAT_NUMBER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_STAT_DESCRIPTION", function() { return EDIT_STAT_DESCRIPTION; });
const EDIT_STAT_NUMBER = 'esn';
const EDIT_STAT_DESCRIPTION = 'esd';

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/state/stats/_reducer.js":
/*!*********************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/state/stats/_reducer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/stat-tiles/state/stats/_actions.js");

/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_STAT_NUMBER"]:
      return editAtIndex('number');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_STAT_DESCRIPTION"]:
      return editAtIndex('description');

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/stat-tiles/templates/stat.partial.mustache":
/*!*****************************************************************!*\
  !*** ../blocks/fpbk/stat-tiles/templates/stat.partial.mustache ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"stat-tiles__block d-flex flex-column\">\n    <span class=\"stat-tiles__number\">{{ number }}</span>\n    <span class=\"stat-tiles__description px-3 px-md-0 mx-auto\">{{{ description }}}</span>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"stat-tiles__block d-flex flex-column\">\n    <span class=\"stat-tiles__number\">{{ number }}</span>\n    <span class=\"stat-tiles__description px-3 px-md-0 mx-auto\">{{{ description }}}</span>\n</div>\n";


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

/***/ 184:
/*!****************************************************!*\
  !*** multi ../blocks/fpbk/stat-tiles/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/stat-tiles/src/index.js */"../blocks/fpbk/stat-tiles/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-stat-tiles-index.js.map