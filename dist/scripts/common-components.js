(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common-components"],{

/***/ "./scripts/components/EditorControls/_helpers.js":
/*!*******************************************************!*\
  !*** ./scripts/components/EditorControls/_helpers.js ***!
  \*******************************************************/
/*! exports provided: getEditorControlsContext, getBlockName, getBlockData, getDefaultOnChangeFromContext, getBlockAttributesDefinitions, getBlockAttributeSubfieldDefinition, getAttributeFromBlockStore, getAttributeValueFromContext, getAttributeNameFromBlockStoreByKey, getCommonBlockSettingsClass, isConditionalLogicValidated, getEditorControlsComponentByType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEditorControlsContext", function() { return getEditorControlsContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockName", function() { return getBlockName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockData", function() { return getBlockData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultOnChangeFromContext", function() { return getDefaultOnChangeFromContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockAttributesDefinitions", function() { return getBlockAttributesDefinitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlockAttributeSubfieldDefinition", function() { return getBlockAttributeSubfieldDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributeFromBlockStore", function() { return getAttributeFromBlockStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributeValueFromContext", function() { return getAttributeValueFromContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributeNameFromBlockStoreByKey", function() { return getAttributeNameFromBlockStoreByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCommonBlockSettingsClass", function() { return getCommonBlockSettingsClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConditionalLogicValidated", function() { return isConditionalLogicValidated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEditorControlsComponentByType", function() { return getEditorControlsComponentByType; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_EditorControls */ "./scripts/components/_EditorControls.js");



/**
 * Helper functions that helps working with EditorControls.* components.
 */



const operators = ['==', '!=', '<', '>'];
/**
 * @return {Object} Returns EditorControls.Context values;
 */

function getEditorControlsContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Context);
}
/**
 * @return {string} Returns block name from EditorControls.Context.
 */

function getBlockName() {
  var _getEditorControlsCon;

  return (_getEditorControlsCon = getEditorControlsContext()) === null || _getEditorControlsCon === void 0 ? void 0 : _getEditorControlsCon.blockName;
}
/**
 * @return {Object|Array} Returns all block data used while registering it.
 */

function getBlockData() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(select => {
    const blockName = getBlockName();
    return select('core/blocks').getBlockType(blockName);
  }, []);
}
/**
 * @param {string} attributeName
 * @return {Function} Returns default "onChange" function for any EditorControls.* sub-component.
 */

function getDefaultOnChangeFromContext(attributeName) {
  if (attributeName !== null && attributeName !== '') {
    var _getEditorControlsCon2;

    const setAttributes = (_getEditorControlsCon2 = getEditorControlsContext()) === null || _getEditorControlsCon2 === void 0 ? void 0 : _getEditorControlsCon2.setAttributes;
    return newValue => {
      const setAttributeParam = {};
      setAttributeParam[attributeName] = newValue;
      setAttributes(setAttributeParam);
    };
  }

  return () => {};
}
/**
 * @param {string} blockName
 * @return {Object|Array} Returns attributes definitions which are exact same attributes that were used when registering block.
 */

function getBlockAttributesDefinitions(blockName) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(select => {
    return select('core/blocks').getBlockType(blockName).attributes;
  }, []);
}
/**
 * @param {string} blockName
 * @param {string} attributeName
 * @param {string} subFieldName
 * @return {Object} Returns attributes definitions which are exact same attributes that were used when registering block.
 */

function getBlockAttributeSubfieldDefinition(blockName, attributeName, subFieldName) {
  try {
    const blockAttributesDefinitions = getBlockAttributesDefinitions(blockName);

    if (typeof blockAttributesDefinitions === 'object') {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const subField of (_blockAttributesDefin = blockAttributesDefinitions[attributeName]) === null || _blockAttributesDefin === void 0 ? void 0 : _blockAttributesDefin.sub_fields) {
        var _blockAttributesDefin;

        if (subField.name === subFieldName) {
          return subField;
        }
      }
    }
  } catch (error) {
    /* do nothing */
  }

  return {};
}
/**
 * @param {string} attributeName
 * @param {string|null} parent
 * @return {Object} Returns attribute using EditorControls.Context.
 */

function getAttributeFromBlockStore(attributeName, parent = null) {
  const blockData = getBlockData();
  const {
    attributes = {}
  } = blockData;

  if (attributes) {
    if (parent) {
      const parentAttributeName = getAttributeNameFromBlockStoreByKey(parent);

      if (parentAttributeName && typeof attributes[parentAttributeName] !== 'undefined') {
        const {
          sub_fields: subFields = []
        } = attributes[parentAttributeName];
        return subFields.filter(field => {
          return field.name === attributeName;
        })[0];
      }
    } else if (typeof attributes[attributeName] !== 'undefined') {
      return attributes[attributeName];
    }
  }

  return {};
}
/**
 * @param {string} attributeName
 * @param {*} defaultValue
 * @return {*} Returns attribute's value using EditorControls.Context.
 */

function getAttributeValueFromContext(attributeName, defaultValue = null) {
  var _getEditorControlsCon3;

  const attributes = (_getEditorControlsCon3 = getEditorControlsContext()) === null || _getEditorControlsCon3 === void 0 ? void 0 : _getEditorControlsCon3.attributes;

  if (attributes && typeof attributes[attributeName] !== 'undefined') {
    return attributes[attributeName];
  }

  return defaultValue;
}
/**
 * @param {string} attributeKey
 * @return {*} Returns attribute found by "key" prop - this one is auto-generated by ACF plugin.
 */

function getAttributeNameFromBlockStoreByKey(attributeKey) {
  const blockData = getBlockData();
  let foundAttributeName = null;
  Object.keys(blockData.attributes).forEach(attributeName => {
    const {
      key
    } = blockData.attributes[attributeName];

    if (key && key === attributeKey) {
      foundAttributeName = attributeName;
    }
  });
  return foundAttributeName;
}
/**
 * @param {Object} attributes
 * @return {string} Returns WordPress useBlockProps result extended by FreshBook's classes.
 */

function getCommonBlockSettingsClass(attributes) {
  const classesToPass = [];

  if (attributes !== null && attributes !== void 0 && attributes.style_overrides) {
    attributes.style_overrides.forEach(styleOverride => {
      var _styleOverride$breakp;

      classesToPass.push("".concat(styleOverride.property).concat(styleOverride.direction).concat(styleOverride === null || styleOverride === void 0 ? void 0 : (_styleOverride$breakp = styleOverride.breakpoint) === null || _styleOverride$breakp === void 0 ? void 0 : _styleOverride$breakp.replace('null', ''), "-").concat(styleOverride.amount));
    });
  }

  if (attributes !== null && attributes !== void 0 && attributes.block_settings_tracking_section) {
    classesToPass.push("trackingSection-".concat(attributes.block_settings_tracking_section));
  }

  if (attributes !== null && attributes !== void 0 && attributes.block_settings_wide_block) {
    classesToPass.push('wide-block');
  }

  if (attributes !== null && attributes !== void 0 && attributes.block_settings_narrow_content_within_wide_block) {
    classesToPass.push('wide-block--padded');
  }

  return classesToPass.join(' ');
}
/**
 * @param {string} fieldNameToCheck
 * @param {Object} props
 * @return {boolean} Return if ACF Conditional Logic is validated to field.
 */

