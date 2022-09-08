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
/******/ 		"blocks-fpbk-modal-modal-block": 0
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
/******/ 	deferredModules.push([232,"common-helpers","common-modules","vendor-core-js","vendor-dashify","vendor-magnum-ui","vendor-smoothscroll-polyfill","vendor-js-cookie","common-json","vendor-bootstrap"]);
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

/***/ "../blocks/fpbk/modal/src/frontend/modal-block.js":
/*!********************************************************!*\
  !*** ../blocks/fpbk/modal/src/frontend/modal-block.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/dist/modal */ "../../../node_modules/bootstrap/js/dist/modal.js");
/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Modal.
 */





const handleExitIntention = (modal, bsModal) => {
  // eslint-disable-next-line @wordpress/no-global-event-listener
  document.addEventListener('mouseout', e => {
    const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;

    if (shouldShowExitIntent && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('seo-exit-popup-dismissed')) {
      bsModal.modal('show'); // This event handler cannot use addEventListener and must use jQuery due to bootstrap's internal code.
      // eslint-disable-next-line no-undef

      $(modal).on('hidden.bs.modal', () => {
        Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookieIfMissing"])('seo-exit-popup-dismissed', 'true', 30);
      }); // eslint-disable-next-line @wordpress/no-global-event-listener

      window.addEventListener('message', messageEvent => {
        if (messageEvent.data.success) {
          Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookieIfMissing"])('seo-exit-popup-dismissed', 'true', 30);
        }
      });
    }
  });
};

const initModal = modal => {
  const shownBefore = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])("modal-id-".concat(modal.id, "-dismissed"));
  const openOnce = modal.matches('[data-open-once="1"]');
  const showWhenCookiesAccepted = modal.matches('[data-show-when-cookies-accepted="1"]');
  const cookiesAccepted = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])("cookies-declined") === 'false';
  const pardotForm = modal.querySelector('iframe');

  if (modal && modal.matches('[data-auto-show="1"]')) {
    // eslint-disable-next-line no-undef
    const bsModal = $(modal);
    const delay = parseInt(modal.dataset.delay, 10) * 1000;
    const userAction = modal.dataset.userAction;
    const modalVisibility = modal.dataset.visibility;
    const conditions = [modalVisibility === 'everyone', modalVisibility === 'nfb_customers' && Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('smux_login'), modalVisibility === 'not_nfb_customers' && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('smux_login'), modalVisibility === 'location' && Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('country-code') === 'GB' && Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_2__["getSiteCountryCode"])() === 'US'];
    const showModal = conditions.some(item => item);

    if ((!openOnce || openOnce && !shownBefore) && (!showWhenCookiesAccepted || showWhenCookiesAccepted && cookiesAccepted)) {
      if (showModal && userAction === 'none') {
        setTimeout(() => {
          bsModal.modal('show');

          if (openOnce) {
            Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookieIfMissing"])("modal-id-".concat(modal.id, "-dismissed"), 'true', 30);
          }
        }, delay);
      } else if (showModal && userAction === 'page_leave' && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["readCookie"])('seo-exit-popup-dismissed')) {
        setTimeout(() => {
          handleExitIntention(modal, bsModal);

          if (openOnce) {
            Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["createCookieIfMissing"])("modal-id-".concat(modal.id, "-dismissed"), 'true', 30);
          }
        }, delay);
      }
    }
  }

  if (modal.classList.contains('is-style-with-stages')) {
    const stagesContainer = modal.querySelector('.modal__stages');
    const stages = modal.querySelectorAll('.modal__stage');
    const nextButtons = modal.querySelectorAll('a[data-stage="next"]');
    modal.currentStage = 0;

    const setModalStage = stageNumber => {
      const nextStage = stages[modal.currentStage + 1];
      modal.currentHeight = Math.ceil(stagesContainer.getBoundingClientRect().height);
      stagesContainer.style.height = "".concat(modal.currentHeight, "px");
      Array.from(stages).forEach(stage => stage.classList.remove('active'));
      nextStage.classList.add('active');
      setTimeout(() => {
        const nextStageHeight = nextStage.scrollHeight; // eslint-disable-line

        stagesContainer.animate([{
          height: "".concat(modal.currentHeight, "px")
        }, {
          height: "".concat(nextStageHeight, "px")
        }], {
          duration: 200,
          fill: 'forwards'
        });
        modal.currentHeight = nextStageHeight;
      }, 100);
      modal.currentStage = stageNumber;
    };

    if (nextButtons) {
      nextButtons.forEach(nextButton => {
        nextButton.addEventListener('click', () => {
          setModalStage(modal.currentStage + 1);
        });
      });
    } // eslint-disable-next-line @wordpress/no-global-event-listener


    window.addEventListener('message', messageEvent => {
      const isSameSource = messageEvent.source === pardotForm.contentWindow;
      const hasCurrentStageForm = stages[modal.currentStage].querySelector('iframe');

      if (messageEvent.data && messageEvent.data.frameHeight && hasCurrentStageForm) {
        const modalActiveStage = modal.querySelector('.modal__stage.active');
        modal.iframeHeight = messageEvent.data.frameHeight;
        stagesContainer.animate([{
          height: "".concat(modal.currentHeight, "px")
        }, {
          height: "".concat(modalActiveStage.scrollHeight, "px")
        }], {
          duration: 200,
          fill: 'forwards'
        });
      }

      if ((messageEvent.data.formSubmitted || 2 === messageEvent.data.formStage) && isSameSource && hasCurrentStageForm) {
        setModalStage(modal.currentStage + 1);
      }
    });
  }
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__["initBlock"])('.modal', initModal);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "../site-options/04-languages.json":
/*!*****************************************!*\
  !*** ../site-options/04-languages.json ***!
  \*****************************************/
/*! exports provided: eu_default_lang_code, eu_default_for, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"eu_default_lang_code\":\"en-eu\",\"eu_default_for\":[\"en-at\",\"en-be\",\"en-cy\",\"en-ee\",\"en-fi\",\"en-de\",\"en-gr\",\"en-it\",\"en-lv\",\"en-lt\",\"en-lu\",\"en-mt\",\"en-nl\",\"en-pt\",\"en-sk\",\"en-si\",\"en-es\"]}");

/***/ }),

/***/ 232:
/*!**************************************************************!*\
  !*** multi ../blocks/fpbk/modal/src/frontend/modal-block.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/modal/src/frontend/modal-block.js */"../blocks/fpbk/modal/src/frontend/modal-block.js");


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
//# sourceMappingURL=blocks-fpbk-modal-modal-block.js.map