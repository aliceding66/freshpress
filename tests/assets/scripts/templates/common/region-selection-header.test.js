/* eslint-env jest */

jest.mock( 'scripts/modules/_i18n', () => ( {
	getSiteCountryCode: jest.fn(),
	getSuggestedCountryCode: jest.fn(),
	setUserCountryCode: jest.fn(),
	setUserCountryName: jest.fn(),
} ) );
jest.mock( 'scripts/modules/_tracking', () => ( {
	track: jest.fn(),
} ) );

import * as regionSelectionHeader from 'scripts/templates/common/region-selection-header';
import * as _cookies from 'scripts/modules/_cookies';
import * as _i18n from 'scripts/modules/_i18n';
import * as _tracking from 'scripts/modules/_tracking';
import fs from 'fs';
import path from 'path';

window.fbVars = {
	fbDomains: {
		api: 'api.freshbooks.com',
		app: 'my.freshbooks.com',
		auth: 'auth.freshbooks.com',
		base: 'freshbooks.com',
	},
	i18n: {
		siteCountryCode: 'us',
		siteLangCode: 'en',
		supportedRegions: {
			ca: {
				en: {
					active: 0,
					countryCode: 'ca',
					countryName: 'Canada',
					fullCode: 'en-ca',
					fullName: 'Canada (English)',
					langCode: 'en',
					langName: 'English',
					locale: 'en_CA',
					sitePaths: {
						home: '/en-ca/',
						signup: '/en-ca/signup',
						pricing: '/en-ca/pricing',
					},
					transName: 'Canada (English)',
					url: 'https://www.freshbooks.com/en-ca/',
				},
			},
			us: {
				en: {
					active: 0,
					countryCode: 'us',
					countryName: 'USA',
					fullCode: 'en-ca',
					fullName: 'USA (English)',
					langCode: 'en',
					langName: 'English',
					locale: 'en_US',
					sitePaths: {
						home: '/',
						signup: '/signup',
						pricing: '/pricing',
					},
					transName: 'USA (English)',
					url: 'https://www.freshbooks.com/',
				},
			},
		},
	},
};

const bannerDismissCookieName = 'user-country-banner-dismiss';
let banner, close, select;

beforeEach( () => {
	document.body.innerHTML = fs.readFileSync(
		path.resolve( __dirname, 'region-selection-header.test.html' ),
		'utf8'
	);

	banner = document.querySelector( '.region-selection-header' );
	close = banner.querySelector( '.btn-close' );
	select = banner.querySelector( '.region-selection-header__select select' );
} );

afterEach( () => {
	document.cookie = '';
	document.body.innerHTML = '';
	_cookies.eraseCookie( bannerDismissCookieName );

	jest.clearAllMocks();
} );

describe( 'region-selection-Header.js', () => {
	describe( 'initRSHeader', () => {
		test( 'initRSHeader function exists', () => {
			expect( typeof regionSelectionHeader.initRSHeader ).toBe( 'function' );
		} );

		test( 'initRSHeader is not showing banner if was dismissed', () => {
			// Preparation.
			_cookies.createCookie( bannerDismissCookieName, 'true' );

			// Call function.
			regionSelectionHeader.initRSHeader();

			// Test expectations.
			expect( banner.classList ).toContain( 'd-none' );
		} );

		test( 'initRSHeader is not showing banner if suggested country code matched current country code', () => {
			// Preparation.
			_i18n.getSiteCountryCode.mockImplementationOnce( () => 'us' );
			_i18n.getSuggestedCountryCode.mockImplementationOnce( () => 'us' );

			// Call function.
			regionSelectionHeader.initRSHeader();

			// Test expectations.
			expect( banner.classList ).toContain( 'd-none' );
		} );

		test( 'initRSHeader is showing banner if banner was not dismissed and suggested country code is different then current one', () => {
			// Preparation.
			_i18n.getSiteCountryCode.mockImplementationOnce( () => 'us' );
			_i18n.getSuggestedCountryCode.mockImplementationOnce( () => 'ca' );

			// Call function.
			regionSelectionHeader.initRSHeader();

			// Test expectations.
			expect( banner.classList ).not.toContain( 'd-none' );
		} );

		test( 'initRSHeader is hiding banner and adding dismiss cookie call when closing banner', () => {
			// Preparation.
			_i18n.getSiteCountryCode.mockImplementationOnce( () => 'us' );
			_i18n.getSuggestedCountryCode.mockImplementationOnce( () => 'ca' );

			// Call function.
			regionSelectionHeader.initRSHeader();

			// Test expectations.
			expect( banner.classList ).not.toContain( 'd-none' );
			expect( _cookies.readCookie( bannerDismissCookieName ) ).toBeUndefined();
			close.click();
			expect( _cookies.readCookie( bannerDismissCookieName ) ).toBeTruthy();
			expect( banner.classList ).toContain( 'd-none' );
		} );

		test( 'initRSHeader is triggering track action when country code was changed', () => {
			// Preparation.
			_i18n.getSiteCountryCode.mockImplementationOnce( () => 'us' );
			_i18n.getSuggestedCountryCode.mockImplementationOnce( () => 'ca' );
			delete window.location;
			window.location = new URL( 'https://www.freshbooks.com/' ); // US url.

			// Call function.
			regionSelectionHeader.initRSHeader();

			// Test expectations.
			select.value = 'en-ca';
			select.dispatchEvent( new window.Event( 'change' ) );
			expect( _i18n.setUserCountryCode ).toHaveBeenCalledWith( 'ca' );
			expect( _i18n.setUserCountryName ).toHaveBeenCalledWith( 'Canada' );
			expect( _tracking.track ).toHaveBeenCalledWith( 'gtm', {
				event: 'linkClick',
				ctaText: 'canada',
				ctaSection: 'header',
			} );
			expect( window.location ).toBe( 'https://www.freshbooks.com/en-ca/' ); // CA url.
		} );
	} );
} );
