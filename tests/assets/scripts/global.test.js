/* eslint-env jest */

import * as global from 'scripts/global';

describe( 'global.js', () => {
	describe( 'immediateInit', () => {
		test( 'immediateInit function exists', () => {
			expect( typeof global.default.__get__( 'immediateInit' ) ).toBe( 'function' );
		} );
	} );

	describe( 'contentLoadedInit', () => {
		test( 'contentLoadedInit function exists', () => {
			expect( typeof global.default.__get__( 'contentLoadedInit' ) ).toBe( 'function' );
		} );
		test( 'contentLoadedInit added to DOMConentLoaded event listener', () => {
			// Handle document.addEventListener mock.
			const addEventListener = jest.spyOn( document, 'addEventListener' );

			global.default.__get__( 'immediateInit' ).call();
			expect( addEventListener ).toHaveBeenCalledWith(
				'DOMContentLoaded',
				global.default.__get__( 'contentLoadedInit' ),
				false
			);

			// Restore document.addEventListener function.
			addEventListener.mockRestore();
		} );
	} );
} );
