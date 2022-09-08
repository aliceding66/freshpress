/**
 * Carousel.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use( [ Navigation, Pagination ] );

const initSwiper = ( carousel ) => {
	const swiperContainer = carousel.querySelector( '.swiper-container' );
	const hasPagination =
		carousel.dataset.pagination === 'true'
			? {
					el: carousel.querySelector( '.swiper-pagination' ),
					type: 'bullets',
					clickable: true,
			  }
			: false;
	const hasNavigation =
		carousel.dataset.navigation === 'true'
			? {
					nextEl: carousel.querySelector( '.swiper-button-next' ),
					prevEl: carousel.querySelector( '.swiper-button-prev' ),
			  }
			: false;
	const swiperConfig = {
		init: false,
		loop: false,
		slidesPerView: 1,
		spaceBetween: 20,
		centeredSlides: true,
		autoHeight: carousel.dataset.autoheight === 'true',
		navigation: hasNavigation,
		pagination: hasPagination,
	};

	carousel.swiper = new Swiper( swiperContainer, swiperConfig );
	carousel.swiper.init();
};

const initCarousel = ( carousel ) => {
	initSwiper( carousel );
};

initBlock( '.carousel', initCarousel );
