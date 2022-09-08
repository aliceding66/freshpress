(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common-helpers"],{

/***/ "./scripts/helpers/_attributes.js":
/*!****************************************!*\
  !*** ./scripts/helpers/_attributes.js ***!
  \****************************************/
/*! exports provided: datasetKeyName, getDataAttr, hasDataAttr, setDataAttr, getAttrOrData, hasAttrOrData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datasetKeyName", function() { return datasetKeyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataAttr", function() { return getDataAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDataAttr", function() { return hasDataAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDataAttr", function() { return setDataAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttrOrData", function() { return getAttrOrData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAttrOrData", function() { return hasAttrOrData; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");


/**
 * Helper functions for dealing with HTMLElement attributes and data-attributes.
 */

/**
 * @param {string} attrName
 * @return {string} Formatted data key.
 */

const datasetKeyName = (attrName = '') => {
  return Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_1__["toCamelCase"])(attrName.replace(/^(?:data-|data([A-Z]))/, '$1'));
};
/**
 * Get the value of a data-attribute from a DOM element.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */

const getDataAttr = (element, attrName) => {
  if (hasDataAttr(element, attrName)) {
    const datasetKey = datasetKeyName(attrName);

    if (datasetKey && datasetKey in element.dataset) {
      return element.dataset[datasetKey];
    }
  } // Returns null to match the spec of getAttribute.


  return null;
};
/**
 * Check if an element has a given data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */

const hasDataAttr = (element, attrName) => {
  if (element && attrName) {
    return attrName.startsWith('data-') && element.hasAttribute(attrName) || element.hasAttribute("data-".concat(attrName));
  } // Returns false to match the spec of hasAttribute.


  return false;
};
/**
 * Set the value of a data-attribute for a DOM element.
 *
 * @param {HTMLElement} element   DOM element.
 * @param {string}      attrName  Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 * @param {string}      attrValue Attribute value.
 */

const setDataAttr = (element, attrName, attrValue) => {
  if (element && attrName && undefined !== attrValue) {
    const datasetKey = datasetKeyName(attrName);

    if (datasetKey) {
      element.dataset[datasetKey] = attrValue;
    }
  }
};
/**
 * Get the value of an attribute from an element as either a standard
 * DOM attribute or data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */

const getAttrOrData = (element, attrName) => {
  if (element && attrName) {
    if (hasDataAttr(element, attrName)) {
      return getDataAttr(element, attrName);
    }

    if (element.hasAttribute(attrName)) {
      return element.getAttribute(attrName);
    }

    return element.getAttribute(attrName.replace(/^data-/, ''));
  } // Returns null to match the spec of getAttribute.


  return null;
};
/**
 * Check if an element has an attribute as a standard DOM attribute
 * or data-attribute.
 *
 * @param {HTMLElement} element  DOM element.
 * @param {string}      attrName Attribute name with optional data- prefix (eg, 'data-example' or 'example').
 */

const hasAttrOrData = (element, attrName) => {
  if (element && attrName) {
    return element.hasAttribute(attrName) || element.hasAttribute(attrName.replace(/^data-/, '')) || hasDataAttr(element, attrName);
  } // Returns false to match the spec of hasAttribute.


  return false;
};

/***/ }),

/***/ "./scripts/helpers/_blocks.js":
/*!************************************!*\
  !*** ./scripts/helpers/_blocks.js ***!
  \************************************/
/*! exports provided: initBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBlock", function() { return initBlock; });
/**
 * Small helper functions for blocks.
 */

/**
 * Initialiase all instances of a block. Defaults to triggering on DOMContentLoaded
 * for the document element.
 *
 * @param {string} selector CSS selector for the blocks to be initialised.
 * @param {Function} callback Callback function to be executed on each block.
 * @param {string} [event=DOMContentLoaded] Event to listen to.
 * @param {HTMLElement} [container=document] DOM object to use as a container for events and queries.
 */
