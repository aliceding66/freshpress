/**
 * Feature Row.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const unsetActive = ( tabs, tabPanes ) => {
	if ( tabs ) {
		tabs.forEach( ( tab ) => {
			tab.querySelector( '.nav-link' ).classList.remove( 'active' );
		} );
	}
	if ( tabPanes ) {
		tabPanes.forEach( ( pane ) => {
			pane.classList.remove( 'active' );
		} );
	}
};

const initFeatureRow = ( featureRow ) => {
	const cards = featureRow.querySelector( '.feature-row__cards' );
	if ( cards ) {
		const tabs = cards.querySelectorAll( '.nav-item' );
		const tabPanes = cards.querySelectorAll( '.tab-pane' );

		tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const tabClasses = tab.querySelector( '.nav-link' ).classList;
				const tabRef = tab.querySelector( '.nav-link' ).getAttribute( 'href' );
				if ( ! tabClasses.contains( 'active' ) ) {
					unsetActive( tabs, tabPanes );
					tabClasses.add( 'active' );
					cards.querySelector( tabRef ).classList.add( 'active' );
				}
			} );
		} );
	}
};

initBlock( '.feature-row', initFeatureRow );
