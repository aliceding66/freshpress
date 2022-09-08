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
/******/ 		"blocks-fpbk-hero-index": 0
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
/******/ 	deferredModules.push([138,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/hero/block.json":
/*!**************************************!*\
  !*** ../blocks/fpbk/hero/block.json ***!
  \**************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/hero\",\"title\":\"Hero\",\"category\":\"freshblocks\",\"description\":\"A large image with optional headline, copy, signup form and call to action button.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true},\"styles\":[{\"name\":\"default\",\"label\":\"Default\",\"isDefault\":true},{\"name\":\"centered-with-sso\",\"label\":\"Centered with SSO\"}]}");

/***/ }),

/***/ "../blocks/fpbk/hero/src/_edit.js":
/*!****************************************!*\
  !*** ../blocks/fpbk/hero/src/_edit.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _components_SignupFormTemplate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/_SignupFormTemplate */ "../blocks/fpbk/hero/src/components/_SignupFormTemplate.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/hero/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _templates_hero_ctas_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/hero-ctas.mustache */ "../blocks/fpbk/hero/templates/hero-ctas.mustache");
/* harmony import */ var _templates_hero_ctas_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_hero_ctas_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_hero_image_label_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/hero-image-label.mustache */ "../blocks/fpbk/hero/templates/hero-image-label.mustache");
/* harmony import */ var _templates_hero_image_label_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_hero_image_label_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utlis_generateTemplateData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utlis/_generateTemplateData */ "../blocks/fpbk/hero/src/utlis/_generateTemplateData.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/hero/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/hero/block.json", 1);













/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const decreaseVerticalPaddingClass = attributes.decrease_vertical_padding ? 'py-0' : 'pt-2 pt-lg-4 pb-lg-5';
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "hero ".concat(decreaseVerticalPaddingClass, " ").concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_12__["name"])
    });
  }

  const additionalTemplateData = Object(_utlis_generateTemplateData__WEBPACK_IMPORTED_MODULE_11__["default"])(heroTemplateData, // eslint-disable-line no-undef
  attributes, blockProps === null || blockProps === void 0 ? void 0 : blockProps.id);
  const templateData = { ...heroTemplateData,
    ...additionalTemplateData
  }; // eslint-disable-line no-undef

  const isCenteredWithSsoTheme = blockProps === null || blockProps === void 0 ? void 0 : blockProps.className.includes('is-style-centered-with-sso');
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_12__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
    isSimple: true,
    name: "hero_content_max_width",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('200px, 50% etc.', 'freshpress-website') // eslint-disable-line @wordpress/i18n-translator-comments

  }), isCenteredWithSsoTheme && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "hero_content_background_color"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "hero_label_colour"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    label: "Enable Star Review",
    name: "hero_label_star_review"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "hero_label_colour_copy"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Repeater, {
    name: "hero_labels_with_icons",
    buttonLabel: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Add Image Label', 'freshpress-website')
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "headline_colour"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Select, {
    name: "headline_mobile_size"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Select, {
    name: "headline_tablet_size"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Select, {
    name: "headline_desktop_size"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "decrease_vertical_padding"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "text_colour"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Hide Text on Mobile', 'freshpress-website'),
    name: "text_mobile_visibility"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Repeater, {
    name: "images"
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
    initialOpen: true,
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Interactivity', 'freshpress-website')
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "include_cta_button"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Group, {
    name: "cta_button"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "hero_include_second_cta"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Group, {
    name: "hero_second_cta"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "include_signup_form"
  }), attributes.include_signup_form === true &&
  /*#__PURE__*/
  // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: /*#__PURE__*/React.createElement("strong", {
      style: {
        lineHeight: '2rem'
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Signup form', 'freshpress-website'))
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "signup_form_include_default_terms_of_service"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].ColourPicker, {
    name: "signup_form_hero_terms_of_service_colour"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Checkbox, {
    name: "signup_form_visibility"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "hero_include_pardot_form"
  }), attributes.hero_include_pardot_form === true &&
  /*#__PURE__*/
  // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: /*#__PURE__*/React.createElement("strong", {
      style: {
        lineHeight: '2rem'
      }
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Pardot form', 'freshpress-website'))
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
    name: "pardot_form_url"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Number, {
    name: "pardot_form_iframe_width"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
    name: "pardot_form_form_name"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Special.ModalPicker, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Select Thank You Modal', 'freshpress-website'),
    name: "pardot_form_thank_you_modal_id",
    emptyLabel: "No Thank You modal selected"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "hero_include_hero_search"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    attributes: templateData,
    partials: {
      hero_image_label: _templates_hero_image_label_mustache__WEBPACK_IMPORTED_MODULE_10__["templateString"]
    },
    components: {
      hero_label: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "hero_label",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert Hero Label Text', 'freshpress-website')
      }),
      headline: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "headline",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert Headline', 'freshpress-website')
      }),
      text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "text",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert Description', 'freshpress-website')
      })
    }
  }), attributes.include_signup_form === true && /*#__PURE__*/React.createElement(_components_SignupFormTemplate__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: { ...attributes,
      ...additionalTemplateData
    }
  }), attributes.include_cta_button === true && /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    template: _templates_hero_ctas_mustache__WEBPACK_IMPORTED_MODULE_9___default.a,
    attributes: { ...attributes,
      ...additionalTemplateData
    }
  }), attributes.hero_include_pardot_form === true && /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], {
    template: [['fpbk/pardot-form', {
      pardot_form_url: attributes.pardot_form_url,
      pardot_form_iframe_width: attributes.pardot_form_iframe_width,
      pardot_form_form_name: attributes.pardot_form_form_name
    }]],
    templateLock: "all"
  }), attributes.hero_include_hero_search === true && /*#__PURE__*/React.createElement("div", {
    className: "hero__search-content d-flex flex-wrap w-100 p-2 mx-auto ml-md-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__search-input-container w-100 position-relative"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
    isSimple: true,
    className: "st-default-search-input form-control hero-search__input pl-5",
    name: "hero_search_input_placeholder_text",
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert Search Input Placeholder', 'freshpress-website')
  }))))));
});