const initBlock = (selector, callback, event = 'DOMContentLoaded', container = document) => {
  container.addEventListener(event, () => {
    const blocks = container.querySelectorAll(selector);

    if (blocks) {
      blocks.forEach(block => {
        callback(block);
      });
    }
  });
};

/***/ }),

/***/ "./scripts/helpers/_csv.js":
/*!*********************************!*\
  !*** ./scripts/helpers/_csv.js ***!
  \*********************************/
/*! exports provided: strGetCsv, fpParseCsv, fpFormatVartype */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strGetCsv", function() { return strGetCsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpParseCsv", function() { return fpParseCsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fpFormatVartype", function() { return fpFormatVartype; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/_validation */ "./scripts/modules/_validation.js");



/**
 * Simple equivalent of PHP's str_getcsv().
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {string} enclosure
 * @return {*[]} Array of data from CSV string.
 */

function strGetCsv(input, delimiter = ',', enclosure = '"') {
  const enclosedMap = [];
  const enclosedRegex = new RegExp("".concat(enclosure, "[^").concat(enclosure, ";]+").concat(enclosure), 'g');
  const enclosedRegexResult = input.match(enclosedRegex);

  if (enclosedRegexResult && enclosedRegexResult.length > 0) {
    enclosedRegexResult.forEach((enclosedString, enclosedIndex) => {
      enclosedIndex = "++__++".concat(enclosedIndex, "++__++");
      enclosedMap[enclosedIndex] = enclosedString;
      input = input.replace(enclosedString, enclosedIndex);
    });
  }

  return input.split(delimiter).map(chunk => {
    Object.entries(enclosedMap).forEach(([key, value]) => {
      chunk = chunk.replace(key, value);
    });
    return chunk;
  });
}
/**
 * Equivalent of PHP's fp_parse_csv().
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {boolean} trimFields
 * @return {{headers: *[], data: *[]}} Return formatted CSV data.
 */

function fpParseCsv(input, delimiter = ',', trimFields = true) {
  input = input.replace(/,"[^"]*R[^"]*"/g, function (fields) {
    const replacement = fields[0].split(/RR/);
    const replaced = replacement.join('!n!!n!');
    return replaced.replace(/R/, '!n!');
  }); // prettier-ignore

  const rows = input.split("\n");
  const output = {
    headers: rows.shift().split(delimiter),
    data: []
  };
  rows.forEach(row => {
    row = row.replace(/!n!/g, '\n'); // let values = row.split( delimiter );

    let values = strGetCsv(row, delimiter);

    if (values.length > 0) {
      if (trimFields) {
        values = values.map(value => value.trim());
      }

      const outputDataHeaders = output.headers.map(header => header.toLowerCase());
      const outputData = new Map();
      values.forEach((value, valueIndex) => {
        if (outputDataHeaders[valueIndex] !== undefined) {
          outputData.set(outputDataHeaders[valueIndex], value);
        }
      });
      output.data.push(outputData);
    }
  });
  return output;
}
/**
 * Equivalent of PHP's fp_format_vartype().
 *
 * @param {string} string
 * @return {*} Return value in proper type.
 */

function fpFormatVartype(string) {
  // Check for boolean.
  const boolArray = ['true', 'false', '1', '0', 'yes', 'no'];

  if (typeof string === 'string' && boolArray.indexOf(string.toLowerCase()) >= 0) {
    return string.toLowerCase() === 'true' || string.toLowerCase() === '1' || string.toLowerCase() === 'yes';
  } // Check if numeric.


  if (Object(_modules_validation__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(string)) {
    return Number(string);
  } // ...or return unmodified string.


  return string;
}

/***/ }),

/***/ "./scripts/helpers/_events.js":
/*!************************************!*\
  !*** ./scripts/helpers/_events.js ***!
  \************************************/
/*! exports provided: addEventListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListeners", function() { return addEventListeners; });
/**
 * Helper functions for dealing with DOM Events.
 */

