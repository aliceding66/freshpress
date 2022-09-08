/* eslint-env jest */

import * as _requests from 'scripts/helpers/_requests';

const testData = {
	url: 'https://api.staging.freshenv.com/auth/api/v1/smux/registrations',
	fields: {
		name: '',
		password: '',
	},
};

describe( 'helpers/_requests', () => {
	describe( 'request function', () => {
		test( 'request function exists', () => {
			expect( typeof _requests.request ).toBe( 'function' );
		} );
		test( 'request function returns error Object when passed invalid data', () => {
			expect( _requests.request( testData.url, testData.fields ) instanceof Object ).toBe(
				true
			);
		} );
	} );

	describe( 'parseResponse function', () => {
		test( 'parseResponse function exists', () => {
			expect( typeof _requests.default.__get__( 'parseResponse' ) ).toBe( 'function' );
		} );
	} );
} );
