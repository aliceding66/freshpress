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
/******/ 		"blocks-fpbk-countdown-timer-countdown-timer-block": 0
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
/******/ 	deferredModules.push([224,"common-helpers","common-modules","vendor-core-js","vendor-dashify"]);
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

/***/ "../blocks/fpbk/countdown-timer/src/frontend/countdown-timer-block.js":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/countdown-timer/src/frontend/countdown-timer-block.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_attributes */ "./scripts/helpers/_attributes.js");


/**
 * Countdown Timer.
 */


const intervals = {};

const parseCountdown = secondsRemaining => {
  const output = {};
  let remainder = secondsRemaining; // Get days, remove from remaining seconds for further calculations.

  output.days = Math.floor(remainder / 86400);
  remainder %= 86400; // Get hours, remove from remaining seconds for further calculations.

  output.hours = Math.floor(remainder / 3600);
  remainder %= 3600; // Get minutes, remove from remaining seconds for further calculations.

  output.minutes = Math.floor(remainder / 60);
  remainder %= 60;
  output.seconds = remainder; // Pad numbers to 2 number ints.

  Object.keys(output).forEach(i => {
    output[i] = output[i].toString().padStart(2, '0');
  });
  return output;
};

const initCountdownTimer = countdownTimer => {
  // Get times and compare.
  let now = Math.floor(Date.now() / 1000);
  const start = countdownTimer.dataset.countdownStart;
  const end = countdownTimer.dataset.countdownEnd; // Get elements to manipulate.

  const standardHero = document.querySelector('.hero');
  const promoHero = document.querySelector('.promo-hero');
  const pricingTable = document.querySelector('.pricing-table');
  const comparisonTable = document.querySelector('.comparison-table');
  const dbBanner = document.querySelector('.banner-promo');

  if (now >= start && now < end) {
    // Elements to update.
    const elements = document.querySelectorAll('[data-has-countdown="false"]:not(.promo-hero), .promo-hero[data-show-countdown="true"]');
    elements.forEach(element => {
      element.dataset.hasCountdown = true;
    });
    const daysDisplayTens = countdownTimer.querySelector('.countdown-timer__days-tens');
    const daysDisplayOnes = countdownTimer.querySelector('.countdown-timer__days-ones');
    const hoursDisplayTens = countdownTimer.querySelector('.countdown-timer__hours-tens');
    const hoursDisplayOnes = countdownTimer.querySelector('.countdown-timer__hours-ones');
    const minutesDisplayTens = countdownTimer.querySelector('.countdown-timer__minutes-tens');
    const minutesDisplayOnes = countdownTimer.querySelector('.countdown-timer__minutes-ones');
    const secondsDisplayTens = countdownTimer.querySelector('.countdown-timer__seconds-tens');
    const secondsDisplayOnes = countdownTimer.querySelector('.countdown-timer__seconds-ones'); // Parse times.

    let previousValues = {};
    const runInterval = setInterval(() => {
      now = Math.floor(Date.now() / 1000);
      const parsed = parseCountdown(end - now);

      if (parsed.days !== previousValues.days) {
        [daysDisplayTens.textContent, daysDisplayOnes.textContent] = parsed.days;
      }

      if (parsed.hours !== previousValues.hours) {
        [hoursDisplayTens.textContent, hoursDisplayOnes.textContent] = parsed.hours;
      }

      if (parsed.minutes !== previousValues.minutes) {
        [minutesDisplayTens.textContent, minutesDisplayOnes.textContent] = parsed.minutes;
      }

      if (parsed.seconds !== previousValues.seconds) {
        [secondsDisplayTens.textContent, secondsDisplayOnes.textContent] = parsed.seconds;
      }

      previousValues = parsed;

      if (now >= end) {
        // Countdown expired, remove it.
        elements.forEach(element => {
          Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["setDataAttr"])(element, 'has-countdown', 'expired');
        });
        clearInterval(runInterval);

        if (promoHero) {
          promoHero.classList.add('d-none');
          standardHero.classList.remove('d-none');
        }

        if (dbBanner) {
          dbBanner.classList.add('d-none');
        }

        Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["setDataAttr"])(pricingTable, 'promo-show', false);
        Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["setDataAttr"])(comparisonTable, 'promo-show', false);
        Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["setDataAttr"])(promoHero, 'has-countdown', 'expired');
      }
    }, 250);
    intervals[countdownTimer.id] = runInterval;
  } else if (now >= end) {
    Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_2__["setDataAttr"])(promoHero, 'has-countdown', 'expired');

    if (dbBanner) {
      dbBanner.classList.add('d-none');
    }
  }
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__["initBlock"])('.countdown-timer', initCountdownTimer);

/***/ }),

/***/ 224:
/*!**********************************************************************************!*\
  !*** multi ../blocks/fpbk/countdown-timer/src/frontend/countdown-timer-block.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/countdown-timer/src/frontend/countdown-timer-block.js */"../blocks/fpbk/countdown-timer/src/frontend/countdown-timer-block.js");


/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-countdown-timer-countdown-timer-block.js.map