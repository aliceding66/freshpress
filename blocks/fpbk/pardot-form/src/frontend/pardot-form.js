/**
 * Pardot Form.
 */

import { track } from 'scripts/modules/_tracking';
import { initBlock } from 'scripts/helpers/_blocks';
import sha256 from 'crypto-js/sha256';
import 'bootstrap/js/dist/modal';

const initPardotForm = ( pardotForm ) => {
	const iframe = pardotForm.querySelector( '.pardot-form__iframe' );
	let formName;
	if ( pardotForm && pardotForm.dataset ) {
		formName = pardotForm.dataset.formName;
	}
	let email;

	// eslint-disable-next-line @wordpress/no-global-event-listener
	window.addEventListener( 'message', ( e ) => {
		const isSameSource = e.source === iframe.contentWindow;

		if ( e && e.data ) {
			// iFrame resizing.
			if ( e.data.frameHeight && isSameSource ) {
				iframe.style.height = `${ e.data.frameHeight }px`;
			}

			// Form start tracking.
			if ( e.data.formStarted && isSameSource ) {
				track( 'gtm', {
					event: 'formSubmitStart',
					formName,
				} );
			}

			// Email capture.
			if ( e.data.email ) {
				email = sha256( e.data.email ).toString();
			}

			// Submission completion action.
			if ( e.data.formSubmitted && isSameSource ) {
				const persistentPopup = iframe.getAttribute( 'persistentPopup' ) === '1';
				const thankYouModalId = iframe.dataset.thankYouModal;
				const $thankYouModal = $( `.pardot-modal#${ thankYouModalId }` );

				// Hide modal with form
				if (
					$( '.modal_with-form' ).length &&
					! persistentPopup &&
					$( '.modal_with-form' ).attr( 'data-pardot-thank-you' ) !== '1'
				) {
					iframe.src = iframe.src; // not sure why this line here, that's just refreshes the form, but as it was here bofore I'll keave it as is
					$( '.modal_with-form [data-dismiss="modal"]' ).trigger( { type: 'click' } );
				}

				// Show thank-you modal
				if ( $thankYouModal.length ) {
					$thankYouModal.modal( 'show' );
					iframe.src = iframe.src;
				}

				track( 'gtm', {
					event: 'formSubmitSuccess',
					formName,
					email,
				} );
			}

			// LinkedIn tracking.
			if ( e.data.linkedInAutofillClicked && isSameSource ) {
				track( 'gtm', {
					event: 'ctaClick',
					ctaText: 'autofillwithlinkedin',
					ctaSection: formName,
				} );
			}
		}
	} );
};

initBlock( '.pardot-form', initPardotForm );
