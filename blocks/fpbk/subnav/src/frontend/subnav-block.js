/**
 * Subnav.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const initSubnav = ( subnav ) => {
	const select = subnav.querySelector( '.subnav__mobile > nav > select' );
	if ( select ) {
		select.addEventListener( 'change', ( e ) => {
			const selected = e.target.options[ e.target.selectedIndex ];
			window.location.replace( selected.dataset.url );
		} );
	}
};

initBlock( '.subnav', initSubnav );
