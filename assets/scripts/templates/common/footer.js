/**
 * Footer.
 */

export const initFooter = () => {
	const footer = document.querySelector( '.footer' );

	if ( footer ) {
		// Mobile Nav.
		const footerMenuClasses = {
			menuItemActive: 'footer__nav-menu-item_active',
			menuItems: 'footer .nav .menu-item-has-children',
		};

		// Sub-menus show/hide.
		const menuItems = footer.querySelectorAll( footerMenuClasses.menuItems );

		if ( menuItems ) {
			menuItems.forEach( ( item ) => {
				item.addEventListener( 'click', () => {
					item.classList.toggle( footerMenuClasses.menuItemActive );
				} );
			} );
		}
	}
};
