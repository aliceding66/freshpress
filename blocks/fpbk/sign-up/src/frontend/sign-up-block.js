/**
 * Sign Up.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { handleSsoSignup } from 'scripts/modules/_signup';
import { isNfbCustomer } from 'scripts/helpers/_utils';
import { getDataAttr, setDataAttr } from 'scripts/helpers/_attributes';

const initializeSignup = ( signup ) => {
	// Form based signup is handled by initForms in the _forms module.

	handleSsoSignup( 'google' );
	handleSsoSignup( 'apple' );

	const promoEnd = parseInt( getDataAttr( signup, 'promo-end' ), 10 );
	const now = Math.floor( Date.now() / 1000 );

	if ( ! isNfbCustomer() && promoEnd && now < promoEnd ) {
		if ( 'false' === getDataAttr( signup, 'promo' ) ) {
			setDataAttr( signup, 'promo', 'true' );
		}
	}

	const signupForm = signup.querySelector( 'form.sign-up__form' );
	const tosPrivacyCheckbox = signup.querySelector( '#tos-accepted' );
	const tosPrivacyLabel = signup.querySelector( 'label[for="tos-accepted"]' );
	const redirectWhenTosAcceptedLinks = signup.querySelectorAll( '[data-href]' );

	if ( redirectWhenTosAcceptedLinks && redirectWhenTosAcceptedLinks.length > 0 ) {
		redirectWhenTosAcceptedLinks.forEach( ( redirectWhenTosAcceptedLink ) => {
			const href = redirectWhenTosAcceptedLink.dataset.href;
			redirectWhenTosAcceptedLink.dataset.href = '';

			redirectWhenTosAcceptedLink.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				event.stopPropagation();

				const tosAccepted =
					typeof tosPrivacyCheckbox === 'undefined' || tosPrivacyCheckbox.checked;

				if ( tosAccepted ) {
					window.location = href;
				} else {
					tosPrivacyLabel.classList.add( 'is-invalid' );
					signupForm.classList.add( 'tos-validated' );
				}
			} );
		} );
	}

	const checkPolicyPrivacyValidity = () => {
		if (
			tosPrivacyCheckbox.validity.valid &&
			tosPrivacyLabel.classList.contains( 'is-invalid' )
		) {
			signupForm.classList.remove( 'tos-validated' );
			tosPrivacyLabel.classList.remove( 'is-invalid' );
		} else if (
			! tosPrivacyCheckbox.validity.valid &&
			! tosPrivacyLabel.classList.contains( 'is-invalid' )
		) {
			signupForm.classList.add( 'tos-validated' );
			tosPrivacyLabel.classList.add( 'is-invalid' );
		}
	};

	if ( tosPrivacyCheckbox ) {
		tosPrivacyCheckbox.addEventListener( 'change', checkPolicyPrivacyValidity );
	}
	if ( signupForm ) {
		signupForm.addEventListener( 'submit', checkPolicyPrivacyValidity );
	}
};

initBlock( '.sign-up', initializeSignup );
