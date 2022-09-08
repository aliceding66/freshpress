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
/******/ 		"blocks-fpbk-pricing-table-index": 0
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
/******/ 	deferredModules.push([169,"common-helpers","common-modules","vendor-core-js","vendor-dashify","common-components","vendor-mustache","vendor-html-dom-parser","vendor-react-property","vendor-html-react-parser","vendor-inline-style-parser","vendor-domelementtype","vendor-style-to-js","vendor-style-to-object","vendor-validator","vendor-is-plain-obj"]);
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

/***/ "../blocks/fpbk/pricing-table/block.json":
/*!***********************************************!*\
  !*** ../blocks/fpbk/pricing-table/block.json ***!
  \***********************************************/
/*! exports provided: apiVersion, name, title, category, description, textdomain, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiVersion\":2,\"name\":\"fpbk/pricing-table\",\"title\":\"Pricing Table\",\"category\":\"freshblocks\",\"description\":\"FreshPress block.\",\"textdomain\":\"fpbk\",\"supports\":{\"anchor\":true}}");

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/_edit.js":
/*!*************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/_edit.js ***!
  \*************************************************/
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
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _components_PromoPricesSidebar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/_PromoPricesSidebar */ "../blocks/fpbk/pricing-table/src/components/_PromoPricesSidebar.js");
/* harmony import */ var _components_TermSwitchTemplate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/_TermSwitchTemplate */ "../blocks/fpbk/pricing-table/src/components/_TermSwitchTemplate.js");
/* harmony import */ var scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! scripts/helpers/_fpbk_blocks */ "./scripts/helpers/_fpbk_blocks.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_utils */ "../blocks/fpbk/pricing-table/src/_utils.js");
/* harmony import */ var _templates_column_index_partial_mustache__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../templates/column/index.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/index.partial.mustache");
/* harmony import */ var _templates_column_index_partial_mustache__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_templates_column_index_partial_mustache__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _templates_column_heading_partial_mustache__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../templates/column/heading.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/heading.partial.mustache");
/* harmony import */ var _templates_column_heading_partial_mustache__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_templates_column_heading_partial_mustache__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _templates_column_pricing_partial_mustache__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../templates/column/pricing.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/pricing.partial.mustache");
/* harmony import */ var _templates_column_pricing_partial_mustache__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_templates_column_pricing_partial_mustache__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _templates_column_top_features_partial_mustache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../templates/column/top-features.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/top-features.partial.mustache");
/* harmony import */ var _templates_column_top_features_partial_mustache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_templates_column_top_features_partial_mustache__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _templates_column_add_ons_partial_mustache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../templates/column/add-ons.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/add-ons.partial.mustache");
/* harmony import */ var _templates_column_add_ons_partial_mustache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_templates_column_add_ons_partial_mustache__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _templates_column_links_partial_mustache__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../templates/column/links.partial.mustache */ "../blocks/fpbk/pricing-table/templates/column/links.partial.mustache");
/* harmony import */ var _templates_column_links_partial_mustache__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_templates_column_links_partial_mustache__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/pricing-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_18___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/pricing-table/block.json", 1);



















