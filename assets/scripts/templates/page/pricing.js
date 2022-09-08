import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { setDataAttr } from 'scripts/helpers/_attributes';
import { readCookie } from 'scripts/modules/_cookies';

SwiperCore.use( [ Navigation, Pagination ] );

const plansSet = {
	freelancers: 'lite,plus',
	'self-employed': 'plus,lite',
	'business-with-contractors': 'premium,plus,select',
	'business-with-employees': 'select,premium',
};

const handleTermSwitch = ( pricingTable ) => {
	const termSwitch = pricingTable.querySelector( '.pricing-table_term-switch__checkbox' );
	const comparisonTable = document.querySelector( '.comparison-table' );

	if ( termSwitch ) {
		termSwitch.addEventListener( 'change', ( e ) => {
			const newTerm = e.target.checked ? 'yearly' : 'monthly';
			setDataAttr( pricingTable, 'term', newTerm );
			setDataAttr( comparisonTable, 'term', newTerm );
		} );
	}
};

const handleTestimonialSwiper = () => {
	const swiperContainers = document.querySelectorAll( '.testimonial-blocks__container' );

	const sliderWidth = {
		'testimonial-blocks__container': 340,
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

const handleSwiper = ( pricingTable ) => {
	const swiperContainer = pricingTable.querySelector( '.swiper-container' );
	pricingTable.swiperVisible = false;

	const initSwiper = () => {
		const swiperConfig = {
			init: 2,
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

const comparisonTableStickyHeader = () => {
	const firstTable = document.querySelector( '.comparison-table__category-table' );
	const lastTable = document.querySelector( '.comparison-table__category-table:last-child' );
	const stickyHeaders = document.querySelectorAll( '.table-sticky-header' );
	const isCustomer = readCookie( 'smux_login' );

	const setStickyClass = ( header ) => {
		const headerHeight = header.getBoundingClientRect().height;
		const firstTableBoundaries = firstTable.getBoundingClientRect();
		const lastTableBoundaries = lastTable.getBoundingClientRect();
		const firstTableTop = firstTableBoundaries.top;
		const lastTableTop = lastTableBoundaries.top;
		const lastTableHeight = lastTableBoundaries.height;

		if ( firstTableTop < 0 ) {
			header.classList.add( 'before-sticky' );
		} else {
			header.classList.remove( 'before-sticky' );
		}

		if ( firstTableTop < -20 ) {
			header.classList.add( 'sticky' );
		} else {
			header.classList.remove( 'sticky' );
		}

		if ( lastTableHeight + lastTableTop <= headerHeight ) {
			header.classList.add( 'on-bottom' );
			header.classList.remove( 'before-sticky' );
		} else {
			header.classList.remove( 'on-bottom' );
		}
	};

	stickyHeaders.forEach( ( stickyHeader ) => {
		setStickyClass( stickyHeader );

		if ( isCustomer ) {
			stickyHeader.classList.remove( 'has-promo-banner' );
		}

		window.addEventListener( 'scroll', () => {
			setStickyClass( stickyHeader );
		} );
	} );
};

const selectPlans = ( plansToShow ) => {
	const pricingTable = document.querySelector( '.pricing-table' );
	const comparisonTable = document.querySelector( '.comparison-table' );
	const allPlansEls = pricingTable.querySelectorAll( '.pricing-table_column' );
	const toggleButtons = pricingTable.querySelectorAll( '.pricing-table__desktop-categories li' );
	const mobileSwitches = comparisonTable.querySelectorAll(
		'.comparison-table__mobile-header-sticky ul li'
	);
	// const mobileSelect = pricingTable.querySelector( '#select-plans' );
	const recommendedPlan = plansToShow.split( ',' )[ 0 ];
	const recommendedMobileSwitch = comparisonTable.querySelector(
		`.comparison-table__mobile-header-sticky ul li[data-plan="${ recommendedPlan }"]`
	);

	pricingTable.dataset.show = plansToShow;
	comparisonTable.dataset.show = plansToShow;
	comparisonTable.dataset.selected = recommendedPlan;

	toggleButtons.forEach( ( item ) => item.classList.remove( 'active' ) );
	toggleButtons[ 0 ].classList.add( 'active' );

	mobileSwitches.forEach( ( item ) => item.classList.remove( 'active' ) );
	recommendedMobileSwitch.classList.add( 'active' );

	allPlansEls.forEach( ( item ) => {
		if ( item.dataset.plan === recommendedPlan ) {
			item.classList.add( 'recommended' );
		} else {
			item.classList.remove( 'recommended' );
		}
	} );

	if ( pricingTable.swiper ) {
		const recommendedSlideIndex = Array.from( allPlansEls ).indexOf(
			pricingTable.querySelector( `.pricing-table_column[data-plan="${ recommendedPlan }"]` )
		);
		pricingTable.swiper.slideTo( recommendedSlideIndex );
		pricingTable.swiper.update();
	}
};

const comparisonTableToggles = () => {
	const comparisonTable = document.querySelector( '.comparison-table' );
	const mobileSwitches = comparisonTable.querySelectorAll(
		'.comparison-table__mobile-header-sticky ul li'
	);
	const toggles = document.querySelectorAll( '.comparison-table .toggle' );

	if ( toggles ) {
		toggles.forEach( ( toggle ) => {
			toggle.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const plan = toggle.dataset.toggle;
				let visiblePlans = comparisonTable.dataset.show.split( ',' );

				if ( visiblePlans.includes( plan ) ) {
					visiblePlans = visiblePlans.filter( ( item ) => item !== plan );
				} else {
					visiblePlans.push( plan );
				}
				visiblePlans = visiblePlans.sort();

				if ( visiblePlans.includes( 'lite' ) ) {
					visiblePlans = [
						...visiblePlans.filter( ( item ) => item !== 'lite' ),
						'lite',
					];
				}

				selectPlans( visiblePlans.join( ',' ) );
			} );
		} );
	}

	if ( mobileSwitches ) {
		mobileSwitches.forEach( ( mobileSwitch ) => {
			mobileSwitch.addEventListener( 'click', () => {
				const plan = mobileSwitch.dataset.plan;
				const plans = [ 'lite', 'plus', 'premium', 'select' ];
				const plansToShow = [ plan, ...plans.filter( ( item ) => item !== plan ) ].join(
					','
				);
				selectPlans( plansToShow );

				mobileSwitches.forEach( ( item ) => item.classList.remove( 'active' ) );
				mobileSwitch.classList.add( 'active' );
			} );
		} );
	}
};

const pricingPageToggles = ( pricingTable ) => {
	const toggleButtons = pricingTable.querySelectorAll( '.pricing-table__desktop-categories li' );
	const mobileSelect = pricingTable.querySelector( '#select-plans' );
	if ( toggleButtons ) {
		toggleButtons.forEach( ( toggleButton ) => {
			toggleButton.addEventListener( 'click', () => {
				const plansFor = toggleButton.dataset.plansFor;
				const planName = toggleButton.innerHTML.toLowerCase().replaceAll( ' ', '-' );
				window.history.pushState(
					'',
					'',
					`${ window.location.pathname }${
						'show-all-plans' === planName ? '' : `?for=${ planName }`
					}`
				);
				selectPlans( plansFor );

				toggleButtons.forEach( ( item ) => item.classList.remove( 'active' ) );
				toggleButton.classList.add( 'active' );
			} );
		} );
	}

	if ( mobileSelect ) {
		mobileSelect.addEventListener( 'change', () => {
			const planName = Object.keys( plansSet ).find(
				( key ) => plansSet[ key ] === mobileSelect.value
			);
			window.history.pushState(
				'',
				'',
				`${ window.location.pathname }${
					undefined === planName ? '' : `?for=${ planName }`
				}`
			);
			selectPlans( mobileSelect.value );
		} );
	}
};

const setInitialPlans = ( pricingTable ) => {
	const toggleButtons = pricingTable.querySelectorAll( '.pricing-table__desktop-categories li' );
	const mobileSelect = pricingTable.querySelector( '#select-plans' );
	const possiblePlans = Object.keys( plansSet );
	const queryString = window.location.search;
	const urlParams = new URLSearchParams( queryString );
	const planName = urlParams.get( 'for' );

	if ( planName !== null && possiblePlans.includes( planName ) ) {
		const activeButton = pricingTable.querySelector(
			`.pricing-table__desktop-categories li[data-plans-for="${ plansSet[ planName ] }"]`
		);
		selectPlans( plansSet[ planName ] );
		toggleButtons.forEach( ( item ) => item.classList.remove( 'active' ) );
		activeButton.classList.add( 'active' );
		mobileSelect.value = plansSet[ planName ];
	}
};

const pricingColumnsToggles = ( pricingTable ) => {
	const pricingColumns = pricingTable.querySelectorAll( '.pricing-table_column' );
	const expandFeaturesToggles = pricingTable.querySelectorAll(
		'.pricing-table_column-mobile-features__details'
	);

	if ( expandFeaturesToggles ) {
		expandFeaturesToggles.forEach( ( toggle ) => {
			toggle.addEventListener( 'click', () => {
				pricingColumns.forEach( ( column ) => column.classList.toggle( 'open' ) );
			} );
		} );
	}
};

const stickyHeaderTitle = () => {
	const getClosestTitle = ( titlesArr, targetOffset ) =>
		titlesArr.reduce( ( acc, obj ) =>
			Math.abs( targetOffset - obj.offsetTop ) < Math.abs( targetOffset - acc.offsetTop )
				? obj
				: acc
		);

	const titleContainer = document.querySelector( '.comparison-table__header-sticky-title' );
	const titleEls = document.querySelectorAll(
		'.comparison-table__category-plan > tr > th:first-child'
	);
	const titles = [];

	if ( titleEls ) {
		Array.from( titleEls ).forEach( ( titleEl ) => {
			const title = titleEl.innerHTML;
			titles.push( {
				title,
				offsetTop: Math.floor( titleEl.getBoundingClientRect().top ),
			} );
		} );
	}

	const activeTitle = getClosestTitle( titles, 0 );

	if ( titleContainer.innerHTML !== activeTitle.title ) {
		titleContainer.innerHTML = activeTitle.title;
	}
};

const initPricingPageScripts = () => {
	const pricingTable = document.querySelector( '.pricing-table' );

	handleTestimonialSwiper();
	handleTermSwitch( pricingTable );
	handleSwiper( pricingTable );

	pricingPageToggles( pricingTable );
	pricingColumnsToggles( pricingTable );

	comparisonTableStickyHeader();
	comparisonTableToggles();
	stickyHeaderTitle();

	window.addEventListener( 'scroll', () => {
		stickyHeaderTitle();
	} );

	setInitialPlans( pricingTable );
};

document.addEventListener( 'DOMContentLoaded', initPricingPageScripts, false );
