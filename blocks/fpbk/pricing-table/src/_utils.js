import { strGetCsv } from 'scripts/helpers/_csv';
import { toTitleCase } from 'scripts/helpers/_strings';

export const fpFormatPricingData = ( csvText ) => {
	const csv = fpParsePricingCsv( csvText );
	const ret = {};

	csv.data.forEach( ( row ) => {
		let category = '';

		row.forEach( ( value, key ) => {
			if ( 'category' === key ) {
				category = value;
				ret[ category ] = {};
				return;
			}

			if ( ! ret[ key ] ) {
				ret[ key ] = {};
			}

			if ( 'top_features' === category || 'addons' === category ) {
				const features = value.split( /(?:\r?\n){2}/ );

				features.forEach( ( feature ) => {
					const _feature = feature.split( '\n' );
					const output = {
						feature: '',
						bold: false,
						tooltip: false,
					};

					_feature.forEach( ( line ) => {
						if ( line.startsWith( 'bold: ' ) ) {
							output.bold = line.split( 'bold: ' )[ 1 ];
						} else if ( line.startsWith( 'tooltip: ' ) ) {
							output.tooltip = line.split( 'tooltip: ' )[ 1 ];
						} else if ( line.length > 0 ) {
							output.feature = line;
						}
					} );

					ret[ key ][ category ] = output;
				} );
			} else if ( 'custom_pricing' === category ) {
				ret[ key ][ category ] = 'TRUE' === value;
			} else {
				ret[ key ][ category ] = value;
			}
		} );
	} );

	return ret;
};

/**
 * Parse CSV for the Pricing Table data specifically.
 *
 * @param {string} input
 * @param {string} delimiter
 * @param {boolean} trimFields
 * @param {string} mostPopularPlan
 * @return {{headers: *[], data: *[]}} Return formatted CSV data.
 */
export function fpParsePricingCsv(
	input,
	delimiter = ',',
	trimFields = true,
	mostPopularPlan = 'plus'
) {
	input = input.replace( /"[^"]*[^"]*"/g, function ( fields ) {
		const replacement = fields.split( /\n\n/ );
		replacement.forEach( ( line, i ) => {
			replacement[ i ] = line.replace( /\r?\n/g, '!n!' );
		} );
		const replaced = replacement.join( '!n!!n!' );
		return replaced.replace( /\r/, '!n!' );
	} );

	// prettier-ignore
	const rows = input.split( "\n" );
	const headers = rows
		.shift()
		.split( delimiter )
		.map( ( header ) => header.replace( /\s/g, '' ) );
	const parsedPlans = {};

	headers.forEach( ( header ) => {
		if ( header !== 'category' ) {
			parsedPlans[ header ] = {};
			parsedPlans[ header ].name = toTitleCase( header );
			parsedPlans[ header ].most_popular = mostPopularPlan === header;
		}
	} );

	rows.forEach( ( row ) => {
		row = row.replace( /!n!/g, '\n' );
		let values = strGetCsv( row, delimiter );
		if ( values.length > 0 ) {
			if ( trimFields ) {
				values = values.map( ( value ) => value.trim() );
			}

			let section = '';

			values.forEach( ( value, valueIndex ) => {
				if ( 0 === valueIndex ) {
					section = value;
					return;
				}

				value = value.replace( /\"/g, '' );

				if ( 'addons' === section || 'top_features' === section ) {
					value = value.split( /\n\n/ );
					const valueObject = [];
					value.forEach( ( v, idx ) => {
						const tmp = v.split( /\n/g );
						valueObject[ idx ] = {
							feature: '',
							bold: false,
							tooltip: '',
						};
						tmp.forEach( ( t ) => {
							if ( t.startsWith( 'bold:' ) && t.endsWith( 'true' ) ) {
								valueObject[ idx ].bold = true;
							} else if ( t.startsWith( 'tooltip:' ) ) {
								valueObject[ idx ].tooltip = t.split( 'tooltip: ' )[ 1 ];
							} else {
								valueObject[ idx ].feature = t;
							}
						} );
					} );
					value = valueObject;
				} else if ( 'custom_pricing' === section ) {
					value = 'true' === value.toLowerCase();
				} else if ( 'price_monthly' === section || 'price_yearly' === section ) {
					value = fpFormatPrice( value );
				}

				parsedPlans[ headers[ valueIndex ] ][ section ] = value;
			} );
		}
	} );

	return parsedPlans;
}

export const fpFormatPrice = ( price ) => {
	if ( price ) {
		price = parseFloat( price ).toFixed( 2 );
		const parts = price.toString().split( '.' );
		return {
			whole: parts[ 0 ].replace( '.', '' ),
			decimal: parts[ 1 ],
		};
	}

	// Fallback if invalid input.
	return {
		whole: '00',
		decimal: '00',
	};
};

export const formatPriceSuffixes = ( attributes ) => {
	const suffixes = {};
	const perMonthSuffix = '/mo';
	const perYearSuffix = '/yr';
	const {
		price_monthly_suffix: priceMonthlySuffix = 'mo',
		price_yearly_suffix: priceYearlySuffix = 'mo',
		promo_price_monthly_suffix: promoPriceMonthlySuffix = 'mo',
		promo_price_yearly_suffix: promoPriceYearlySuffix = 'mo',
	} = attributes;

	suffixes.price_monthly_suffix = 'mo' === priceMonthlySuffix ? perMonthSuffix : perYearSuffix;
	suffixes.price_yearly_suffix = 'mo' === priceYearlySuffix ? perMonthSuffix : perYearSuffix;
	suffixes.promo_price_monthly_suffix =
		'mo' === promoPriceMonthlySuffix ? perMonthSuffix : perYearSuffix;
	suffixes.promo_price_yearly_suffix =
		'mo' === promoPriceYearlySuffix ? perMonthSuffix : perYearSuffix;

	return suffixes;
};

export const extractPromoDataForPlan = ( plan, attributes ) => {
	return {
		exclude_plan: attributes[ `promo_${ plan }_exclude_plan` ],
		promo_custom_pricing: attributes[ `promo_${ plan }_custom_pricing` ],
		promo_price_monthly: fpFormatPrice( attributes[ `promo_${ plan }_monthly_price` ] ),
		promo_price_monthly_include_asterisk:
			attributes[ `promo_${ plan }_include_monthly_price_asterisk` ],
		promo_price_monthly_subtext: attributes[ `promo_${ plan }_monthly_price_subtext` ],
		promo_price_yearly: fpFormatPrice( attributes[ `promo_${ plan }_yearly_price` ] ),
		promo_price_yearly_include_asterisk:
			attributes[ `promo_${ plan }_include_yearly_price_asterisk` ],
		promo_price_yearly_subtext: attributes[ `promo_${ plan }_yearly_price_subtext` ],
		cta: attributes[ `links_${ plan }_cta` ],
		cta_style: attributes[ `links_${ plan }_cta_style` ],
		promo_cta: attributes[ `promo_${ plan }_links_cta` ],
		promo_cta_style: attributes[ `promo_${ plan }_links_cta_style` ],
	};
};
