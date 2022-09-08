/* eslint-env jest */

jest.mock( 'scripts/modules/_cookies', () => ( {
	createCookieIfMissing: jest.fn(),
	readCookie: jest.fn(),
} ) );

jest.mock( 'scripts/modules/_i18n', () => ( {
	getSuggestedCountryCode: jest.fn(),
} ) );

import * as _utils from 'scripts/helpers/_utils';
import * as _cookies from 'scripts/modules/_cookies';
import * as _i18n from 'scripts/modules/_i18n';

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
			at: {
				en: {
					active: 0,
					countryCode: 'at',
					countryName: 'Austria',
					fullCode: 'en-at',
					fullName: 'Austria (English)',
					langCode: 'at',
					langName: 'English',
					locale: 'en_AT',
					sitePaths: {
						home: '/en-at/',
						signup: '/en-at/signup',
						pricing: '/en-at/pricing',
					},
					transName: 'Austria (English)',
					url: 'https://www.freshbooks.com/en-at/',
				},
			},
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
			eu: {
				en: {
					active: 0,
					countryCode: 'eu',
					countryName: 'European Union',
					fullCode: 'en-eu',
					fullName: 'European Union (English)',
					langCode: 'en',
					langName: 'English',
					locale: 'en_EU',
					sitePaths: {
						home: '/en-eu/',
						signup: '/en-eu/signup',
						pricing: '/en-eu/pricing',
					},
					transName: 'European Union(English)',
					url: 'https://www.freshbooks.com/en-eu/',
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

const getAppendedToBodyDivWithClass = ( className ) => {
	const element = document.createElement( 'div' );
	element.setAttribute( 'class', className );
	document.body.appendChild( element );

	return element;
};

const getAppendedToElementLink = ( elementToAppend, href = '' ) => {
	const link = document.createElement( 'a' );
	link.setAttribute( 'href', href );
	link.setAttribute( 'rel', 'nofollow' );
	elementToAppend.appendChild( link );

	return link;
};

beforeEach( () => {
	document.body.innerHTML = '';
} );

describe( 'helpers/_utils', () => {
	describe( 'isNfbCustomer', () => {
		test( 'isNfbCustomer function exists', () => {
			expect( typeof _utils.isNfbCustomer ).toBe( 'function' );
		} );
	} );

	describe( 'initSmoothScroll', () => {
		test( 'initSmoothScroll function exists', () => {
			expect( typeof _utils.initSmoothScroll ).toBe( 'function' );
		} );

		test( 'initSmoothScroll assign click event only to valid <a> anchors', () => {
			const validAnchor = document.createElement( 'a' );
			validAnchor.setAttribute( 'href', '#target' );
			validAnchor.addEventListener = jest.fn().mockImplementation( ( event, callback ) => {
				callback();
			} );
			document.body.appendChild( validAnchor );

			_utils.initSmoothScroll();

			expect( validAnchor.addEventListener ).toBeCalledTimes( 1 );
			expect( validAnchor.addEventListener ).toHaveBeenLastCalledWith(
				'click',
				expect.any( Function ),
				false
			);
		} );

		test( 'initSmoothScroll is not assigning click event to empty <a> anchor', () => {
			const emptyAnchor = document.createElement( 'a' );
			emptyAnchor.setAttribute( 'href', '#' );
			emptyAnchor.addEventListener = jest.fn().mockImplementation( ( event, callback ) => {
				callback();
			} );
			document.body.appendChild( emptyAnchor );

			_utils.initSmoothScroll();

			expect( emptyAnchor.addEventListener ).toBeCalledTimes( 0 );
		} );
	} );

	describe( 'cleanupTelLinks', () => {
		test( 'cleanupTelLinks function exists', () => {
			expect( typeof _utils.cleanupTelLinks ).toBe( 'function' );
		} );

		const telHrefValue = 'tel:123456789';

		test( 'cleanupTelLinks remove tel href attribute on elements outside header', () => {
			const otherElement = getAppendedToBodyDivWithClass( 'some-other-element' );
			const telLink = getAppendedToElementLink( otherElement, telHrefValue );
			_utils.cleanupTelLinks();
			expect( telLink.getAttribute( 'href' ) ).toBeNull();
		} );

		test( 'cleanupTelLinks preserve tel href attribute on elements inside header', () => {
			const header = getAppendedToBodyDivWithClass( 'header' );
			const telLink = getAppendedToElementLink( header, telHrefValue );
			_utils.cleanupTelLinks();
			expect( telLink.getAttribute( 'href' ) ).toBe( telHrefValue );
		} );

		test( 'cleanupTelLinks preserve tel href attribute on integrations contact sidebar', () => {
			const integrationsSidebarContact = getAppendedToBodyDivWithClass(
				'integrations__sidebar-contact-info'
			);
			const telLink = getAppendedToElementLink( integrationsSidebarContact, telHrefValue );
			_utils.cleanupTelLinks();
			expect( telLink.getAttribute( 'href' ) ).toBe( telHrefValue );
		} );
	} );

	describe( 'getDomainFromFQDN', () => {
		test( 'getDomainFromFQDN function exists', () => {
			expect( typeof _utils.getDomainFromFQDN ).toBe( 'function' );
		} );

		test( 'getDomainFromFQDN gets only last 2 domain host items', () => {
			[
				{
					test: 'freshbooks.com',
					expected: 'freshbooks.com',
				},
				{
					test: 'www.freshbooks.com',
					expected: 'freshbooks.com',
				},
				{
					test: 'subdomain.freshbooks.com',
					expected: 'freshbooks.com',
				},
				{
					test: 'www.subomain.freshbooks.com',
					expected: 'freshbooks.com',
				},
			].forEach( ( testCase ) => {
				expect( _utils.getDomainFromFQDN( testCase.test ) ).toBe( testCase.expected );
			} );
		} );
	} );

	describe( 'isSameDomain', () => {
		test( 'isSameDomain function exists', () => {
			expect( typeof _utils.isSameDomain ).toBe( 'function' );
		} );

		test( 'isSameDomain properly matches freshbooks domain', () => {
			delete window.location;
			window.location = new URL( 'https://www.freshbooks.com' );

			[
				{
					test: 'https://freshbooks.com',
					expected: true,
				},
				{
					test: 'https://www.freshbooks.com',
					expected: true,
				},
				{
					test: 'https://freshbooks.io',
					expected: false,
				},
				{
					test: 'https://completelyanotherdomain.abc',
					expected: false,
				},
			].forEach( ( testCase ) => {
				expect( _utils.isSameDomain( testCase.test ) ).toBe( testCase.expected );
			} );
		} );

		test( 'isSameDomain return false for empty domain passed in', () => {
			expect( _utils.isSameDomain( '' ) ).toBeFalsy();
		} );

		test( 'isSameDomain return empty string if passed URL is not full URL', () => {
			// I'm not sure if this behaviour is valid, but I'm leaving that test to highlight how that function works.
			expect( _utils.isSameDomain( 'freshbooks.com' ) ).toBe( '' );
		} );
	} );

	describe( 'externalLinksPatcher', () => {
		test( 'externalLinksPatcher function exists', () => {
			expect( typeof _utils.externalLinksPatcher ).toBe( 'function' );
		} );

		delete window.location;
		window.location = new URL( 'https://www.freshbooks.com' );

		test( 'externalLinksPatcher process external links', () => {
			const links = [
				getAppendedToElementLink( document.body, 'https://freshbooks.io' ),
				getAppendedToElementLink( document.body, 'https://completelyanotherdomain.abc' ),
			];

			_utils.externalLinksPatcher();

			links.forEach( ( link ) => {
				expect( link.getAttribute( 'rel' ) ).toBe( '' );
				expect( link.getAttribute( 'target' ) ).toBe( '_blank' );
			} );
		} );

		test( 'externalLinksPatcher leaves freshbooks and tel/mail/javascript hrefs untouched', () => {
			const links = [
				getAppendedToElementLink( document.body, 'tel:123456789' ),
				getAppendedToElementLink( document.body, 'mailto:test@mail.com' ),
				getAppendedToElementLink( document.body, 'javascript:alert("Test")' ),
				getAppendedToElementLink( document.body, 'https://freshbooks.com/test-page' ),
			];

			_utils.externalLinksPatcher();

			links.forEach( ( link ) => {
				expect( link.getAttribute( 'rel' ) ).toBe( 'nofollow' );
				expect( link.getAttribute( 'target' ) ).toBeNull();
			} );
		} );

		test( 'externalLinksPatcher leaves empty hrefs and anchors untouched', () => {
			const links = [
				getAppendedToElementLink( document.body, '' ),
				getAppendedToElementLink( document.body, '#' ),
				getAppendedToElementLink( document.body, '#target' ),
			];

			_utils.externalLinksPatcher();

			links.forEach( ( link ) => {
				expect( link.getAttribute( 'rel' ) ).toBe( 'nofollow' );
				expect( link.getAttribute( 'target' ) ).toBeNull();
			} );
		} );
	} );

	describe( 'isValidSelector', () => {
		test( 'isValidSelector function exists', () => {
			expect( typeof _utils.isValidSelector ).toBe( 'function' );
		} );

		test( 'isValidSelector handles selectors correctly', () => {
			[
				{
					test: '#id-selector',
					expected: true,
				},
				{
					test: '.class-selector',
					expected: true,
				},
				{
					test: '[attribute-selector]',
					expected: true,
				},
				{
					test: '[attribute-selector="value"]',
					expected: true,
				},
				{
					test: 'node-selector',
					expected: true,
				},
				{
					test: '/regex-selector/',
					expected: false,
				},
				{
					test: '%wildcard-selector%',
					expected: false,
				},
			].forEach( ( caseData ) => {
				expect( _utils.isValidSelector( caseData.test ) ).toBe( caseData.expected );
			} );
		} );
	} );

	describe( 'replaceRegionalisedUrls', () => {
		test( 'replaceRegionalisedUrls function exists', () => {
			expect( typeof _utils.replaceRegionalisedUrls ).toBe( 'function' );
		} );

		test( 'replaceRegionalisedUrls adds proper country code to signup and pricing links', () => {
			[
				{
					test: {
						countryCode: 'US',
					},
					expected: {
						signupUrl: 'https://freshbooks.com/signup',
						pricingUrl: 'https://freshbooks.com/pricing',
					},
				},
				{
					test: {
						countryCode: 'CA',
					},
					expected: {
						signupUrl: 'https://freshbooks.com/en-ca/signup',
						pricingUrl: 'https://freshbooks.com/en-ca/pricing',
					},
				},
				{
					test: {
						countryCode: 'EU',
					},
					expected: {
						signupUrl: 'https://freshbooks.com/en-eu/signup',
						pricingUrl: 'https://freshbooks.com/en-eu/pricing',
					},
				},
				{
					test: {
						countryCode: 'AT', // Country within EU.
					},
					expected: {
						signupUrl: 'https://freshbooks.com/en-eu/signup',
						pricingUrl: 'https://freshbooks.com/en-eu/pricing',
					},
				},
			].forEach( ( caseData ) => {
				_cookies.readCookie.mockImplementationOnce( () => caseData.test.countryCode );
				_i18n.getSuggestedCountryCode.mockImplementationOnce( () =>
					caseData.test.countryCode.toLowerCase()
				);
				document.body.innerHTML = '';
				const signupLink = getAppendedToElementLink(
					document.body,
					'https://freshbooks.com/signup'
				);
				const pricingLink = getAppendedToElementLink(
					document.body,
					'https://freshbooks.com/pricing'
				);

				_utils.replaceRegionalisedUrls();

				expect( signupLink.getAttribute( 'href' ) ).toBe( caseData.expected.signupUrl );
				expect( pricingLink.getAttribute( 'href' ) ).toBe( caseData.expected.pricingUrl );
			} );
		} );
	} );

	describe( 'parseUrl', () => {
		test( 'parseUrl function exists', () => {
			expect( typeof _utils.parseUrl ).toBe( 'function' );
		} );

		[
			{
				test: 'https://example.com/',
				expected:
					'url=https://example.com/;query=;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test',
				expected:
					'url=https://example.com/test;query=;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: 'https://example.com/#ihaveahash',
				expected:
					'url=https://example.com/;query=;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test#ihaveahash',
				expected:
					'url=https://example.com/test;query=;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: 'https://example.com/?param1=abc',
				expected:
					'url=https://example.com/;query=param1=abc;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test?param1=abc',
				expected:
					'url=https://example.com/test;query=param1=abc;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: 'https://example.com/?param1=abc&param2=def',
				expected:
					'url=https://example.com/;query=param1=abc&param2=def;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test?param1=abc&param2=def',
				expected:
					'url=https://example.com/test;query=param1=abc&param2=def;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: 'https://example.com/?param1=abc#ihaveahash',
				expected:
					'url=https://example.com/;query=param1=abc;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test?param1=abc#ihaveahash',
				expected:
					'url=https://example.com/test;query=param1=abc;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: 'https://example.com/#ihaveahash?param1=abc',
				expected:
					'url=https://example.com/;query=;hash=ihaveahash?param1=abc;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: 'https://example.com/test#ihaveahash?param1=abc',
				expected:
					'url=https://example.com/test;query=;hash=ihaveahash?param1=abc;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/',
				expected:
					'url=https://example.com/;query=;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test',
				expected:
					'url=https://example.com/test;query=;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/#ihaveahash',
				expected:
					'url=https://example.com/;query=;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test#ihaveahash',
				expected:
					'url=https://example.com/test;query=;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/?param1=abc',
				expected:
					'url=https://example.com/;query=param1=abc;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test?param1=abc',
				expected:
					'url=https://example.com/test;query=param1=abc;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/?param1=abc&param2=def',
				expected:
					'url=https://example.com/;query=param1=abc&param2=def;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test?param1=abc&param2=def',
				expected:
					'url=https://example.com/test;query=param1=abc&param2=def;hash=;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/?param1=abc#ihaveahash',
				expected:
					'url=https://example.com/;query=param1=abc;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test?param1=abc#ihaveahash',
				expected:
					'url=https://example.com/test;query=param1=abc;hash=ihaveahash;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '//example.com/#ihaveahash?param1=abc',
				expected:
					'url=https://example.com/;query=;hash=ihaveahash?param1=abc;origin=https://example.com;protocol=https:;host=example.com;pathname=/',
			},
			{
				test: '//example.com/test#ihaveahash?param1=abc',
				expected:
					'url=https://example.com/test;query=;hash=ihaveahash?param1=abc;origin=https://example.com;protocol=https:;host=example.com;pathname=/test',
			},
			{
				test: '/',
				expected: 'url=/;query=;hash=;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test',
				expected: 'url=/test;query=;hash=;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '/#ihaveahash',
				expected: 'url=/;query=;hash=ihaveahash;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test#ihaveahash',
				expected: 'url=/test;query=;hash=ihaveahash;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '/?param1=abc',
				expected: 'url=/;query=param1=abc;hash=;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test?param1=abc',
				expected: 'url=/test;query=param1=abc;hash=;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '/?param1=abc&param2=def',
				expected:
					'url=/;query=param1=abc&param2=def;hash=;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test?param1=abc&param2=def',
				expected:
					'url=/test;query=param1=abc&param2=def;hash=;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '/?param1=abc#ihaveahash',
				expected:
					'url=/;query=param1=abc;hash=ihaveahash;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test?param1=abc#ihaveahash',
				expected:
					'url=/test;query=param1=abc;hash=ihaveahash;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '/#ihaveahash?param1=abc',
				expected:
					'url=/;query=;hash=ihaveahash?param1=abc;origin=;protocol=;host=;pathname=/',
			},
			{
				test: '/test#ihaveahash?param1=abc',
				expected:
					'url=/test;query=;hash=ihaveahash?param1=abc;origin=;protocol=;host=;pathname=/test',
			},
			{
				test: '?param1=abc&param2%26param3',
				expected:
					'url=;query=param1=abc&param2%26param3;hash=;origin=;protocol=;host=;pathname=',
			},
			{
				test: '?param1=abc&param2%3Ddef%26param3%3Dghi',
				expected:
					'url=;query=param1=abc&param2%3Ddef%26param3%3Dghi;hash=;origin=;protocol=;host=;pathname=',
			},
		].forEach( ( rulesTestData ) => {
			test( `parseUrl returns the right values for ${ rulesTestData.test }`, () => {
				expect(
					Object.entries( _utils.parseUrl( rulesTestData.test ) )
						.map( ( entry ) => entry.join( '=' ) )
						.join( ';' )
				).toBe( rulesTestData.expected );
			} );
		} );
	} );

	describe( 'parseQueryString', () => {
		test( 'parseQueryString function exists', () => {
			expect( typeof _utils.parseQueryString ).toBe( 'function' );
		} );

		[
			{
				test: '?param1=abc',
				expected: {
					param1: 'abc',
				},
			},
			{
				test: '?param1=abc&param2=123',
				expected: {
					param1: 'abc',
					param2: '123',
				},
			},
			{
				test: '/test?param1=abc&param2=123#ihaveahash',
				expected: {
					param1: 'abc',
					param2: '123',
				},
			},
			{
				test: '?param1=abc&param2%26param3',
				expected: {
					param1: 'abc',
					'param2&param3': '',
				},
			},
			{
				test: '?param1=abc&param2%3Ddef%26param3%3Dghi',
				expected: {
					param1: 'abc',
					'param2=def&param3=ghi': '',
				},
			},
		].forEach( ( rulesTestData ) => {
			test( `parseQueryString returns the right values for ${ rulesTestData.test }`, () => {
				expect( _utils.parseQueryString( rulesTestData.test ) ).toEqual(
					rulesTestData.expected
				);
			} );
		} );
	} );

	describe( 'setTrialLengthCookie', () => {
		test( 'setTrialLengthCookie function exists', () => {
			expect( typeof _utils.setTrialLengthCookie ).toBe( 'function' );
		} );

		test( 'setTrialLengthCookie set proper cookie if body has data-tl attribute', () => {
			_utils.setTrialLengthCookie();
			expect( _cookies.createCookieIfMissing ).toBeCalledTimes( 0 );

			document.body.setAttribute( 'data-tl', '123456' );
			_utils.setTrialLengthCookie();
			expect( _cookies.createCookieIfMissing ).toBeCalledTimes( 1 );
		} );
	} );
} );
