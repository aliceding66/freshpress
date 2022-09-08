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
/******/ 		"blocks-fpbk-business-loan-calculator-business-loan-calculator-block": 0
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
/******/ 	deferredModules.push([221,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/fpbk/business-loan-calculator/src/frontend/business-loan-calculator-block.js":
/*!**********************************************************************************************!*\
  !*** ../blocks/fpbk/business-loan-calculator/src/frontend/business-loan-calculator-block.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/helpers/_fbtools */ "./scripts/helpers/_fbtools.js");


/**
 * Business Loan Calculator.
 */



const resultValueClass = 'business-loan-calculator--results-value';
const resultValueMutedClass = 'business-loan-calculator--results-value--muted';

const initBusinessLoanCalculator = businessLoanCalculator => {
  const form = businessLoanCalculator.querySelector('#fbtoolsBlcForm');
  const refreshButton = businessLoanCalculator.querySelector('#fbtoolsBlcRefresh');
  const amountInput = businessLoanCalculator.querySelector('#fbtoolsBlcLoanAmount');
  const amountIcon = businessLoanCalculator.querySelector('#fbtoolsBlcLoanAmountIcon');
  const amountError = businessLoanCalculator.querySelector('#fbtoolsBlcLoanAmountError');
  const rateInput = businessLoanCalculator.querySelector('#fbtoolsBlcLoanRate');
  const rateIcon = businessLoanCalculator.querySelector('#fbtoolsBlcLoanRateIcon');
  const rateError = businessLoanCalculator.querySelector('#fbtoolsBlcLoanRateError');
  const yearsInput = businessLoanCalculator.querySelector('#fbtoolsBlcLoanYearsInput');
  const yearsSlider = businessLoanCalculator.querySelector('#fbtoolsBlcLoanYearsSlider');
  const resultLoanAmount = businessLoanCalculator.querySelector('#fbtoolsBlcResultLoanAmount');
  const resultYears = businessLoanCalculator.querySelector('#fbtoolsBlcResultYears');
  const resultMonthlyPayment = businessLoanCalculator.querySelector('#fbtoolsBlcResultMonthlyPayment');
  const resultRate = businessLoanCalculator.querySelector('#fbtoolsBlcResultRate');
  const resultTotalCost = businessLoanCalculator.querySelector('#fbtoolsBlcResultTotalCost');
  const resultFooterMonthlyInterest = businessLoanCalculator.querySelector('#fbtoolsBlcResultFooterMonthlyInterest');
  const resultFooterMonthlyPayment = businessLoanCalculator.querySelector('#fbtoolsBlcResultFooterMonthlyPayment');
  const resultFooterTotalInterest = businessLoanCalculator.querySelector('#fbtoolsBlcResultFooterTotalInterest');
  const resultFooterYears = businessLoanCalculator.querySelector('#fbtoolsBlcResultFooterYears');
  let lastCalculatedData = {};

  const handleAmountUpdate = () => {
    if (amountInput.value.charAt(0) !== '$') {
      amountInput.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(amountInput.value.replace('$', ''));
    } else if (amountInput.value === '$') {
      amountInput.value = '';
    }

    validateAmountInput();
    checkIfHighlightResultValues();
  };

  const validateAmountInput = () => {
    let errorMessage = '';

    if (amountInput.value === '') {
      errorMessage = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Loan amount required', 'freshpress-website');
    } else if (isNaN(Number(amountInput.value.substring(1)))) {
      errorMessage = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Please enter a valid currency input', 'freshpress-website');
    }

    if (errorMessage !== '') {
      amountInput.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["inputHasErrorClass"]);
      amountIcon.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["iconHasErrorClass"]);
      amountError.innerText = errorMessage;
    } else {
      amountInput.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["inputHasErrorClass"]);
      amountIcon.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["iconHasErrorClass"]);
      amountError.innerText = '';
    }

    return errorMessage === '';
  };

  const handleRateUpdate = () => {
    if (rateInput.value.length > 0 && rateInput.value.charAt(rateInput.value.length - 1) !== '%') {
      rateInput.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPercent"])(rateInput.value);
    } else if (rateInput.value === '%') {
      rateInput.value = '';
    }

    validateRateInput();
    checkIfHighlightResultValues();
  };

  const validateRateInput = () => {
    let errorMessage = '';

    if (rateInput.value === '') {
      errorMessage = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Annual interest rate required', 'freshpress-website');
    } else if (isNaN(Number(rateInput.value.substring(0, rateInput.value.length - 1)))) {
      errorMessage = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Please enter a valid percent input', 'freshpress-website');
    }

    if (errorMessage !== '') {
      rateInput.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["inputHasErrorClass"]);
      rateIcon.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["iconHasErrorClass"]);
      rateError.innerText = errorMessage;
    } else {
      rateInput.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["inputHasErrorClass"]);
      rateIcon.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["iconHasErrorClass"]);
      rateError.innerText = '';
    }

    return errorMessage === '';
  };

  const handleYearsUpdate = (event = {}) => {
    if ((event === null || event === void 0 ? void 0 : event.target) === yearsSlider) {
      yearsInput.value = yearsSlider.value;
    } else {
      yearsSlider.value = yearsInput.value;
    }

    const loanYearSliderPosition = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPercent"])(yearsSlider.value / 30 * 100);
    yearsSlider.setAttribute('style', "background: linear-gradient(to right, rgb(13, 131, 222) ".concat(loanYearSliderPosition, ", rgb(204, 204, 204) 0px);"));
    checkIfHighlightResultValues();
  };

  const validateYearsValue = () => {
    if (yearsInput.value < yearsInput.min) {
      yearsInput.value = yearsInput.min;
    } else if (yearsInput.value > yearsInput.max) {
      yearsInput.value = yearsInput.max;
    }
  };

  const recalculate = () => {
    const amountValid = validateAmountInput();
    const rateValid = validateRateInput();

    if (amountValid && rateValid) {
      lastCalculatedData = {
        amount: amountInput.value.replace('$', ''),
        rate: rateInput.value.replace('%', ''),
        years: yearsInput.value
      };
      const amountOfMonths = lastCalculatedData.years * 12;
      const perMonthRate = lastCalculatedData.rate / 100 / 12;
      const monthlyPayment = perMonthRate * lastCalculatedData.amount / (1 - Math.pow(1 + perMonthRate, -amountOfMonths));
      const totalCost = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatRounded"])(amountOfMonths * monthlyPayment - (lastCalculatedData.amount - 0));
      const monthlyInterest = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatRounded"])(totalCost / amountOfMonths);
      resultLoanAmount.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(Number(lastCalculatedData.amount).toFixed(2));
      resultYears.innerText = lastCalculatedData.years;
      resultRate.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPercent"])(Number(lastCalculatedData.rate).toFixed(2));
      resultFooterYears.innerText = lastCalculatedData.years;
      resultMonthlyPayment.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatRounded"])(monthlyPayment));
      resultFooterMonthlyPayment.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatRounded"])(monthlyPayment));
      resultTotalCost.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(totalCost);
      resultFooterMonthlyInterest.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(monthlyInterest);
      resultFooterTotalInterest.innerText = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(totalCost);
      checkIfHighlightResultValues(true);
    }
  };

  const checkIfHighlightResultValues = (force = null) => {
    let highlight;

    if (force !== null) {
      highlight = force;
    } else {
      highlight = lastCalculatedData.amount === amountInput.value.replace('$', '') && lastCalculatedData.rate === rateInput.value.replace('%', '') && lastCalculatedData.years === yearsInput.value;
    }

    if (highlight === true) {
      const resultValuesMuted = businessLoanCalculator.querySelectorAll(".".concat(resultValueMutedClass));

      if (resultValuesMuted) {
        resultValuesMuted.forEach(resultValueMuted => {
          resultValueMuted.classList.remove(resultValueMutedClass);
        });
      }
    } else if (highlight === false) {
      const resultValues = businessLoanCalculator.querySelectorAll(".".concat(resultValueClass));

      if (resultValues) {
        resultValues.forEach(resultValue => {
          resultValue.classList.add(resultValueMutedClass);
        });
      }
    }
  };

  const clearForm = () => {
    lastCalculatedData = {
      amount: null,
      rate: null,
      years: null
    };
    checkIfHighlightResultValues(false);
    amountInput.value = '';
    rateInput.value = '';
    resultLoanAmount.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultYears.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyNumber"];
    resultMonthlyPayment.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultRate.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPercent"];
    resultTotalCost.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultFooterMonthlyInterest.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultFooterMonthlyPayment.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultFooterTotalInterest.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyPrice"];
    resultFooterYears.innerText = scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_3__["emptyNumber"];
  };

  amountInput.addEventListener('input', handleAmountUpdate);
  amountInput.addEventListener('change', handleAmountUpdate);
  rateInput.addEventListener('input', handleRateUpdate);
  rateInput.addEventListener('change', handleRateUpdate);
  yearsSlider.addEventListener('input', handleYearsUpdate);
  yearsSlider.addEventListener('change', handleYearsUpdate);
  yearsInput.addEventListener('input', handleYearsUpdate);
  yearsInput.addEventListener('change', handleYearsUpdate);
  yearsInput.addEventListener('change', validateYearsValue);
  form.addEventListener('submit', recalculate);
  refreshButton.addEventListener('click', clearForm);
  clearForm();
  handleYearsUpdate();
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_2__["initBlock"])('.business-loan-calculator', initBusinessLoanCalculator);

/***/ }),

/***/ 221:
/*!****************************************************************************************************!*\
  !*** multi ../blocks/fpbk/business-loan-calculator/src/frontend/business-loan-calculator-block.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/business-loan-calculator/src/frontend/business-loan-calculator-block.js */"../blocks/fpbk/business-loan-calculator/src/frontend/business-loan-calculator-block.js");


/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-business-loan-calculator-business-loan-calculator-block.js.map