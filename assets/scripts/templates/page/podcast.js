import Swiper from 'swiper';
import SwiperCore, { Navigation } from 'swiper/core';
SwiperCore.use( [ Navigation ] );

/**
 * Init swiper.
 */
const initSwiper = () => {
	const swiperConfig = {
		init: false,
		loop: false,
		slidesPerView: 1,
		slidesPerColumn: 1,
		observer: true,
		observeSlideChildren: true,
		updateOnWindowResize: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			480: {
				slidesPerView: 1,
				slidesPerColumn: 2,
				slidesPerGroup: 1,
				slidesPerColumnFill: 'column',
			},
			1024: {
				slidesPerView: 2,
				slidesPerColumn: 2,
				slidesPerGroup: 2,
				slidesPerColumnFill: 'column',
			},
		},
	};
	const swiper = new Swiper( '.swiper-container', swiperConfig );

	swiper.init();
	reorderSlides();

	window.onresize = function () {
		reorderSlides();
	};
};

/**
 * Fixes Swiper's responsive ordering.
 */
const reorderSlides = () => {
	const slides = document.querySelectorAll( '.swiper-slide:not(.d-none)' );

	if ( window.screen.width >= 1024 ) {
		slides.forEach( ( slide, index ) => {
			if ( index === 1 || ( index - 1 ) % 4 === 0 ) {
				slide.style.order = index + 1;
			} else if ( index === 2 || ( index - 2 ) % 4 === 0 ) {
				slide.style.order = index - 1;
			} else {
				slide.style.order = index; // eslint-disable-line
			}
		} );
	} else {
		slides.forEach( ( slide ) => {
			slide.style.order = null;
		} );
	}
};

/**
 * Move slider to the first episode of the provided season.
 *
 * @param {string} season  Season to switch.
 */
const moveSwiper = ( season ) => {
	const swiper = document.querySelector( '.swiper-container' ).swiper;
	const visibleSlides = document.querySelectorAll( '.swiper-slide:not(.d-none)' );
	const seasonSlides = document.querySelectorAll(
		`.swiper-slide[data-season="${ season }"]:not(.d-none)`
	);
	const slideIndex = Array.from( visibleSlides ).indexOf(
		seasonSlides[ seasonSlides.length - 1 ]
	);
	const slidesPerRow = window.screen.width >= 480 ? 2 : 1;
	swiper.slideTo( slideIndex / slidesPerRow );
};

/**
 * Filter podcast episodes by season.
 *
 * @param {string} activeSeason Active season number.
 * @param {string} season  Season to filter.
 */
const filterEpisodes = ( activeSeason, season ) => {
	if ( activeSeason === season ) {
		return;
	}

	const swiper = document.querySelector( '.swiper-container' ).swiper;

	let newSelector = '.swiper-slide';

	if ( 'nerdisodes' === season ) {
		newSelector += '[data-nerdisode="true"]';
	}

	const activeEpisodes = document.querySelectorAll( '.swiper-slide:not(.d-none)' );
	const newSeasonEpisodes = document.querySelectorAll( newSelector );

	activeEpisodes.forEach( ( episode ) => {
		episode.classList.add( 'd-none' );
	} );

	newSeasonEpisodes.forEach( ( episode ) => {
		episode.classList.remove( 'd-none' );
	} );

	swiper.update();
	moveSwiper( season );
};

/**
 * Compare active season with new season number to either use filtering or move the carousel.
 *
 * @param {string} activeSeason Active season number.
 * @param {string} season  Season to switch.
 */
const handleNav = ( activeSeason, season ) => {
	if ( isNaN( activeSeason ) === isNaN( season ) ) {
		moveSwiper( season );
	} else {
		filterEpisodes( activeSeason, season );
	}
};

/**
 * Handle event listeners for nav items
 */
const handleNavItems = () => {
	const navButtons = document.querySelectorAll( '.episodes-nav a' );
	const select = document.querySelector( '.episodes-nav select' );
	const navActive = document.querySelector( '.episodes-nav a.active' );

	if ( navActive ) {
		let activeSeason = navActive.dataset.sort;

		navButtons.forEach( ( navButton ) => {
			navButton.addEventListener( 'click', ( e ) => {
				const season = navButton.dataset.sort;
				e.preventDefault();
				navButtons.forEach( ( button ) => button.classList.remove( 'active' ) );
				e.target.classList.add( 'active' );
				handleNav( activeSeason, season );
				activeSeason = season;
			} );
		} );

		select.addEventListener( 'change', () => {
			const season = select.value;
			handleNav( activeSeason, season );
			activeSeason = season;
		} );
	}
};

const initPodcastScripts = () => {
	initSwiper();
	handleNavItems();
};

document.addEventListener( 'DOMContentLoaded', initPodcastScripts, false );
