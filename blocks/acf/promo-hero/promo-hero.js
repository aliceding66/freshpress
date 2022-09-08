/**
 * Promo Hero.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import { isNfbCustomer, parseUrl } from 'scripts/helpers/_utils';
import { getDataAttr } from 'scripts/helpers/_attributes';

const initPromoHero = ( promoHero ) => {
	if ( ! isNfbCustomer() ) {
		const pricingTable = document.querySelector( '.pricing-table' );
		if (
			( 'true' === getDataAttr( pricingTable, 'promo-exists' ) &&
				'true' === getDataAttr( pricingTable, 'promo-show' ) ) ||
			promoHero.dataset.isActiveCampaign
		) {
			promoHero.classList.remove( 'd-none' );

			const heroes = document.querySelectorAll( '.hero' );
			if ( heroes ) {
				heroes.forEach( ( hero ) => {
					hero.classList.add( 'd-none' );
				} );
			}

			if ( parseUrl( window.location.href ).pathname.includes( 'pricing' ) ) {
				const getapps = document.querySelectorAll( '.rating' );
				if ( getapps ) {
					getapps.forEach( ( getapp ) => {
						if (
							! getapp.parentElement.classList.contains( 'promo-hero_rating-wrapper' )
						) {
							getapp.remove();
						}
					} );
				}
			}
		}
	}
};

initBlock( '.promo-hero', initPromoHero );
