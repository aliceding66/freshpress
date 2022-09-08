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
/******/ 		"global": 0
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
/******/ 	deferredModules.push([26,"common-helpers","common-modules","vendor-core-js","vendor-dashify","vendor-magnum-ui","vendor-smoothscroll-polyfill","vendor-js-cookie","common-json","vendor-uuid","vendor-bootstrap","vendor-validator","vendor-is-plain-obj"]);
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

/***/ "./scripts/global.js":
/*!***************************!*\
  !*** ./scripts/global.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_modules_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/modules/_animations */ "./scripts/modules/_animations.js");
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_forms */ "./scripts/modules/_forms.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");
/* harmony import */ var scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/modules/_tracking */ "./scripts/modules/_tracking.js");
/* harmony import */ var scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/helpers/_utils */ "./scripts/helpers/_utils.js");
/* harmony import */ var scripts_templates_common_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/templates/common/header */ "./scripts/templates/common/header.js");
/* harmony import */ var scripts_templates_common_footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! scripts/templates/common/footer */ "./scripts/templates/common/footer.js");
/* harmony import */ var scripts_templates_common_region_selection_header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/templates/common/region-selection-header */ "./scripts/templates/common/region-selection-header.js");
/* harmony import */ var scripts_templates_common_region_selection_footer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! scripts/templates/common/region-selection-footer */ "./scripts/templates/common/region-selection-footer.js");
/* harmony import */ var scripts_templates_common_header_banner_promo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! scripts/templates/common/header-banner-promo */ "./scripts/templates/common/header-banner-promo.js");











/**
 * Init function executed once the DOM has loaded.
 */

const contentLoadedInit = () => {
  Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__["addLinkTracking"])();
  Object(scripts_modules_forms__WEBPACK_IMPORTED_MODULE_2__["initForms"])();
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["initCookieModal"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["initSmoothScroll"])();
  Object(scripts_modules_animations__WEBPACK_IMPORTED_MODULE_0__["initAnimations"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["addStickyTopObserver"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["addStickyBottomObserver"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["replaceRegionalisedUrls"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["cleanupTelLinks"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["externalLinksPatcher"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["setTrialLengthCookie"])();
  Object(scripts_templates_common_header__WEBPACK_IMPORTED_MODULE_6__["initHeader"])();
  Object(scripts_templates_common_footer__WEBPACK_IMPORTED_MODULE_7__["initFooter"])();
  Object(scripts_templates_common_region_selection_header__WEBPACK_IMPORTED_MODULE_8__["initRSHeader"])();
  Object(scripts_templates_common_region_selection_footer__WEBPACK_IMPORTED_MODULE_9__["initRSFooter"])();
  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["initCookiesModalListener"])();
  Object(scripts_templates_common_header_banner_promo__WEBPACK_IMPORTED_MODULE_10__["initBannerPromo"])();
  Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["initOpenModalLinks"])();
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
};
/**
 * Init function executed as soon as possible (i.e., it won't wait for the DOM to load).
 */


const immediateInit = () => {
  if (null === document.body) {
    return;
  }

  Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_1__["initCookieDefaults"])();
  Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_3__["setRegionCookies"])();
  Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__["initAttributionTracking"])();
  Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_4__["setGlobalDataLayer"])();
  document.body.classList.add('loading');

  if (Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_5__["isNfbCustomer"])()) {
    document.body.classList.remove('fbprospect');
    document.body.classList.add('fbcustomer');
  } // Execute contentLoaded function once DOM loaded.


  document.addEventListener('DOMContentLoaded', contentLoadedInit, false);
}; // Execute immediateInit function ASAP.


immediateInit();

/***/ }),

/***/ "./scripts/templates/common/footer.js":
/*!********************************************!*\
  !*** ./scripts/templates/common/footer.js ***!
  \********************************************/
/*! exports provided: initFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFooter", function() { return initFooter; });
/**
 * Footer.
 */
const initFooter = () => {
  const footer = document.querySelector('.footer');

  if (footer) {
    // Mobile Nav.
    const footerMenuClasses = {
      menuItemActive: 'footer__nav-menu-item_active',
      menuItems: 'footer .nav .menu-item-has-children'
    }; // Sub-menus show/hide.

    const menuItems = footer.querySelectorAll(footerMenuClasses.menuItems);

    if (menuItems) {
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle(footerMenuClasses.menuItemActive);
        });
      });
    }
  }
};

