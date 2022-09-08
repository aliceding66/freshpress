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
/******/ 		"blocks-fpbk-file-download-index": 0
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
/******/ 	deferredModules.push([125,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components"]);
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

/***/ "../blocks/fpbk/file-download/block.json":
/*!***********************************************!*\
  !*** ../blocks/fpbk/file-download/block.json ***!
  \***********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/file-download\",\"title\":\"File Download\",\"category\":\"freshblocks\",\"description\":\"A block containing downloadable files.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true}}");

/***/ }),

/***/ "../blocks/fpbk/file-download/src/_edit.js":
/*!*************************************************!*\
  !*** ../blocks/fpbk/file-download/src/_edit.js ***!
  \*************************************************/
/*! exports provided: icons, urlTypes, urlFileTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icons", function() { return icons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlTypes", function() { return urlTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlFileTypes", function() { return urlFileTypes; });
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
/* harmony import */ var _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/file_download_files/_actions */ "../blocks/fpbk/file-download/src/state/file_download_files/_actions.js");
/* harmony import */ var _state_file_download_files_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/file_download_files/_reducer */ "../blocks/fpbk/file-download/src/state/file_download_files/_reducer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_utils */ "../blocks/fpbk/file-download/src/_utils.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/file-download/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/file-download/block.json", 1);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__);











 // eslint-disable-next-line no-undef

const {
  icons = {},
  urlTypes = {},
  urlFileTypes = {}
} = fileDownloadTemplateData;
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "file-download my-0 ".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getAlignClass"])(attributes)).concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getCommonBlockSettingsClass"])(attributes))
  });
  const downloadTypeDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(_block_json__WEBPACK_IMPORTED_MODULE_10__["name"], 'file_download_files', 'download_type');
  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__["BlockStateManager"](attributes, setAttributes);
  const [files, filesDispatch] = blockStateManager.addReducerManager(_state_file_download_files_reducer__WEBPACK_IMPORTED_MODULE_8__["default"], 'file_download_files');
  const fileNodes = files.map((file, index) => {
    const urlType = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["getFileUrlType"])(file, urlTypes, urlFileTypes);
    return /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-column",
      key: file.key
    }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Select, {
      className: "text-center w-auto",
      choices: downloadTypeDefinition.choices,
      value: file.download_type,
      onChange: value => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_FILE_DOWNLOAD_TYPE"],
          index,
          value
        });
      }
    }), file.download_type !== 'file' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Text, {
      value: file.url,
      onChange: value => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_FILE_URL"],
          index,
          value
        });
      }
    }), urlType === false && /*#__PURE__*/React.createElement("small", {
      className: "text-danger mb-3"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('URL can be a link to Google document or file with .pdf/.xslx/.docx extension.', 'freshpress-website')), urlType !== false && icons[urlType] && /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__["RawHTML"], {
      className: "text-center mb-3"
    }, icons[urlType])), file.download_type === 'file' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].File, {
      inline: true,
      allowedTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      preview: props => /*#__PURE__*/React.createElement("div", {
        className: "d-flex flex-column justify-content-center align-items-center h-100"
      }, /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_11__["RawHTML"], null, icons[props.subtype]), /*#__PURE__*/React.createElement("small", {
        className: "mb-4"
      }, props.filename)),
      value: file.file,
      onChange: value => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["EDIT_FILE_FILE"],
          index,
          value
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "block-editor__block-controls text-center"
    }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSmall: true,
      onClick: () => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["MOVE_FILE_LEFT"],
          index
        });
      },
      icon: "arrow-left-alt2"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isDestructive: true,
      isSmall: true,
      onClick: () => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["REMOVE_FILE"],
          index
        });
      },
      icon: "no-alt"
    }), index < files.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      isSmall: true,
      onClick: () => {
        filesDispatch({
          type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["MOVE_FILE_RIGHT"],
          index
        });
      },
      icon: "arrow-right-alt2"
    })));
  });
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_10__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-row justify-content-around"
  }, fileNodes), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    isSecondary: true,
    className: "d-block mx-auto mt-4",
    onClick: () => {
      filesDispatch({
        type: _state_file_download_files_actions__WEBPACK_IMPORTED_MODULE_7__["ADD_FILE"]
      });
    },
    icon: "plus",
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Add file', 'freshpress-website')
  })));
});

/***/ }),

/***/ "../blocks/fpbk/file-download/src/_utils.js":
/*!**************************************************!*\
  !*** ../blocks/fpbk/file-download/src/_utils.js ***!
  \**************************************************/
