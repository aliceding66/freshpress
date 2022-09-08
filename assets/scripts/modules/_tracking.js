/**
 * Tracking module.
 */

import uuidv4 from 'uuid/dist/v4';
import {
	createCookie,
	createCookieIfMissing,
	isCookiePolicyDeclined,
	readCookie,
} from 'scripts/modules/_cookies';
import { getLanguage, getSiteCountryCode } from 'scripts/modules/_i18n';
import { addEventListeners } from 'scripts/helpers/_events';
import { isSameDomain, parseQueryString } from 'scripts/helpers/_utils';

/**
 * Gets the provider object by name.
 *
 * @param {string} provider Name of provider to retrieve.
 * @return {Object|null} The tracking provider object in use.
 */
const getTracker = ( provider ) => {
	let tracker = null;

	if ( typeof provider === 'string' ) {
		const providerKey = provider.toLowerCase();
		if ( providerKey === 'datalayer' || providerKey === 'gtm' ) {
			tracker = window.dataLayer;
		} else if ( providerKey === 'optimizely' ) {
			tracker = window.optimizely;
		}
	}

	return tracker;
};

/**
 * Track some data with a tracking provider.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {Object} data     Data to be tracked.
 * @param {string} fn       Provider function used for tracking. Defaults to 'push'.
 */
export const track = ( provider, data, fn = 'push' ) => {
	if ( data && provider ) {
		const tracker = getTracker( provider );

		if ( tracker && typeof tracker[ fn ] === 'function' ) {
			tracker[ fn ]( data );
		}
	}
};

/**
 * Track an event with a tracking provider.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {string} name     Name of the event to track.
 * @param {string} fn       Provider function used for tracking.
 */
export const trackEvent = ( provider, name, fn ) => {
	if ( provider === 'optimizely' ) {
		track( provider, { type: 'event', eventName: name }, fn );
	} else {
		track( provider, { event: name }, fn );
	}
};

/**
 * Test if a provider is active by looking for its presence in the window object, and then
 * checking if the function/variable specified is defined.
 *
 * @param {string} provider Tracking provider - should probably be 'gtm' or 'optimizely'.
 * @param {string} test     Function or variable name to test for. Defaults to 'push'.
 * @return {boolean} Is tracking provider active.
 */
export const isProviderActive = ( provider, test = 'push' ) => {
	let active = false;

	if ( provider ) {
		const tracker = getTracker( provider );

		active = tracker && typeof tracker[ test ] !== 'undefined';
	}

	return active;
};

/**
 * Get the cookie fb_visitor_id, if not already set, create a v4 UUID and set the cookie.
 */
export const getVisitorId = () => {
	let visitorId = readCookie( 'fb_visitor_id' );

	if ( ! visitorId ) {
		visitorId = uuidv4();
		createCookie( 'fb_visitor_id', visitorId, 365 );
	}

	return visitorId;
};

/**
 * DataLayer global init.
 */
export const setGlobalDataLayer = () => {
	track( 'gtm', {
		accountid: undefined,
		customerType: undefined,
		user_role: undefined,
		classic_or_nfb: undefined,
		plan_name: undefined,
		identity_id: undefined,
		business_id: undefined,
		visitorId: getVisitorId(),
		visitor_country: getSiteCountryCode(),
		visitor_language: getLanguage(),
	} );
};

/**
 * Tracks all CTAs on a page.
 */
export const addLinkTracking = () => {
	const trackableEntities = document.querySelectorAll( '.btn-cta-green, .btn-white, a, button' );

	trackableEntities.forEach( ( entity ) => {
		if (
			entity &&
			( entity.closest( 'div[data-cta-section]' ) || entity.closest( 'a[data-cta-section]' ) )
		) {
			return false;
		}
		let event = 'linkClick';
		if (
			entity.classList.contains( 'btn-cta-green' ) ||
			entity.classList.contains( 'btn-white' ) ||
			entity.classList.contains( 'btn-outline-grey' )
		) {
			event = 'ctaClick';
		}

		const ctaContainer = entity.closest( '.fp-block' );
		if ( ctaContainer ) {
			const blockClassList = Array.from( ctaContainer.classList );
			let ctaSection;

			if ( blockClassList ) {
				blockClassList.forEach( ( className ) => {
					if ( className.indexOf( 'trackingSection-' ) === 0 ) {
						ctaSection = className.replace( 'trackingSection-', '' );
					}
				} );
			}

			addEventListeners( entity, 'click mousedown', ( e ) => {
				// Make sure a click event doesn't trigger twice.
				if ( e.type === 'click' || ( e.button && [ 1, 2 ].includes( e.button ) ) ) {
					let ctaText = entity.innerText.replace( /\s/g, '' ).toLowerCase();

					if ( entity.contains( entity.querySelector( 'img' ) ) ) {
						ctaText = 'Image alt tag not present';
						if ( entity.querySelector( 'img' ).getAttribute( 'alt' ) !== '' ) {
							ctaText = entity.querySelector( 'img' ).getAttribute( 'alt' );
						}
					}

					track( 'gtm', { event, ctaText, ctaSection } );
				}
			} );
		}
	} );
};

