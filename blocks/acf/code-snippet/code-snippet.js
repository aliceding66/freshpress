/**
 * Code Snippet.
 */

import { initBlock } from 'scripts/helpers/_blocks';
import hljsCurl from 'highlightjs-curl';
import hljs from 'highlight.js';

const initCodeSnippet = ( codeSnippet ) => {
	hljs.registerLanguage( 'curl', hljsCurl );

	// Snippet syntax highlighting.
	const snippets = codeSnippet.querySelectorAll( 'pre' );
	snippets.forEach( ( snippet ) => {
		hljs.highlightElement( snippet );
	} );
};

initBlock( '.code-snippet', initCodeSnippet );
