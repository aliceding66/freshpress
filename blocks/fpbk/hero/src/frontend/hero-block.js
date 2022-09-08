/**
 * Hero.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { handleSsoSignup } from 'scripts/modules/_signup';

const initHero = ( hero ) => {
	const isCenteredWithSsoTheme = hero.classList.contains( 'is-style-centered-with-sso' );
	const heroTerms = hero.querySelector( '.hero__signup-form__terms:not(.sso)' );
	const tosPrivacyCheckbox = hero.querySelector( 'input#tos-accepted' );
	const signupForm = hero.querySelector( '.hero__signup-form' );

	if ( isCenteredWithSsoTheme ) {
		const inputs = hero.querySelectorAll(
			'.hero__signup-form-email *, .hero__signup-form-btn *, .expandable:not(.sso) *'
		);
		const expandableItems = hero.querySelectorAll( '.expandable' );
		const formExitButton = hero.querySelector( '#close-form' );

		handleSsoSignup( 'google' );
		handleSsoSignup( 'apple' );

		inputs.forEach( ( input ) => {
			input.addEventListener( 'click', () => {
				expandableItems[ 0 ].classList.add( 'expanded' );
				expandableItems[ 1 ].classList.remove( 'expanded' );
				expandableItems[ 1 ].classList.remove( 'overflow-visible' );
				formExitButton.classList.add( 'show' );

				setTimeout( () => {
					expandableItems[ 0 ].classList.add( 'overflow-visible' );
				}, 300 );
			} );

			window.addEventListener( 'click', ( e ) => {
				const stayExpandedElements = [ ...Array.from( inputs ) ];

				if ( ! stayExpandedElements.includes( e.target ) ) {
					expandableItems[ 0 ].classList.remove( 'expanded' );
					expandableItems[ 0 ].classList.remove( 'overflow-visible' );
					expandableItems[ 1 ].classList.add( 'expanded' );
					formExitButton.classList.remove( 'show' );

					setTimeout( () => {
						expandableItems[ 1 ].classList.add( 'overflow-visible' );
					}, 300 );
				}
			} );
		} );

		const ssoButtons = hero.querySelectorAll( '.sso-signup_apple, .sso-signup_google' );
		const ssoTosPrivacyCheckbox = hero.querySelector( 'input#tos-accepted-sso' );
		const ssoTosTooltip = hero.querySelector( '.expandable.sso .invalid-checkbox-tooltip' );
		const checkboxes = [ tosPrivacyCheckbox, ssoTosPrivacyCheckbox ];

		checkboxes.forEach( ( checkbox ) => {
			checkbox.checked = false;

			checkbox.addEventListener( 'change', ( e ) => {
				checkboxes[ Number( ! checkboxes.indexOf( e.target ) ) ].checked = e.target.checked;
			} );
		} );

		ssoButtons.forEach( ( ssoButton ) => {
			ssoButton.addEventListener( 'click', () => {
				if ( ssoTosPrivacyCheckbox.checked ) {
					ssoTosTooltip.classList.remove( 'd-block' );
				} else {
					ssoTosTooltip.classList.add( 'd-block' );
				}
			} );
		} );

		ssoTosPrivacyCheckbox.addEventListener( 'change', () => {
			ssoTosTooltip.classList.remove( 'd-block' );
		} );
	} else {
		const signupEmailInput = hero.querySelector( '.hero__signup-form-email input' );
		if ( signupEmailInput ) {
			signupEmailInput.addEventListener( 'focus', () => {
				signupForm.classList.add( 'hero__signup-form_focused' );
			} );
		}
	}

	const checkPolicyPrivacyValidity = () => {
		if ( tosPrivacyCheckbox.validity.valid && heroTerms.classList.contains( 'is-invalid' ) ) {
			heroTerms.classList.remove( 'is-invalid' );
		} else if (
			! tosPrivacyCheckbox.validity.valid &&
			! heroTerms.classList.contains( 'is-invalid' )
		) {
			heroTerms.classList.add( 'is-invalid' );
		}
	};

	if ( tosPrivacyCheckbox ) {
		tosPrivacyCheckbox.addEventListener( 'change', checkPolicyPrivacyValidity );
	}
	if ( signupForm ) {
		signupForm.addEventListener( 'submit', checkPolicyPrivacyValidity );
	}
};
initBlock( '.hero', initHero );
