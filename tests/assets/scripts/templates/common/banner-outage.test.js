/* eslint-env jest */

import * as bannerOutage from 'scripts/templates/common/banner-outage';

describe( 'banner-outage.js', () => {
	describe( 'initBannerOutage', () => {
		test( 'initBannerOutage function exists', () => {
			expect( typeof bannerOutage.default.__get__( 'initBannerOutage' ) ).toBe( 'function' );
		} );

		test( 'initBannerOutage adds lick eventListener to all dismiss buttons', () => {
			// Preparation.
			document.body.innerHTML = `
				<div class="test-banner banner-outage">
					<button type="button" data-dismiss="modal" class="dismiss-outage-banner">Dismiss</button>
				</div>
				<div class="test-banner banner-outage">
					<button type="button" data-dismiss="modal" class="dismiss-outage-banner">Dismiss</button>
				</div>
				<div class="test-banner not-banner-outage">
					<button type="button" data-dismiss="modal" class="dismiss-outage-banner">Dismiss</button>
				</div>`;

			const testBanners = document.querySelectorAll( '.test-banner' );
			const dismissButtons = Array.from( testBanners ).map( ( testBanner ) =>
				testBanner.querySelector( '.dismiss-outage-banner' )
			);
			const dismissButtonsEventListenerSpies = dismissButtons.map( ( btn ) =>
				jest.spyOn( btn, 'addEventListener' )
			);

			// Call 'DOMContentLoaded' event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			testBanners.forEach( ( testBanner, index ) => {
				const isBannerOutage = testBanner.classList.contains( 'banner-outage' );
				const eventListenerSpy = dismissButtonsEventListenerSpies[ index ];
				const dismissButton = dismissButtons[ index ];

				if ( isBannerOutage ) {
					expect( eventListenerSpy ).toHaveBeenCalledWith(
						'click',
						expect.any( Function )
					);
					expect( eventListenerSpy ).toHaveBeenCalledTimes( 1 );
				} else {
					expect( eventListenerSpy ).toHaveBeenCalledTimes( 0 );
				}

				// Test also dismiss button click.
				dismissButton.click();

				if ( isBannerOutage ) {
					expect( testBanner.classList ).toContain( 'd-none' );
				} else {
					expect( testBanner.classList ).not.toContain( 'd-none' );
				}
			} );

			// Cleanup.
			dismissButtonsEventListenerSpies.forEach( ( spy ) => spy.mockRestore() );
			jest.resetAllMocks();
		} );
	} );
} );