/**
 * Add listeners for one or more events to one or more elements.
 *
 * @param {Array|NodeList|EventTarget} elements An element or an Array or NodeList (array-like) of elements.
 * @param {string}                     events   Events to listen for (space separated).
 * @param {Function}                   handler  Handler function to run.
 */
const addEventListeners = (elements, events, handler) => {
  if (!elements || !events || 'string' !== typeof events || 'function' !== typeof handler) {
    return;
  } // Ensure elements is an array.


  if (!Array.isArray(elements)) {
    elements = 'function' === typeof elements.addEventListener ? [elements] : Array.from(elements);
  } // Convert the event names to an array for looping.


  events = events.split(' ');

  if (elements.length && events.length) {
    elements.forEach(el => {
      events.forEach(ev => {
        if (el && 'function' === typeof el.addEventListener) {
          el.addEventListener(ev, handler, false);
        }
      });
    });
  }
};

/***/ }),

/***/ "./scripts/helpers/_fbtools.js":
/*!*************************************!*\
  !*** ./scripts/helpers/_fbtools.js ***!
  \*************************************/
/*! exports provided: emptyPrice, emptyPercent, emptyNumber, iconHasErrorClass, inputHasErrorClass, formatRounded, formatPrice, formatPercent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyPrice", function() { return emptyPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyPercent", function() { return emptyPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyNumber", function() { return emptyNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iconHasErrorClass", function() { return iconHasErrorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputHasErrorClass", function() { return inputHasErrorClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRounded", function() { return formatRounded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPrice", function() { return formatPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPercent", function() { return formatPercent; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Helper functions for FB Tools blocks.
 */
const emptyPrice = '$0.00';
const emptyPercent = '0.00%';
const emptyNumber = '0';
const iconHasErrorClass = 'freshpress-tools--icon--has-error';
const inputHasErrorClass = 'freshpress-tools--input-field--has-error';
/**
 * @param {any} number
 * @param {boolean} showOneDecimal
 * @return {number} 2 decimalsToShow rounded number.
 */

const formatRounded = (number, showOneDecimal = false) => {
  const value = Math.round(number * 100) / 100;

  if (showOneDecimal) {
    const stringValue = String(value);

    if (/\.\d{2,}/.test(stringValue)) {
      return Number(stringValue.substring(0, stringValue.length - 1));
    }
  }

  return value;
};
/**
 * @param {any} price
 * @return {string} Formatted price in dollars value.
 */

const formatPrice = price => {
  price = String(price);
  return price.trim() !== '' && price.trim() !== '$' ? "$".concat(price.replace(/\$/g, '')) : '';
};
/**
 * @param {any} percent
 * @return {string} Formatted percent value.
 */

const formatPercent = percent => {
  percent = String(percent);
  return percent.trim() !== '' && percent.trim() !== '%' ? "".concat(percent.replace(/%/g, ''), "%") : '';
};

/***/ }),

/***/ "./scripts/helpers/_fpbk_blocks.js":
/*!*****************************************!*\
  !*** ./scripts/helpers/_fpbk_blocks.js ***!
  \*****************************************/
/*! exports provided: generateBlockId, BlockStateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateBlockId", function() { return generateBlockId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockStateManager", function() { return BlockStateManager; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }





/**
 * Helper functions for working with Gutenberg's blocks.
 */

/**
 * @param {string} blockName
 * @return {string} Returns block ID value.
 */

function generateBlockId(blockName) {
  const randomString = length => {
    const chars = [];

    for (let i = 0; i < length; i++) {
      const randomChar = Math.floor(Math.random() * 36);
      chars.push(randomChar.toString(36));
    }

    return chars.join('');
  };

  const hash = randomString(4);
  return "".concat(blockName.replace('/', '-'), "-").concat(hash);
}

var _setProxy = /*#__PURE__*/_classPrivateFieldLooseKey("setProxy");

