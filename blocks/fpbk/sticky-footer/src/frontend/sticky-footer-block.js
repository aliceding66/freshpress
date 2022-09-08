/**
 * Sticky Footer.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const initStickyFooter = ( stickyFooter ) => {
	window.addEventListener( 'load', () => {
		const cookieBanner = document.querySelector( '.banner-cookie-consent' );
		if ( ! cookieBanner.classList.contains( 'd-none' ) ) {
			stickyFooter.classList.remove( 'sticky-bottom' );
			stickyFooter.classList.remove( 'stuck' );
		} else {
			stickyFooter.classList.add( 'stuck' );
		}
	} );
};

initBlock( '.sticky-footer', initStickyFooter );
