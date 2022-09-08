import { fpParseCsv, fpFormatVartype } from 'scripts/helpers/_csv';

const featureColsFilling = [ 1, 2, 3, 4 ];

export const fpFormatComparisonData = ( csvText, icons ) => {
	const csv = fpParseCsv( csvText );
	const csvData = csv.data;
	const data = [];
	let currentSection = { rows: [], not_last_section: true, feature_col_ids: featureColsFilling };
	let previousSectionTitle = '';

	csvData.forEach( ( row ) => {
		const currentSectionTitle = row.get( 'category' );
		const bullet = row.get( 'bullet' );

		const featureValues = [];
		let infoTooltipHtml = null;
		row.forEach( ( value, key ) => {
			if ( key !== 'category' && key !== 'bullet' && key !== 'tooltip' ) {
				const rowValue = fpFormatVartype( value );
				if ( rowValue === true ) {
					featureValues.push( { feature_value: icons.checkmark, row_key: 'row_key' } );
				} else if ( rowValue === false ) {
					featureValues.push( { feature_value: null, row_key: 'row_key' } );
				} else {
					featureValues.push( { feature_value: rowValue, row_key: 'row_key' } );
				}
			} else if ( key === 'tooltip' ) {
				let tooltipValue = fpFormatVartype( value );
				if ( tooltipValue && typeof tooltipValue === 'string' ) {
					tooltipValue = tooltipValue
						.replace( /"/g, '\\"' )
						.replace( /\\"/g, '' )
						.replace( /"\\/g, '' );

					infoTooltipHtml = `
						<div class="info-tooltip__button p-0 border-0" data-toggle="tooltip" data-placement="top" title="${ tooltipValue }">
							${ icons.info }
						</div>
						`;
				}
			}
		} );

		if ( currentSectionTitle !== previousSectionTitle ) {
			if ( previousSectionTitle !== '' ) {
				data.push( currentSection );
				currentSection = {
					rows: [],
					not_last_section: true,
					feature_col_ids: featureColsFilling,
				};
			}

			currentSection.section_title = currentSectionTitle;
			previousSectionTitle = currentSectionTitle;
		}

		currentSection.rows.push( {
			features: bullet,
			feature_values: featureValues,
			info_tooltip_html: infoTooltipHtml,
		} );
	} );

	data.push( currentSection );

	return data;
};
