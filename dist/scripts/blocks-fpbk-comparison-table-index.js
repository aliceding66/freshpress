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
/******/ 		"blocks-fpbk-comparison-table-index": 0
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
/******/ 	deferredModules.push([96,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object","vendor-validator","vendor-is-plain-obj"]);
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

/***/ "../blocks/fpbk/comparison-table/block.json":
/*!**************************************************!*\
  !*** ../blocks/fpbk/comparison-table/block.json ***!
  \**************************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/comparison-table\",\"title\":\"Comparison Table\",\"category\":\"freshblocks\",\"description\":\"A table to compare points across multiple options.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/comparison-table/src/_edit.js":
/*!****************************************************!*\
  !*** ../blocks/fpbk/comparison-table/src/_edit.js ***!
  \****************************************************/
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
/* harmony import */ var _utils_csv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/_csv */ "../blocks/fpbk/comparison-table/src/utils/_csv.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../templates/block.mustache */ "../blocks/fpbk/comparison-table/templates/block.mustache");
/* harmony import */ var _templates_block_mustache__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_templates_block_mustache__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _templates_plan_header_partial_mustache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../templates/plan_header.partial.mustache */ "../blocks/fpbk/comparison-table/templates/plan_header.partial.mustache");
/* harmony import */ var _templates_plan_header_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_templates_plan_header_partial_mustache__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _templates_plan_cell_partial_mustache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../templates/plan_cell.partial.mustache */ "../blocks/fpbk/comparison-table/templates/plan_cell.partial.mustache");
/* harmony import */ var _templates_plan_cell_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_templates_plan_cell_partial_mustache__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _templates_comparison_table_partial_mustache__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../templates/comparison_table.partial.mustache */ "../blocks/fpbk/comparison-table/templates/comparison_table.partial.mustache");
/* harmony import */ var _templates_comparison_table_partial_mustache__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_templates_comparison_table_partial_mustache__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/comparison-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_11___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/comparison-table/block.json", 1);












const adminData = {
  admin: true,
  edit_on_sidebar_label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Edit on Sidebar', 'freshpress-website')
};
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  var _comparisonTableTempl;

  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["useBlockProps"])({
    className: "comparison-table position-relative px-0 px-xl-3 mx-lg-auto ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getCommonBlockSettingsClass"])(attributes))
  });
  const headerPartials = [];
  headerPartials.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    template: _templates_plan_header_partial_mustache__WEBPACK_IMPORTED_MODULE_8___default.a,
    components: {
      plan_header_trial_cell_title: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        name: "plan_header_trial_cell_title",
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Insert title', 'freshpress-website')
      }),
      plan_header_trial_cell_buy_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        inline: true,
        className: "btn btn-cta-green d-inline-block mr-1",
        name: "plan_header_trial_cell_buy_cta"
      }),
      plan_header_trial_cell_promo_buy_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        inline: true,
        className: "btn btn-cta-green d-inline-block mr-3",
        name: "plan_header_trial_cell_promo_buy_cta"
      }),
      plan_header_trial_cell_trial_cta: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Link, {
        inline: true,
        className: "btn btn-outline-grey ml-1",
        name: "plan_header_trial_cell_trial_cta"
      })
    }
  }));
  attributes.plan_header_plan_cells.forEach(planCell => {
    headerPartials.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
      attributes: { ...planCell,
        ...adminData,
        enable_promo: attributes.enable_promo
      },
      template: _templates_plan_cell_partial_mustache__WEBPACK_IMPORTED_MODULE_9___default.a
    }));
  });
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_11__["name"],
      clientId,
      setAttributes
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TrueFalse, {
    name: "enable_promo"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.Repeater, {
    name: "plan_header_plan_cells"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].TextArea, {
    name: "base_comparison_info",
    rows: 10
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
    className: "comparison-table__header-sticky table-sticky-header sticky-top"
  }, /*#__PURE__*/React.createElement("table", {
    className: "comparison-table__header-table table table-borderless table-responsive-lg mb-0 w-100"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "comparison-table__header-row"
  }, /*#__PURE__*/React.createElement("tr", null, headerPartials)))), /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_6__["default"], {
    template: _templates_block_mustache__WEBPACK_IMPORTED_MODULE_7___default.a,
    attributes: { ...attributes,
      comparison_table: Object(_utils_csv__WEBPACK_IMPORTED_MODULE_5__["fpFormatComparisonData"])(attributes.base_comparison_info, // eslint-disable-next-line no-undef
      (_comparisonTableTempl = comparisonTableTemplateData) === null || _comparisonTableTempl === void 0 ? void 0 : _comparisonTableTempl.icons)
    },
    partials: {
      partial__comparison_table: _templates_comparison_table_partial_mustache__WEBPACK_IMPORTED_MODULE_10__["templateString"]
    }
  })));
});

