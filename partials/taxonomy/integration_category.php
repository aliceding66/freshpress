<?php
/**
 * Taxonomy template for Integration Categories.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-integrations' );

$queried_object = get_queried_object();

// Integrations for this category.
$integrations = get_posts(
	[
		'post_type'   => 'integration',
		'post_status' => 'publish',
		'numberposts' => -1,
		'tax_query'   => [
			[
				'taxonomy' => 'integration_category',
				'field'    => 'slug',
				'terms'    => $queried_object->slug,
			],
		],
	]
);

require_once get_template_directory() . '/partials/common/integrations/integrations-taxonomy.php';
