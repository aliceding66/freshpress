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
/******/ 		"blocks-fpbk-feature-row-index": 0
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
/******/ 	deferredModules.push([120,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object"]);
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

/***/ "../blocks/fpbk/feature-row/block.json":
/*!*********************************************!*\
  !*** ../blocks/fpbk/feature-row/block.json ***!
  \*********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/feature-row\",\"title\":\"Feature Row\",\"category\":\"freshblocks\",\"description\":\"Two column feature row block, with an image and content column in any order.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/feature-row/src/_edit.js":
/*!***********************************************!*\
  !*** ../blocks/fpbk/feature-row/src/_edit.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _components_FeatureRowPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_FeatureRowPanel */ "../blocks/fpbk/feature-row/src/components/_FeatureRowPanel.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_content_partial_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/content.partial.mustache */ "../blocks/fpbk/feature-row/templates/content.partial.mustache");
/* harmony import */ var _templates_content_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_content_partial_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _templates_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/image.partial.mustache */ "../blocks/fpbk/feature-row/templates/image.partial.mustache");
/* harmony import */ var _templates_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_tabs_partial_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/tabs.partial.mustache */ "../blocks/fpbk/feature-row/templates/tabs.partial.mustache");
/* harmony import */ var _templates_tabs_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_tabs_partial_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _state_columns_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../state/columns/_actions */ "../blocks/fpbk/feature-row/state/columns/_actions.js");
/* harmony import */ var _state_columns_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../state/columns/_reducer */ "../blocks/fpbk/feature-row/state/columns/_reducer.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/feature-row/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/feature-row/block.json", 1);














/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  setAttributes
}) {
  var _columns$;

  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "feature-row container-fluid px-0' ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getCommonBlockSettingsClass"])(attributes))
  });

  if (!attributes.id || attributes.id === '') {
    setAttributes({
      id: Object(scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["generateBlockId"])(_block_json__WEBPACK_IMPORTED_MODULE_13__["name"])
    });
  }

  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_5__["BlockStateManager"](attributes, setAttributes);
  const [columns, columnDispatch] = blockStateManager.addReducerManager(_state_columns_reducer__WEBPACK_IMPORTED_MODULE_12__["default"], 'columns');
  const contentFirst = 'content' === columns[0] && ((_columns$ = columns[0]) === null || _columns$ === void 0 ? void 0 : _columns$.type);
  const reverseWrap = attributes.reverse_stack;
  const smWrapDirection = contentFirst && !reverseWrap || !contentFirst && reverseWrap ? 'flex-column' : 'flex-column-reverse';
  const partialTemplates = [];
  {
    columns.forEach((column, index) => {
      const partialTemplate = // eslint-disable-next-line no-nested-ternary
      column.type === 'content' ? _templates_content_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default.a : column.type === 'image' ? _templates_image_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a : _templates_tabs_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default.a;
      column.side = 0 === index ? 'start' : 'end';
      let alignGutter = 'text-center';

      if (column.align_to_gutter) {
        if ('start' === column.side) {
          alignGutter = 'text-left';
        } else {
          alignGutter = 'text-right';
        }
      }

      let tabbedCardsAttributes = {};

      if (Array.isArray(columns.cards) && columns.cards.length > 0) {
        tabbedCardsAttributes = column.cards;
      }

      partialTemplates.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__["default"], {
        attributes: { ...column
        },
        template: partialTemplate,
        components: {
          image: /*#__PURE__*/React.createElement("div", {
            className: "w-100 ".concat(alignGutter)
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Image, {
            inline: true,
            className: "feature-row__image img-fluid",
            value: column.image,
            onChange: value => columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_COLUMN_IMAGE"],
              index,
              value
            }),
            previewSize: "large"
          })),
          header: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
            isSimple: true,
            value: column.header,
            onChange: value => columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_COLUMN_HEADER"],
              index,
              value
            }),
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert header', 'freshpress-website')
          }),
          body: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
            value: column.body,
            onChange: value => columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_COLUMN_BODY"],
              index,
              value
            }),
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert body', 'freshpress-website')
          }),
          subtext: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
            isSimple: true,
            value: column.subtext,
            onChange: value => columnDispatch({
              type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_11__["EDIT_COLUMN_SUBTEXT"],
              index,
              value
            }),
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert subtext', 'freshpress-website')
          }),
          tabs_html: /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"], {
            template: [['fpbk/tabbed-cards', tabbedCardsAttributes]],
            templateLock: "all"
          })
        }
      }));
    });
  }
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Context.Provider, {
    value: {
      attributes,
      setAttributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_13__["name"]
    }
  }, /*#__PURE__*/React.createElement(_components_FeatureRowPanel__WEBPACK_IMPORTED_MODULE_6__["default"], {
    columns: columns,
    dispatch: columnDispatch
  }), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: "row d-flex ".concat(smWrapDirection, " flex-wrap flex-lg-row flex-lg-nowrap mx-auto")
  }, partialTemplates)));
});

