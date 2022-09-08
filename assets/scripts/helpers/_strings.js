/**
 * Helper functions for dealing with strings.
 */

import dashify from 'dashify';

/**
 * Convert a string to camelCase.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted outputString.
 */
export const toCamelCase = ( input ) => {
	if ( typeof input === 'string' && input.length ) {
		return toKebabCase( input )
			.split( '-' )
			.map( ( part, index ) =>
				index === 0 ? part.toLowerCase() : toTitleCase( part, { forceLower: true } )
			)
			.join( '' );
	}

	return input;
};

/**
 * Convert a string to kebab-case.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted output-string.
 */
export const toKebabCase = ( input ) => {
	if ( typeof input === 'string' && input.length ) {
		return dashify( input, { condense: true } );
	}

	return input;
};

/**
 * Convert a string to PascalCase.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted OutputString.
 */
export const toPascalCase = ( input ) => {
	if ( typeof input === 'string' && input.length ) {
		return toKebabCase( input )
			.split( '-' )
			.map( ( part ) => toTitleCase( part, { forceLower: true } ) )
			.join( '' );
	}

	return input;
};

/**
 * Convert a string to snake_case.
 *
 * @param {string} input String to change case of.
 * @return {string} The converted output_string.
 */
export const toSnakeCase = ( input ) => {
	if ( typeof input === 'string' && input.length ) {
		return toKebabCase( input ).split( '-' ).join( '_' );
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
export const toTitleCase = ( input, options = {} ) => {
	if ( typeof input === 'string' && input.length ) {
		return input
			.split( ' ' )
			.map( ( part ) => {
				if ( options.exceptions instanceof RegExp && options.exceptions.test( part ) ) {
					return part.toLowerCase();
				}
				const firstChar = part.charAt( 0 ).toUpperCase();
				const otherChars = options.forceLower
					? part.slice( 1 ).toLowerCase()
					: part.slice( 1 );

				return `${ firstChar }${ otherChars }`;
			} )
			.join( ' ' );
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
export const convertCase = ( input, format, options = {} ) => {
	if ( ! input || input.length === 0 ) {
		return input;
	}

	switch ( format ) {
		case 'camel':
			return toCamelCase( input );
		case 'kebab':
			return toKebabCase( input );
		case 'lower':
			return input.toLowerCase();
		case 'pascal':
			return toPascalCase( input );
		case 'snake':
			return toSnakeCase( input );
		case 'title':
			return toTitleCase( input, options );
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
export const trimChar = ( string, char = ' ' ) => {
	if ( typeof string !== 'string' && typeof char !== 'string' && char.length !== 1 ) {
		return string;
	}

	let start = 0;
	let end = string.length;

	while ( start < end && string[ start ] === char ) {
		++start;
	}

	while ( end > start && string[ end - 1 ] === char ) {
		--end;
	}

	return start > 0 || end < string.length ? string.substring( start, end ) : string;
};
