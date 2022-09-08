import hljsCurl from 'highlightjs-curl';
import hljs from 'highlight.js';

/**
 * Single API
 */

/**
 * Sidebar and Snippets section scripts.
 */
const sidebarAndSnippets = () => {
	const menu = document.querySelector( '.snippets__menu' );
	const menuTabs = menu.querySelectorAll( '.snippets__menu-tab' );
	const snippetTabs = document.querySelectorAll( '.snippets__tab-content' );

	menuTabs.forEach( ( tab ) => {
		tab.addEventListener( 'click', ( e ) => {
			const targetTab = e.target.dataset.targetTab;
			menu.querySelector( '.snippets__menu-tab.active' ).classList.remove( 'active' );
			e.target.classList.add( 'active' );
			snippetTabs.forEach( ( snippet ) => {
				if ( targetTab === snippet.dataset.tab ) {
					snippet.classList.remove( 'd-none' );
				} else {
					snippet.classList.add( 'd-none' );
				}
			} );
		} );
	} );

	const sidebarSections = document.querySelectorAll( '.api__menu-section' );
	sidebarSections.forEach( ( section ) => {
		const sectionTitle = section.querySelector( '.api__menu-section--title' );
		const sectionGroup = section.querySelector( '.api__menu-section--group' );
		sectionTitle.addEventListener( 'click', () => {
			if ( sectionGroup.classList.contains( 'd-none' ) ) {
				sectionGroup.classList.remove( 'd-none' );
				sectionTitle.classList.remove( 'collapsed' );
			} else {
				sectionGroup.classList.add( 'd-none' );
				sectionTitle.classList.add( 'collapsed' );
			}
		} );
	} );
};

/**
 * Code Highlight
 */
const highlightCode = () => {
	// Add Routeros syntax cURL support.
	hljs.registerLanguage( 'curl', hljsCurl );

	// Get snippets in content column.
	const colContent = document.querySelector( '.col-content' );
	const contentSnippets = colContent.querySelectorAll( 'pre' );

	// Snippet syntax highlighting.
	contentSnippets.forEach( ( snippet ) => {
		hljs.highlightElement( snippet );
	} );
};

/**
 * Single API scripts init.
 */
const initSingleApi = () => {
	sidebarAndSnippets();
	highlightCode();
};

document.addEventListener( 'DOMContentLoaded', initSingleApi, false );