const STATE_VALUE = 0;
const STATE_DISPATCH = 1;
/* harmony default export */ __webpack_exports__["default"] = (function ({
  attributes,
  clientId,
  setAttributes
}) {
  var _attributes$most_popu, _attributes$most_popu2;

  const blockStateManager = new scripts_helpers_fpbk_blocks__WEBPACK_IMPORTED_MODULE_10__["BlockStateManager"](attributes, setAttributes);
  const [preview, setPreview] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])('standard');
  const [pricePeriod, setPricePeriod] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(attributes.default_to_yearly ? 'yearly' : 'monthly');
  const secondaryLinks = {};
  const promoSecondaryLinks = {};
  const parsedPlans = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["fpParsePricingCsv"])(attributes.base_pricing_info, ',', true, (_attributes$most_popu = attributes === null || attributes === void 0 ? void 0 : attributes.most_popular_plan) !== null && _attributes$most_popu !== void 0 ? _attributes$most_popu : 'plus');
  const plans = Object.keys(parsedPlans);
  plans.forEach(plan => {
    secondaryLinks[plan] = blockStateManager.addStateManager("links_".concat(plan, "_secondary_links"));
    promoSecondaryLinks[plan] = blockStateManager.addStateManager("promo_".concat(plan, "_links_secondary_links"));
  });
  const compactViewClass = attributes.enable_compact_view ? ' compact' : '';
  const mobileCarouselClass = attributes.mobile_carousel ? ' swiper-wrapper' : '';
  const isPromoPreview = preview === 'promo';
  const priceSuffixes = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["formatPriceSuffixes"])(attributes);
  const blockProps = Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["useBlockProps"])({
    className: "pricing-table position-relative ".concat(Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_6__["getCommonBlockSettingsClass"])(attributes)),
    'data-term': pricePeriod
  });
  const columnPartials = [];
  const mostPopularPlanOptions = {
    '': Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('None', 'freshpress-website')
  };
  plans.forEach(plan => {
    mostPopularPlanOptions[plan] = parsedPlans[plan].name;

    if (parsedPlans[plan]) {
      const promoData = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["extractPromoDataForPlan"])(plan, attributes);
      columnPartials.push( /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_7__["default"], {
        attributes: { ...attributes,
          ...parsedPlans[plan],
          ...pricingTableTemplateData,
          // eslint-disable-line no-undef
          ...priceSuffixes,
          ...promoData,
          enable_promo: isPromoPreview && !promoData.exclude_plan,
          custom_pricing: !isPromoPreview && parsedPlans[plan].custom_pricing || isPromoPreview && promoData.promo_custom_pricing
        },
        template: _templates_column_index_partial_mustache__WEBPACK_IMPORTED_MODULE_12___default.a,
        partials: {
          'partial__column-heading': _templates_column_heading_partial_mustache__WEBPACK_IMPORTED_MODULE_13__["templateString"],
          'partial__column-pricing': _templates_column_pricing_partial_mustache__WEBPACK_IMPORTED_MODULE_14__["templateString"],
          'partial__column-top-features': _templates_column_top_features_partial_mustache__WEBPACK_IMPORTED_MODULE_15__["templateString"],
          'partial__column-add-ons': _templates_column_add_ons_partial_mustache__WEBPACK_IMPORTED_MODULE_16__["templateString"],
          'partial__column-links': _templates_column_links_partial_mustache__WEBPACK_IMPORTED_MODULE_17__["templateString"]
        },
        components: {
          monthly_banner_image: /*#__PURE__*/React.createElement("div", {
            className: "pricing-table_column-promo__ribbon-image m-auto monthly"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Image, {
            inline: true,
            value: attributes["promo_".concat(plan, "_monthly_banner_image")],
            onChange: newImage => {
              setAttributes({
                ["promo_".concat(plan, "_monthly_banner_image")]: newImage
              });
            }
          })),
          standard_monthly_banner_subtext: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            isSimple: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert banner subtext', 'freshpress-website'),
            value: attributes["standard_".concat(plan, "_monthly_banner_subtext")],
            onChange: newSubtext => {
              setAttributes({
                ["standard_".concat(plan, "_monthly_banner_subtext")]: newSubtext
              });
            }
          }),
          promo_monthly_banner_subtext: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            isSimple: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert banner subtext', 'freshpress-website'),
            value: attributes["promo_".concat(plan, "_monthly_banner_subtext")],
            onChange: newSubtext => {
              setAttributes({
                ["promo_".concat(plan, "_monthly_banner_subtext")]: newSubtext
              });
            }
          }),
          yearly_banner_image: /*#__PURE__*/React.createElement("div", {
            className: "pricing-table_column-promo__ribbon-image m-auto yearly"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Image, {
            inline: true,
            value: attributes["promo_".concat(plan, "_yearly_banner_image")],
            onChange: newImage => {
              setAttributes({
                ["promo_".concat(plan, "_yearly_banner_image")]: newImage
              });
            }
          })),
          standard_yearly_banner_subtext: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            isSimple: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert banner subtext', 'freshpress-website'),
            value: attributes["standard_".concat(plan, "_yearly_banner_subtext")],
            onChange: newSubtext => {
              setAttributes({
                ["standard_".concat(plan, "_yearly_banner_subtext")]: newSubtext
              });
            }
          }),
          promo_yearly_banner_subtext: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            isSimple: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert banner subtext', 'freshpress-website'),
            value: attributes["promo_".concat(plan, "_yearly_banner_subtext")],
            onChange: newSubtext => {
              setAttributes({
                ["promo_".concat(plan, "_yearly_banner_subtext")]: newSubtext
              });
            }
          }),
          cta: /*#__PURE__*/React.createElement("div", {
            className: "standard"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Link, {
            inline: true,
            className: "btn mb-2 standard px-1 ".concat('ghost' === promoData.cta_style ? 'btn-outline-grey' : 'btn-cta-green'),
            name: "links_".concat(plan, "_cta"),
            extraModalFields: [/*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
              key: "links_".concat(plan, "_cta_style"),
              name: "links_".concat(plan, "_cta_style")
            })]
          })),
          secondary_links: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            disableLocalState: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert secondary links', 'freshpress-website'),
            value: secondaryLinks[plan][STATE_VALUE],
            onChange: newSecondaryLinks => {
              secondaryLinks[plan][STATE_DISPATCH](newSecondaryLinks);
            }
          }),
          promo_cta: /*#__PURE__*/React.createElement("div", {
            className: "promo"
          }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Link, {
            inline: true,
            className: "btn mb-2 promo px-0 ".concat('ghost' === promoData.promo_cta_style ? 'btn-outline-grey' : 'btn-cta-green'),
            name: "promo_".concat(plan, "_links_cta"),
            extraModalFields: [/*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
              key: "promo_".concat(plan, "_links_cta_style"),
              name: "promo_".concat(plan, "_links_cta_style")
            })]
          })),
          promo_secondary_links: /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].RichText, {
            disableLocalState: true,
            placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert secondary links', 'freshpress-website'),
            value: promoSecondaryLinks[plan][STATE_VALUE],
            onChange: newPromoSecondaryLinks => {
              promoSecondaryLinks[plan][STATE_DISPATCH](newPromoSecondaryLinks);
            }
          }),
          // To pass validated HTML syntax.
          promo_price_monthly_subtext: /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["RawHTML"], {
            className: "pricing-table_column-price__subtext position-absolute w-100"
          }, promoData.promo_price_monthly_subtext),
          promo_price_yearly_subtext: /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["RawHTML"], {
            className: "pricing-table_column-price__subtext position-absolute w-100"
          }, promoData.promo_price_yearly_subtext)
        }
      }));
    }
  });
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Context.Provider, {
    value: {
      attributes,
      blockName: _block_json__WEBPACK_IMPORTED_MODULE_18__["name"],
      clientId,
      isPromoPreview,
      pricePeriod,
      setAttributes,
      setPricePeriod
    }
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    initialOpen: true
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
    value: preview,
    onChange: newPreview => setPreview(newPreview),
    choices: {
      standard: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Standard', 'freshpress-website'),
      promo: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Promo', 'freshpress-website')
    },
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Block preview state', 'freshpress-website'),
    instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Change to preview and edit block in different states', 'freshpress-website')
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
    name: "most_popular_plan",
    value: (_attributes$most_popu2 = attributes === null || attributes === void 0 ? void 0 : attributes.most_popular_plan) !== null && _attributes$most_popu2 !== void 0 ? _attributes$most_popu2 : 'plus',
    choices: mostPopularPlanOptions,
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Most popular plan', 'freshpress-website')
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Select, {
    name: "price_disclaimer_align"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TextArea, {
    name: "base_pricing_info"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    name: "default_to_yearly",
    ui: "1"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    name: "enable_compact_view",
    ui: "1"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    name: "enable_promo",
    ui: "1"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TrueFalse, {
    name: "force_promo",
    ui: "1"
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.Group, {
    name: "pricing_term_suffix"
  }), attributes.enable_promo === true && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Panel"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Promo prices', 'freshpress-website'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(_components_PromoPricesSidebar__WEBPACK_IMPORTED_MODULE_8__["default"], {
    plans: plans
  }))), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.Accordion, {
    name: "block_design"
  })), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Acf.CommonBlockSettings, null)), /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_components_TermSwitchTemplate__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/React.createElement("div", {
    className: "pricing-table",
    "data-promo-show": isPromoPreview
  }, /*#__PURE__*/React.createElement("div", {
    className: "pricing-table__price-disclaimer mx-auto pr-2 text-center text-md-".concat((attributes === null || attributes === void 0 ? void 0 : attributes.price_disclaimer_align) === 'left' ? 'left' : 'right')
  }, pricingTableTemplateData.labels.pricing_grid_disclaimer), /*#__PURE__*/React.createElement("div", {
    className: "pricing-table_grid row mx-auto justify-content-md-center pb-5".concat(compactViewClass).concat(mobileCarouselClass)
  }, columnPartials))));
});

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/_utils.js":
/*!**************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/_utils.js ***!
  \**************************************************/
/*! exports provided: fpFormatPricingData, fpParsePricingCsv, fpFormatPrice, formatPriceSuffixes, extractPromoDataForPlan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpFormatPricingData", function() { return fpFormatPricingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpParsePricingCsv", function() { return fpParsePricingCsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpFormatPrice", function() { return fpFormatPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPriceSuffixes", function() { return formatPriceSuffixes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractPromoDataForPlan", function() { return extractPromoDataForPlan; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_csv */ "./scripts/helpers/_csv.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");



const fpFormatPricingData = csvText => {
  const csv = fpParsePricingCsv(csvText);
  const ret = {};
  csv.data.forEach(row => {
    let category = '';
    row.forEach((value, key) => {
      if ('category' === key) {
        category = value;
        ret[category] = {};
        return;
      }

      if (!ret[key]) {
        ret[key] = {};
      }

      if ('top_features' === category || 'addons' === category) {
        const features = value.split(/(?:\r?\n){2}/);
        features.forEach(feature => {
          const _feature = feature.split('\n');

          const output = {
            feature: '',
            bold: false,
            tooltip: false
          };

          _feature.forEach(line => {
            if (line.startsWith('bold: ')) {
              output.bold = line.split('bold: ')[1];
            } else if (line.startsWith('tooltip: ')) {
              output.tooltip = line.split('tooltip: ')[1];
            } else if (line.length > 0) {
              output.feature = line;
            }
          });

          ret[key][category] = output;
        });
      } else if ('custom_pricing' === category) {
        ret[key][category] = 'TRUE' === value;
      } else {
        ret[key][category] = value;
      }
    });
  });
  return ret;
};
/**
 * Parse CSV for the Pricing Table data specifically.
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {boolean} trimFields
 * @param {string} mostPopularPlan
 * @return {{headers: *[], data: *[]}} Return formatted CSV data.
 */

function fpParsePricingCsv(input, delimiter = ',', trimFields = true, mostPopularPlan = 'plus') {
  input = input.replace(/"[^"]*[^"]*"/g, function (fields) {
    const replacement = fields.split(/\n\n/);
    replacement.forEach((line, i) => {
      replacement[i] = line.replace(/\r?\n/g, '!n!');
    });
    const replaced = replacement.join('!n!!n!');
    return replaced.replace(/\r/, '!n!');
  }); // prettier-ignore

  const rows = input.split("\n");
  const headers = rows.shift().split(delimiter).map(header => header.replace(/\s/g, ''));
  const parsedPlans = {};
  headers.forEach(header => {
    if (header !== 'category') {
      parsedPlans[header] = {};
      parsedPlans[header].name = Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__["toTitleCase"])(header);
      parsedPlans[header].most_popular = mostPopularPlan === header;
    }
  });
  rows.forEach(row => {
    row = row.replace(/!n!/g, '\n');
    let values = Object(scripts_helpers_csv__WEBPACK_IMPORTED_MODULE_1__["strGetCsv"])(row, delimiter);

    if (values.length > 0) {
      if (trimFields) {
        values = values.map(value => value.trim());
      }

      let section = '';
      values.forEach((value, valueIndex) => {
        if (0 === valueIndex) {
          section = value;
          return;
        }

        value = value.replace(/\"/g, '');

        if ('addons' === section || 'top_features' === section) {
          value = value.split(/\n\n/);
          const valueObject = [];
          value.forEach((v, idx) => {
            const tmp = v.split(/\n/g);
            valueObject[idx] = {
              feature: '',
              bold: false,
              tooltip: ''
            };
            tmp.forEach(t => {
              if (t.startsWith('bold:') && t.endsWith('true')) {
                valueObject[idx].bold = true;
              } else if (t.startsWith('tooltip:')) {
                valueObject[idx].tooltip = t.split('tooltip: ')[1];
              } else {
                valueObject[idx].feature = t;
              }
            });
          });
          value = valueObject;
        } else if ('custom_pricing' === section) {
          value = 'true' === value.toLowerCase();
        } else if ('price_monthly' === section || 'price_yearly' === section) {
          value = fpFormatPrice(value);
        }

        parsedPlans[headers[valueIndex]][section] = value;
      });
    }
  });
  return parsedPlans;
}
const fpFormatPrice = price => {
  if (price) {
    price = parseFloat(price).toFixed(2);
    const parts = price.toString().split('.');
    return {
      whole: parts[0].replace('.', ''),
      decimal: parts[1]
    };
  } // Fallback if invalid input.


  return {
    whole: '00',
    decimal: '00'
  };
};
const formatPriceSuffixes = attributes => {
  const suffixes = {};
  const perMonthSuffix = '/mo';
  const perYearSuffix = '/yr';
  const {
    price_monthly_suffix: priceMonthlySuffix = 'mo',
    price_yearly_suffix: priceYearlySuffix = 'mo',
    promo_price_monthly_suffix: promoPriceMonthlySuffix = 'mo',
    promo_price_yearly_suffix: promoPriceYearlySuffix = 'mo'
  } = attributes;
  suffixes.price_monthly_suffix = 'mo' === priceMonthlySuffix ? perMonthSuffix : perYearSuffix;
  suffixes.price_yearly_suffix = 'mo' === priceYearlySuffix ? perMonthSuffix : perYearSuffix;
  suffixes.promo_price_monthly_suffix = 'mo' === promoPriceMonthlySuffix ? perMonthSuffix : perYearSuffix;
  suffixes.promo_price_yearly_suffix = 'mo' === promoPriceYearlySuffix ? perMonthSuffix : perYearSuffix;
  return suffixes;
};
const extractPromoDataForPlan = (plan, attributes) => {
  return {
    exclude_plan: attributes["promo_".concat(plan, "_exclude_plan")],
    promo_custom_pricing: attributes["promo_".concat(plan, "_custom_pricing")],
    promo_price_monthly: fpFormatPrice(attributes["promo_".concat(plan, "_monthly_price")]),
    promo_price_monthly_include_asterisk: attributes["promo_".concat(plan, "_include_monthly_price_asterisk")],
    promo_price_monthly_subtext: attributes["promo_".concat(plan, "_monthly_price_subtext")],
    promo_price_yearly: fpFormatPrice(attributes["promo_".concat(plan, "_yearly_price")]),
    promo_price_yearly_include_asterisk: attributes["promo_".concat(plan, "_include_yearly_price_asterisk")],
    promo_price_yearly_subtext: attributes["promo_".concat(plan, "_yearly_price_subtext")],
    cta: attributes["links_".concat(plan, "_cta")],
    cta_style: attributes["links_".concat(plan, "_cta_style")],
    promo_cta: attributes["promo_".concat(plan, "_links_cta")],
    promo_cta_style: attributes["promo_".concat(plan, "_links_cta_style")]
  };
};

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/components/_PromoPricesSidebar.js":
/*!**************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/components/_PromoPricesSidebar.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");




/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    plans
  } = props;
  const {
    attributes,
    setAttributes
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])();

  const getSubtextInstructions = fieldName => {
    return /*#__PURE__*/React.createElement("span", null, "Subtext below the plan price.", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: () => {
        setAttributes({
          [fieldName]: attributes[fieldName] + " <span class=\"show-tooltip\">Hover Text Here <span class=\"hover-tooltip\">Tooltip Text Here</span></span>"
        });
      }
    }, "Click to insert tooltip markup."));
  };

  return plans.map(plan => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Panel"], {
    key: "promo_prices_".concat(plan)
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["PanelBody"], {
    title: Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__["toTitleCase"])(plan),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TrueFalse, {
    name: "promo_".concat(plan, "_exclude_plan")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TrueFalse, {
    name: "promo_".concat(plan, "_custom_pricing")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Text, {
    name: "promo_".concat(plan, "_monthly_price")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TrueFalse, {
    name: "promo_".concat(plan, "_include_monthly_price_asterisk")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TextArea, {
    name: "promo_".concat(plan, "_monthly_price_subtext"),
    onChange: newSubtext => {
      setAttributes({
        ["promo_".concat(plan, "_monthly_price_subtext")]: newSubtext
      });
    },
    instructions: getSubtextInstructions("promo_".concat(plan, "_monthly_price_subtext"))
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Text, {
    name: "promo_".concat(plan, "_yearly_price")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TrueFalse, {
    name: "promo_".concat(plan, "_include_yearly_price_asterisk")
  }), /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].TextArea, {
    name: "promo_".concat(plan, "_yearly_price_subtext"),
    onChange: newSubtext => {
      setAttributes({
        ["promo_".concat(plan, "_yearly_price_subtext")]: newSubtext
      });
    },
    instructions: getSubtextInstructions("promo_".concat(plan, "_yearly_price_subtext"))
  }))));
});

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/components/_TermSwitchTemplate.js":
/*!**************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/components/_TermSwitchTemplate.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanoid */ "../../../node_modules/nanoid/index.browser.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/components/EditorControls/_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_Template */ "./scripts/components/_Template.js");
/* harmony import */ var _templates_switch_partial_mustache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../templates/switch.partial.mustache */ "../blocks/fpbk/pricing-table/templates/switch.partial.mustache");
/* harmony import */ var _templates_switch_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_switch_partial_mustache__WEBPACK_IMPORTED_MODULE_6__);