/***/ }),

/***/ "../blocks/fpbk/feature-row/src/components/_FeatureRowPanel.js":
/*!*********************************************************************!*\
  !*** ../blocks/fpbk/feature-row/src/components/_FeatureRowPanel.js ***!
  \*********************************************************************/
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
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../state/columns/_actions */ "../blocks/fpbk/feature-row/state/columns/_actions.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







/* harmony default export */ __webpack_exports__["default"] = (props => {
  var _getBlockAttributesDe;

  const {
    columns = [],
    dispatch: columnDispatch
  } = props;
  const {
    blockName
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getEditorControlsContext"])();
  const columnsPanelBodyFields = [];
  const columnsDefinition = (_getBlockAttributesDe = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributesDefinitions"])(blockName)) === null || _getBlockAttributesDe === void 0 ? void 0 : _getBlockAttributesDe.columns;
  const typeFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(blockName, 'columns', 'type');
  const ctaFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(blockName, 'columns', 'cta');
  const secondaryCtaFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(blockName, 'columns', 'secondary_cta');
  const imageMobileMaxWidthFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(blockName, 'columns', 'image_mobile_max_width');
  const alignToGutterFieldDefinition = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_5__["getBlockAttributeSubfieldDefinition"])(blockName, 'columns', 'align_to_gutter');
  {
    columns.forEach((column, index) => {
      const typeFieldChoices = Object.fromEntries(Object.entries(typeFieldDefinition.choices).filter(([key]) => {
        const selectedTabs = columns.filter(c => c.type === 'tabs').length;
        return key !== 'tabs' || column.type === 'tabs' || selectedTabs === 0;
      }));
      columnsPanelBodyFields.push( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Select, _extends({}, typeFieldDefinition, {
        choices: typeFieldChoices,
        value: column.type,
        onChange: value => columnDispatch({
          type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_COLUMN_TYPE"],
          index,
          value
        })
      })), 'content' === column.type && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        value: column.cta,
        label: ctaFieldDefinition.label,
        instructions: ctaFieldDefinition.instructions,
        onChange: value => columnDispatch({
          type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_COLUMN_CTA"],
          index,
          value
        })
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        value: column.secondary_cta,
        label: secondaryCtaFieldDefinition.label,
        instructions: secondaryCtaFieldDefinition.instructions,
        onChange: value => columnDispatch({
          type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_COLUMN_SECONDARY_CTA"],
          index,
          value
        })
      })), 'image' === column.type && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Text, {
        value: column.image_mobile_max_width,
        label: imageMobileMaxWidthFieldDefinition.label,
        help: imageMobileMaxWidthFieldDefinition.instructions,
        onChange: value => columnDispatch({
          type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH"],
          index,
          value
        })
      }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
        value: column.align_to_gutter,
        label: alignToGutterFieldDefinition.label,
        help: alignToGutterFieldDefinition.instructions,
        onChange: value => columnDispatch({
          type: _state_columns_actions__WEBPACK_IMPORTED_MODULE_4__["EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER"],
          index,
          value
        })
      }))));
    });
  }
  return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    title: columnsDefinition.label,
    initialyOpened: true
  }, columnsPanelBodyFields), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Accordion, {
    name: "block_settings"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.CommonBlockSettings, null));
});

/***/ }),

/***/ "../blocks/fpbk/feature-row/src/editor.scss":
/*!**************************************************!*\
  !*** ../blocks/fpbk/feature-row/src/editor.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/feature-row/src/index.js":
/*!***********************************************!*\
  !*** ../blocks/fpbk/feature-row/src/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/feature-row/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/feature-row/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/feature-row/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/feature-row/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/feature-row/src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! images/logos/freshbooks-logomark-reacty.svg */ "./images/logos/freshbooks-logomark-reacty.svg");







