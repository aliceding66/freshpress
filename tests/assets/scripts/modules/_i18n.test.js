/* eslint-env jest */

import * as _i18n from 'scripts/modules/_i18n';
import { readCookie } from 'scripts/modules/_cookies';

describe( 'modules/_i18n', () => {
	describe( 'getSiteCountryCode', () => {
		test( 'getSiteCountryCode function exists', () => {
			expect( typeof _i18n.getSiteCountryCode ).toBe( 'function' );
		} );
		test( 'getSiteCountryCode returns uppercase country code', () => {
			expect( _i18n.getSiteCountryCode() ).toBe( 'US' );
		} );
		test( 'getSiteCountryCode returns lowercase country code', () => {
			expect( _i18n.getSiteCountryCode( 'lower' ) ).toBe( 'us' );
		} );
		test( 'getSiteCountryCode returns lowercase non-US country code', () => {
			const pretest = _i18n.default.__get__( 'i18nVars' );
			_i18n.default.__set__( 'i18nVars', { siteCountryCode: 'GB' } );
			expect( _i18n.getSiteCountryCode( 'lower' ) ).toBe( 'gb' );
			_i18n.default.__set__( 'i18nVars', pretest );
		} );
	} );

	describe( 'getBillingCountryCode', () => {
		test( 'getBillingCountryCode function exists', () => {
			expect( typeof _i18n.getBillingCountryCode ).toBe( 'function' );
		} );
		test( 'getBillingCountryCode returns country code', () => {
			expect( _i18n.getBillingCountryCode() ).toBe( 'US' );
		} );
		test( 'getBillingCountryCode returns non-US country code', () => {
			const pretest = _i18n.default.__get__( 'i18nVars' );
			_i18n.default.__set__( 'i18nVars', { siteCountryCode: 'FR' } );
			expect( _i18n.getBillingCountryCode() ).toBe( 'FR' );
			_i18n.default.__set__( 'i18nVars', pretest );
		} );
	} );

	describe( 'getLanguage', () => {
		test( 'getLanguage function exists', () => {
			expect( typeof _i18n.getLanguage ).toBe( 'function' );
		} );
		test( 'getLanguage returns lowercase la', () => {
			expect( _i18n.getLanguage() ).toBe( 'en' );
		} );
		test( 'getLanguage returns non-en language code', () => {
			const pretest = _i18n.default.__get__( 'i18nVars' );
			_i18n.default.__set__( 'i18nVars', { siteLangCode: 'fr' } );
			expect( _i18n.getLanguage() ).toBe( 'fr' );
			_i18n.default.__set__( 'i18nVars', pretest );
		} );
	} );

	describe( 'getUserCountryCode', () => {
		test( 'getUserCountryCode function exists', () => {
			expect( typeof _i18n.getUserCountryCode ).toBe( 'function' );
		} );
		test( 'getUserCountryCode function returns default uppercase country code', () => {
			expect( _i18n.getUserCountryCode() ).toBe( 'US' );
		} );
		test( 'getUserCountryCode function returns default lowercase country code', () => {
			expect( _i18n.getUserCountryCode( 'lower' ) ).toBe( 'us' );
		} );
	} );

	describe( 'getSiteCountryCodes', () => {
		test( 'getSiteCountryCodes function exists', () => {
			expect( typeof _i18n.getSiteCountryCodes ).toBe( 'function' );
		} );
		test( 'getSiteCountryCodes function returns array', () => {
			expect( Array.isArray( _i18n.getSiteCountryCodes() ) ).toBe( true );
		} );
	} );

	describe( 'getSuggestedCountryCode', () => {
		test( 'getSuggestedCountryCode function exists', () => {
			expect( typeof _i18n.getSuggestedCountryCode ).toBe( 'function' );
		} );
		test( 'getSuggestedCountryCode function returns uppercase default country code', () => {
			expect( _i18n.getSuggestedCountryCode() ).toBe( 'US' );
		} );
	} );

	describe( 'getUserCountryName', () => {
		test( 'getUserCountryName function exists', () => {
			expect( typeof _i18n.getUserCountryName ).toBe( 'function' );
		} );
		test( 'getUserCountryName function returns default country name', () => {
			expect( _i18n.getUserCountryName() ).toBe( 'United States' );
		} );
	} );

	describe( 'getUserCurrencyCode', () => {
		test( 'getUserCurrencyCode function exists', () => {
			expect( typeof _i18n.getUserCurrencyCode ).toBe( 'function' );
		} );
		test( 'getUserCurrencyCode function returns default country currency code', () => {
			expect( _i18n.getUserCurrencyCode() ).toBe( 'USD' );
		} );
	} );

	describe( 'getUserRegionCode', () => {
		test( 'getUserRegionCode function exists', () => {
			expect( typeof _i18n.getUserRegionCode ).toBe( 'function' );
		} );
		test( 'getUserRegionCode function returns default language-country code', () => {
			expect( _i18n.getUserRegionCode() ).toBe( 'en-us' );
		} );
		test( 'getUserRegionCode function returns non-US language-country code based on both i18nVars and cookie', () => {
			const pretest = _i18n.default.__get__( 'i18nVars' );
			_i18n.default.__set__( 'i18nVars', { siteLangCode: 'fr' } );
			_i18n.setUserCountryCode( 'CA' );
			expect( readCookie( 'user-country-code' ) ).toBe( 'CA' );
			expect( _i18n.getUserRegionCode() ).toBe( 'fr-ca' );
			_i18n.default.__set__( 'i18nVars', pretest );
		} );
	} );

	describe( 'setUserCountryCode', () => {
		test( 'setUserCountryCode function exists', () => {
			expect( typeof _i18n.setUserCountryCode ).toBe( 'function' );
		} );
		test( 'setUserCountryCode function creates non-US user-country-code cookie', () => {
			_i18n.setUserCountryCode( 'gb' );
			expect( readCookie( 'user-country-code' ) ).toBe( 'GB' );
		} );
	} );

	describe( 'setUserCountryName', () => {
		test( 'setUserCountryName function exists', () => {
			expect( typeof _i18n.setUserCountryName ).toBe( 'function' );
		} );
		test( 'setUserCountryName function creates non-US user-country-name cookie', () => {
			_i18n.setUserCountryName( 'canada' );
			expect( readCookie( 'user-country-name' ) ).toBe( 'Canada' );
		} );
	} );

	describe( 'getAppCountryList', () => {
		test( 'getAppCountryList function exists', () => {
			expect( typeof _i18n.getAppCountryList ).toBe( 'function' );
		} );
		test( 'getAppCountryList function returns array', () => {
			expect( Array.isArray( _i18n.getAppCountryList() ) ).toBe( true );
		} );
		test( 'getAppCountryList function returns array containing non-US region code and name', () => {
			expect(
				_i18n.getAppCountryList().some( ( o ) => {
					return o.code === 'GB';
				} )
			).toBe( true );
			expect(
				_i18n.getAppCountryList().some( ( o ) => {
					return o.name === 'United Kingdom';
				} )
			).toBe( true );
		} );
	} );

	describe( 'getAppCountryCodes', () => {
		test( 'getAppCountryCodes function exists', () => {
			expect( typeof _i18n.getAppCountryCodes ).toBe( 'function' );
		} );
		test( 'getAppCountryCodes function returns array', () => {
			expect( Array.isArray( _i18n.getAppCountryCodes() ) ).toBe( true );
		} );
		test( 'getAppCountryCodes function returns array containing non-US country code', () => {
			expect( _i18n.getAppCountryCodes().includes( 'CA' ) ).toBe( true );
		} );
	} );

	describe( 'getAppCountryNames', () => {
		test( 'getAppCountryNames function exists', () => {
			expect( typeof _i18n.getAppCountryNames ).toBe( 'function' );
		} );
		test( 'getAppCountryNames function returns array', () => {
			expect( Array.isArray( _i18n.getAppCountryNames() ) ).toBe( true );
		} );
		test( 'getAppCountryNames function returns array containing non-US country code', () => {
			expect( _i18n.getAppCountryNames().includes( 'Canada' ) ).toBe( true );
		} );
	} );

	describe( 'setRegionCookies', () => {
		test( 'setRegionCookies function exists', () => {
			expect( typeof _i18n.setRegionCookies ).toBe( 'function' );
		} );
		test( 'setRegionCookies function creates a billing_country_code cookie', () => {
			const pretest = _i18n.default.__get__( 'i18nVars' );
			_i18n.default.__set__( 'i18nVars', { siteCountryCode: 'CA' } );
			_i18n.setRegionCookies();
			expect( readCookie( 'billing_country_code' ) ).toBe( 'CA' );
			_i18n.default.__set__( 'i18nVars', pretest );
		} );
	} );
} );
