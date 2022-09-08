const handleSearch = () => {
	const form = document.querySelector( '.invoice-gallery-navbar__search-container form' );
	const searchInput = document.querySelector( '.invoice-gallery-navbar__search-input' );
	searchInput.addEventListener( 'keyup', ( e ) => {
		if ( e.key === 'Enter' ) {
			form.submit();
		}
	} );
};

const handleMobileSelect = () => {
	const select = document.querySelector( '#invoice-gallery-select' );

	select.addEventListener( 'change', () => {
		window.location.href = `${
			window.location.origin + window.location.pathname
		}?template_category=${ select.value }`;
	} );
};

const getPaginationElement = ( el, current ) => {
	let element = '';

	if ( ! isNaN( el ) ) {
		element = `<li data-page="${ el }" class="mx-1 d-flex justify-content-center align-items-center ${
			el === current ? 'active' : ''
		}">${ el }</li>`;
	} else {
		element = `<li class="mx-1 d-flex justify-content-center align-items-end">...</li>`;
	}

	return element;
};

const invoiceGalleryTopOffset =
	document.querySelector( '.invoice-gallery' ).getBoundingClientRect().top + window.scrollY;
const invoiceCards = Array.from( document.querySelectorAll( '.invoice-gallery__item' ) );
const leftArrow = document.querySelector( '.invoice-gallery-pagination__arrow_left' );
const rightArrow = document.querySelector( '.invoice-gallery-pagination__arrow_right' );
const paginationList = document.querySelector( '.invoice-gallery-pagination__list' );
const pagesCount = parseInt( paginationList?.dataset?.pages );

const getPagination = ( currentPage = 1 ) => {
	const current = currentPage,
		last = pagesCount,
		delta = 2,
		left = current - delta,
		right = current + delta + 1,
		range = [],
		rangeWithDots = [];
	let l;

	paginationList.innerHTML = '';

	for ( let i = 1; i <= last; i++ ) {
		if ( i === 1 || i === last || ( i >= left && i < right ) ) {
			range.push( i );
		}
	}

	for ( const i of range ) {
		if ( l ) {
			if ( i - l === 2 ) {
				rangeWithDots.push( l + 1 );
			} else if ( i - l !== 1 ) {
				rangeWithDots.push( '...' );
			}
		}
		rangeWithDots.push( i );
		l = i;
	}

	rangeWithDots.forEach( ( item ) => {
		paginationList.innerHTML += getPaginationElement( item, currentPage );
	} );

	const paginationButtons = document.querySelectorAll(
		'.invoice-gallery-pagination__list li[data-page]'
	);

	paginationButtons.forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			paginationButtons.forEach( ( btn ) => btn.classList.remove( 'active' ) );
			button.classList.add( 'active' );
			window.currentPage = currentPage;
			window.scroll( {
				top: invoiceGalleryTopOffset,
				behavior: 'smooth',
			} );
			getPagination( parseInt( button.dataset.page ) );
		} );
	} );

	if ( currentPage === 1 ) {
		leftArrow.classList.remove( 'active' );
		rightArrow.classList.add( 'active' );
	} else if ( currentPage === pagesCount ) {
		rightArrow.classList.remove( 'active' );
		leftArrow.classList.add( 'active' );
	} else {
		leftArrow.classList.add( 'active' );
		rightArrow.classList.add( 'active' );
	}

	invoiceCards.forEach( ( card ) => card.classList.add( 'd-none' ) );
	invoiceCards
		.slice( ( currentPage - 1 ) * 6, ( currentPage - 1 ) * 6 + 6 )
		.forEach( ( card ) => card.classList.remove( 'd-none' ) );
};

const handlePagination = ( page = 1 ) => {
	window.currentPage = page;
	getPagination( page );

	leftArrow.addEventListener( 'click', () => {
		const selectedPage = window.currentPage > 1 ? window.currentPage - 1 : 1;
		window.currentPage = selectedPage;
		window.scroll( {
			top: invoiceGalleryTopOffset,
			behavior: 'smooth',
		} );
		getPagination( selectedPage );
	} );

	rightArrow.addEventListener( 'click', () => {
		const selectedPage = window.currentPage < pagesCount ? window.currentPage + 1 : pagesCount;
		window.currentPage = selectedPage;
		window.scroll( {
			top: invoiceGalleryTopOffset,
			behavior: 'smooth',
		} );
		getPagination( selectedPage );
	} );
};

const initInvoiceGalleryScripts = () => {
	handleSearch();
	handleMobileSelect();
	handlePagination();
};

document.addEventListener( 'DOMContentLoaded', initInvoiceGalleryScripts, false );
