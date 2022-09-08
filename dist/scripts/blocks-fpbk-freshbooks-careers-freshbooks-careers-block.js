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
/******/ 		"blocks-fpbk-freshbooks-careers-freshbooks-careers-block": 0
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
/******/ 	deferredModules.push([227,"common-helpers","common-modules","vendor-core-js"]);
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

/***/ "../blocks/fpbk/freshbooks-careers/src/frontend/freshbooks-careers-block.js":
/*!**********************************************************************************!*\
  !*** ../blocks/fpbk/freshbooks-careers/src/frontend/freshbooks-careers-block.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_blocks */ "./scripts/helpers/_blocks.js");


/**
 * Freshbooks Careers.
 */


const getDepartments = block => {
  const departmentsSelect = block.querySelector('#departments'); // eslint-disable-next-line no-undef

  fetch('https://api.greenhouse.io/v1/boards/freshbooks/departments?render_as=tree').then(response => response.json()).then(response => {
    const departments = response.departments.filter(department => department.jobs.length || department.children.some(child => child.jobs.length));
    departments.forEach(department => {
      departmentsSelect.innerHTML += "<option value=\"".concat(department.id, "\">").concat(department.name, "</option>");

      if (department.children) {
        department.children.forEach(departmentChild => {
          if (departmentChild.jobs.length) {
            departmentsSelect.innerHTML += "<option value=\"".concat(departmentChild.id, "\">- ").concat(departmentChild.name, "</option>");
          }
        });
      }
    });
  });
};

const getLocations = block => {
  const locationsSelect = block.querySelector('#locations'); // eslint-disable-next-line no-undef

  fetch('https://api.greenhouse.io/v1/boards/freshbooks/jobs').then(response => response.json()).then(response => {
    const locations = [...new Set(response.jobs.map(job => job.location.name))];
    locations.forEach(location => {
      locationsSelect.innerHTML += "<option value=\"".concat(location, "\">").concat(location, "</option>");
    });
  });
};

const goToPage = (block, newPage) => {
  const paginationButtons = block.querySelectorAll('li');
  const buttonToHighlight = block.querySelector("li[data-page=\"".concat(newPage, "\"]"));
  const arrowLeft = block.querySelector('#nav-arrow-left');
  const arrowRight = block.querySelector('#nav-arrow-right');
  paginationButtons.forEach(btn => btn.classList.remove('active'));
  buttonToHighlight.classList.add('active');

  if (newPage === 1) {
    arrowLeft.classList.remove('active');
    arrowRight.classList.add('active');
  } else if (newPage === block.careers.paginationLength) {
    arrowRight.classList.remove('active');
    arrowLeft.classList.add('active');
  } else {
    arrowLeft.classList.add('active');
    arrowRight.classList.add('active');
  }

  block.careers.page = newPage;
  populateJobs(block, block.careers.jobs, block.careers.department, block.careers.location, newPage);
};

const handleArrows = block => {
  const arrowLeft = block.querySelector('#nav-arrow-left');
  const arrowRight = block.querySelector('#nav-arrow-right');
  arrowLeft.addEventListener('click', () => {
    if (block.careers.page > 1 && arrowLeft.classList.contains('active')) {
      goToPage(block, block.careers.page - 1);
    } else {
      arrowLeft.classList.remove('active');
    }
  });
  arrowRight.addEventListener('click', () => {
    if (block.careers.page < block.careers.paginationLength && arrowRight.classList.contains('active')) {
      goToPage(block, block.careers.page + 1);
    } else {
      arrowRight.classList.remove('active');
    }
  });
};

const populatePagination = (block, paginationLength = 1, page) => {
  const paginationContainer = block.querySelector('#pagination');
  const arrowRight = block.querySelector('#nav-arrow-right');
  let buttons = null;
  paginationContainer.innerHTML = '';
  block.careers.paginationLength = paginationLength;

  if (block.careers.paginationLength < 2) {
    arrowRight.classList.remove('active');
    paginationContainer.innerHTML += "\n\t\t\t<li data-page=\"1\" class=\"freshbooks-careers__page mx-1 d-flex justify-content-center align-items-center active\">1</li>\n\t\t";
  } else {
    for (let i = 1; i <= paginationLength; i++) {
      paginationContainer.innerHTML += "\n\t\t\t<li data-page=\"".concat(i, "\" class=\"freshbooks-careers__page mx-1 d-flex justify-content-center align-items-center\">\n\t\t\t\t").concat(i, "\n\t\t\t</li>\n\t\t");
    }

    if (block.careers.paginationLength !== block.careers.page) {
      arrowRight.classList.add('active');
    }
  }

  buttons = paginationContainer.querySelectorAll('li');
  buttons[page - 1].classList.add('active');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedPage = parseInt(button.dataset.page);
      goToPage(block, selectedPage, buttons, block.careers.paginationLength);
    });
  });
};

