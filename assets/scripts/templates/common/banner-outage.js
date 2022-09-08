/**
 * Banner Outage.
 */

const initBannerOutage = () => {
	const outageBanners = document.querySelectorAll( '.banner-outage' );
	if ( outageBanners ) {
		const outageBannersLength = outageBanners.length;
		for ( let i = 0; i < outageBannersLength; ++i ) {
			const dismissButton = outageBanners[ i ].querySelector( '.dismiss-outage-banner' );

			if ( dismissButton ) {
				dismissButton.addEventListener( 'click', () => {
					outageBanners[ i ].classList.add( 'd-none' );
				} );
			}
		}
	}
};

document.addEventListener( 'DOMContentLoaded', initBannerOutage, false );