function isConditionalLogicValidated(fieldNameToCheck, props = {}) {
  let validated = false;

  if (fieldNameToCheck !== null && fieldNameToCheck !== '') {
    const attributeToCheck = getAttributeFromBlockStore(fieldNameToCheck);
    const {
      conditional_logic: conditionalLogic = attributeToCheck === null || attributeToCheck === void 0 ? void 0 : attributeToCheck.conditional_logic
    } = props;

    if (Array.isArray(conditionalLogic) && conditionalLogic.length > 0) {
      conditionalLogic.forEach(conditionalLogicGroup => {
        const validatedConditionalLogicGroup = conditionalLogicGroup.filter(conditionalLogicToCheck => {
          let valueToCheck = getAttributeValueFromContext(getAttributeNameFromBlockStoreByKey(conditionalLogicToCheck.field));
          let conditionalLogicToCheckValue = conditionalLogicToCheck.value;

          if (operators.indexOf(conditionalLogicToCheck.operator) >= 0 && typeof valueToCheck !== 'boolean') {
            conditionalLogicToCheckValue = "'".concat(conditionalLogicToCheckValue, "'");
            valueToCheck = "'".concat(valueToCheck, "'");
          } // eslint-disable-next-line no-eval


          return eval("".concat(valueToCheck, " ").concat(conditionalLogicToCheck.operator, " ").concat(conditionalLogicToCheckValue));
        });

        if (validatedConditionalLogicGroup.length === conditionalLogicGroup.length) {
          validated = true;
        }
      });
    } else {
      validated = true;
    }
  } else {
    validated = true;
  }

  return validated;
}
/**
 * @param {string} type
 * @return {JSX.Element|null} Returns proper EditorControls.* component by passes "type".
 */

function getEditorControlsComponentByType(type) {
  switch (type) {
    case 'accordion':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.Accordion;

    case 'checkbox':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Checkbox;

    case 'color_picker':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].ColourPicker;

    case 'file':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].File;

    case 'gallery':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Gallery;

    case 'group':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.Group;

    case 'image':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Image;

    case 'link':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Link;

    case 'number':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Number;

    case 'range':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Range;

    case 'repeater':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Acf.Repeater;

    case 'select':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Select;

    case 'text':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Text;

    case 'textarea':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TextArea;

    case 'true_false':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TrueFalse;

    case 'url':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Text;

    case 'wysiwyg':
      return _EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TextArea;

    default:
      return null;
  }
}

/***/ }),

/***/ "./scripts/components/EditorControls/components/acf/_Accordion.js":
/*!************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/acf/_Accordion.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");



/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Accordion".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  const {
    name
  } = props;
  const {
    label,
    fields = []
  } = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(name);
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Panel"], null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["PanelBody"], {
    title: label,
    initialOpen: false
  }, fields.map((fieldName, index) => {
    const attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(fieldName);
    const {
      original_type: originalType,
      type = ''
    } = attribute;
    const fieldType = originalType !== undefined ? originalType : type;
    const ComponentName = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEditorControlsComponentByType"])(fieldType);
    return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
      key: "".concat(name, "_").concat(index),
      name: fieldName
    }, ComponentName !== null && /*#__PURE__*/React.createElement(ComponentName, {
      name: fieldName
    }), ComponentName === null && /*#__PURE__*/React.createElement("p", null, "Missing EditorControls field for:", ' ', /*#__PURE__*/React.createElement("strong", null, fieldType)));
  }))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/acf/_CommonBlockSettings.js":
/*!**********************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/acf/_CommonBlockSettings.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");


/**
 * @return {JSX.Element} Returns all common block fields.
 */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["PanelBody"], null, /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Text, {
    name: "block_settings_tracking_section"
  })), /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Acf.Accordion, {
    name: "block_display_options"
  }));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/acf/_Group.js":
/*!********************************************************************!*\
  !*** ./scripts/components/EditorControls/components/acf/_Group.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Accordion".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  const attributeFromBlockStore = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getAttributeFromBlockStore"])(props.name);
  const {
    name,
    label = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.label,
    instructions = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.instructions,
    sub_fields: fields = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.sub_fields
  } = props;
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_0__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["BaseControl"], {
    label: /*#__PURE__*/React.createElement("strong", {
      style: {
        lineHeight: '2rem'
      }
    }, label),
    help: instructions
  }, /*#__PURE__*/React.createElement("div", null, fields.map((field, index) => {
    const {
      original_type: originalType,
      type = ''
    } = field;
    const fieldName = "".concat(name, "_").concat(field.name);
    const fieldType = originalType !== undefined ? originalType : type;
    const ComponentName = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getEditorControlsComponentByType"])(fieldType);
    return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_0__["default"].Special.ConditionalLogic, {
      key: "".concat(name, "_").concat(index),
      name: fieldName
    }, ComponentName !== null && /*#__PURE__*/React.createElement(ComponentName, {
      name: fieldName
    }), ComponentName === null && /*#__PURE__*/React.createElement("p", null, "Missing EditorControls field for:", ' ', /*#__PURE__*/React.createElement("strong", null, fieldType)));
  }))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/acf/_Repeater.js":
/*!***********************************************************************!*\
  !*** ./scripts/components/EditorControls/components/acf/_Repeater.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Repeater".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  const attributeFromBlockStore = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeFromBlockStore"])(props.name);
  const {
    name,
    label = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.label,
    instructions = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.instructions,
    button_label: buttonLabel = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.button_label,
    max = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.max,
    sub_fields: fields = attributeFromBlockStore === null || attributeFromBlockStore === void 0 ? void 0 : attributeFromBlockStore.sub_fields
  } = props;
  const repeaterValue = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeValueFromContext"])(name, []);
  const defaultOnChange = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getDefaultOnChangeFromContext"])(name);
  const emptyRow = {};
  fields.forEach(field => {
    if (field.default_value === false && typeof field.choices === 'object' && Object.keys(field.choices).length > 0) {
      emptyRow[field.name] = Object.keys(field.choices)[0];
    } else {
      emptyRow[field.name] = field.default_value;
    }
  });
  const toRenderFields = repeaterValue.map((fieldValues, rowIndex) => {
    return /*#__PURE__*/React.createElement("div", {
      key: rowIndex
    }, fields.map(field => {
      const {
        original_type: originalType,
        type = ''
      } = field;
      const fieldType = originalType !== undefined ? originalType : type;
      const ComponentName = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getEditorControlsComponentByType"])(fieldType);

      if (ComponentName === null) {
        return /*#__PURE__*/React.createElement("div", null, "Missing EditorControls component definition for:", ' ', /*#__PURE__*/React.createElement("strong", null, fieldType));
      }

      const {
        name: fieldName,
        // eslint-disable-next-line no-unused-vars
        onChange = null,
        // eslint-disable-next-line no-unused-vars
        value = null,
        ...fieldToPass
      } = field;
      return /*#__PURE__*/React.createElement(ComponentName, _extends({}, fieldToPass, {
        key: "repeater_".concat(fieldName, "_").concat(rowIndex),
        name: fieldName,
        onChange: newValue => {
          repeaterOnChange(rowIndex, fieldName, newValue);
        },
        value: fieldValues[field.name]
      }));
    }), /*#__PURE__*/React.createElement("div", {
      className: "block-editor__block-controls"
    }, rowIndex > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => {
        repeaterMoveUp(rowIndex);
      },
      icon: "arrow-up-alt2"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      isSmall: true,
      isDestructive: true,
      onClick: () => {
        removeRow(rowIndex);
      },
      icon: "no-alt"
    }), rowIndex < repeaterValue.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => {
        repeaterMoveDown(rowIndex);
      },
      icon: "arrow-down-alt2"
    })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["CardDivider"], null));
  });

  const handleNewRow = () => {
    const newRepeaterValue = [...repeaterValue];
    newRepeaterValue.push(emptyRow);
    defaultOnChange(newRepeaterValue);
  };
  /**
   * @param {number} rowIndex Index of fields group in repeater.
   * @param {string} fieldName Field name in group.
   * @param {*} fieldValue
   */


  const repeaterOnChange = (rowIndex, fieldName, fieldValue) => {
    const newRepeaterValue = [...repeaterValue];

    if (newRepeaterValue[rowIndex] === undefined) {
      newRepeaterValue[rowIndex] = {};
    }

    if (fieldName !== null) {
      newRepeaterValue[rowIndex][fieldName] = fieldValue;
    }

    defaultOnChange(newRepeaterValue);
  };
  /**
   * @param {number} rowIndex
   */


  const repeaterMoveUp = rowIndex => {
    const newRepeaterValue = [...repeaterValue];
    const previousItem = newRepeaterValue[rowIndex - 1];
    newRepeaterValue[rowIndex - 1] = newRepeaterValue[rowIndex];
    newRepeaterValue[rowIndex] = previousItem;
    defaultOnChange(newRepeaterValue);
  };
  /**
   * @param {number} rowIndex
   */


  const repeaterMoveDown = rowIndex => {
    const newRepeaterValue = [...repeaterValue];
    const previousItem = newRepeaterValue[rowIndex + 1];
    newRepeaterValue[rowIndex + 1] = newRepeaterValue[rowIndex];
    newRepeaterValue[rowIndex] = previousItem;
    defaultOnChange(newRepeaterValue);
  };
  /**
   * @param {number} rowIndex Index of fields group in repeater.
   */


  const removeRow = rowIndex => {
    const newRepeaterValue = [...repeaterValue];
    newRepeaterValue.splice(rowIndex, 1);
    defaultOnChange(newRepeaterValue);
  };

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: /*#__PURE__*/React.createElement("strong", {
      style: {
        lineHeight: '2rem'
      }
    }, label),
    help: instructions
  }, /*#__PURE__*/React.createElement("div", null, toRenderFields, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isPrimary: true,
    onClick: () => handleNewRow(),
    text: buttonLabel || Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Add Row', 'freshpress-website'),
    disabled: parseInt(max) > 0 && repeaterValue.length >= parseInt(max)
  }))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/special/_ConditionalLogic.js":
