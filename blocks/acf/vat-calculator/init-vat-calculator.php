<?php
/**
 * VAT Calculator block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'vat-calculator',
	[
		'title'          => 'VAT Calculator',
		'description'    => 'A block containing a FreshBooks VAT Calculator.',
		'keywords'       => [ 'vat', 'calculator' ],
		'preload_styles' => true,
	]
);
