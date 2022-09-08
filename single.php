<?php
/**
 * Single post template that loads an individual template part if it exists.
 *
 * @package FreshPress\Website
 */

$post_type_name = get_post_type();

get_header();

ob_start();
if ( file_exists( get_template_directory() . "/partials/single/${post_type_name}.php" ) ) {
	get_template_part( "partials/single/${post_type_name}" );
} else {
	get_template_part( 'partials/content' );
}
$replacement = ob_get_clean();

echo fp_get_template_page_content( $replacement );

get_footer();
