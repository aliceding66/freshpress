<?php
/**
 * Accounting Partners Services Accordion block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'accounting-partners-services-accordion',
	[
		'title'          => 'Accounting Partners Services Accordion',
		'description'    => 'Accounting Partners Services Accordion with link of services filter by location',
		'keywords'       => [ 'accounting', 'partners', 'services', 'accordion', 'location', 'sitemap', 'filter' ],
		'preload_styles' => true,
	]
);
