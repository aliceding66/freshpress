<?php
/**
 * General archive template that loads one of the following:
 *   1. an archive template if it exists, OR
 *   2. a taxonomy template if it exists, OR
 *   3. a general content template.
 *
 * @package FreshPress\Website
 */

$queried_object = get_queried_object();
$post_type_name = get_post_type();
$displayed_type = 'archive';

if ( $queried_object instanceof WP_Term ) {
	$taxonomy_name = $queried_object->taxonomy;
	$displayed_type = 'taxonomy';
} else {
	$taxonomy_name = get_object_taxonomies( $post_type_name )[0] ?? '';
}

get_header();

ob_start();

if ( file_exists( get_template_directory() . "/partials/archive/${post_type_name}.php" ) ) {
	get_template_part( "partials/archive/${post_type_name}" );
} elseif ( file_exists( get_template_directory() . "/partials/taxonomy/${taxonomy_name}.php" ) ) {
	get_template_part( "partials/taxonomy/${taxonomy_name}" );
} else {
	get_template_part( 'partials/content' );
}
$replacement = ob_get_clean();

echo fp_get_template_page_content( $replacement );

get_footer();