/* harmony default export */ __webpack_exports__["default"] = (() => {
  const {
    attributes,
    setAttributes,
    pricePeriod,
    setPricePeriod,
    isPromoPreview = false
  } = Object(scripts_components_EditorControls_helpers__WEBPACK_IMPORTED_MODULE_4__["getEditorControlsContext"])();
  const labelKeys = {
    monthly: 'term_switch_monthly_term_label',
    monthlyPromo: 'term_switch_promo_monthly_term_label',
    yearly: 'term_switch_yearly_term_label',
    yearlyPromo: 'term_switch_promo_yearly_term_label'
  };
  const {
    random = Object(nanoid__WEBPACK_IMPORTED_MODULE_1__["nanoid"])()
  } = pricingTableTemplateData; // eslint-disable-line no-undef

  const [monthlyLabel, setMonthlyLabel] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(attributes[labelKeys.monthly]);
  const [monthlyPromoLabel, setMonthlyPromoLabel] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(attributes[labelKeys.monthlyPromo]);
  const [yearlyLabel, setYearlyLabel] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(attributes[labelKeys.yearly]);
  const [yearlyPromoLabel, setYearlyPromoLabel] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(attributes[labelKeys.yearlyPromo]);
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    setAttributes({
      [labelKeys.monthly]: monthlyLabel,
      [labelKeys.monthlyPromo]: monthlyPromoLabel,
      [labelKeys.yearly]: yearlyLabel,
      [labelKeys.yearlyPromo]: yearlyPromoLabel
    });
  }, [monthlyLabel, monthlyPromoLabel, yearlyLabel, yearlyPromoLabel]);
  return /*#__PURE__*/React.createElement(scripts_components_Template__WEBPACK_IMPORTED_MODULE_5__["default"], {
    template: _templates_switch_partial_mustache__WEBPACK_IMPORTED_MODULE_6___default.a,
    attributes: {
      default_to_yearly: attributes.default_to_yearly,
      labels: {
        random
      }
    },
    components: {
      admin_term_switch: /*#__PURE__*/React.createElement("input", {
        id: random,
        type: "checkbox",
        className: "pricing-table_term-switch__checkbox",
        checked: pricePeriod === 'yearly',
        onChange: event => {
          if (event.target.checked) {
            setPricePeriod('yearly');
          } else {
            setPricePeriod('monthly');
          }
        }
      }),
      admin_monthly_label: isPromoPreview ? /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        className: "pricing-table_term-switch__monthly-label",
        key: "term_monthly_label",
        value: monthlyPromoLabel,
        onChange: newMonthlyPromoLabel => {
          setMonthlyPromoLabel(newMonthlyPromoLabel);
        }
      }) : /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        className: "pricing-table_term-switch__monthly-label",
        key: "term_monthly_promo_label",
        value: monthlyLabel,
        onChange: newMonthlyLabel => {
          setMonthlyLabel(newMonthlyLabel);
        }
      }),
      admin_yearly_label: isPromoPreview ? /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        className: "pricing-table_term-switch__yearly-label",
        key: "term_yearly_label",
        value: yearlyPromoLabel,
        onChange: newYearlyPromoLabel => {
          setYearlyPromoLabel(newYearlyPromoLabel);
        }
      }) : /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].RichText, {
        isSimple: true,
        className: "pricing-table_term-switch__yearly-label",
        key: "term_yearly_promo_label",
        value: yearlyLabel,
        onChange: newYearlyLabel => {
          setYearlyLabel(newYearlyLabel);
        }
      })
    }
  });
});

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/editor.scss":
/*!****************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/editor.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/pricing-table/src/index.js":
/*!*************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../block.json */ "../blocks/fpbk/pricing-table/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../block.json */ "../blocks/fpbk/pricing-table/block.json", 1);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_edit */ "../blocks/fpbk/pricing-table/src/_edit.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "../blocks/fpbk/pricing-table/src/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../blocks/fpbk/pricing-table/src/style.scss");
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

