/**
 * Direct Buy Banner
 */

import { isNfbCustomer } from 'scripts/helpers/_utils';

export const initBannerPromo = () => {
	const banner = document.querySelectorAll( '.banner-promo' );

	banner.forEach( ( item ) => {
		if ( !! isNfbCustomer() ) {
			item.classList.add( 'd-none' );
			item.classList.remove( 'slide-in' );
		}
	} );
};
