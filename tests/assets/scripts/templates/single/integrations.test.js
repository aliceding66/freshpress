/* eslint-env jest */

import fs from 'fs';

jest.mock( 'scripts/modules/_tracking', () => ( {
	track: jest.fn(),
} ) );

import * as integrations from 'scripts/templates/single/integrations';
import * as tracking from 'scripts/modules/_tracking';
import path from 'path';

beforeEach( () => {
	document.body.innerHTML = fs.readFileSync(
		path.resolve( __dirname, 'integrations.test.html' ),
		'utf8'
	);
} );

describe( 'integrations.js', () => {
	describe( 'ctaTracking', () => {
		test( 'ctaTracking function exists', () => {
			expect( typeof integrations.default.__get__( 'ctaTracking' ) ).toBe( 'function' );
		} );

		test( 'ctaTracking is adding track event on cta click', () => {
			// Preparation.
			const tryIntegrationButton = document.querySelector( '.integrations__cta-title' );
			const spy = jest.spyOn( tryIntegrationButton, 'addEventListener' );

			// Replace .integrations__title with element that has mocked innerText property.
			// JSDom used by Jest doesn't provide that property.
			const originalIntegrationTitle = document.querySelector( '.integrations__title' );
			const integrationTitle = document.createElement( 'div' );
			integrationTitle.setAttribute(
				'class',
				originalIntegrationTitle.getAttribute( 'class' )
			);
			Object.defineProperty( integrationTitle, 'innerText', {
				get: () => 'Test Integration',
				set: () => {},
			} );
			originalIntegrationTitle.parentNode.replaceChild(
				integrationTitle,
				originalIntegrationTitle
			);

			// Call 'DOMContentLoaded event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			expect( spy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( spy ).toHaveBeenCalledTimes( 1 );

			tryIntegrationButton.click();

			// Test expectations.
			expect( tracking.track ).toHaveBeenCalledWith( 'gtm', {
				event: 'ctaClick',
				ctaText: 'Test Integration - get',
				ctaSection: 'integrationpage',
			} );
			expect( tracking.track ).toHaveBeenCalledTimes( 1 );

			// Cleanup.
			spy.mockRestore();
			jest.resetAllMocks();
		} );
	} );

	describe( 'highlightNav', () => {
		test( 'highlightNav function exists', () => {
			expect( typeof integrations.default.__get__( 'highlightNav' ) ).toBe( 'function' );
		} );

		test( 'highlightNav is highlighting proper menu item based on actual window scroll', () => {
			// Preparation.
			const menuItems = [
				document.querySelector( '[data-menu-item="about-test-integration"]' ),
				document.querySelector( '[data-menu-item="how-it-works-with-freshbooks"]' ),
				document.querySelector( '[data-menu-item="how-to-connect"]' ),
			];

			// Mock integrations heading top position.
			const heroHeight = 500;
			const itemHeight = 200;
			let scrollY = 0;
			global.scrollY = scrollY;

			Array.from( document.querySelectorAll( '.integrations__content h2' ) ).forEach(
				( heading, headingIndex ) => {
					const headingWithTopMock = document.createElement( 'h2' );
					headingWithTopMock.setAttribute( 'id', heading.getAttribute( 'id' ) );
					headingWithTopMock.getBoundingClientRect = jest
						.fn()
						.mockImplementation( () => ( {
							top: heroHeight + itemHeight * headingIndex - scrollY,
						} ) );
					heading.parentNode.replaceChild( headingWithTopMock, heading );
				}
			);

			// Call 'DOMContentLoaded event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.

			// Helper function.
			const expectMenuItemIsHighlighted = ( toCheckMenuIndex ) => {
				menuItems.forEach( ( menuItem, menuIndex ) => {
					if ( menuIndex === toCheckMenuIndex ) {
						expect( menuItem.classList ).toContain( 'current' );
					} else {
						expect( menuItem.classList ).not.toContain( 'current' );
					}
				} );
			};

			// Start testing.
			expectMenuItemIsHighlighted( 0 );
			scrollY = 500; // Aligned with first content.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 0 );
			scrollY = 550; // Right after first.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 0 );
			scrollY = 650; // Between first and second.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 1 );
			scrollY = 700; // Aligned with second.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 1 );
			scrollY = 750; // Right after second.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 1 );
			scrollY = 800; // Between second and third.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 2 );
			scrollY = 900; // Aligned with third.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 2 );
			scrollY = 1500; // Way below third.
			global.dispatchEvent( new window.Event( 'scroll' ) );
			expectMenuItemIsHighlighted( 2 );
		} );
	} );

	describe( 'highlightNavItem', () => {
		test( 'highlightNavItem function exists', () => {
			expect( typeof integrations.default.__get__( 'highlightNavItem' ) ).toBe( 'function' );
		} );

		test( 'highlightNavItem is highlighting proper menu item', () => {
			// Preparation.
			const howToConnectMenuItem = document.querySelector(
				'[data-menu-item="how-to-connect"]'
			);

			// Test expectations.
			expect( howToConnectMenuItem.classList ).not.toContain( 'current' );
			integrations.default
				.__get__( 'highlightNavItem' )
				.call( integrations, 'how-to-connect' );
			expect( howToConnectMenuItem.classList ).toContain( 'current' );
		} );
	} );
} );
