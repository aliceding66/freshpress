<?php
/**
 * Commission Details block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'commission-details',
	[
		'title'       => 'Commission Details',
		'description' => 'A block containing commission details tiles',
		'keywords'    => [ 'commission', 'details' ],
	]
);
