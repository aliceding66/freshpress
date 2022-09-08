/**
 * Utility helpers.
 */

import smoothscroll from 'smoothscroll-polyfill';
import { readCookie, createCookieIfMissing } from 'scripts/modules/_cookies';
import { getDataAttr } from 'scripts/helpers/_attributes';
import { getSuggestedCountryCode } from 'scripts/modules/_i18n';
import { addEventListeners } from 'scripts/helpers/_events';
import * as defaultUe from '../../../site-options/04-languages.json';

/**
 * Check if user is logged in as existing NFB client.
 *
 * @return {string} smux_login cookie value
 */
export const isNfbCustomer = () => {
	return readCookie( 'smux_login' );
};

/**
 * Adds a polyfill if needed for scroll-behaviour: smooth and anchor scrolling.
 *
 * @param {number} additionalOffset Additional offset.
 */
export const initSmoothScroll = ( additionalOffset = 0 ) => {
	// Polyfill is mostly needed for all versions of Safari.
	smoothscroll.polyfill();

	const scrollAnchors = document.querySelectorAll(
		'a[href^="#"]:not( [href="#"] ),[data-scroll-target]'
	);

	if ( scrollAnchors ) {
		scrollAnchors.forEach( ( anchor ) => {
			anchor.addEventListener(
				'click',
				( e ) => {
					const selector = getDataAttr( anchor, 'scroll-target' ) || anchor.hash;
					if ( isValidSelector( selector ) ) {
						const target = document.querySelector( selector );
						const header = document.querySelector( 'header' );
						if ( target?.getBoundingClientRect ) {
							e.preventDefault();
							let offset = 0;
							if ( header?.getBoundingClientRect ) {
								offset = parseInt( header.getBoundingClientRect().height );
							}
							window.scrollTo( {
								top:
									parseInt( target.getBoundingClientRect().top ) +
									parseInt( window.scrollY ) -
									offset -
									additionalOffset,
								behavior: 'smooth',
							} );
						}
					}
				},
				false
			);
		} );
	}
};

/**
 * Remove href attributes from tel: protocol links on desktop (except inside the header).
 */
export const cleanupTelLinks = () => {
	if (
		! (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				window.navigator.userAgent
			) && window.matchMedia( 'only screen and (max-width: 853px)' ).matches
		)
	) {
		const telLinks = document.querySelectorAll( '[href^="tel:"]' );

		if ( telLinks ) {
			telLinks.forEach( ( el ) => {
				if (
					! el.closest( '.header' ) &&
					! el.closest( '.integrations__sidebar-contact-info' ) &&
					! el.closest( '.pricing-modal' )
				) {
					el.removeAttribute( 'href' );
				}
			} );
		}
	}
};

/**
 * Get domain portion from FQDN.
 *
 * @param {string} fqdn
 */
export const getDomainFromFQDN = ( fqdn ) => {
	if ( ! fqdn ) {
		return '';
	}

	const domainParts = fqdn.split( '.' );
	return domainParts.slice( domainParts.length - 2 ).join( '.' );
};

/**
 * Check if a provided url is for the same parent domain (e.g., my.freshbooks.com and www.freshbooks.com).
 *
 * @param {string} url
 */
export const isSameDomain = ( url ) => {
	if ( ! url ) {
		return false;
	}

	const { host } = parseUrl( url );

	return host && getDomainFromFQDN( host ) === getDomainFromFQDN( window.location.host );
};

/**
 * Open external links in a new tab/window and remove the nofollow tag if present.
 */
export const externalLinksPatcher = () => {
	Array.from( document.querySelectorAll( 'a' ) )
		.filter( ( a ) => {
			return (
				a.href &&
				! /^(?:tel:|mailto:|javascript:|https?:\/\/(?:[^.]*\.)?(?:freshbooks\.com|[^.]*\.freshenv\.com))/.test(
					a.href
				) &&
				a.host &&
				getDomainFromFQDN( a.host ) !== getDomainFromFQDN( window.location.host )
			);
		} )
		.forEach( ( link ) => {
			link.setAttribute( 'target', '_blank' );
			link.rel = link.rel.replace( / *nofollow */, '' );
		} );
};