/*!***********************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/special/_ConditionalLogic.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component that handles ACF's "Conditional Logic".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  const fieldNameToCheck = props.name ? props.name : null;
  const show = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["isConditionalLogicValidated"])(fieldNameToCheck, props);
  return /*#__PURE__*/React.createElement(React.Fragment, null, show ? props.children : null);
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/special/_ModalPicker.js":
/*!******************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/special/_ModalPicker.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _getEditorControlsCon;

  const {
    name,
    clientId = (_getEditorControlsCon = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEditorControlsContext"])()) === null || _getEditorControlsCon === void 0 ? void 0 : _getEditorControlsCon.clientId,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeValueFromContext"])(name),
    canSelectEmpty = true,
    emptyLabel = 'No modal selected',
    ...restProps
  } = props;
  const allModals = {};

  if (canSelectEmpty) {
    allModals.no_modal = emptyLabel;
  }

  const pageBlocks = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["useSelect"])(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["store"]).getBlocks(), [clientId]);

  const getModals = blockObject => {
    if (blockObject) {
      if (blockObject.name === 'fpbk/modal') {
        allModals[blockObject.attributes.id] = "".concat(blockObject.attributes.modal_title, " ID: ").concat(blockObject.attributes.id);
      }

      if (blockObject.innerBlocks.length) {
        blockObject.innerBlocks.forEach(innerBlock => getModals(innerBlock));
      }
    }
  };

  pageBlocks.forEach(block => getModals(block));
  return /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Select, _extends({}, restProps, {
    value: value,
    name: name,
    choices: allModals
  }));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/special/_VariationPicker.js":
/*!**********************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/special/_VariationPicker.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/* harmony default export */ __webpack_exports__["default"] = (props => {
  var _getEditorControlsCon, _getEditorControlsCon2, _blockType$icon;

  const {
    children,
    name,
    clientId = (_getEditorControlsCon = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])()) === null || _getEditorControlsCon === void 0 ? void 0 : _getEditorControlsCon.clientId,
    setAttributes = (_getEditorControlsCon2 = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getEditorControlsContext"])()) === null || _getEditorControlsCon2 === void 0 ? void 0 : _getEditorControlsCon2.setAttributes,
    ...restProps
  } = props;
  const {
    blockType,
    defaultVariation
  } = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(select => {
    const {
      getBlockType,
      getDefaultBlockVariation
    } = select(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__["store"]);
    return {
      blockType: getBlockType(name),
      defaultVariation: getDefaultBlockVariation(name, 'block')
    };
  }, [name]);
  const {
    replaceInnerBlocks
  } = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["store"]);
  const hasInnerBlocks = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["useSelect"])(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["store"]).getBlocks(clientId).length > 0, [clientId]);

  if (hasInnerBlocks) {
    return children;
  }

  return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["__experimentalBlockVariationPicker"], _extends({}, restProps, {
    icon: blockType === null || blockType === void 0 ? void 0 : (_blockType$icon = blockType.icon) === null || _blockType$icon === void 0 ? void 0 : _blockType$icon.src,
    label: blockType === null || blockType === void 0 ? void 0 : blockType.title,
    variations: blockType.variations,
    onSelect: (nextVariation = defaultVariation) => {
      if (nextVariation.attributes) {
        setAttributes(nextVariation.attributes);
      }

      if (nextVariation.innerBlocks) {
        replaceInnerBlocks(clientId, Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__["createBlocksFromInnerBlocksTemplate"])(nextVariation.innerBlocks), true);
      }
    }
  }));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/Link/_EditLinkModal.js":
/*!***************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/Link/_EditLinkModal.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! scripts/components/_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_helpers */ "./scripts/components/EditorControls/_helpers.js");


// eslint-disable-next-line @wordpress/no-unsafe-wp-apis






