/**
 * Business Loan Calculator.
 */

import { __ } from '@wordpress/i18n';
import { initBlock } from 'scripts/helpers/_blocks';
import {
	emptyPrice,
	emptyPercent,
	emptyNumber,
	formatRounded,
	formatPrice,
	formatPercent,
	iconHasErrorClass,
	inputHasErrorClass,
} from 'scripts/helpers/_fbtools';

const resultValueClass = 'business-loan-calculator--results-value';
const resultValueMutedClass = 'business-loan-calculator--results-value--muted';

const initBusinessLoanCalculator = ( businessLoanCalculator ) => {
	const form = businessLoanCalculator.querySelector( '#fbtoolsBlcForm' );
	const refreshButton = businessLoanCalculator.querySelector( '#fbtoolsBlcRefresh' );
	const amountInput = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanAmount' );
	const amountIcon = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanAmountIcon' );
	const amountError = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanAmountError' );
	const rateInput = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanRate' );
	const rateIcon = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanRateIcon' );
	const rateError = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanRateError' );
	const yearsInput = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanYearsInput' );
	const yearsSlider = businessLoanCalculator.querySelector( '#fbtoolsBlcLoanYearsSlider' );
	const resultLoanAmount = businessLoanCalculator.querySelector( '#fbtoolsBlcResultLoanAmount' );
	const resultYears = businessLoanCalculator.querySelector( '#fbtoolsBlcResultYears' );
	const resultMonthlyPayment = businessLoanCalculator.querySelector(
		'#fbtoolsBlcResultMonthlyPayment'
	);
	const resultRate = businessLoanCalculator.querySelector( '#fbtoolsBlcResultRate' );
	const resultTotalCost = businessLoanCalculator.querySelector( '#fbtoolsBlcResultTotalCost' );
	const resultFooterMonthlyInterest = businessLoanCalculator.querySelector(
		'#fbtoolsBlcResultFooterMonthlyInterest'
	);
	const resultFooterMonthlyPayment = businessLoanCalculator.querySelector(
		'#fbtoolsBlcResultFooterMonthlyPayment'
	);
	const resultFooterTotalInterest = businessLoanCalculator.querySelector(
		'#fbtoolsBlcResultFooterTotalInterest'
	);
	const resultFooterYears = businessLoanCalculator.querySelector(
		'#fbtoolsBlcResultFooterYears'
	);

	let lastCalculatedData = {};

	const handleAmountUpdate = () => {
		if ( amountInput.value.charAt( 0 ) !== '$' ) {
			amountInput.value = formatPrice( amountInput.value.replace( '$', '' ) );
		} else if ( amountInput.value === '$' ) {
			amountInput.value = '';
		}

		validateAmountInput();

		checkIfHighlightResultValues();
	};

	const validateAmountInput = () => {
		let errorMessage = '';
		if ( amountInput.value === '' ) {
			errorMessage = __( 'Loan amount required', 'freshpress-website' );
		} else if ( isNaN( Number( amountInput.value.substring( 1 ) ) ) ) {
			errorMessage = __( 'Please enter a valid currency input', 'freshpress-website' );
		}

		if ( errorMessage !== '' ) {
			amountInput.classList.add( inputHasErrorClass );
			amountIcon.classList.add( iconHasErrorClass );
			amountError.innerText = errorMessage;
		} else {
			amountInput.classList.remove( inputHasErrorClass );
			amountIcon.classList.remove( iconHasErrorClass );
			amountError.innerText = '';
		}

		return errorMessage === '';
	};

	const handleRateUpdate = () => {
		if (
			rateInput.value.length > 0 &&
			rateInput.value.charAt( rateInput.value.length - 1 ) !== '%'
		) {
			rateInput.value = formatPercent( rateInput.value );
		} else if ( rateInput.value === '%' ) {
			rateInput.value = '';
		}

		validateRateInput();

		checkIfHighlightResultValues();
	};

	const validateRateInput = () => {
		let errorMessage = '';
		if ( rateInput.value === '' ) {
			errorMessage = __( 'Annual interest rate required', 'freshpress-website' );
		} else if (
			isNaN( Number( rateInput.value.substring( 0, rateInput.value.length - 1 ) ) )
		) {
			errorMessage = __( 'Please enter a valid percent input', 'freshpress-website' );
		}

		if ( errorMessage !== '' ) {
			rateInput.classList.add( inputHasErrorClass );
			rateIcon.classList.add( iconHasErrorClass );
			rateError.innerText = errorMessage;
		} else {
			rateInput.classList.remove( inputHasErrorClass );
			rateIcon.classList.remove( iconHasErrorClass );
			rateError.innerText = '';
		}

		return errorMessage === '';
	};

	const handleYearsUpdate = ( event = {} ) => {
		if ( event?.target === yearsSlider ) {
			yearsInput.value = yearsSlider.value;
		} else {
			yearsSlider.value = yearsInput.value;
		}

		const loanYearSliderPosition = formatPercent( ( yearsSlider.value / 30 ) * 100 );

		yearsSlider.setAttribute(
			'style',
			`background: linear-gradient(to right, rgb(13, 131, 222) ${ loanYearSliderPosition }, rgb(204, 204, 204) 0px);`
		);

		checkIfHighlightResultValues();
	};

	const validateYearsValue = () => {
		if ( yearsInput.value < yearsInput.min ) {
			yearsInput.value = yearsInput.min;
		} else if ( yearsInput.value > yearsInput.max ) {
			yearsInput.value = yearsInput.max;
		}
	};

	const recalculate = () => {
		const amountValid = validateAmountInput();
		const rateValid = validateRateInput();

		if ( amountValid && rateValid ) {
			lastCalculatedData = {
				amount: amountInput.value.replace( '$', '' ),
				rate: rateInput.value.replace( '%', '' ),
				years: yearsInput.value,
			};

			const amountOfMonths = lastCalculatedData.years * 12;
			const perMonthRate = lastCalculatedData.rate / 100 / 12;
			const monthlyPayment =
				( perMonthRate * lastCalculatedData.amount ) /
				( 1 - Math.pow( 1 + perMonthRate, -amountOfMonths ) );
			const totalCost = formatRounded(
				amountOfMonths * monthlyPayment - ( lastCalculatedData.amount - 0 )
			);
			const monthlyInterest = formatRounded( totalCost / amountOfMonths );

			resultLoanAmount.innerText = formatPrice(
				Number( lastCalculatedData.amount ).toFixed( 2 )
			);
			resultYears.innerText = lastCalculatedData.years;
			resultRate.innerText = formatPercent( Number( lastCalculatedData.rate ).toFixed( 2 ) );
			resultFooterYears.innerText = lastCalculatedData.years;
			resultMonthlyPayment.innerText = formatPrice( formatRounded( monthlyPayment ) );
			resultFooterMonthlyPayment.innerText = formatPrice( formatRounded( monthlyPayment ) );
			resultTotalCost.innerText = formatPrice( totalCost );
			resultFooterMonthlyInterest.innerText = formatPrice( monthlyInterest );
			resultFooterTotalInterest.innerText = formatPrice( totalCost );

			checkIfHighlightResultValues( true );
		}
	};

	const checkIfHighlightResultValues = ( force = null ) => {
		let highlight;

		if ( force !== null ) {
			highlight = force;
		} else {
			highlight =
				lastCalculatedData.amount === amountInput.value.replace( '$', '' ) &&
				lastCalculatedData.rate === rateInput.value.replace( '%', '' ) &&
				lastCalculatedData.years === yearsInput.value;
		}

		if ( highlight === true ) {
			const resultValuesMuted = businessLoanCalculator.querySelectorAll(
				`.${ resultValueMutedClass }`
			);
			if ( resultValuesMuted ) {
				resultValuesMuted.forEach( ( resultValueMuted ) => {
					resultValueMuted.classList.remove( resultValueMutedClass );
				} );
			}
		} else if ( highlight === false ) {
			const resultValues = businessLoanCalculator.querySelectorAll(
				`.${ resultValueClass }`
			);
			if ( resultValues ) {
				resultValues.forEach( ( resultValue ) => {
					resultValue.classList.add( resultValueMutedClass );
				} );
			}
		}
	};

	const clearForm = () => {
		lastCalculatedData = {
			amount: null,
			rate: null,
			years: null,
		};

		checkIfHighlightResultValues( false );

		amountInput.value = '';
		rateInput.value = '';
		resultLoanAmount.innerText = emptyPrice;
		resultYears.innerText = emptyNumber;
		resultMonthlyPayment.innerText = emptyPrice;
		resultRate.innerText = emptyPercent;
		resultTotalCost.innerText = emptyPrice;
		resultFooterMonthlyInterest.innerText = emptyPrice;
		resultFooterMonthlyPayment.innerText = emptyPrice;
		resultFooterTotalInterest.innerText = emptyPrice;
		resultFooterYears.innerText = emptyNumber;
	};

	amountInput.addEventListener( 'input', handleAmountUpdate );
	amountInput.addEventListener( 'change', handleAmountUpdate );
	rateInput.addEventListener( 'input', handleRateUpdate );
	rateInput.addEventListener( 'change', handleRateUpdate );
	yearsSlider.addEventListener( 'input', handleYearsUpdate );
	yearsSlider.addEventListener( 'change', handleYearsUpdate );
	yearsInput.addEventListener( 'input', handleYearsUpdate );
	yearsInput.addEventListener( 'change', handleYearsUpdate );
	yearsInput.addEventListener( 'change', validateYearsValue );
	form.addEventListener( 'submit', recalculate );
	refreshButton.addEventListener( 'click', clearForm );

	clearForm();
	handleYearsUpdate();
};

initBlock( '.business-loan-calculator', initBusinessLoanCalculator );
