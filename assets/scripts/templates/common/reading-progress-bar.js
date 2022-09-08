/**
 * Reading Progress Bar.
 */
const initReadingProgressBar = () => {
	const readingProgressBar = document.querySelector( '.reading-progress-bar' );
	const container = document.querySelector( '#main-content' );

	if ( readingProgressBar && container ) {
		// Calculate offsets on initial load.
		let containerHeight = container.offsetHeight - window.innerHeight / 2;
		let containerOffset = container.offsetTop;

		// Recalculate offsets if the window resizes.
		window.addEventListener( 'resize', () => {
			containerHeight = container.offsetHeight - window.innerHeight / 2;
			containerOffset = container.offsetTop;
		} );

		// On scroll update the width of the bar based on our scroll position within the #main-content container.
		window.addEventListener( 'scroll', () => {
			const scrollPercent =
				Math.min(
					1,
					Math.max( 0, ( window.pageYOffset - containerOffset ) / containerHeight )
				) * 100;
			readingProgressBar.style.width = `${ scrollPercent }%`;
		} );
	}
};

document.addEventListener( 'DOMContentLoaded', initReadingProgressBar, false );
