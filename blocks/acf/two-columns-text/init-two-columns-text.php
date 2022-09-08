<?php
/**
 * Two Columns Text block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'two-columns-text',
	[
		'title'          => 'Two Columns Text',
		'description'    => 'A block containing a Two Columns Text',
		'keywords'       => [ 'two', 'columns', 'text' ],
		'preload_styles' => true,
	]
);
