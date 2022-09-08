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
/******/ 		"blocks-fpbk-sign-up-index": 0
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
/******/ 	deferredModules.push([180,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/sign-up/block.json":
/*!*****************************************!*\
  !*** ../blocks/fpbk/sign-up/block.json ***!
  \*****************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, example, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/sign-up\",\"title\":\"Sign Up\",\"category\":\"freshblocks\",\"description\":\"A block containing Sign Up form used on signup page.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true,\"align\":true},\"styles\":[{\"name\":\"fullscreen\",\"label\":\"Fullscreen\",\"isDefault\":true},{\"name\":\"inline\",\"label\":\"Inline\"}],\"example\":{\"attributes\":{}}}");

/***/ }),

/***/ "../blocks/fpbk/sign-up/src/_edit.js":
/*!*******************************************!*\
  !*** ../blocks/fpbk/sign-up/src/_edit.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../templates/fullscreen.partial.mustache */ "../blocks/fpbk/sign-up/templates/fullscreen.partial.mustache");
/* harmony import */ var _templates_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_templates_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _templates_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/inline.partial.mustache */ "../blocks/fpbk/sign-up/templates/inline.partial.mustache");
/* harmony import */ var _templates_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _templates_form_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/form/fullscreen.partial.mustache */ "../blocks/fpbk/sign-up/templates/form/fullscreen.partial.mustache");
/* harmony import */ var _templates_form_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_templates_form_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _templates_form_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/form/inline.partial.mustache */ "../blocks/fpbk/sign-up/templates/form/inline.partial.mustache");
/* harmony import */ var _templates_form_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_form_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _templates_form_sso_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/form/sso.partial.mustache */ "../blocks/fpbk/sign-up/templates/form/sso.partial.mustache");
/* harmony import */ var _templates_form_sso_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_form_sso_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/sign-up/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/sign-up/block.json", 1);











/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  var _signUpTemplateData, _signUpTemplateData2;

  const isInlineTheme = (attributes === null || attributes === void 0 ? void 0 : attributes.className) && attributes.className.includes('is-style-inline');
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "sign-up py-4 px-3 p-md-3 d-flex flex-column align-items-center justify-content-center ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getCommonBlockSettingsClass"])(attributes)).concat(isInlineTheme ? 'min-vh-100' : '')
  });
  const templateAttributes = { ...attributes,
    ...signUpTemplateData,
    //eslint-disable-line no-undef
    is_inline_theme: isInlineTheme
  };
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_10__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__["default"], {
    template: isInlineTheme ? _templates_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default.a : _templates_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_5___default.a,
    attributes: templateAttributes,
    components: {
      heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "sign-up__heading",
        name: "heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert heading', 'freshpress-website')
      }),
      subscribe_form: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "form-group sign-up__form-group sign-up__form-email mb-md-2 position-relative"
      }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "form-control shadow-none text-left text-muted",
        name: "sign_up_form_email_placeholder_text",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert email placeholder', 'freshpress-website')
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group sign-up__form-group sign-up__form-btn mt-4 mt-md-2 mb-2"
      }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "btn btn-cta-green btn-block btn-lg sign-up__submit",
        name: "sign_up_form_submit_button_text",
        placeholder: // eslint-disable-next-line no-undef
        (_signUpTemplateData = signUpTemplateData) === null || _signUpTemplateData === void 0 ? void 0 : _signUpTemplateData.labels.default_submit_text
      }))),
      sub_heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        isSimple: true,
        className: "sign-up__sub-heading",
        name: "sub_heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert subheading', 'freshpress-website')
      }),
      already_registered_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
        name: "already_registered_text",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert already registered', 'freshpress-website')
      }),
      security_safeguards_link: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Link, {
        inline: true,
        className: "sign-up__security-link mt-3",
        name: "security_safeguards_link"
      }),
      admin_form: /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_4__["default"], {
        template: isInlineTheme ? _templates_form_inline_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default.a : _templates_form_fullscreen_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default.a,
        attributes: templateAttributes,
        partials: {
          partial__form_sso: _templates_form_sso_partial_mustache__WEBPACK_IMPORTED_MODULE_9__["templateString"]
        },
        components: {
          admin_form_input_fields: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
            className: "form-group sign-up__form-group sign-up__form-email mb-md-2 position-relative"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
            isSimple: true,
            className: "form-control shadow-none text-left text-muted",
            name: "sign_up_form_email_placeholder_text",
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert email placeholder', 'freshpress-website')
          })), /*#__PURE__*/React.createElement("div", {
            className: "form-group sign-up__form-group sign-up__form-password mb-md-2 position-relative"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
            isSimple: true,
            className: "form-control shadow-none text-left text-muted",
            name: "sign_up_form_password_placeholder_text",
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert password placeholder', 'freshpress-website')
          }))),
          admin_form_tos: /*#__PURE__*/React.createElement("div", {
            className: "sign-up__policy-privacy position-relative mb-2 pt-1 pb-1 mt-4"
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            className: "form-control-checkbox position-absolute"
          }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
            name: "privacy_policy_text",
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert privacy policy', 'freshpress-website')
          })),
          admin_form_submit: /*#__PURE__*/React.createElement("div", {
            className: "form-group sign-up__form-group sign-up__form-btn mt-4 mt-md-2 mb-2"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].RichText, {
            isSimple: true,
            className: "btn btn-cta-green btn-block btn-lg sign-up__submit",
            name: "sign_up_form_submit_button_text",
            placeholder: // eslint-disable-next-line no-undef
            (_signUpTemplateData2 = signUpTemplateData) === null || _signUpTemplateData2 === void 0 ? void 0 : _signUpTemplateData2.labels.default_submit_text
          }))
        }
      })
    }
  })));
});

