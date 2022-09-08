/**
 * Internationalization module.
 */

import countryList from 'mui/utils/country/list';
import { createCookie, readCookie } from 'scripts/modules/_cookies';
import { toTitleCase } from 'scripts/helpers/_strings';
import countryToCurrency from 'scripts/json/country-to-currency.json';

const i18nVars = window.fbVars && window.fbVars.i18n ? window.fbVars.i18n : {};

/**
 * Gets site's country as 2-character code.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} 2 character country code w/ chosen casing.
 */
export const getSiteCountryCode = ( format = 'upper' ) => {
	const countryCode = i18nVars.siteCountryCode || 'US';
	return format === 'lower' ? countryCode.toLowerCase() : countryCode.toUpperCase();
};

/**
 * Gets billing country code as 2-character uppercase code.
 *
 * @return {string} Uppercase billing country code.
 */
export const getBillingCountryCode = () => ( i18nVars.siteCountryCode || 'US' ).toUpperCase();

/**
 * Gets the site language as lowercase 2-character code.
 *
 * @return {string} Lowercase 2 character country code.
 */
export const getLanguage = () => i18nVars.siteLangCode || 'en';

/**
 * Gets the user's country as 2-character code.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} 2 character country code selected by user.
 */
export const getUserCountryCode = ( format = 'upper' ) => {
	const countryCode = readCookie( 'user-country-code' ) || 'US';

	if ( format === 'lower' ) {
		return countryCode.toLowerCase();
	}

	return countryCode.toUpperCase();
};

/**
 * Get the 2-character codes for all supported site countries.
 *
 * @return {Array} All supported country codes
 */
export const getSiteCountryCodes = () => {
	if ( i18nVars.supportedRegions ) {
		const siteCountryCodes = Object.keys( i18nVars.supportedRegions );

		if ( Array.isArray( siteCountryCodes ) ) {
			return siteCountryCodes;
		}
	}

	return [ 'us' ];
};

/**
 * Get the 2-character country code for the site we think is the correct region for the user.
 *
 * @param {string} [format=upper] Set casing of return value.
 * @return {string} Country code based off detected location and supported list.
 */
export const getSuggestedCountryCode = ( format = 'upper' ) => {
	const countryCode = readCookie( 'user-country-code' );

	if ( typeof countryCode === 'string' ) {
		const siteCountryCodes = getSiteCountryCodes();

		if ( siteCountryCodes.indexOf( countryCode.toLowerCase() ) !== -1 ) {
			return format === 'lower' ? countryCode.toLowerCase() : countryCode.toUpperCase();
		}
	}

	return format === 'lower' ? 'us' : 'US';
};

/**
 * Gets the user's country as a full name.
 *
 * @return {string} Full country name.
 */
export const getUserCountryName = () => readCookie( 'user-country-name' ) || 'United States';

/**
 * Gets the relevant currency code for the user's country.
 *
 * @return {string} Country currency code.
 */
export const getUserCurrencyCode = () => {
	const countryCodeCookie = getUserCountryCode();

	return countryCodeCookie in countryToCurrency ? countryToCurrency[ countryCodeCookie ] : 'USD';
};

/**
 * Gets the user region as a lang-country locale code.
 *
 * @return {string} Language-Country code (ex. en-CA).
 */
export const getUserRegionCode = () => `${ getLanguage() }-${ getUserCountryCode( 'lower' ) }`;

/**
 * Sets a cookie with the country code (converted to uppercase) for 1 year.
 *
 * @param {string} [countryCode=US] Two letter country code
 */
export const setUserCountryCode = ( countryCode ) => {
	createCookie( 'user-country-code', ( countryCode || 'US' ).toUpperCase(), 365 );
};

/**
 * Sets a cookie with the country name (converted to title case) for 1 year.
 *
 * @param {string} [countryName=United States] Full name of country
 */
export const setUserCountryName = ( countryName ) => {
	createCookie(
		'user-country-name',
		toTitleCase( countryName || 'United States', { exceptions: /^(and|of|the)$/ } ),
		365
	);
};

/**
 * Get an array of all FreshBooks supported countries, with both code and name returned.
 *
 * @return {Array} All supported country codes and names.
 */
export const getAppCountryList = () =>
	countryList
		.map( ( el ) => {
			if ( el.name && el.name.common && el.name.short ) {
				return {
					code: el.name.short,
					name: el.name.common,
				};
			}

			return false;
		} )
		.filter( ( el ) => el );

/**
 * Get an array of all FreshBooks supported country codes.
 *
 * @return {Array} All supported country codes.
 */
export const getAppCountryCodes = () => getAppCountryList().map( ( el ) => el.code );

/**
 * Get an array of all FreshBooks supported country names.
 *
 * @return {Array} All supported country names.
 */
export const getAppCountryNames = () => getAppCountryList().map( ( el ) => el.name );

/**
 * By default, get Fastly country code when present. When user sets their region, this user country code
 * cookie will be updated with that value.
 */
export const setRegionCookies = () => {
	const fastlyValueCode = readCookie( 'country-code' );
	const fastlyValueName = readCookie( 'country-name' );

	if ( ! readCookie( 'user-country-code' ) ) {
		setUserCountryCode( fastlyValueCode );
	}
	if ( ! readCookie( 'user-country-name' ) ) {
		setUserCountryName( fastlyValueName );
	}

	createCookie( 'billing_country_code', getBillingCountryCode() );
	createCookie( 'fb_language', getLanguage() );
};