const populateJobs = (block, jobs, department = '', location = '', page = 1) => {
  const jobsContainer = block.querySelector('#jobs');
  const loader = block.querySelector('#loader');
  let filteredJobsLength = 0;
  jobsContainer.innerHTML = '';

  if (jobs) {
    if (department !== '') {
      jobs = jobs.filter(job => [parseInt(job.departments[0].id), parseInt(job.departments[0].parent_id)].includes(parseInt(department)));
    }

    if (location !== '') {
      jobs = jobs.filter(job => job.location.name === location);
    }

    filteredJobsLength = jobs.length;
    jobs = jobs.slice((page - 1) * 8, (page - 1) * 8 + 8);

    if (jobs.length) {
      jobs.forEach(job => {
        jobsContainer.innerHTML += "\n\t\t\t<a href=\"".concat(job.absolute_url, "\" class=\"freshbooks-careers__item d-flex flex-wrap text-decoration-none\" data-id=\"").concat(job.id, "\" data-location=\"").concat(job.location.name, "\">\n\t\t\t\t<h4 class=\"freshbooks-careers__item-text freshbooks-careers__item-text_title d-block pr-5 pr-sm-3\">").concat(job.title, "</h4>\n\t\t\t\t<span class=\"freshbooks-careers__item-text freshbooks-careers__item-department d-flex align-items-center pr-5 pr-sm-3\">").concat(job.departments[0].name, "</span>\n\t\t\t\t<span class=\"freshbooks-careers__item-text freshbooks-careers__item-location d-flex align-items-center pr-5 pr-sm-3\">").concat(job.location.name, "</span>\n\t\t\t</a>\n\t\t");
      });
    } else {
      loader.classList.remove('d-block');
      jobsContainer.innerHTML = "<div class=\"d-flex mt-5 mb-n3 justify-content-center font-weight-medium\">No jobs found</div>";
    }

    populatePagination(block, Math.ceil(filteredJobsLength / 8), page);
  }
};

const getJobs = block => {
  const jobsContainer = block.querySelector('#jobs');
  const loader = block.querySelector('#loader');
  const departmentsSelect = block.querySelector('#departments');
  const locationsSelect = block.querySelector('#locations');
  block.careers.department = departmentsSelect.value;
  block.careers.location = locationsSelect.value;
  block.careers.page = 1;
  jobsContainer.innerHTML = '';
  loader.classList.add('d-block');

  if (block.careers.jobs) {
    populateJobs(block, block.careers.jobs, block.careers.department, block.careers.location, block.careers.page);
    loader.classList.remove('d-block');
  } else {
    // eslint-disable-next-line no-undef
    fetch('https://api.greenhouse.io/v1/boards/freshbooks/jobs?content=true').then(response => response.json()).then(response => {
      block.careers.jobs = response.jobs;
      populateJobs(block, block.careers.jobs, block.careers.department, block.careers.location, block.careers.page);
      loader.classList.remove('d-block');
    });
  }
};

const initFreshbooksCareers = freshbooksCareers => {
  const departmentsSelect = freshbooksCareers.querySelector('#departments');
  const locationsSelect = freshbooksCareers.querySelector('#locations');
  freshbooksCareers.careers = {};
  getDepartments(freshbooksCareers);
  getLocations(freshbooksCareers);
  populateJobs(freshbooksCareers);
  handleArrows(freshbooksCareers);
  locationsSelect.addEventListener('change', () => {
    getJobs(freshbooksCareers);
  });
  departmentsSelect.addEventListener('change', () => {
    getJobs(freshbooksCareers);
  });
  getJobs(freshbooksCareers);
};

Object(scripts_helpers_blocks__WEBPACK_IMPORTED_MODULE_1__["initBlock"])('.freshbooks-careers', initFreshbooksCareers);

/***/ }),

/***/ 227:
/*!****************************************************************************************!*\
  !*** multi ../blocks/fpbk/freshbooks-careers/src/frontend/freshbooks-careers-block.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/xue.ding/freshpress-website/themes/freshpress/blocks/fpbk/freshbooks-careers/src/frontend/freshbooks-careers-block.js */"../blocks/fpbk/freshbooks-careers/src/frontend/freshbooks-careers-block.js");


/***/ })

/******/ });
//# sourceMappingURL=blocks-fpbk-freshbooks-careers-freshbooks-careers-block.js.map