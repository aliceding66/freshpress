/**
 * The header.
 */

const stickyHeader = ( desktopHeader ) => {
	const { scrollY } = window;

	if ( scrollY > 0 ) {
		desktopHeader.classList.add( 'sticky' );
	} else {
		desktopHeader.classList.remove( 'sticky' );
	}
};

export const initHeader = () => {
	const header = document.querySelector( '.header' );
	const desktopHeader = document.querySelector( '.header__desktop-header' );

	if ( header ) {
		// Mobile Nav.
		const menuClasses = {
			menuItemActive: 'header__nav-menu-item_active',
			menuItems: '#header__mobile-header .menu-item-has-children',
			mobileHandlerBodyActive: 'header__body_active',
			mobileHandlerClose: '#header__menu-handler-image_close',
			mobileHandlerImageActive: 'header__menu-handler-image_active',
			mobileHandlerOpen: '#header__menu-handler-image_open',
			mobileHeaderBody: '#header__body',
			displayNone: 'd-none',
		};

		// Main menu show/hide.
		const mobileHandlerOpen = document.querySelector( menuClasses.mobileHandlerOpen );
		const mobileHandlerClose = document.querySelector( menuClasses.mobileHandlerClose );
		const mobileHeaderBody = document.querySelector( menuClasses.mobileHeaderBody );

		if ( mobileHandlerOpen ) {
			mobileHandlerOpen.addEventListener( 'click', ( el ) => {
				el.target.classList.add( menuClasses.displayNone );
				mobileHandlerClose.classList.remove( menuClasses.displayNone );
				mobileHeaderBody.classList.add( menuClasses.mobileHandlerBodyActive );
			} );
		}

		if ( mobileHandlerClose ) {
			mobileHandlerClose.addEventListener( 'click', ( el ) => {
				el.target.classList.add( menuClasses.displayNone );
				mobileHandlerOpen.classList.remove( menuClasses.displayNone );
				mobileHeaderBody.classList.remove( menuClasses.mobileHandlerBodyActive );
			} );
		}

		// Sub-menus show/hide.
		const menuItems = document.querySelectorAll( menuClasses.menuItems );

		menuItems.forEach( ( item ) => {
			item.addEventListener( 'click', () => {
				item.classList.toggle( menuClasses.menuItemActive );
			} );
		} );

		if ( desktopHeader ) {
			let scrollWaiting;
			stickyHeader( desktopHeader );

			window.addEventListener( 'scroll', () => {
				stickyHeader( desktopHeader );

				if ( scrollWaiting ) {
					return;
				}
				scrollWaiting = true;

				stickyHeader( desktopHeader );

				setTimeout( () => {
					scrollWaiting = false;
				}, 100 );
			} );

			desktopHeader.querySelectorAll( 'li>a[tabindex]' ).forEach( ( item ) => {
				item.addEventListener( 'mouseenter', () => {
					const focusedElement = desktopHeader.querySelector( ':focus' );
					if ( focusedElement && focusedElement !== item ) {
						focusedElement.blur();
					}
				} );
			} );
		}
	}
};
