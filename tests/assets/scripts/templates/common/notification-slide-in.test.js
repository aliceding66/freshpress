/* eslint-env jest */

import { createCookie, eraseCookie } from 'scripts/modules/_cookies';
import * as notificationSlideIn from 'scripts/templates/common/notification-slide-in';
import fs from 'fs';
import path from 'path';

let slider;
let closeButtons;
let closeButtonSpies;

beforeEach( () => {
	global.document.body.innerHTML = fs.readFileSync(
		path.resolve( __dirname, 'notification-slide-in.test.html' ),
		'utf8'
	);

	slider = document.querySelector( '.notification-slide-in' );
	closeButtons = slider.querySelectorAll( '.fp-dma-dismiss' );
	closeButtonSpies = Array.from( closeButtons ).map( ( btn ) =>
		jest.spyOn( btn, 'addEventListener' )
	);
} );

afterAll( () => {
	// Cleanup.
	closeButtonSpies.forEach( ( spy ) => spy.mockRestore() );
	jest.resetAllMocks();
} );

describe( 'header-banner-promo.js', () => {
	describe( 'initNotificationSlideIn', () => {
		test( 'initNotificationSlideIn function exists', () => {
			expect( typeof notificationSlideIn.default.__get__( 'initNotificationSlideIn' ) ).toBe(
				'function'
			);
		} );

		test( 'initNotificationSlideIn is not showing for Freshbooks customer', () => {
			// Preparation.
			// FreshBooks customer init.
			createCookie( 'smux_login', 'true' );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( slider.classList ).not.toContain( 'slide-in' );
			expect( document.cookie ).not.toContain( 'notification-slide-in-dismissed' );
		} );

		test( 'initNotificationSlideIn is not showing if notification was dismissed', () => {
			// Preparation.
			// Notification dismissed init.
			createCookie( 'notification-slide-in-dismissed', 'true' );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( slider.classList ).not.toContain( 'slide-in' );
		} );

		test( 'initNotificationSlideIn is showing for not Freshbooks customer with working close buttons', () => {
			// Preparation.
			// FreshBooks customer init.
			eraseCookie( 'notification-slide-in-dismissed' );
			eraseCookie( 'smux_login' );

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( slider.classList ).toContain( 'slide-in' );
			expect( document.cookie ).toContain( 'notification-slide-in-dismissed' );
			closeButtonSpies.forEach( ( spy ) => {
				expect( spy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
				expect( spy ).toHaveBeenCalledTimes( 1 );
			} );

			closeButtons[ 0 ].click();

			expect( slider.classList ).toContain( 'd-none' );
		} );
	} );
} );
