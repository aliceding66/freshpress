import { isNumber } from '../modules/_validation';

/**
 * Simple equivalent of PHP's str_getcsv().
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {string} enclosure
 * @return {*[]} Array of data from CSV string.
 */
export function strGetCsv( input, delimiter = ',', enclosure = '"' ) {
	const enclosedMap = [];
	const enclosedRegex = new RegExp( `${ enclosure }[^${ enclosure };]+${ enclosure }`, 'g' );
	const enclosedRegexResult = input.match( enclosedRegex );
	if ( enclosedRegexResult && enclosedRegexResult.length > 0 ) {
		enclosedRegexResult.forEach( ( enclosedString, enclosedIndex ) => {
			enclosedIndex = `++__++${ enclosedIndex }++__++`;
			enclosedMap[ enclosedIndex ] = enclosedString;
			input = input.replace( enclosedString, enclosedIndex );
		} );
	}

	return input.split( delimiter ).map( ( chunk ) => {
		Object.entries( enclosedMap ).forEach( ( [ key, value ] ) => {
			chunk = chunk.replace( key, value );
		} );

		return chunk;
	} );
}

/**
 * Equivalent of PHP's fp_parse_csv().
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {boolean} trimFields
 * @return {{headers: *[], data: *[]}} Return formatted CSV data.
 */
export function fpParseCsv( input, delimiter = ',', trimFields = true ) {
	input = input.replace( /,"[^"]*R[^"]*"/g, function ( fields ) {
		const replacement = fields[ 0 ].split( /RR/ );
		const replaced = replacement.join( '!n!!n!' );
		return replaced.replace( /R/, '!n!' );
	} );

	// prettier-ignore
	const rows = input.split( "\n" );

	const output = {
		headers: rows.shift().split( delimiter ),
		data: [],
	};

	rows.forEach( ( row ) => {
		row = row.replace( /!n!/g, '\n' );
		// let values = row.split( delimiter );
		let values = strGetCsv( row, delimiter );
		if ( values.length > 0 ) {
			if ( trimFields ) {
				values = values.map( ( value ) => value.trim() );
			}

			const outputDataHeaders = output.headers.map( ( header ) => header.toLowerCase() );
			const outputData = new Map();
			values.forEach( ( value, valueIndex ) => {
				if ( outputDataHeaders[ valueIndex ] !== undefined ) {
					outputData.set( outputDataHeaders[ valueIndex ], value );
				}
			} );
			output.data.push( outputData );
		}
	} );

	return output;
}

/**
 * Equivalent of PHP's fp_format_vartype().
 *
 * @param {string} string
 * @return {*} Return value in proper type.
 */
export function fpFormatVartype( string ) {
	// Check for boolean.
	const boolArray = [ 'true', 'false', '1', '0', 'yes', 'no' ];
	if ( typeof string === 'string' && boolArray.indexOf( string.toLowerCase() ) >= 0 ) {
		return (
			string.toLowerCase() === 'true' ||
			string.toLowerCase() === '1' ||
			string.toLowerCase() === 'yes'
		);
	}

	// Check if numeric.
	if ( isNumber( string ) ) {
		return Number( string );
	}

	// ...or return unmodified string.
	return string;
}
