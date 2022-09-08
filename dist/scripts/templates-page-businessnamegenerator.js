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
/******/ 		"templates-page-businessnamegenerator": 0
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
/******/ 	deferredModules.push([42,"common-modules","vendor-core-js"]);
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

/***/ "./scripts/templates/page/businessnamegenerator.js":
/*!*********************************************************!*\
  !*** ./scripts/templates/page/businessnamegenerator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");

const initBusinessNameGenerator = () => {
  //Request for the API - start is a random number initially
  const request = {
    industry: '',
    key_word: '',
    count: 3,
    start: Math.floor(Math.random() * 100),
    nonce: $('#business_name_generator_nonce').val()
  };
  const states = {
    Start: '#bng-start',
    Industry: '#bng-industry',
    Query: '#bng-keyword',
    Options: '#bng-options',
    Result: '#bng-result'
  }; // Animation classes

  const slideOutLeft = 'animated fade-out-left';
  const slideInRight = 'animated fade-in-right';
  const slideOutRight = 'animated fade-out-right';
  const slideInLeft = 'animated fade-in-left';
  const fadeIn = 'animated fade-in';
  const endAnimation = 'animationend webkitAnimationEnd'; // Click Event on 'Let's Get Started'

  $('#get-started').on('click', function () {
    switchState('Start', 'Industry', 'right');
  }); // Go Back to Keyword Page

  $('#select-new-word').on('click', function (e) {
    e.preventDefault();
    switchState('Options', 'Query', 'left');
  }); // Click Event on 'Industry'

  $('.hero__industry').on('click', function () {
    request.industry = $(this).attr('id');
    switchState('Industry', 'Query', 'right');
  }); // Click Event on 'Keyword'

  $('#keyword-submit').on('click', function (e) {
    e.preventDefault();
    const $keyWordInput = $('.keyword-input');
    let keyWord = $keyWordInput.val().trim();
    keyWord = toTitleCase(keyWord); //Client side validation here

    if (isValidKeyWord(keyWord)) {
      request.key_word = keyWord; //Starts spinner

      $(this).addClass('button-disabled');
      $(this).find('span').addClass('is-transparent');
      $(this).attr('disabled', 'disabled');
      requestNames(function (names) {
        //Stops spinner
        $(this).removeClass('button-disabled');
        $(this).find('span').removeClass('is-transparent');
        $(this).removeAttr('disabled'); //Adds results to Options state

        clearResults();
        names.forEach(addResult); //Switches to Options state

        switchState('Query', 'Options', 'right', function () {
          setTimeout(function () {
            $('#magic-wand').removeClass('hidden-wand').one(endAnimation, function () {
              $(this).removeClass('fade-in');
            });
          }, 1000);
        });
      });
    } else {
      $keyWordInput.addClass('has-error');
    }
  }); // Show more names

  $('#see-more').on('click', function (e) {
    e.preventDefault();
    requestNames(function (names) {
      clearResults();
      names.forEach(addResult);
    });
  }); // Click Event on Options

  $('#options-container').on('click', '.name-option', function () {
    const name = $(this).text();
    $('.business-name-result').text(name);
    switchState('Options', 'Result', 'right', function () {
      initLights();
      setTimeout(function () {
        $('.building-left').addClass(fadeIn);
        $('.building-right').addClass(fadeIn);
      }, 50);
      setTimeout(function () {
        $('.look-sign').addClass(fadeIn);
      }, 500);
      setTimeout(function () {
        $('.hero__name-container').addClass(fadeIn);
      }, 1000);
      setTimeout(function () {
        $('.hero__subtitle_blog-lead-in').addClass(fadeIn);
      }, 2500);
    });
  }); // Resize the Windows for the Lights

  $(window).resize(function () {
    $('.tile').remove();
    resizeLights();
  }); // Function to move to the next state of the Business Generator

  const switchState = function (prev, next, direction, callback) {
    const slideOut = direction === 'left' ? slideOutRight : slideOutLeft;
    const slideIn = direction === 'left' ? slideInLeft : slideInRight;
    const $statesNext = $(states[next]);
    $(states[prev]).addClass(slideOut).one(endAnimation, function () {
      $(this).removeClass(slideOut);
      $(this).addClass('hidden-step');
      $statesNext.removeClass('hidden-step').addClass(slideIn).one(endAnimation, function () {
        $(this).removeClass(slideIn); //execute optional callback

        typeof callback !== 'undefined' && callback(); // eslint-disable-line
      });
    });
  }; // Clear Results of the options generated


  const clearResults = () => {
    $('#options-container').empty();
  }; // Add Results to the Page


  const addResult = name => {
    $('#options-container').append('<button class="name-option">' + name + '</button>');
  };

  const isValidKeyWord = input => {
    return /^[a-zA-Z0-9][a-zA-Z\'0\d\-]*( [a-zA-Z0-9][a-zA-Z\'\d\-]*)*$/.test(input);
  };

  const toTitleCase = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }; // Dev: Daniel Hicks & Sacha Sayan


  const resizeLights = () => {
    const $nameContainer = $('.hero__name-container');
    const $centerContent = $('.center-content');
    $nameContainer.width('');
    $nameContainer.height('');
    $('.tile').hide(); // Let's round up our width to something divisible by 40

    const initialWidth = $nameContainer.width();
    let newWidth = initialWidth;

    if (initialWidth % 40 !== 0) {
      newWidth = initialWidth - initialWidth % 40 + 40;
    }

    $nameContainer.width(newWidth); // Let's add a number of tiles appropriate for our width

    for (let i = 0; i < newWidth / 40; i++) {
      $('.lights-row').append('<div class="tile"></div>');
    } // Let's round up our height to something divisible by 40


    const initialHeight = $centerContent.height();
    let newHeight = initialHeight;

    if (initialHeight % 40 !== 0) {
      newHeight = initialHeight - initialHeight % 40 + 40;
    }

    $centerContent.height(newHeight); // Let's add a number of tiles appropriate for our height

    for (let i = 0; i < newHeight / 40; i++) {
      $('.lights-col').append('<div class="tile"></div>');
    }
  };

  const randomizeLightCoordinates = function (tileSize) {
    $('.hero__name-container').find('.tile').each(function () {
      const bgX = Math.floor(Math.random() * 10) * tileSize;
      const bgY = Math.floor(Math.random() * 10) * tileSize;
      const cssString = bgX + 'px ' + bgY + 'px';
      $(this).css('background-position', cssString);
    });
  };

  const initLights = () => {
    resizeLights();
    window.setInterval(function () {
      randomizeLightCoordinates(20);
    }, 500);
  };

  const requestNames = function (onFinish) {
    $.ajax({
      url: '/wp-json/bng/generate?' + $.param(request),
      type: 'GET',
      data: {},
      datatype: 'json',

      success(data) {
        //Add to start for next request
        request.start += request.count;
        data.map(function (obj) {
          return obj.name;
        }); //Run optional callback with list of generated names

        typeof onFinish !== 'undefined' && // eslint-disable-line
        onFinish(data.map(function (obj) {
          return obj.name;
        }));
      }

    });
  };
};

document.addEventListener('DOMContentLoaded', initBusinessNameGenerator, false);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./styles/templates/page/businessnamegenerator.scss":
/*!**********************************************************!*\
  !*** ./styles/templates/page/businessnamegenerator.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 42:
/*!******************************************************************************************************************!*\
  !*** multi ./scripts/templates/page/businessnamegenerator.js ./styles/templates/page/businessnamegenerator.scss ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/scripts/templates/page/businessnamegenerator.js */"./scripts/templates/page/businessnamegenerator.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/assets/styles/templates/page/businessnamegenerator.scss */"./styles/templates/page/businessnamegenerator.scss");


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
//# sourceMappingURL=templates-page-businessnamegenerator.js.map