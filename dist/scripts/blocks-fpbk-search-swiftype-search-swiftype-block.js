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
/******/ 		"blocks-fpbk-search-swiftype-search-swiftype-block": 0
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
/******/ 	deferredModules.push([238,"common-helpers"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../blocks/fpbk/search-swiftype/src/frontend/search-swiftype-block.js":
/*!****************************************************************************!*\
  !*** ../blocks/fpbk/search-swiftype/src/frontend/search-swiftype-block.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/**
 * Search Swiftype.
 */
 // eslint-disable-next-line no-unused-vars

const initSearchSwiftype = searchSwiftype => {
  setTimeout(() => {
    if (searchSwiftype.dataset && searchSwiftype.dataset.swiftypeId) {
      const searchInput = searchSwiftype.querySelector('.search-swiftype__input');
      const searchContainer = searchSwiftype.querySelector('.st-search-container');
      const noResultContainer = searchSwiftype.querySelector('.search-swiftype__no-results');

      const checkNoResultOn = toCheckResultContainer => {
        const noResults = toCheckResultContainer.querySelectorAll('.st-ui-result').length === 0;

        if (noResults && searchInput.value !== '') {
          noResultContainer.classList.remove('d-none');
        } else {
          noResultContainer.classList.add('d-none');
        }
      };

      if (searchContainer && noResultContainer) {
        // eslint-disable-next-line no-undef
        const noResultMutationObserver = new MutationObserver(() => {
          checkNoResultOn(searchContainer);
        });
        noResultMutationObserver.observe(searchContainer, {
          attributes: false,
          childList: true,
          subtree: true
        });
      }

      let checkTimeout; // eslint-disable-next-line no-undef

      const injectedContentMutationObserver = new MutationObserver(() => {
        const injectedContent = document.getElementById('st-injected-content');

        if (injectedContent) {
          checkNoResultOn(injectedContent);

          const checkCallback = () => {
            if (searchInput.value === '') {
              checkNoResultOn(injectedContent);
            } else {
              clearTimeout(checkTimeout);
              checkTimeout = setTimeout(() => {
                checkNoResultOn(injectedContent);
              }, 1000);
            }
          };

          searchInput.removeEventListener('keyup', checkCallback);
          searchInput.addEventListener('keyup', checkCallback);
        }
      });
      injectedContentMutationObserver.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: true
      });
      const swiftypeID = searchSwiftype.dataset.swiftypeId;
      const swiftypeSnippet = "(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);})(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');_st('install','".concat(swiftypeID, "','2.0.0');");
      const scriptNode = document.createElement('SCRIPT');
      scriptNode.innerText = swiftypeSnippet;
      document.body.appendChild(scriptNode);
    }
  }, 10);
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__["initBlock"])('.search-swiftype', initSearchSwiftype);

/***/ }),

/***/ 238:
/*!**********************************************************************************!*\
  !*** multi ../blocks/fpbk/search-swiftype/src/frontend/search-swiftype-block.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/search-swiftype/src/frontend/search-swiftype-block.js */"../blocks/fpbk/search-swiftype/src/frontend/search-swiftype-block.js");


/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-search-swiftype-search-swiftype-block.js.map