/***/ }),

/***/ "../blocks/fpbk/comparison-table/src/index.js":
/*!****************************************************!*\
  !*** ../blocks/fpbk/comparison-table/src/index.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/comparison-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/comparison-table/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/comparison-table/src/_edit.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/comparison-table/src/style.scss");
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

/***/ "../blocks/fpbk/comparison-table/src/style.scss":
/*!******************************************************!*\
  !*** ../blocks/fpbk/comparison-table/src/style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/comparison-table/src/utils/_csv.js":
/*!*********************************************************!*\
  !*** ../blocks/fpbk/comparison-table/src/utils/_csv.js ***!
  \*********************************************************/
/*! exports provided: fpFormatComparisonData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpFormatComparisonData", function() { return fpFormatComparisonData; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_csv */ "./scripts/helpers/_csv.js");


const featureColsFilling = [1, 2, 3, 4];
const fpFormatComparisonData = (csvText, icons) => {
  const csv = Object(scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__["fpParseCsv"])(csvText);
  const csvData = csv.data;
  const data = [];
  let currentSection = {
    rows: [],
    not_last_section: true,
    feature_col_ids: featureColsFilling
  };
  let previousSectionTitle = '';
  csvData.forEach(row => {
    const currentSectionTitle = row.get('category');
    const bullet = row.get('bullet');
    const featureValues = [];
    let infoTooltipHtml = null;
    row.forEach((value, key) => {
      if (key !== 'category' && key !== 'bullet' && key !== 'tooltip') {
        const rowValue = Object(scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__["fpFormatVartype"])(value);

        if (rowValue === true) {
          featureValues.push({
            feature_value: icons.checkmark,
            row_key: 'row_key'
          });
        } else if (rowValue === false) {
          featureValues.push({
            feature_value: null,
            row_key: 'row_key'
          });
        } else {
          featureValues.push({
            feature_value: rowValue,
            row_key: 'row_key'
          });
        }
      } else if (key === 'tooltip') {
        let tooltipValue = Object(scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__["fpFormatVartype"])(value);

        if (tooltipValue && typeof tooltipValue === 'string') {
          tooltipValue = tooltipValue.replace(/"/g, '\\"').replace(/\\"/g, '').replace(/"\\/g, '');
          infoTooltipHtml = "\n\t\t\t\t\t\t<div class=\"info-tooltip__button p-0 border-0\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"".concat(tooltipValue, "\">\n\t\t\t\t\t\t\t").concat(icons.info, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
        }
      }
    });

    if (currentSectionTitle !== previousSectionTitle) {
      if (previousSectionTitle !== '') {
        data.push(currentSection);
        currentSection = {
          rows: [],
          not_last_section: true,
          feature_col_ids: featureColsFilling
        };
      }

      currentSection.section_title = currentSectionTitle;
      previousSectionTitle = currentSectionTitle;
    }

    currentSection.rows.push({
      features: bullet,
      feature_values: featureValues,
      info_tooltip_html: infoTooltipHtml
    });
  });
  data.push(currentSection);
  return data;
};

/***/ }),

