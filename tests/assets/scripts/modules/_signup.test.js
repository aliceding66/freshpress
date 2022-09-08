/* eslint-env jest */

import * as _signup from 'scripts/modules/_signup';

describe( 'modules/_signup', () => {
	describe( 'handleSignup function', () => {
		test( 'handleSignup function exists', () => {
			expect( typeof _signup.handleSignup ).toBe( 'function' );
		} );
	} );

	describe( 'handleSsoSignup function', () => {
		test( 'handleSsoSignup function exists', () => {
			expect( typeof _signup.handleSsoSignup ).toBe( 'function' );
		} );
	} );

	describe( 'signupCookiesAccepted function', () => {
		test( 'signupCookiesAccepted function exists', () => {
			expect( typeof _signup.signupCookiesAccepted ).toBe( 'function' );
		} );
	} );
} );
