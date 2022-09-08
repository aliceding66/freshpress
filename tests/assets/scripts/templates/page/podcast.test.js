/* eslint-env jest */

import * as podcast from 'scripts/templates/page/podcast';

describe( 'podcast.js', () => {
	describe( 'initSwiper', () => {
		test( 'initSwiper function exists', () => {
			expect( typeof podcast.default.__get__( 'initSwiper' ) ).toBe( 'function' );
		} );

		test.todo( 'initSwiper is making proper slides order' );
	} );

	describe( 'handleNavItems', () => {
		test( 'handleNavItems function exists', () => {
			expect( typeof podcast.default.__get__( 'handleNavItems' ) ).toBe( 'function' );
		} );

		test.todo(
			'handleNavItems is properly handling filtering of episodes based by season selected'
		);
	} );
} );