/* harmony default export */ __webpack_exports__["default"] = (props => {
  var _buttonBlockAttribute;

  const {
    addLink,
    cancelLink,
    closeModal,
    extraModalFields,
    instructions,
    link,
    linkText,
    linkType = 'open_link',
    removeLink = null,
    setLink,
    setLinkText,
    setLinkType
  } = props;
  const modalHeight = 640 + extraModalFields.length * 50;
  const buttonBlockAttributeDefinitions = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getBlockAttributesDefinitions"])('fpbk/button');
  const linkTypeOptions = Object.entries(buttonBlockAttributeDefinitions === null || buttonBlockAttributeDefinitions === void 0 ? void 0 : (_buttonBlockAttribute = buttonBlockAttributeDefinitions.button_click_action) === null || _buttonBlockAttribute === void 0 ? void 0 : _buttonBlockAttribute.choices).map(([value, label]) => ({
    value,
    label
  }));
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
    style: {
      width: '500px',
      height: "".concat(modalHeight, "px")
    },
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Insert/edit Link', 'freshpress-website'),
    onRequestClose: closeModal
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["SelectControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Link type', 'freshpress-website'),
    value: linkType,
    options: linkTypeOptions,
    onChange: newLinkType => {
      setLinkType(newLinkType);
      setLink({
        url: newLinkType !== 'open_link' ? '#' : '',
        script: '',
        target: newLinkType === null || newLinkType === void 0 ? void 0 : newLinkType.replace(/(?:open_|execute_)/, '')
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["TextControl"], {
    value: linkText,
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Link text', 'freshpress-website'),
    help: instructions,
    onChange: newLinkText => {
      setLinkText(newLinkText);
    }
  }), linkType === 'open_link' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Enter the destination URL or link to existing content', 'freshpress-website')), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["__experimentalLinkControl"], {
    value: link,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Search', 'freshpress-website'),
    showInitialSuggestions: true,
    forceIsEditingLink: true,
    onChange: newLink => {
      setLink(newLink);
    }
  })), linkType === 'open_modal' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Special.ModalPicker, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Select Modal', 'freshpress-website'),
    value: link !== null && link !== void 0 && link.url ? Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_6__["trimChar"])(link.url, '#') : '',
    onChange: newLink => {
      setLink({
        url: newLink,
        target: 'modal'
      });
    }
  }), linkType === 'open_drift' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].Text, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Drift Interaction ID', 'freshpress-website'),
    value: link !== null && link !== void 0 && link.drift_interaction_id ? link.drift_interaction_id : 331999,
    onChange: newInteractionId => {
      setLink({
        url: '#',
        drift_interaction_id: newInteractionId,
        target: 'drift'
      });
    }
  }), linkType === 'execute_script' && /*#__PURE__*/React.createElement(scripts_components_EditorControls__WEBPACK_IMPORTED_MODULE_5__["default"].TextArea, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Script to execute', 'freshpress-website'),
    instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Do not include <script></script> tags.', 'freshpress-website'),
    value: link !== null && link !== void 0 && link.script ? link.script : '',
    onChange: newScript => {
      setLink({
        url: '#',
        script: newScript,
        target: 'script'
      });
    }
  }), extraModalFields.length > 0 && extraModalFields, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '20px'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    isSecondary: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Cancel', 'freshpress-website'),
    onClick: cancelLink
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    isPrimary: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Add Link', 'freshpress-website'),
    onClick: addLink
  }), removeLink && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    isDestructive: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Remove Link', 'freshpress-website'),
    onClick: removeLink
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/Link/_InlineLink.js":
/*!************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/Link/_InlineLink.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    openModal,
    className = 'btn btn-outline-grey',
    label = '',
    title = '',
    url = '',
    target = ''
  } = props;

  if (url || target === 'drift' || target === 'script') {
    return /*#__PURE__*/React.createElement("button", {
      className: className,
      onClick: openModal,
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Click to edit link', 'freshpress-website')
    }, title);
  }

  return /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-grey border-dashed text-muted my-1",
    onClick: openModal,
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Click to add link', 'freshpress-website')
  }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__["__"])('Add link', 'freshpress-website'), " ", label ? "(".concat(label, ")") : '');
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/Link/_SidebarLink.js":
/*!*************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/Link/_SidebarLink.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");



/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    openModal,
    removeLink,
    target = '_self',
    title = '',
    url = '',
    script = ''
  } = props;
  return /*#__PURE__*/React.createElement("div", null, url ? /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      wordWrap: 'break-word',
      wordBreak: 'break-all'
    }
  }, /*#__PURE__*/React.createElement("p", null, title), url && target === '_self' || target === '_blank' && /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noreferrer"
  }, url), url && target === 'modal' && /*#__PURE__*/React.createElement("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Opens modal with ID:', 'freshpress-website'), ' ', Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_2__["trimChar"])(url, '#')), url && target === 'drift' && /*#__PURE__*/React.createElement("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Opens DriftChat Box', 'freshpress-website')), url && target === 'script' && /*#__PURE__*/React.createElement("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Executes script:', 'freshpress-website'), ' ', /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", {
    dangerouslySetInnerHTML: {
      __html: script
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSecondary: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Edit link', 'freshpress-website'),
    icon: "edit",
    onClick: openModal
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isDestructive: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Remove link', 'freshpress-website'),
    icon: "no-alt",
    onClick: removeLink
  }))) : /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["Button"], {
    isSecondary: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Add link', 'freshpress-website'),
    onClick: openModal
  }));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/RichText/_RichText.js":
/*!**************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/RichText/_RichText.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _types_ListItemType_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types/_ListItemType.js */ "./scripts/components/EditorControls/components/universal/RichText/types/_ListItemType.js");
/* harmony import */ var _types_ListOrderedType_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types/_ListOrderedType.js */ "./scripts/components/EditorControls/components/universal/RichText/types/_ListOrderedType.js");
/* harmony import */ var _types_ListUnorderedType_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types/_ListUnorderedType.js */ "./scripts/components/EditorControls/components/universal/RichText/types/_ListUnorderedType.js");
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }











let onChangeTimeout;
const typesToAdd = [_types_ListUnorderedType_js__WEBPACK_IMPORTED_MODULE_7__["default"], _types_ListOrderedType_js__WEBPACK_IMPORTED_MODULE_6__["default"], _types_ListItemType_js__WEBPACK_IMPORTED_MODULE_5__["default"]];
/**
 * Registers types.
 */

