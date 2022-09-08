<?php
/**
 * Accounting Partners Hero block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'accounting-partners-hero',
	[
		'title'          => 'Accounting Partners Hero',
		'description'    => 'Accounting Partners Hero Banner',
		'keywords'       => [ 'accounting', 'partners', 'hero', 'banner', 'cta' ],
		'preload_styles' => true,
	]
);
