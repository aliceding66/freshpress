// control the navigation menu open/close

const initHub = () => {
	const title = document.querySelector( '.mobile-list-title' );

	title.addEventListener( 'click', () => {
		title.classList.toggle( 'open' );
	} );

	if ( document.getElementsByClassName( 'slide-in' )[ 0 ] !== null ) {
		document
			.querySelectorAll( '.sticky-top' )[ 1 ]
			.style.setProperty(
				'top',
				document.getElementsByClassName( 'slide-in' )[ 0 ].offsetHeight + 50 + 'px',
				'important'
			);
	}
};

const initHomepageScripts = () => {
	initHub();
};

document.addEventListener( 'DOMContentLoaded', initHomepageScripts, false );
