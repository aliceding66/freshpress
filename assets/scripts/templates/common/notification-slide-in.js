/**
 * Notification Slide In.
 */

import { isNfbCustomer } from 'scripts/helpers/_utils';
import { createCookie, readCookie } from 'scripts/modules/_cookies';

const initNotificationSlideIn = () => {
	const slider = document.querySelector( '.notification-slide-in' );

	if ( ! isNfbCustomer() && ! readCookie( 'notification-slide-in-dismissed' ) ) {
		slider.classList.add( 'slide-in' );
		createCookie( 'notification-slide-in-dismissed', 'true', 30 );
	}

	const closeBtns = slider.querySelectorAll( '.fp-dma-dismiss' );
	if ( closeBtns ) {
		closeBtns.forEach( ( closeBtn ) => {
			closeBtn.addEventListener( 'click', () => {
				slider.classList.add( 'd-none' );
			} );
		} );
	}
};

document.addEventListener( 'DOMContentLoaded', initNotificationSlideIn, false );
