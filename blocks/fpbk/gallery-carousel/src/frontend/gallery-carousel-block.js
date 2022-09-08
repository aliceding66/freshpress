/**
 * Gallery Carousel block scripts.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use( [ Navigation, Pagination ] );

const swiperConfig = {
	init: false,
	loop: false,
	slidesPerView: 1,
	slidesPerColumn: 1,
	autoHeight: true,
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

export const initGalleryCarousel = ( galleryCarousel ) => {
	galleryCarousel.slides = galleryCarousel.querySelectorAll( '.swiper-slide' );
	galleryCarousel.swiper = new Swiper( galleryCarousel, swiperConfig );
	if ( galleryCarousel.slides ) {
		galleryCarousel.swiper.init();
	}
};

initBlock( '.gallery-carousel', initGalleryCarousel );