/***/ }),

/***/ "../blocks/fpbk/sign-up/src/editor.scss":
/*!**********************************************!*\
  !*** ../blocks/fpbk/sign-up/src/editor.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/sign-up/src/index.js":
/*!*******************************************!*\
  !*** ../blocks/fpbk/sign-up/src/index.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/sign-up/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/sign-up/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/sign-up/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/sign-up/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/sign-up/src/style.scss");
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

/***/ "../blocks/fpbk/sign-up/src/style.scss":
/*!*********************************************!*\
  !*** ../blocks/fpbk/sign-up/src/style.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/sign-up/templates/form/fullscreen.partial.mustache":
/*!*************************************************************************!*\
  !*** ../blocks/fpbk/sign-up/templates/form/fullscreen.partial.mustache ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<form\n\tmethod=\"post\"\n\tclass=\"sign-up__form w-100 needs-validation with-arrows\"\n\tdata-form-handler=\"handleSignup\"\n\tdata-action=\"https://{{ domains.api }}/auth/api/v1/smux/registrations\"\n\tnovalidate\n>\n\t{{# admin_form_input_fields }}\n\t\t{{{ admin_form_input_fields }}}\n\t{{/ admin_form_input_fields }}\n\t{{^ admin_form_input_fields }}\n\t\t{{> partial__form_input_fields }}\n\t{{/ admin_form_input_fields }}\n\n\t{{# admin_form_submit }}\n\t\t{{{ admin_form_submit }}}\n\t{{/ admin_form_submit }}\n\t{{^ admin_form_submit }}\n\t\t{{> partial__form_submit }}\n\t{{/ admin_form_submit }}\n\n\t{{> partial__form_sso }}\n\n\t{{# admin_form_tos }}\n\t\t{{{ admin_form_tos }}}\n\t{{/ admin_form_tos }}\n\t{{^ admin_form_tos }}\n\t\t{{> partial__form_tos }}\n\t{{/ admin_form_tos }}\n</form>\n", data, partials);
}
module.exports.templateString = "<form\n\tmethod=\"post\"\n\tclass=\"sign-up__form w-100 needs-validation with-arrows\"\n\tdata-form-handler=\"handleSignup\"\n\tdata-action=\"https://{{ domains.api }}/auth/api/v1/smux/registrations\"\n\tnovalidate\n>\n\t{{# admin_form_input_fields }}\n\t\t{{{ admin_form_input_fields }}}\n\t{{/ admin_form_input_fields }}\n\t{{^ admin_form_input_fields }}\n\t\t{{> partial__form_input_fields }}\n\t{{/ admin_form_input_fields }}\n\n\t{{# admin_form_submit }}\n\t\t{{{ admin_form_submit }}}\n\t{{/ admin_form_submit }}\n\t{{^ admin_form_submit }}\n\t\t{{> partial__form_submit }}\n\t{{/ admin_form_submit }}\n\n\t{{> partial__form_sso }}\n\n\t{{# admin_form_tos }}\n\t\t{{{ admin_form_tos }}}\n\t{{/ admin_form_tos }}\n\t{{^ admin_form_tos }}\n\t\t{{> partial__form_tos }}\n\t{{/ admin_form_tos }}\n</form>\n";


/***/ }),

