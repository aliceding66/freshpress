/* eslint-env jest */

import * as footer from 'scripts/templates/common/footer';
import * as fs from 'fs';
import * as path from 'path';

describe( 'footer.js', () => {
	describe( 'initFooter', () => {
		test( 'initFooter function exists', () => {
			expect( typeof footer.initFooter ).toBe( 'function' );
		} );

		test( 'initFooter is adding proper event to toggle items on click for mobile menu items, not desktop ones', () => {
			// Preparation.
			document.body.innerHTML = fs.readFileSync(
				path.resolve( __dirname, 'footer.test.html' ),
				'utf8'
			);

			const mobileNav = document.querySelector( 'footer .nav' );
			const allMenuItems = document.querySelectorAll( '.menu-item-has-children' );
			const spies = [];

			Array.from( allMenuItems ).forEach( ( menuItem, index ) => {
				spies[ index ] = jest.spyOn( menuItem, 'addEventListener' );
			} );

			// Call function.
			footer.initFooter.call();

			expect( Array.from( allMenuItems ).length ).toBeGreaterThan( 0 );

			// Test expectations.
			Array.from( allMenuItems ).forEach( ( menuItem, index ) => {
				const isMobileButton = mobileNav.contains( menuItem );
				if ( isMobileButton ) {
					expect( spies[ index ] ).toHaveBeenCalledWith(
						'click',
						expect.any( Function )
					);
					expect( spies[ index ] ).toHaveBeenCalledTimes( 1 );
				} else {
					expect( spies[ index ] ).toHaveBeenCalledTimes( 0 );
				}

				// Open menu item.
				menuItem.click();

				if ( isMobileButton ) {
					expect( menuItem.classList ).toContain( 'footer__nav-menu-item_active' );
				} else {
					expect( menuItem.classList ).not.toContain( 'footer__nav-menu-item_active' );
				}

				// Close menu item.
				menuItem.click();

				expect( menuItem.classList ).not.toContain( 'footer__nav-menu-item_active' );
			} );

			// Cleanup.
			spies.forEach( ( spy ) => spy.mockRestore() );
			jest.resetAllMocks();
		} );
	} );
} );
