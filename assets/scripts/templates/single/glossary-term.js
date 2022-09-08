/**
 * Single Glossary Term scripts init.
 */

import { initSmoothScroll } from 'scripts/helpers/_utils';

const tableOfContents = () => {
	const toc = document.querySelector( '.glossary-term__toc' );
	const tocToggle = toc.querySelector( 'p' );
	const tocList = toc.querySelector( '.glossary-term__toc ol' );
	const content = document.querySelector( '.glossary-term__content' );
	const h2Headings = content.querySelectorAll( 'h2' );
	const mainHeader = document.querySelector( 'header' ).getBoundingClientRect();

	tocToggle.addEventListener( 'click', () => {
		toc.classList.toggle( 'open' );
	} );

	if ( h2Headings ) {
		Array.from( h2Headings ).forEach( ( heading ) => {
			const id = heading.innerText.toLowerCase().replace( /[ #?]/g, '' );
			heading.setAttribute( 'id', id );
			tocList.innerHTML += `<li><a href="#${ id }">${ heading.innerText }</li>`;
		} );

		Array.from( tocList.querySelectorAll( 'li' ) ).forEach( ( li ) => {
			li.querySelector( 'a' ).addEventListener( 'click', () => {
				toc.classList.remove( 'open' );
			} );
		} );

		initSmoothScroll( 75 );
	}

	let topOffset = mainHeader.height + 15;

	if ( window.innerWidth > 1024 && window.innerWidth < 1282 ) {
		topOffset = topOffset - 42;
	}

	if ( window.innerWidth > 1281 ) {
		topOffset = topOffset - 16;
	}

	toc.style.top = `${ topOffset }px`;
};

const initSingleGlossary = () => {
	tableOfContents();
};

document.addEventListener( 'DOMContentLoaded', initSingleGlossary, false );
