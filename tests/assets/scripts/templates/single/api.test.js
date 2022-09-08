/* eslint-env jest */

jest.mock( 'highlight.js', () => ( {
	registerLanguage: jest.fn(),
	highlightElement: jest.fn(),
} ) );

import * as api from 'scripts/templates/single/api';
import hljs from 'highlight.js';
import hljsCurl from 'highlightjs-curl';

describe( 'api.js', () => {
	describe( 'sidebarAndSnippets', () => {
		test( 'sidebarAndSnippets function exists', () => {
			expect( typeof api.default.__get__( 'sidebarAndSnippets' ) ).toBe( 'function' );
		} );

		test( 'sidebarAndSnippets is making event bindings to handle menu and snippets', () => {
			// Preparation.
			document.body.innerHTML = `
				<div class="col-12 col-lg-2 d-none d-lg-block p-0 border-right">
    				<div class="api__menu-items">       
     					<div class="api__menu-section border-bottom">
      						<a class="api__menu-section--title text-decoration-none d-flex align-items-center justify-content-between pl-4 pr-3 pt-3">
       							<span>Getting Started</span>
      							<svg width="10px" height="7px" viewBox="0 0 10 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
							</a>
             				<div class="api__menu-section--group py-2">
                          		<a class="api__menu-section--item d-block pl-5 pr-2 py-1" href="https://www.dev.freshenv.com/api/start">
          							<span>Introduction</span>
         						</a>
               				</div>
           				</div>
                	</div>
 				</div>
				<div class="col-content"> Empty </div>	
				<div class="col-snippets col-12 col-lg-5 pt-0 px-3 px-lg-0 pb-5 m-0">
					<div class="snippets bg-dark">
   						<div class="snippets__menu">
         					<a class="snippets__menu-tab text-decoration-none d-inline-block px-3 pt-1 pb-2 active" data-target-tab="curl">curl</a>
							<a class="snippets__menu-tab text-decoration-none d-inline-block px-3 pt-1 pb-2" data-target-tab="python">Python</a>
           				</div>

   						<div class="snippets__wrapper p-3">
							<div class="snippets__tab-content" data-tab="curl"></div>
							<div class="snippets__tab-content d-none" data-tab="python"></div>
           				</div>
  					</div>
 				</div>
			`;

			const snippetMenuTabs = {
				curl: document.querySelector(
					'.snippets__menu .snippets__menu-tab[data-target-tab="curl"]'
				),
				python: document.querySelector(
					'.snippets__menu .snippets__menu-tab[data-target-tab="python"]'
				),
			};
			const snippetMenuTabSpies = {
				curl: jest.spyOn( snippetMenuTabs.curl, 'addEventListener' ),
				python: jest.spyOn( snippetMenuTabs.python, 'addEventListener' ),
			};
			const snippetTabContents = {
				curl: document.querySelector( '.snippets__tab-content[data-tab="curl"]' ),
				python: document.querySelector( '.snippets__tab-content[data-tab="python"]' ),
			};

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			Object.entries( snippetMenuTabSpies ).forEach( ( [ , spy ] ) => {
				expect( spy ).toHaveBeenCalledWith( 'click', expect.any( Function ) );
				expect( spy ).toHaveBeenCalledTimes( 1 );
			} );

			// Start.
			expect( snippetMenuTabs.curl.classList ).toContain( 'active' );
			expect( snippetTabContents.curl.classList ).not.toContain( 'd-none' );
			expect( snippetMenuTabs.python.classList ).not.toContain( 'active' );
			expect( snippetTabContents.python.classList ).toContain( 'd-none' );

			// Click "Python".
			snippetMenuTabs.python.click();
			expect( snippetMenuTabs.curl.classList ).not.toContain( 'active' );
			expect( snippetTabContents.curl.classList ).toContain( 'd-none' );
			expect( snippetMenuTabs.python.classList ).toContain( 'active' );
			expect( snippetTabContents.python.classList ).not.toContain( 'd-none' );

			// Click "curl".
			snippetMenuTabs.curl.click();
			expect( snippetMenuTabs.curl.classList ).toContain( 'active' );
			expect( snippetTabContents.curl.classList ).not.toContain( 'd-none' );
			expect( snippetMenuTabs.python.classList ).not.toContain( 'active' );
			expect( snippetTabContents.python.classList ).toContain( 'd-none' );
		} );
	} );

	describe( 'highlightCode', () => {
		test( 'highlightCode function exists', () => {
			expect( typeof api.default.__get__( 'highlightCode' ) ).toBe( 'function' );
		} );

		test( 'highlightCode is highlighting pre elements in col-content', () => {
			// Preparation.
			document.body.innerHTML = `
				<div class="snippets__menu"></div>	
				<div class="col-content col-12">
					<pre style="height: 15pc; overflow-y: scroll;">
						<code>curl -L -X GET ...</code>
						<code>{ "response": { ... } }</code>
					</pre>

					<pre style="height: 15pc; overflow-y: scroll;">
						<code>curl -L -X GET ...</code>
						<code>{ "response": { ... } }</code>
					</pre>
				</div>
			`;

			// Call "DOMContentLoaded" event.
			document.dispatchEvent(
				new window.Event( 'DOMContentLoaded', { bubbles: true, cancelable: true } )
			);

			// Test expectations.
			expect( hljs.registerLanguage ).toHaveBeenCalledWith( 'curl', hljsCurl );
			expect( hljs.highlightElement ).toHaveBeenCalledTimes( 2 );
		} );
	} );
} );