class BlockStateManager {
  constructor(attributes, setAttributes) {
    Object.defineProperty(this, _setProxy, {
      value: _setProxy2
    });
    this.attributes = attributes;
    this.setAttributes = setAttributes;
    this.timeouts = {}; // eslint-disable-next-line react-hooks/rules-of-hooks

    const {
      lockPostSaving,
      unlockPostSaving
    } = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])('core/editor');
    const lockEditorKey = 'BlockStateManagerProxy';

    this.lockEditor = () => lockPostSaving(lockEditorKey);

    this.unlockEditor = () => unlockPostSaving(lockEditorKey);
  }

  addReducerManager(reducer, fieldName, proxyTimeout = 100) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useReducer"])(reducer, this.attributes[fieldName]);

    _classPrivateFieldLooseBase(this, _setProxy)[_setProxy](fieldName, "reducer_".concat(fieldName), state, proxyTimeout);

    return [state, dispatch];
  }

  addStateManager(fieldName, proxyTimeout = 100) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(this.attributes[fieldName]);

    _classPrivateFieldLooseBase(this, _setProxy)[_setProxy](fieldName, "state_".concat(fieldName), state, proxyTimeout);

    return [state, setState];
  }

}

function _setProxy2(fieldName, timeoutName, state, proxyTimeout) {
  try {
    this.timeouts[timeoutName] = null; // eslint-disable-next-line react-hooks/rules-of-hooks

    Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
      this.lockEditor();

      if (proxyTimeout > 0) {
        if (this.timeouts[timeoutName]) {
          clearTimeout(this.timeouts[timeoutName]);
        }

        this.timeouts[timeoutName] = setTimeout(() => {
          this.setAttributes({
            [fieldName]: state
          });
          this.unlockEditor();
        }, proxyTimeout);
      } else {
        this.setAttributes({
          [fieldName]: state
        });
        this.unlockEditor();
      }
    }, [state]);
  } catch (_) {
    this.unlockEditor();
  }
}

/***/ }),

/***/ "./scripts/helpers/_lite_youtube.js":
/*!******************************************!*\
  !*** ./scripts/helpers/_lite_youtube.js ***!
  \******************************************/
/*! exports provided: playVideo, pauseVideo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playVideo", function() { return playVideo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pauseVideo", function() { return pauseVideo; });
/**
 * Lite YouTube helpers.
 */

/**
 * Play embedded YT video.
 *
 * @param {Node} videoNode
 */
const playVideo = videoNode => {
  const videoIframe = videoNode.querySelector('iframe');

  if (videoIframe) {
    videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  } else {
    videoNode.click();
  }
};
/**
 * Pause embedded YT video.
 *
 * @param {Node} videoNode
 */

const pauseVideo = videoNode => {
  const videoIframe = videoNode.querySelector('iframe');

  if (videoIframe) {
    videoIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  } else {
    videoNode.click();
  }
};

/***/ }),

/***/ "./scripts/helpers/_strings.js":
/*!*************************************!*\
  !*** ./scripts/helpers/_strings.js ***!
  \*************************************/
/*! exports provided: toCamelCase, toKebabCase, toPascalCase, toSnakeCase, toTitleCase, convertCase, trimChar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamelCase", function() { return toCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toKebabCase", function() { return toKebabCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPascalCase", function() { return toPascalCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSnakeCase", function() { return toSnakeCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTitleCase", function() { return toTitleCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertCase", function() { return convertCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimChar", function() { return trimChar; });
/* harmony import */ var dashify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dashify */ "../../../node_modules/dashify/index.js");
/* harmony import */ var dashify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dashify__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Helper functions for dealing with strings.
 */

/**
 * Convert a string to camelCase.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted outputString.
 */

const toCamelCase = input => {
  if (typeof input === 'string' && input.length) {
    return toKebabCase(input).split('-').map((part, index) => index === 0 ? part.toLowerCase() : toTitleCase(part, {
      forceLower: true
    })).join('');
  }

  return input;
};
/**
 * Convert a string to kebab-case.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted output-string.
 */

