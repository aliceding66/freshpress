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
/******/ 		"blocks-fpbk-nicereply-nicereply-block": 0
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
/******/ 	deferredModules.push([233,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/fpbk/nicereply/src/frontend/nicereply-block.js":
/*!****************************************************************!*\
  !*** ../blocks/fpbk/nicereply/src/frontend/nicereply-block.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.url.js */ "../../../node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../assets/scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");



/**
 * Nicereply.
 */


const initNicereply = nicereply => {
  const stepOne = nicereply.querySelector('.nicereply__step-one');
  const stepTwo = nicereply.querySelector('.nicereply__step-two');
  const stepThree = nicereply.querySelector('.nicereply__step-three');
  const btnContinue = stepOne.querySelector('.nicereply__btn-continue');
  const btnSubmit = stepTwo.querySelector('.nicereply__btn-submit');
  const surveyItems = nicereply.querySelectorAll('.nicereply__survey-items');
  const pageDots = nicereply.querySelector('.nicereply__page-dots');
  const errors = nicereply.querySelector('.nicereply__error');
  const niceReplyFormTop = stepOne.offsetTop;
  const niceReplyFormLeft = stepOne.offsetLeft;
  let niceReplySubmitting = false;

  const scrollToNiceReply = () => {
    if (niceReplyFormTop < window.scrollY) {
      window.scrollTo({
        top: niceReplyFormTop,
        left: niceReplyFormLeft,
        behavior: 'smooth'
      });
    }
  };

  let minScore = 0;
  let responseType = ''; // Continue.

  let surveyVals = {};
  btnContinue.addEventListener('click', e => {
    e.preventDefault(); // Hide errors upon resubmitting.

    errors.querySelectorAll('span').forEach(error => {
      error.classList.add('d-none');
    });
    surveyItems.forEach(surveyItem => {
      const checked = surveyItem.querySelector('input[type="radio"]:checked');

      if (checked) {
        // Capture values.
        surveyVals[surveyItem.id] = checked.value;
      } else if (!('productFeedback' === surveyItem.id)) {
        errors.querySelector(".nicereply__error--".concat(surveyItem.id)).classList.remove('d-none');
      }

      const valuesArr = Object.values(surveyVals);
      minScore = Math.min(...valuesArr);

      if (Object.keys(surveyVals).length > 1 || 1 === Object.keys(surveyVals).length && 'supportExperience' === Object.keys(surveyVals)[0]) {
        // Move to next step.
        stepOne.classList.add('d-none');
        stepTwo.classList.remove('d-none');
        pageDots.querySelector('.active').classList.remove('active');
        pageDots.querySelectorAll('.nicereply__page-dot')[1].classList.add('active');
        scrollToNiceReply(); // Set response.

        if (minScore > 7) {
          responseType = 'good';
        } else if (minScore > 3) {
          responseType = 'ok';
        } else {
          responseType = 'bad';
        }

        stepTwo.querySelector(".nicereply__response--".concat(responseType)).classList.remove('d-none');
      }
    });
    return false;
  });

  const submitNicereply = async (targetUrl, values) => {
    const data = new FormData(); // eslint-disable-line no-undef

    Object.entries(values).forEach(([key, value]) => {
      data.set(key, value);
    });
    niceReplySubmitting = true;
    await window.fetch(targetUrl, {
      method: 'POST',
      body: data
    }).then(response => {
      niceReplySubmitting = false;

      if (response.status >= 400 && response.status < 600) {
        throw new Error('Bad response from server.');
      }

      return response;
    }).then(returned => {
      if (returned.status === 200) {
        // Move to next step.
        stepTwo.classList.add('d-none');
        stepThree.classList.remove('d-none');
        pageDots.classList.remove('d-flex');
        pageDots.classList.add('d-none');
        scrollToNiceReply();
      }
    }).catch(() => {
      // Show error.
      niceReplySubmitting = false;
      errors.querySelector('.nicereply__error--submit').classList.remove('d-none'); // Reset values.

      surveyVals = {};
      minScore = 0;
      responseType = ''; // Show first step.

      stepTwo.classList.add('d-none');
      stepThree.classList.add('d-none');
      stepOne.classList.remove('d-none');
      pageDots.classList.add('d-flex');
      pageDots.classList.remove('d-none');
      pageDots.querySelector('.active').classList.remove('active');
      pageDots.querySelectorAll('.nicereply__page-dot')[0].classList.add('active');
      scrollToNiceReply();
    });
  }; // Submit.


  btnSubmit.addEventListener('click', e => {
    e.preventDefault();

    if (niceReplySubmitting) {
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const nicereplyData = {
      user: queryParams.get('user'),
      ticketid: queryParams.get('ticketid'),
      minScore,
      comment: stepTwo.querySelector('#nicereply-feedback').value,
      ...surveyVals
    };
    const targetUrl = "".concat(stepTwo.querySelector('form').action);
    submitNicereply(targetUrl, nicereplyData);
    return false;
  });
};

Object(_assets_scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_2__["initBlock"])('.nicereply', initNicereply);

/***/ }),

/***/ 233:
/*!**********************************************************************!*\
  !*** multi ../blocks/fpbk/nicereply/src/frontend/nicereply-block.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/nicereply/src/frontend/nicereply-block.js */"../blocks/fpbk/nicereply/src/frontend/nicereply-block.js");


/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-nicereply-nicereply-block.js.map