/***/ }),

/***/ "../blocks/fpbk/hero/src/components/_SignupFormTemplate.js":
/*!*****************************************************************!*\
  !*** ../blocks/fpbk/hero/src/components/_SignupFormTemplate.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");


/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    attributes
  } = props;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "h4"
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Signup Form', 'freshpress-website')), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Insert E-Mail placeholder text', 'freshpress-website'),
    name: "signup_form_email_placeholder_text"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Insert Password placeholder text', 'freshpress-website'),
    name: "signup_form_password_placeholder_text"
  }), /*#__PURE__*/React.createElement("div", {
    className: "btn btn-cta-green btn-block btn-lg"
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Insert Signup Button Text', 'freshpress-website'),
    name: "signup_form_submit_button_text"
  })), attributes.signup_form_include_default_terms_of_service ? /*#__PURE__*/React.createElement("div", {
    className: "hero__terms",
    style: {
      color: attributes.signup_form_hero_terms_of_service_colour.hex
    }
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('I confirm that I have read and agree to FreshBooks Terms of Service and Privacy Policy. Security Safeguards', 'freshpress-website')) : /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].RichText, {
    isSimple: true,
    placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Insert Custom Terms of Service', 'freshpress-website'),
    className: "hero__terms",
    name: "signup_form_custom_terms_of_service"
  }));
});

/***/ }),

