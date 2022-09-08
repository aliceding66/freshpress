<?php
/**
 * Filter and action handlers for blocks.
 *
 * @package FreshPress\Website
 */

/**
 * Regionalize ACF block IDs upon saving.
 *
 * @param array $data    Array of post data.
 * @param array $postarr Array of sanitized (and slashed) but otherwise unmodified post data.
 */
function fp_regionalize_block_ids( $data, $postarr ) {
	if ( ! empty( $postarr['ID'] ) ) {
		$page_language = apply_filters( 'wpml_post_language_details', null, $postarr['ID'] );

		// Try to get the language from the post, if not, use the current admin language.
		if ( ! empty( $page_language['language_code'] ) ) {
			$language_code = $page_language['language_code'];
		} else {
			$language_code = fp_get_current_language();
		}

		/*
		 * If the block ID matches 'block_0123456789abc' (13 hex digits) insert the current language as 'block_xx-xx_0123456789abc'.
		 * If a language is already present, update it from 'block_xx-xx_0123456789abc' to 'block_yy-yy_0123456789abc'.
		 */
		$data['post_content'] = preg_replace( '/("block)(?:_[a-z]{2}-[a-z]{2})?_([0-9a-f]{13})/', "$1_${language_code}_$2", $data['post_content'] );
	}

	return $data;
}
add_filter( 'wp_insert_post_data', 'fp_regionalize_block_ids', '99', 2 );

/**
 * Initialise ACF Blocks.
 */
function fp_register_acf_blocks() {
	// Add custom block categories before registering.
	if ( get_bloginfo( 'version' ) >= '5.8.0' ) {
		add_filter( 'block_categories_all', 'fp_custom_block_categories' );
	} else {
		add_filter( 'block_categories', 'fp_custom_block_categories' );
	}

	$blocks = fp_get_acf_blocks();
	$blocks_path = get_stylesheet_directory() . '/blocks/acf';

	foreach ( $blocks as $block_name ) {
		if ( file_exists( "${blocks_path}/${block_name}/init.php" ) ) {
			require_once "${blocks_path}/${block_name}/init.php";
		} elseif ( file_exists( "${blocks_path}/${block_name}/init-${block_name}.php" ) ) {
			require_once "${blocks_path}/${block_name}/init-${block_name}.php";
		}
	}

	do_action( 'fp_blocks_registered' );
}
add_action( 'acf/init', 'fp_register_acf_blocks' );
