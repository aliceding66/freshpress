/**
 * Forms module.
 */

import * as _validation from 'scripts/modules/_validation';
import {
	getDataAttr,
	hasDataAttr,
	getAttrOrData,
	hasAttrOrData,
} from 'scripts/helpers/_attributes';
import { handleSignup } from 'scripts/modules/_signup';
import { toCamelCase } from 'scripts/helpers/_strings';

/**
 * Initialise all forms on a page.
 */
export const initForms = () => {
	const forms = getAllForms();

	if ( forms && 'forEach' in forms ) {
		forms.forEach( ( form ) => {
			form.addEventListener( 'submit', ( event ) => {
				event.preventDefault();
				event.stopPropagation();

				const fields = validateAllFields( form );
				const formValid =
					fields.length === fields.filter( ( field ) => field.isValid ).length;

				if ( formValid ) {
					form.classList.remove( 'was-validated' );
					const handler = getDataAttr( form, 'form-handler' );

					if ( handler === 'handleSignup' ) {
						handleSignup( form );
					} else if ( typeof handler === 'function' ) {
						handler.call( window, form );
					}
				} else {
					form.classList.add( 'was-validated' );
					const firstError = form.querySelector(
						'.form-control:invalid, .form-control-checkbox:invalid'
					);

					if ( firstError ) {
						firstError.focus();
					}
				}
			} );

			const fields = getAllFormFields( form );

			fields.forEach( ( field ) => {
				// check if field is a Select to handle on change event
				if ( field.tagName === 'SELECT' ) {
					field.addEventListener( 'change', () => {
						validateField( field );
					} );
				} else {
					field.addEventListener( 'keyup', () => {
						validateField( field );
					} );
				}
			} );
		} );
	}
};

/**
 * Filter an array of DOM elements - by default filtering by 'type' attribute.
 *
 * @param {Array|NodeList}  fields   Array or NodeList (array-like) of input field DOM elements.
 * @param {Array}           excludes Array of attribute values to filter.
 * @param {string}          attr     Attribute to filter on (defaults to 'type').
 */
export const filterInputFields = (
	fields,
	excludes = [ 'button', 'submit', 'reset', 'image' ],
	attr = 'type'
) => {
	return Array.from( fields ).filter( ( el ) => ! excludes.includes( el[ attr ] ) );
};

/**
 * Get all forms on a page (or in a container).
 *
 * @param {string|HTMLElement} [parent=document] A selector string or DOM element.
 */
export const getAllForms = ( parent ) => {
	let forms = [];

	if ( 'string' === typeof parent ) {
		parent = document.querySelector( parent );
	} else if ( ! parent ) {
		parent = document;
	}

	if ( parent && 'querySelectorAll' in parent ) {
		forms = parent.querySelectorAll( 'form' );
	}

	return forms;
};

/**
 * Get all fields within a form.
 *
 * @param {string|HTMLFormElement} form A selector string or DOM element.
 */
export const getAllFormFields = ( form ) => {
	let fields = [];

	if ( 'string' === typeof form ) {
		form = document.querySelector( form );
	}

	if ( form && form instanceof window.HTMLFormElement ) {
		if ( form && form.elements ) {
			fields = filterInputFields( form.elements );
		}
	}

	return fields;
};

/**
 * Get the type of a field.
 *
 * @param {HTMLElement} field A DOM element.
 */
export const getFieldType = ( field ) => {
	let fieldType = getDataAttr( field, 'type' );

	if ( fieldType ) {
		return fieldType;
	}

	if ( field.tagName ) {
		const tagName = field.tagName.toLowerCase();

		if ( tagName === 'input' && field.type ) {
			fieldType = field.type;
		} else {
			fieldType = tagName;
		}
	}

	return fieldType;
};

/**
 * Get the value of a field.
 *
 * @param {HTMLElement} field A DOM element.
 */
export const getFieldValue = ( field ) => {
	const fieldType = getFieldType( field );

	if ( 'select' === fieldType && field.multiple && field.selectedIndex >= 0 ) {
		const optArray = field.selectedOptions
			? Array.from( field.selectedOptions )
			: Array.from( field.options ).filter( ( opt ) => !! opt.selected );

		return optArray.map( ( opt ) => opt.value );
	}

	if ( 'checkbox' === fieldType || 'radio' === fieldType ) {
		return field.checked;
	}

	return field.value;
};

/**
 * Set the value of a field.
 *
 * @param {HTMLElement} field A DOM element.
 * @param {*}           value Value to set for the input field.
 * @return {HTMLElement} field element returned for chaining.
 */
export const setFieldValue = ( field, value ) => {
	const fieldType = getFieldType( field );

	if ( 'select' === fieldType && field.multiple && Array.isArray( value ) ) {
		field.value = null;
		Array.from( field.options )
			.filter( ( opt ) => value.includes( opt.value ) )
			.forEach( ( opt ) => {
				opt.selected = true;
			} );
	} else if ( 'checkbox' === fieldType || 'radio' === fieldType ) {
		field.checked = !! value;
	} else if ( undefined !== value ) {
		if ( value && field.maxLength && field.maxLength > 0 && value.length > field.maxLength ) {
			field.value = value.slice( 0, field.maxLength );
		} else {
			field.value = value;
		}
	}

	return field;
};

