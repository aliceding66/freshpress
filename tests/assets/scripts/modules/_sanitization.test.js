/* eslint-env jest */

import * as _sanitization from 'scripts/modules/_sanitization';

describe( 'modules/_sanitization', () => {
	describe( 'default export', () => {
		test( 'default object exists', () => {
			expect( typeof _sanitization.default ).toBe( 'object' );
		} );
	} );
} );
