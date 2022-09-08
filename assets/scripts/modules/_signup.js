/**
 * Signup module.
 */

import { isCookiePolicyAccepted, acceptCookiePolicy, readCookie } from 'scripts/modules/_cookies';
import { getFieldValue } from 'scripts/modules/_forms';
import {
	getBillingCountryCode,
	getUserCountryName,
	getUserCurrencyCode,
	getLanguage,
} from 'scripts/modules/_i18n';
import { getAttrOrData } from 'scripts/helpers/_attributes';
import { getVisitorId, track, trackEvent } from 'scripts/modules/_tracking';
import 'bootstrap/js/dist/modal';

/**
 * Set parameters for a signup request, and process the response.
 *
 * @param {Object} form Form object which is being submitted from.
 */
export const handleSignup = ( form ) => {
	if ( signupCookiesAccepted() ) {
		const action = getAttrOrData( form, 'action' );
		let referralId = null;
		if ( readCookie( 'fb_landing_url' ) !== null ) {
			const referralCookie = decodeURIComponent( readCookie( 'fb_landing_url' ) ).match(
				'[?&]ref=([^&#]*)'
			);

			if ( referralCookie && referralCookie.length ) {
				[ , referralId ] = referralCookie;
			}
		}
		const formData = {
			id: getFieldValue( form.email ),
			email: getFieldValue( form.email ),
			password: getFieldValue( form.password ),
			landing_url: decodeURIComponent( readCookie( 'fb_landing_url' ) ),
			provisioner: 'magnum',
			send_confirmation_notification: true,
			visitor_id: getVisitorId(),
			access_token: null,
			capacity: null,
			billing_country_code: getBillingCountryCode(),
			country: getUserCountryName(),
			currencyCode: getUserCurrencyCode(),
			language: getLanguage(),
			optimizely_buckets: readCookie( 'optimizely_buckets' ),
			optimizely_user_id: readCookie( 'optimizely_user_id' ),
			referralid: referralId,
			referring_url: decodeURIComponent( readCookie( 'fb_referring_url' ) ),
			web_promo: readCookie( 'fb_web_promo' ),
			skip_business: false,
			skip_system: false,
		};

		window
			.fetch( action, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( formData ),
			} )
			.then( ( response ) => response.json() )
			.then( ( registerResponse ) => {
				if ( registerResponse.response ) {
					const signupRedirect = `https://${
						window.fbVars.fbDomains.auth
					}/integrations/confirm?email=${ encodeURIComponent(
						formData.email
					) }&firstVisit=true`;

					window
						.fetch( `https://${ window.fbVars.fbDomains.api }/auth/api/v1/users/me`, {
							method: 'GET',
							headers: {
								Authorization: `Bearer ${ registerResponse.response.access_token }`,
							},
						} )
						.then( ( response ) => response.json() )
						.then( ( apiResponse ) => {
							if ( form.classList.contains( 'hero__signup-form' ) ) {
								trackEvent( 'optimizely', 'User-Hero-Sign-Up' );
							}
							trackEvent( 'optimizely', 'smux_account_signup' );

							// Separate GTM push for accountid so it's available to later pushes.
							if ( apiResponse && apiResponse.account_id ) {
								track( 'gtm', { accountid: apiResponse.account_id } );
							}

							track( 'gtm', {
								classic_or_nfb: 'nfb',
								event: 'smux.account.signup',
							} );

							window.location = signupRedirect;
						} );
				} else if ( registerResponse.error_description ) {
					const emailField = form.email;
					const emailTooltip = form.querySelector(
						'input[name="email"] ~ .invalid-tooltip'
					);

					let errorMessage = registerResponse.error_description.replace(
						'Validation failed: ',
						''
					);

					if ( registerResponse.error === 'unprocessable_entity' ) {
						errorMessage = 'This field is invalid';
					}

					emailTooltip.innerHTML = errorMessage;
					emailField.setCustomValidity( errorMessage );
					form.classList.add( 'was-validated' );
					emailField.focus();
				}
			} );
	}
};

/**
 * Signup with SSO provider. If provider string indicated, will supply the url based on the provider.
 * Otherwise, provider URL will be based off the SSO button class.
 *
 * @param {string} provider SSO Provider as a string ("google" or "apple").
 */
export const handleSsoSignup = ( provider ) => {
	if ( 'google' === provider || 'apple' === provider ) {
		const authEndpoint = provider === 'google' ? 'google_oauth2_central_sso' : provider;
		const signupButtons = document.querySelectorAll( `.sso-signup_${ provider }` );
		const tosCheckbox = document.querySelector( '#tos-accepted' );

		if ( signupButtons ) {
			signupButtons.forEach( ( signupButton ) => {
				signupButton.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					if ( signupCookiesAccepted() ) {
						trackEvent( 'gtm', `${ provider }sso.signup.triggered` );
						const href = signupButton.getAttribute( 'href' );

						if ( ( tosCheckbox && tosCheckbox.checked ) || ! tosCheckbox ) {
							if ( href && href.length > 1 && href !== '#' ) {
								window.location.href = signupButton.href;
							} else {
								window.location.href = `https://${ window.fbVars.fbDomains.auth }/service/auth/auth/${ authEndpoint }?intent=sign_up`;
							}
						}
					}
				} );
			} );
		}
	}
};

/**
 * Checks the cookie policy prior to signup.
 */
export const signupCookiesAccepted = () => {
	const tosCheckbox = document.querySelector( '#tos-accepted' );
	if ( isCookiePolicyAccepted() || tosCheckbox.checked ) {
		if ( ! readCookie( 'cookies-declined' ) ) {
			acceptCookiePolicy();
		}

		return true;
	}

	const $modalCookies = $( '#modal-cookies' );

	if ( $modalCookies && $modalCookies.length ) {
		$( '#modal-cookies' ).modal( 'show' );
	}

	return false;
};
