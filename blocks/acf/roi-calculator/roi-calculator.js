/**
 * Roi Calculator.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import 'bootstrap/js/dist/tooltip';

let data = {};

const initRoiCalculator = ( roiCalculator ) => {
	// create fancy selects.
	$( '.roi-calculator__select' ).each( function () {
		const parent = $( this ).parent();
		const fancySelect = $( '<div class="roi-calculator__fancy-select"></div>' );
		fancySelect.html( $( this )[ 0 ].options[ $( this )[ 0 ].selectedIndex ].innerHTML );
		parent.append( fancySelect );
		const options = $( this ).find( 'option' );
		const fancySelectOptions = $( '<div class="roi-calculator__fancy-select__options"></div>' );
		options.each( function () {
			fancySelectOptions.append( '<span>' + $( this ).text() + '</span>' );
		} );
		parent.append( fancySelectOptions );
	} );
	// add click hooks for new selects.
	$( '.roi-calculator__fancy-select' ).on( 'click', function () {
		closeAllSelects( $( this ).next() );
		$( this ).next().toggle();
	} );

	// handle the change event for select inputs
	$( '.roi-calculator__left-column__input select' ).on( 'change', () => calculate() );

	$( '.roi-calculator__fancy-select__options span' ).on( 'click', function () {
		// update real select.
		$( this ).parent().prevAll( 'select' )[ 0 ].selectedIndex = $( this ).prevAll().length;
		// save original text if first switch
		if ( ! $( this ).parent().prev().hasClass( 'active' ) ) {
			$( this ).parent().prev().data( 'original-text', $( this ).parent().prev().text() );
		}
		// update fake select.
		$( this ).parent().prev().addClass( 'active' ).text( $( this ).text() );
		// trigger change event for select
		$( this ).parent().prevAll( 'select' ).trigger( 'change' );
		// close all selects.
		closeAllSelects();
	} );
	function closeAllSelects( avoid = null ) {
		$( '.roi-calculator__fancy-select__options' ).not( avoid ).hide();
	}
	document.addEventListener( 'click', function ( e ) {
		if (
			! $( e.target ).hasClass( '.roi-calculator__fancy-select' ) &&
			! $( e.target ).closest( '.roi-calculator__fancy-select' ).length
		) {
			closeAllSelects( null );
		}
	} );
	// set up initial opening values.
	$( '.roi-calculator__value' ).html( '<span> - - </span>' );
	$( '#roi-calculator-reset' ).on( 'click', () => reset() );
	$( '#roi-calculator-reset-mobile' ).on( 'click', () => {
		reset();
		hideMobileReport();
	} );

	$( '#mobile-report-btn' ).on( 'click', () => showMobileReport() );
	$( '#close-mobile-report-btn' ).on( 'click', () => hideMobileReport() );

	// handle on input change
	$( '.roi-calculator__left-column__input input' ).each( function () {
		$( this ).on(
			'input',
			// Debounce the function to avoid frequent calculation as it requires network call
			debounce( () => {
				$( this ).addClass( 'dirty' );
				if ( $( this ).val() ) {
					calculate();
				} else {
					clearData();
					$( '#generate-report-btn' ).prop( 'disabled', true );
					$( '.roi-calculator__right-column .roi-calculator__tooltip' ).addClass(
						'd-none'
					);
				}
			}, 250 )
		);
	} );
	$( roiCalculator ).find( '.roi-calculator__tooltip' ).tooltip();
};

const calculate = () => {
	// fetch data and apply

	const inputVals = {
		client_count: $( '#client_count' ).val(),
		average_revenue: $( '#average_revenue' ).val(),
		industry: mapIndustry( $( '#industry' ).val() ),
		software: mapSoftware( $( '#software' ).val() ),
		staff_count: $( '#staff_count' ).val(),
		cost_hour: $( '#cost_hour' ).val(),
		nonce: $( '#client_count' ).closest( '.roi-calculator' ).data( 'nonce' ),
		_wpnonce: $( '#client_count' ).closest( '.roi-calculator' ).data( 'nonce-admin' ),
	};
	if ( inputVals.industry && inputVals.software ) {
		$.ajax( {
			url: '/wp-json/roi-calc/roi-calculate',
			type: 'POST',
			dataType: 'json',
			data: inputVals,
			success( response ) {
				if ( ! response ) {
					clearData();
					return false;
				}

				data = JSON.parse( response );

				checkAssumptions( data );

				$( '#yearly-roi, #yearly-roi-mobile' ).text( data.roi + '%' );
				$( '#hours-month' ).text( data.time_saved + 'h' );

				updateTooltip(
					$( '#yearly-roi-mobile' ),
					'Your ROI with a Freshbooks Subscription is ' + data.roi + '%!'
				);

				updateTooltip(
					$( '#hours-month' ),
					'Based on the inputs given, Freshbooks can save you ' +
						data.time_saved +
						' hours every month compared to your current accounting solution. That is ' +
						data.time_saved * 12 +
						' hours every year!!'
				);

				$( '#faster-payments' ).text( data.payments_speed + 'x' );
				updateTooltip(
					$( '#faster-payments' ),
					'You are likely to receive your online payments ' +
						data.payments_speed +
						' times faster than your current payment processor.'
				);

				$( '#more-clients' ).text( data.new_clients );
				updateTooltip(
					$( '#more-clients' ),
					'Freshbooks would end up freeing time and bandwidth that can help you serve ' +
						data.new_clients +
						' clients more'
				);

				$( '#dollars-month' ).text( '$' + kFormatter( data.saved_per_month ) );
				updateTooltip(
					$( '#dollars-month' ),
					'This means a potential earnings of $' +
						data.saved_per_month +
						' every month. Or $' +
						data.saved_per_month * 12 +
						' every year!'
				);

				$( '#transaction-savings' ).text( '$' + kFormatter( data.transaction_savings ) );
				updateTooltip(
					$( '#transaction-savings' ),
					'You could save up to $' +
						data.transaction_savings +
						' in payment transaction fees every year.'
				);

				$( '.roi-calculator__right-column .roi-calculator__tooltip' ).removeClass(
					'd-none'
				);
				$( '#generate-report-btn' ).prop( 'disabled', false );
				$( '#mobile-report-btn' ).prop( 'disabled', false );
			},
		} );
	}
};

const updateTooltip = ( target, text ) => {
	target.parent().find( '.roi-calculator__tooltip' ).attr( 'data-original-title', text );
};

const checkAssumptions = ( dataRef ) => {
	$( '#payment-speed-col' ).addClass( 'd-none' );

	if ( dataRef.time_saved < 13 ) {
		$( '#time-saved-col' ).addClass( 'd-none' );
	} else {
		$( '#time-saved-col' ).removeClass( 'd-none' );
	}
	if ( dataRef.transaction_savings < 325 ) {
		$( '#transaction-savings-col' ).addClass( 'd-none' );
	} else {
		$( '#transaction-savings-col' ).removeClass( 'd-none' );
	}
	if ( dataRef.saved_per_month < 100 ) {
		$( '#more-clients-col' ).addClass( 'd-none' );
	} else {
		$( '#more-clients-col' ).removeClass( 'd-none' );
	}
	if ( dataRef.payment_speed < 1.1 ) {
		$( '#payment-speed-col' ).addClass( 'd-none' );
	} else {
		$( '#payment-speed-col' ).removeClass( 'd-none' );
	}
	if ( dataRef.new_clients < 1 ) {
		$( '#more-clients-col' ).addClass( 'd-none' );
	} else {
		$( '#more-clients-col' ).removeClass( 'd-none' );
	}
};

const clearData = () => {
	$( '.roi-calculator__value' ).html( '<span> -&nbsp;- </span>' );

	$( '#transaction-savings-col' ).addClass( 'd-none' );
	$( '#more-clients-col' ).addClass( 'd-none' );
	$( '#mobile-report-btn' ).prop( 'disabled', true );
};
const reset = () => {
	$( '.roi-calculator__value' ).html( '<span> -&nbsp;- </span>' );
	$(
		'.roi-calculator__left-column__input select, .roi-calculator__left-column__input input'
	).val( null );
	$( '.roi-calculator__fancy-select.active' ).each( function () {
		$( this ).removeClass( 'active' ).text( $( this ).data( 'original-text' ) );
	} );

	$( '#transaction-savings-col' ).addClass( 'd-none' );
	$( '#more-clients-col' ).addClass( 'd-none' );

	// reset PDF form
	$( '.form-header' ).removeClass( 'd-none' );
	$( '#roi-calculator-form' ).removeClass( 'd-none' );
	$( '#roi-calculator-success' ).removeClass( 'd-flex' ).addClass( 'd-none' );
	$( '#generate-report-btn' ).text( 'Get a Copy of the ROI Report' );
	$( '#generate-report-btn' ).prop( 'disabled', true );
};

const showMobileReport = () => {
	window.scrollTo( 0, 0 );
	$( '.roi-calculator__left-column' ).addClass( 'd-none' );
	$( '.roi-calculator__right-column' ).removeClass( 'd-none' );
};

const hideMobileReport = () => {
	$( '.roi-calculator__left-column' ).removeClass( 'd-none' );
	$( '.roi-calculator__right-column' ).addClass( 'd-none' );
};

const generateReport = () => {
	$( '#error-message' ).addClass( 'd-none' );
	$( '#generate-report-btn' ).prop( 'disabled', true );
	$( '#generate-report-btn' ).text( 'Generating PDF...' );

	$.ajax( {
		url: '/wp-json/roi-calc/generate-report',
		type: 'POST',
		dataType: 'json',
		data: {
			nonce: $( '#client_count' ).closest( '.roi-calculator' ).data( 'nonce' ),
			_wpnonce: $( '#client_count' ).closest( '.roi-calculator' ).data( 'nonce-admin' ),
			values: {
				calculated: data,
				inputs: {
					client_count: $( '#client_count' ).val(),
					average_revenue: $( '#average_revenue' ).val(),
					industry: $( '#industry' ).val(),
					software: $( '#software' ).val(),
					staff_count: $( '#staff_count' ).val(),
					hourly_rate: $( '#cost_hour' ).val(),
				},
				user_data: {
					first_name: $( '#first_name' ).val(),
					last_name: $( '#last_name' ).val(),
					email: $( '#email' ).val(),
					phone_number: $( '#phone_number' ).val(),
					consent: $( '#consent' ).is( ':checked' ),
				},
			},
		},
		success: ( res ) => {
			if ( res.success ) {
				$( '.form-header' ).addClass( 'd-none' );
				$( '#roi-calculator-form' ).addClass( 'd-none' );
				$( '#roi-calculator-success' ).addClass( 'd-flex' ).removeClass( 'd-none' );
				$( '#roi-calculator-reset-mobile' ).addClass( 'd-none' );
			} else {
				$( '#error-message' )
					.text( 'There was an error connecting to the server. Please Try Again Later.' )
					.removeClass( 'd-none' );
				$( '#generate-report-btn' ).text( 'Get a Copy of the ROI Report' );
				$( '#generate-report-btn' ).prop( 'disabled', false );
			}
		},
	} );
};

$( '#roi-calculator-form' ).on( 'submit', function () {
	const form = document.querySelector( '#roi-calculator-form' );
	const email = document.querySelector( '#email' );
	const phone = document.querySelector( '#phone_number' );

	if ( form.checkValidity() === true ) {
		if ( isEmail( email.value ) ) {
			if ( isPhone( phone.value ) ) {
				generateReport();
			} else {
				$( '#error-message' )
					.text( 'Please provide a valid phone number' )
					.removeClass( 'd-none' );
			}
		}
	}
} );

// Helpers
function isPhone( phone ) {
	const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return regex.test( phone );
}

function isEmail( email ) {
	const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test( email );
}

function mapSoftware( software ) {
	switch ( software ) {
		case 'Wave' || 'Sage':
			return 'Xero';
		case 'Excel' || 'Pen and Paper':
			return 'Others';
		default:
			return software;
	}
}

function mapIndustry( industry ) {
	switch ( industry ) {
		case 'Marketing':
			return 'Creative';
		case 'Construction':
			return 'Trades';
		default:
			return industry;
	}
}

function kFormatter( num ) {
	return Math.abs( num ) > 999
		? Math.sign( num ) * ( Math.abs( num ) / 1000 ).toFixed( 1 ) + 'k'
		: Math.sign( num ) * Math.abs( num );
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
function debounce( func, wait ) {
	let timeout;

	return function executedFunction( ...args ) {
		const later = () => {
			clearTimeout( timeout );
			func( ...args );
		};

		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
	};
}

initBlock( '.roi-calculator', initRoiCalculator );
