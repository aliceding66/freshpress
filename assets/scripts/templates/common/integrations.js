import { track } from 'scripts/modules/_tracking';

/**
 * Integrations
 */

/**
 * Mobile Menu functionality.
 */
const mobileMenu = () => {
	const documentBody = document.querySelector( 'body' );
	const mobileMenuToggle = document.querySelector( '#integrations-taxonomy__navigation-toggle' );
	const navigationWrapper = document.querySelector(
		'#integrations-taxonomy__navigation-wrapper'
	);
	const navigationCloseButtons = document.querySelectorAll(
		'#integrations-taxonomy__navigation-close, #integrations-taxonomy__cancel-button'
	);

	// Shows the nav.
	if ( mobileMenuToggle !== null ) {
		mobileMenuToggle.addEventListener( 'click', () => {
			if ( window.innerWidth < 768 ) {
				documentBody.classList.add( 'noscroll' );
			}
			navigationWrapper.classList.add( 'active' );
		} );
	}

	// Hides the nav.
	if ( navigationCloseButtons !== null ) {
		navigationCloseButtons.forEach( ( el ) => {
			el.addEventListener( 'click', () => {
				documentBody.classList.remove( 'noscroll' );
				navigationWrapper.classList.remove( 'active' );
			} );
		} );
	}
};

/**
 * CTA tracking.
 */
const ctaTracking = () => {
	const ctasToTrack = document.querySelectorAll( '.integration-card__integration-cta' );

	ctasToTrack.forEach( ( cta ) => {
		const integrationName = cta.dataset.integrationTitle;

		cta.addEventListener( 'click', () => {
			track( 'gtm', {
				event: 'ctaClick',
				ctaText: `${ integrationName } - learnmore`,
				ctaSection: 'integrationsearch',
			} );
		} );
	} );
};

/**
 * Inits Integrations functionality.
 */
const initIntegrations = () => {
	mobileMenu();
	ctaTracking();
};

document.addEventListener( 'DOMContentLoaded', initIntegrations, false );
