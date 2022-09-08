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
/******/ 		"templates-page-invoice-templates-gallery": 0
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
/******/ 	deferredModules.push([46,"common-modules","vendor-core-js"]);
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

/***/ "./scripts/templates/page/invoice-templates-gallery.js":
/*!*************************************************************!*\
  !*** ./scripts/templates/page/invoice-templates-gallery.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _paginationList$datas;

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");

const handleSearch = () => {
  const form = document.querySelector('.invoice-gallery-navbar__search-container form');
  const searchInput = document.querySelector('.invoice-gallery-navbar__search-input');
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      form.submit();
    }
  });
};

const handleMobileSelect = () => {
  const select = document.querySelector('#invoice-gallery-select');
  select.addEventListener('change', () => {
    window.location.href = "".concat(window.location.origin + window.location.pathname, "?template_category=").concat(select.value);
  });
};

const getPaginationElement = (el, current) => {
  let element = '';

  if (!isNaN(el)) {
    element = "<li data-page=\"".concat(el, "\" class=\"mx-1 d-flex justify-content-center align-items-center ").concat(el === current ? 'active' : '', "\">").concat(el, "</li>");
  } else {
    element = "<li class=\"mx-1 d-flex justify-content-center align-items-end\">...</li>";
  }

  return element;
};

const invoiceGalleryTopOffset = document.querySelector('.invoice-gallery').getBoundingClientRect().top + window.scrollY;
const invoiceCards = Array.from(document.querySelectorAll('.invoice-gallery__item'));
const leftArrow = document.querySelector('.invoice-gallery-pagination__arrow_left');
const rightArrow = document.querySelector('.invoice-gallery-pagination__arrow_right');
const paginationList = document.querySelector('.invoice-gallery-pagination__list');
const pagesCount = parseInt(paginationList === null || paginationList === void 0 ? void 0 : (_paginationList$datas = paginationList.dataset) === null || _paginationList$datas === void 0 ? void 0 : _paginationList$datas.pages);

const getPagination = (currentPage = 1) => {
  const current = currentPage,
        last = pagesCount,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [];
  let l;
  paginationList.innerHTML = '';

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(i);
    l = i;
  }

  rangeWithDots.forEach(item => {
    paginationList.innerHTML += getPaginationElement(item, currentPage);
  });
  const paginationButtons = document.querySelectorAll('.invoice-gallery-pagination__list li[data-page]');
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      window.currentPage = currentPage;
      window.scroll({
        top: invoiceGalleryTopOffset,
        behavior: 'smooth'
      });
      getPagination(parseInt(button.dataset.page));
    });
  });

  if (currentPage === 1) {
    leftArrow.classList.remove('active');
    rightArrow.classList.add('active');
  } else if (currentPage === pagesCount) {
    rightArrow.classList.remove('active');
    leftArrow.classList.add('active');
  } else {
    leftArrow.classList.add('active');
    rightArrow.classList.add('active');
  }

  invoiceCards.forEach(card => card.classList.add('d-none'));
  invoiceCards.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6).forEach(card => card.classList.remove('d-none'));
};

const handlePagination = (page = 1) => {
  window.currentPage = page;
  getPagination(page);
  leftArrow.addEventListener('click', () => {
    const selectedPage = window.currentPage > 1 ? window.currentPage - 1 : 1;
    window.currentPage = selectedPage;
    window.scroll({
      top: invoiceGalleryTopOffset,
      behavior: 'smooth'
    });
    getPagination(selectedPage);
  });
  rightArrow.addEventListener('click', () => {
    const selectedPage = window.currentPage < pagesCount ? window.currentPage + 1 : pagesCount;
    window.currentPage = selectedPage;
    window.scroll({
      top: invoiceGalleryTopOffset,
      behavior: 'smooth'
    });
    getPagination(selectedPage);
  });
};

const initInvoiceGalleryScripts = () => {
  handleSearch();
  handleMobileSelect();
  handlePagination();
};

document.addEventListener('DOMContentLoaded', initInvoiceGalleryScripts, false);

/***/ }),

/***/ "./styles/templates/page/invoice-templates-gallery.scss":
/*!**************************************************************!*\
  !*** ./styles/templates/page/invoice-templates-gallery.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 46:
/*!**************************************************************************************************************************!*\
  !*** multi ./scripts/templates/page/invoice-templates-gallery.js ./styles/templates/page/invoice-templates-gallery.scss ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/scripts/templates/page/invoice-templates-gallery.js */"./scripts/templates/page/invoice-templates-gallery.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/styles/templates/page/invoice-templates-gallery.scss */"./styles/templates/page/invoice-templates-gallery.scss");


/***/ })

/******/ });
//# sourceMappingURL=templates-page-invoice-templates-gallery.js.map