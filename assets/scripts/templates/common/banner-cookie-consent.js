import {
	acceptCookiePolicy,
	createCookie,
	declineCookiePolicy,
	isCookiePolicyAccepted,
	isCookiePolicyDeclined,
	readCookie,
} from 'scripts/modules/_cookies';

const initializeCookieBanner = () => {
	const banner = document.querySelector( '.banner-cookie-consent' );
	const cookieName = `banner-cookie-consent-dismissed`;
	const legacyCookieName = 'banner-cookie-policy-dismissed';
	const btnAccept = banner.querySelector( '.js-cookies-accept' );
	const btnReject = banner.querySelector( '.js-cookies-decline' );

	if (
		! readCookie( cookieName ) &&
		! readCookie( legacyCookieName ) &&
		! ( isCookiePolicyAccepted() || isCookiePolicyDeclined() )
	) {
		banner.classList.remove( 'd-none' );

		btnAccept.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			createCookie( cookieName, 'true', 365 );
			createCookie( legacyCookieName, 'true', 365 );
			banner.classList.add( 'd-none' );
			acceptCookiePolicy();
		} );

		btnReject.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			createCookie( cookieName, 'true', 30 );
			createCookie( legacyCookieName, 'true', 30 );
			banner.classList.add( 'd-none' );
			declineCookiePolicy( { redirect: true } );
		} );
	}
};

document.addEventListener( 'DOMContentLoaded', initializeCookieBanner, false );
