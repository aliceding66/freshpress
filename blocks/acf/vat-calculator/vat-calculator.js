/**
 * VAT Calculator.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/tab';

const fraction = new Intl.NumberFormat( 'en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
} );

const formatter1 = new Intl.NumberFormat( 'en-US', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
} );

const formatter2 = new Intl.NumberFormat( 'en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
} );

const formatNumber = ( num, flag = true ) => {
	if ( flag ) {
		if ( num % 1 === 0 && num.toString().split( '.' ).length === 1 ) {
			return fraction.format( num );
		} else if (
			num.toString().split( '.' )[ 1 ].length === 1 &&
			num.toString().split( '.' )[ 1 ] !== undefined
		) {
			return formatter1.format( num );
		} else if ( num.toString().split( '.' )[ 1 ] === undefined ) {
			return num;
		}
	} else if ( num % 1 === 0 ) {
		return fraction.format( num );
	}
	return formatter2.format( num );
};

const getParseData = ( e, currency, id ) => {
	let input, operator, rate, vatAmount, total;
	if ( e.target ) {
		input = e.target;
	} else {
		input = e;
	}

	let amount = input.value;

	if (
		( e.key === '.' || e.keyCode === 110 ) &&
		amount.indexOf( '..' ) === -1 &&
		amount.split( '.' )?.length < 3
	)
		return false;

	if (
		( e.key === '0' || e.keyCode === 48 ) &&
		amount.indexOf( '.0' ) !== 0 &&
		amount.split( '.' )[ 1 ]?.indexOf( '00' ) !== undefined &&
		amount.split( '.' )[ 1 ]?.indexOf( '00' ) !== 0 &&
		amount.split( '.' )[ 1 ].split( '' )?.length < 3
	)
		return false;

	amount = amount.replace( /[^0-9.\.]/g, '' );

	if ( id.indexOf( 'add' ) > -1 ) {
		rate = document
			.getElementById( 'vat-add' )
			.getElementsByClassName( 'vat-calculator__select' )[ 0 ].value;
		operator = 'add';
		amount = parseFloat( amount );
		vatAmount = ( parseFloat( rate ) / 100 ) * amount;
		total = amount + vatAmount;
	} else {
		rate = document
			.getElementById( 'vat-remove' )
			.getElementsByClassName( 'vat-calculator__select' )[ 0 ].value;
		operator = 'remove';
		amount = parseFloat( amount );
		vatAmount = ( amount / ( 1 + parseFloat( rate ) / 100 ) ) * ( parseFloat( rate ) / 100 );
		total = amount - vatAmount;
	}

	const vatAmountResut = document.getElementById( `vat-calculator__amount-${ operator }` );
	const totalResut = document.getElementById( `vat-calculator__total-${ operator }` );

	if ( ! isNaN( amount ) ) {
		vatAmountResut.innerHTML = currency + formatNumber( vatAmount, false );
		totalResut.innerHTML = currency + formatNumber( total, false );
		input.value = currency + formatNumber( amount );
	} else {
		const defaultAmount = `<span>${ currency }00.00</span>`;
		vatAmountResut.innerHTML = defaultAmount;
		totalResut.innerHTML = defaultAmount;
		input.value = '';
	}
};

const selectFunction = ( selectOptions ) => {
	selectOptions.forEach( ( option ) => {
		option.addEventListener( 'click', function () {
			const id = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
				'id'
			);
			const mainParent = document.getElementById( id );
			const inputSelect = mainParent.getElementsByClassName( 'vat-calculator__select' )[ 0 ];
			this.parentElement.classList.toggle( 'vat-calculator__select-container_active' );
			const newOptions = mainParent.querySelectorAll( '.vat-calculator__option' );
			if (
				this.classList.contains( 'vat-calculator__option_active' ) &&
				! this.parentElement.classList.contains( 'vat-calculator__select-container_active' )
			) {
				newOptions.forEach( ( element ) => {
					element.style.top = 0;
					element.style.visibility = '';
				} );
			} else if ( this.classList.contains( 'vat-calculator__option_active' ) ) {
				newOptions.forEach( ( element, index ) => {
					element.style.top = index * 100 + '%';
					element.style.visibility = 'visible';
				} );
			} else {
				newOptions.forEach( ( element ) => {
					element.style.top = 0;
					element.style.visibility = '';
					element.classList.remove( 'vat-calculator__option_active' );
				} );
				this.classList.add( 'vat-calculator__option_active' );
				this.parentElement.insertBefore( this, newOptions[ 0 ] );
				inputSelect.value = this.getAttribute( 'data-value' );

				const operator = id.replace( 'vat-', '' );
				const input = document.getElementById( `vat-calculator__input_${ operator }` );
				const currency = input.getAttribute( 'data-currency' );

				getParseData( input, currency, id );
			}
		} );
	} );
};

const vatCalculate = ( e ) => {
	const currency = e.target.getAttribute( 'data-currency' );
	const id = e.target.getAttribute( 'id' );
	getParseData( e, currency, id );
};

const initVatCalculator = ( vatCalculator ) => {
	// init bootstrap Tooltips & Tabs
	$( vatCalculator ).find( '.vat-calculator__button' ).tooltip();
	$( vatCalculator ).find( '#vat-calculator__tabs a' ).tab();

	// Tools togle class
	vatCalculator.querySelectorAll( '.vat-calculator__tools-arrow' )[ 0 ].onclick = ( e ) => {
		if ( window.innerWidth >= 1280 ) {
			e.preventDefault();
		} else {
			const options = vatCalculator.querySelectorAll( '.vat-calculator__tools-options' )[ 0 ];
			options.classList.toggle( 'active' );
		}
	};

	// Custom Select rate
	const selectOptions = vatCalculator.querySelectorAll( '.vat-calculator__option' );
	selectFunction( selectOptions );

	// keyup input amount Add
	const inputAdd = document.getElementById( 'vat-calculator__input_add' );
	inputAdd.onkeyup = vatCalculate;

	// keyup input amount Remove
	const inputRemove = document.getElementById( 'vat-calculator__input_remove' );
	inputRemove.onkeyup = vatCalculate;
};

initBlock( '.vat-calculator', initVatCalculator );
