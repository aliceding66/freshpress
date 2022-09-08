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
/******/ 		"blocks-fpbk-markup-calculator-markup-calculator-block": 0
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
/******/ 	deferredModules.push([231,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/fpbk/markup-calculator/src/frontend/markup-calculator-block.js":
/*!********************************************************************************!*\
  !*** ../blocks/fpbk/markup-calculator/src/frontend/markup-calculator-block.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_fbtools */ "./scripts/helpers/_fbtools.js");
/**
 * Markup Calculator.
 */



const TYPE_PRICE = 'price';
const TYPE_PERCENT = 'percent';
const tooltipClass = 'markup-calculator--tooltip';

const initMarkupCalculator = markupCalculator => {
  const getField = (fieldName, type) => ({
    type,
    name: fieldName.toLowerCase(),
    input: markupCalculator.querySelector("#fbtoolsMc".concat(fieldName)),
    icon: markupCalculator.querySelector("#fbtoolsMcIcon".concat(fieldName)),
    tooltip: markupCalculator.querySelector("#fbtoolsMcTooltip".concat(fieldName)),
    tooltipButton: markupCalculator.querySelector("#fbtoolsMcTooltipButton".concat(fieldName)),
    error: markupCalculator.querySelector("#fbtoolsMcError".concat(fieldName))
  });

  const fields = [getField('Cost', TYPE_PRICE), getField('Markup', TYPE_PERCENT), getField('Margin', TYPE_PERCENT), getField('Revenue', TYPE_PRICE), getField('Profit', TYPE_PRICE)];
  const refreshButton = markupCalculator.querySelector('#fbtoolsMcRefresh');
  const calculatorAnchor = document.querySelector('#calculator');
  let lastEditedFields = [];

  const attachFieldListeners = field => {
    field.input.addEventListener('change', () => {
      handleFieldUpdate(field);
    });
    field.input.addEventListener('input', () => {
      handleFieldUpdate(field);
    });
    document.addEventListener('click', event => {
      var _event$target;

      if ((_event$target = event.target) !== null && _event$target !== void 0 && _event$target.classList && !event.target.classList.contains(tooltipClass) && !event.target.classList.contains('markup-calculator--icon-point-mask')) {
        hideAllTooltips();
      }
    });
    field.tooltipButton.addEventListener('click', () => {
      toggleTooltip(field);
    });
  };

  const toggleTooltip = field => {
    const showTooltip = field.tooltip.classList.contains('d-none');
    hideAllTooltips();

    if (showTooltip) {
      field.tooltip.classList.remove('d-none');
    }
  };

  const hideAllTooltips = () => {
    markupCalculator.querySelectorAll(".".concat(tooltipClass)).forEach(tooltip => {
      tooltip.classList.add('d-none');
    });
  };

  const handleFieldUpdate = field => {
    switch (field.type) {
      case TYPE_PRICE:
        field.input.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatPrice"])(field.input.value);
        break;

      case TYPE_PERCENT:
        field.input.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatPercent"])(field.input.value);
        break;
    }

    handleLastEditedField(field);
    validateField(field);
    calculate();
  };

  const handleLastEditedField = field => {
    if (!lastEditedFields.includes(field.name)) {
      // 'markup' + 'margin' can't be calculated.
      if (field.name === 'markup' && lastEditedFields.includes('margin') || field.name === 'margin' && lastEditedFields.includes('markup')) {
        lastEditedFields = lastEditedFields.filter(lastEditedField => field.name === 'markup' && lastEditedField !== 'margin' || field.name === 'margin' && lastEditedField !== 'markup');
      }

      lastEditedFields.push(field.name); // field.tooltipButton.classList.remove( 'd-none' );

      if (lastEditedFields.length > 2) {
        lastEditedFields = lastEditedFields.slice(-2);
      }

      fields.forEach(toCheckField => {
        if (lastEditedFields.includes(toCheckField.name)) {
          toCheckField.tooltipButton.classList.remove('d-none');
        } else {
          toCheckField.tooltip.classList.add('d-none');
          toCheckField.tooltipButton.classList.add('d-none');
        }
      });
    }
  };

  const validateField = (field, quiet = false) => {
    var _inputRawValue;

    let inputRawValue = '';

    switch (field.type) {
      case TYPE_PRICE:
        inputRawValue = field.input.value.substring(1);
        break;

      case TYPE_PERCENT:
        inputRawValue = field.input.value.substring(0, field.input.value.length - 1);
        break;
    }

    let errorMessage = '';

    if (inputRawValue === '' || ((_inputRawValue = inputRawValue) === null || _inputRawValue === void 0 ? void 0 : _inputRawValue.length) > 0 && isNaN(Number(inputRawValue))) {
      errorMessage = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Invalid entry', 'freshpress-website');
    }

    if (!quiet) {
      if (errorMessage !== '') {
        field.input.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["inputHasErrorClass"]);
        field.icon.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
        field.tooltipButton.classList.add(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
        field.error.innerText = errorMessage;
      } else {
        field.input.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["inputHasErrorClass"]);
        field.icon.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
        field.tooltipButton.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
        field.error.innerText = '';
      }
    }

    return errorMessage === '';
  };

  const calculate = () => {
    if (lastEditedFields.length === 2 && lastEditedFields.filter(fieldName => validateField(fields.find(field => field.name === fieldName), true) !== true).length === 0) {
      const values = {};
      fields.forEach(field => {
        if (field.type === TYPE_PERCENT) {
          values[field.name] = Number(field.input.value.substring(0, field.input.value.length - 1) / 100);
        } else {
          values[field.name] = Number(field.input.value.substring(1));
        }
      });
      const newValues = {}; // Only 'markup' + 'margin' are not calculated.

      if (lastEditedFields.includes('cost') && lastEditedFields.includes('markup')) {
        newValues.revenue = values.cost * (1 + values.markup);
        newValues.profit = newValues.revenue - values.cost;
        newValues.margin = newValues.profit / newValues.revenue;
      } else if (lastEditedFields.includes('cost') && lastEditedFields.includes('margin')) {
        newValues.markup = 1 / (1 - values.margin) - 1;
        newValues.revenue = values.cost * (1 + newValues.markup);
        newValues.profit = newValues.revenue - values.cost;
      } else if (lastEditedFields.includes('cost') && lastEditedFields.includes('revenue')) {
        newValues.profit = values.revenue - values.cost;
        newValues.margin = newValues.profit / values.revenue;
        newValues.markup = newValues.profit / values.cost;
      } else if (lastEditedFields.includes('cost') && lastEditedFields.includes('profit')) {
        newValues.revenue = values.profit + values.cost;
        newValues.margin = values.profit / newValues.revenue;
        newValues.markup = values.profit / values.cost;
      } else if (lastEditedFields.includes('markup') && lastEditedFields.includes('revenue')) {
        newValues.margin = 1 - 1 / (values.markup + 1);
        newValues.cost = values.revenue / (1 + values.markup);
        newValues.profit = values.revenue - newValues.cost;
      } else if (lastEditedFields.includes('markup') && lastEditedFields.includes('profit')) {
        newValues.margin = 1 - 1 / (values.markup + 1);
        newValues.cost = values.profit / values.markup;
        newValues.revenue = values.profit + newValues.cost;
      } else if (lastEditedFields.includes('margin') && lastEditedFields.includes('revenue')) {
        newValues.markup = 1 / (1 - values.margin) - 1;
        newValues.cost = values.revenue / (1 + newValues.markup);
        newValues.profit = values.revenue - newValues.cost;
      } else if (lastEditedFields.includes('margin') && lastEditedFields.includes('profit')) {
        newValues.markup = 1 / (1 - values.margin) - 1;
        newValues.cost = values.profit / newValues.markup;
        newValues.revenue = values.profit + newValues.cost;
      } else if (lastEditedFields.includes('profit') && lastEditedFields.includes('revenue')) {
        newValues.cost = values.revenue - values.profit;
        newValues.margin = values.profit / values.revenue;
        newValues.markup = values.profit / newValues.cost;
      }

      Object.keys(newValues).forEach(newValueFieldName => {
        const newValueField = fields.find(field => field.name === newValueFieldName);

        if (newValueField) {
          if (newValueField.type === TYPE_PERCENT) {
            newValueField.input.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatPercent"])(Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatRounded"])(newValues[newValueFieldName] * 100, true));
          } else if (newValueField.type === TYPE_PRICE) {
            newValueField.input.value = Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatPrice"])(Object(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["formatRounded"])(newValues[newValueFieldName]));
          }
        }
      });
    }
  };

  const clearForm = () => {
    lastEditedFields = [];
    fields.forEach(field => {
      field.input.value = '';
      field.input.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["inputHasErrorClass"]);
      field.icon.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
      field.tooltipButton.classList.remove(scripts_helpers_fbtools__WEBPACK_IMPORTED_MODULE_2__["iconHasErrorClass"]);
      field.tooltipButton.classList.add('d-none');
      field.tooltip.classList.add('d-none');
      field.error.innerText = '';
    });
    fields[0].input.focus();

    if (calculatorAnchor) {
      calculatorAnchor.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      fields[0].scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  fields.forEach(field => {
    attachFieldListeners(field);
  });
  refreshButton.addEventListener('click', clearForm);
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__["initBlock"])('.markup-calculator', initMarkupCalculator);

/***/ }),

/***/ 231:
/*!**************************************************************************************!*\
  !*** multi ../blocks/fpbk/markup-calculator/src/frontend/markup-calculator-block.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/markup-calculator/src/frontend/markup-calculator-block.js */"../blocks/fpbk/markup-calculator/src/frontend/markup-calculator-block.js");


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
//# sourceMappingURL=blocks-fpbk-markup-calculator-markup-calculator-block.js.map