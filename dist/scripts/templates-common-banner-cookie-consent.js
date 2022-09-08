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
/******/ 		"templates-common-banner-cookie-consent": 0
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
/******/ 	deferredModules.push([30,"common-helpers","common-modules","vendor-core-js","vendor-dashify","vendor-magnum-ui","vendor-smoothscroll-polyfill","vendor-js-cookie","common-json"]);
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

/***/ "../site-options/04-languages.json":
/*!*****************************************!*\
  !*** ../site-options/04-languages.json ***!
  \*****************************************/
/*! exports provided: eu_default_lang_code, eu_default_for, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"eu_default_lang_code\":\"en-eu\",\"eu_default_for\":[\"en-at\",\"en-be\",\"en-cy\",\"en-ee\",\"en-fi\",\"en-de\",\"en-gr\",\"en-it\",\"en-lv\",\"en-lt\",\"en-lu\",\"en-mt\",\"en-nl\",\"en-pt\",\"en-sk\",\"en-si\",\"en-es\"]}");

/***/ }),

/***/ "./scripts/templates/common/banner-cookie-consent.js":
/*!***********************************************************!*\
  !*** ./scripts/templates/common/banner-cookie-consent.js ***!
  \***********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");


const initializeCookieBanner = () => {
  const banner = document.querySelector('.banner-cookie-consent');
  const cookieName = "banner-cookie-consent-dismissed";
  const legacyCookieName = 'banner-cookie-policy-dismissed';
  const btnAccept = banner.querySelector('.js-cookies-accept');
  const btnReject = banner.querySelector('.js-cookies-decline');

  if (!Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["readCookie"])(cookieName) && !Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["readCookie"])(legacyCookieName) && !(Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["isCookiePolicyAccepted"])() || Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["isCookiePolicyDeclined"])())) {
    banner.classList.remove('d-none');
    btnAccept.addEventListener('click', e => {
      e.preventDefault();
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["createCookie"])(cookieName, 'true', 365);
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["createCookie"])(legacyCookieName, 'true', 365);
      banner.classList.add('d-none');
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["acceptCookiePolicy"])();
    });
    btnReject.addEventListener('click', e => {
      e.preventDefault();
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["createCookie"])(cookieName, 'true', 30);
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["createCookie"])(legacyCookieName, 'true', 30);
      banner.classList.add('d-none');
      Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_0__["declineCookiePolicy"])({
        redirect: true
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', initializeCookieBanner, false);

/***/ }),

/***/ "./styles/templates/common/banner-cookie-consent.scss":
/*!************************************************************!*\
  !*** ./styles/templates/common/banner-cookie-consent.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 30:
/*!**********************************************************************************************************************!*\
  !*** multi ./scripts/templates/common/banner-cookie-consent.js ./styles/templates/common/banner-cookie-consent.scss ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/scripts/templates/common/banner-cookie-consent.js */"./scripts/templates/common/banner-cookie-consent.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/styles/templates/common/banner-cookie-consent.scss */"./styles/templates/common/banner-cookie-consent.scss");


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
//# sourceMappingURL=templates-common-banner-cookie-consent.js.map