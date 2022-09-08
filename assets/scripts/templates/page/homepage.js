import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'lite-youtube-embed';
import { handleSsoSignup } from 'scripts/modules/_signup';
import { isNfbCustomer } from 'scripts/helpers/_utils';
import { getDataAttr } from 'scripts/helpers/_attributes';
import { playVideo, pauseVideo } from 'scripts/helpers/_lite_youtube';

SwiperCore.use( [ Navigation, Pagination ] );

const initPromoHero = () => {
	const promoHero = document.querySelector( '.promo-hero' );
	const header = document.querySelector( '.header' );

	if ( ! isNfbCustomer() ) {
		const pricingTable = document.querySelector( '.pricing-table' );
		if (
			( 'true' === getDataAttr( pricingTable, 'promo-exists' ) &&
				'true' === getDataAttr( pricingTable, 'promo-show' ) ) ||
			promoHero.dataset.isActiveCampaign
		) {
			promoHero.classList.remove( 'd-none' );
			header.classList.add( 'has-promo-banner' );

			const heroes = document.querySelectorAll( '.hero:not(.promo-hero)' );
			if ( heroes ) {
				heroes.forEach( ( hero ) => {
					hero.classList.add( 'd-none' );
				} );
			}
		}
	}
};

const hero = () => {
	const inputs = document.querySelectorAll(
		'.hero__signup-form-email *, .hero__signup-form-btn *, .expandable:not(.sso) *'
	);
	const expandableItems = document.querySelectorAll( '.expandable' );
	const formExitButton = document.querySelector( '#close-form' );

	handleSsoSignup( 'google' );
	handleSsoSignup( 'apple' );

	inputs.forEach( ( input ) => {
		input.addEventListener( 'click', () => {
			expandableItems[ 0 ].classList.add( 'expanded' );
			expandableItems[ 1 ].classList.remove( 'expanded' );
			expandableItems[ 1 ].classList.remove( 'overflow-visible' );
			formExitButton.classList.add( 'show' );

			setTimeout( () => {
				expandableItems[ 0 ].classList.add( 'overflow-visible' );
			}, 300 );
		} );

		window.addEventListener( 'click', ( e ) => {
			const stayExpandedElements = [ ...Array.from( inputs ) ];

			if ( ! stayExpandedElements.includes( e.target ) ) {
				expandableItems[ 0 ].classList.remove( 'expanded' );
				expandableItems[ 0 ].classList.remove( 'overflow-visible' );
				expandableItems[ 1 ].classList.add( 'expanded' );
				formExitButton.classList.remove( 'show' );

				setTimeout( () => {
					expandableItems[ 1 ].classList.add( 'overflow-visible' );
				}, 300 );
			}
		} );
	} );

	const tosPrivacyCheckbox = document.querySelector( 'input#tos-accepted' );
	const heroTerms = document.querySelector( '.hero__signup-form__terms:not(.sso)' );
	const signupForm = document.querySelector( '.hero__signup-form' );
	const ssoButtons = document.querySelectorAll( '.sso-signup_apple, .sso-signup_google' );
	const ssoTosPrivacyCheckbox = document.querySelector( 'input#tos-accepted-sso' );
	const ssoTosTooltip = document.querySelector( '.expandable.sso .invalid-checkbox-tooltip' );
	const checkboxes = [ tosPrivacyCheckbox, ssoTosPrivacyCheckbox ];

	checkboxes.forEach( ( checkbox ) => {
		checkbox.checked = false;

		checkbox.addEventListener( 'change', ( e ) => {
			checkboxes[ Number( ! checkboxes.indexOf( e.target ) ) ].checked = e.target.checked;
		} );
	} );

	ssoButtons.forEach( ( ssoButton ) => {
		ssoButton.addEventListener( 'click', () => {
			if ( ssoTosPrivacyCheckbox.checked ) {
				ssoTosTooltip.classList.remove( 'd-block' );
			} else {
				ssoTosTooltip.classList.add( 'd-block' );
			}
		} );
	} );

	ssoTosPrivacyCheckbox.addEventListener( 'change', () => {
		ssoTosTooltip.classList.remove( 'd-block' );
	} );

	const checkPolicyPrivacyValidity = () => {
		if ( tosPrivacyCheckbox.validity.valid && heroTerms.classList.contains( 'is-invalid' ) ) {
			heroTerms.classList.remove( 'is-invalid' );
		} else if (
			! tosPrivacyCheckbox.validity.valid &&
			! heroTerms.classList.contains( 'is-invalid' )
		) {
			heroTerms.classList.add( 'is-invalid' );
		}
	};

	if ( tosPrivacyCheckbox ) {
		tosPrivacyCheckbox.addEventListener( 'change', checkPolicyPrivacyValidity );
	}
	if ( signupForm ) {
		signupForm.addEventListener( 'submit', checkPolicyPrivacyValidity );
	}
};

