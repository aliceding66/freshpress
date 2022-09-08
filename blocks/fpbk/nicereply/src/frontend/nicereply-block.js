/**
 * Nicereply.
 */

import { initBlock } from '../../../../../assets/scripts/helpers/_blocks';

const initNicereply = ( nicereply ) => {
	const stepOne = nicereply.querySelector( '.nicereply__step-one' );
	const stepTwo = nicereply.querySelector( '.nicereply__step-two' );
	const stepThree = nicereply.querySelector( '.nicereply__step-three' );

	const btnContinue = stepOne.querySelector( '.nicereply__btn-continue' );
	const btnSubmit = stepTwo.querySelector( '.nicereply__btn-submit' );

	const surveyItems = nicereply.querySelectorAll( '.nicereply__survey-items' );
	const pageDots = nicereply.querySelector( '.nicereply__page-dots' );
	const errors = nicereply.querySelector( '.nicereply__error' );

	const niceReplyFormTop = stepOne.offsetTop;
	const niceReplyFormLeft = stepOne.offsetLeft;
	let niceReplySubmitting = false;

	const scrollToNiceReply = () => {
		if ( niceReplyFormTop < window.scrollY ) {
			window.scrollTo( {
				top: niceReplyFormTop,
				left: niceReplyFormLeft,
				behavior: 'smooth',
			} );
		}
	};

	let minScore = 0;
	let responseType = '';

	// Continue.
	let surveyVals = {};
	btnContinue.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		// Hide errors upon resubmitting.
		errors.querySelectorAll( 'span' ).forEach( ( error ) => {
			error.classList.add( 'd-none' );
		} );
		surveyItems.forEach( ( surveyItem ) => {
			const checked = surveyItem.querySelector( 'input[type="radio"]:checked' );
			if ( checked ) {
				// Capture values.
				surveyVals[ surveyItem.id ] = checked.value;
			} else if ( ! ( 'productFeedback' === surveyItem.id ) ) {
				errors
					.querySelector( `.nicereply__error--${ surveyItem.id }` )
					.classList.remove( 'd-none' );
			}

			const valuesArr = Object.values( surveyVals );
			minScore = Math.min( ...valuesArr );

			if (
				Object.keys( surveyVals ).length > 1 ||
				( 1 === Object.keys( surveyVals ).length &&
					'supportExperience' === Object.keys( surveyVals )[ 0 ] )
			) {
				// Move to next step.
				stepOne.classList.add( 'd-none' );
				stepTwo.classList.remove( 'd-none' );
				pageDots.querySelector( '.active' ).classList.remove( 'active' );
				pageDots.querySelectorAll( '.nicereply__page-dot' )[ 1 ].classList.add( 'active' );
				scrollToNiceReply();

				// Set response.
				if ( minScore > 7 ) {
					responseType = 'good';
				} else if ( minScore > 3 ) {
					responseType = 'ok';
				} else {
					responseType = 'bad';
				}
				stepTwo
					.querySelector( `.nicereply__response--${ responseType }` )
					.classList.remove( 'd-none' );
			}
		} );
		return false;
	} );

	const submitNicereply = async ( targetUrl, values ) => {
		const data = new FormData(); // eslint-disable-line no-undef
		Object.entries( values ).forEach( ( [ key, value ] ) => {
			data.set( key, value );
		} );

		niceReplySubmitting = true;
		await window
			.fetch( targetUrl, {
				method: 'POST',
				body: data,
			} )
			.then( ( response ) => {
				niceReplySubmitting = false;
				if ( response.status >= 400 && response.status < 600 ) {
					throw new Error( 'Bad response from server.' );
				}
				return response;
			} )
			.then( ( returned ) => {
				if ( returned.status === 200 ) {
					// Move to next step.
					stepTwo.classList.add( 'd-none' );
					stepThree.classList.remove( 'd-none' );
					pageDots.classList.remove( 'd-flex' );
					pageDots.classList.add( 'd-none' );
					scrollToNiceReply();
				}
			} )
			.catch( () => {
				// Show error.
				niceReplySubmitting = false;
				errors.querySelector( '.nicereply__error--submit' ).classList.remove( 'd-none' );

				// Reset values.
				surveyVals = {};
				minScore = 0;
				responseType = '';

				// Show first step.
				stepTwo.classList.add( 'd-none' );
				stepThree.classList.add( 'd-none' );
				stepOne.classList.remove( 'd-none' );
				pageDots.classList.add( 'd-flex' );
				pageDots.classList.remove( 'd-none' );
				pageDots.querySelector( '.active' ).classList.remove( 'active' );
				pageDots.querySelectorAll( '.nicereply__page-dot' )[ 0 ].classList.add( 'active' );
				scrollToNiceReply();
			} );
	};

	// Submit.
	btnSubmit.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		if ( niceReplySubmitting ) {
			return;
		}

		const queryParams = new URLSearchParams( window.location.search );
		const nicereplyData = {
			user: queryParams.get( 'user' ),
			ticketid: queryParams.get( 'ticketid' ),
			minScore,
			comment: stepTwo.querySelector( '#nicereply-feedback' ).value,
			...surveyVals,
		};

		const targetUrl = `${ stepTwo.querySelector( 'form' ).action }`;

		submitNicereply( targetUrl, nicereplyData );
		return false;
	} );
};

initBlock( '.nicereply', initNicereply );
