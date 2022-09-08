<?php
/**
 * Two Columns VAT Description block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'two-columns-vat-description',
	[
		'title'          => 'Two Columns VAT Description',
		'description'    => 'A block containing a Two Columns VAT Description and Image',
		'keywords'       => [ 'two', 'columns', 'vat', 'description', 'image' ],
		'preload_styles' => true,

	]
);