/***/ "../blocks/fpbk/comparison-table/templates/block.mustache":
/*!****************************************************************!*\
  !*** ../blocks/fpbk/comparison-table/templates/block.mustache ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"comparison-table__header-sticky table-sticky-header sticky-top\">\n\t<table class=\"comparison-table__header-table table table-borderless table-responsive-lg mb-0 w-100\">\n\t\t<thead class=\"comparison-table__header-row\">\n\t\t\t<tr>\n\t\t\t\t{{> partial__plan_header }}\n\t\t\t\t{{# plan_header_plan_cells }}\n\t\t\t\t\t{{> partial__plan_cell }}\n\t\t\t\t{{/ plan_header_plan_cells }}\n\t\t\t</tr>\n\t\t</thead>\n\t</table>\n</div>\n\n{{# comparison_table }}\n\t{{> partial__comparison_table }}\n{{/ comparison_table }}\n", data, partials);
}
module.exports.templateString = "<div class=\"comparison-table__header-sticky table-sticky-header sticky-top\">\n\t<table class=\"comparison-table__header-table table table-borderless table-responsive-lg mb-0 w-100\">\n\t\t<thead class=\"comparison-table__header-row\">\n\t\t\t<tr>\n\t\t\t\t{{> partial__plan_header }}\n\t\t\t\t{{# plan_header_plan_cells }}\n\t\t\t\t\t{{> partial__plan_cell }}\n\t\t\t\t{{/ plan_header_plan_cells }}\n\t\t\t</tr>\n\t\t</thead>\n\t</table>\n</div>\n\n{{# comparison_table }}\n\t{{> partial__comparison_table }}\n{{/ comparison_table }}\n";


/***/ }),

