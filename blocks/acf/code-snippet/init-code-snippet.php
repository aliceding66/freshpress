<?php
/**
 * Code Snippet block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'code-snippet',
	[
		'title'       => 'Code Snippet',
		'description' => 'Formatted code snippet with syntax highlighting based on auto-detected language.',
		'keywords'    => [ 'code', 'snippet', 'example', 'function' ],
	]
);
