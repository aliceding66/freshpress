/* eslint-env jest */

jest.mock( 'scripts/modules/_cookies', () => ( {
	...jest.requireActual( 'scripts/modules/_cookies' ),
	acceptCookiePolicy: jest.fn(),
	declineCookiePolicy: jest.fn(),
} ) );

import * as bannerCookieConsent from 'scripts/templates/common/banner-cookie-consent';
import * as _cookies from 'scripts/modules/_cookies';

let bannerCookieConsentWrapper,
	btnAccept,
	btnAcceptEventListener,
	btnReject,
	btnRejectEventListener;
const cookieName = `banner-cookie-consent-dismissed`;
const legacyCookieName = 'banner-cookie-policy-dismissed';
const policyDeclinedCookieName = 'cookies-declined';

describe( 'banner-cookie-consent.js', () => {
	describe( 'initializeCookieBanner', () => {
		test( 'initializeCookieBanner function exists', () => {
			expect( typeof bannerCookieConsent.default.__get__( 'initializeCookieBanner' ) ).toBe(
				'function'
			);
		} );

		test( 'initializeCookieBanner checks if show banner if all requirements are met', () => {
			[
				{
					cookieName: null,
					legacyCookieName: null,
					policyDeclinedCookieName: null,
					bannerIsShown: true,
				},
				{
					cookieName: 'true',
					legacyCookieName: null,
					policyDeclinedCookieName: null,
					bannerIsShown: false,
				},
				{
					cookieName: null,
					legacyCookieName: 'true',
					policyDeclinedCookieName: null,
					bannerIsShown: false,
				},
				{
					cookieName: 'true',
					legacyCookieName: 'true',
					policyDeclinedCookieName: null,
					bannerIsShown: false,
				},
				{
					cookieName: 'true',
					legacyCookieName: 'true',
					policyDeclinedCookieName: 'true',
					bannerIsShown: false,
				},
				{
					cookieName: 'true',
					legacyCookieName: 'true',
					policyDeclinedCookieName: 'false',
					bannerIsShown: false,
				},
			].forEach( ( caseData ) => {
				document.body.innerHTML = `
				<div class="banner-cookie-consent d-none">
					<button type="button" data-dismiss="modal" class="js-cookies-accept btn btn-cta-green w-50">I Accept</button>
					<a class="js-cookies-decline d-block mt-3" data-dismiss="modal" aria-label="Close">No, Thank You</a>
				</div>`;

				bannerCookieConsentWrapper = document.querySelector( '.banner-cookie-consent' );
				btnAccept = document.querySelector( '.js-cookies-accept' );
				btnAcceptEventListener = jest.spyOn( btnAccept, 'addEventListener' );
				btnReject = document.querySelector( '.js-cookies-decline' );
				btnRejectEventListener = jest.spyOn( btnReject, 'addEventListener' );
				document.cookie = '';

				if ( caseData.cookieName !== null ) {
					document.cookie += `${ cookieName }=${ caseData.cookieName };`;
				}
				if ( caseData.legacyCookieName !== null ) {
					document.cookie += `${ legacyCookieName }=${ caseData.legacyCookieName };`;
				}
				if ( caseData.policyDeclinedCookieName !== null ) {
					document.cookie += `${ policyDeclinedCookieName }=${ caseData.policyDeclinedCookieName };`;
				}

				document.dispatchEvent(
					new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
				);

				if ( caseData.bannerIsShown ) {
					// If banner was shown.
					expect( bannerCookieConsentWrapper.classList ).not.toContain( 'd-none' );
					expect( btnAcceptEventListener ).toHaveBeenCalledWith(
						'click',
						expect.any( Function )
					);
					expect( btnAcceptEventListener ).toHaveBeenCalledTimes( 1 );
					expect( btnRejectEventListener ).toHaveBeenCalledWith(
						'click',
						expect.any( Function )
					);
					expect( btnRejectEventListener ).toHaveBeenCalledTimes( 1 );

					// Test btn accept behaviour.
					btnAccept.click();
					expect( bannerCookieConsentWrapper.classList ).toContain( 'd-none' );
					expect( _cookies.acceptCookiePolicy ).toHaveBeenCalledTimes( 1 );

					// Test btn reject behaviour.
					document.cookie = '';
					bannerCookieConsentWrapper.classList.remove( 'd-none' );
					btnReject.click();
					expect( bannerCookieConsentWrapper.classList ).toContain( 'd-none' );
					expect( _cookies.declineCookiePolicy ).toHaveBeenCalledTimes( 1 );
				} else {
					expect( bannerCookieConsentWrapper.classList ).toContain( 'd-none' );
					expect( btnAcceptEventListener ).toHaveBeenCalledTimes( 0 );
					expect( btnRejectEventListener ).toHaveBeenCalledTimes( 0 );

					// Test btn accept behaviour.
					btnAccept.click();
					expect( _cookies.acceptCookiePolicy ).toHaveBeenCalledTimes( 0 );

					// Test btn reject behaviour.
					document.cookie = '';
					btnReject.click();
					expect( _cookies.declineCookiePolicy ).toHaveBeenCalledTimes( 0 );
				}

				btnAcceptEventListener.mockRestore();
				btnRejectEventListener.mockRestore();
				jest.resetAllMocks();
			} );
		} );
	} );
} );
