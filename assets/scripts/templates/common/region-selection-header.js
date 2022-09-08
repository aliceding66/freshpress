import { createCookie, readCookie } from 'scripts/modules/_cookies';
import { track } from 'scripts/modules/_tracking';
import {
	getSiteCountryCode,
	getSuggestedCountryCode,
	setUserCountryCode,
	setUserCountryName,
} from 'scripts/modules/_i18n';

export const initRSHeader = () => {
	// Elements
	const banner = document.querySelector( '.region-selection-header' );

	if ( banner ) {
		const close = banner.querySelector( '.btn-close' );
		const select = banner.querySelector( '.region-selection-header__select select' );

		// Codes and Cookies
		const { supportedRegions } = window.fbVars.i18n;
		const siteCountryCode = getSiteCountryCode( 'lower' );
		const suggestedCountryCode = getSuggestedCountryCode( 'lower' );
		const dismissedCookie = readCookie( 'user-country-banner-dismiss' ) === 'true';

		// Users region is diff from region of site they're visiting AND
		// User's region matches one of regions we support
		if ( ! dismissedCookie && suggestedCountryCode !== siteCountryCode && supportedRegions ) {
			banner.classList.remove( 'd-none' );

			// Set dismiss button to close the banner and set user lang to current page lang
			close.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				createCookie( 'user-country-banner-dismiss', 'true', 0 ); // Set session cookie.
				banner.classList.add( 'd-none' );
			} );

			// Intercept button click to set user region selection cookie and redirect to correct url
			select.addEventListener( 'change', () => {
				const [ selectedLangCode, selectedCountryCode ] = select.value.split( '-' );

				if (
					selectedLangCode &&
					selectedCountryCode &&
					supportedRegions[ selectedCountryCode ] &&
					supportedRegions[ selectedCountryCode ][ selectedLangCode ]
				) {
					const newRegion = supportedRegions[ selectedCountryCode ][ selectedLangCode ];
					if ( newRegion.countryName && newRegion.url ) {
						setUserCountryCode( selectedCountryCode );
						setUserCountryName( newRegion.countryName );
						track( 'gtm', {
							event: 'linkClick',
							ctaText: newRegion.countryName.toLowerCase().replace( / /g, '' ),
							ctaSection: 'header',
						} );
						window.location = newRegion.url;
					}
				}
			} );
		}
	}
};
