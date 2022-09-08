/**
 * Comparison Table.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { isNfbCustomer } from 'scripts/helpers/_utils';
import { addEventListeners } from 'scripts/helpers/_events';
import { getDataAttr } from 'scripts/helpers/_attributes';
import { track } from 'scripts/modules/_tracking';

const recalculateStickyTop = ( comparisonTable ) => {
	const header = document.querySelector( 'header' );
	const stickyTableHeader = comparisonTable.querySelector( '.comparison-table__header-sticky' );

	if ( typeof window.ResizeObserver !== 'undefined' ) {
		const resizeObserver = new window.ResizeObserver( () => {
			stickyTableHeader.style.top = `${
				parseInt( header.getBoundingClientRect().height ) - 1
			}px`;
		} );
		resizeObserver.observe( header );
	} else {
		window.addEventListener( 'resize', () => {
			stickyTableHeader.style.top = `${
				parseInt( header.getBoundingClientRect().height ) - 1
			}px`;
		} );
		window.addEventListener( 'scroll', () => {
			stickyTableHeader.style.top = `${
				parseInt( header.getBoundingClientRect().height ) - 1
			}px`;
		} );
	}
};

const initComparisonTable = ( comparisonTable ) => {
	// Set a promo if available
	const promoExists = comparisonTable.dataset.promoExists;
	const promoHero = document.querySelector( '.promo-hero' );

	if ( promoExists && ! isNfbCustomer() ) {
		if ( promoHero && 'expired' === getDataAttr( promoHero, 'has-countdown' ) ) {
			comparisonTable.dataset.promoShow = false;
		} else {
			comparisonTable.dataset.promoShow = true;
		}
	}

	// Comparison Chart CTA tracking.
	const trackedCtas = comparisonTable.querySelectorAll( 'a[data-cta-section]' );
	if ( trackedCtas ) {
		trackedCtas.forEach( ( trackedCta ) => {
			addEventListeners( trackedCta, 'click mousedown', ( e ) => {
				if ( 'click' === e.type || ( e.button && [ 1, 2 ].includes( e.button ) ) ) {
					// Get the term switch value.
					const term = 'monthly'; // Comparison Chart supports only monthly.
					// Create the tracking data.
					track( 'gtm', {
						event: 'ctaClick',
						ctaText: term
							? getDataAttr( trackedCta, `cta-text-${ term }` )
							: getDataAttr( trackedCta, 'cta-text' ),
						ctaSection: getDataAttr( trackedCta, 'cta-section' ),
					} );

					if ( 'click' === e.type ) {
						e.preventDefault();
						window.location.href = e.target.href;
					}
				}
			} );
		} );
	}

	recalculateStickyTop( comparisonTable );
};

initBlock( '.comparison-table', initComparisonTable );
