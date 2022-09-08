/**
 * Product Tour.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'lite-youtube-embed';
import { playVideo, pauseVideo } from 'scripts/helpers/_lite_youtube';

SwiperCore.use( [ Navigation, Pagination ] );

const handleNav = ( productTour ) => {
	const productTourClasses = {
		menuItem: '.product-tour__nav-link',
		menuItemActiveClass: 'product-tour__nav-link_active',
		item: '.product-tour__item',
		itemActiveClass: 'product-tour__item_active',
		arrowNavLink: '.product-tour__item-nav-link',
		arrowNavLinkNext: '.product-tour__item-nav-link_next',
		arrowNavLinkNextClass: 'product-tour__item-nav-link_next',
		arrowNavLinkPrevious: '.product-tour__item-nav-link_previous',
		arrowNavLinkActiveClass: 'product-tour__item-nav-link_active',
	};

	const productTourMenuItems = productTour.querySelectorAll( productTourClasses.menuItem );
	const itemsLength = productTourMenuItems.length;
	let currentItemIndex = 0;

	if ( productTourMenuItems ) {
		productTourMenuItems.forEach( ( item ) => {
			item.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				currentItemIndex = Array.from( productTourMenuItems ).indexOf( item );

				/* Items - Content */
				showItem( currentItemIndex );
			} );
		} );
	}

	const showItem = ( index ) => {
		/* Items - Nav */
		// Resets all classes.
		productTourMenuItems.forEach( ( resetMenuItem ) => {
			resetMenuItem.classList.remove( productTourClasses.menuItemActiveClass );
		} );

		// Adds the class on the clicked element.
		productTourMenuItems.item( index ).classList.add( productTourClasses.menuItemActiveClass );

		/* Items - Content */
		const ItemsCollection = productTour.querySelectorAll( productTourClasses.item );

		// Resets all classes and reveals the one clicked.
		ItemsCollection.forEach( ( resetItem ) => {
			resetItem.classList.remove( productTourClasses.itemActiveClass );
		} );

		// Adds the active class to the selected element.
		ItemsCollection.item( index ).classList.add( productTourClasses.itemActiveClass );

		// Treats the display of the arrows.
		if ( index === 0 ) {
			productTour
				.querySelector( productTourClasses.arrowNavLinkPrevious )
				.classList.remove( productTourClasses.arrowNavLinkActiveClass );
		} else {
			productTour
				.querySelector( productTourClasses.arrowNavLinkPrevious )
				.classList.add( productTourClasses.arrowNavLinkActiveClass );
		}

		if ( index === itemsLength - 1 ) {
			productTour
				.querySelector( productTourClasses.arrowNavLinkNext )
				.classList.remove( productTourClasses.arrowNavLinkActiveClass );
		} else {
			productTour
				.querySelector( productTourClasses.arrowNavLinkNext )
				.classList.add( productTourClasses.arrowNavLinkActiveClass );
		}
	};

	// Arrow nav.
	const arrowNavLinks = productTour.querySelectorAll( productTourClasses.arrowNavLink );

	if ( arrowNavLinks ) {
		arrowNavLinks.forEach( ( item ) => {
			item.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				if ( item.classList.contains( productTourClasses.arrowNavLinkActiveClass ) ) {
					if ( item.classList.contains( productTourClasses.arrowNavLinkNextClass ) ) {
						currentItemIndex++;
					} else {
						currentItemIndex--;
					}

					showItem( currentItemIndex );
				}
			} );
		} );
	}
};

const handleSwiper = ( productTour ) => {
	const swiperContainer = productTour.querySelector( '.swiper-container' );
	productTour.swiperVisible = false;

	const initSwiper = () => {
		const swiperConfig = {
			init: false,
			loop: false,
			slidesPerView: 1,
			spaceBetween: 20,
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

		if ( productTour.swiperVisible === false ) {
			productTour.swiper = new Swiper( swiperContainer, swiperConfig );
			productTour.swiper.init();
			productTour.swiperVisible = true;
		}
	};

	const checkOnResize = () => {
		if (
			window.screen.width >= 1024 &&
			productTour.swiper &&
			productTour.swiperVisible === true
		) {
			productTour.swiperVisible = false;
			productTour.swiper.destroy( true, true );
		} else if ( window.screen.width < 1024 && productTour.swiperVisible === false ) {
			initSwiper();
		}
	};

	if ( productTour.dataset.mobileCarousel === 'true' ) {
		checkOnResize();

		window.addEventListener( 'resize', () => {
			checkOnResize();
		} );
	}
};

const handleVideoToggle = ( productTour ) => {
	const items = productTour.querySelectorAll( '.product-tour__item' );

	items.forEach( ( item, itemIndex ) => {
		const videoNode = item.querySelector( `#video${ itemIndex }` );

		if ( videoNode ) {
			const image = item.querySelectorAll( '.product-tour__item-image' );
			const playButton = item.querySelector( '.product-tour__watch' );
			const closeButton = item.querySelector( '.product-tour__item-close-video' );
			const video = item.querySelector( '.product-tour__item-video' );
			playButton.addEventListener( 'click', () => {
				playVideo( videoNode );
				video.classList.add( 'show' );
				image.forEach( ( img ) => img.classList.add( 'hide' ) );
				closeButton.classList.add( 'show' );
			} );
			closeButton.addEventListener( 'click', () => {
				video.classList.remove( 'show' );
				image.forEach( ( img ) => img.classList.remove( 'hide' ) );
				closeButton.classList.remove( 'show' );
				pauseVideo( videoNode );
			} );
		}
	} );
};

const handleRecalculateArrowPositions = ( productTour ) => {
	const recalculateArrowsPosition = () => {
		const activeItem = productTour.querySelector( '.product-tour__item_active' );

		if ( activeItem ) {
			const halfOfActiveItemHeight = activeItem.clientHeight / 2;

			const arrows = productTour.querySelectorAll( '.product-tour__item-nav-link' );
			arrows.forEach( ( arrow ) => {
				arrow.style.top = `${ halfOfActiveItemHeight }px`;
			} );
		}
	};

	recalculateArrowsPosition();

	window.addEventListener( 'resize', () => {
		recalculateArrowsPosition();
	} );
};

const initProductTour = ( productTour ) => {
	handleNav( productTour );
	handleSwiper( productTour );
	handleVideoToggle( productTour );
	handleRecalculateArrowPositions( productTour );
};

initBlock( '.product-tour', initProductTour );
