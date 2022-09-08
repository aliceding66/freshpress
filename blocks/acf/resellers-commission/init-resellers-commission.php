<?php
/**
 * Resellers Commission block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'resellers-commission',
	[
		'title'       => 'Resellers Commission',
		'description' => 'A block containing different sized test, mostly used for "Up to 25% Off MSRP"',
		'keywords'    => [ 'resellers', 'commission' ],
	]
);
