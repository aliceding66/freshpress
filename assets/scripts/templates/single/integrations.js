import { track } from 'scripts/modules/_tracking';

/**
 * Single Integrations
 */

const highlightNavItem = ( id ) => {
	const navItems = document.querySelectorAll( '.related-links__list-item' );
	const itemToHighlight = Array.from( navItems ).filter(
		( item ) => item.children[ 0 ].hash === `#${ id }`
	);

	if ( navItems ) {
		navItems.forEach( ( navItem ) => {
			navItem.classList.remove( 'current' );
		} );

		itemToHighlight[ 0 ].classList.add( 'current' );
	}
};

/**
 * Highlight left navigation items.
 */
const highlightNav = () => {
	const contentHeadings = document.querySelectorAll( '.integrations__main-content h2' );
	const scroll = Math.round( window.scrollY );
	const highlightPoint = scroll;
	const headingOffsets = {};

	if ( contentHeadings ) {
		contentHeadings.forEach( ( heading ) => {
			headingOffsets[ Math.round( heading.getBoundingClientRect().top + scroll ) ] =
				heading.id;
		} );

		const closestOffset = Object.keys( headingOffsets ).reduce( ( prev, curr ) =>
			Math.abs( curr - highlightPoint ) < Math.abs( prev - highlightPoint ) ? curr : prev
		);

		highlightNavItem( headingOffsets[ closestOffset ] );
	}
};

/**
 * CTA tracking.
 */
const ctaTracking = () => {
	const ctaToTrack = document.querySelector( '.integrations__cta-title' );
	const integrationName = document.querySelector( '.integrations__title' ).innerText;

	ctaToTrack.addEventListener( 'click', () => {
		track( 'gtm', {
			event: 'ctaClick',
			ctaText: `${ integrationName } - get`,
			ctaSection: 'integrationpage',
		} );
	} );
};

/**
 * Single Integrations scripts init.
 */
const initSingleIntegrations = () => {
	ctaTracking();

	highlightNav();

	window.addEventListener( 'scroll', () => {
		highlightNav();
	} );
};

document.addEventListener( 'DOMContentLoaded', initSingleIntegrations, false );
