/**
 * Helper functions for FB Tools blocks.
 */
export const emptyPrice = '$0.00';
export const emptyPercent = '0.00%';
export const emptyNumber = '0';
export const iconHasErrorClass = 'freshpress-tools--icon--has-error';
export const inputHasErrorClass = 'freshpress-tools--input-field--has-error';

/**
 * @param {any} number
 * @param {boolean} showOneDecimal
 * @return {number} 2 decimalsToShow rounded number.
 */
export const formatRounded = ( number, showOneDecimal = false ) => {
	const value = Math.round( number * 100 ) / 100;
	if ( showOneDecimal ) {
		const stringValue = String( value );

		if ( /\.\d{2,}/.test( stringValue ) ) {
			return Number( stringValue.substring( 0, stringValue.length - 1 ) );
		}
	}

	return value;
};

/**
 * @param {any} price
 * @return {string} Formatted price in dollars value.
 */
export const formatPrice = ( price ) => {
	price = String( price );
	return price.trim() !== '' && price.trim() !== '$' ? `$${ price.replace( /\$/g, '' ) }` : '';
};

/**
 * @param {any} percent
 * @return {string} Formatted percent value.
 */
export const formatPercent = ( percent ) => {
	percent = String( percent );
	return percent.trim() !== '' && percent.trim() !== '%'
		? `${ percent.replace( /%/g, '' ) }%`
		: '';
};
