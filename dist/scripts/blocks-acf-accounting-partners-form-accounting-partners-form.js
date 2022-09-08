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
/******/ 		"blocks-acf-accounting-partners-form-accounting-partners-form": 0
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
/******/ 	deferredModules.push([2,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/acf/accounting-partners-form/accounting-partners-form.js":
/*!**************************************************************************!*\
  !*** ../blocks/acf/accounting-partners-form/accounting-partners-form.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");


/**
 * Accounting Partners Form.
 */


const initAccountingPartnersForm = () => {
  const form = document.querySelector('.accounting-partners-form_default-form');
  const gRecaptcha = document.createElement('script');
  gRecaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
  gRecaptcha.setAttribute('async', 'async');
  gRecaptcha.setAttribute('defer', 'defer');
  document.body.appendChild(gRecaptcha);

  const removeItemOnce = (arr, value) => {
    const index = arr.indexOf(value);

    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  };

  const checkEmailMessage = () => {
    const email = document.getElementById('email');

    if (email.value !== '') {
      email.closest('.accounting-partners-form__field').querySelector('.invalid-feedback-format').style.display = 'block';
      email.closest('.accounting-partners-form__field').querySelector('.invalid-feedback-required').style.display = 'none';
    } else {
      email.closest('.accounting-partners-form__field').querySelector('.invalid-feedback-format').style.display = '';
      email.closest('.accounting-partners-form__field').querySelector('.invalid-feedback-required').style.display = '';
    }
  };

  const phone = document.getElementById('work-phone');
  phone.addEventListener('keypress', e => {
    const keycode = e.which || e.keyCode || 0;

    if (!(keycode === 46 || keycode === 8 || keycode === 40 || keycode === 41 || keycode === 45 || keycode === 43 || keycode >= 48 && keycode <= 57 && e.shiftKey === false)) {
      e.preventDefault();
    }
  });
  const checkboxFacadeUL = document.getElementById('how-we-help-facade');
  const checkboxFacaceLI = checkboxFacadeUL.querySelectorAll('li');
  const checkboxFacaceInput = document.getElementById('how-we-help');
  const checkboxFacaceInputValue = [];

  const functionActiveUL = event => {
    event.preventDefault();
    checkboxFacadeUL.classList.toggle('active');
    event.target.blur();
  };

  checkboxFacaceInput.addEventListener('click', functionActiveUL);
  document.getElementById('languages').addEventListener('change', function () {
    const otherLanguages = document.getElementById('languages-other').parentElement.parentElement;

    if (this.value === 'Other') {
      otherLanguages.classList.remove('d-none');
    } else {
      otherLanguages.classList.add('d-none');
    }
  });
  document.body.addEventListener('click', function (e) {
    if (!e.target.classList.contains('how-we-help') && e.target.nodeName !== 'LI' && !e.target.classList.contains('service-other')) {
      checkboxFacadeUL.classList.remove('active');
    }
  });
  checkboxFacaceLI.forEach(li => {
    li.addEventListener('click', function () {
      const option = this.innerText;

      if (this.classList.contains('other')) {
        if (!this.classList.contains('active-item')) {
          checkboxFacaceInputValue.push('Other');
          this.classList.add('active-item');
          this.innerHTML = "<input type=\"text\" class=\"service-other\" placeholder=\"Other\" name=\"how-we-help-other\" id=\"how-we-help-other\">";
          document.querySelector('.service-other').focus();
        } else {
          removeItemOnce(checkboxFacaceInputValue, 'Other');
          this.classList.remove('active-item');
          this.innerHTML = "Other";
        }
      } else if (!this.classList.contains('active-item')) {
        this.classList.add('active-item');
        checkboxFacaceInputValue.push(option);
      } else {
        this.classList.remove('active-item');
        removeItemOnce(checkboxFacaceInputValue, option);
      }

      checkboxFacaceInput.value = checkboxFacaceInputValue.join(', ');
    });
  });

  const checkCaptcha = formValues => {
    let result = false;
    $.ajax({
      async: false,
      url: '/wp-json/acct-accounting-partners/g-recaptcha',
      type: 'POST',
      dataType: 'json',
      data: {
        values: {
          formValues
        }
      },

      success(response) {
        const res = response.body_response;

        if (res) {
          result = res;
        }
      }

    });
    return result;
  };

  const removeRecaptchaError = () => {
    document.querySelector('.g-recaptcha').addEventListener('mouseenter', function () {
      setTimeout(() => {
        document.querySelector('.recaptcha-error-message').style.display = 'none';
      }, 700);
    }, false);
  };

  const submitForm = (formValues, nonces) => {
    if (nonces) {
      $.ajax({
        async: true,
        url: '/wp-json/acct-accounting-partners/submit-pardot-forms',
        type: 'POST',
        dataType: 'json',
        data: {
          nonce: nonces.nonce,
          values: {
            formValues
          }
        },

        success(response) {
          const res = response.body_response;
          const success = res[0];
          const partnerName = res[1];

          if (success === true) {
            window.location.href = "//".concat(window.location.host).concat(window.location.pathname, "?thank-you&firm-name=").concat(partnerName);
          } else {
            submissionFailed();
          }
        },

        error() {
          submissionFailed();
        }

      });
    } else {
      submissionFailed();
    }
  };

  form.addEventListener('submit', e => {
    // eslint-disable-next-line
    if (!form.checkValidity(e) || grecaptcha.getResponse() === '') {
      e.preventDefault();
      e.stopPropagation();
      checkEmailMessage(); // eslint-disable-next-line

      if (grecaptcha.getResponse() === '') {
        document.querySelector('.recaptcha-error-message').style.display = 'block';
        removeRecaptchaError();
      }
    } else {
      document.querySelector('.accounting-partners-form__submit').classList.add('loading');
      setTimeout(() => {
        const formValues = new Object();
        [...form.elements].forEach(item => {
          if (item.getAttribute('type') !== 'submit') {
            const itemName = item.getAttribute('id');
            let itemValue = item.value;

            if (item.getAttribute('type') === 'checkbox') {
              itemValue = false;

              if (item.checked) {
                itemValue = true;
              }
            }

            formValues[itemName] = itemValue;
          }
        });
        formValues['partner-id'] = document.querySelector('.accounting-partners-form').getAttribute('data-partner-id');

        if (checkCaptcha(formValues)) {
          $.ajax({
            async: true,
            url: '/wp-json/acct-accounting-partners/fp-create-nonce',
            type: 'POST',
            dataType: 'json',
            data: '',

            success(response) {
              const nonces = response.body_response;

              if (nonces) {
                submitForm(formValues, nonces);
              } else {
                submissionFailed();
              }
            },

            error() {
              submissionFailed();
            }

          });
        } else {
          document.querySelector('.recaptcha-error-message').style.display = 'block'; // eslint-disable-next-line

          grecaptcha.reset();
          removeRecaptchaError();
          document.querySelector('.accounting-partners-form__submit').classList.remove('loading');
        }
      }, 50);
    }
  }, false);

  const submissionFailed = () => {
    const submit = document.querySelector('.accounting-partners-form__submit');
    submit.classList.remove('loading');
    submit.insertAdjacentHTML('afterend', '<div class="accounting-partners-form__error-message">There was a problem with your submission. Please try again.</div>');
    setTimeout(() => {
      const errorMessage = document.querySelector('.accounting-partners-form__error-message');
      errorMessage.style.opacity = '0';
      setTimeout(() => {
        errorMessage.remove();
      }, 500);
    }, 45000);
  };
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__["initBlock"])('.accounting-partners-form', initAccountingPartnersForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "../blocks/acf/accounting-partners-form/accounting-partners-form.scss":
/*!****************************************************************************!*\
  !*** ../blocks/acf/accounting-partners-form/accounting-partners-form.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/*!*****************************************************************************************************************************************************!*\
  !*** multi ../blocks/acf/accounting-partners-form/accounting-partners-form.js ../blocks/acf/accounting-partners-form/accounting-partners-form.scss ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/accounting-partners-form/accounting-partners-form.js */"../blocks/acf/accounting-partners-form/accounting-partners-form.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/accounting-partners-form/accounting-partners-form.scss */"../blocks/acf/accounting-partners-form/accounting-partners-form.scss");


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
//# sourceMappingURL=blocks-acf-accounting-partners-form-accounting-partners-form.js.map