/***/ }),

/***/ "./scripts/templates/common/header-banner-promo.js":
/*!*********************************************************!*\
  !*** ./scripts/templates/common/header-banner-promo.js ***!
  \*********************************************************/
/*! exports provided: initBannerPromo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBannerPromo", function() { return initBannerPromo; });
/* harmony import */ var scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/helpers/_utils */ "./scripts/helpers/_utils.js");
/**
 * Direct Buy Banner
 */

const initBannerPromo = () => {
  const banner = document.querySelectorAll('.banner-promo');
  banner.forEach(item => {
    if (!!Object(scripts_helpers_utils__WEBPACK_IMPORTED_MODULE_0__["isNfbCustomer"])()) {
      item.classList.add('d-none');
      item.classList.remove('slide-in');
    }
  });
};

/***/ }),

/***/ "./scripts/templates/common/header.js":
/*!********************************************!*\
  !*** ./scripts/templates/common/header.js ***!
  \********************************************/
/*! exports provided: initHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initHeader", function() { return initHeader; });
/**
 * The header.
 */
const stickyHeader = desktopHeader => {
  const {
    scrollY
  } = window;

  if (scrollY > 0) {
    desktopHeader.classList.add('sticky');
  } else {
    desktopHeader.classList.remove('sticky');
  }
};

const initHeader = () => {
  const header = document.querySelector('.header');
  const desktopHeader = document.querySelector('.header__desktop-header');

  if (header) {
    // Mobile Nav.
    const menuClasses = {
      menuItemActive: 'header__nav-menu-item_active',
      menuItems: '#header__mobile-header .menu-item-has-children',
      mobileHandlerBodyActive: 'header__body_active',
      mobileHandlerClose: '#header__menu-handler-image_close',
      mobileHandlerImageActive: 'header__menu-handler-image_active',
      mobileHandlerOpen: '#header__menu-handler-image_open',
      mobileHeaderBody: '#header__body',
      displayNone: 'd-none'
    }; // Main menu show/hide.

    const mobileHandlerOpen = document.querySelector(menuClasses.mobileHandlerOpen);
    const mobileHandlerClose = document.querySelector(menuClasses.mobileHandlerClose);
    const mobileHeaderBody = document.querySelector(menuClasses.mobileHeaderBody);

    if (mobileHandlerOpen) {
      mobileHandlerOpen.addEventListener('click', el => {
        el.target.classList.add(menuClasses.displayNone);
        mobileHandlerClose.classList.remove(menuClasses.displayNone);
        mobileHeaderBody.classList.add(menuClasses.mobileHandlerBodyActive);
      });
    }

    if (mobileHandlerClose) {
      mobileHandlerClose.addEventListener('click', el => {
        el.target.classList.add(menuClasses.displayNone);
        mobileHandlerOpen.classList.remove(menuClasses.displayNone);
        mobileHeaderBody.classList.remove(menuClasses.mobileHandlerBodyActive);
      });
    } // Sub-menus show/hide.


    const menuItems = document.querySelectorAll(menuClasses.menuItems);
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle(menuClasses.menuItemActive);
      });
    });

    if (desktopHeader) {
      let scrollWaiting;
      stickyHeader(desktopHeader);
      window.addEventListener('scroll', () => {
        stickyHeader(desktopHeader);

        if (scrollWaiting) {
          return;
        }

        scrollWaiting = true;
        stickyHeader(desktopHeader);
        setTimeout(() => {
          scrollWaiting = false;
        }, 100);
      });
      desktopHeader.querySelectorAll('li>a[tabindex]').forEach(item => {
        item.addEventListener('mouseenter', () => {
          const focusedElement = desktopHeader.querySelector(':focus');

          if (focusedElement && focusedElement !== item) {
            focusedElement.blur();
          }
        });
      });
    }
  }
};

/***/ }),

/***/ "./scripts/templates/common/region-selection-footer.js":
/*!*************************************************************!*\
  !*** ./scripts/templates/common/region-selection-footer.js ***!
  \*************************************************************/