const useRegisterFormatTypes = () => {
  typesToAdd.forEach(type => {
    type.register();
  });
};
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Text".
 */


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["getAttributeFromBlockStore"])(name);
  }

  let {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    disableLocalState = false,
    isSimple = false,
    isExtended = false,
    onChange = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.onChange,
    placeholder = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.instructions,
    updateDelay = 300,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;
  const onChangeCallback = onChange ? onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["getDefaultOnChangeFromContext"])(name);

  if (restProps.multiline) {
    if (value.indexOf("<".concat(restProps.multiline, ">")) !== 0) {
      value = "<".concat(restProps.multiline, ">").concat(value, "</").concat(restProps.multiline, ">");
    }
  }

  const [stateValue, setStateValue] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__["useState"])(value);
  const presetProps = {
    inlineToolbar: true,
    preserveWhiteSpace: true
  };

  if (isSimple) {
    presetProps.allowedFormats = [];
    presetProps.inlineToolbar = false;
  }

  if (isExtended) {
    useRegisterFormatTypes();
    const formatTypes = Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__["useSelect"])(select => {
      return select(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_4__["store"]).getFormatTypes();
    }, []);
    presetProps.allowedFormats = formatTypes.map(e => e.name).concat(typesToAdd.map(type => type.name));
  }

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_8__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["RichText"], _extends({}, restProps, presetProps, {
    placeholder: placeholder,
    value: disableLocalState ? value : stateValue,
    onChange: newValue => {
      if (disableLocalState) {
        onChangeCallback(newValue);
      } else {
        clearTimeout(onChangeTimeout);
        setStateValue(newValue);
        onChangeTimeout = setTimeout(() => {
          onChangeCallback(newValue);
        }, updateDelay);
      }
    }
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/RichText/types/_ListItemType.js":
/*!************************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/RichText/types/_ListItemType.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const name = 'freshbooks/li';
const listItemType = {
  name,
  register: () => {
    if (typeof Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__["select"])(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__["store"]).getFormatType(name) === 'undefined') {
      Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_0__["registerFormatType"])(name, {
        title: 'li',
        tagName: 'li',
        className: null
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (listItemType);

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/RichText/types/_ListOrderedType.js":
/*!***************************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/RichText/types/_ListOrderedType.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);




const name = 'freshbooks/ol';
const listOrderedType = {
  name,
  register: () => {
    if (typeof Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["select"])(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["store"]).getFormatType(name) === 'undefined') {
      Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["registerFormatType"])(name, {
        title: 'ol',
        tagName: 'ol',
        className: null,

        edit({
          isActive,
          value,
          onChange
        }) {
          const onToggle = () => {
            if (isActive) {
              return onChange(Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["insert"])(value, Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["create"])({
                html: Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["slice"])(value).text
              }), value.start, value.end));
            }

            const str = Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["slice"])(value).text.split('\n').filter(el => !el.match(/^\s*$/)).map(el => el.replace(/(^[\s\t]+|[\s\t]+$, '')/g)).join('</li>\n<li>');
            return onChange(Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["insert"])(value, Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["create"])({
              html: '<ol>\n<li>' + str + '</li>\n</ol>'
            }), value.start, value.end));
          };

          return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["RichTextToolbarButton"], {
            icon: 'editor-ol',
            title: 'List Ordered',
            onClick: onToggle,
            isActive: isActive
          });
        }

      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (listOrderedType);

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/RichText/types/_ListUnorderedType.js":
/*!*****************************************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/RichText/types/_ListUnorderedType.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);




const name = 'freshbooks/ul';
const listUnorderedType = {
  name,
  register: () => {
    if (typeof Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["select"])(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["store"]).getFormatType(name) === 'undefined') {
      Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["registerFormatType"])(name, {
        title: 'ul',
        tagName: 'ul',
        className: null,

        edit({
          isActive,
          value,
          onChange
        }) {
          const onToggle = () => {
            if (isActive) {
              return onChange(Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["insert"])(value, Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["create"])({
                html: Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["slice"])(value).text
              }), value.start, value.end));
            }

            const str = Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["slice"])(value).text.split('\n').filter(el => !el.match(/^\s*$/)).map(el => el.replace(/(^[\s\t]+|[\s\t]+$, '')/g)).join('</li>\n<li>');
            return onChange(Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["insert"])(value, Object(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__["create"])({
              html: '<ul>\n<li>' + str + '</li>\n</ul>'
            }), value.start, value.end));
          };

          return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["RichTextToolbarButton"], {
            icon: 'editor-ul',
            title: 'List Unordered',
            onClick: onToggle,
            isActive: isActive
          });
        }

      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (listUnorderedType);

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Checkbox.js":
/*!*****************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Checkbox.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");




/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Choice: True / False".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    choices = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.choices,
    instructions = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.instructions,
    label = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeValueFromContext"])(name)
  } = props;
  const onChange = props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getDefaultOnChangeFromContext"])(name);
  const checkboxes = Object.entries(choices).map(([currentChoiceValue, currentChoiceLabel], index) => {
    return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].TrueFalse, {
      key: "label_".concat(index),
      className: 'my-0',
      value: value.includes(currentChoiceValue),
      label: currentChoiceLabel,
      onChange: currentChoiceChecked => {
        let newValue = [...value];

        if (currentChoiceChecked === true) {
          newValue.push(currentChoiceValue);
        } else {
          newValue = newValue.filter(innerValue => innerValue !== currentChoiceValue);
        }

        onChange(newValue);
      }
    });
  });
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], null, checkboxes)));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_ColourPicker.js":
/*!*********************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_ColourPicker.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "jQuery: Color Picker".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    default: defaultColour = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.default,
    inline = false,
    isSmall = false,
    instructions = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.instructions,
    label = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["getAttributeValueFromContext"])(name, {}),
    ...restProps
  } = props;
  const onChange = props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["getDefaultOnChangeFromContext"])(name);
  const defaultColorObject = {
    hex: defaultColour ? defaultColour : '#ffffff'
  }; // A tweak to force re-load ColorPicker component to use cleared colour.

  const [showColorPicker, setColorPickerState] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(true);
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    if (showColorPicker === false) {
      setColorPickerState(true);
    }
  }, [showColorPicker]);

  const reloadColorPicker = () => {
    setColorPickerState(false);
  };

  const [modalOpened, setModalOpened] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const ColourPickerContent = () =>
  /*#__PURE__*/
  //eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions
  }, showColorPicker === true && value.hex !== '' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["ColorPicker"], _extends({}, restProps, {
    color: value ? value : defaultColorObject,
    onChangeComplete: onChange
  })), /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].TrueFalse, {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('No colour', 'freshpress-website'),
    value: value.hex === '' || value === '',
    onChange: isTransparent => {
      if (isTransparent) {
        onChange({
          hex: ''
        });
      } else {
        onChange(defaultColorObject);
      }
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isSecondary: true,
    isSmall: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Clear', 'freshpress-website'),
    onClick: () => {
      onChange(defaultColorObject);
      reloadColorPicker();
    }
  }));

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_4__["default"].Special.ConditionalLogic, {
    name: name
  }, inline === true && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isPrimary: true,
    isSmall: isSmall,
    icon: "color-picker",
    showTooltip: true,
    title: "".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Pick', 'freshpress-website'), ": ").concat(label),
    onClick: openModal
  }), inline === true && modalOpened === true && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    style: {
      width: '500px',
      height: '600px'
    },
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Insert/edit colour', 'freshpress-website'),
    onRequestClose: closeModal
  }, /*#__PURE__*/React.createElement(ColourPickerContent, null), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    isPrimary: true,
    text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Close modal', 'freshpress-website'),
    onClick: closeModal
  })), inline === false && /*#__PURE__*/React.createElement(ColourPickerContent, null));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_File.js":
/*!*************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_File.js ***!
  \*************************************************************************/
/*! exports provided: emptyFileObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyFileObject", function() { return emptyFileObject; });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");





const emptyFileObject = {
  id: null,
  filename: '',
  url: '',
  subtype: ''
};
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: File".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props === null || props === void 0 ? void 0 : props.name;
  const parent = props === null || props === void 0 ? void 0 : props.parent;
  let attribute = {};

  if (name !== undefined) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeFromBlockStore"])(name, parent);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    inlineControlsAlign = 'center',
    inline = false,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    allowedTypes = ['application', 'audio'],
    onChange = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.onChange,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeValueFromContext"])(name, emptyFileObject)
  } = props;
  const {
    id = '',
    filename = '',
    url = '',
    subtype = ''
  } = value;
  const onChangeCallback = onChange ? onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getDefaultOnChangeFromContext"])(name);

  const FilePicker = () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUpload"], {
    value: id,
    allowedTypes: allowedTypes,
    onSelect: newFile => {
      const newFileToSet = {
        id: newFile.id,
        filename: newFile.name,
        url: newFile.url,
        subtype: newFile.subtype
      };
      onChangeCallback(newFileToSet);
    },
    render: ({
      open
    }) =>
    /*#__PURE__*/
    // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
    React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
      className: "".concat(inline ? "block-editor__editor-controls__file--inline block-editor__editor-controls__file--inline--".concat(inlineControlsAlign) : '', " ").concat(url ? '' : 'block-editor__editor-controls__file--inline--show')
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: !url && inline ? 'btn btn-outline-grey border-dashed text-muted shadow-none h-auto' : '',
      isPrimary: true,
      text: // eslint-disable-next-line no-nested-ternary
      url ? inline ? '' : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Edit file', 'freshpress-website') : "".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Add file', 'freshpress-website'), " ").concat(label ? "(".concat(label, ")") : ''),
      icon: url ? 'edit' : 'plus',
      onClick: open
    }), url && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      isPrimary: true,
      isDestructive: true,
      text: inline ? '' : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Remove', 'freshpress-website'),
      icon: "no-alt",
      onClick: () => {
        onChangeCallback(emptyFileObject);
      }
    }))
  });

  const FilePreview = () => {
    if (url) {
      if (props.preview) {
        return /*#__PURE__*/React.createElement(props.preview, {
          id: id,
          filename: filename,
          url: url,
          subtype: subtype
        });
      }

      return /*#__PURE__*/React.createElement("p", null, url);
    }

    return null;
  };

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUploadCheck"], null, inline && /*#__PURE__*/React.createElement("div", {
    className: "position-relative block-editor__editor-controls__file-wrapper text-center"
  }, /*#__PURE__*/React.createElement(FilePicker, null), /*#__PURE__*/React.createElement(FilePreview, null)), !inline &&
  /*#__PURE__*/
  // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FilePicker, null), /*#__PURE__*/React.createElement(FilePreview, null)))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Gallery.js":
