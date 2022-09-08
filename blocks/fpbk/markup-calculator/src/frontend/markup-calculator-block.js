/**
 * Markup Calculator.
 */
import { __ } from '@wordpress/i18n';
import { initBlock } from 'scripts/helpers/_blocks';
import {
	formatPrice,
	formatPercent,
	formatRounded,
	iconHasErrorClass,
	inputHasErrorClass,
} from 'scripts/helpers/_fbtools';

const TYPE_PRICE = 'price';
const TYPE_PERCENT = 'percent';
const tooltipClass = 'markup-calculator--tooltip';

const initMarkupCalculator = ( markupCalculator ) => {
	const getField = ( fieldName, type ) => ( {
		type,
		name: fieldName.toLowerCase(),
		input: markupCalculator.querySelector( `#fbtoolsMc${ fieldName }` ),
		icon: markupCalculator.querySelector( `#fbtoolsMcIcon${ fieldName }` ),
		tooltip: markupCalculator.querySelector( `#fbtoolsMcTooltip${ fieldName }` ),
		tooltipButton: markupCalculator.querySelector( `#fbtoolsMcTooltipButton${ fieldName }` ),
		error: markupCalculator.querySelector( `#fbtoolsMcError${ fieldName }` ),
	} );

	const fields = [
		getField( 'Cost', TYPE_PRICE ),
		getField( 'Markup', TYPE_PERCENT ),
		getField( 'Margin', TYPE_PERCENT ),
		getField( 'Revenue', TYPE_PRICE ),
		getField( 'Profit', TYPE_PRICE ),
	];
	const refreshButton = markupCalculator.querySelector( '#fbtoolsMcRefresh' );
	const calculatorAnchor = document.querySelector( '#calculator' );

	let lastEditedFields = [];

	const attachFieldListeners = ( field ) => {
		field.input.addEventListener( 'change', () => {
			handleFieldUpdate( field );
		} );

		field.input.addEventListener( 'input', () => {
			handleFieldUpdate( field );
		} );

		document.addEventListener( 'click', ( event ) => {
			if (
				event.target?.classList &&
				! event.target.classList.contains( tooltipClass ) &&
				! event.target.classList.contains( 'markup-calculator--icon-point-mask' )
			) {
				hideAllTooltips();
			}
		} );

		field.tooltipButton.addEventListener( 'click', () => {
			toggleTooltip( field );
		} );
	};

	const toggleTooltip = ( field ) => {
		const showTooltip = field.tooltip.classList.contains( 'd-none' );
		hideAllTooltips();

		if ( showTooltip ) {
			field.tooltip.classList.remove( 'd-none' );
		}
	};

	const hideAllTooltips = () => {
		markupCalculator.querySelectorAll( `.${ tooltipClass }` ).forEach( ( tooltip ) => {
			tooltip.classList.add( 'd-none' );
		} );
	};

	const handleFieldUpdate = ( field ) => {
		switch ( field.type ) {
			case TYPE_PRICE:
				field.input.value = formatPrice( field.input.value );
				break;
			case TYPE_PERCENT:
				field.input.value = formatPercent( field.input.value );
				break;
		}

		handleLastEditedField( field );
		validateField( field );
		calculate();
	};

	const handleLastEditedField = ( field ) => {
		if ( ! lastEditedFields.includes( field.name ) ) {
			// 'markup' + 'margin' can't be calculated.
			if (
				( field.name === 'markup' && lastEditedFields.includes( 'margin' ) ) ||
				( field.name === 'margin' && lastEditedFields.includes( 'markup' ) )
			) {
				lastEditedFields = lastEditedFields.filter(
					( lastEditedField ) =>
						( field.name === 'markup' && lastEditedField !== 'margin' ) ||
						( field.name === 'margin' && lastEditedField !== 'markup' )
				);
			}

			lastEditedFields.push( field.name );
			// field.tooltipButton.classList.remove( 'd-none' );

			if ( lastEditedFields.length > 2 ) {
				lastEditedFields = lastEditedFields.slice( -2 );
			}

			fields.forEach( ( toCheckField ) => {
				if ( lastEditedFields.includes( toCheckField.name ) ) {
					toCheckField.tooltipButton.classList.remove( 'd-none' );
				} else {
					toCheckField.tooltip.classList.add( 'd-none' );
					toCheckField.tooltipButton.classList.add( 'd-none' );
				}
			} );
		}
	};

	const validateField = ( field, quiet = false ) => {
		let inputRawValue = '';

		switch ( field.type ) {
			case TYPE_PRICE:
				inputRawValue = field.input.value.substring( 1 );
				break;
			case TYPE_PERCENT:
				inputRawValue = field.input.value.substring( 0, field.input.value.length - 1 );
				break;
		}

		let errorMessage = '';
		if (
			inputRawValue === '' ||
			( inputRawValue?.length > 0 && isNaN( Number( inputRawValue ) ) )
		) {
			errorMessage = __( 'Invalid entry', 'freshpress-website' );
		}

		if ( ! quiet ) {
			if ( errorMessage !== '' ) {
				field.input.classList.add( inputHasErrorClass );
				field.icon.classList.add( iconHasErrorClass );
				field.tooltipButton.classList.add( iconHasErrorClass );
				field.error.innerText = errorMessage;
			} else {
				field.input.classList.remove( inputHasErrorClass );
				field.icon.classList.remove( iconHasErrorClass );
				field.tooltipButton.classList.remove( iconHasErrorClass );
				field.error.innerText = '';
			}
		}

		return errorMessage === '';
	};

	const calculate = () => {
		if (
			lastEditedFields.length === 2 &&
			lastEditedFields.filter(
				( fieldName ) =>
					validateField(
						fields.find( ( field ) => field.name === fieldName ),
						true
					) !== true
			).length === 0
		) {
			const values = {};
			fields.forEach( ( field ) => {
				if ( field.type === TYPE_PERCENT ) {
					values[ field.name ] = Number(
						field.input.value.substring( 0, field.input.value.length - 1 ) / 100
					);
				} else {
					values[ field.name ] = Number( field.input.value.substring( 1 ) );
				}
			} );

			const newValues = {};

			// Only 'markup' + 'margin' are not calculated.
			if ( lastEditedFields.includes( 'cost' ) && lastEditedFields.includes( 'markup' ) ) {
				newValues.revenue = values.cost * ( 1 + values.markup );
				newValues.profit = newValues.revenue - values.cost;
				newValues.margin = newValues.profit / newValues.revenue;
			} else if (
				lastEditedFields.includes( 'cost' ) &&
				lastEditedFields.includes( 'margin' )
			) {
				newValues.markup = 1 / ( 1 - values.margin ) - 1;
				newValues.revenue = values.cost * ( 1 + newValues.markup );
				newValues.profit = newValues.revenue - values.cost;
			} else if (
				lastEditedFields.includes( 'cost' ) &&
				lastEditedFields.includes( 'revenue' )
			) {
				newValues.profit = values.revenue - values.cost;
				newValues.margin = newValues.profit / values.revenue;
				newValues.markup = newValues.profit / values.cost;
			} else if (
				lastEditedFields.includes( 'cost' ) &&
				lastEditedFields.includes( 'profit' )
			) {
				newValues.revenue = values.profit + values.cost;
				newValues.margin = values.profit / newValues.revenue;
				newValues.markup = values.profit / values.cost;
			} else if (
				lastEditedFields.includes( 'markup' ) &&
				lastEditedFields.includes( 'revenue' )
			) {
				newValues.margin = 1 - 1 / ( values.markup + 1 );
				newValues.cost = values.revenue / ( 1 + values.markup );
				newValues.profit = values.revenue - newValues.cost;
			} else if (
				lastEditedFields.includes( 'markup' ) &&
				lastEditedFields.includes( 'profit' )
			) {
				newValues.margin = 1 - 1 / ( values.markup + 1 );
				newValues.cost = values.profit / values.markup;
				newValues.revenue = values.profit + newValues.cost;
			} else if (
				lastEditedFields.includes( 'margin' ) &&
				lastEditedFields.includes( 'revenue' )
			) {
				newValues.markup = 1 / ( 1 - values.margin ) - 1;
				newValues.cost = values.revenue / ( 1 + newValues.markup );
				newValues.profit = values.revenue - newValues.cost;
			} else if (
				lastEditedFields.includes( 'margin' ) &&
				lastEditedFields.includes( 'profit' )
			) {
				newValues.markup = 1 / ( 1 - values.margin ) - 1;
				newValues.cost = values.profit / newValues.markup;
				newValues.revenue = values.profit + newValues.cost;
			} else if (
				lastEditedFields.includes( 'profit' ) &&
				lastEditedFields.includes( 'revenue' )
			) {
				newValues.cost = values.revenue - values.profit;
				newValues.margin = values.profit / values.revenue;
				newValues.markup = values.profit / newValues.cost;
			}

			Object.keys( newValues ).forEach( ( newValueFieldName ) => {
				const newValueField = fields.find( ( field ) => field.name === newValueFieldName );
				if ( newValueField ) {
					if ( newValueField.type === TYPE_PERCENT ) {
						newValueField.input.value = formatPercent(
							formatRounded( newValues[ newValueFieldName ] * 100, true )
						);
					} else if ( newValueField.type === TYPE_PRICE ) {
						newValueField.input.value = formatPrice(
							formatRounded( newValues[ newValueFieldName ] )
						);
					}
				}
			} );
		}
	};

	const clearForm = () => {
		lastEditedFields = [];
		fields.forEach( ( field ) => {
			field.input.value = '';
			field.input.classList.remove( inputHasErrorClass );
			field.icon.classList.remove( iconHasErrorClass );
			field.tooltipButton.classList.remove( iconHasErrorClass );
			field.tooltipButton.classList.add( 'd-none' );
			field.tooltip.classList.add( 'd-none' );
			field.error.innerText = '';
		} );

		fields[ 0 ].input.focus();
		if ( calculatorAnchor ) {
			calculatorAnchor.scrollIntoView( { behavior: 'smooth' } );
		} else {
			fields[ 0 ].scrollIntoView( { behavior: 'smooth' } );
		}
	};

	fields.forEach( ( field ) => {
		attachFieldListeners( field );
	} );

	refreshButton.addEventListener( 'click', clearForm );
};

initBlock( '.markup-calculator', initMarkupCalculator );
