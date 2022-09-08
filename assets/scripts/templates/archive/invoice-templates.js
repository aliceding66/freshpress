/**
 * Invoice Templates Archive Scripts
 */

/**
 * Inits functionality.
 */
const init = () => {
	const categoryCards = document.querySelectorAll( '.box__category' );
	categoryCards.forEach( ( card ) => {
		card.addEventListener( 'click', () => {
			const url = card.querySelector( 'h3' ).getAttribute( 'data-url' );
			window.location.href = url;
		} );
	} );
};

document.addEventListener( 'DOMContentLoaded', init, false );