/***/ "../blocks/fpbk/hero/src/index.js":
/*!****************************************!*\
  !*** ../blocks/fpbk/hero/src/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/hero/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/hero/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/hero/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/hero/src/style.scss");
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

/***/ "../blocks/fpbk/hero/src/style.scss":
/*!******************************************!*\
  !*** ../blocks/fpbk/hero/src/style.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/hero/src/utlis/_generateTemplateData.js":
/*!**************************************************************!*\
  !*** ../blocks/fpbk/hero/src/utlis/_generateTemplateData.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ((templateData, attributes, id = '') => {
  var _attributes$cta_butto;

  let additionalTemplateData = [];
  const headlineMobileSize = 'mobile-' + attributes.headline_mobile_size;
  const headlineTabletSize = 'tablet-' + attributes.headline_tablet_size;
  const headlineDesktopSize = 'desktop-' + attributes.headline_desktop_size;
  additionalTemplateData.signup_form = {
    email_placeholder_text: attributes.signup_form_email_placeholder_text,
    password_placeholder_text: attributes.signup_form_password_placeholder_text,
    submit_button_text: attributes.signup_form_submit_button_text,
    include_default_terms_of_service: attributes.signup_form_include_default_terms_of_service,
    custom_terms_of_service: attributes.signup_form_custom_terms_of_service,
    default_terms: templateData.default_terms_of_service,
    hero_terms_of_service_colour: attributes.signup_form_hero_terms_of_service_colour,
    visibility: attributes.signup_form_visibility,
    action: templateData.signup_form_action,
    terms_of_service_inline_styles: !!attributes.signup_form_hero_terms_of_service_colour ? "style='color: ".concat(attributes.signup_form_hero_terms_of_service_colour.hex, ";'") : '',
    invalid_email: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Email is invalid.', 'freshpress-website'),
    invalid_password: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Password is invalid.', 'freshpress-website'),
    field_required: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('This field is required.', 'freshpress-website')
  };
  const signupForm = additionalTemplateData.signup_form;
  const breakpointKeys = templateData.breakpoint_keys;
  const formVisibility = [];

  if (attributes.include_signup_form) {
    if (breakpointKeys) {
      breakpointKeys.forEach(key => {
        if ('sm' === key) {
          formVisibility[key] = signupForm.visibility.includes(key) ? 'd-flex' : 'd-none';
        } else {
          formVisibility[key] = signupForm.visibility.includes(key) ? 'd-key-flex' : 'd-key-none';
        }
      });
    }

    additionalTemplateData.signup_form.visibility = formVisibility.join(' ');
  }

  const ctaVisibility = {};

  if (attributes.include_cta_button) {
    if (breakpointKeys) {
      breakpointKeys.forEach(key => {
        if ('sm' === key) {
          ctaVisibility[key] = attributes.cta_button_visibility.includes(key) ? 'd-flex' : 'd-none';
        } else {
          ctaVisibility[key] = attributes.cta_button_visibility.includes(key) ? "d-".concat(key, "-flex") : "d-".concat(key, "-none");
        }
      });
    }
  }

  const secondCtaVisibility = {};

  if (attributes.hero_include_second_cta) {
    if (breakpointKeys) {
      breakpointKeys.forEach(key => {
        if ('sm' === key) {
          secondCtaVisibility[key] = attributes.hero_second_cta_visibility.includes(key) ? 'd-flex' : 'd-none';
        } else {
          secondCtaVisibility[key] = attributes.hero_second_cta_visibility.includes(key) ? "d-".concat(key, "-flex") : "d-".concat(key, "-none");
        }
      });
    }
  }

  const cols = [];
  let contentPosition = 'justify-content-center';
  let contentColumnPosition = 'align-items-center';
  let textAlign = 'text-center';
  let mainSectionPaddings = '';
  let contentPaddings = '';
  const images = attributes.images;
  const imagesByBreakpoint = {};

  if (images) {
    images.forEach(img => {
      imagesByBreakpoint[img.screen_size] = img;
    });
  }

  const imgs = [];

  if (images) {
    const selector = '#' + id;
    breakpointKeys.forEach(bp => {
      if (Object.keys(imagesByBreakpoint).includes(bp)) {
        var _imagesByBreakpoint$b, _imagesByBreakpoint$b2;

        const bpImg = imagesByBreakpoint[bp] && (_imagesByBreakpoint$b = imagesByBreakpoint[bp]) !== null && _imagesByBreakpoint$b !== void 0 && (_imagesByBreakpoint$b2 = _imagesByBreakpoint$b.image) !== null && _imagesByBreakpoint$b2 !== void 0 && _imagesByBreakpoint$b2.url ? imagesByBreakpoint[bp].image.url : null;
        const displayImage = imagesByBreakpoint[bp].display_image && bpImg !== null;
        const bpBg = imagesByBreakpoint[bp].background_color ? imagesByBreakpoint[bp].background_color.hex : null;
        const bpBottomPadding = imagesByBreakpoint[bp].bottom_padding ? imagesByBreakpoint[bp].bottom_padding : null;
        const hasBpBottomPadding = bpBottomPadding || '0' === bpBottomPadding;

        if (imagesByBreakpoint[bp].hero_content_position) {
          contentPosition += " justify-content-".concat(bp, "-").concat(imagesByBreakpoint[bp].hero_content_position);
          contentColumnPosition += " align-items-".concat(bp, "-").concat(imagesByBreakpoint[bp].hero_content_position);

          if ('start' === imagesByBreakpoint[bp].hero_content_position) {
            textAlign += " text-".concat(bp, "-left");
            mainSectionPaddings += ' pl-lg-3';
            contentPaddings += ' pl-lg-5 pr-lg-0';
          } else if ('end' === imagesByBreakpoint[bp].hero_content_position) {
            textAlign += " text-".concat(bp, "-right");
            mainSectionPaddings += ' pr-lg-3';
            contentPaddings += ' pr-lg-5 pl-lg-0';
          } else {
            textAlign += " text-".concat(bp, "-center");
          }
        }

        if ('xs' === bp) {
          cols.push('col');
        } else if (bpImg && 'center bottom' !== imagesByBreakpoint[bp].background_position) {
          cols.push("col-".concat(bp, "-6"));
        } else if (bpImg && 'center bottom' === imagesByBreakpoint[bp].background_position) {
          cols.push("col-".concat(bp, "-12"));
        } else if (bpBg && !bpImg) {
          cols.push("col-".concat(bp, "-12"));
        }

        const breakpoints = templateData.breakpoints;
        const bpPxWidth = breakpoints[bp] + 'px';
        let bpBgPos = '';
        let bpCss = hasBpBottomPadding ? "padding-bottom: ".concat(bpBottomPadding, "; ") : '';

        if (imagesByBreakpoint[bp]) {
          let bpBgSize = 'background-size: ';

          if ('cover' === imagesByBreakpoint[bp].background_size) {
            bpBgSize += 'cover; ';
          } else if ('normal' === imagesByBreakpoint[bp].background_size) {
            bpBgSize += 'auto 100%; ';
          } else if ('custom' === imagesByBreakpoint[bp].background_size) {
            bpBgSize += imagesByBreakpoint[bp].hero_custom_background_size + '; ';
          }

          bpBgPos = 'background-position: ' + ('normal' === imagesByBreakpoint[bp].background_position ? '100% 100%; ' : imagesByBreakpoint[bp].background_position + '; ');
          bpCss += bpBgSize + bpBgPos;
        }

        let url = '';

        if (bpImg && displayImage) {
          url = bpImg;
          bpCss += "background-image: url(".concat(url, ");");
        } else if (!displayImage && bpBg) {
          bpCss += "background-image: none; background-color: ".concat(bpBg, ";");
        }

        imgs.push("@media (min-width: ".concat(bpPxWidth, ") { ").concat(selector, " { ").concat(bpCss, " } }"));
      }
    });
  }

  const imagesStyles = imgs.join(' ');
  additionalTemplateData.images_style_tag = imgs ? "<style>".concat(imagesStyles, "</style>") : '';
  additionalTemplateData = { ...additionalTemplateData,
    content_position: contentPosition,
    content_inline_styles: attributes.hero_content_max_width ? "style=\"max-width: ".concat(attributes.hero_content_max_width, ";\"") : '',
    main_section_classes: cols.join(' ') + mainSectionPaddings,
    label_inline_styles: attributes.hero_label_colour ? "style=\"color: ".concat(attributes.hero_label_colour.hex, ";\"") : '',
    headline_inline_styles: attributes.headline_colour ? "style=\"color: ".concat(attributes.headline_colour.hex, ";\"") : '',
    headline_font_sizes: [headlineMobileSize, headlineTabletSize, headlineDesktopSize].join(' '),
    text_inline_styles: attributes.text_colour ? "style=\"color: ".concat(attributes.text_colour.hex, ";\"") : '',
    text_align: textAlign,
    text_display_class: !attributes.text_mobile_visibility ? '' : ' d-none d-md-block',
    content_paddings: contentPaddings,
    cta_button_inline_style: attributes.cta_button_max_width ? 'style=max-width:' + attributes.cta_button_max_width : '',
    cta_button_wrapper_classname: attributes.hero_include_second_cta ? 'flex-column flex-lg-row ' + contentColumnPosition : '',
    cta_button_visibility_classname: ctaVisibility ? Object.values(ctaVisibility).join(' ') : '',
    cta_button_offer_terms_text: 'Offer terms:',
    cta_button_subtext_classname: attributes.cta_button_offer_details_text ? 'underline' : '',
    cta_button_mice_inline_styles: (_attributes$cta_butto = attributes.cta_button_hero_mice_type_colour) !== null && _attributes$cta_butto !== void 0 && _attributes$cta_butto.hex ? "style=\"color:".concat(attributes.cta_button_hero_mice_type_colour.hex, ";\"") : '',
    second_cta_inline_style: attributes.hero_second_cta_max_width ? "style=\"max-width: ".concat(attributes.hero_second_cta_max_width, ";'") : '',
    second_cta_visibility_classname: secondCtaVisibility ? Object.values(secondCtaVisibility).join(' ') : '',
    second_cta_subtext_classname: attributes.hero_second_cta_offer_details_text ? 'underline' : '',
    second_cta_mice_inline_styles: attributes.hero_second_cta_hero_mice_type_colour ? "style=\"color: ".concat(attributes.hero_second_cta_hero_mice_type_colour.hex, ";\"") : '',
    hero_label_colour_copy: attributes.hero_label_colour_copy,
    hero_label_star_review: attributes.hero_label_star_review,
    hero_labels_with_icons: attributes.hero_labels_with_icons ? attributes.hero_labels_with_icons.map(icon => {
      icon.image_label_inline_styles = icon.label_colour ? "style=\"color: ".concat(icon.label_colour.hex, ";\"") : 'no-style';
      return icon;
    }) : []
  };
  return additionalTemplateData;
});

/***/ }),