/*!****************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Gallery.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");




/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Gallery".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    className = '',
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    onChange = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.onChange,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeValueFromContext"])(name, []),
    slider = false
  } = props;
  const onChangeCallback = onChange ? onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getDefaultOnChangeFromContext"])(name);

  const Slides = () => value.map((item, index) => /*#__PURE__*/React.createElement("img", {
    key: index,
    src: item.url,
    alt: item.alt,
    style: slider ? {
      maxHeight: '150px',
      marginRight: '15px'
    } : {
      maxHeight: '150px',
      width: '25%'
    }
  }));

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions,
    className: className
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUploadCheck"], null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaPlaceholder"], {
    onSelect: newGallery => {
      onChangeCallback(newGallery);
    },
    className: value ? 'has-images' : '',
    value: value,
    allowedTypes: ['image'],
    multiple: true,
    labels: {
      title: 'Select Gallery Images'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: slider ? {
      whiteSpace: 'nowrap',
      overflowX: 'scroll'
    } : {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Slides, null))))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Image.js":
/*!**************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Image.js ***!
  \**************************************************************************/
/*! exports provided: emptyImageObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyImageObject", function() { return emptyImageObject; });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");





const emptyImageObject = {
  id: null,
  url: '',
  alt: '',
  sizes: [],
  width: '',
  height: ''
};
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Image".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3, _sizes$previewSize, _sizes$previewSize2;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    inlineControlsAlign = 'center',
    className = '',
    inline = false,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    allowedTypes = ['image'],
    onChange = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.onChange,
    previewSize = 'thumbnail',
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getAttributeValueFromContext"])(name, emptyImageObject)
  } = props;
  const {
    id = '',
    url = '',
    alt = '',
    sizes = {}
  } = value;
  const onChangeCallback = onChange ? onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["getDefaultOnChangeFromContext"])(name);
  const isStaticImage = !id && url.length > 0;
  const previewUrl = sizes[previewSize] && (_sizes$previewSize = sizes[previewSize]) !== null && _sizes$previewSize !== void 0 && _sizes$previewSize.url ? (_sizes$previewSize2 = sizes[previewSize]) === null || _sizes$previewSize2 === void 0 ? void 0 : _sizes$previewSize2.url : url;

  const ImagePicker = () => /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUpload"], {
    value: id,
    allowedTypes: allowedTypes,
    onSelect: newImage => {
      const newImageToSet = {
        id: newImage.id,
        url: newImage.url,
        alt: newImage.alt,
        sizes: newImage.sizes,
        width: newImage.width,
        height: newImage.height
      };
      onChangeCallback(newImageToSet);
    },
    render: ({
      open
    }) =>
    /*#__PURE__*/
    // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
    React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
      className: "".concat(inline ? "block-editor__editor-controls__file--inline block-editor__editor-controls__file--inline--".concat(inlineControlsAlign) : '', " ").concat(previewUrl ? '' : 'block-editor__editor-controls__file--inline--show')
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
      text: isStaticImage ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("This image can't be edited as it is static URL. Please remove it first and then add new one on it.", 'freshpress-website') : ''
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: !previewUrl && inline ? 'btn btn-outline-grey border-dashed text-muted shadow-none h-auto' : '',
      disabled: isStaticImage,
      isPrimary: true,
      text: // eslint-disable-next-line no-nested-ternary
      previewUrl ? inline ? '' : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Edit image', 'freshpress-website') : "".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Add image', 'freshpress-website'), " ").concat(label ? "(".concat(label, ")") : ''),
      icon: previewUrl ? 'edit' : 'plus',
      onClick: open
    })), previewUrl && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      isPrimary: true,
      isDestructive: true,
      text: inline ? '' : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('Remove', 'freshpress-website'),
      icon: "no-alt",
      onClick: () => {
        onChangeCallback(emptyImageObject);
      }
    }))
  });

  const ImagePreview = () => previewUrl ? /*#__PURE__*/React.createElement("img", {
    id: id,
    src: previewUrl,
    alt: alt,
    className: className
  }) : null;

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_3__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["MediaUploadCheck"], null, inline && /*#__PURE__*/React.createElement("div", {
    className: "position-relative block-editor__editor-controls__file-wrapper"
  }, /*#__PURE__*/React.createElement(ImagePicker, null), /*#__PURE__*/React.createElement(ImagePreview, null)), !inline &&
  /*#__PURE__*/
  // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ImagePicker, null), /*#__PURE__*/React.createElement(ImagePreview, null)))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Link.js":
/*!*************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Link.js ***!
  \*************************************************************************/
/*! exports provided: emptyLinkObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyLinkObject", function() { return emptyLinkObject; });
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Link_EditLinkModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Link/_EditLinkModal */ "./scripts/components/EditorControls/components/universal/Link/_EditLinkModal.js");
/* harmony import */ var _Link_InlineLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Link/_InlineLink */ "./scripts/components/EditorControls/components/universal/Link/_InlineLink.js");
/* harmony import */ var _Link_SidebarLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Link/_SidebarLink */ "./scripts/components/EditorControls/components/universal/Link/_SidebarLink.js");
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! scripts/helpers/_strings */ "./scripts/helpers/_strings.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }










