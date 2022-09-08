const initializeSignupPage = () => {
	const contentExpander = document.querySelector( '#content-expander' );
	const contentButton = document.querySelector( '#content-button' );
	const content = document.querySelector( '.signup-page__content-wrapper' );

	[ contentExpander, contentButton ].forEach( ( expander ) => {
		expander.addEventListener( 'click', () => {
			contentExpander.classList.toggle( 'expanded' );
			content.classList.toggle( 'shown' );
		} );
	} );
};

document.addEventListener( 'DOMContentLoaded', initializeSignupPage, false );