const {
  name: blockName,
  ...restConfig
} = _block_json__WEBPACK_IMPORTED_MODULE_2__;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])(blockName, { ...restConfig,
  icon: /*#__PURE__*/React.createElement("img", {
    src: images_logos_freshbooks_logomark_reacty_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
    alt: "FreshBooks Logo"
  }),
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].Content, null)
});

/***/ }),

/***/ "../blocks/fpbk/feature-row/src/style.scss":
/*!*************************************************!*\
  !*** ../blocks/fpbk/feature-row/src/style.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/feature-row/state/columns/_actions.js":
/*!************************************************************!*\
  !*** ../blocks/fpbk/feature-row/state/columns/_actions.js ***!
  \************************************************************/
/*! exports provided: EDIT_COLUMN_TYPE, EDIT_COLUMN_IMAGE, EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH, EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER, EDIT_COLUMN_HEADER, EDIT_COLUMN_BODY, EDIT_COLUMN_SUBTEXT, EDIT_COLUMN_CTA, EDIT_COLUMN_SECONDARY_CTA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_TYPE", function() { return EDIT_COLUMN_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_IMAGE", function() { return EDIT_COLUMN_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH", function() { return EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER", function() { return EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_HEADER", function() { return EDIT_COLUMN_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_BODY", function() { return EDIT_COLUMN_BODY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_SUBTEXT", function() { return EDIT_COLUMN_SUBTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_CTA", function() { return EDIT_COLUMN_CTA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_COLUMN_SECONDARY_CTA", function() { return EDIT_COLUMN_SECONDARY_CTA; });
const EDIT_COLUMN_TYPE = 'ect';
const EDIT_COLUMN_IMAGE = 'eci';
const EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH = 'ecimmw';
const EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER = 'eciatg';
const EDIT_COLUMN_HEADER = 'ech';
const EDIT_COLUMN_BODY = 'ecd';
const EDIT_COLUMN_SUBTEXT = 'ecst';
const EDIT_COLUMN_CTA = 'ecc';
const EDIT_COLUMN_SECONDARY_CTA = 'ecsc';

/***/ }),

/***/ "../blocks/fpbk/feature-row/state/columns/_reducer.js":
/*!************************************************************!*\
  !*** ../blocks/fpbk/feature-row/state/columns/_reducer.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_actions */ "../blocks/fpbk/feature-row/state/columns/_actions.js");

/* harmony default export */ __webpack_exports__["default"] = ((state, action) => {
  const editAtIndex = fieldName => {
    return state.map((item, i) => i === action.index ? { ...item,
      [fieldName]: action.value
    } : item);
  };

  switch (action.type) {
    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_TYPE"]:
      return editAtIndex('type');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_IMAGE"]:
      return editAtIndex('image');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH"]:
      return editAtIndex('image_mobile_max_width');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER"]:
      return editAtIndex('align_to_gutter');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_HEADER"]:
      return editAtIndex('header');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_BODY"]:
      return editAtIndex('body');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_SUBTEXT"]:
      return editAtIndex('subtext');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_CTA"]:
      return editAtIndex('cta');

    case _actions__WEBPACK_IMPORTED_MODULE_0__["EDIT_COLUMN_SECONDARY_CTA"]:
      return editAtIndex('secondary_cta');

    default:
      return state;
  }
});

/***/ }),