/***/ "../blocks/fpbk/sign-up/templates/form/inline.partial.mustache":
/*!*********************************************************************!*\
  !*** ../blocks/fpbk/sign-up/templates/form/inline.partial.mustache ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<form\n\t\tmethod=\"post\"\n\t\tclass=\"sign-up__form w-100 needs-validation with-arrows\"\n\t\tdata-form-handler=\"handleSignup\"\n\t\tdata-action=\"https://{{ domains.api }}/auth/api/v1/smux/registrations\"\n\t\tnovalidate\n>\n\t{{# admin_form_input_fields }}\n\t\t{{{ admin_form_input_fields }}}\n\t{{/ admin_form_input_fields }}\n\t{{^ admin_form_input_fields }}\n\t\t{{> partial__form_input_fields }}\n\t{{/ admin_form_input_fields }}\n\n\t{{# admin_form_tos }}\n\t\t{{{ admin_form_tos }}}\n\t{{/ admin_form_tos }}\n\t{{^ admin_form_tos }}\n\t\t{{> partial__form_tos }}\n\t{{/ admin_form_tos }}\n\n\t{{# admin_form_submit }}\n\t\t{{{ admin_form_submit }}}\n\t{{/ admin_form_submit }}\n\t{{^ admin_form_submit }}\n\t\t{{> partial__form_submit }}\n\t{{/ admin_form_submit }}\n</form>\n", data, partials);
}
module.exports.templateString = "<form\n\t\tmethod=\"post\"\n\t\tclass=\"sign-up__form w-100 needs-validation with-arrows\"\n\t\tdata-form-handler=\"handleSignup\"\n\t\tdata-action=\"https://{{ domains.api }}/auth/api/v1/smux/registrations\"\n\t\tnovalidate\n>\n\t{{# admin_form_input_fields }}\n\t\t{{{ admin_form_input_fields }}}\n\t{{/ admin_form_input_fields }}\n\t{{^ admin_form_input_fields }}\n\t\t{{> partial__form_input_fields }}\n\t{{/ admin_form_input_fields }}\n\n\t{{# admin_form_tos }}\n\t\t{{{ admin_form_tos }}}\n\t{{/ admin_form_tos }}\n\t{{^ admin_form_tos }}\n\t\t{{> partial__form_tos }}\n\t{{/ admin_form_tos }}\n\n\t{{# admin_form_submit }}\n\t\t{{{ admin_form_submit }}}\n\t{{/ admin_form_submit }}\n\t{{^ admin_form_submit }}\n\t\t{{> partial__form_submit }}\n\t{{/ admin_form_submit }}\n</form>\n";


/***/ }),

