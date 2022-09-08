/* eslint-env jest */

import * as invoiceTemplates from 'scripts/templates/archive/invoice-templates';

describe( 'invoice-templates.js', () => {
	describe( 'init', () => {
		test( 'init function exists', () => {
			expect( typeof invoiceTemplates.default.__get__( 'init' ) ).toBe( 'function' );
		} );

		test( 'init as adding click listener on all <h3> elements within .box__category elements', () => {
			// Preparation.
			const startUrl = 'https://start-location.com/';
			const newUrl = 'https://new-location.com/';
			document.body.innerHTML =
				`<div class="box__category"><h3 data-url="${ newUrl }">Test h3</h3></div>` +
				`<div class="not-box__category"><h3 data-url="${ newUrl }">Test h3</h3></div>`;
			const boxCategory = document.querySelector( '.box__category' );
			const notBoxCategory = document.querySelector( '.not-box__category' );
			const boxCategoryEventListener = jest.spyOn( boxCategory, 'addEventListener' );
			const notBoxCategoryEventListener = jest.spyOn( notBoxCategory, 'addEventListener' );
			global.window = Object.create( window );
			Object.defineProperty( window, 'location', {
				value: {
					href: startUrl,
				},
			} );

			// Call of "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Testing expectation.
			expect( boxCategoryEventListener ).toHaveBeenCalledWith(
				'click',
				expect.any( Function )
			);
			expect( boxCategoryEventListener ).toHaveBeenCalledTimes( 1 );
			expect( notBoxCategoryEventListener ).toHaveBeenCalledTimes( 0 );

			// Test boxCategory click.
			boxCategory.click();
			expect( window.location.href ).toBe( newUrl );

			// Test notBoxCategory click.
			window.location.href = startUrl;
			notBoxCategory.click();
			expect( window.location.href ).toBe( startUrl );

			// Cleaning up.
			boxCategoryEventListener.mockRestore();
			notBoxCategoryEventListener.mockRestore();
		} );
	} );
} );
