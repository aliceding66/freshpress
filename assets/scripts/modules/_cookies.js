/**
 * Cookies module.
 *
 * Uses js-cookie to manage cookies.
 */

import Cookies from 'js-cookie';
import { getDomainFromFQDN } from 'scripts/helpers/_utils';

/**
 * Set up cookie default parameters.
 *
 * @param {Object} [options={}] Options for setting default parameters. Supports `path` and `domain` params.
 */
export const initCookieDefaults = ( options = {} ) => {
	if ( 'string' === typeof options.path ) {
		Cookies.defaults.path = options.path;
	} else {
		Cookies.defaults.path = '/';
	}

	if ( 'string' === typeof options.domain ) {
		Cookies.defaults.domain = options.domain;
	} else if ( 'function' === typeof getDomainFromFQDN ) {
		Cookies.defaults.domain = getDomainFromFQDN( window.location.host );
	} else {
		Cookies.defaults.domain = window.location.host;
	}
};

/**
 * Sets a cookie value using the site defaults (path = /; domain = parent domain).
 *
 * @param {string} name Name of the cookie to be set.
 * @param {string} value Cookie value to be stored.
 * @param {number} days Number of days to set the cookie for.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */
export const createCookie = ( name, value, days, options = {} ) => {
	if ( ! Cookies.defaults || ! Cookies.defaults.path || ! Cookies.defaults.domain ) {
		initCookieDefaults();
	}

	if ( days ) {
		options.expires = days;
	}

	Cookies.set( name, value, options );
};

/**
 * Gets a cookie value by name.
 *
 * @param {string} name Name of the cookie to retrieve.
 * @return {string} Cookie value.
 */
export const readCookie = ( name ) => {
	if ( ! Cookies.defaults || ! Cookies.defaults.path || ! Cookies.defaults.domain ) {
		initCookieDefaults();
	}

	return Cookies.get( name );
};

/**
 * Removes a cookie by name.
 *
 * @param {string} name Name of the cookie to remove.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */
export const eraseCookie = ( name, options = {} ) => {
	if ( ! Cookies.defaults || ! Cookies.defaults.path || ! Cookies.defaults.domain ) {
		initCookieDefaults();
	}

	Cookies.remove( name, options );
};

/**
 * If a cookie is not already set, sets a cookie value using the site defaults (path = /; domain = parent domain).
 *
 * @param {string} name Name of the cookie to be set.
 * @param {string} value Cookie value to be stored.
 * @param {number} days Number of days to set the cookie for.
 * @param {Object} [options={}] Full options object for js-cookie if needed.
 */
export const createCookieIfMissing = ( name, value, days = null, options = {} ) => {
	if ( typeof readCookie( name ) === 'undefined' ) {
		createCookie( name, value, days, options );
	}
};

/**
 * Set a cookie denoting cookie policy accepted.
 *
 */
export const acceptCookiePolicy = () => {
	createCookie( 'cookies-declined', 'false', 365 );
};

/**
 * Set a cookie denoting cookie policy declined, and optionally redirect with DNT param.
 *
 * @param {Object} [options={redirect:true}] Optional params: redirect - Should the function redirect with the fb_dnt param.
 */
export const declineCookiePolicy = ( options = { redirect: true } ) => {
	createCookie( 'cookies-declined', 'true', 30 );
	if ( options.redirect ) {
		window.location.search = window.location.search
			? `${ window.location.search }&fb_dnt=1`
			: '?fb_dnt=1';
	}
};

/**
 * Is the cookie policy explicitly accepted.
 *
 * @return {boolean} Cookie policy accepted.
 */
export const isCookiePolicyAccepted = () => {
	return readCookie( 'cookies-declined' ) === 'false';
};

/**
 * Is the cookie policy explicitly declined.
 *
 * @return {boolean} Cookie policy declined.
 */
export const isCookiePolicyDeclined = () => {
	return readCookie( 'cookies-declined' ) === 'true';
};

/**
 * Initialize the cookie modal.
 */
export const initCookieModal = () => {
	const modalCookies = document.querySelector( '#modal-cookies' );

	if ( modalCookies ) {
		const cookieName = 'banner-cookie-consent-dismissed';
		const legacyCookieName = 'banner-cookie-policy-dismissed';
		const buttonAccept = modalCookies.querySelector( '.js-cookies-accept' );
		const buttonDecline = modalCookies.querySelector( '.js-cookies-decline' );

		if ( buttonAccept ) {
			buttonAccept.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				createCookie( cookieName, 'true', 365 );
				createCookie( legacyCookieName, 'true', 365 );
				$( modalCookies ).modal( 'hide' );
				acceptCookiePolicy();
			} );
		}

		if ( buttonDecline ) {
			buttonDecline.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				createCookie( cookieName, 'true', 30 );
				createCookie( legacyCookieName, 'true', 30 );
				$( modalCookies ).modal( 'hide' );
				declineCookiePolicy( { redirect: true } );
			} );
		}
	}
};

/**
 * Initialise tracking-related events.
 */
export const initCookiesModalListener = () => {
	const openCookiesModalTriggers = document.querySelectorAll( '.js-openCookieModal' );
	const modalCookies = document.querySelector( '#modal-cookies' );

	if ( openCookiesModalTriggers ) {
		openCookiesModalTriggers.forEach( ( openCookieModalItem ) => {
			openCookieModalItem.addEventListener( 'click', () => {
				$( modalCookies ).modal( 'show' );
			} );
		} );
	}
};