const toKebabCase = input => {
  if (typeof input === 'string' && input.length) {
    return dashify__WEBPACK_IMPORTED_MODULE_0___default()(input, {
      condense: true
    });
  }

  return input;
};
/**
 * Convert a string to PascalCase.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted OutputString.
 */

const toPascalCase = input => {
  if (typeof input === 'string' && input.length) {
    return toKebabCase(input).split('-').map(part => toTitleCase(part, {
      forceLower: true
    })).join('');
  }

  return input;
};
/**
 * Convert a string to snake_case.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted output_string.
 */

const toSnakeCase = input => {
  if (typeof input === 'string' && input.length) {
    return toKebabCase(input).split('-').join('_');
  }

  return input;
};
/**
 * Convert a string to Title Case.
 *
 * Options:
 *   - exceptions {RegExp}  Words to skip in case conversion.
 *   - forceLower {boolean} Convert the remaining characters to lowercase.
 *
 * @param {string} input String to change case of.
 * @param {Object} [options={}] Optional config settings.
 * @return {string} The converted Output String.
 */

const toTitleCase = (input, options = {}) => {
  if (typeof input === 'string' && input.length) {
    return input.split(' ').map(part => {
      if (options.exceptions instanceof RegExp && options.exceptions.test(part)) {
        return part.toLowerCase();
      }

      const firstChar = part.charAt(0).toUpperCase();
      const otherChars = options.forceLower ? part.slice(1).toLowerCase() : part.slice(1);
      return "".concat(firstChar).concat(otherChars);
    }).join(' ');
  }

  return input;
};
/**
 * Convert a string to a variety of different cases/formats.
 *
 * @param {string} input A string to change case/reformat.
 * @param {string} format The output format.
 * @param {Object} [options={}] Optional options for specific formats.
 */

const convertCase = (input, format, options = {}) => {
  if (!input || input.length === 0) {
    return input;
  }

  switch (format) {
    case 'camel':
      return toCamelCase(input);

    case 'kebab':
      return toKebabCase(input);

    case 'lower':
      return input.toLowerCase();

    case 'pascal':
      return toPascalCase(input);

    case 'snake':
      return toSnakeCase(input);

    case 'title':
      return toTitleCase(input, options);

    case 'upper':
      return input.toUpperCase();

    default:
      return input;
  }
};
/**
 * Trim string from passed character.
 *
 * @param {string} string A string to trim char from.
 * @param {string} char A character to trim.
 * @return {string} Trimmed string.
 */

const trimChar = (string, char = ' ') => {
  if (typeof string !== 'string' && typeof char !== 'string' && char.length !== 1) {
    return string;
  }

  let start = 0;
  let end = string.length;

  while (start < end && string[start] === char) {
    ++start;
  }

  while (end > start && string[end - 1] === char) {
    --end;
  }

  return start > 0 || end < string.length ? string.substring(start, end) : string;
};

/***/ }),

/***/ "./scripts/helpers/_utils.js":
/*!***********************************!*\
  !*** ./scripts/helpers/_utils.js ***!
  \***********************************/
