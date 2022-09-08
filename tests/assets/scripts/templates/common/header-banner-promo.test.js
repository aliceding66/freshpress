/* eslint-env jest */

import * as headerBannerPromo from 'scripts/templates/common/header-banner-promo';

describe( 'header-banner-promo.js', () => {
	describe( 'initBannerPromo', () => {
		test( 'initBannerPromo function exists', () => {
			expect( typeof headerBannerPromo.initBannerPromo ).toBe( 'function' );
		} );

		test( 'initBannerPromo is showing banner promo for not FreshBooks customers', () => {
			// Preparation.
			// Not FreshBooks customer init.
			document.cookie = '';
			document.body.innerHTML = '<div class="banner-promo slide-in"></div>';
			const promoBanner = document.querySelector( '.banner-promo' );

			// Call function.
			headerBannerPromo.initBannerPromo.call();

			// Test expectations.
			expect( promoBanner.classList ).not.toContain( 'd-none' );
			expect( promoBanner.classList ).toContain( 'slide-in' );
		} );

		test( 'initBannerPromo is not showing banner promo for FreshBooks customers', () => {
			// Preparation.
			// FreshBooks customer init.
			document.cookie = 'smux_login=true;';
			document.body.innerHTML = '<div class="banner-promo slide-in"></div>';
			const promoBanner = document.querySelector( '.banner-promo' );

			// Call function.
			headerBannerPromo.initBannerPromo.call();

			// Test expectations.
			expect( promoBanner.classList ).toContain( 'd-none' );
			expect( promoBanner.classList ).not.toContain( 'slide-in' );
		} );
	} );
} );
