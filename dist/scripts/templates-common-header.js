/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ 34:
/*!**************************************************!*\
  !*** multi ./scripts/templates/common/header.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/scripts/templates/common/header.js */"./scripts/templates/common/header.js");


/***/ })

/******/ });
//# sourceMappingURL=templates-common-header.js.map