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
/******/ 		"blocks-fpbk-modal-index": 0
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
/******/ 	deferredModules.push([156,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/modal/block.json":
/*!***************************************!*\
  !*** ../blocks/fpbk/modal/block.json ***!
  \***************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, styles, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/modal\",\"title\":\"Modal\",\"category\":\"freshblocks\",\"description\":\"Global modal element.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true},\"styles\":[{\"name\":\"default\",\"label\":\"Default\",\"isDefault\":true},{\"name\":\"with-stages\",\"label\":\"Modal with Stages\"}]}");

/***/ }),

/***/ "../blocks/fpbk/modal/src/_edit.js":
/*!*****************************************!*\
  !*** ../blocks/fpbk/modal/src/_edit.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _templates_stage_partial_mustache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/stage.partial.mustache */ "../blocks/fpbk/modal/templates/stage.partial.mustache");
/* harmony import */ var _templates_stage_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_templates_stage_partial_mustache__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/modal/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/modal/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/modal/block.json", 1);









 // eslint-disable-next-line @wordpress/no-global-event-listener

window.addEventListener('message', e => {
  if (e && e.data) {
    const pardotIframe = document.querySelector('.pardot-form__iframe');

    if (pardotIframe && e.data.frameHeight) {
      pardotIframe.style.height = "".concat(e.data.frameHeight, "px");
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  const blockPropsAttributes = {
    className: "modal my-0 ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getCommonBlockSettingsClass"])(attributes))
  };

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_6__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_9__["name"])
    });
  }

  if (attributes.modal_form_include) {
    blockPropsAttributes.className += ' modal_with-form';
  }

  if (attributes.modal_pardot) {
    blockPropsAttributes.className += ' pardot_modal';
  }

  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])(blockPropsAttributes);
  const isWithStagesTheme = blockProps === null || blockProps === void 0 ? void 0 : blockProps.className.includes('is-style-with-stages'); // eslint-disable-next-line no-undef

  const templateData = { ...modalTemplateData,
    ...attributes
  };

  if (templateData.modal_stages) {
    templateData.modal_stages.forEach((stage, index) => {
      if (stage.list_text) {
        templateData.modal_stages[index].list_items = stage.list_text.split(';\n');
      }
    });
  }

  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_9__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement("p", {
    className: "text-center"
  }, "Modal ID: ", attributes.id), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, !!isWithStagesTheme && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Repeater, {
    name: "modal_stages",
    buttonLabel: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add Stage', 'freshpress-website')
  }), !!attributes.modal_form_include && !isWithStagesTheme && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
    name: "pardot_form_url"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Number, {
    name: "pardot_form_iframe_width"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
    name: "pardot_form_form_name"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "pardot_form_no_close"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Accordion, {
    name: "visibility_&_behaviour"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, isWithStagesTheme ? /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    attributes: templateData,
    components: {
      modal_stages: /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__["default"], {
        template: _templates_stage_partial_mustache__WEBPACK_IMPORTED_MODULE_7___default.a,
        attributes: templateData
      })
    }
  }) : /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    attributes: templateData,
    components: {
      modal_title: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "modal_title",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert title', 'freshpress-website')
      }),
      modal_content_heading: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "modal_content_heading",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert content heading', 'freshpress-website')
      }),
      modal_description: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "modal_description",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert description', 'freshpress-website')
      }),
      modal_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        inline: true,
        className: "btn btn-cta-green btn-block btn-lg mt-4 mt-sm-5 modal__cta mx-auto",
        name: "modal_cta"
      }),
      modal_bottom_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "modal_bottom_text",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert bottom text', 'freshpress-website')
      }),
      modal_close_link_text: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "modal_close_link_text",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Insert close modal text', 'freshpress-website')
      }),
      pardot_form: /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], {
        template: [['fpbk/pardot-form', {
          pardot_form_url: attributes.pardot_form_url,
          pardot_form_iframe_width: attributes.pardot_form_iframe_width,
          pardot_form_form_name: attributes.pardot_form_form_name
        }]],
        templateLock: "all"
      })
    }
  })));
});