const handleProductTour = () => {
	const main = document.querySelector( '.product-tour' );
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
			const videosExitButtons = document.querySelectorAll(
				'.product-tour__item-close-video'
			);
			videosExitButtons.forEach( ( videosExitButton ) => {
				videosExitButton.click();
			} );

			/* Items - Nav */
			// Resets all classes.
			productTourMenuItems.forEach( ( resetMenuItem ) => {
				resetMenuItem.classList.remove( productTourClasses.menuItemActiveClass );
			} );

			// Adds the class on the clicked element.
			productTourMenuItems
				.item( index )
				.classList.add( productTourClasses.menuItemActiveClass );

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

					if ( item.classList.contains( productTourClasses.arrowNavLinkNextClass ) ) {
						if ( currentItemIndex < itemsLength - 1 ) {
							currentItemIndex++;
						}
					} else if ( currentItemIndex > 0 ) {
						currentItemIndex--;
					}

					showItem( currentItemIndex );
				} );
			} );
		}

		const videoToggle = () => {
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

		videoToggle();
	};

	const handleSwiper = ( productTour ) => {
		const swiperContainer = productTour.querySelector( '.swiper-container' );
		productTour.swiperVisible = false;

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

		const enableSwiper = () => {
			productTour.swiper = new Swiper( swiperContainer, swiperConfig );
			productTour.swiper.init();
			productTour.swiperVisible = true;
		};

		if ( window.innerWidth < 1024 ) {
			enableSwiper();
		}

		window.addEventListener( 'resize', () => {
			if ( window.innerWidth < 1024 ) {
				if ( ! productTour.swiperVisible ) {
					enableSwiper();
				}
			} else if ( productTour.swiperVisible ) {
				swiperContainer.swiper.destroy( true, true );
				productTour.swiperVisible = false;
			}
		} );
	};

	handleNav( main );
	handleSwiper( main );
};

const openFirstFaq = () => {
	const firstFaq = document.querySelector( '.faq__item' );
	firstFaq.classList.add( 'faq__items_revealed' );
};

const handleSwiper = () => {
	const swiperContainers = document.querySelectorAll( '.swiper-container' );

	const sliderWidth = {
		'rating-blocks__container': 350,
		'testimonial-blocks__container': 350,
	};

	swiperContainers.forEach( ( swiperContainer ) => {
		const blockClass = swiperContainer.classList[ 0 ];
		const hasPagination = document.querySelector( `.${ blockClass } ~ .swiper-pagination` )
			? {
					el: document.querySelector( `.${ blockClass } ~ .swiper-pagination` ),
					type: 'bullets',
					clickable: true,
			  }
			: false;
		let swiperEnabled = false;

		const hasNavigation =
			document.querySelector( `.${ blockClass } ~ .swiper-button-next` ) &&
			document.querySelector( `.${ blockClass } ~ .swiper-button-prev` )
				? {
						nextEl: document.querySelector( `.${ blockClass } ~ .swiper-button-next` ),
						prevEl: document.querySelector( `.${ blockClass } ~ .swiper-button-prev` ),
				  }
				: false;

		const swiperConfig = {
			init: false,
			loop: false,
			slidesPerView: 1,
			spaceBetween: 20,
			width: sliderWidth[ blockClass ],
			centeredSlides: true,
			navigation: hasNavigation,
			pagination: hasPagination,
			breakpoints: {
				0: {
					width: 270,
				},
				370: {
					width: sliderWidth[ blockClass ],
				},
			},
		};

		const enableSwiper = () => {
			swiperContainer.swiper = new Swiper( swiperContainer, swiperConfig );
			swiperContainer.swiper.init();
			swiperEnabled = true;
		};

		const breakpoint = swiperContainer.dataset.swiperBreakpoint || 768;

		if ( window.innerWidth < breakpoint ) {
			enableSwiper();
		}

		window.addEventListener( 'resize', () => {
			if ( window.innerWidth < breakpoint ) {
				if ( ! swiperEnabled ) {
					enableSwiper();
				}
			} else if ( swiperEnabled ) {
				swiperContainer.swiper.destroy( true, true );
				swiperEnabled = false;
			}
		} );
	} );
};

const initHomepageScripts = () => {
	initPromoHero();
	hero();
	handleProductTour();
	handleSwiper();
	openFirstFaq();
};

document.addEventListener( 'DOMContentLoaded', initHomepageScripts, false );
