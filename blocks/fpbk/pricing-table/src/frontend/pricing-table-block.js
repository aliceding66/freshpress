/**
 * Pricing Table.
 */

import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { initBlock } from 'scripts/helpers/_blocks';
import { isNfbCustomer } from 'scripts/helpers/_utils';
import { getDataAttr, setDataAttr } from 'scripts/helpers/_attributes';
import { addEventListeners } from 'scripts/helpers/_events';
import { track } from 'scripts/modules/_tracking';

SwiperCore.use( [ Navigation, Pagination ] );

const handleTermSwitch = ( pricingTable ) => {
	const termSwitch = pricingTable.querySelector( '.pricing-table_term-switch__checkbox' );
	if ( termSwitch ) {
		termSwitch.addEventListener( 'change', () => {
			const term = getDataAttr( pricingTable, 'term' );
			const newTerm = 'monthly' === term ? 'yearly' : 'monthly';
			setDataAttr( pricingTable, 'term', newTerm );
		} );
	}
};

const handlePromoElements = ( pricingTable ) => {
	if ( getDataAttr( pricingTable, 'promo-exists' ) && ! isNfbCustomer() ) {
		const promoHero = document.querySelector( '.promo-hero' );

		if ( 'expired' === getDataAttr( promoHero, 'has-countdown' ) ) {
			setDataAttr( pricingTable, 'promo-show', false );
		} else {
			setDataAttr( pricingTable, 'promo-show', true );
		}
	}
};

const handleAnchorLinks = ( pricingTable ) => {
	const comparisonTable = document.querySelector( '.comparison-table' );
	const anchorLinks = pricingTable.querySelectorAll(
		'.pricing-table_column-features__expand-link'
	);
	if ( comparisonTable && comparisonTable.id && anchorLinks.length > 0 ) {
		anchorLinks.forEach( ( link ) => {
			link.href = `#${ comparisonTable.id }`;
		} );
	}
};

const trackCtas = ( pricingTable ) => {
	const ctaWrappers = pricingTable.querySelectorAll( 'div[data-cta-section]' );
	if ( ctaWrappers ) {
		ctaWrappers.forEach( ( ctaWrapper ) => {
			addEventListeners( ctaWrapper.querySelectorAll( 'a' ), 'click mousedown', ( e ) => {
				if ( 'click' === e.type || ( e.button && [ 1, 2 ].includes( e.button ) ) ) {
					// Get the term switch value.
					const term = getDataAttr( pricingTable, 'term' );
					// Create the tracking data.
					track( 'gtm', {
						event: 'ctaClick',
						ctaText: term
							? getDataAttr( ctaWrapper, `cta-text-${ term }` )
							: getDataAttr( ctaWrapper, 'cta-text' ),
						ctaSection: getDataAttr( ctaWrapper, 'cta-section' ),
					} );

					if ( 'click' === e.type ) {
						e.preventDefault();
						window.location.href = e.target.href;
					}
				}
			} );
		} );
	}
};

const handleSwiper = ( pricingTable ) => {
	const swiperContainer = pricingTable.querySelector( '.swiper-container' );
	pricingTable.swiperVisible = false;

	const stickyArrows = () => {
		const containerBoundries = swiperContainer.getBoundingClientRect();
		const arrows = pricingTable.querySelectorAll( '.pricing-table__swiper-button' );

		if ( window.innerWidth < 768 ) {
			if ( containerBoundries.top > 0 ) {
				arrows.forEach( ( el ) => el.classList.remove( 'fixed', 'bottom' ) );
			} else if ( containerBoundries.top <= 0 && containerBoundries.bottom >= 500 ) {
				arrows.forEach( ( el ) => {
					el.classList.add( 'fixed' );
					el.classList.remove( 'bottom' );
				} );
			} else if ( containerBoundries.bottom < 500 ) {
				arrows.forEach( ( el ) => el.classList.add( 'bottom' ) );
			}
		}
	};

	const initSwiper = () => {
		const swiperConfig = {
			init: false,
			loop: false,
			slidesPerView: 1,
			initialSlide: 1,
			spaceBetween: 15,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
		};

		if ( pricingTable.swiperVisible === false ) {
			pricingTable.swiper = new Swiper( swiperContainer, swiperConfig );
			pricingTable.swiper.init();
			pricingTable.swiperVisible = true;

			stickyArrows();

			window.addEventListener( 'scroll', () => {
				stickyArrows();
			} );
		}
	};

	const checkOnResize = () => {
		if (
			window.screen.width >= 768 &&
			pricingTable.swiper &&
			pricingTable.swiperVisible === true
		) {
			pricingTable.swiperVisible = false;
			pricingTable.swiper.destroy( true, true );
		} else if ( window.screen.width < 768 && pricingTable.swiperVisible === false ) {
			initSwiper();
		}
	};

	if ( pricingTable.dataset.mobileCarousel === 'true' ) {
		checkOnResize();

		window.addEventListener( 'resize', () => {
			checkOnResize();
		} );
	}
};

const initPricingTable = ( pricingTable ) => {
	handleTermSwitch( pricingTable );
	handlePromoElements( pricingTable );
	handleAnchorLinks( pricingTable );
	trackCtas( pricingTable );
	handleSwiper( pricingTable );
};

initBlock( '.pricing-table', initPricingTable );
