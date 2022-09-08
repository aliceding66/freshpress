/* eslint-env jest */

import * as header from 'scripts/templates/common/header';
import * as fs from 'fs';
import * as path from 'path';

describe( 'header.js', () => {
	describe( 'initHeader', () => {
		test( 'initHeader function exists', () => {
			expect( typeof header.initHeader ).toBe( 'function' );
		} );

		test( 'initHeader is properly handling mobile header open/close buttons', () => {
			// Preparation.
			document.body.innerHTML = fs.readFileSync(
				path.resolve( __dirname, 'header.test.html' ),
				'utf8'
			);
			const handlerOpenMenu = document.querySelector( '#header__menu-handler-image_open' );
			const handlerCloseMenu = document.querySelector( '#header__menu-handler-image_close' );
			const handlerOpenSpy = jest.spyOn( handlerOpenMenu, 'addEventListener' );
			const handlerCloseSpy = jest.spyOn( handlerCloseMenu, 'addEventListener' );

			const mobileHeader = document.querySelector( '#header__mobile-header' );
			const mobileHeaderBody = document.querySelector( '#header__body' );
			const allMenuItems = document.querySelectorAll( '.menu-item-has-children' );
			const menuItemSpies = [];
			Array.from( allMenuItems ).forEach( ( menuItem, index ) => {
				menuItemSpies[ index ] = jest.spyOn( menuItem, 'addEventListener' );
			} );

			// Call function.
			header.initHeader.call();

			// Test expectations.
			expect( handlerOpenSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( handlerOpenSpy ).toHaveBeenCalledTimes( 1 );
			expect( handlerCloseSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( handlerCloseSpy ).toHaveBeenCalledTimes( 1 );

			expect( handlerOpenMenu.classList ).not.toContain( 'd-none' );
			expect( handlerCloseMenu.classList ).toContain( 'd-none' );
			expect( mobileHeaderBody.classList ).not.toContain( 'header__body_active' );
			// Open menu.
			handlerOpenMenu.click();
			expect( handlerOpenMenu.classList ).toContain( 'd-none' );
			expect( handlerCloseMenu.classList ).not.toContain( 'd-none' );
			expect( mobileHeaderBody.classList ).toContain( 'header__body_active' );

			Array.from( allMenuItems ).forEach( ( menuItem, index ) => {
				const isMobileButton = mobileHeader.contains( menuItem );
				if ( isMobileButton ) {
					expect( menuItemSpies[ index ] ).toHaveBeenCalledWith(
						'click',
						expect.any( Function )
					);
					expect( menuItemSpies[ index ] ).toHaveBeenCalledTimes( 1 );
				} else {
					expect( menuItemSpies[ index ] ).toHaveBeenCalledTimes( 0 );
				}

				// Open menu item.
				menuItem.click();

				if ( isMobileButton ) {
					expect( menuItem.classList ).toContain( 'header__nav-menu-item_active' );
				} else {
					expect( menuItem.classList ).not.toContain( 'header__nav-menu-item_active' );
				}

				// Close menu item.
				menuItem.click();

				expect( menuItem.classList ).not.toContain( 'header__nav-menu-item_active' );
			} );

			// Close menu.
			handlerCloseMenu.click();
			expect( handlerOpenMenu.classList ).not.toContain( 'd-none' );
			expect( handlerCloseMenu.classList ).toContain( 'd-none' );
			expect( mobileHeaderBody.classList ).not.toContain( 'header__body_active' );

			// Cleanup.
			handlerOpenSpy.mockRestore();
			handlerCloseSpy.mockRestore();
			menuItemSpies.forEach( ( spy ) => spy.mockRestore() );
			jest.resetAllMocks();
		} );
	} );
} );
