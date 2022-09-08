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
/******/ 		"blocks-fpbk-comparison-table-comparison-table-block": 0
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
/******/ 	deferredModules.push([223,"common-helpers","common-modules","vendor-core-js","vendor-dashify","vendor-magnum-ui","vendor-smoothscroll-polyfill","vendor-js-cookie","common-json","vendor-uuid"]);
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

/***/ "../blocks/fpbk/comparison-table/src/frontend/comparison-table-block.js":
/*!******************************************************************************!*\
  !*** ../blocks/fpbk/comparison-table/src/frontend/comparison-table-block.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_utils */ "./scripts/helpers/_utils.js");
/* harmony import */ var scripts_helpers_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_events */ "./scripts/helpers/_events.js");
/* harmony import */ var scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/helpers/_attributes */ "./scripts/helpers/_attributes.js");
/* harmony import */ var scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/modules/_tracking */ "./scripts/modules/_tracking.js");
/**
 * Comparison Table.
 */






const recalculateStickyTop = comparisonTable => {
  const header = document.querySelector('header');
  const stickyTableHeader = comparisonTable.querySelector('.comparison-table__header-sticky');

  if (typeof window.ResizeObserver !== 'undefined') {
    const resizeObserver = new window.ResizeObserver(() => {
      stickyTableHeader.style.top = "".concat(parseInt(header.getBoundingClientRect().height) - 1, "px");
    });
    resizeObserver.observe(header);
  } else {
    window.addEventListener('resize', () => {
      stickyTableHeader.style.top = "".concat(parseInt(header.getBoundingClientRect().height) - 1, "px");
    });
    window.addEventListener('scroll', () => {
      stickyTableHeader.style.top = "".concat(parseInt(header.getBoundingClientRect().height) - 1, "px");
    });
  }
};

const initComparisonTable = comparisonTable => {
  // Set a promo if available
  const promoExists = comparisonTable.dataset.promoExists;
  const promoHero = document.querySelector('.promo-hero');

  if (promoExists && !Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_1__["isNfbCustomer"])()) {
    if (promoHero && 'expired' === Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_3__["getDataAttr"])(promoHero, 'has-countdown')) {
      comparisonTable.dataset.promoShow = false;
    } else {
      comparisonTable.dataset.promoShow = true;
    }
  } // Comparison Chart CTA tracking.


  const trackedCtas = comparisonTable.querySelectorAll('a[data-cta-section]');

  if (trackedCtas) {
    trackedCtas.forEach(trackedCta => {
      Object(scripts_helpers_events__WEBPACK_IMPORTED_MODULE_2__["addEventListeners"])(trackedCta, 'click mousedown', e => {
        if ('click' === e.type || e.button && [1, 2].includes(e.button)) {
          // Get the term switch value.
          const term = 'monthly'; // Comparison Chart supports only monthly.
          // Create the tracking data.

          Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__["track"])('gtm', {
            event: 'ctaClick',
            ctaText: term ? Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_3__["getDataAttr"])(trackedCta, "cta-text-".concat(term)) : Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_3__["getDataAttr"])(trackedCta, 'cta-text'),
            ctaSection: Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_3__["getDataAttr"])(trackedCta, 'cta-section')
          });

          if ('click' === e.type) {
            e.preventDefault();
            window.location.href = e.target.href;
          }
        }
      });
    });
  }

  recalculateStickyTop(comparisonTable);
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__["initBlock"])('.comparison-table', initComparisonTable);

/***/ }),

/***/ "../site-options/04-languages.json":
/*!*****************************************!*\
  !*** ../site-options/04-languages.json ***!
  \*****************************************/
/*! exports provided: eu_default_lang_code, eu_default_for, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"eu_default_lang_code\":\"en-eu\",\"eu_default_for\":[\"en-at\",\"en-be\",\"en-cy\",\"en-ee\",\"en-fi\",\"en-de\",\"en-gr\",\"en-it\",\"en-lv\",\"en-lt\",\"en-lu\",\"en-mt\",\"en-nl\",\"en-pt\",\"en-sk\",\"en-si\",\"en-es\"]}");

/***/ }),

/***/ 223:
/*!************************************************************************************!*\
  !*** multi ../blocks/fpbk/comparison-table/src/frontend/comparison-table-block.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/comparison-table/src/frontend/comparison-table-block.js */"../blocks/fpbk/comparison-table/src/frontend/comparison-table-block.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-comparison-table-comparison-table-block.js.map