<?php
/**
 * Accounting Partners Simple Hero block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'accounting-partners-simple-hero',
	[
		'title'          => 'Accounting Partners Simple Hero',
		'description'    => 'Accounting Partners Simple Hero with title and background color',
		'keywords'       => [ 'accounting', 'partners', 'simple', 'hero', 'title', 'background', 'color' ],
		'preload_styles' => true,
	]
);
