/* eslint-env jest */

import * as signupPageForm from 'scripts/templates/common/signup-page-form';
import fs from 'fs';
import path from 'path';

window.fbVars = {
	fbDomains: {
		api: 'api.freshbooks.com',
		app: 'my.freshbooks.com',
		auth: 'auth.freshbooks.com',
		base: 'freshbooks.com',
	},
};

describe( 'signup-page-form.js', () => {
	describe( 'initializeSignup', () => {
		test( 'initializeSignup function exists', () => {
			expect( typeof signupPageForm.default.__get__( 'initializeSignup' ) ).toBe(
				'function'
			);
		} );

		test( 'initializeSignup is adding privacy policy validation to SSO buttons', () => {
			// Preparation.
			document.body.innerHTML = fs.readFileSync(
				path.resolve( __dirname, 'signup-page-form.test.html' ),
				'utf8'
			);
			global.$ = jest.fn();
			delete window.location;
			window.location = new URL( 'https://www.freshbooks.com' );

			const appleSSOButton = document.querySelector( '.sso-signup_apple' );
			const googleSSOButton = document.querySelector( '.sso-signup_google' );
			const signupForm = document.querySelector( 'form.sign-up__form' );
			const tosPrivacyCheckbox = document.querySelector( '#tos-accepted' );
			const tosPrivacyLabel = document.querySelector( '.sign-up__policy-privacy' );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			// Apple SSO without TOS.
			appleSSOButton.click();
			expect( signupForm.classList ).toContain( 'tos-validated' );
			expect( tosPrivacyLabel.classList ).toContain( 'is-invalid' );

			// Clear form.
			signupForm.classList.remove( 'tos-validated' );
			tosPrivacyLabel.classList.remove( 'is-invalid' );

			// Google SSO without TOS.
			googleSSOButton.click();
			expect( signupForm.classList ).toContain( 'tos-validated' );
			expect( tosPrivacyLabel.classList ).toContain( 'is-invalid' );

			// Clear form.
			signupForm.classList.remove( 'tos-validated' );
			tosPrivacyLabel.classList.remove( 'is-invalid' );

			// Apple SSO with TOS.
			tosPrivacyCheckbox.setAttribute( 'checked', 'checked' );
			appleSSOButton.click();
			expect( tosPrivacyLabel.classList ).not.toContain( 'is-invalid' );
			expect( window.location ).toBe( 'apple-sso-href' );

			// Clear form.
			signupForm.classList.remove( 'tos-validated' );
			delete window.location;
			window.location = new URL( 'https://www.freshbooks.com' );

			// Apple SSO with TOS.
			googleSSOButton.click();
			expect( tosPrivacyLabel.classList ).not.toContain( 'is-invalid' );
			expect( window.location ).toBe( 'google-sso-href' );

			// Clear form.
			signupForm.classList.remove( 'tos-validated' );
			delete window.location;
			window.location = new URL( 'https://www.freshbooks.com' );
		} );

		// Form submit cannot be tested here as submit is not implemented in JSDom used by Jest.
	} );
} );
