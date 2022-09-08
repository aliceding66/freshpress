<?php
/**
 * Filter and actions handlers for shortcodes.
 *
 * @package FreshPress\Website
 */

/**
 * Shortcode to output a post title.
 *
 * @return string
 */
function fp_shortcode_post_title() {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
	return apply_filters( 'the_title', get_the_title() );
}

/**
 * Shortcode to output post content.
 *
 * @return string
 */
function fp_shortcode_post_content() {
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
	return apply_filters( 'the_content', get_the_content() );
}

/**
 * Shortcode to output title of this taxonomy.
 *
 * @return string|void
 */
function fp_shortcode_taxonomy_title() {
	$queried_object = get_queried_object();
	if ( $queried_object instanceof WP_Term ) {
		return $queried_object->name;
	}
}

/**
 * Shortcode to output image defined for this taxonomy.
 *
 * @return string|void
 */
function fp_shortcode_taxonomy_image() {
	$queried_object = get_queried_object();
	if ( $queried_object instanceof WP_Term ) {
		$category_fields = $queried_object->taxonomy . '_' . $queried_object->term_id;
		$image = get_field( 'image', $category_fields );
		return '<figure class="wp-block-image size-large mt-4 mb-0">
			<img src="' . $image['url'] . '" alt="' . $image['alt'] . '"/>
		</figure>';
	}
}

/**
 * Shortcode to output colour code defined for this taxonomy.
 *
 * @return string|void
 */
function fp_shortcode_taxonomy_colour() {
	$queried_object = get_queried_object();
	if ( $queried_object instanceof WP_Term ) {
		$category_fields = $queried_object->taxonomy . '_' . $queried_object->term_id;
		return get_field( 'colour', $category_fields );
	}
}

/**
 * Shortcode to output archive, category, and page in breadcrumb component.
 *
 * @return string|void
 */
function fp_shortcode_archive_breadcrumbs() {
	$queried_object = get_queried_object();

	if ( $queried_object instanceof WP_Term ) {
		$tax = get_taxonomy( $queried_object->taxonomy );

		if ( $tax ) {
			$slug = explode( '/', $tax->rewrite['slug'] )[0];
			$category = fp_get_primary_term( $tax->name );

			return '<nav aria-label="breadcrumb" class="mb-3">
				<ol class="list-unstyled clearfix">
					<li class="breadcrumb-item float-left"><a class="text-decoration-none" href="' . esc_url( home_url( $slug ) ) . '">' . esc_html( __( 'Invoice Template', 'freshpress-website' ) ) . '</a></li>
					<li class="breadcrumb-item float-left">' . esc_html( $category->name ) . '</li>
					<li class="breadcrumb-item float-left sr-only" aria-current="page">' . esc_html( get_the_title() ) . '</li>
				</ol>
			</nav>';
		}
	}
}

/**
 * Register all theme shortcodes.
 */
function fp_register_shortcodes() {
	add_shortcode( 'post-title', 'fp_shortcode_post_title' );
	add_shortcode( 'post-content', 'fp_shortcode_post_content' );
	add_shortcode( 'taxonomy-title', 'fp_shortcode_taxonomy_title' );
	add_shortcode( 'taxonomy-image', 'fp_shortcode_taxonomy_image' );
	add_shortcode( 'taxonomy-colour', 'fp_shortcode_taxonomy_colour' );
	add_shortcode( 'archive-breadcrumb', 'fp_shortcode_archive_breadcrumbs' );
}
add_action( 'init', 'fp_register_shortcodes' );