/*! exports provided: isNfbCustomer, initSmoothScroll, cleanupTelLinks, getDomainFromFQDN, isSameDomain, externalLinksPatcher, addStickyTopObserver, addStickyBottomObserver, isValidSelector, replaceRegionalisedUrls, parseUrl, parseQueryString, setTrialLengthCookie, initOpenModalLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNfbCustomer", function() { return isNfbCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSmoothScroll", function() { return initSmoothScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanupTelLinks", function() { return cleanupTelLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDomainFromFQDN", function() { return getDomainFromFQDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSameDomain", function() { return isSameDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "externalLinksPatcher", function() { return externalLinksPatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStickyTopObserver", function() { return addStickyTopObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStickyBottomObserver", function() { return addStickyBottomObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidSelector", function() { return isValidSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceRegionalisedUrls", function() { return replaceRegionalisedUrls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUrl", function() { return parseUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseQueryString", function() { return parseQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTrialLengthCookie", function() { return setTrialLengthCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initOpenModalLinks", function() { return initOpenModalLinks; });
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! smoothscroll-polyfill */ "../../../node_modules/smoothscroll-polyfill/dist/smoothscroll.js");
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! scripts/modules/_cookies */ "./scripts/modules/_cookies.js");
/* harmony import */ var scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scripts/helpers/_attributes */ "./scripts/helpers/_attributes.js");
/* harmony import */ var scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/modules/_i18n */ "./scripts/modules/_i18n.js");
/* harmony import */ var scripts_helpers_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/helpers/_events */ "./scripts/helpers/_events.js");
/* harmony import */ var _site_options_04_languages_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../site-options/04-languages.json */ "../site-options/04-languages.json");
var _site_options_04_languages_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../site-options/04-languages.json */ "../site-options/04-languages.json", 1);



/**
 * Utility helpers.
 */






/**
 * Check if user is logged in as existing NFB client.
 *
 * @return {string} smux_login cookie value
 */

const isNfbCustomer = () => {
  return Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_3__["readCookie"])('smux_login');
};
/**
 * Adds a polyfill if needed for scroll-behaviour: smooth and anchor scrolling.
 *
 * @param {number} additionalOffset Additional offset.
 */

const initSmoothScroll = (additionalOffset = 0) => {
  // Polyfill is mostly needed for all versions of Safari.
  smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_2___default.a.polyfill();
  const scrollAnchors = document.querySelectorAll('a[href^="#"]:not( [href="#"] ),[data-scroll-target]');

  if (scrollAnchors) {
    scrollAnchors.forEach(anchor => {
      anchor.addEventListener('click', e => {
        const selector = Object(scripts_helpers_attributes__WEBPACK_IMPORTED_MODULE_4__["getDataAttr"])(anchor, 'scroll-target') || anchor.hash;

        if (isValidSelector(selector)) {
          const target = document.querySelector(selector);
          const header = document.querySelector('header');

          if (target !== null && target !== void 0 && target.getBoundingClientRect) {
            e.preventDefault();
            let offset = 0;

            if (header !== null && header !== void 0 && header.getBoundingClientRect) {
              offset = parseInt(header.getBoundingClientRect().height);
            }

            window.scrollTo({
              top: parseInt(target.getBoundingClientRect().top) + parseInt(window.scrollY) - offset - additionalOffset,
              behavior: 'smooth'
            });
          }
        }
      }, false);
    });
  }
};
/**
 * Remove href attributes from tel: protocol links on desktop (except inside the header).
 */

const cleanupTelLinks = () => {
  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) && window.matchMedia('only screen and (max-width: 853px)').matches)) {
    const telLinks = document.querySelectorAll('[href^="tel:"]');

    if (telLinks) {
      telLinks.forEach(el => {
        if (!el.closest('.header') && !el.closest('.integrations__sidebar-contact-info') && !el.closest('.pricing-modal')) {
          el.removeAttribute('href');
        }
      });
    }
  }
};
/**
 * Get domain portion from FQDN.
 *
 * @param {string} fqdn
 */

const getDomainFromFQDN = fqdn => {
  if (!fqdn) {
    return '';
  }

  const domainParts = fqdn.split('.');
  return domainParts.slice(domainParts.length - 2).join('.');
};
/**
 * Check if a provided url is for the same parent domain (e.g., my.freshbooks.com and www.freshbooks.com).
 *
 * @param {string} url
 */

const isSameDomain = url => {
  if (!url) {
    return false;
  }

  const {
    host
  } = parseUrl(url);
  return host && getDomainFromFQDN(host) === getDomainFromFQDN(window.location.host);
};
/**
 * Open external links in a new tab/window and remove the nofollow tag if present.
 */