/***/ "../blocks/fpbk/feature-row/templates/content.partial.mustache":
/*!*********************************************************************!*\
  !*** ../blocks/fpbk/feature-row/templates/content.partial.mustache ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-row__column_content col-12 col-lg-6 align-items-center d-flex flex-wrap flex-lg-nowrap flex-row justify-content-lg-{{ side }} mx-0 px-0\">\n\t<div class=\"feature-row__content d-flex flex-wrap flex-column align-items-center align-items-lg-start justify-content-center text-center text-lg-left mx-auto px-2\">\n\t\t{{# header }}\n\t\t\t<{{ heading_tag }} class=\"h2 mb-2 mb-md-3 mb-lg-4\">{{ header }}</{{ heading_tag }}>\n\t\t{{/ header }}\n\n\t\t{{# body }}\n\t\t\t<div class=\"feature-row__content_body\">{{{ body }}}</div>\n\t\t{{/ body }}\n\n\t\t{{# cta.html }}\n\t\t\t{{{ cta.html }}}\n\t\t{{/ cta.html }}\n\n\t\t{{# secondary_cta.html }}\n\t\t\t<div class=\"feature-row__cta my-2\">\n\t\t\t\t{{{ secondary_cta.html }}}\n\t\t\t</div>\n\t\t{{/ secondary_cta.html }}\n\n\t\t{{# subtext }}\n\t\t\t<span class=\"subtext align-self-lg-start\">{{{ subtext }}}</span>\n\t\t{{/ subtext }}\n\t</div>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-row__column_content col-12 col-lg-6 align-items-center d-flex flex-wrap flex-lg-nowrap flex-row justify-content-lg-{{ side }} mx-0 px-0\">\n\t<div class=\"feature-row__content d-flex flex-wrap flex-column align-items-center align-items-lg-start justify-content-center text-center text-lg-left mx-auto px-2\">\n\t\t{{# header }}\n\t\t\t<{{ heading_tag }} class=\"h2 mb-2 mb-md-3 mb-lg-4\">{{ header }}</{{ heading_tag }}>\n\t\t{{/ header }}\n\n\t\t{{# body }}\n\t\t\t<div class=\"feature-row__content_body\">{{{ body }}}</div>\n\t\t{{/ body }}\n\n\t\t{{# cta.html }}\n\t\t\t{{{ cta.html }}}\n\t\t{{/ cta.html }}\n\n\t\t{{# secondary_cta.html }}\n\t\t\t<div class=\"feature-row__cta my-2\">\n\t\t\t\t{{{ secondary_cta.html }}}\n\t\t\t</div>\n\t\t{{/ secondary_cta.html }}\n\n\t\t{{# subtext }}\n\t\t\t<span class=\"subtext align-self-lg-start\">{{{ subtext }}}</span>\n\t\t{{/ subtext }}\n\t</div>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/feature-row/templates/image.partial.mustache":
/*!*******************************************************************!*\
  !*** ../blocks/fpbk/feature-row/templates/image.partial.mustache ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-row__column_image feature-row__image--{{ side }} col-12 col-lg-6 align-items-center d-flex flex-wrap flex-lg-nowrap flex-row justify-content-lg-{{ side }} mx-0 px-0 my-4 my-lg-0\">\n\t{{# image_mobile_max_width }}\n\t\t<style>\n\t\t\t@media screen and (max-width: 767px) {\n\t\t\t\t#{{ id }} .feature-row__image--{{ side }} {\n\t\t\t  \t\tmax-width: {{ image_mobile_max_width }}px !important;\n\t\t\t\t\tmargin-left: auto !important;\n\t\t\t\t\tmargin-right: auto !important;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t{{/ image_mobile_max_width }}\n\t{{{ image }}}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-row__column_image feature-row__image--{{ side }} col-12 col-lg-6 align-items-center d-flex flex-wrap flex-lg-nowrap flex-row justify-content-lg-{{ side }} mx-0 px-0 my-4 my-lg-0\">\n\t{{# image_mobile_max_width }}\n\t\t<style>\n\t\t\t@media screen and (max-width: 767px) {\n\t\t\t\t#{{ id }} .feature-row__image--{{ side }} {\n\t\t\t  \t\tmax-width: {{ image_mobile_max_width }}px !important;\n\t\t\t\t\tmargin-left: auto !important;\n\t\t\t\t\tmargin-right: auto !important;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t{{/ image_mobile_max_width }}\n\t{{{ image }}}\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/feature-row/templates/tabs.partial.mustache":
/*!******************************************************************!*\
  !*** ../blocks/fpbk/feature-row/templates/tabs.partial.mustache ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"feature-row__column_tabs col-12 col-lg-6 align-items-center d-flex feature-row__column_tabs flex-row justify-content-center\">\n\t{{{ tabs_html }}}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"feature-row__column_tabs col-12 col-lg-6 align-items-center d-flex feature-row__column_tabs flex-row justify-content-center\">\n\t{{{ tabs_html }}}\n</div>\n";


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

/***/ 120:
/*!*****************************************************!*\
  !*** multi ../blocks/fpbk/feature-row/src/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/feature-row/src/index.js */"../blocks/fpbk/feature-row/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-feature-row-index.js.map