const emptyLinkObject = {
  url: '',
  title: '',
  opensInNewTab: false,
  target: '_self',
  type: 'link'
};
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: link".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    className = '',
    extraModalFields = [],
    inline = false,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    onChange = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.onChange,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getAttributeValueFromContext"])(name, emptyLinkObject)
  } = props;
  const onChangeCallback = onChange ? onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getDefaultOnChangeFromContext"])(name);
  const [isModalOpen, setModalOpen] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  const addLink = () => {
    const linkToSet = { ...link,
      type: linkType
    };

    if (linkText) {
      linkToSet.title = linkText;
    }

    if (linkType === 'open_link') {
      linkToSet.target = linkToSet.opensInNewTab ? '_blank' : '_self';
    } else if (linkType === 'open_modal') {
      linkToSet.url = "#".concat(Object(scripts_helpers_strings__WEBPACK_IMPORTED_MODULE_8__["trimChar"])(link.url));
      linkToSet.target = 'modal';
    } else {
      linkToSet.url = link.url;
      linkToSet.target = link.target;
      linkToSet.script = link.script;
    }

    onChangeCallback(linkToSet);
    closeModal();
  };

  const removeLink = () => {
    onChangeCallback(emptyLinkObject);
    setLink(emptyLinkObject);
    setLinkText('');

    if (inline) {
      closeModal();
    }
  };

  const cancelLink = () => {
    setLink(emptyLinkObject);
    setLinkText('');
    closeModal();
  };

  const [link, setLink] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(value ? value : emptyLinkObject);
  const [linkText, setLinkText] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(value !== null && value !== void 0 && value.title ? value.title : '');
  const [linkType, setLinkType] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["useState"])(value !== null && value !== void 0 && value.type && ['open_link', 'open_modal', 'open_drift', 'execute_script'].includes(value.type) ? value.type : 'open_link');
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_6__["default"].Special.ConditionalLogic, {
    name: name
  }, inline && /*#__PURE__*/React.createElement(_Link_InlineLink__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, value, {
    name: name,
    className: className,
    label: label,
    openModal: openModal,
    removeLink: removeLink
  })), !inline &&
  /*#__PURE__*/
  // eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
  React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["BaseControl"], {
    label: label,
    help: instructions
  }, /*#__PURE__*/React.createElement(_Link_SidebarLink__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, value, {
    openModal: openModal,
    removeLink: removeLink
  }))), isModalOpen && /*#__PURE__*/React.createElement(_Link_EditLinkModal__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, value, {
    addLink: addLink,
    cancelLink: cancelLink,
    closeModal: closeModal,
    extraModalFields: extraModalFields,
    link: link,
    linkText: linkText,
    linkType: linkType,
    removeLink: inline ? removeLink : null,
    setLink: setLink,
    setLinkText: setLinkText,
    setLinkType: setLinkType
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Number.js":
/*!***************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Number.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// eslint-disable-next-line @wordpress/no-unsafe-wp-apis



/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Text".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3, _attribute4, _attribute5;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    max = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.max,
    min = (_attribute4 = attribute) === null || _attribute4 === void 0 ? void 0 : _attribute4.min,
    step = (_attribute5 = attribute) === null || _attribute5 === void 0 ? void 0 : _attribute5.step,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["BaseControl"], {
    label: label,
    help: instructions
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["TextControl"], _extends({}, restProps, {
    type: "number",
    value: value,
    max: max,
    min: min,
    step: step,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getDefaultOnChangeFromContext"])(name)
  }))));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Range.js":
/*!**************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Range.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
/* harmony import */ var _special_ConditionalLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../special/_ConditionalLogic */ "./scripts/components/EditorControls/components/special/_ConditionalLogic.js");



/**
 * @param {Object} props
 * @return {JSX.Element} Returns component for ACF field with type "Basic: RangeControl".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3, _attribute4, _attribute5;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getAttributeValueFromContext"])(name),
    min = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.min,
    max = (_attribute4 = attribute) === null || _attribute4 === void 0 ? void 0 : _attribute4.max,
    step = (_attribute5 = attribute) === null || _attribute5 === void 0 ? void 0 : _attribute5.step
  } = props;
  return /*#__PURE__*/React.createElement(_special_ConditionalLogic__WEBPACK_IMPORTED_MODULE_2__["default"], {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["RangeControl"], {
    label: label,
    help: instructions,
    value: value,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getDefaultOnChangeFromContext"])(name),
    min: min,
    max: max,
    step: step
  }));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Select.js":
/*!***************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Select.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/**
 * @param {Object} choices
 * @param {string|null} emptyChoice
 * @return {{label: *, value: *}[]} Return choices formatted as options.
 */

const getOptions = (choices, emptyChoice) => {
  let options = Object.keys(choices).map(choiceValue => ({
    value: choiceValue,
    label: choices[choiceValue]
  }));

  if (emptyChoice) {
    options = [{
      value: '',
      label: emptyChoice,
      disabled: true
    }, ...options];
  }

  return options;
};
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Choice: Select".
 */


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3, _attribute4, _attribute5;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeFromBlockStore"])(name);
  }

  const {
    name: tmpName = null,
    // eslint-disable-line no-unused-vars
    choices = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.choices,
    emptyChoice = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.emptyChoice,
    instructions = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.instructions,
    label = (_attribute4 = attribute) === null || _attribute4 === void 0 ? void 0 : _attribute4.label,
    multiple = (_attribute5 = attribute) === null || _attribute5 === void 0 ? void 0 : _attribute5.multiple,
    prefix = '',
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;

  if (typeof choices !== 'object') {
    // eslint-disable-next-line no-console
    console.error('<EditorControls.Select /> require "choices" to be an object.');
  }

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_2__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["SelectControl"], _extends({}, restProps, {
    value: value,
    label: label,
    help: instructions,
    multiple: !!multiple,
    style: !!multiple ? {
      height: 'auto'
    } : {},
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getDefaultOnChangeFromContext"])(name),
    options: getOptions(choices, emptyChoice),
    prefix: prefix !== 'acf' ? prefix : ''
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_Text.js":
/*!*************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_Text.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Text".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["TextControl"], _extends({}, restProps, {
    value: value,
    label: label,
    help: instructions,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getDefaultOnChangeFromContext"])(name)
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_TextArea.js":
/*!*****************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_TextArea.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Text".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;
  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
    name: name
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["TextareaControl"], _extends({}, restProps, {
    value: value,
    label: label,
    help: instructions,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getDefaultOnChangeFromContext"])(name)
  })));
});

/***/ }),

/***/ "./scripts/components/EditorControls/components/universal/_TrueFalse.js":
/*!******************************************************************************!*\
  !*** ./scripts/components/EditorControls/components/universal/_TrueFalse.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_EditorControls */ "./scripts/components/_EditorControls.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_helpers */ "./scripts/components/EditorControls/_helpers.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Choice: True / False".
 */

/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var _attribute, _attribute2, _attribute3;

  const name = props.name ? props.name : null;
  let attribute = {};

  if (name !== null) {
    attribute = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeFromBlockStore"])(name);
  }

  const {
    // eslint-disable-next-line no-unused-vars
    name: tmpName = null,
    // eslint-disable-next-line no-unused-vars
    type: tmpType = null,
    instructions = (_attribute = attribute) === null || _attribute === void 0 ? void 0 : _attribute.instructions,
    label = (_attribute2 = attribute) === null || _attribute2 === void 0 ? void 0 : _attribute2.label,
    value = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getAttributeValueFromContext"])(name),
    ...restProps
  } = props;
  let {
    ui = (_attribute3 = attribute) === null || _attribute3 === void 0 ? void 0 : _attribute3.ui
  } = props;

  if (isNaN(Number(ui))) {
    ui = 1;
  }

  return /*#__PURE__*/React.createElement(_EditorControls__WEBPACK_IMPORTED_MODULE_1__["default"].Special.ConditionalLogic, {
    name: name
  }, ui > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["ToggleControl"], _extends({}, restProps, {
    checked: value,
    label: label,
    help: instructions,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getDefaultOnChangeFromContext"])(name)
  })), (ui < 1 || Number(ui) < 1) && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__["CheckboxControl"], _extends({}, restProps, {
    checked: value,
    label: label,
    help: instructions,
    onChange: props.onChange ? props.onChange : Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getDefaultOnChangeFromContext"])(name)
  })));
});

/***/ }),

/***/ "./scripts/components/_EditorControls.js":
/*!***********************************************!*\
  !*** ./scripts/components/_EditorControls.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditorControls_components_acf_Accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditorControls/components/acf/_Accordion */ "./scripts/components/EditorControls/components/acf/_Accordion.js");
