/* eslint-env jest */

import * as readingProgressBar from 'scripts/templates/common/reading-progress-bar';

describe( 'reading-progress-bar.js', () => {
	describe( 'initReadingProgressBar', () => {
		test( 'initReadingProgressBar function exists', () => {
			expect( typeof readingProgressBar.default.__get__( 'initReadingProgressBar' ) ).toBe(
				'function'
			);
		} );

		test( 'initReadingProgressBar is adjusting progress-reading-bar with proper width', () => {
			// Preparation.
			const readingProgressBarElement = document.createElement( 'div' );
			readingProgressBarElement.setAttribute(
				'class',
				'reading-progress-bar m-0 position-fixed'
			);
			document.body.appendChild( readingProgressBarElement );
			const mainContent = document.createElement( 'div' );
			mainContent.setAttribute( 'id', 'main-content' );
			let mainContentOffsetTop = 0; //How much content is below top edge of viewport.
			Object.defineProperty( mainContent, 'offsetTop', {
				get: () => mainContentOffsetTop,
				set: () => {},
			} );
			Object.defineProperty( mainContent, 'offsetHeight', {
				get: () => 600, // As content full height.
				set: () => {},
			} );
			document.body.appendChild( mainContent );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			[
				{
					viewportHeight: 200,
					expectedWidth: '0%',
				},
				{
					scrollTo: 'first',
					expectedWidth: '0%',
				},
				{
					scrollTo: 'second',
					expectedWidth: '40%',
				},
				{
					scrollTo: 'third',
					expectedWidth: '100%',
				},
				{
					scrollTo: 'fourth',
					expectedWidth: '100%',
				},
				{
					viewportHeight: 100,
					mainContentOffsetTop: 100,
					scrollTo: 'first',
					expectedWidth: '0%',
				},
				{
					scrollTo: 'second',
					expectedWidth: '18.181818181818183%',
				},
				{
					scrollTo: 'third',
					expectedWidth: '72.72727272727273%',
				},
				{
					scrollTo: 'fourth',
					expectedWidth: '100%',
				},
			].forEach( ( caseData ) => {
				if ( caseData.mainContentOffsetTop ) {
					mainContentOffsetTop = caseData.mainContentOffsetTop;
				}

				if ( caseData.viewportHeight ) {
					global.innerHeight = caseData.viewportHeight;
					global.dispatchEvent( new window.Event( 'resize' ) );
				}

				if ( caseData.scrollTo ) {
					switch ( caseData.scrollTo ) {
						case 'first':
							global.pageYOffset = 0;
							break;
						case 'second':
							global.pageYOffset = 200;
							break;
						case 'third':
							global.pageYOffset = 500;
							break;
						case 'fourth':
							global.pageYOffset = 650;
							break;
					}
				}

				global.dispatchEvent( new window.Event( 'scroll' ) );

				if ( caseData.expectedWidth ) {
					expect( readingProgressBarElement.style.width ).toBe( caseData.expectedWidth );
				}
			} );
		} );
	} );
} );