/***/ "../blocks/fpbk/hero/templates/block.mustache":
/*!****************************************************!*\
  !*** ../blocks/fpbk/hero/templates/block.mustache ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("{{{ images_style_tag }}}\n<div class=\"row no-gutters {{ wrapper_child_classes }} {{{ content_position }}}\">\n    <div {{{ content_inline_styles }}} class=\"hero__main-section text-center col col-12 {{ main_section_classes }}\">\n        <div class=\"hero__content mx-auto {{ content_paddings }}\">\n            {{# hero_label }}\n                <span class=\"hero__label mx-auto mx-lg-0 py-2 py-lg-0 {{ text_align }}\" {{{ label_inline_styles }}}>{{ hero_label }}</span>\n            {{/ hero_label }}\n            {{# hero_label_star_review }}\n                <div class=\"text-md-left text-sm-center rating__top mb-1 mr-3 d-none d-lg-table-cell pr-2\">\n\t                <div class=\"rating__category mr-2 position-relative d-inline-block\">\n\t\t                {{ get_app_rating_text }}\n\t                </div>\n\t                {{{ rating_image2 }}}\n                </div>\n                <div class=\"text-md-left text-sm-center rating__description position-relative d-none d-lg-table-cell\">\n\t                {{{ rating_link }}}\n                </div>\n            {{/ hero_label_star_review }}\n            {{# hero_label_colour_copy }}\n                <div class=\"hero__image-labels d-flex mb-3 mb-sm-4 {{ content_position }}\">\n                    {{# hero_labels_with_icons }}\n                        {{> hero_image_label }}\n                    {{/ hero_labels_with_icons }}\n                </div>\n            {{/ hero_label_colour_copy }}\n\t\t\t{{# is_centered_with_sso_theme }}\n\t\t\t\t<div class=\"hero__rating1 d-none d-md-flex align-items-center justify-content-center\">\n\t\t\t\t\t<span class=\"hero__rating1-text\">{{ get_app_rating_text }}</span>\n\t\t\t\t\t{{{ rating_image1 }}}\n\t\t\t\t\t<span class=\"hero__rating1-getapp\">{{{ rating_link }}}</span>\n\t\t\t\t</div>\n\t\t\t{{/ is_centered_with_sso_theme }}\n            {{# headline }}\n                <h1 class=\"hero__headline mb-2 {{ text_align }} {{ headline_font_sizes }} {{ headline_classes }}\" {{{ headline_inline_styles }}}>{{{ headline }}}</h1>\n            {{/ headline }}\n\t\t\t{{# hero_label_star_review }}\n\t\t\t\t<div class=\"text-lg-left text-md-center rating__top mb-1 mr-3 d-lg-none d-editor-none\">\n\t\t\t\t\t<div class=\"rating__category mr-2 position-relative d-inline-block\">\n\t\t\t\t\t\t{{ get_app_rating_text }}\n\t\t\t\t\t</div>\n\t\t\t\t\t{{{ rating_image2 }}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"text-lg-left text-md-centers rating__description position-relative d-lg-none d-editor-none pb-4\">\n\t\t\t\t\t{{{ rating_link }}}\n\t\t\t\t</div>\n\t\t\t{{/ hero_label_star_review }}\n\t\t\t{{# is_centered_with_sso_theme }}\n\t\t\t\t<div class=\"hero__rating2 d-flex align-items-center flex-wrap justify-content-center d-md-none\">\n\t\t\t\t\t<span class=\"hero__rating2-score\">{{ get_app_rating_text }}</span>\n\t\t\t\t\t{{{ rating_image2 }}}\n\t\t\t\t\t<span class=\"hero__rating2-getapp\">{{{ rating_link }}}</span>\n\t\t\t\t</div>\n\t\t\t{{/ is_centered_with_sso_theme }}\n            {{# text }}\n                <div class=\"hero__text mb-md-4 {{ text_align }} {{ text_display_class }}\" {{{ text_inline_styles }}}>{{{ text }}}</div>\n            {{/ text }}\n            {{# include_signup_form }}\n                {{> hero_signup_form }}\n            {{/ include_signup_form }}\n            {{# include_cta_button }}\n                {{> hero_ctas }}\n            {{/ include_cta_button }}\n            {{# hero_include_pardot_form }}\n                <div class=\"hero__pardot-form-container d-flex {{ content_position }}\">\n                    {{{ pardot_form }}}\n                </div>\n            {{/ hero_include_pardot_form }}\n            {{# hero_include_hero_search }}\n                {{> hero_search }}\n            {{/ hero_include_hero_search }}\n        </div>\n    </div>\n</div>\n{{# is_centered_with_sso_theme }}\n\t<div class=\"reversed-corner reversed-corner_down-right reversed-corner_light-blue d-none d-lg-block\"><div></div></div>\n{{/ is_centered_with_sso_theme }}\n", data, partials);
}
module.exports.templateString = "{{{ images_style_tag }}}\n<div class=\"row no-gutters {{ wrapper_child_classes }} {{{ content_position }}}\">\n    <div {{{ content_inline_styles }}} class=\"hero__main-section text-center col col-12 {{ main_section_classes }}\">\n        <div class=\"hero__content mx-auto {{ content_paddings }}\">\n            {{# hero_label }}\n                <span class=\"hero__label mx-auto mx-lg-0 py-2 py-lg-0 {{ text_align }}\" {{{ label_inline_styles }}}>{{ hero_label }}</span>\n            {{/ hero_label }}\n            {{# hero_label_star_review }}\n                <div class=\"text-md-left text-sm-center rating__top mb-1 mr-3 d-none d-lg-table-cell pr-2\">\n\t                <div class=\"rating__category mr-2 position-relative d-inline-block\">\n\t\t                {{ get_app_rating_text }}\n\t                </div>\n\t                {{{ rating_image2 }}}\n                </div>\n                <div class=\"text-md-left text-sm-center rating__description position-relative d-none d-lg-table-cell\">\n\t                {{{ rating_link }}}\n                </div>\n            {{/ hero_label_star_review }}\n            {{# hero_label_colour_copy }}\n                <div class=\"hero__image-labels d-flex mb-3 mb-sm-4 {{ content_position }}\">\n                    {{# hero_labels_with_icons }}\n                        {{> hero_image_label }}\n                    {{/ hero_labels_with_icons }}\n                </div>\n            {{/ hero_label_colour_copy }}\n\t\t\t{{# is_centered_with_sso_theme }}\n\t\t\t\t<div class=\"hero__rating1 d-none d-md-flex align-items-center justify-content-center\">\n\t\t\t\t\t<span class=\"hero__rating1-text\">{{ get_app_rating_text }}</span>\n\t\t\t\t\t{{{ rating_image1 }}}\n\t\t\t\t\t<span class=\"hero__rating1-getapp\">{{{ rating_link }}}</span>\n\t\t\t\t</div>\n\t\t\t{{/ is_centered_with_sso_theme }}\n            {{# headline }}\n                <h1 class=\"hero__headline mb-2 {{ text_align }} {{ headline_font_sizes }} {{ headline_classes }}\" {{{ headline_inline_styles }}}>{{{ headline }}}</h1>\n            {{/ headline }}\n\t\t\t{{# hero_label_star_review }}\n\t\t\t\t<div class=\"text-lg-left text-md-center rating__top mb-1 mr-3 d-lg-none d-editor-none\">\n\t\t\t\t\t<div class=\"rating__category mr-2 position-relative d-inline-block\">\n\t\t\t\t\t\t{{ get_app_rating_text }}\n\t\t\t\t\t</div>\n\t\t\t\t\t{{{ rating_image2 }}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"text-lg-left text-md-centers rating__description position-relative d-lg-none d-editor-none pb-4\">\n\t\t\t\t\t{{{ rating_link }}}\n\t\t\t\t</div>\n\t\t\t{{/ hero_label_star_review }}\n\t\t\t{{# is_centered_with_sso_theme }}\n\t\t\t\t<div class=\"hero__rating2 d-flex align-items-center flex-wrap justify-content-center d-md-none\">\n\t\t\t\t\t<span class=\"hero__rating2-score\">{{ get_app_rating_text }}</span>\n\t\t\t\t\t{{{ rating_image2 }}}\n\t\t\t\t\t<span class=\"hero__rating2-getapp\">{{{ rating_link }}}</span>\n\t\t\t\t</div>\n\t\t\t{{/ is_centered_with_sso_theme }}\n            {{# text }}\n                <div class=\"hero__text mb-md-4 {{ text_align }} {{ text_display_class }}\" {{{ text_inline_styles }}}>{{{ text }}}</div>\n            {{/ text }}\n            {{# include_signup_form }}\n                {{> hero_signup_form }}\n            {{/ include_signup_form }}\n            {{# include_cta_button }}\n                {{> hero_ctas }}\n            {{/ include_cta_button }}\n            {{# hero_include_pardot_form }}\n                <div class=\"hero__pardot-form-container d-flex {{ content_position }}\">\n                    {{{ pardot_form }}}\n                </div>\n            {{/ hero_include_pardot_form }}\n            {{# hero_include_hero_search }}\n                {{> hero_search }}\n            {{/ hero_include_hero_search }}\n        </div>\n    </div>\n</div>\n{{# is_centered_with_sso_theme }}\n\t<div class=\"reversed-corner reversed-corner_down-right reversed-corner_light-blue d-none d-lg-block\"><div></div></div>\n{{/ is_centered_with_sso_theme }}\n";


/***/ }),