/* harmony import */ var _EditorControls_components_universal_Checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorControls/components/universal/_Checkbox */ "./scripts/components/EditorControls/components/universal/_Checkbox.js");
/* harmony import */ var _EditorControls_components_special_ConditionalLogic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorControls/components/special/_ConditionalLogic */ "./scripts/components/EditorControls/components/special/_ConditionalLogic.js");
/* harmony import */ var _EditorControls_components_universal_ColourPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditorControls/components/universal/_ColourPicker */ "./scripts/components/EditorControls/components/universal/_ColourPicker.js");
/* harmony import */ var _EditorControls_components_acf_CommonBlockSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditorControls/components/acf/_CommonBlockSettings */ "./scripts/components/EditorControls/components/acf/_CommonBlockSettings.js");
/* harmony import */ var _EditorControls_components_universal_File__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EditorControls/components/universal/_File */ "./scripts/components/EditorControls/components/universal/_File.js");
/* harmony import */ var _EditorControls_components_universal_Gallery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditorControls/components/universal/_Gallery */ "./scripts/components/EditorControls/components/universal/_Gallery.js");
/* harmony import */ var _EditorControls_components_acf_Group__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditorControls/components/acf/_Group */ "./scripts/components/EditorControls/components/acf/_Group.js");
/* harmony import */ var _EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EditorControls/components/universal/_Image */ "./scripts/components/EditorControls/components/universal/_Image.js");
/* harmony import */ var _EditorControls_components_universal_Link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditorControls/components/universal/_Link */ "./scripts/components/EditorControls/components/universal/_Link.js");
/* harmony import */ var _EditorControls_components_universal_Number__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./EditorControls/components/universal/_Number */ "./scripts/components/EditorControls/components/universal/_Number.js");
/* harmony import */ var _EditorControls_components_universal_Range__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EditorControls/components/universal/_Range */ "./scripts/components/EditorControls/components/universal/_Range.js");
/* harmony import */ var _EditorControls_components_acf_Repeater__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditorControls/components/acf/_Repeater */ "./scripts/components/EditorControls/components/acf/_Repeater.js");
/* harmony import */ var _EditorControls_components_universal_RichText_RichText__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./EditorControls/components/universal/RichText/_RichText */ "./scripts/components/EditorControls/components/universal/RichText/_RichText.js");
/* harmony import */ var _EditorControls_components_universal_Select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./EditorControls/components/universal/_Select */ "./scripts/components/EditorControls/components/universal/_Select.js");
/* harmony import */ var _EditorControls_components_universal_Text__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./EditorControls/components/universal/_Text */ "./scripts/components/EditorControls/components/universal/_Text.js");
/* harmony import */ var _EditorControls_components_universal_TextArea__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./EditorControls/components/universal/_TextArea */ "./scripts/components/EditorControls/components/universal/_TextArea.js");
/* harmony import */ var _EditorControls_components_universal_TrueFalse__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./EditorControls/components/universal/_TrueFalse */ "./scripts/components/EditorControls/components/universal/_TrueFalse.js");
/* harmony import */ var _EditorControls_components_special_VariationPicker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./EditorControls/components/special/_VariationPicker */ "./scripts/components/EditorControls/components/special/_VariationPicker.js");
/* harmony import */ var _EditorControls_components_special_ModalPicker__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./EditorControls/components/special/_ModalPicker */ "./scripts/components/EditorControls/components/special/_ModalPicker.js");





















const EditorControls = {
  /**
   * Context to store commonly used variables by EditorControl.*
   */
  Context: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createContext"])(''),

  /**
   * ACF-only EditorControl.Acf.* components
   */
  Acf: {
    Accordion: _EditorControls_components_acf_Accordion__WEBPACK_IMPORTED_MODULE_1__["default"],
    CommonBlockSettings: _EditorControls_components_acf_CommonBlockSettings__WEBPACK_IMPORTED_MODULE_5__["default"],
    Group: _EditorControls_components_acf_Group__WEBPACK_IMPORTED_MODULE_8__["default"],
    Repeater: _EditorControls_components_acf_Repeater__WEBPACK_IMPORTED_MODULE_13__["default"]
  },

  /**
   * Special EditorControl.Special.* components
   */
  Special: {
    ConditionalLogic: _EditorControls_components_special_ConditionalLogic__WEBPACK_IMPORTED_MODULE_3__["default"],
    VariationPicker: _EditorControls_components_special_VariationPicker__WEBPACK_IMPORTED_MODULE_19__["default"],
    ModalPicker: _EditorControls_components_special_ModalPicker__WEBPACK_IMPORTED_MODULE_20__["default"]
  },

  /**
   * Universal EditorControl.* components
   */
  Checkbox: _EditorControls_components_universal_Checkbox__WEBPACK_IMPORTED_MODULE_2__["default"],
  ColourPicker: _EditorControls_components_universal_ColourPicker__WEBPACK_IMPORTED_MODULE_4__["default"],
  File: _EditorControls_components_universal_File__WEBPACK_IMPORTED_MODULE_6__["default"],
  Gallery: _EditorControls_components_universal_Gallery__WEBPACK_IMPORTED_MODULE_7__["default"],
  Image: _EditorControls_components_universal_Image__WEBPACK_IMPORTED_MODULE_9__["default"],
  Link: _EditorControls_components_universal_Link__WEBPACK_IMPORTED_MODULE_10__["default"],
  Number: _EditorControls_components_universal_Number__WEBPACK_IMPORTED_MODULE_11__["default"],
  Range: _EditorControls_components_universal_Range__WEBPACK_IMPORTED_MODULE_12__["default"],
  RichText: _EditorControls_components_universal_RichText_RichText__WEBPACK_IMPORTED_MODULE_14__["default"],
  Select: _EditorControls_components_universal_Select__WEBPACK_IMPORTED_MODULE_15__["default"],
  Text: _EditorControls_components_universal_Text__WEBPACK_IMPORTED_MODULE_16__["default"],
  TextArea: _EditorControls_components_universal_TextArea__WEBPACK_IMPORTED_MODULE_17__["default"],
  TrueFalse: _EditorControls_components_universal_TrueFalse__WEBPACK_IMPORTED_MODULE_18__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (EditorControls);

/***/ }),

/***/ "./scripts/components/_Template.js":
/*!*****************************************!*\
  !*** ./scripts/components/_Template.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_react_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-react-parser */ "../../../node_modules/html-react-parser/index.mjs");


const getReplaceComponentKey = componentName => "__component__".concat(componentName, "__");

/* harmony default export */ __webpack_exports__["default"] = (props => {
  const {
    template,
    components = {},
    partials = {}
  } = props;
  const attributes = { ...props.attributes
  };
  const hasComponents = Object.keys(components).length > 0;

  if (hasComponents) {
    Object.keys(components).forEach(componentName => {
      attributes[componentName] = getReplaceComponentKey(componentName);
    });
  }

  const parsedTemplate = Object(html_react_parser__WEBPACK_IMPORTED_MODULE_0__["default"])(template(attributes, partials), {
    replace: domNode => {
      if (hasComponents && domNode.type.toLowerCase() === 'text' && domNode.data) {
        const replacementDomNodes = [];
        Object.keys(components).forEach(componentName => {
          var _domNode$data;

          if (((_domNode$data = domNode.data) === null || _domNode$data === void 0 ? void 0 : _domNode$data.indexOf("__".concat(componentName, "__"))) >= 0) {
            replacementDomNodes.push(components[componentName]);
          }
        });

        if (replacementDomNodes.length > 0) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, replacementDomNodes);
        }

        return domNode;
      }
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, parsedTemplate);
});

/***/ })

}]);
//# sourceMappingURL=common-components.js.map