/***/ "../blocks/fpbk/comparison-table/templates/comparison_table.partial.mustache":
/*!***********************************************************************************!*\
  !*** ../blocks/fpbk/comparison-table/templates/comparison_table.partial.mustache ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<table class=\"comparison-table__category-table table table-fb-striped table-borderless table-responsive-lg mb-0 w-100\">\n\t<thead class=\"comparison-table__category-plan\">\n\t<tr>\n\t\t<th id=\"{{ first_col_id }}\" scope=\"col\">{{ section_title }}</th>\n\t\t{{# feature_col_ids }}\n\t\t\t<th id=\"{{ . }}\" scope=\"col\"></th>\n\t\t{{/ feature_col_ids }}\n\t</tr>\n\t</thead>\n\n\t<tbody>\n\t{{# rows }}\n\t\t<tr>\n\t\t\t<th id=\"{{ row_id }}\" headers=\"{{ first_col_id }}\" scope=\"row\">\n\t\t\t\t{{{ features }}}\n\t\t\t\t{{# info_tooltip_html }}\n\t\t\t\t\t<div class=\"d-none d-xl-inline-block\">\n\t\t\t\t\t\t{{{ info_tooltip_html }}}\n\t\t\t\t\t</div>\n\t\t\t\t{{/ info_tooltip_html }}\n\t\t\t</th>\n\n\t\t\t{{# feature_values }}\n\t\t\t\t<td class=\"text-center px-0 d-table-cell align-middle\" headers=\"{{ first_col_id }}_{{ row_key }} {{ row_id }}\">\n\t\t\t\t\t{{{ feature_value }}}\n\t\t\t\t</td>\n\t\t\t{{/ feature_values }}\n\t\t</tr>\n\t{{/ rows }}\n\n\t{{# not_last_section }}\n\t\t<tr class=\"comparison-table__category-plan_gap\">\n\t\t\t<th\n\t\t\t\tid=\"{{ first_col_id }}_gap\"\n\t\t\t\theaders=\"{{ first_col_id }}\"\n\t\t\t\tscope=\"rowgroup\"\n\t\t\t\trowspan=\"99\"\n\t\t\t>&nbsp;</th>\n\t\t</tr>\n\t{{/ not_last_section }}\n\n\t</tbody>\n</table>\n\n", data, partials);
}
module.exports.templateString = "<table class=\"comparison-table__category-table table table-fb-striped table-borderless table-responsive-lg mb-0 w-100\">\n\t<thead class=\"comparison-table__category-plan\">\n\t<tr>\n\t\t<th id=\"{{ first_col_id }}\" scope=\"col\">{{ section_title }}</th>\n\t\t{{# feature_col_ids }}\n\t\t\t<th id=\"{{ . }}\" scope=\"col\"></th>\n\t\t{{/ feature_col_ids }}\n\t</tr>\n\t</thead>\n\n\t<tbody>\n\t{{# rows }}\n\t\t<tr>\n\t\t\t<th id=\"{{ row_id }}\" headers=\"{{ first_col_id }}\" scope=\"row\">\n\t\t\t\t{{{ features }}}\n\t\t\t\t{{# info_tooltip_html }}\n\t\t\t\t\t<div class=\"d-none d-xl-inline-block\">\n\t\t\t\t\t\t{{{ info_tooltip_html }}}\n\t\t\t\t\t</div>\n\t\t\t\t{{/ info_tooltip_html }}\n\t\t\t</th>\n\n\t\t\t{{# feature_values }}\n\t\t\t\t<td class=\"text-center px-0 d-table-cell align-middle\" headers=\"{{ first_col_id }}_{{ row_key }} {{ row_id }}\">\n\t\t\t\t\t{{{ feature_value }}}\n\t\t\t\t</td>\n\t\t\t{{/ feature_values }}\n\t\t</tr>\n\t{{/ rows }}\n\n\t{{# not_last_section }}\n\t\t<tr class=\"comparison-table__category-plan_gap\">\n\t\t\t<th\n\t\t\t\tid=\"{{ first_col_id }}_gap\"\n\t\t\t\theaders=\"{{ first_col_id }}\"\n\t\t\t\tscope=\"rowgroup\"\n\t\t\t\trowspan=\"99\"\n\t\t\t>&nbsp;</th>\n\t\t</tr>\n\t{{/ not_last_section }}\n\n\t</tbody>\n</table>\n\n";


/***/ }),