/**
 * Add/remove a class (stuck) to an element with class sticky-top on event at which element sticks.
 * Refer to https://developers.google.com/web/updates/2017/09/sticky-headers.
 */
export const addStickyTopObserver = () => {
	const stickyTopEls = document.querySelectorAll( '.sticky-top' );
	if ( stickyTopEls.length ) {
		stickyTopEls.forEach( ( element ) => {
			const computedStyles = window.getComputedStyle( element );
			const sentinel = document.createElement( 'span' );
			sentinel.classList.add( 'sentinel' );
			sentinel.style = `
				position: absolute;
				top: -${ computedStyles.top || '0' };
				left: 0;
				right: 0;
				z-index: -1;
			`;
			element.parentElement.insertBefore( sentinel, element );
			new window.IntersectionObserver( function ( entries ) {
				entries.forEach( ( entry ) => {
					if ( entry.intersectionRatio === 0 ) {
						entry.target.nextElementSibling.classList.add( 'stuck' );
					} else {
						entry.target.nextElementSibling.classList.remove( 'stuck' );
					}
				} );
			} ).observe( sentinel );
		} );
	}
};

/**
 * Add/remove a class (stuck) to an element with class sticky-bottom by tracking the position of
 * sentinel inserted before sticky element.
 */
export const addStickyBottomObserver = () => {
	const stickyBottomEls = document.querySelectorAll( '.sticky-bottom' );
	if ( stickyBottomEls ) {
		stickyBottomEls.forEach( ( element ) => {
			// Sentinel.
			const sentinel = document.createElement( 'span' );
			sentinel.classList.add( 'sentinel' );
			element.parentElement.insertBefore( sentinel, element );

			const addRemoveStuckClass = () => {
				if ( ! element.classList.contains( 'sticky-bottom' ) ) {
					return false;
				}
				const isBefore =
					window.pageYOffset + window.innerHeight <
					sentinel.offsetTop + element.clientHeight;
				if ( ! isBefore && element.classList.contains( 'stuck' ) ) {
					element.classList.remove( 'stuck' );
				} else if ( isBefore && ! element.classList.contains( 'stuck' ) ) {
					element.classList.add( 'stuck' );
				}
			};
			// Scrolling past the sentinel position plus height of the sticky element.
			addEventListeners( window, 'load scroll', addRemoveStuckClass );
		} );
	}
};

/**
 * Test a CSS selector to check it won't throw client-side exceptions.
 *
 * @param {string} selector CSS selector to test for validity.
 */
export const isValidSelector = ( selector ) => {
	try {
		document.createDocumentFragment().querySelector( selector );
	} catch {
		return false;
	}
	return true;
};

/**
 * Find all signup and pricing links and replace their urls based on user's location.
 */