/**
 * Get the validation type of a field (data-validation).
 *
 * @param {HTMLElement} field Expects a DOM element
 * @return {Array} Types of validation required for this field.
 */
export const getValidationRules = ( field ) => {
	let validationRules = [];

	if ( field && field.dataset && field.dataset.validation ) {
		validationRules = field.dataset.validation.split( ' ' );
	} else {
		const fieldType = getFieldType( field );

		if ( fieldType === 'email' ) {
			validationRules.push( 'isEmail' );
		} else if ( fieldType === 'tel' ) {
			validationRules.push( 'isPhone' );
		}
	}

	if ( hasAttrOrData( field, 'required' ) ) {
		validationRules.push( 'required' );
	}

	return validationRules.map( ( rule ) => toCamelCase( rule ) );
};

/**
 * Validate a field.
 *
 * @param {HTMLElement} field Expects a DOM element.
 * @return {boolean} Field validity.
 */
export const validateField = ( field ) => {
	if ( ! field || ! field.validity ) {
		return;
	}
	const validationRules = getValidationRules( field );
	const fieldVal = getFieldValue( field );
	const tooltip = field.parentNode ? field.parentNode.querySelector( '.invalid-tooltip' ) : false;
	const validationOptions = {
		allowZero: hasDataAttr( field, 'allow-zero' ),
		allowSpaces: hasDataAttr( field, 'allow-spaces' ),
	};

	field.setCustomValidity( '' ); // Reset validity for this field.
	if ( tooltip ) {
		tooltip.innerHTML = field.validationMessage;
	}

	// Check if field is required.
	if (
		validationRules.includes( 'required' ) &&
		_validation.isEmpty( fieldVal, validationOptions )
	) {
		field.setCustomValidity( 'This field is required' );
		if ( tooltip ) {
			tooltip.innerHTML = field.validationMessage;
		}
		return field.validity.valid;
	}

	if ( ! _validation.isEmpty( validationRules ) ) {
		// Check field type validation.
		validationRules.forEach( ( rule ) => {
			const notRule = rule.startsWith( 'not' ) && rule.replace( /^not([A-Z])/, 'is$1' );

			if ( typeof _validation[ rule ] === 'function' && ! _validation[ rule ]( fieldVal ) ) {
				field.setCustomValidity( 'This field is invalid' );
			} else if (
				typeof _validation[ notRule ] === 'function' &&
				_validation[ notRule ]( fieldVal )
			) {
				field.setCustomValidity( 'This field is invalid' );
			}

			if ( tooltip ) {
				tooltip.innerHTML = field.validationMessage;
			}
			if ( ! field.validity.valid ) {
				return field.validity.valid;
			}
		} );
	}

	// Check the length of the field value.
	const stringFieldVal = fieldVal.toString().trim();
	const minLength = getAttrOrData( field, 'minlength' ) || 0;
	const maxLength = getAttrOrData( field, 'maxlength' ) || window.Number.MAX_SAFE_INTEGER;

	if ( minLength > 0 || maxLength < window.Number.MAX_SAFE_INTEGER ) {
		if ( stringFieldVal.length < minLength ) {
			field.setCustomValidity( `Value is too short: minimum length is ${ minLength }` );
		} else if ( stringFieldVal.length > maxLength ) {
			field.setCustomValidity( `Value is too long: maximum length is ${ maxLength }` );
		}
		if ( tooltip ) {
			tooltip.innerHTML = field.validationMessage;
		}
	}

	// NOTE: Disabled until isInRange fixed.
	// if ( ( minLength && minLength > 0 ) || ( maxLength && maxLength > 0 ) ) {
	// 	const lengthValidation = _validation.isInRange(
	// 		stringFieldVal.length,
	// 		minLength,
	// 		maxLength
	// 	);

	// 	if ( minLength > 0 && lengthValidation < 0 ) {
	// 		msg = `Value is too short: minimum length is ${ minLength }`;
	// 		field.setCustomValidity( msg );
	// 	} else if ( maxLength < window.Number.MAX_SAFE_INTEGER && lengthValidation > 0 ) {
	// 		msg = `Value is too long: maximum length is ${ maxLength }`;
	// 		field.setCustomValidity( msg );
	// 	}
	// }

	return field.validity.valid;
};

/**
 * Validate all fields within a form.
 *
 * @param {string|HTMLFormElement} form A selector string or DOM element.
 * @return {Array} All fields and their validity.
 */
export const validateAllFields = ( form ) => {
	const fields = [];

	getAllFormFields( form ).forEach( ( el ) => {
		fields.push( {
			field: el,
			isValid: validateField( el ),
		} );
	} );

	return fields;
};
