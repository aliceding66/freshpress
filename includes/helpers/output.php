<?php
/**
 * Helper functions for output.
 *
 * @package FreshPress\Website
 */

/**
 * Replace values in a string using sprintf.
 *
 * @link https://www.php.net/manual/en/function.sprintf.php
 *
 * @param string $source_str   String of content to escape (using sprintf format).
 * @param array  $replacements Array of values to use for replacements in source string.
 * @return string
 */
function fp_sprintf( $source_str, $replacements = [] ) {
	if ( empty( $replacements ) ) {
		return $source_str;
	}

	array_unshift( $replacements, $source_str );
	return call_user_func_array( 'wp_sprintf', $replacements );
}

/**
 * Return the same value passed to allow bypassing of escaping requirements.
 *
 * @param string $source_str String to be output without escaping.
 * @return string
 */
function fp_noesc( $source_str ) {
	return $source_str;
}

/**
 * Check if a string could be numerical, or a boolean value, and return the appropriately
 * formatted value. Helps process Google Sheets CSV exports.
 *
 * @param   string $string String of data to be tested and formatted if boolean or numerical.
 * @return  (string|bool|int|double)
 */
function fp_format_vartype( $string ) {
	// Check for boolean.
	$bool_array = [
		'true',
		'false',
		'1',
		'0',
		'yes',
		'no',
	];
	if ( is_string( $string ) && in_array( strtolower( $string ), $bool_array, true ) ) {
		return filter_var( $string, FILTER_VALIDATE_BOOLEAN );
	}

	// Check if numeric.
	if ( is_numeric( $string ) ) {
		return $string + 0;
	}

	// ...or return unmodified string.
	return $string;
}

/**
 * Get template page content for a path and replace any 'insert-template-content' blocks.
 *
 * @param string $content   The content to be inserted as a replacement.
 * @param string $slug      The slug that is passed to the query.
 * @param string $post_type The post-type that is we are using for a template (defaults to 'template_page').
 * @return string
 */
function fp_get_template_page_content( $content = '', $slug = '', $post_type = '' ) {
	if ( empty( $slug ) ) {
		if ( is_single() ) {
			$slug = strtr( get_post_type(), '_', '-' );
		} elseif ( is_tax() ) {
			$slug = strtr( get_query_var( 'taxonomy' ), '_', '-' );
		} elseif ( is_archive() ) {
			$slug = strtr( get_post_type(), '_', '-' ) . '-archive';
		}
	}

	if ( ! empty( $slug ) ) {
		if ( ! is_string( $post_type ) || ! post_type_exists( $post_type ) ) {
			$post_type = 'template_page';
		}

		$template_page = get_page_by_path( $slug, OBJECT, 'template_page' );

		if ( $template_page instanceof WP_Post ) {
			// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
			$content = str_replace( '<!-- insert-template-content /-->', $content, apply_filters( 'the_content', $template_page->post_content ) );
		}
	}

	return $content;
}
