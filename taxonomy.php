<?php
/**
 * General archive template that loads a taxonomy template if it exists.
 *
 * @package FreshPress\Website
 */

$queried_object = get_queried_object();

get_header();

ob_start();
if ( is_tax() && $queried_object instanceof WP_Term && file_exists( get_template_directory() . "/partials/taxonomy/{$queried_object->taxonomy}.php" ) ) {
	get_template_part( "partials/taxonomy/{$queried_object->taxonomy}" );
} else {
	get_template_part( 'partials/content' );
}
$replacement = ob_get_clean();

echo fp_get_template_page_content( $replacement );

get_footer();