/***/ }),

/***/ "../blocks/fpbk/modal/src/editor.scss":
/*!********************************************!*\
  !*** ../blocks/fpbk/modal/src/editor.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/modal/src/index.js":
/*!*****************************************!*\
  !*** ../blocks/fpbk/modal/src/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/modal/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/modal/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/modal/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/modal/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/modal/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_4__);
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

/***/ "../blocks/fpbk/modal/src/style.scss":
/*!*******************************************!*\
  !*** ../blocks/fpbk/modal/src/style.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/modal/templates/block.mustache":
/*!*****************************************************!*\
  !*** ../blocks/fpbk/modal/templates/block.mustache ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"modal__dialog modal-dialog modal-dialog-centered {{^ is_with_stages_theme }}modal-lg{{/ is_with_stages_theme }}{{# is_with_stages_theme }}modal-md{{/ is_with_stages_theme }}\" role=\"document\">\n\t<div class=\"modal__content modal-content text-center\">\n\t\t{{^ is_with_stages_theme }}\n\t\t\t{{# modal_title }}\n\t\t\t\t<div class=\"modal__header modal-header\">\n\t\t\t\t\t<h2 class=\"modal-title w-100 pt-4\">{{ modal_title }}</h2>\n\t\t\t\t</div>\n\t\t\t{{/ modal_title }}\n\t\t{{/ is_with_stages_theme }}\n\t\t<div class=\"modal__body modal-body position-static mx-auto text-center py-5 {{^ is_with_stages_theme }}px-3 px-sm-5{{/ is_with_stages_theme }}\">\n\t\t\t{{# is_with_stages_theme }}\n\t\t\t\t<div class=\"modal__stages d-flex flex-column justify-content-center\">\n\t\t\t\t\t{{# modal_stages }}\n\t\t\t\t\t\t{{> partial__stage }}\n\t\t\t\t\t{{/ modal_stages }}\n\t\t\t\t</div>\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t{{^ is_with_stages_theme }}\n\t\t\t\t{{# modal_content_heading }}\n\t\t\t\t\t<h3 class=\"modal__content-heading px-0 px-sm-5 px-lg-0 mb-3\">{{ modal_content_heading }}</h3>\n\t\t\t\t{{/ modal_content_heading }}\n\n\t\t\t\t{{# modal_description }}\n\t\t\t\t\t<p class=\"mt-3\">{{ modal_description }}</p>\n\t\t\t\t{{/ modal_description }}\n\n\t\t\t\t{{# modal_cta.html }}\n\t\t\t\t\t{{{ modal_cta.html }}}\n\t\t\t\t{{/ modal_cta.html }}\n\t\t\t\t{{^ modal_cta.html }}\n\t\t\t\t\t{{{ modal_cta }}}\n\t\t\t\t{{/ modal_cta.html }}\n\n\t\t\t\t{{# modal_form_include }}\n\t\t\t\t\t{{{ pardot_form }}}\n\t\t\t\t{{/ modal_form_include }}\n\n\t\t\t\t{{# modal_bottom_text }}\n\t\t\t\t\t<p class=\"mb-4 modal__bottom-text\">{{{ modal_bottom_text }}}</p>\n\t\t\t\t{{/ modal_bottom_text }}\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t{{# modal_close_link_text }}\n\t\t\t\t<a data-dismiss=\"modal\" href=\"#\"\n\t\t\t\t   class=\"modal__close-link d-inline-block mt-3\">{{ modal_close_link_text }}</a>\n\t\t\t{{/ modal_close_link_text }}\n\t\t</div>\n\t\t<button\n\t\t\t\tdata-dismiss=\"modal\"\n\t\t\t\tclass=\"modal__close-button position-absolute\"\n\t\t\t\tstyle=\"{{# modal_close_button_colour }}color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t>\n\t\t\t{{^ is_with_stages_theme }}\n\t\t\t\t{{ close_label }}\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t<span\n\t\t\t\t\tclass=\"position-absolute\"\n\t\t\t\t\tstyle=\"{{# modal_close_button_colour }}background-color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t\t></span>\n\t\t\t<span\n\t\t\t\t\tclass=\"position-absolute\"\n\t\t\t\t\tstyle=\"{{# modal_close_button_colour }}background-color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t\t></span>\n\t\t</button>\n\t</div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"modal__dialog modal-dialog modal-dialog-centered {{^ is_with_stages_theme }}modal-lg{{/ is_with_stages_theme }}{{# is_with_stages_theme }}modal-md{{/ is_with_stages_theme }}\" role=\"document\">\n\t<div class=\"modal__content modal-content text-center\">\n\t\t{{^ is_with_stages_theme }}\n\t\t\t{{# modal_title }}\n\t\t\t\t<div class=\"modal__header modal-header\">\n\t\t\t\t\t<h2 class=\"modal-title w-100 pt-4\">{{ modal_title }}</h2>\n\t\t\t\t</div>\n\t\t\t{{/ modal_title }}\n\t\t{{/ is_with_stages_theme }}\n\t\t<div class=\"modal__body modal-body position-static mx-auto text-center py-5 {{^ is_with_stages_theme }}px-3 px-sm-5{{/ is_with_stages_theme }}\">\n\t\t\t{{# is_with_stages_theme }}\n\t\t\t\t<div class=\"modal__stages d-flex flex-column justify-content-center\">\n\t\t\t\t\t{{# modal_stages }}\n\t\t\t\t\t\t{{> partial__stage }}\n\t\t\t\t\t{{/ modal_stages }}\n\t\t\t\t</div>\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t{{^ is_with_stages_theme }}\n\t\t\t\t{{# modal_content_heading }}\n\t\t\t\t\t<h3 class=\"modal__content-heading px-0 px-sm-5 px-lg-0 mb-3\">{{ modal_content_heading }}</h3>\n\t\t\t\t{{/ modal_content_heading }}\n\n\t\t\t\t{{# modal_description }}\n\t\t\t\t\t<p class=\"mt-3\">{{ modal_description }}</p>\n\t\t\t\t{{/ modal_description }}\n\n\t\t\t\t{{# modal_cta.html }}\n\t\t\t\t\t{{{ modal_cta.html }}}\n\t\t\t\t{{/ modal_cta.html }}\n\t\t\t\t{{^ modal_cta.html }}\n\t\t\t\t\t{{{ modal_cta }}}\n\t\t\t\t{{/ modal_cta.html }}\n\n\t\t\t\t{{# modal_form_include }}\n\t\t\t\t\t{{{ pardot_form }}}\n\t\t\t\t{{/ modal_form_include }}\n\n\t\t\t\t{{# modal_bottom_text }}\n\t\t\t\t\t<p class=\"mb-4 modal__bottom-text\">{{{ modal_bottom_text }}}</p>\n\t\t\t\t{{/ modal_bottom_text }}\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t{{# modal_close_link_text }}\n\t\t\t\t<a data-dismiss=\"modal\" href=\"#\"\n\t\t\t\t   class=\"modal__close-link d-inline-block mt-3\">{{ modal_close_link_text }}</a>\n\t\t\t{{/ modal_close_link_text }}\n\t\t</div>\n\t\t<button\n\t\t\t\tdata-dismiss=\"modal\"\n\t\t\t\tclass=\"modal__close-button position-absolute\"\n\t\t\t\tstyle=\"{{# modal_close_button_colour }}color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t>\n\t\t\t{{^ is_with_stages_theme }}\n\t\t\t\t{{ close_label }}\n\t\t\t{{/ is_with_stages_theme }}\n\t\t\t<span\n\t\t\t\t\tclass=\"position-absolute\"\n\t\t\t\t\tstyle=\"{{# modal_close_button_colour }}background-color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t\t></span>\n\t\t\t<span\n\t\t\t\t\tclass=\"position-absolute\"\n\t\t\t\t\tstyle=\"{{# modal_close_button_colour }}background-color: {{ modal_close_button_colour.hex }};{{/ modal_close_button_colour }}\"\n\t\t\t></span>\n\t\t</button>\n\t</div>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/modal/templates/stage.partial.mustache":
/*!*************************************************************!*\
  !*** ../blocks/fpbk/modal/templates/stage.partial.mustache ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"modal__stage position-relative w-100 px-3 px-sm-5 d-flex flex-column align-items-center {{# first_stage }}active{{/ first_stage }}\">\n\t{{# heading }}\n\t\t<h3 class=\"modal__content-heading modal__content-heading_stages px-0 px-sm-5 px-lg-0 mb-0\">{{ heading }}</h3>\n\t{{/ heading }}\n\n\t{{# description }}\n\t\t<p class=\"modal__description mt-3\">{{ description }}</p>\n\t{{/ description }}\n\n\t{{# has_list_items }}\n\t\t<ul class=\"modal__list\">\n\t\t\t{{# list_items }}\n\t\t\t\t<li class=\"list-item\">{{ . }}</li>\n\t\t\t{{/ list_items }}\n\t\t</ul>\n\t{{/ has_list_items }}\n\n\t{{# include_form }}\n\t\t{{{ stage_pardot_form }}}\n\t{{/ include_form }}\n\n\t{{# next_stage_button_text }}\n\t\t<a data-stage=\"next\" href=\"#0\"\n\t\t   class=\"modal__next-stage btn btn-cta-green d-inline-block mt-3\">{{ next_stage_button_text }}</a>\n\t{{/ next_stage_button_text }}\n\n\t{{# close_modal_button_text }}\n\t\t<a data-dismiss=\"modal\" href=\"#0\"\n\t\t   class=\"modal__close btn btn-white d-inline-block mt-3\">{{ close_modal_button_text }}</a>\n\t{{/ close_modal_button_text }}\n\n\t{{# close_modal_text }}\n\t\t<a data-dismiss=\"modal\" href=\"#0\"\n\t\t   class=\"modal__close-link d-inline-block mt-2\">{{ close_modal_text }}</a>\n\t{{/ close_modal_text }}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"modal__stage position-relative w-100 px-3 px-sm-5 d-flex flex-column align-items-center {{# first_stage }}active{{/ first_stage }}\">\n\t{{# heading }}\n\t\t<h3 class=\"modal__content-heading modal__content-heading_stages px-0 px-sm-5 px-lg-0 mb-0\">{{ heading }}</h3>\n\t{{/ heading }}\n\n\t{{# description }}\n\t\t<p class=\"modal__description mt-3\">{{ description }}</p>\n\t{{/ description }}\n\n\t{{# has_list_items }}\n\t\t<ul class=\"modal__list\">\n\t\t\t{{# list_items }}\n\t\t\t\t<li class=\"list-item\">{{ . }}</li>\n\t\t\t{{/ list_items }}\n\t\t</ul>\n\t{{/ has_list_items }}\n\n\t{{# include_form }}\n\t\t{{{ stage_pardot_form }}}\n\t{{/ include_form }}\n\n\t{{# next_stage_button_text }}\n\t\t<a data-stage=\"next\" href=\"#0\"\n\t\t   class=\"modal__next-stage btn btn-cta-green d-inline-block mt-3\">{{ next_stage_button_text }}</a>\n\t{{/ next_stage_button_text }}\n\n\t{{# close_modal_button_text }}\n\t\t<a data-dismiss=\"modal\" href=\"#0\"\n\t\t   class=\"modal__close btn btn-white d-inline-block mt-3\">{{ close_modal_button_text }}</a>\n\t{{/ close_modal_button_text }}\n\n\t{{# close_modal_text }}\n\t\t<a data-dismiss=\"modal\" href=\"#0\"\n\t\t   class=\"modal__close-link d-inline-block mt-2\">{{ close_modal_text }}</a>\n\t{{/ close_modal_text }}\n</div>\n";


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

/***/ 156:
/*!***********************************************!*\
  !*** multi ../blocks/fpbk/modal/src/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/modal/src/index.js */"../blocks/fpbk/modal/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-modal-index.js.map