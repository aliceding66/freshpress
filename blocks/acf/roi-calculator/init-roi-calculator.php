<?php
/**
 * ROI Calculator block.
 *
 * @package FreshPress\Website
 */

/**
 * Register block.
 */
fp_register_acf_block(
	'roi-calculator',
	[
		'title'       => 'ROI Calculator',
		'description' => 'Takes user input and displays ROI information with follow-up for PDF',
		'keywords'    => [ 'roi', 'interactive', 'calculator' ],
	]
);
