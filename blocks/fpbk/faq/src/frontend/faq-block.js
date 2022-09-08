/**
 * FAQ.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const initFaq = ( el ) => {
	el.querySelector( '.faq__items' ).addEventListener( 'click', function ( e ) {
		let item = e.target;
		if ( ! item.className.match || ! item.className.match( /faq__item(?!s)/ ) )
			item = item.closest( '.faq__item' );
		if ( item ) item.classList.toggle( 'faq__items-revealed' );
	} );
};

initBlock( '.faq', initFaq );