/***/ "../blocks/fpbk/pricing-table/src/style.scss":
/*!***************************************************!*\
  !*** ../blocks/fpbk/pricing-table/src/style.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/add-ons.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/add-ons.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"pricing-table_column-addons pt-4 px-2 px-lg-3 pb-3\">\n\t<h5 class=\"pricing-table_column-addons__title text-uppercase text-center \">\n\t\t{{ labels.add_ons }}\n\t</h5>\n\t<ul class=\"pricing-table_column-addons__points\">\n\t\t{{# addons }}\n\t\t\t<li>\n\t\t\t\t{{# bold }}<strong>{{/ bold }}\n\n\t\t\t\t{{ feature }}\n\n\t\t\t\t{{# tooltip }}{{{ tooltip }}}{{/ tooltip }}\n\n\t\t\t\t{{# bold }}</strong>{{/ bold }}\n\t\t\t</li>\n\t\t{{/ addons }}\n\t</ul>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"pricing-table_column-addons pt-4 px-2 px-lg-3 pb-3\">\n\t<h5 class=\"pricing-table_column-addons__title text-uppercase text-center \">\n\t\t{{ labels.add_ons }}\n\t</h5>\n\t<ul class=\"pricing-table_column-addons__points\">\n\t\t{{# addons }}\n\t\t\t<li>\n\t\t\t\t{{# bold }}<strong>{{/ bold }}\n\n\t\t\t\t{{ feature }}\n\n\t\t\t\t{{# tooltip }}{{{ tooltip }}}{{/ tooltip }}\n\n\t\t\t\t{{# bold }}</strong>{{/ bold }}\n\t\t\t</li>\n\t\t{{/ addons }}\n\t</ul>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/heading.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/heading.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("{{# most_popular }}\n\t<div class=\"pricing-table_column-badge w-100 position-absolute text-center\">\n\t\t{{{ images.most_popular }}}\n\t</div>\n{{/ most_popular }}\n\n<div class=\"pricing-table_column-label text-center pt-3 pb-4\">\n\t{{# name }}\n\t\t<div class=\"my-2\">\n\t\t\t<h3 class=\"pricing-table_column-label__title\">\n\t\t\t\t{{ name }}\n\t\t\t</h3>\n\t\t</div>\n\t{{/ name }}\n\n\t{{# blurb }}\n\t\t<div class=\"mb-2\">\n\t\t\t<span class=\"pricing-table_column-label__blurb d-block mx-auto\">\n\t\t\t\t{{ blurb }}\n\t\t\t</span>\n\t\t</div>\n\t{{/ blurb }}\n</div>\n", data, partials);
}
module.exports.templateString = "{{# most_popular }}\n\t<div class=\"pricing-table_column-badge w-100 position-absolute text-center\">\n\t\t{{{ images.most_popular }}}\n\t</div>\n{{/ most_popular }}\n\n<div class=\"pricing-table_column-label text-center pt-3 pb-4\">\n\t{{# name }}\n\t\t<div class=\"my-2\">\n\t\t\t<h3 class=\"pricing-table_column-label__title\">\n\t\t\t\t{{ name }}\n\t\t\t</h3>\n\t\t</div>\n\t{{/ name }}\n\n\t{{# blurb }}\n\t\t<div class=\"mb-2\">\n\t\t\t<span class=\"pricing-table_column-label__blurb d-block mx-auto\">\n\t\t\t\t{{ blurb }}\n\t\t\t</span>\n\t\t</div>\n\t{{/ blurb }}\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/index.partial.mustache":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/index.partial.mustache ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"pricing-table_column col-12 col-md-3 border px-0{{# most_popular }} pricing-table_column--most-popular{{/ most_popular }}{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }}\">\n    {{# show_column_price_disclaimer }}\n        <div\n            class=\"pricing-table__price-disclaimer position-absolute d-none d-md-block\"\n            style=\"{{# price_disclaimer_left }}left{{/ price_disclaimer_left }}{{^ price_disclaimer_left }}right{{/ price_disclaimer_left }}: 0;\"\n        >\n            {{ labels.pricing_grid_disclaimer }}\n        </div>\n    {{/ show_column_price_disclaimer }}\n\n\t{{> partial__column-heading }}\n\t{{> partial__column-pricing }}\n\n\t{{^ enable_compact_view }}\n\t\t{{> partial__column-top-features }}\n\n\t\t<div class=\"pricing-table_column-footer w-100\">\n\t\t\t{{> partial__column-add-ons }}\n\n\t\t\t<div class=\"pricing-table_column-footer-buttons text-center py-4 px-2 px-lg-3\">\n\t\t\t\t{{> partial__column-links }}\n\t\t\t</div>\n\t\t</div>\n\t{{/ enable_compact_view }}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"pricing-table_column col-12 col-md-3 border px-0{{# most_popular }} pricing-table_column--most-popular{{/ most_popular }}{{# mobile_carousel }} swiper-slide{{/ mobile_carousel }}\">\n    {{# show_column_price_disclaimer }}\n        <div\n            class=\"pricing-table__price-disclaimer position-absolute d-none d-md-block\"\n            style=\"{{# price_disclaimer_left }}left{{/ price_disclaimer_left }}{{^ price_disclaimer_left }}right{{/ price_disclaimer_left }}: 0;\"\n        >\n            {{ labels.pricing_grid_disclaimer }}\n        </div>\n    {{/ show_column_price_disclaimer }}\n\n\t{{> partial__column-heading }}\n\t{{> partial__column-pricing }}\n\n\t{{^ enable_compact_view }}\n\t\t{{> partial__column-top-features }}\n\n\t\t<div class=\"pricing-table_column-footer w-100\">\n\t\t\t{{> partial__column-add-ons }}\n\n\t\t\t<div class=\"pricing-table_column-footer-buttons text-center py-4 px-2 px-lg-3\">\n\t\t\t\t{{> partial__column-links }}\n\t\t\t</div>\n\t\t</div>\n\t{{/ enable_compact_view }}\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/links.partial.mustache":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/links.partial.mustache ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div\n\tclass=\"pricing-table_column-cta d-flex flex-column w-100 align-items-center px-2\"\n\tdata-cta-text-monthly=\"{{# data_cta_text }}{{ data_cta_text }}-monthly-{{ plan_name }}{{/ data_cta_text }}\"\n\tdata-cta-text-yearly=\"{{# data_cta_text }}{{ data_cta_text }}-yearly-{{ plan_name }}{{/ data_cta_text }}\"\n\tdata-cta-section=\"pricinggrid-top\"\n>\n\t{{# cta.html }}\n\t\t{{{ cta.html }}}\n\t{{/ cta.html }}\n\t{{^ cta.html }}\n\t\t{{{ cta }}}\n\t{{/ cta.html }}\n</div>\n\n\n<div\n\tclass=\"pricing-table_column-cta d-flex flex-column w-100 align-items-center px-2\"\n\tdata-cta-text-monthly=\"{{# promo_data_cta_text }}{{ promo_data_cta_text }}-monthly-{{ plan_name }}{{/ promo_data_cta_text }}\"\n\tdata-cta-text-yearly=\"{{# promo_data_cta_text }}{{ promo_data_cta_text }}-yearly-{{ plan_name }}{{/ promo_data_cta_text }}\"\n\tdata-cta-section=\"pricinggrid-top\"\n>\n\t{{# promo_cta.html }}\n\t\t{{{ promo_cta.html }}}\n\t{{/ promo_cta.html }}\n\t{{^ promo_cta.html }}\n\t\t{{{ promo_cta }}}\n\t{{/ promo_cta.html }}\n</div>\n\n\n{{# secondary_links }}\n\t<div\n\t\t\tclass=\"pricing-table_column-secondary-link standard\"\n\t\t\tdata-cta-text-monthly=\"{{# data_secondary_links_text }}{{ data_secondary_links_text }}-monthly-{{ plan_name }}{{/ data_secondary_links_text }}\"\n\t\t\tdata-cta-text-yearly=\"{{# data_secondary_links_text }}{{ data_secondary_links_text }}-yearly-{{ plan_name }}{{/ data_secondary_links_text }}\"\n\t\t\tdata-cta-section=\"pricinggrid-top\"\n\t>\n\t\t{{{ secondary_links }}}\n\t</div>\n{{/ secondary_links }}\n\n{{# promo_secondary_links }}\n\t<div\n\t\t\tclass=\"pricing-table_column-secondary-link promo\"\n\t\t\tdata-cta-text-monthly=\"{{# promo_data_secondary_links_text }}{{ promo_data_secondary_links_text }}-monthly-{{ plan_name }}{{/ promo_data_secondary_links_text }}\"\n\t\t\tdata-cta-text-yearly=\"{{# promo_data_secondary_links_text }}{{ promo_data_secondary_links_text }}-yearly-{{ plan_name }}{{/ promo_data_secondary_links_text }}\"\n\t\t\tdata-cta-section=\"pricinggrid-top\"\n\t>\n\t\t{{{ promo_secondary_links }}}\n\t</div>\n{{/ promo_secondary_links }}\n", data, partials);
}
module.exports.templateString = "<div\n\tclass=\"pricing-table_column-cta d-flex flex-column w-100 align-items-center px-2\"\n\tdata-cta-text-monthly=\"{{# data_cta_text }}{{ data_cta_text }}-monthly-{{ plan_name }}{{/ data_cta_text }}\"\n\tdata-cta-text-yearly=\"{{# data_cta_text }}{{ data_cta_text }}-yearly-{{ plan_name }}{{/ data_cta_text }}\"\n\tdata-cta-section=\"pricinggrid-top\"\n>\n\t{{# cta.html }}\n\t\t{{{ cta.html }}}\n\t{{/ cta.html }}\n\t{{^ cta.html }}\n\t\t{{{ cta }}}\n\t{{/ cta.html }}\n</div>\n\n\n<div\n\tclass=\"pricing-table_column-cta d-flex flex-column w-100 align-items-center px-2\"\n\tdata-cta-text-monthly=\"{{# promo_data_cta_text }}{{ promo_data_cta_text }}-monthly-{{ plan_name }}{{/ promo_data_cta_text }}\"\n\tdata-cta-text-yearly=\"{{# promo_data_cta_text }}{{ promo_data_cta_text }}-yearly-{{ plan_name }}{{/ promo_data_cta_text }}\"\n\tdata-cta-section=\"pricinggrid-top\"\n>\n\t{{# promo_cta.html }}\n\t\t{{{ promo_cta.html }}}\n\t{{/ promo_cta.html }}\n\t{{^ promo_cta.html }}\n\t\t{{{ promo_cta }}}\n\t{{/ promo_cta.html }}\n</div>\n\n\n{{# secondary_links }}\n\t<div\n\t\t\tclass=\"pricing-table_column-secondary-link standard\"\n\t\t\tdata-cta-text-monthly=\"{{# data_secondary_links_text }}{{ data_secondary_links_text }}-monthly-{{ plan_name }}{{/ data_secondary_links_text }}\"\n\t\t\tdata-cta-text-yearly=\"{{# data_secondary_links_text }}{{ data_secondary_links_text }}-yearly-{{ plan_name }}{{/ data_secondary_links_text }}\"\n\t\t\tdata-cta-section=\"pricinggrid-top\"\n\t>\n\t\t{{{ secondary_links }}}\n\t</div>\n{{/ secondary_links }}\n\n{{# promo_secondary_links }}\n\t<div\n\t\t\tclass=\"pricing-table_column-secondary-link promo\"\n\t\t\tdata-cta-text-monthly=\"{{# promo_data_secondary_links_text }}{{ promo_data_secondary_links_text }}-monthly-{{ plan_name }}{{/ promo_data_secondary_links_text }}\"\n\t\t\tdata-cta-text-yearly=\"{{# promo_data_secondary_links_text }}{{ promo_data_secondary_links_text }}-yearly-{{ plan_name }}{{/ promo_data_secondary_links_text }}\"\n\t\t\tdata-cta-section=\"pricinggrid-top\"\n\t>\n\t\t{{{ promo_secondary_links }}}\n\t</div>\n{{/ promo_secondary_links }}\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/pricing.partial.mustache":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/pricing.partial.mustache ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"pricing-table_column-price w-100 text-center position-relative pt-4 pb-5\">\n\t<div class=\"pricing-table_column-standard flex-column position-absolute w-100\">\n\t\t{{^ custom_pricing }}\n\t\t\t<span class=\"pricing-table_column-standard__ribbon-subtext position-absolute my-1 text-uppercase w-100 monthly\">\n\t\t\t\t{{ standard_monthly_banner_subtext }}\n\t\t\t</span>\n\n\t\t\t<span class=\"pricing-table_column-standard__ribbon-subtext position-absolute my-1 text-uppercase w-100 yearly\">\n\t\t\t\t{{ standard_yearly_banner_subtext }}\n\t\t\t</span>\n\t\t{{/ custom_pricing }}\n\t</div>\n\n\t{{# enable_promo }}\n\t\t<div class=\"pricing-table_column-promo flex-column position-absolute w-100\">\n\t\t\t{{{ monthly_banner_image }}}\n\t\t\t<span class=\"pricing-table_column-promo__ribbon-subtext my-1 text-uppercase monthly\">\n\t\t\t\t{{ promo_monthly_banner_subtext }}\n\t\t\t</span>\n\n\t\t\t{{{ yearly_banner_image }}}\n\t\t\t<span class=\"pricing-table_column-promo__ribbon-subtext my-1 text-uppercase yearly\">\n\t\t\t\t{{ promo_yearly_banner_subtext }}\n\t\t\t</span>\n\t\t</div>\n\t{{/ enable_promo }}\n\n\t<div class=\"pricing-table_column-price__value d-flex justify-content-center {{ align_items }}\">\n\t\t{{# custom_pricing }}\n\t\t\t<div class=\"pricing-table_column-price__custom-wrapper\">\n\t\t\t\t<div class=\"pricing-table_column-price__custom py-2\">\n\t\t\t\t\t<span>{{ labels.custom_pricing }}</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t{{/ custom_pricing }}\n\n\t\t{{^ custom_pricing }}\n\t\t\t<div class=\"w-100{{^ exclude_plan }} standard{{/ exclude_plan }}\">\n\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 monthly\">\n\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t{{# price_monthly }}\n\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t{{ price_monthly.whole }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ price_monthly.decimal }}</sup>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t{{/ price_monthly }}\n\n\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t{{ price_monthly_suffix }}\n\t\t\t\t\t</sub>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 yearly\">\n\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\t\t\t\t\t{{# price_yearly }}\n\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t{{ price_yearly.whole }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ price_yearly.decimal }}</sup>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t{{/ price_yearly }}\n\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t{{ price_yearly_suffix }}\n\t\t\t\t\t</sub>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t{{# enable_promo }}\n\t\t\t\t<div class=\"w-100{{^ exclude_plan }} promo{{/ exclude_plan }}\">\n\t\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 monthly\">\n\n\t\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t\t{{# promo_price_monthly }}\n\t\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t\t{{ promo_price_monthly.whole }}\n\t\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ promo_price_monthly.decimal }}</sup>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t{{/ promo_price_monthly }}\n\n\t\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t\t{{ promo_price_monthly_suffix }}\n\t\t\t\t\t\t</sub>\n\n\t\t\t\t\t\t{{# promo_price_monthly_include_asterisk }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__asterisk\">\n\t\t\t\t\t\t\t\t{{{ labels.asterisk }}}\n\t\t\t\t\t\t\t</sup>\n\t\t\t\t\t\t{{/ promo_price_monthly_include_asterisk }}\n\n\t\t\t\t\t\t{{# enable_promo }}\n\t\t\t\t\t\t\t<div class=\"pricing-table_column-price__subtext position-absolute w-100\">\n\t\t\t\t\t\t\t\t{{# promo_price_monthly_subtext }}\n\t\t\t\t\t\t\t\t\t{{{ promo_price_monthly_subtext }}}\n\t\t\t\t\t\t\t\t{{/ promo_price_monthly_subtext }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t{{/ enable_promo }}\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 yearly\">\n\n\t\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t\t{{# promo_price_yearly }}\n\t\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t\t{{ promo_price_yearly.whole }}\n\t\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ promo_price_yearly.decimal }}</sup>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t{{/ promo_price_yearly }}\n\n\t\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t\t{{{ promo_price_yearly_suffix }}}\n\t\t\t\t\t\t</sub>\n\n\t\t\t\t\t\t{{# promo_price_yearly_include_asterisk }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__asterisk\">\n\t\t\t\t\t\t\t\t{{{ labels.asterisk }}}\n\t\t\t\t\t\t\t</sup>\n\t\t\t\t\t\t{{/ promo_price_yearly_include_asterisk }}\n\n\t\t\t\t\t\t{{# enable_promo }}\n\t\t\t\t\t\t\t<div class=\"pricing-table_column-price__subtext position-absolute w-100\">\n\t\t\t\t\t\t\t\t{{# promo_price_yearly_subtext }}\n\t\t\t\t\t\t\t\t\t{{{ promo_price_yearly_subtext }}}\n\t\t\t\t\t\t\t\t{{/ promo_price_yearly_subtext }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t{{/ enable_promo }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t{{/ enable_promo }}\n\n\t\t{{/ custom_pricing }}\n\t</div>\n\n\t{{# billable_clients }}\n\t\t<div class=\"pricing-table_column-clients my-4\">\n\t\t\t{{ billable_clients }}\n\t\t</div>\n\t{{/ billable_clients }}\n\n\t{{> partial__column-links }}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"pricing-table_column-price w-100 text-center position-relative pt-4 pb-5\">\n\t<div class=\"pricing-table_column-standard flex-column position-absolute w-100\">\n\t\t{{^ custom_pricing }}\n\t\t\t<span class=\"pricing-table_column-standard__ribbon-subtext position-absolute my-1 text-uppercase w-100 monthly\">\n\t\t\t\t{{ standard_monthly_banner_subtext }}\n\t\t\t</span>\n\n\t\t\t<span class=\"pricing-table_column-standard__ribbon-subtext position-absolute my-1 text-uppercase w-100 yearly\">\n\t\t\t\t{{ standard_yearly_banner_subtext }}\n\t\t\t</span>\n\t\t{{/ custom_pricing }}\n\t</div>\n\n\t{{# enable_promo }}\n\t\t<div class=\"pricing-table_column-promo flex-column position-absolute w-100\">\n\t\t\t{{{ monthly_banner_image }}}\n\t\t\t<span class=\"pricing-table_column-promo__ribbon-subtext my-1 text-uppercase monthly\">\n\t\t\t\t{{ promo_monthly_banner_subtext }}\n\t\t\t</span>\n\n\t\t\t{{{ yearly_banner_image }}}\n\t\t\t<span class=\"pricing-table_column-promo__ribbon-subtext my-1 text-uppercase yearly\">\n\t\t\t\t{{ promo_yearly_banner_subtext }}\n\t\t\t</span>\n\t\t</div>\n\t{{/ enable_promo }}\n\n\t<div class=\"pricing-table_column-price__value d-flex justify-content-center {{ align_items }}\">\n\t\t{{# custom_pricing }}\n\t\t\t<div class=\"pricing-table_column-price__custom-wrapper\">\n\t\t\t\t<div class=\"pricing-table_column-price__custom py-2\">\n\t\t\t\t\t<span>{{ labels.custom_pricing }}</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t{{/ custom_pricing }}\n\n\t\t{{^ custom_pricing }}\n\t\t\t<div class=\"w-100{{^ exclude_plan }} standard{{/ exclude_plan }}\">\n\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 monthly\">\n\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t{{# price_monthly }}\n\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t{{ price_monthly.whole }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ price_monthly.decimal }}</sup>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t{{/ price_monthly }}\n\n\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t{{ price_monthly_suffix }}\n\t\t\t\t\t</sub>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 yearly\">\n\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\t\t\t\t\t{{# price_yearly }}\n\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t{{ price_yearly.whole }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ price_yearly.decimal }}</sup>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t{{/ price_yearly }}\n\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t{{ price_yearly_suffix }}\n\t\t\t\t\t</sub>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t{{# enable_promo }}\n\t\t\t\t<div class=\"w-100{{^ exclude_plan }} promo{{/ exclude_plan }}\">\n\t\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 monthly\">\n\n\t\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t\t{{# promo_price_monthly }}\n\t\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t\t{{ promo_price_monthly.whole }}\n\t\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ promo_price_monthly.decimal }}</sup>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t{{/ promo_price_monthly }}\n\n\t\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t\t{{ promo_price_monthly_suffix }}\n\t\t\t\t\t\t</sub>\n\n\t\t\t\t\t\t{{# promo_price_monthly_include_asterisk }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__asterisk\">\n\t\t\t\t\t\t\t\t{{{ labels.asterisk }}}\n\t\t\t\t\t\t\t</sup>\n\t\t\t\t\t\t{{/ promo_price_monthly_include_asterisk }}\n\n\t\t\t\t\t\t{{# enable_promo }}\n\t\t\t\t\t\t\t<div class=\"pricing-table_column-price__subtext position-absolute w-100\">\n\t\t\t\t\t\t\t\t{{# promo_price_monthly_subtext }}\n\t\t\t\t\t\t\t\t\t{{{ promo_price_monthly_subtext }}}\n\t\t\t\t\t\t\t\t{{/ promo_price_monthly_subtext }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t{{/ enable_promo }}\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"pricing-table_column-price__numerical position-relative w-100 yearly\">\n\n\t\t\t\t\t\t<sup class=\"pricing-table_column-price__currency\">{{{ labels.currency_symbol }}}</sup>\n\n\t\t\t\t\t\t{{# promo_price_yearly }}\n\t\t\t\t\t\t\t<span class=\"pricing-table_column-price__dollar\">\n\t\t\t\t\t\t\t\t{{ promo_price_yearly.whole }}\n\t\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__cents\">{{ labels.decimal_separator }}{{ promo_price_yearly.decimal }}</sup>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t{{/ promo_price_yearly }}\n\n\t\t\t\t\t\t<sub class=\"pricing-table_column-price__term\">\n\t\t\t\t\t\t\t{{{ promo_price_yearly_suffix }}}\n\t\t\t\t\t\t</sub>\n\n\t\t\t\t\t\t{{# promo_price_yearly_include_asterisk }}\n\t\t\t\t\t\t\t<sup class=\"pricing-table_column-price__asterisk\">\n\t\t\t\t\t\t\t\t{{{ labels.asterisk }}}\n\t\t\t\t\t\t\t</sup>\n\t\t\t\t\t\t{{/ promo_price_yearly_include_asterisk }}\n\n\t\t\t\t\t\t{{# enable_promo }}\n\t\t\t\t\t\t\t<div class=\"pricing-table_column-price__subtext position-absolute w-100\">\n\t\t\t\t\t\t\t\t{{# promo_price_yearly_subtext }}\n\t\t\t\t\t\t\t\t\t{{{ promo_price_yearly_subtext }}}\n\t\t\t\t\t\t\t\t{{/ promo_price_yearly_subtext }}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t{{/ enable_promo }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t{{/ enable_promo }}\n\n\t\t{{/ custom_pricing }}\n\t</div>\n\n\t{{# billable_clients }}\n\t\t<div class=\"pricing-table_column-clients my-4\">\n\t\t\t{{ billable_clients }}\n\t\t</div>\n\t{{/ billable_clients }}\n\n\t{{> partial__column-links }}\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/column/top-features.partial.mustache":
/*!***********************************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/column/top-features.partial.mustache ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"pricing-table_column-features px-2 py-4 px-lg-3\">\n\t<h5 class=\"pricing-table_column-features__title text-uppercase text-center\">\n\t\t{{ labels.top_features }}\n\t</h5>\n\t<ul class=\"pricing-table_column-features__points\">\n\t\t{{# top_features }}\n\t\t\t<li>\n\t\t\t\t{{# bold }}<strong>{{/ bold }}\n\n\t\t\t\t{{ feature }}\n\n\t\t\t\t{{# tooltip }}{{{ tooltip }}}{{/ tooltip }}\n\n\t\t\t\t{{# bold }}</strong>{{/ bold }}\n\t\t\t</li>\n\t\t{{/ top_features }}\n\t</ul>\n\t<span class=\"pricing-table_column-features__expand\">\n\t\t+\n\t\t<a class=\"pricing-table_column-features__expand-link\" href='/pricing'>\n\t\t\t{{ labels.see_full_details }}\n\t\t</a>\n\t</span>\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"pricing-table_column-features px-2 py-4 px-lg-3\">\n\t<h5 class=\"pricing-table_column-features__title text-uppercase text-center\">\n\t\t{{ labels.top_features }}\n\t</h5>\n\t<ul class=\"pricing-table_column-features__points\">\n\t\t{{# top_features }}\n\t\t\t<li>\n\t\t\t\t{{# bold }}<strong>{{/ bold }}\n\n\t\t\t\t{{ feature }}\n\n\t\t\t\t{{# tooltip }}{{{ tooltip }}}{{/ tooltip }}\n\n\t\t\t\t{{# bold }}</strong>{{/ bold }}\n\t\t\t</li>\n\t\t{{/ top_features }}\n\t</ul>\n\t<span class=\"pricing-table_column-features__expand\">\n\t\t+\n\t\t<a class=\"pricing-table_column-features__expand-link\" href='/pricing'>\n\t\t\t{{ labels.see_full_details }}\n\t\t</a>\n\t</span>\n</div>\n";


/***/ }),

