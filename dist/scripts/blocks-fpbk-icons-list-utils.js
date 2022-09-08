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
/******/ 	return __webpack_require__(__webpack_require__.s = 145);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../blocks/fpbk/icons-list/src/utils.js":
/*!**********************************************!*\
  !*** ../blocks/fpbk/icons-list/src/utils.js ***!
  \**********************************************/
/*! exports provided: setCommonAttributes, setTopicAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommonAttributes", function() { return setCommonAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTopicAttributes", function() { return setTopicAttributes; });
function setCommonAttributes(attributes) {
  // Starter object.
  const commonTopicAttributes = {}; // Columns Number/Class.

  const columnsNumber = attributes.block_settings_icons_list_columns;
  let columnsClass = 'col-12';

  if ('2' === columnsNumber) {
    columnsClass += ' col-sm-6';
  } else if ('3' === columnsNumber) {
    columnsClass += ' col-sm-6 col-md-4';
  } else if ('4' === columnsNumber) {
    columnsClass += ' col-sm-6 col-md-4 col-lg-3';
  } // Stack.


  if (attributes.block_settings_topic_elements_stack) {
    columnsClass += ' flex-column justify-content-center';
  }

  commonTopicAttributes.columns_class = columnsClass; // Topic Icon Class.

  let topicIconClass = 'mr-3';

  if (attributes.block_settings_topic_elements_stack) {
    topicIconClass = 'mx-auto';
  }

  commonTopicAttributes.topic_icon_class = topicIconClass; // Description Class.

  let numberedTopicInfoClass = '';
  let showIcons = true;

  if (attributes.block_settings_numbered_topics) {
    numberedTopicInfoClass = 'pl-3 pl-md-1';
    showIcons = false;
  }

  commonTopicAttributes.show_icons = showIcons;
  commonTopicAttributes.numbered_topic_info_class = numberedTopicInfoClass; // Mobile Align Class.

  let mobileAlignClass = 'ml-0';

  if (attributes.block_settings_numbered_topics) {
    mobileAlignClass = 'text-left';
  } else if (attributes.block_settings_topic_elements_stack) {
    mobileAlignClass = 'mx-auto text-center';
  }

  commonTopicAttributes.mobile_align_class = mobileAlignClass;
  return commonTopicAttributes;
}
function setTopicAttributes(iconListTopic, topicIndex) {
  // Index.
  iconListTopic.index = topicIndex + 1; // Title Vertical Align Class / Has Description.

  let titleVerticalAlignClass = 'align-self-center';

  if (iconListTopic.icons_list_topic_text) {
    titleVerticalAlignClass = '';
  }

  iconListTopic.title_vertical_align_class = titleVerticalAlignClass;
  return iconListTopic;
}

/***/ }),

/***/ 145:
/*!****************************************************!*\
  !*** multi ../blocks/fpbk/icons-list/src/utils.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/icons-list/src/utils.js */"../blocks/fpbk/icons-list/src/utils.js");


/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-icons-list-utils.js.map