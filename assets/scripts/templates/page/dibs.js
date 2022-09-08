/**
 * Dibs.
 *
 */

import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use( [ Navigation, Pagination ] );

document.addEventListener( 'DOMContentLoaded', function () {
	const initJourneyDesktop = () => {
		const timelineEls = document.querySelectorAll( '.journey_desktop__timeline-dot' );

		timelineEls.forEach( ( el ) => {
			// Tooltips.
			el.addEventListener( 'mouseover', () => {
				const tooltip = document.querySelector( '#journey_desktop__tooltip' );

				document.querySelector( '#journey_desktop__tooltip-year' ).textContent =
					el.dataset.year;
				document.querySelector( '#journey_desktop__tooltip-text' ).textContent =
					el.dataset.text;

				tooltip.style.left = parseInt( el.getAttribute( 'cx' ) ) + 'px';
				tooltip.style.top = parseInt( el.getAttribute( 'cy' ) ) - 25 + 'px';

				tooltip.classList.add( 'journey_desktop__tooltip_active' );
			} );
			el.addEventListener( 'mouseout', () => {
				const tooltip = document.querySelector( '#journey_desktop__tooltip' );
				tooltip.classList.remove( 'journey_desktop__tooltip_active' );
			} );
		} );
	};
	initJourneyDesktop();

	const initGraph = () => {
		const graphEls = document.querySelectorAll( '.graph__percentage' );

		graphEls.forEach( ( el ) => {
			const percentage = el.dataset.percentage + '%';
			el.append( percentage );
			el.style.height = percentage;

			// creates the tooltips
			const tooltipRace = document.createElement( 'span' );
			tooltipRace.classList.add( 'graph__tooltip-race' );
			tooltipRace.textContent = el.dataset.race;

			const tooltipYear = document.createElement( 'span' );
			tooltipYear.classList.add( 'graph__tooltip-year' );
			tooltipYear.textContent = ' (' + el.dataset.year + ')';

			const tooltipPercentage = document.createElement( 'span' );
			tooltipPercentage.classList.add( 'graph__tooltip-percentage' );
			tooltipPercentage.textContent = percentage;

			// appends the tooltips
			el.firstChild.append( tooltipRace );
			el.firstChild.append( tooltipYear );
			el.firstChild.append( tooltipPercentage );
		} );
	};
	initGraph();

	const initChampionsSwiper = () => {
		const championsSwiperContainer = document.querySelector( '.champions__slides-container' );

		const championsSwiperConfig = {
			init: false,
			loop: true,
			centeredSlides: true,
			slideToClickedSlide: true,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			navigation: {
				nextEl: '.champions__swiper-button-next',
				prevEl: '.champions__swiper-button-prev',
			},
			breakpoints: {
				360: {
					slidesPerView: 3,
					spaceBetween: -40,
				},
				768: {
					slidesPerView: 5,
					spaceBetween: -40,
				},
				1024: {
					slidesPerView: 6,
					spaceBetween: -80,
				},
				1280: {
					slidesPerView: 8,
					spaceBetween: -80,
				},
				1600: {
					slidesPerView: 11,
					spaceBetween: 0,
				},
			},
		};

		const championsSwiper = new Swiper( championsSwiperContainer, championsSwiperConfig );
		championsSwiper.init();
	};
	initChampionsSwiper();

	const initGraphSwiper = () => {
		const graphSwiperContainer = document.querySelector( '.graph' );
		const graphMenu = [ 'Race/Ethnicity', 'Gender', 'Age' ];

		const graphSwiperConfig = {
			init: false,
			loop: true,
			spaceBetween: 150,
			centeredSlides: true,
			breakpoints: {
				360: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				1024: {
					slidesPerView: 1,
					spaceBetween: 150,
				},
			},
			navigation: {
				nextEl: '.graph__swiper-button-next',
				prevEl: '.graph__swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				bulletActiveClass: 'graph__nav-item_active',
				bulletClass: 'graph__nav-item',
				clickable: true,
				renderBullet: ( index, className ) => {
					return '<a class="' + className + '">' + graphMenu[ index ] + '</span>';
				},
			},
		};

		const graphSwiper = new Swiper( graphSwiperContainer, graphSwiperConfig );
		graphSwiper.init();
	};
	initGraphSwiper();

	const initJourneySwiper = () => {
		const journeySwiperContainer = document.querySelector(
			'.journey_mobile__slides-container'
		);

		const journeySwiperConfig = {
			init: false,
			loop: false,
			direction: 'vertical',
			centeredSlides: true,
			slidesPerView: 2,
		};

		const journeySwiper = new Swiper( journeySwiperContainer, journeySwiperConfig );
		journeySwiper.init();
	};
	initJourneySwiper();

	const initJourneyInteraction = () => {
		window.addEventListener( 'scroll', function () {
			const todayEls = document.querySelectorAll( '.journey__today-container' );

			todayEls.forEach( ( el ) => {
				const topPos = el.getBoundingClientRect().top;
				if ( topPos > -400 && topPos < 400 ) {
					el.classList.remove( 'journey__today_hidden' );
					el.classList.add( 'journey__today_visible' );
				} else {
					el.classList.add( 'journey__today_hidden' );
					el.classList.remove( 'journey__today_visible' );
				}
			} );
		} );
	};
	initJourneyInteraction();
} );
