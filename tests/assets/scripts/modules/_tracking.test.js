/* eslint-env jest */

import * as _tracking from 'scripts/modules/_tracking';

describe( 'modules/_tracking', () => {
	describe( 'getTracker function', () => {
		test( 'getTracker private function exists', () => {
			expect( typeof _tracking.default.__get__( 'getTracker' ) ).toBe( 'function' );
		} );

		test( 'getTracker function not exported', () => {
			expect( typeof _tracking.getTracker ).toBe( 'undefined' );
		} );
	} );

	describe( 'track function', () => {
		test( 'track function exists', () => {
			expect( typeof _tracking.track ).toBe( 'function' );
		} );
	} );

	describe( 'trackEvent function', () => {
		test( 'trackEvent function exists', () => {
			expect( typeof _tracking.trackEvent ).toBe( 'function' );
		} );
	} );

	describe( 'isProviderActive function', () => {
		test( 'isProviderActive function exists', () => {
			expect( typeof _tracking.isProviderActive ).toBe( 'function' );
		} );
	} );

	describe( 'setGlobalDataLayer function', () => {
		test( 'setGlobalDataLayer function exists', () => {
			expect( typeof _tracking.setGlobalDataLayer ).toBe( 'function' );
		} );
	} );

	describe( 'addLinkTracking function', () => {
		test( 'addLinkTracking function exists', () => {
			expect( typeof _tracking.addLinkTracking ).toBe( 'function' );
		} );
	} );
} );
