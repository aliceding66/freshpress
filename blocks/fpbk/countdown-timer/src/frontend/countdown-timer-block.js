/**
 * Countdown Timer.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { setDataAttr } from 'scripts/helpers/_attributes';

const intervals = {};

const parseCountdown = ( secondsRemaining ) => {
	const output = {};
	let remainder = secondsRemaining;

	// Get days, remove from remaining seconds for further calculations.
	output.days = Math.floor( remainder / 86400 );
	remainder %= 86400;

	// Get hours, remove from remaining seconds for further calculations.
	output.hours = Math.floor( remainder / 3600 );
	remainder %= 3600;

	// Get minutes, remove from remaining seconds for further calculations.
	output.minutes = Math.floor( remainder / 60 );
	remainder %= 60;

	output.seconds = remainder;

	// Pad numbers to 2 number ints.
	Object.keys( output ).forEach( ( i ) => {
		output[ i ] = output[ i ].toString().padStart( 2, '0' );
	} );

	return output;
};

const initCountdownTimer = ( countdownTimer ) => {
	// Get times and compare.
	let now = Math.floor( Date.now() / 1000 );
	const start = countdownTimer.dataset.countdownStart;
	const end = countdownTimer.dataset.countdownEnd;

	// Get elements to manipulate.
	const standardHero = document.querySelector( '.hero' );
	const promoHero = document.querySelector( '.promo-hero' );
	const pricingTable = document.querySelector( '.pricing-table' );
	const comparisonTable = document.querySelector( '.comparison-table' );
	const dbBanner = document.querySelector( '.banner-promo' );

	if ( now >= start && now < end ) {
		// Elements to update.
		const elements = document.querySelectorAll(
			'[data-has-countdown="false"]:not(.promo-hero), .promo-hero[data-show-countdown="true"]'
		);
		elements.forEach( ( element ) => {
			element.dataset.hasCountdown = true;
		} );
		const daysDisplayTens = countdownTimer.querySelector( '.countdown-timer__days-tens' );
		const daysDisplayOnes = countdownTimer.querySelector( '.countdown-timer__days-ones' );
		const hoursDisplayTens = countdownTimer.querySelector( '.countdown-timer__hours-tens' );
		const hoursDisplayOnes = countdownTimer.querySelector( '.countdown-timer__hours-ones' );
		const minutesDisplayTens = countdownTimer.querySelector( '.countdown-timer__minutes-tens' );
		const minutesDisplayOnes = countdownTimer.querySelector( '.countdown-timer__minutes-ones' );
		const secondsDisplayTens = countdownTimer.querySelector( '.countdown-timer__seconds-tens' );
		const secondsDisplayOnes = countdownTimer.querySelector( '.countdown-timer__seconds-ones' );

		// Parse times.
		let previousValues = {};
		const runInterval = setInterval( () => {
			now = Math.floor( Date.now() / 1000 );
			const parsed = parseCountdown( end - now );

			if ( parsed.days !== previousValues.days ) {
				[ daysDisplayTens.textContent, daysDisplayOnes.textContent ] = parsed.days;
			}
			if ( parsed.hours !== previousValues.hours ) {
				[ hoursDisplayTens.textContent, hoursDisplayOnes.textContent ] = parsed.hours;
			}
			if ( parsed.minutes !== previousValues.minutes ) {
				[ minutesDisplayTens.textContent, minutesDisplayOnes.textContent ] = parsed.minutes;
			}
			if ( parsed.seconds !== previousValues.seconds ) {
				[ secondsDisplayTens.textContent, secondsDisplayOnes.textContent ] = parsed.seconds;
			}

			previousValues = parsed;

			if ( now >= end ) {
				// Countdown expired, remove it.
				elements.forEach( ( element ) => {
					setDataAttr( element, 'has-countdown', 'expired' );
				} );
				clearInterval( runInterval );

				if ( promoHero ) {
					promoHero.classList.add( 'd-none' );
					standardHero.classList.remove( 'd-none' );
				}

				if ( dbBanner ) {
					dbBanner.classList.add( 'd-none' );
				}

				setDataAttr( pricingTable, 'promo-show', false );
				setDataAttr( comparisonTable, 'promo-show', false );
				setDataAttr( promoHero, 'has-countdown', 'expired' );
			}
		}, 250 );
		intervals[ countdownTimer.id ] = runInterval;
	} else if ( now >= end ) {
		setDataAttr( promoHero, 'has-countdown', 'expired' );
		if ( dbBanner ) {
			dbBanner.classList.add( 'd-none' );
		}
	}
};

initBlock( '.countdown-timer', initCountdownTimer );
