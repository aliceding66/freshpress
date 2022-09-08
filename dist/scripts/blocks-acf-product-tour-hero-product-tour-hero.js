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
/******/ 		"blocks-acf-product-tour-hero-product-tour-hero": 0
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
/******/ 	deferredModules.push([16,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/acf/product-tour-hero/product-tour-hero.js":
/*!************************************************************!*\
  !*** ../blocks/acf/product-tour-hero/product-tour-hero.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");
/* harmony import */ var scripts_modules_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/modules/_animations */ "./scripts/modules/_animations.js");
/**
 * Product Tour Hero.
 */


const videoCoverClass = 'product-tour-hero__video-cover-file';
const videoClass = 'product-tour-hero__video-file';
const videoLoadedClass = 'loaded';
const youtubePlayerId = 'youtube_player';
const videoRatioSizeId = 'video_ratio_size';
const dropdownClass = 'product-tour-hero__dropdown';
const dropdownExpandedClass = 'product-tour-hero__dropdown--expanded';

class ProductTourHero {
  constructor(blockWrapper) {
    this.blockWrapperId = blockWrapper.id;
    this.youtube = {
      player: null,
      staticOptions: {
        autoplay: 0,
        cc_lang_pref: 'en',
        disablekb: 1,
        enablejsapi: 1,
        iv_load_policy: 3,
        rel: 0,
        showinfo: 0
      }
    };
    this.init();
  }

  init() {
    this.attachYoutubePlayer();
    setTimeout(() => {
      this.handleMobileDropdown();
      this.handleVideoResizing();
      this.handleVideoPlaying();
    }, 100);
  }

  handleMobileDropdown() {
    const dropdownNode = document.querySelector("#".concat(this.blockWrapperId, " .").concat(dropdownClass));
    dropdownNode.addEventListener('click', () => {
      dropdownNode.classList.toggle(dropdownExpandedClass);
    });
  }

  attachYoutubePlayer() {
    const video = this.getVideoNodes();

    if (video.node && video.node.id === youtubePlayerId && video.node.dataset.videoId) {
      window.onYouTubeIframeAPIReady = () => {
        // eslint-disable-next-line no-undef,no-unused-vars
        this.youtube.player = new YT.Player(video.node, {
          videoId: video.node.dataset.videoId,
          playerVars: Object.assign(this.youtube.staticOptions, {
            mute: parseInt(video.node.dataset.videoMuted),
            origin: window.location.origin,
            playlist: video.node.dataset.videoId,
            controls: parseInt(video.node.dataset.videoControls),
            loop: parseInt(video.node.dataset.videoLoop),
            cc_load_policy: parseInt(video.node.dataset.videoCc)
          }),
          events: {
            onReady: () => {
              this.handleVideoResizing();

              if (video.node.dataset.playOnLoad > 0) {
                this.playVideo();
              }
            },
            onStateChange: event => {
              // eslint-disable-next-line no-undef
              if (event.data === YT.PlayerState.PLAYING) {
                document.getElementById(youtubePlayerId).classList.add('product-tour-hero__video-player--playing');
              }
            },
            onApiChange: () => {
              if (video.node.dataset.videoCc > 0 && typeof this.youtube.player.setOption === 'function') {
                // Without that call captions do not work.
                this.youtube.player.setOption('captions', 'track', {
                  languageCode: 'en'
                });
              }
            }
          }
        });
      };

      this.loadYouTubeApi();
    }
  }

  handleVideoResizing() {
    const video = this.getVideoNodes();

    if (this.youtube.player && video.node && video.node.dataset.videoId) {
      // eslint-disable-next-line no-undef
      fetch("https://youtube.com/oembed?url=http://www.youtube.com/watch?v=".concat(video.node.dataset.videoId, "&format=json")).then(response => {
        if (response && response.ok) {
          response.json().then(youtubeVideoData => {
            if (youtubeVideoData && youtubeVideoData.width && youtubeVideoData.height) {
              this.setVideoRatioSize(youtubeVideoData.width, youtubeVideoData.height);
            }
          }).catch(() => {//Ommit console error.
          });
        }
      }).catch(() => {//Ommit console error.
      });
    } else if (video.node && video.node.id !== youtubePlayerId) {
      if (video.node.tagName === 'IMG' || video.node.tagName === 'VIDEO') {
        if (video.node.classList.contains(videoLoadedClass) || video.node.tagName === 'VIDEO' && video.node.readyState > 0) {
          this.setVideoRatioSize(video.node.clientWidth, video.node.clientHeight);
        } else {
          video.node.addEventListener('load', () => {
            this.setVideoRatioSize(video.node.clientWidth, video.node.clientHeight);
          });
          video.node.addEventListener('canplay', () => {
            this.setVideoRatioSize(video.node.clientWidth, video.node.clientHeight);
          });
        }

        this.setVideoRatioSize(video.node.clientWidth, video.node.clientHeight);
      }
    }
  }

  setVideoRatioSize(width, height) {
    const video = this.getVideoNodes();

    if (video.ratioSize) {
      const ratio = parseInt(height) / parseInt(width);
      video.ratioSize.style.paddingTop = Number(ratio) * 100 + '%';
    }
  }

  handleVideoPlaying() {
    const video = this.getVideoNodes();

    if (video.node) {
      if (parseInt(video.node.dataset.playOnLoad) === 0) {
        video.cover.addEventListener('click', () => {
          this.playVideo();
        });
      } else if (video.node.classList.contains(videoLoadedClass) || video.node.tagName === 'VIDEO' && video.node.readyState > 0) {
        this.playVideo();
      } else {
        video.node.addEventListener('load', () => {
          this.playVideo();
        });
        video.node.addEventListener('canplay', () => {
          this.playVideo();
        });
      }
    }
  }

  playVideo() {
    const video = this.getVideoNodes();
    Object(scripts_modules_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(video.cover, 'fade_away');
    Object(scripts_modules_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(video.node, 'fade_in');

    if (this.youtube.player) {
      this.youtube.player.playVideo();
    } else if (video.node.tagName === 'VIDEO') {
      video.node.play();
    } else if (video.node.tagName === 'IMG') {
      //start GIF from beginning
      const imgSrc = video.node.src;
      video.node.src = '';
      video.node.src = imgSrc;
    }
  }

  loadYouTubeApi() {
    if (typeof YT === 'undefined') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  } //Always get fresh nodes as they might change dynamically.


  getVideoNodes() {
    return {
      node: document.querySelector("#".concat(this.blockWrapperId, " .").concat(videoClass)),
      cover: document.querySelector("#".concat(this.blockWrapperId, " .").concat(videoCoverClass)),
      ratioSize: document.querySelector("#".concat(this.blockWrapperId, " #").concat(videoRatioSizeId))
    };
  }

}

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_0__["initBlock"])('.product-tour-hero', productTourHero => {
  new ProductTourHero(productTourHero);
});

/***/ }),

/***/ "../blocks/acf/product-tour-hero/product-tour-hero.scss":
/*!**************************************************************!*\
  !*** ../blocks/acf/product-tour-hero/product-tour-hero.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 16:
/*!*************************************************************************************************************************!*\
  !*** multi ../blocks/acf/product-tour-hero/product-tour-hero.js ../blocks/acf/product-tour-hero/product-tour-hero.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/product-tour-hero/product-tour-hero.js */"../blocks/acf/product-tour-hero/product-tour-hero.js");
module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/acf/product-tour-hero/product-tour-hero.scss */"../blocks/acf/product-tour-hero/product-tour-hero.scss");


/***/ })

/******/ });
//# sourceMappingURL=blocks-acf-product-tour-hero-product-tour-hero.js.map