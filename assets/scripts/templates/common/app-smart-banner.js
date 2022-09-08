/**
 * App Smart Banner.
 *
 * As of 24 March, 2022 we are moving dismissed flag from LocalStorage to cookies to be able read value serverside.
 * If you are reading this starging July, 2022 - please remove LocalStorage occurence here (line 19 to 22).
 */
import { readCookie, createCookie } from 'scripts/modules/_cookies';

const initAppSmartBanner = () => {
	const appSmartBanner = document.querySelector( '.app-smart-banner' );
	if ( ! appSmartBanner ) {
		return;
	}

	const isMobileAndroid =
		window.matchMedia( 'only screen and (max-width: 1280px)' ).matches &&
		/Android/i.test( window.navigator.userAgent );

	if ( window.localStorage.getItem( 'hasDismissedAndroidBanner' ) ) {
		window.localStorage.removeItem( 'hasDismissedAndroidBanner' );
		createCookie( 'hasDismissedAndroidBanner', true );
	}

	if ( ! isMobileAndroid || !! readCookie( 'hasDismissedAndroidBanner' ) ) {
		appSmartBanner.classList.add( 'd-none' );
		return;
	}

	const closeButton = appSmartBanner.querySelector( '.app-smart-banner__close' );
	if ( closeButton ) {
		closeButton.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			appSmartBanner.classList.add( 'd-none' );
			createCookie( 'hasDismissedAndroidBanner', true );
		} );
	}
};

document.addEventListener( 'DOMContentLoaded', initAppSmartBanner, false );