/***/ "../blocks/fpbk/hero/templates/hero-ctas.mustache":
/*!********************************************************!*\
  !*** ../blocks/fpbk/hero/templates/hero-ctas.mustache ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"row my-3 {{ content_position }} {{ cta_button_wrapper_classname }} flex-wrap\">\n    <div {{{ cta_button_inline_style }}} class=\"hero__cta-content col col-12 d-none {{ cta_button_visibility_classname }} flex-wrap justify-content-center\">\n        {{# cta_button_link.html }}\n            {{{ cta_button_link.html }}}\n        {{/ cta_button_link.html }}\n        <div class=\"hero__sub-text hero__sub-text text-center mt-2 {{ cta_button_subtext_classname }}\" {{{ cta_button_mice_inline_styles }}}>\n            {{{ cta_button_mice_type }}}\n        </div>\n        {{# cta_button_offer_details_text }}\n            <div class=\"hero__offer-details position-absolute text-center text-md-left\">\n                <h4 class=\"mb-2\">\n                    {{ cta_button_offer_terms_text }}\n                </h4>\n                {{{ cta_button_offer_details_text }}}\n            </div>\n        {{/ cta_button_offer_details_text }}\n    </div>\n    {{# hero_include_second_cta }}\n        <div {{{ second_cta_inline_style }}} class=\"hero__cta-content col col-12 mt-2 mt-lg-0 d-none {{ second_cta_visibility_classname }} flex-wrap justify-content-center\">\n        <a data-scroll-target=\"{{ hero_second_cta_anchor }}\" class=\"btn btn-outline-light btn-block btn-lg text-nowrap px-2\">\n            {{ hero_second_cta_text }}\n        </a>\n        <div class=\"hero__sub-text hero__sub-text text-center mt-2 {{ second_cta_subtext_classname }}\" {{{ second_cta_mice_inline_styles }}}>\n        {{{ hero_second_cta_mice_type }}}\n        </div>\n        {{# hero_second_cta_offer_details_text }}\n        <div class=\"hero__offer-details position-absolute text-center text-md-left\">\n            <h4 class=\"mb-2\">{{ cta_button_offer_terms_text }}</h4>\n            {{{ hero_second_cta_offer_details_text }}}\n        </div>\n        {{/ hero_second_cta_offer_details_text }}\n        </div>\n    {{/ hero_include_second_cta }}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"row my-3 {{ content_position }} {{ cta_button_wrapper_classname }} flex-wrap\">\n    <div {{{ cta_button_inline_style }}} class=\"hero__cta-content col col-12 d-none {{ cta_button_visibility_classname }} flex-wrap justify-content-center\">\n        {{# cta_button_link.html }}\n            {{{ cta_button_link.html }}}\n        {{/ cta_button_link.html }}\n        <div class=\"hero__sub-text hero__sub-text text-center mt-2 {{ cta_button_subtext_classname }}\" {{{ cta_button_mice_inline_styles }}}>\n            {{{ cta_button_mice_type }}}\n        </div>\n        {{# cta_button_offer_details_text }}\n            <div class=\"hero__offer-details position-absolute text-center text-md-left\">\n                <h4 class=\"mb-2\">\n                    {{ cta_button_offer_terms_text }}\n                </h4>\n                {{{ cta_button_offer_details_text }}}\n            </div>\n        {{/ cta_button_offer_details_text }}\n    </div>\n    {{# hero_include_second_cta }}\n        <div {{{ second_cta_inline_style }}} class=\"hero__cta-content col col-12 mt-2 mt-lg-0 d-none {{ second_cta_visibility_classname }} flex-wrap justify-content-center\">\n        <a data-scroll-target=\"{{ hero_second_cta_anchor }}\" class=\"btn btn-outline-light btn-block btn-lg text-nowrap px-2\">\n            {{ hero_second_cta_text }}\n        </a>\n        <div class=\"hero__sub-text hero__sub-text text-center mt-2 {{ second_cta_subtext_classname }}\" {{{ second_cta_mice_inline_styles }}}>\n        {{{ hero_second_cta_mice_type }}}\n        </div>\n        {{# hero_second_cta_offer_details_text }}\n        <div class=\"hero__offer-details position-absolute text-center text-md-left\">\n            <h4 class=\"mb-2\">{{ cta_button_offer_terms_text }}</h4>\n            {{{ hero_second_cta_offer_details_text }}}\n        </div>\n        {{/ hero_second_cta_offer_details_text }}\n        </div>\n    {{/ hero_include_second_cta }}\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/hero/templates/hero-image-label.mustache":
/*!***************************************************************!*\
  !*** ../blocks/fpbk/hero/templates/hero-image-label.mustache ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<span {{ image_label_inline_styles }} class=\"hero__image-label align-items-center {{ hide_on_mobile_class }}\">\n    {{# icon.url }}\n\t\t<img src=\"{{ icon.url }}\" />\n     {{/ icon.url }}\n\t{{^ icon.url }}\n\t\t{{{ icon }}}\n\t{{/ icon.url }}\n    {{ label }}\n    {{ admin_controls }}\n</span>\n", data, partials);
}
module.exports.templateString = "<span {{ image_label_inline_styles }} class=\"hero__image-label align-items-center {{ hide_on_mobile_class }}\">\n    {{# icon.url }}\n\t\t<img src=\"{{ icon.url }}\" />\n     {{/ icon.url }}\n\t{{^ icon.url }}\n\t\t{{{ icon }}}\n\t{{/ icon.url }}\n    {{ label }}\n    {{ admin_controls }}\n</span>\n";


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

/***/ 138:
/*!**********************************************!*\
  !*** multi ../blocks/fpbk/hero/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/hero/src/index.js */"../blocks/fpbk/hero/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-hero-index.js.map