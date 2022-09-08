/**
 * Search Swiftype.
 */

import { initBlock } from 'scripts/helpers/_blocks';

// eslint-disable-next-line no-unused-vars
const initSearchSwiftype = ( searchSwiftype ) => {
	setTimeout( () => {
		if ( searchSwiftype.dataset && searchSwiftype.dataset.swiftypeId ) {
			const searchInput = searchSwiftype.querySelector( '.search-swiftype__input' );
			const searchContainer = searchSwiftype.querySelector( '.st-search-container' );
			const noResultContainer = searchSwiftype.querySelector(
				'.search-swiftype__no-results'
			);

			const checkNoResultOn = ( toCheckResultContainer ) => {
				const noResults =
					toCheckResultContainer.querySelectorAll( '.st-ui-result' ).length === 0;

				if ( noResults && searchInput.value !== '' ) {
					noResultContainer.classList.remove( 'd-none' );
				} else {
					noResultContainer.classList.add( 'd-none' );
				}
			};

			if ( searchContainer && noResultContainer ) {
				// eslint-disable-next-line no-undef
				const noResultMutationObserver = new MutationObserver( () => {
					checkNoResultOn( searchContainer );
				} );
				noResultMutationObserver.observe( searchContainer, {
					attributes: false,
					childList: true,
					subtree: true,
				} );
			}

			let checkTimeout;
			// eslint-disable-next-line no-undef
			const injectedContentMutationObserver = new MutationObserver( () => {
				const injectedContent = document.getElementById( 'st-injected-content' );
				if ( injectedContent ) {
					checkNoResultOn( injectedContent );

					const checkCallback = () => {
						if ( searchInput.value === '' ) {
							checkNoResultOn( injectedContent );
						} else {
							clearTimeout( checkTimeout );
							checkTimeout = setTimeout( () => {
								checkNoResultOn( injectedContent );
							}, 1000 );
						}
					};
					searchInput.removeEventListener( 'keyup', checkCallback );
					searchInput.addEventListener( 'keyup', checkCallback );
				}
			} );
			injectedContentMutationObserver.observe( document.body, {
				attributes: false,
				childList: true,
				subtree: true,
			} );

			const swiftypeID = searchSwiftype.dataset.swiftypeId;
			const swiftypeSnippet = `(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);})(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');_st('install','${ swiftypeID }','2.0.0');`;

			const scriptNode = document.createElement( 'SCRIPT' );
			scriptNode.innerText = swiftypeSnippet;
			document.body.appendChild( scriptNode );
		}
	}, 10 );
};

initBlock( '.search-swiftype', initSearchSwiftype );
