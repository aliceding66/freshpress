/* eslint-env jest */

import * as regionSelectionFooter from 'scripts/templates/common/region-selection-footer';
import path from 'path';
import fs from 'fs';

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

let countrySelector, countryModal, languageSelector, languageModal;
beforeEach( () => {
	document.body.innerHTML = fs.readFileSync(
		path.resolve( __dirname, 'region-selection-footer.test.html' ),
		'utf8'
	);

	countrySelector = document.querySelector( '.region-select' );
	countryModal = document.querySelector( '.modal__region' );
	languageSelector = document.querySelector( '.language-select' );
	languageModal = document.querySelector( '.modal__language' );
} );

afterEach( () => {
	document.cookie = '';
	document.body.innerHTML = '';

	jest.clearAllMocks();
} );

describe( 'region-selection-footer.js', () => {
	describe( 'modalAction', () => {
		test( 'modalAction function exists', () => {
			expect( typeof regionSelectionFooter.default.__get__( 'modalAction' ) ).toBe(
				'function'
			);
		} );

		test( 'modalAction is adding proper click event that shows corresponding modal', () => {
			// Preparation.
			const countrySelectorSpy = jest.spyOn( countrySelector, 'addEventListener' );
			const languageSelectorSpy = jest.spyOn( languageSelector, 'addEventListener' );

			// Call function.
			regionSelectionFooter.initRSFooter();

			// Test expectations.
			// Country selector modal is showing.
			expect( countrySelectorSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( countrySelector.classList ).not.toContain( 'expanded' );
			expect( countryModal.classList ).toContain( 'd-none' );
			countrySelector.click();
			expect( countrySelector.classList ).toContain( 'expanded' );
			expect( countryModal.classList ).not.toContain( 'd-none' );

			// Language selector modal is showing.
			expect( languageSelectorSpy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( languageSelector.classList ).not.toContain( 'expanded' );
			expect( languageModal.classList ).toContain( 'd-none' );
			languageSelector.click();
			expect( languageSelector.classList ).toContain( 'expanded' );
			expect( languageModal.classList ).not.toContain( 'd-none' );

			// Country selector modal is dismissed after showing language modal.
			expect( countrySelector.classList ).not.toContain( 'expanded' );
			expect( countryModal.classList ).toContain( 'd-none' );
		} );
	} );

	describe( 'initRSFooter', () => {
		test( 'initRSFooter function exists', () => {
			expect( typeof regionSelectionFooter.initRSFooter ).toBe( 'function' );
		} );

		test( 'initRSFooter is closing modal on resize', () => {
			// Call function.
			regionSelectionFooter.initRSFooter();

			// Test expectations.
			countrySelector.click(); // Open country modal.
			expect( countryModal.classList ).not.toContain( 'd-none' );
			global.dispatchEvent( new window.Event( 'resize' ) );
			expect( countryModal.classList ).toContain( 'd-none' );
		} );

		test( 'initRSFooter is closing language modal on region select', () => {
			// Call function.
			regionSelectionFooter.initRSFooter();

			// Test expectations.
			languageSelector.click(); // Open language modal.
			expect( languageModal.classList ).not.toContain( 'd-none' );
			countryModal.querySelector( '.region[data-country-code="ca"]' ).click();
			expect( languageModal.classList ).toContain( 'd-none' );
		} );
	} );
} );
