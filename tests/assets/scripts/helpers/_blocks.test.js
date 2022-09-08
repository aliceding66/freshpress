/* eslint-env jest */

import * as _blocks from 'scripts/helpers/_blocks';

describe( 'helpers/_blocks', () => {
	describe( 'initBlock', () => {
		test( 'initBlock function exists', () => {
			expect( typeof _blocks.initBlock ).toBe( 'function' );
		} );
	} );
} );
