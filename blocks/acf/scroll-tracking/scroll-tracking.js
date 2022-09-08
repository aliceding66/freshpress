/**
 * Scroll Tracking.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { track } from 'scripts/modules/_tracking';

const initScrollTracking = ( scrollTracking ) => {
	if ( scrollTracking && scrollTracking.dataset ) {
		const trackingSectionName = scrollTracking.dataset.trackingSection;
		const trackingSection = document.querySelector(
			`.trackingSection-${ trackingSectionName }`
		);

		if ( trackingSectionName && trackingSection ) {
			const trackingSectionTopOffset = trackingSection.getBoundingClientRect().top;
			let tracked = false;

			window.addEventListener( 'scroll', () => {
				if ( window.scrollY >= trackingSectionTopOffset && ! tracked ) {
					track( 'gtm', {
						event: 'scroll',
						scrollSection: trackingSectionName,
					} );
					tracked = true;
				}
			} );
		}
	}
};

initBlock( '.scroll-tracking', initScrollTracking );
