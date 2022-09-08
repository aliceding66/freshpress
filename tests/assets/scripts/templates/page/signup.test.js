/* eslint-env jest */

import * as signup from 'scripts/templates/page/signup';

describe( 'signup.js', () => {
	describe( 'initializeSignupPage', () => {
		test( 'initializeSignupPage function exists', () => {
			expect( typeof signup.default.__get__( 'initializeSignupPage' ) ).toBe( 'function' );
		} );

		test( 'initializeSignupPage is adding content expander handler', () => {
			// Preparation.
			document.body.innerHTML = `
				<button id="content-expander"></button>
				<button id="content-button"></button>
				<div class="signup-page__content-wrapper">
					Signup page content
				</div>
			`;

			const contentExpanderButton = document.querySelector( '#content-expander' );
			const contentExpanderButtonSpy = jest.spyOn(
				contentExpanderButton,
				'addEventListener'
			);
			const contentButton = document.querySelector( '#content-button' );
			const contentButtonSpy = jest.spyOn( contentButton, 'addEventListener' );
			const contentWrapper = document.querySelector( '.signup-page__content-wrapper' );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( contentExpanderButtonSpy ).toHaveBeenCalledWith(
				'click',
				expect.any( Function )
			);
			expect( contentExpanderButtonSpy ).toHaveBeenCalledTimes( 1 );
			expect( contentButtonSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( contentButtonSpy ).toHaveBeenCalledTimes( 1 );

			// Test if toggling content with contentExpanderButton works.
			expect( contentExpanderButton.classList ).not.toContain( 'expanded' );
			expect( contentWrapper.classList ).not.toContain( 'shown' );
			contentExpanderButton.click();
			expect( contentExpanderButton.classList ).toContain( 'expanded' );
			expect( contentWrapper.classList ).toContain( 'shown' );
			contentExpanderButton.click();
			expect( contentExpanderButton.classList ).not.toContain( 'expanded' );
			expect( contentWrapper.classList ).not.toContain( 'shown' );

			// Test if toggling content with contentButton works.
			contentButton.click();
			expect( contentExpanderButton.classList ).toContain( 'expanded' );
			expect( contentWrapper.classList ).toContain( 'shown' );
			contentButton.click();
			expect( contentExpanderButton.classList ).not.toContain( 'expanded' );
			expect( contentWrapper.classList ).not.toContain( 'shown' );
		} );
	} );
} );