/*! exports provided: initRSFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initRSFooter", function() { return initRSFooter; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_tracking */ "./scripts/modules/_tracking.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");



/**
 * Bind click of select-like element to visibility of associated modal.
 *
 * @param {HTMLElement} thisSelectorEl Clicked select element.
 * @param {HTMLElement} thatSelectorEl Sibling select of clicked select element
 * @param {HTMLElement} thisModal      Modal associated with clicked select element.
 * @param {HTMLElement} thatModal      Sibling modal of expanded modal element.
 */

const modalAction = (thisSelectorEl, thatSelectorEl, thisModal, thatModal) => {
  thisSelectorEl.addEventListener('click', () => {
    if (thisModal.classList.contains('d-none')) {
      thisModal.classList.remove('d-none');
      thisSelectorEl.classList.add('expanded');
    } else {
      thisModal.classList.add('d-none');
      thisSelectorEl.classList.remove('expanded');
    }

    thatModal.classList.add('d-none');
    thatSelectorEl.classList.remove('expanded');
  });
};
/**
 * Adjust the position of expanded modals to align with style at active viewport size.
 *
 * @param {HTMLElement} select Associated select element of modal to align
 * @param {HTMLElement} modal  Modal to align
 */


const positionModal = (select, modal) => {
  const footerBoundary = document.querySelector('footer').getBoundingClientRect().left;
  let leftOffset = window.pageXOffset + select.getBoundingClientRect().left;
  const screenWidth = window.screen.width;
  let xPadding = 0;

  if (screenWidth > 480 && screenWidth <= 768) {
    xPadding = 15;
  } else if (screenWidth > 768 && screenWidth <= 1280) {
    xPadding = 40;
  } else if (screenWidth > 1280) {
    leftOffset -= footerBoundary;
    xPadding = 40;
  } else {
    leftOffset = 0;
  }

  const totalOffset = leftOffset - xPadding > 0 ? leftOffset - xPadding : 0;
  modal.style.left = "".concat(totalOffset, "px");
};
/**
 * Close the modal and collapse the selector for a given pair.
 *
 * @param {HTMLElement} selectorEl Selector element
 * @param {HTMLElement} modalEl    Related modal element
 */


const closeModal = (selectorEl, modalEl) => {
  if (selectorEl.classList.contains('expanded') || !modalEl.classList.contains('d-none')) {
    selectorEl.classList.remove('expanded');
    modalEl.classList.add('d-none');
  }
};

const initRSFooter = () => {
  const footer = document.querySelector('.region-selection-footer');

  if (footer) {
    const countrySelector = footer.querySelector('.region-select');
    const countryModal = footer.querySelector('.modal__region');
    const languageSelector = footer.querySelector('.language-select');
    const languageModal = footer.querySelector('.modal__language');
    modalAction(countrySelector, languageSelector, countryModal, languageModal);
    modalAction(languageSelector, countrySelector, languageModal, countryModal); // Collapse select modals on resize

    window.addEventListener('resize', () => {
      closeModal(countrySelector, countryModal);
      closeModal(languageSelector, languageModal);
    }); // Collapse select modals on click outside

    document.addEventListener('click', e => {
      if (!footer.contains(e.target)) {
        closeModal(countrySelector, countryModal);
        closeModal(languageSelector, languageModal);
      }
    }); // Reposition modals on init,...

    positionModal(countrySelector, countryModal);
    positionModal(languageSelector, languageModal); // ... resize,...
    // window.onresize = () => {

    window.addEventListener('resize', () => {
      positionModal(countrySelector, countryModal);
      positionModal(languageSelector, languageModal);
    }); // ... and click.

    countrySelector.addEventListener('click', () => {
      positionModal(countrySelector, countryModal);
      positionModal(languageSelector, languageModal);
    });
    const regions = document.querySelectorAll('.region');
    regions.forEach(region => {
      const {
        countryCode,
        countryName
      } = region.dataset;
      region.addEventListener('click', e => {
        e.preventDefault();

        if (region.classList.contains('multilingual')) {
          // Close the country selector modal
          closeModal(countrySelector, countryModal); // Update the closed country selector values

          const countrySelectorFlagIcon = countrySelector.querySelector('.flag-icon');
          const countrySelectorText = countrySelector.querySelector('.selector');
          countrySelectorFlagIcon.className = countrySelectorFlagIcon.className.replace(/\bflag-icon-[a-z]{2}\b/, '');
          countrySelectorFlagIcon.classList.add("flag-icon-".concat(countryCode.toLowerCase()));
          countrySelectorText.textContent = countryName; // Show the language selector

          positionModal(languageSelector, languageModal);
          languageSelector.classList.remove('d-none'); // Show only this countries languages, if multilingual

          languageModal.querySelectorAll('.language').forEach(lang => {
            if (lang.classList.contains(countryCode.toLowerCase())) {
              lang.classList.remove('d-none');
            } else {
              lang.classList.add('d-none');
            }
          }); // Open the language selection modal by default

          if (languageModal.classList.contains('d-none')) {
            positionModal(languageSelector, languageModal);
            languageModal.classList.remove('d-none');
            languageSelector.classList.add('expanded');
          }

          footer.className = footer.className.replace(/\bregion-[a-z]{2}\b/, '');
          footer.classList.add("region-".concat(countryCode.toLowerCase()));
        } else {
          languageSelector.classList.add('d-none');
          languageModal.classList.add('d-none');
          Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_2__["setUserCountryCode"])(countryCode);
          Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_2__["setUserCountryName"])(countryName);
          Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_1__["track"])('gtm', {
            event: 'linkClick',
            ctaText: countryName.toLowerCase().replace(/ /g, ''),
            ctaSection: 'footer'
          });
          window.location = e.target.href;
        }
      });
    });
  }
};