const externalLinksPatcher = () => {
  Array.from(document.querySelectorAll('a')).filter(a => {
    return a.href && !/^(?:tel:|mailto:|javascript:|https?:\/\/(?:[^.]*\.)?(?:freshbooks\.com|[^.]*\.freshenv\.com))/.test(a.href) && a.host && getDomainFromFQDN(a.host) !== getDomainFromFQDN(window.location.host);
  }).forEach(link => {
    link.setAttribute('target', '_blank');
    link.rel = link.rel.replace(/ *nofollow */, '');
  });
};
/**
 * Add/remove a class (stuck) to an element with class sticky-top on event at which element sticks.
 * Refer to https://developers.google.com/web/updates/2017/09/sticky-headers.
 */

const addStickyTopObserver = () => {
  const stickyTopEls = document.querySelectorAll('.sticky-top');

  if (stickyTopEls.length) {
    stickyTopEls.forEach(element => {
      const computedStyles = window.getComputedStyle(element);
      const sentinel = document.createElement('span');
      sentinel.classList.add('sentinel');
      sentinel.style = "\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: -".concat(computedStyles.top || '0', ";\n\t\t\t\tleft: 0;\n\t\t\t\tright: 0;\n\t\t\t\tz-index: -1;\n\t\t\t");
      element.parentElement.insertBefore(sentinel, element);
      new window.IntersectionObserver(function (entries) {
        entries.forEach(entry => {
          if (entry.intersectionRatio === 0) {
            entry.target.nextElementSibling.classList.add('stuck');
          } else {
            entry.target.nextElementSibling.classList.remove('stuck');
          }
        });
      }).observe(sentinel);
    });
  }
};
/**
 * Add/remove a class (stuck) to an element with class sticky-bottom by tracking the position of
 * sentinel inserted before sticky element.
 */

const addStickyBottomObserver = () => {
  const stickyBottomEls = document.querySelectorAll('.sticky-bottom');

  if (stickyBottomEls) {
    stickyBottomEls.forEach(element => {
      // Sentinel.
      const sentinel = document.createElement('span');
      sentinel.classList.add('sentinel');
      element.parentElement.insertBefore(sentinel, element);

      const addRemoveStuckClass = () => {
        if (!element.classList.contains('sticky-bottom')) {
          return false;
        }

        const isBefore = window.pageYOffset + window.innerHeight < sentinel.offsetTop + element.clientHeight;

        if (!isBefore && element.classList.contains('stuck')) {
          element.classList.remove('stuck');
        } else if (isBefore && !element.classList.contains('stuck')) {
          element.classList.add('stuck');
        }
      }; // Scrolling past the sentinel position plus height of the sticky element.


      Object(scripts_helpers_events__WEBPACK_IMPORTED_MODULE_6__["addEventListeners"])(window, 'load scroll', addRemoveStuckClass);
    });
  }
};
/**
 * Test a CSS selector to check it won't throw client-side exceptions.
 *
 * @param {string} selector CSS selector to test for validity.
 */

const isValidSelector = selector => {
  try {
    document.createDocumentFragment().querySelector(selector);
  } catch {
    return false;
  }

  return true;
};
/**
 * Find all signup and pricing links and replace their urls based on user's location.
 */

