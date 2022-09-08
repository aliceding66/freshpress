/* eslint-env jest */

jest.mock( 'scripts/modules/_tracking', () => ( {
	track: jest.fn(),
} ) );

import * as integrations from 'scripts/templates/common/integrations';
import * as tracking from 'scripts/modules/_tracking';
import * as fs from 'fs';
import * as path from 'path';

beforeEach( () => {
	document.body.innerHTML = fs.readFileSync(
		path.resolve( __dirname, 'integrations.test.html' ),
		'utf8'
	);
} );

describe( 'integrations.js', () => {
	describe( 'mobileMenu', () => {
		test( 'mobileMenu function exists', () => {
			expect( typeof integrations.default.__get__( 'mobileMenu' ) ).toBe( 'function' );
		} );

		test( 'mobileMenu is properly handling mobile navigation show/hide', () => {
			// Preparation.
			const navigationWrapper = document.querySelector(
				'#integrations-taxonomy__navigation-wrapper'
			);
			const mobileMenuToggle = document.querySelector(
				'#integrations-taxonomy__navigation-toggle'
			);
			const mobileMenuToggleSpy = jest.spyOn( mobileMenuToggle, 'addEventListener' );
			const navigationCloseButton = document.querySelector(
				'#integrations-taxonomy__navigation-close'
			);
			const navigationCloseButtonSpy = jest.spyOn(
				navigationCloseButton,
				'addEventListener'
			);
			const navigationCancelButton = document.querySelector(
				'#integrations-taxonomy__cancel-button'
			);
			const navigationCancelButtonSpy = jest.spyOn(
				navigationCancelButton,
				'addEventListener'
			);

			// Call 'DOMContentLoaded event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( mobileMenuToggleSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( mobileMenuToggleSpy ).toHaveBeenCalledTimes( 1 );
			expect( navigationCloseButtonSpy ).toHaveBeenCalledWith(
				'click',
				expect.any( Function )
			);
			expect( navigationCloseButtonSpy ).toHaveBeenCalledTimes( 1 );
			expect( navigationCancelButtonSpy ).toHaveBeenCalledWith(
				'click',
				expect.any( Function )
			);
			expect( navigationCancelButtonSpy ).toHaveBeenCalledTimes( 1 );

			expect( document.body.classList ).not.toContain( 'noscroll' );
			expect( navigationWrapper.classList ).not.toContain( 'active' );

			// Click when on desktop.
			global.innerWidth = 1920;
			mobileMenuToggle.click();
			expect( document.body.classList ).not.toContain( 'noscroll' );
			expect( navigationWrapper.classList ).toContain( 'active' );

			// Click close button.
			navigationCloseButton.click();
			expect( document.body.classList ).not.toContain( 'noscroll' );
			expect( navigationWrapper.classList ).not.toContain( 'active' );

			// Click when on mobile.
			global.innerWidth = 700;
			mobileMenuToggle.click();
			expect( document.body.classList ).toContain( 'noscroll' );
			expect( navigationWrapper.classList ).toContain( 'active' );

			// Click cancel button.
			navigationCancelButton.click();
			expect( document.body.classList ).not.toContain( 'noscroll' );
			expect( navigationWrapper.classList ).not.toContain( 'active' );

			// Cleanup.
			mobileMenuToggleSpy.mockRestore();
			navigationCloseButtonSpy.mockRestore();
			navigationCancelButtonSpy.mockRestore();
			jest.resetAllMocks();
		} );
	} );

	describe( 'ctaTracking', () => {
		test( 'ctaTracking function exists', () => {
			expect( typeof integrations.default.__get__( 'ctaTracking' ) ).toBe( 'function' );
		} );

		test( 'ctaTracking is adding proper click event to call "track" function', () => {
			// Preparation.
			const learnMoreButton = document.querySelector( '.integration-card__integration-cta' );
			const spy = jest.spyOn( learnMoreButton, 'addEventListener' );

			// Call 'DOMContentLoaded event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			expect( spy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( spy ).toHaveBeenCalledTimes( 1 );

			learnMoreButton.click();

			// Test expectations.
			expect( tracking.track ).toHaveBeenCalledWith( 'gtm', {
				event: 'ctaClick',
				ctaText: `Test Integration - learnmore`,
				ctaSection: 'integrationsearch',
			} );
			expect( tracking.track ).toHaveBeenCalledTimes( 1 );

			// Cleanup.
			spy.mockRestore();
			jest.resetAllMocks();
		} );
	} );
} );
