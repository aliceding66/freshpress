/**
 * Validation module.
 */

import _isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import _isPostalCode from 'validator/lib/isPostalCode';
import _isURL from 'validator/lib/isURL';
import isPlainObject from 'is-plain-obj';

const regex = {
	alpha: /^[a-zA-Z ]+$/,
	alphaNumeric: /^[a-zA-Z0-9 ]+$/,
	phoneNumber: /^\+?[0-9\-\s\.\(\)#x]+$/,
};

/**
 * Determines if a string is empty.
 *
 * @param {*} data var to be checked.
 * @param {Object} options Options to allow different interpretations of the data.
 */
export const isEmpty = ( data, options = {} ) => {
	const { allowZero = false, allowSpaces = false } = options;
	const dataType = typeof data;

	if ( dataType === 'undefined' ) {
		return true;
	}

	// Number.
	if ( dataType === 'number' ) {
		return ! ( data || ( data === 0 && allowZero ) );
	}

	// A plain object.
	if ( dataType === 'object' && isPlainObject( data ) ) {
		return Object.keys( data ).length === 0;
	}

	if ( dataType === 'string' && ! allowSpaces ) {
		data = data.trim();
	}

	// For strings and arrays, check length.
	if ( data && data.length === 0 ) {
		return true;
	}

	// All other cases are truthy/falsey.
	return ! data;
};

/**
 * Checks if a given string is alpha (with spaces).
 *
 * @param {string} string String to be checked.
 */
export const isAlpha = ( string ) => {
	if ( ! isEmpty( string ) ) {
		return regex.alpha.test( string );
	}
	return false;
};

/**
 * Checks if a given string is alphanumeric (with spaces).
 *
 * @param {string} string String to be checked.
 */
export const isAlphanumeric = ( string ) => {
	if ( ! isEmpty( string ) ) {
		return regex.alphaNumeric.test( string );
	}
	return false;
};

/**
 * Checks if a given value is numeric.
 *
 * @param {string} string string to be checked.
 */
export const isNumber = ( string ) => {
	if ( ! isEmpty( string ) ) {
		return isNumeric( string );
	}
	return false;
};

/**
 * Checks if a given value is a Postal Code.
 *
 * @param {string} string string to be checked.
 * @param {string} locale the locale to check the string against.
 */
export const isPostalCode = ( string, locale = 'US' ) => {
	if ( ! isEmpty( string ) ) {
		return _isPostalCode( string, locale );
	}
	return false;
};

/**
 * Checks if a given value is a URL.
 *
 * @param {string} url string to be checked.
 */
export const isURL = ( url ) => {
	if ( ! isEmpty( url ) ) {
		return _isURL( url );
	}
	return false;
};

/**
 * Checks if a given email is valid.
 *
 * @param {string} email String to be checked.
 */
export const isEmail = ( email ) => {
	if ( ! isEmpty( email ) ) {
		return _isEmail( email );
	}
	return false;
};

/**
 * Checks if a given phone is valid.
 *
 * @param {string} phone String to be checked.
 */
export const isPhone = ( phone ) => {
	if ( ! isEmpty( phone ) ) {
		return regex.phoneNumber.test( phone );
	}
	return false;
};

/**
 * Checks if a given number is within a range.
 *
 * @param {number} number Number to be checked.
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 */
export const isInRange = ( number, min, max ) => {
	if (
		[ number, min, max ].filter(
			( arg ) => 'number' === typeof arg && ! isEmpty( arg, { allowZero: true } )
		).length === 3
	) {
		return number >= min && number <= max;
	}
	return false;
};

/**
 * Compares data against a given set of patterns.
 *
 * @param {Object} data Entity to be checked.
 * @param {Array} patterns A set of patterns to check the entity against.
 */
export const matchesPatterns = ( data, patterns = [] ) => {
	if ( ! isEmpty( data ) ) {
		return (
			patterns.length &&
			patterns.length === patterns.filter( ( pattern ) => pattern.test( data ) ).length
		);
	}
};