/***/ "../blocks/fpbk/pricing-table/templates/switch.partial.mustache":
/*!**********************************************************************!*\
  !*** ../blocks/fpbk/pricing-table/templates/switch.partial.mustache ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var M = __webpack_require__(/*! mustache */ "../../../node_modules/mustache/mustache.js");
module.exports = function(data = {}, partials = {}){
  return M.render("<div class=\"pricing-table_term-wrapper w-100 d-flex justify-content-center align-content-center mb-5 position-relative\">\n    <label\n            class=\"pricing-table_term-switch d-flex align-items-center position-relative\"\n            data-monthly=\"{{ term_switch_monthly_term_label }}\"\n            data-yearly=\"{{ term_switch_yearly_term_label }}\"\n            data-promo-monthly=\"{{ term_switch_promo_monthly_term_label }}\"\n            data-promo-yearly=\"{{ term_switch_promo_yearly_term_label }}\"\n            for=\"{{ labels.random }}\"\n    >\n        {{# admin_term_switch }}\n            {{{ admin_term_switch }}}\n        {{/ admin_term_switch }}\n        {{^ admin_term_switch }}\n            <input id=\"{{ labels.random }}\" type=\"checkbox\" class=\"pricing-table_term-switch__checkbox\"{{# default_to_yearly }} checked{{/ default_to_yearly }}>\n        {{/ admin_term_switch }}\n\n        <span class=\"pricing-table_term-switch__slider position-absolute\" style=\"color: transparent; font-size: 0;\">{{ labels.random }}</span>\n\n    </label>\n\n    {{{ admin_monthly_label }}}\n    {{{ admin_yearly_label }}}\n</div>\n", data, partials);
}
module.exports.templateString = "<div class=\"pricing-table_term-wrapper w-100 d-flex justify-content-center align-content-center mb-5 position-relative\">\n    <label\n            class=\"pricing-table_term-switch d-flex align-items-center position-relative\"\n            data-monthly=\"{{ term_switch_monthly_term_label }}\"\n            data-yearly=\"{{ term_switch_yearly_term_label }}\"\n            data-promo-monthly=\"{{ term_switch_promo_monthly_term_label }}\"\n            data-promo-yearly=\"{{ term_switch_promo_yearly_term_label }}\"\n            for=\"{{ labels.random }}\"\n    >\n        {{# admin_term_switch }}\n            {{{ admin_term_switch }}}\n        {{/ admin_term_switch }}\n        {{^ admin_term_switch }}\n            <input id=\"{{ labels.random }}\" type=\"checkbox\" class=\"pricing-table_term-switch__checkbox\"{{# default_to_yearly }} checked{{/ default_to_yearly }}>\n        {{/ admin_term_switch }}\n\n        <span class=\"pricing-table_term-switch__slider position-absolute\" style=\"color: transparent; font-size: 0;\">{{ labels.random }}</span>\n\n    </label>\n\n    {{{ admin_monthly_label }}}\n    {{{ admin_yearly_label }}}\n</div>\n";


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

/***/ 169:
/*!*******************************************************!*\
  !*** multi ../blocks/fpbk/pricing-table/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/pricing-table/src/index.js */"../blocks/fpbk/pricing-table/src/index.js");


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
//# sourceMappingURL=blocks-fpbk-pricing-table-index.js.map