/***/ "../blocks/fpbk/comparison-table/templates/plan_cell.partial.mustache":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/comparison-table/templates/plan_cell.partial.mustache ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<th class=\"text-center px-0\">\n\t<div class=\"cell-content d-flex flex-column align-items-center justify-content-center\">\n\n\t\t<div class=\"comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center\">\n\t\t\t<span class=\"comparison-table__header-row_cell-title mr-lg-1\">{{{ title }}}</span>\n\n\t\t\t<div class=\"comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard\">\n\t\t\t\t<span\n\t\t\t\t\t\tclass=\"comparison-table__header-row_cell-price d-none d-md-block\"\n\t\t\t\t\t\t{{# admin }}\n\t\t\t\t\t\t\ttitle=\"{{ edit_on_sidebar_label }}\"\n\t\t\t\t\t\t{{/ admin }}\n\t\t\t\t>\n\t\t\t\t\t({{ price }})\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t{{# enable_promo }}\n\t\t\t\t{{# promo_price }}\n\t\t\t\t\t<div class=\"comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo\">\n\t\t\t\t\t\t<span\n\t\t\t\t\t\t\t\tclass=\"comparison-table__header-row_cell-price d-none d-md-block\"\n\t\t\t\t\t\t\t\t{{# admin }}\n\t\t\t\t\t\t\t\t\ttitle=\"{{ edit_on_sidebar_label }}\"\n\t\t\t\t\t\t\t\t{{/ admin }}\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t({{ promo_price }})\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t{{/ promo_price }}\n\t\t\t{{/ enable_promo }}\n\t\t</div>\n\n\t\t<div class=\"standard\">\n\t\t\t{{# cta.html }}\n\t\t\t\t{{{ cta.html }}}\n\t\t\t{{/ cta.html }}\n            {{^ cta.html }}\n                <a\n                    href=\"#\"\n                    title=\"{{ edit_on_sidebar_label }}\"\n                    class=\"comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block\"\n                >\n                    {{ cta.title }}\n                </a>\n            {{/ cta.html }}\n\t\t</div>\n\t\t{{# enable_promo }}\n\t\t\t{{# promo_cta.html }}\n\t\t\t\t<div class=\"promo\">\n\t\t\t\t\t{{{ promo_cta.html }}}\n\t\t\t\t</div>\n\t\t\t{{/ promo_cta.html }}\n\t\t{{/ enable_promo }}\n\t</div>\n</th>\n", data, partials);
}
module.exports.templateString = "<th class=\"text-center px-0\">\n\t<div class=\"cell-content d-flex flex-column align-items-center justify-content-center\">\n\n\t\t<div class=\"comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center\">\n\t\t\t<span class=\"comparison-table__header-row_cell-title mr-lg-1\">{{{ title }}}</span>\n\n\t\t\t<div class=\"comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard\">\n\t\t\t\t<span\n\t\t\t\t\t\tclass=\"comparison-table__header-row_cell-price d-none d-md-block\"\n\t\t\t\t\t\t{{# admin }}\n\t\t\t\t\t\t\ttitle=\"{{ edit_on_sidebar_label }}\"\n\t\t\t\t\t\t{{/ admin }}\n\t\t\t\t>\n\t\t\t\t\t({{ price }})\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t{{# enable_promo }}\n\t\t\t\t{{# promo_price }}\n\t\t\t\t\t<div class=\"comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo\">\n\t\t\t\t\t\t<span\n\t\t\t\t\t\t\t\tclass=\"comparison-table__header-row_cell-price d-none d-md-block\"\n\t\t\t\t\t\t\t\t{{# admin }}\n\t\t\t\t\t\t\t\t\ttitle=\"{{ edit_on_sidebar_label }}\"\n\t\t\t\t\t\t\t\t{{/ admin }}\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t({{ promo_price }})\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t{{/ promo_price }}\n\t\t\t{{/ enable_promo }}\n\t\t</div>\n\n\t\t<div class=\"standard\">\n\t\t\t{{# cta.html }}\n\t\t\t\t{{{ cta.html }}}\n\t\t\t{{/ cta.html }}\n            {{^ cta.html }}\n                <a\n                    href=\"#\"\n                    title=\"{{ edit_on_sidebar_label }}\"\n                    class=\"comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block\"\n                >\n                    {{ cta.title }}\n                </a>\n            {{/ cta.html }}\n\t\t</div>\n\t\t{{# enable_promo }}\n\t\t\t{{# promo_cta.html }}\n\t\t\t\t<div class=\"promo\">\n\t\t\t\t\t{{{ promo_cta.html }}}\n\t\t\t\t</div>\n\t\t\t{{/ promo_cta.html }}\n\t\t{{/ enable_promo }}\n\t</div>\n</th>\n";


/***/ }),