/**
 * Set core attribution tracking cookies.
 *
 * @param {number|Date} expiry When should the cookies expire.
 */
const setCoreCookies = ( expiry = 30 ) => {
	const landingTime = new Date().toISOString().replace( /^([\d-]+)T([\d:]+).*Z$/, '$1+$2' );

	createCookieIfMissing( 'fb_landing_time', landingTime, expiry );
	createCookieIfMissing( 'fb_landtime', landingTime, expiry );
	createCookieIfMissing( 'fb_landing_url', window.location.href, expiry );
	createCookieIfMissing( 'fb_entrypage', window.location.pathname, expiry );

	if ( document.referrer ) {
		createCookieIfMissing( 'fb_referring_url', document.referrer, expiry );
		createCookieIfMissing( 'fb_referrer', document.referrer, expiry );
	}
};

/**
 * Set parameter based attribution tracking cookies (e.g., fb_referral_id).
 *
 * @param {Object} params Parameters used for setting attribution cookies.
 * @param {number|Date} expiry When should the cookies expire.
 */
const setParamCookies = ( params = {}, expiry = 30 ) => {
	const cookies = {};

	if ( params.ref ) {
		cookies.fb_referral_id = params.ref;
		cookies.cookie_referral = params.ref;
		cookies.cookie_referral_type = params.reftype;
		cookies.cookie_referral_params = decodeURIComponent(
			window.location.search.replace( /^\?/, '' )
		);
		cookies.referral_present = true;

		const existingCookieReferral = readCookie( 'cookie_referral' );
		if ( existingCookieReferral && ! readCookie( 'initial_cookie_referral' ) ) {
			cookies.initial_cookie_referral = existingCookieReferral;
		}

		if ( params.fb_source ) {
			cookies.cookie_referral_source = params.fb_source;
		}
	}

	if ( params.ref_systemid ) {
		cookies.cookie_referral_systemid = params.ref_systemid;
	}

	if ( params.c1 && params.source && params.kw ) {
		cookies.referral_present = true;

		const existingCookieC1 = readCookie( 'cookie_c1' );
		const existingCookieSource = readCookie( 'cookie_source' );
		const existingCookieKw = readCookie( 'cookie_kw' );
		const existingCookieTime = readCookie( 'cookie_time' );

		if (
			existingCookieC1 &&
			existingCookieSource &&
			existingCookieKw &&
			existingCookieTime &&
			! readCookie( 'initial_cookie_c1' ) &&
			! readCookie( 'initial_cookie_source' ) &&
			! readCookie( 'initial_cookie_time' )
		) {
			cookies.initial_cookie_c1 = existingCookieC1;
			cookies.initial_cookie_source = existingCookieSource;
			cookies.initial_cookie_kw = existingCookieKw;
			cookies.initial_cookie_time = existingCookieTime;
		}

		cookies.cookie_c1 = params.c1;
		cookies.cookie_source = params.source;
		cookies.cookie_kw = params.kw;
		cookies.cookie_time = Math.floor( Date.now() / 1000 );
	}

	Object.keys( cookies ).forEach( ( name ) => {
		if ( cookies[ name ] ) {
			createCookie( name, cookies[ name ], expiry );
		}
	} );
};

/**
 * Initialise our attribution tracking logic.
 */
export const initAttributionTracking = () => {
	if ( ! isCookiePolicyDeclined() ) {
		const now = new Date();
		const expiry = new Date( now.getTime() + 24 * 60 * 60 * 1000 * 30 );
		const params = parseQueryString( window.location.search );
		const existingLandingUrl = readCookie( 'fb_landing_url' );
		const existingLandingParams = parseQueryString( existingLandingUrl );

		const noNewRef = ! params.ref && existingLandingParams.ref;
		const preserveRef =
			existingLandingUrl &&
			isSameDomain( document.referrer || '' ) &&
			( ! params.ref || existingLandingParams.ref === params.ref );

		if ( ! noNewRef && ! preserveRef ) {
			setCoreCookies( expiry );
		}

		if ( params ) {
			setParamCookies( params, expiry );
		}
	}
};