/*! exports provided: getAlignClass, getFileUrlType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlignClass", function() { return getAlignClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileUrlType", function() { return getFileUrlType; });
const getAlignClass = attributes => {
  let alignClass = '';

  if (attributes.align) {
    alignClass += ' d-flex';

    if ('right' === attributes.align) {
      alignClass += ' justify-content-end';
    } else if ('left' === attributes.align) {
      alignClass += ' justify-content-start';
    } else {
      alignClass += ' justify-content-center';
    }
  }

  return alignClass;
};
const getFileUrlType = (file, urlTypes, urlFileTypes) => {
  if (file.url === '' || file.download_type !== 'url') {
    return 'empty';
  }

  if (typeof file.url === 'string') {
    const foundUrlType = Object.keys(urlTypes).filter(urlType => file.url.includes(urlType))[0];

    if (foundUrlType) {
      return foundUrlType;
    }

    const splitFilUrl = file.url.split('.');
    const fileExtension = splitFilUrl[splitFilUrl.length - 1];

    if (Object.keys(urlFileTypes).includes(fileExtension)) {
      return fileExtension;
    }
  }

  return false;
};

/***/ }),

/***/ "../blocks/fpbk/file-download/src/index.js":
/*!*************************************************!*\
  !*** ../blocks/fpbk/file-download/src/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/file-download/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/file-download/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/file-download/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/file-download/src/style.scss");
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

/***/ "../blocks/fpbk/file-download/src/state/file_download_files/_actions.js":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/file-download/src/state/file_download_files/_actions.js ***!
  \******************************************************************************/
/*! exports provided: ADD_FILE, REMOVE_FILE, EDIT_FILE_DOWNLOAD_TYPE, EDIT_FILE_URL, EDIT_FILE_FILE, MOVE_FILE_LEFT, MOVE_FILE_RIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_FILE", function() { return ADD_FILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_FILE", function() { return REMOVE_FILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_FILE_DOWNLOAD_TYPE", function() { return EDIT_FILE_DOWNLOAD_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_FILE_URL", function() { return EDIT_FILE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_FILE_FILE", function() { return EDIT_FILE_FILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_FILE_LEFT", function() { return MOVE_FILE_LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVE_FILE_RIGHT", function() { return MOVE_FILE_RIGHT; });
const ADD_FILE = 'af';
const REMOVE_FILE = 'rf';
const EDIT_FILE_DOWNLOAD_TYPE = 'efdt';
const EDIT_FILE_URL = 'efu';
const EDIT_FILE_FILE = 'eff';
const MOVE_FILE_LEFT = 'mfl';
const MOVE_FILE_RIGHT = 'mfr';

/***/ }),

/***/ "../blocks/fpbk/file-download/src/state/file_download_files/_reducer.js":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/file-download/src/state/file_download_files/_reducer.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/file-download/src/state/file_download_files/_actions.js");
/* harmony import */ var scripts_components_EditorControls_components_universal_File__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/components/universal/_File */ "./scripts/components/EditorControls/components/universal/_File.js");




/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_2__["ADD_FILE"]:
      return [...state, {
        download_type: 'url',
        url: '',
        file: scripts_components_EditorControls_components_universal_File__WEBPACK_IMPORTED_MODULE_3__["emptyFileObject"],
        key: "file_".concat(Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])())
      }];

    case _actions__WEBPACK_IMPORTED_MODULE_2__["REMOVE_FILE"]:
      const stateWithRemoved = [...state];
      stateWithRemoved.splice(action.index, 1);
      return stateWithRemoved;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_FILE_DOWNLOAD_TYPE"]:
      return editAtIndex('download_type');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_FILE_URL"]:
      return editAtIndex('url');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["EDIT_FILE_FILE"]:
      return editAtIndex('file');

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_FILE_LEFT"]:
      const movedLeftState = [...state];
      const previousItem = movedLeftState[action.index - 1];
      movedLeftState[action.index - 1] = movedLeftState[action.index];
      movedLeftState[action.index] = previousItem;
      return movedLeftState;

    case _actions__WEBPACK_IMPORTED_MODULE_2__["MOVE_FILE_RIGHT"]:
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

/***/ "../blocks/fpbk/file-download/src/style.scss":
/*!***************************************************!*\
  !*** ../blocks/fpbk/file-download/src/style.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ 125:
/*!*******************************************************!*\
  !*** multi ../blocks/fpbk/file-download/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/file-download/src/index.js */"../blocks/fpbk/file-download/src/index.js");


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

/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-file-download-index.js.map