/***/ "../blocks/fpbk/sign-up/templates/form/sso.partial.mustache":
/*!******************************************************************!*\
  !*** ../blocks/fpbk/sign-up/templates/form/sso.partial.mustache ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"sign-up__divider position-relative w-100 mb-3 mt-2\">{{ labels.or }}</div>\n<a\n\t\thref=\"#\"\n\t\tdata-href=\"https://{{ domains.auth }}/service/auth/auth/apple?intent=sign_up\"\n\t\tclass=\"sso-signup_apple btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-2\"\n>\n\t{{{ logos.apple }}}\n\t{{ labels.sign_up_apple }}\n</a>\n\n<a\n\t\thref=\"#\"\n\t\tdata-href=\"https://{{ domains.auth }}/service/auth/auth/google_oauth2_central_sso?intent=sign_up\"\n\t\tclass=\"sso-signup_google btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-5\"\n>\n\t{{{ logos.google }}}\n\t{{ labels.sign_up_google }}\n</a>\n", data, partials);
}
module.exports.templateString = "<div class=\"sign-up__divider position-relative w-100 mb-3 mt-2\">{{ labels.or }}</div>\n<a\n\t\thref=\"#\"\n\t\tdata-href=\"https://{{ domains.auth }}/service/auth/auth/apple?intent=sign_up\"\n\t\tclass=\"sso-signup_apple btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-2\"\n>\n\t{{{ logos.apple }}}\n\t{{ labels.sign_up_apple }}\n</a>\n\n<a\n\t\thref=\"#\"\n\t\tdata-href=\"https://{{ domains.auth }}/service/auth/auth/google_oauth2_central_sso?intent=sign_up\"\n\t\tclass=\"sso-signup_google btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-5\"\n>\n\t{{{ logos.google }}}\n\t{{ labels.sign_up_google }}\n</a>\n";


/***/ }),

/***/ "../blocks/fpbk/sign-up/templates/fullscreen.partial.mustache":
/*!********************************************************************!*\
  !*** ../blocks/fpbk/sign-up/templates/fullscreen.partial.mustache ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("{{{ cookie_popup }}}\n\n{{> partial__mobile_banner }}\n\n<div class=\"sign-up__wrapper d-flex flex-column align-items-center text-center w-100 position-relative {{# include_sign_up_banner }} pt-promo{{/ include_sign_up_banner }}\">\n\t{{> partial__desktop_banner }}\n\n\t{{{ logos.sign_up_white }}}\n\t{{{ logos.sign_up }}}\n\n\t<h1 class=\"sign-up__heading mt-md-2\">{{ heading }}</h1>\n\t<h2 class=\"sign-up__sub-heading mb-4\">{{ sub_heading }}</h2>\n\t<div class=\"d-none d-md-block\">{{{ rating_desktop }}}</div>\n\t<div class=\"d-block d-md-none d-editor-none\">{{{ rating_mobile }}}</div>\n\n\t{{# admin_form }}\n\t\t{{{ admin_form }}}\n\t{{/ admin_form }}\n\t{{^ admin_form }}\n\t\t{{> partial__form_fullscreen }}\n\t{{/ admin_form }}\n\n\t<div class=\"sign-up__already-registered\">{{{ already_registered_text }}}</div>\n</div>\n\n{{# security_safeguards_link.url }}\n\t<a\n\t\tclass=\"sign-up__security-link mt-3\"\n\t\thref=\"{{ security_safeguards_link.url }}\"\n\t\ttarget=\"{{ security_safeguards_link.blank }}\"\n\t>\n\t\t{{{ logos.lock }}}\n\t\t{{ security_safeguards_link.title }}\n\t</a>\n{{/ security_safeguards_link.url }}\n{{^ security_safeguards_link.url }}\n\t<div class=\"position-relative sign-up__security-link\">\n\t\t<div class=\"position-absolute\">\n\t\t\t{{{ logos.lock }}}\n\t\t</div>\n\t\t{{{ security_safeguards_link }}}\n\t</div>\n{{/ security_safeguards_link.url }}\n", data, partials);
}
module.exports.templateString = "{{{ cookie_popup }}}\n\n{{> partial__mobile_banner }}\n\n<div class=\"sign-up__wrapper d-flex flex-column align-items-center text-center w-100 position-relative {{# include_sign_up_banner }} pt-promo{{/ include_sign_up_banner }}\">\n\t{{> partial__desktop_banner }}\n\n\t{{{ logos.sign_up_white }}}\n\t{{{ logos.sign_up }}}\n\n\t<h1 class=\"sign-up__heading mt-md-2\">{{ heading }}</h1>\n\t<h2 class=\"sign-up__sub-heading mb-4\">{{ sub_heading }}</h2>\n\t<div class=\"d-none d-md-block\">{{{ rating_desktop }}}</div>\n\t<div class=\"d-block d-md-none d-editor-none\">{{{ rating_mobile }}}</div>\n\n\t{{# admin_form }}\n\t\t{{{ admin_form }}}\n\t{{/ admin_form }}\n\t{{^ admin_form }}\n\t\t{{> partial__form_fullscreen }}\n\t{{/ admin_form }}\n\n\t<div class=\"sign-up__already-registered\">{{{ already_registered_text }}}</div>\n</div>\n\n{{# security_safeguards_link.url }}\n\t<a\n\t\tclass=\"sign-up__security-link mt-3\"\n\t\thref=\"{{ security_safeguards_link.url }}\"\n\t\ttarget=\"{{ security_safeguards_link.blank }}\"\n\t>\n\t\t{{{ logos.lock }}}\n\t\t{{ security_safeguards_link.title }}\n\t</a>\n{{/ security_safeguards_link.url }}\n{{^ security_safeguards_link.url }}\n\t<div class=\"position-relative sign-up__security-link\">\n\t\t<div class=\"position-absolute\">\n\t\t\t{{{ logos.lock }}}\n\t\t</div>\n\t\t{{{ security_safeguards_link }}}\n\t</div>\n{{/ security_safeguards_link.url }}\n";


/***/ }),

