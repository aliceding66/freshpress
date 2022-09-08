/* eslint-env jest */

jest.mock( 'scripts/modules/_cookies', () => {
	const original = jest.requireActual( 'scripts/modules/_cookies' );
	return {
		__esModule: true,
		...original,
		createCookie: jest.fn(),
		readCookie: jest.fn(),
	};
} );

import * as appSmartBanner from 'scripts/templates/common/app-smart-banner';
import * as cookie from 'scripts/modules/_cookies';

jest.spyOn( cookie, 'createCookie' );
jest.spyOn( cookie, 'readCookie' );

let appSmartBannerWrapper, closeBtn, closeBtnEventListener;
beforeAll( () => {
	Object.defineProperty( window, 'matchMedia', {
		writable: true,
		value: ( query ) => ( {
			matches: true,
			media: query,
			onchange: null,
			addListener: jest.fn(), // Deprecated
			removeListener: jest.fn(), // Deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		} ),
	} );

	Object.defineProperty( window.navigator, 'userAgent', { writable: true, value: 'Android' } );
} );

beforeEach( () => {
	document.body.innerHTML = `
	<div class="app-smart-banner">
		<div class="app-smart-banner__close"></div>
		<div class="app-smart-banner__container">
			Some content
		</div>
	</div>
`;

	appSmartBannerWrapper = document.querySelector( '.app-smart-banner' );
	closeBtn = document.querySelector( '.app-smart-banner__close' );
	closeBtnEventListener = jest.spyOn( closeBtn, 'addEventListener' );
} );

afterEach( () => {
	closeBtnEventListener.mockRestore();
	jest.resetAllMocks();
} );

describe( 'app-smart-banner.js', () => {
	describe( 'initAppSmartBanner', () => {
		test( 'initAppSmartBanner function exists', () => {
			expect( typeof appSmartBanner.default.__get__( 'initAppSmartBanner' ) ).toBe(
				'function'
			);
		} );

		test( 'initAppSmartBanner shows banner for Android', () => {
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			expect( appSmartBannerWrapper.classList ).not.toContain( 'd-none' );
			expect( closeBtnEventListener ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
			expect( closeBtnEventListener ).toHaveBeenCalledTimes( 1 );

			closeBtn.click();

			expect( cookie.createCookie ).toHaveBeenCalledWith( 'hasDismissedAndroidBanner', true );
			expect( cookie.createCookie ).toHaveBeenCalledTimes( 1 );
		} );

		test( "initAppSmartBanner doesn't show banner for Android if exists hasDismissedAndroidBanner value in Cookies", () => {
			cookie.readCookie.mockImplementationOnce( ( key ) => {
				if ( key === 'hasDismissedAndroidBanner' ) {
					return true;
				}

				return false;
			} );

			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			expect( appSmartBannerWrapper.classList ).toContain( 'd-none' );
			closeBtn.click();
			expect( cookie.createCookie ).toHaveBeenCalledTimes( 0 );
		} );

		test( "initAppSmartBanner doesn't banner for other OSes then Android", () => {
			[
				{
					os: 'IOS',
				},
				{
					os: 'WinPhone',
				},
				{
					os: 'Wearable',
				},
				{
					os: 'Linux',
				},
			].forEach( ( deviceData ) => {
				window.navigator.userAgent = deviceData;

				document.dispatchEvent(
					new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
				);

				expect( appSmartBannerWrapper.classList ).toContain( 'd-none' );
				closeBtn.click();
				expect( cookie.createCookie ).toHaveBeenCalledTimes( 0 );
			} );
		} );
	} );
} );
