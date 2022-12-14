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
/******/ 		"blocks-acf-vat-calculator-vat-calculator": 0
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
/******/ 	deferredModules.push([25,"common-helpers","common-modules","vendor-core-js","vendor-bootstrap","vendor-popper.js"]);
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

/***/ "../blocks/acf/vat-calculator/vat-calculator.js":
/*!******************************************************!*\
  !*** ../blocks/acf/vat-calculator/vat-calculator.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/dist/tooltip */ "../../../node_modules/bootstrap/js/dist/tooltip.js");
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_dist_tab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/dist/tab */ "../../../node_modules/bootstrap/js/dist/tab.js");
/* harmony import */ var bootstrap_js_dist_tab__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_tab__WEBPACK_IMPORTED_MODULE_3__);


/**
 * VAT Calculator.
 */



const fraction = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const formatter1 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
const formatter2 = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatNumber = (num, flag = true) => {
  if (flag) {
    if (num % 1 === 0 && num.toString().split('.').length === 1) {
      return fraction.format(num);
    } else if (num.toString().split('.')[1].length === 1 && num.toString().split('.')[1] !== undefined) {
      return formatter1.format(num);
    } else if (num.toString().split('.')[1] === undefined) {
      return num;
    }
  } else if (num % 1 === 0) {
    return fraction.format(num);
  }

  return formatter2.format(num);
};

const getParseData = (e, currency, id) => {
  var _amount$split, _amount$split$, _amount$split$2, _amount$split$1$split;

  let input, operator, rate, vatAmount, total;

  if (e.target) {
    input = e.target;
  } else {
    input = e;
  }

  let amount = input.value;
  if ((e.key === '.' || e.keyCode === 110) && amount.indexOf('..') === -1 && ((_amount$split = amount.split('.')) === null || _amount$split === void 0 ? void 0 : _amount$split.length) < 3) return false;
  if ((e.key === '0' || e.keyCode === 48) && amount.indexOf('.0') !== 0 && ((_amount$split$ = amount.split('.')[1]) === null || _amount$split$ === void 0 ? void 0 : _amount$split$.indexOf('00')) !== undefined && ((_amount$split$2 = amount.split('.')[1]) === null || _amount$split$2 === void 0 ? void 0 : _amount$split$2.indexOf('00')) !== 0 && ((_amount$split$1$split = amount.split('.')[1].split('')) === null || _amount$split$1$split === void 0 ? void 0 : _amount$split$1$split.length) < 3) return false;
  amount = amount.replace(/[^0-9.\.]/g, '');

  if (id.indexOf('add') > -1) {
    rate = document.getElementById('vat-add').getElementsByClassName('vat-calculator__select')[0].value;
    operator = 'add';
    amount = parseFloat(amount);
    vatAmount = parseFloat(rate) / 100 * amount;
    total = amount + vatAmount;
  } else {
    rate = document.getElementById('vat-remove').getElementsByClassName('vat-calculator__select')[0].value;
    operator = 'remove';
    amount = parseFloat(amount);
    vatAmount = amount / (1 + parseFloat(rate) / 100) * (parseFloat(rate) / 100);
    total = amount - vatAmount;
  }

  const vatAmountResut = document.getElementById("vat-calculator__amount-".concat(operator));
  const totalResut = document.getElementById("vat-calculator__total-".concat(operator));

  if (!isNaN(amount)) {
    vatAmountResut.innerHTML = currency + formatNumber(vatAmount, false);
    totalResut.innerHTML = currency + formatNumber(total, false);
    input.value = currency + formatNumber(amount);
  } else {
    const defaultAmount = "<span>".concat(currency, "00.00</span>");
    vatAmountResut.innerHTML = defaultAmount;
    totalResut.innerHTML = defaultAmount;
    input.value = '';
  }
};

const selectFunction = selectOptions => {
  selectOptions.forEach(option => {
    option.addEventListener('click', function () {
      const id = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
      const mainParent = document.getElementById(id);
      const inputSelect = mainParent.getElementsByClassName('vat-calculator__select')[0];
      this.parentElement.classList.toggle('vat-calculator__select-container_active');
      const newOptions = mainParent.querySelectorAll('.vat-calculator__option');

      if (this.classList.contains('vat-calculator__option_active') && !this.parentElement.classList.contains('vat-calculator__select-container_active')) {
        newOptions.forEach(element => {
          element.style.top = 0;
          element.style.visibility = '';
        });
      } else if (this.classList.contains('vat-calculator__option_active')) {
        newOptions.forEach((element, index) => {
          element.style.top = index * 100 + '%';
          element.style.visibility = 'visible';
        });
      } else {
        newOptions.forEach(element => {
          element.style.top = 0;
          element.style.visibility = '';
          element.classList.remove('vat-calculator__option_active');
        });
        this.classList.add('vat-calculator__option_active');
        this.parentElement.insertBefore(this, newOptions[0]);
        inputSelect.value = this.getAttribute('data-value');
        const operator = id.replace('vat-', '');
        const input = document.getElementById("vat-calculator__input_".concat(operator));
        const currency = input.getAttribute('data-currency');
        getParseData(input, currency, id);
      }
    });
  });
};

const vatCalculate = e => {
  const currency = e.target.getAttribute('data-currency');
  const id = e.target.getAttribute('id');
  getParseData(e, currency, id);
};

const initVatCalculator = vatCalculator => {
  // init bootstrap Tooltips & Tabs
  $(vatCalculator).find('.vat-calculator__button').tooltip();
  $(vatCalculator).find('#vat-calculator__tabs a').tab(); // Tools togle class

  vatCalculator.querySelectorAll('.vat-calculator__tools-arrow')[0].onclick = e => {
    if (window.innerWidth >= 1280) {
      e.preventDefault();
    } else {
      const options = vatCalculator.querySelectorAll('.vat-calculator__tools-options')[0];
      options.classList.toggle('active');
    }
  }; // Custom Select rate


  const selectOptions = vatCalculator.querySelectorAll('.vat-calculator__option');
  selectFunction(selectOptions); // keyup input amount Add

  const inputAdd = document.getElementById('vat-calculator__input_add');
  inputAdd.onkeyup = vatCalculate; // keyup input amount Remove

  const inputRemove = document.getElementById('vat-calculator__input_remove');
  inputRemove.onkeyup = vatCalculate;
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__["initBlock"])('.vat-calculator', initVatCalculator);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "../blocks/acf/vat-calculator/vat-calculator.scss":
/*!********************************************************!*\
  !*** ../blocks/acf/vat-calculator/vat-calculator.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 25:
/*!*************************************************************************************************************!*\
  !*** multi ../blocks/acf/vat-calculator/vat-calculator.js ../blocks/acf/vat-calculator/vat-calculator.scss ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/vat-calculator/vat-calculator.js */"../blocks/acf/vat-calculator/vat-calculator.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/vat-calculator/vat-calculator.scss */"../blocks/acf/vat-calculator/vat-calculator.scss");


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
//# sourceMappingURL=blocks-acf-vat-calculator-vat-calculator.js.map