/***/ "../blocks/fpbk/comparison-table/templates/plan_header.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/comparison-table/templates/plan_header.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("{{# plan_header_trial_cell_title }}\n    <th>\n        <div class=\"cell-content d-flex flex-column align-items-center text-center\">\n\t\t\t<span class=\"comparison-table__header-row_trial-title mb-2 d-none d-sm-block\">\n                {{ plan_header_trial_cell_title }}\n            </span>\n\n            <div class=\"comparison-table__header-row_button-wrapper w-100 d-flex justify-content-center\">\n                {{# plan_header_trial_cell_buy_cta.html }}\n                    <div class=\"standard d-none d-xl-none\">\n                        {{{ plan_header_trial_cell_buy_cta.html }}}\n                    </div>\n                {{/ plan_header_trial_cell_buy_cta.html }}\n                {{^ plan_header_trial_cell_buy_cta.html }}\n                    {{{ plan_header_trial_cell_buy_cta }}}\n                {{/ plan_header_trial_cell_buy_cta.html }}\n\n                {{# enable_promo }}\n                    {{# plan_header_trial_cell_promo_buy_cta.html }}\n                        <div class=\"promo d-none d-xl-none\">\n                            {{{ plan_header_trial_cell_promo_buy_cta.html }}}\n                        </div>\n                    {{/ plan_header_trial_cell_promo_buy_cta.html }}\n                    {{^ plan_header_trial_cell_promo_buy_cta.html }}\n                        {{{ plan_header_trial_cell_promo_buy_cta }}}\n                    {{/ plan_header_trial_cell_promo_buy_cta.html }}\n                {{/ enable_promo }}\n\n                <span>\n\t\t\t\t\t{{# plan_header_trial_cell_trial_cta.html }}\n                        {{{ plan_header_trial_cell_trial_cta.html }}}\n                    {{/ plan_header_trial_cell_trial_cta.html }}\n                    {{^ plan_header_trial_cell_trial_cta.html }}\n                        {{{ plan_header_trial_cell_trial_cta }}}\n                    {{/ plan_header_trial_cell_trial_cta.html }}\n\t\t\t\t</span>\n            </div>\n        </div>\n    </th>\n{{/ plan_header_trial_cell_title }}\n", data, partials);
}
module.exports.templateString = "{{# plan_header_trial_cell_title }}\n    <th>\n        <div class=\"cell-content d-flex flex-column align-items-center text-center\">\n\t\t\t<span class=\"comparison-table__header-row_trial-title mb-2 d-none d-sm-block\">\n                {{ plan_header_trial_cell_title }}\n            </span>\n\n            <div class=\"comparison-table__header-row_button-wrapper w-100 d-flex justify-content-center\">\n                {{# plan_header_trial_cell_buy_cta.html }}\n                    <div class=\"standard d-none d-xl-none\">\n                        {{{ plan_header_trial_cell_buy_cta.html }}}\n                    </div>\n                {{/ plan_header_trial_cell_buy_cta.html }}\n                {{^ plan_header_trial_cell_buy_cta.html }}\n                    {{{ plan_header_trial_cell_buy_cta }}}\n                {{/ plan_header_trial_cell_buy_cta.html }}\n\n                {{# enable_promo }}\n                    {{# plan_header_trial_cell_promo_buy_cta.html }}\n                        <div class=\"promo d-none d-xl-none\">\n                            {{{ plan_header_trial_cell_promo_buy_cta.html }}}\n                        </div>\n                    {{/ plan_header_trial_cell_promo_buy_cta.html }}\n                    {{^ plan_header_trial_cell_promo_buy_cta.html }}\n                        {{{ plan_header_trial_cell_promo_buy_cta }}}\n                    {{/ plan_header_trial_cell_promo_buy_cta.html }}\n                {{/ enable_promo }}\n\n                <span>\n\t\t\t\t\t{{# plan_header_trial_cell_trial_cta.html }}\n                        {{{ plan_header_trial_cell_trial_cta.html }}}\n                    {{/ plan_header_trial_cell_trial_cta.html }}\n                    {{^ plan_header_trial_cell_trial_cta.html }}\n                        {{{ plan_header_trial_cell_trial_cta }}}\n                    {{/ plan_header_trial_cell_trial_cta.html }}\n\t\t\t\t</span>\n            </div>\n        </div>\n    </th>\n{{/ plan_header_trial_cell_title }}\n";


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

/***/ 96:
/*!**********************************************************!*\
  !*** multi ../blocks/fpbk/comparison-table/src/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/comparison-table/src/index.js */"../blocks/fpbk/comparison-table/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-comparison-table-index.js.map