/***/ "../blocks/fpbk/sign-up/templates/inline.partial.mustache":
/*!****************************************************************!*\
  !*** ../blocks/fpbk/sign-up/templates/inline.partial.mustache ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"sign-up__wrapper_inline d-flex flex-column align-items-center text-center w-100 position-relative p-md-5 {{# include_sign_up_banner }} pt-promo{{/ include_sign_up_banner }}\">\n\n\t<h1 class=\"sign-up__heading sign-up__heading__inline mt-5 mt-md-2\">{{ heading }}</h1>\n\t<h2 class=\"sign-up__sub-heading sign-up__sub-heading__inline mb-4\">{{ sub_heading }}</h2>\n\n    {{# admin_form }}\n\t\t{{{ admin_form }}}\n\t{{/ admin_form }}\n\t{{^ admin_form }}\n\t\t{{> partial__form_inline }}\n\t{{/ admin_form }}\n</div>\n\n", data, partials);
}
module.exports.templateString = "<div class=\"sign-up__wrapper_inline d-flex flex-column align-items-center text-center w-100 position-relative p-md-5 {{# include_sign_up_banner }} pt-promo{{/ include_sign_up_banner }}\">\n\n\t<h1 class=\"sign-up__heading sign-up__heading__inline mt-5 mt-md-2\">{{ heading }}</h1>\n\t<h2 class=\"sign-up__sub-heading sign-up__sub-heading__inline mb-4\">{{ sub_heading }}</h2>\n\n    {{# admin_form }}\n\t\t{{{ admin_form }}}\n\t{{/ admin_form }}\n\t{{^ admin_form }}\n\t\t{{> partial__form_inline }}\n\t{{/ admin_form }}\n</div>\n\n";


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

/***/ 180:
/*!*************************************************!*\
  !*** multi ../blocks/fpbk/sign-up/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/sign-up/src/index.js */"../blocks/fpbk/sign-up/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-sign-up-index.js.map