const replaceRegionalisedUrls = () => {
  const euDefaultFor = _site_options_04_languages_json__WEBPACK_IMPORTED_MODULE_7__["eu_default_for"];
  const euDefaultCountryCode = 'eu';
  const countryCodeCookie = Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_3__["readCookie"])('user-country-code').toLowerCase();

  if (window.fbVars && window.fbVars.i18n) {
    const {
      supportedRegions,
      siteLangCode
    } = window.fbVars.i18n;
    let countryCode = Object(scripts_modules_i18n__WEBPACK_IMPORTED_MODULE_5__["getSuggestedCountryCode"])('lower');

    if (euDefaultFor.includes("en-".concat(countryCodeCookie))) {
      countryCode = euDefaultCountryCode;
    }

    if (supportedRegions && supportedRegions[countryCode] && Object.keys(supportedRegions[countryCode]).length > 0) {
      const targetRegion = supportedRegions[countryCode][siteLangCode] ? supportedRegions[countryCode][siteLangCode] : supportedRegions[countryCode][Object.keys(supportedRegions[countryCode])[0]];
      const targetSignupLink = targetRegion && targetRegion.sitePaths && targetRegion.sitePaths.signup;
      const targetPricingLink = targetRegion && targetRegion.sitePaths && targetRegion.sitePaths.pricing;

      if (targetSignupLink) {
        const signupLinks = document.querySelectorAll('[href*="/signup"]:not([href*="my."]):not([href*="direct-buy"])');
        signupLinks.forEach(link => {
          if (link.pathname !== targetRegion.sitePaths.signup) {
            link.pathname = targetRegion.sitePaths.signup;
          }
        });
      }

      if (targetPricingLink) {
        const pricingLinks = document.querySelectorAll('[href*="/pricing"]:not([class*="region"])');
        pricingLinks.forEach(link => {
          if (link.pathname !== targetRegion.sitePaths.pricing) {
            link.pathname = targetRegion.sitePaths.pricing;
          }
        });
      }
    }
  }
};
/**
 * Parse a URL into parts.
 *
 * @param  {string} input URL to parse
 * @return {Object} Parsed URL parts
 */

const parseUrl = (input = '') => {
  const output = {
    url: '',
    query: '',
    hash: '',
    origin: '',
    protocol: '',
    host: '',
    pathname: ''
  };

  if (typeof input === 'string' && input) {
    [output.url, output.hash] = input.split('#', 2);
    [output.url, output.query] = output.url.split('?', 2);
    const urlParts = /^(https?:)?(\/\/[^/]+)?(\/.*)?$/.exec(output.url);

    if (urlParts && urlParts.length === 4) {
      [, output.protocol, output.host, output.pathname] = urlParts;

      if (output.host) {
        output.host = output.host.replace('//', '');

        if (!output.protocol) {
          output.protocol = window.location.protocol;
          output.url = "".concat(output.protocol).concat(output.url);
        }

        output.origin = "".concat(output.protocol, "//").concat(output.host);
      }
    }

    Object.keys(output).forEach(key => {
      if (typeof output[key] === 'undefined') {
        output[key] = '';
      }
    });
  }

  return output;
};
/**
 * Parse a query string into parameters.
 *
 * @param {string}  input         Query string or URL
 * @param {boolean} [decode=true] Should the parameter values be URI decoded?
 * @return {Object} Parsed query string parameters
 */

const parseQueryString = (input, decode = true) => {
  const output = {};

  if (typeof input === 'string' && input) {
    const params = parseUrl(input).query.split('&');

    if (params && params.length) {
      params.forEach(param => {
        const parts = param.split('=', 2).map(p => decode ? decodeURIComponent(p) : p);

        if (parts.length === 2) {
          output[parts[0]] = parts[1];
        } else {
          output[parts[0]] = '';
        }
      });
    }
  }

  return output;
};
/**
 * Set Trial Length cookie.
 */

const setTrialLengthCookie = () => {
  const trialLength = document.body.dataset.tl;

  if (trialLength) {
    Object(scripts_modules_cookies__WEBPACK_IMPORTED_MODULE_3__["createCookieIfMissing"])('fb_web_promo', "lp".concat(trialLength));
  }
};
/**
 * Init links that open modals.
 */

const initOpenModalLinks = () => {
  const buttonsWithModals = document.querySelectorAll('a[target="modal"]');

  if (buttonsWithModals.length > 0) {
    buttonsWithModals.forEach(buttonWithModal => {
      buttonWithModal.addEventListener('click', e => {
        e.preventDefault(); // eslint-disable-next-line no-undef

        $(buttonWithModal.getAttribute('href')).modal('show');
      });
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=common-helpers.js.map