export const replaceRegionalisedUrls = () => {
	const euDefaultFor = defaultUe.eu_default_for;
	const euDefaultCountryCode = 'eu';
	const countryCodeCookie = readCookie( 'user-country-code' ).toLowerCase();

	if ( window.fbVars && window.fbVars.i18n ) {
		const { supportedRegions, siteLangCode } = window.fbVars.i18n;
		let countryCode = getSuggestedCountryCode( 'lower' );

		if ( euDefaultFor.includes( `en-${ countryCodeCookie }` ) ) {
			countryCode = euDefaultCountryCode;
		}

		if (
			supportedRegions &&
			supportedRegions[ countryCode ] &&
			Object.keys( supportedRegions[ countryCode ] ).length > 0
		) {
			const targetRegion = supportedRegions[ countryCode ][ siteLangCode ]
				? supportedRegions[ countryCode ][ siteLangCode ]
				: supportedRegions[ countryCode ][
						Object.keys( supportedRegions[ countryCode ] )[ 0 ]
				  ];

			const targetSignupLink =
				targetRegion && targetRegion.sitePaths && targetRegion.sitePaths.signup;
			const targetPricingLink =
				targetRegion && targetRegion.sitePaths && targetRegion.sitePaths.pricing;

			if ( targetSignupLink ) {
				const signupLinks = document.querySelectorAll(
					'[href*="/signup"]:not([href*="my."]):not([href*="direct-buy"])'
				);

				signupLinks.forEach( ( link ) => {
					if ( link.pathname !== targetRegion.sitePaths.signup ) {
						link.pathname = targetRegion.sitePaths.signup;
					}
				} );
			}

			if ( targetPricingLink ) {
				const pricingLinks = document.querySelectorAll(
					'[href*="/pricing"]:not([class*="region"])'
				);

				pricingLinks.forEach( ( link ) => {
					if ( link.pathname !== targetRegion.sitePaths.pricing ) {
						link.pathname = targetRegion.sitePaths.pricing;
					}
				} );
			}
		}
	}
};

/**
 * Parse a URL into parts.
 *
 * @param  {string} input URL to parse
 * @return {Object} Parsed URL parts
 */
export const parseUrl = ( input = '' ) => {
	const output = {
		url: '',
		query: '',
		hash: '',
		origin: '',
		protocol: '',
		host: '',
		pathname: '',
	};

	if ( typeof input === 'string' && input ) {
		[ output.url, output.hash ] = input.split( '#', 2 );
		[ output.url, output.query ] = output.url.split( '?', 2 );

		const urlParts = /^(https?:)?(\/\/[^/]+)?(\/.*)?$/.exec( output.url );
		if ( urlParts && urlParts.length === 4 ) {
			[ , output.protocol, output.host, output.pathname ] = urlParts;

			if ( output.host ) {
				output.host = output.host.replace( '//', '' );

				if ( ! output.protocol ) {
					output.protocol = window.location.protocol;
					output.url = `${ output.protocol }${ output.url }`;
				}

				output.origin = `${ output.protocol }//${ output.host }`;
			}
		}

		Object.keys( output ).forEach( ( key ) => {
			if ( typeof output[ key ] === 'undefined' ) {
				output[ key ] = '';
			}
		} );
	}

	return output;
};

/**
 * Parse a query string into parameters.
 *
 * @param {string}  input         Query string or URL
 * @param {boolean} [decode=true] Should the parameter values be URI decoded?
 * @return {Object} Parsed query string parameters
 */
export const parseQueryString = ( input, decode = true ) => {
	const output = {};

	if ( typeof input === 'string' && input ) {
		const params = parseUrl( input ).query.split( '&' );

		if ( params && params.length ) {
			params.forEach( ( param ) => {
				const parts = param
					.split( '=', 2 )
					.map( ( p ) => ( decode ? decodeURIComponent( p ) : p ) );

				if ( parts.length === 2 ) {
					output[ parts[ 0 ] ] = parts[ 1 ];
				} else {
					output[ parts[ 0 ] ] = '';
				}
			} );
		}
	}

	return output;
};

/**
 * Set Trial Length cookie.
 */
export const setTrialLengthCookie = () => {
	const trialLength = document.body.dataset.tl;

	if ( trialLength ) {
		createCookieIfMissing( 'fb_web_promo', `lp${ trialLength }` );
	}
};

/**
 * Init links that open modals.
 */
export const initOpenModalLinks = () => {
	const buttonsWithModals = document.querySelectorAll( 'a[target="modal"]' );

	if ( buttonsWithModals.length > 0 ) {
		buttonsWithModals.forEach( ( buttonWithModal ) => {
			buttonWithModal.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				// eslint-disable-next-line no-undef
				$( buttonWithModal.getAttribute( 'href' ) ).modal( 'show' );
			} );
		} );
	}
};