/***/ }),

/***/ "./scripts/templates/common/region-selection-header.js":
/*!*************************************************************!*\
  !*** ./scripts/templates/common/region-selection-header.js ***!
  \*************************************************************/
/*! exports provided: initRSHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initRSHeader", function() { return initRSHeader; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_tracking */ "./scripts/modules/_tracking.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");





const initRSHeader = () => {
  // Elements
  const banner = document.querySelector('.region-selection-header');

  if (banner) {
    const close = banner.querySelector('.btn-close');
    const select = banner.querySelector('.region-selection-header__select select'); // Codes and Cookies

    const {
      supportedRegions
    } = window.fbVars.i18n;
    const siteCountryCode = Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getSiteCountryCode"])('lower');
    const suggestedCountryCode = Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["getSuggestedCountryCode"])('lower');
    const dismissedCookie = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["readCookie"])('user-country-banner-dismiss') === 'true'; // Users region is diff from region of site they're visiting AND
    // User's region matches one of regions we support

    if (!dismissedCookie && suggestedCountryCode !== siteCountryCode && supportedRegions) {
      banner.classList.remove('d-none'); // Set dismiss button to close the banner and set user lang to current page lang

      close.addEventListener('click', e => {
        e.preventDefault();
        Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_2__["createCookie"])('user-country-banner-dismiss', 'true', 0); // Set session cookie.

        banner.classList.add('d-none');
      }); // Intercept button click to set user region selection cookie and redirect to correct url

      select.addEventListener('change', () => {
        const [selectedLangCode, selectedCountryCode] = select.value.split('-');

        if (selectedLangCode && selectedCountryCode && supportedRegions[selectedCountryCode] && supportedRegions[selectedCountryCode][selectedLangCode]) {
          const newRegion = supportedRegions[selectedCountryCode][selectedLangCode];

          if (newRegion.countryName && newRegion.url) {
            Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["setUserCountryCode"])(selectedCountryCode);
            Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_4__["setUserCountryName"])(newRegion.countryName);
            Object(scripts_modules_tracking__WEBPACK_IMPORTED_MODULE_3__["track"])('gtm', {
              event: 'linkClick',
              ctaText: newRegion.countryName.toLowerCase().replace(/ /g, ''),
              ctaSection: 'header'
            });
            window.location = newRegion.url;
          }
        }
      });
    }
  }
};

/***/ }),

/***/ "./styles/global.scss":
/*!****************************!*\
  !*** ./styles/global.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 26:
/*!******************************************************!*\
  !*** multi ./scripts/global.js ./styles/global.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/scripts/global.js */"./scripts/global.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/styles/global.scss */"./styles/global.scss");


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
//# sourceMappingURL=global.js.map