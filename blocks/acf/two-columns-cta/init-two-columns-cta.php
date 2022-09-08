<?php
/**
 * Two Columns CTA block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'two-columns-cta',
	[
		'title'          => 'Two Columns CTA',
		'description'    => 'A block containing a Two Columns, last one contain a CTA',
		'keywords'       => [ 'two', 'columns', 'cta' ],
		'preload_styles' => true,

	]
);
