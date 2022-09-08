/**
 * Related Links.
 */

import { initBlock } from 'scripts/helpers/_blocks';

const initRelatedLinks = ( relatedLinks ) => {
	if ( relatedLinks ) {
		// Related Link Anchors.
		if ( relatedLinks.dataset && 'true' === relatedLinks.dataset.useAnchors ) {
			const listItems = relatedLinks.querySelectorAll( '.related-links__list-item' );

			window.addEventListener( 'scroll', () => {
				listItems.forEach( ( listItem ) => {
					const listItemAnchor = listItem.querySelector( 'a' );

					if ( listItemAnchor && listItemAnchor.hash ) {
						const anchoredEl = document.querySelector( listItemAnchor.hash );

						if ( anchoredEl ) {
							const elOffsetTop =
								anchoredEl.getBoundingClientRect().top + window.pageYOffset - 100;
							const elHeight = anchoredEl.getBoundingClientRect().height;

							if (
								window.pageYOffset >= elOffsetTop &&
								window.pageYOffset <= elOffsetTop + elHeight
							) {
								listItem.classList.add( 'active' );
							} else {
								listItem.classList.remove( 'active' );
							}
						}
					}
				} );
			} );
		}

		// Related Links Dropdown List.
		const dropdownList = relatedLinks.querySelector( '.related-links__list-dropdown' );
		if ( dropdownList ) {
			dropdownList.addEventListener( 'change', ( e ) => {
				window.location.href = e.target.value;
			} );
		}
	}
};

initBlock( '.related-links', initRelatedLinks );
