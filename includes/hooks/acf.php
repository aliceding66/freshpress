<?php
/**
 * Filter and action handlers for ACF.
 *
 * @package FreshPress\Website
 */

/**
 * Strip unprintable characters from a field value.
 *
 * @param mixed $value   The field value.
 * @return  mixed
 */
function fp_sanitize_field_value( $value ) {
	if ( is_string( $value ) ) {
		$value = preg_replace( '/[^[:print:]\r\n]/', '', $value );
	}
	return $value;
}

// Add fp_sanitize_field_value filter to inline_scripts field.
add_filter( 'acf/update_value/name=inline_scripts', 'fp_sanitize_field_value' );

/**
 * Hide ACF menu from non-dev environments.
 *
 * @return boolean
 */
function fp_acf_show_admin() {
	if ( defined( 'ACF_SHOW_ADMIN' ) ) {
		if ( is_string( ACF_SHOW_ADMIN ) ) {
			return 'true' === ACF_SHOW_ADMIN;
		}

		return (bool) ACF_SHOW_ADMIN;
	}

	return in_array( fp_get_env(), [ 'development', 'local' ], true );
}
add_filter( 'acf/settings/show_admin', 'fp_acf_show_admin' );

/**
 * For ACF fields that load post types into choices, filter to only our used post types.
 *
 * @param  array $field ACF field being loaded.
 * @return array
 */
function fp_acf_filter_post_types( $field ) {
	$post_types = fp_get_post_types( [ 'exclude' => [ 'attachment' ] ] );
	if ( array_key_exists( 'choices', $field ) ) {
		$field['choices'] = [];

		// Exclude Media (attachment) from the results.
		foreach ( $post_types as $post_type ) {
			$field['choices'][ $post_type->name ] = $post_type->label;
		}
	} elseif ( array_key_exists( 'post_type', $field ) && empty( $field['post_type'] ) ) {
		$field['post_type'] = array_keys( $post_types );
	}

	return $field;
}
add_filter( 'acf/load_field/name=select_post_type', 'fp_acf_filter_post_types' );
add_filter( 'acf/load_field/type=relationship', 'fp_acf_filter_post_types' );
add_filter( 'acf/load_field/type=page_link', 'fp_acf_filter_post_types' );
add_filter( 'acf/load_field/type=post_object', 'fp_acf_filter_post_types' );


/**
 * For ACF fields that run custom queries, set some defaults.
 *
 * @param  array $args Arguments passed to WP_Query.
 * @return array
 */
function fp_acf_filter_query_args( $args ) {
	$args['order'] = 'ASC';
	$args['orderby'] = 'name';
	$args['posts_per_page'] = 100;

	return $args;
}
add_filter( 'acf/fields/post_object/query', 'fp_acf_filter_query_args', 10, 1 );
add_filter( 'acf/fields/relationship/query', 'fp_acf_filter_query_args', 10, 1 );

/**
 * Fill "allowed_users" with all available users.
 *
 * @param array $field ACF field.
 *
 * @return array
 */
function fp_fill_allowed_users_field( $field ) {
	$field['choices'] = [];

	if ( fp_get_env() === 'production' ) {
		$field['choices']['all'] = 'All users have access on production';
		$field['default_value'] = 'all';
		$field['disabled'] = true;
	} else {
		foreach ( get_users() as $user ) {
			$field['choices'][ $user->user_login ] = $user->user_email;
		}
	}

	return $field;
}

add_filter( 'acf/load_field/name=allowed_users', 'fp_fill_allowed_users_field' );

/**
 * Update temporarily allow bots timestamp.
 *
 * @param string $value Checkbox value.
 *
 * @return string
 */
function fp_update_temporarily_allow_bots_timestamp( $value ) {
	if ( $value > 0 ) {
		$new_temporarily_allow_bots_timestamp = strtotime( '+10 minutes' );
	} else {
		$new_temporarily_allow_bots_timestamp = 0;
	}

	update_option( 'temporarily_allow_bots_timestamp', $new_temporarily_allow_bots_timestamp );

	return $value;
}

add_filter( 'acf/update_value/name=temporarily_allow_bots', 'fp_update_temporarily_allow_bots_timestamp' );

/**
 * Clears temporarily_allow_bots_timestamp and uncheck temporarily_allow_bots if timestamp is expired.
 *
 * @param array $field ACF field.
 *
 * @return array
 */
function fp_clear_temporarily_allow_bots( $field ) {
	if ( fp_is_temporarily_allowed_bots_timestamp_expired() ) {
		update_option( 'temporarily_allow_bots_timestamp', 0 );
		update_option( 'options_temporarily_allow_bots', '0' );
	}

	return $field;
}

add_filter( 'acf/load_field/name=temporarily_allow_bots', 'fp_clear_temporarily_allow_bots' );

/**
 * Calculate hub_fb_featured_image field value.
 *
 * @param mixed   $value Value passed in.
 * @param integer $current_post_id Current post ID.
 * @return string
 */
function fp_calculate_hub_article_fb_featured_image( $value, $current_post_id ) {
	require_once get_template_directory() . '/partials/common/hub/common-functions.php';
	$post_category = $category ?? fp_get_primary_term( 'hub_category', $current_post_id );
	if ( $post_category instanceof WP_Term ) {
		$category_slug = $post_category->slug;
	}

	$listing_image = fp_get_post_extended_featured_image( fp_get_featured_image( '_featured_image', $current_post_id ), $current_post_id, $post_category ? $post_category->term_id : '' );

	if ( ! empty( $listing_image ) ) {
		return $listing_image;
	} elseif ( ! empty( $category_slug ) && fp_asset_exists( "images/hub/icon-${category_slug}.png" ) ) {
		return fp_get_asset( "images/hub/icon-${category_slug}.png" );
	}
}

add_filter( 'acf/load_value/name=hub_fb_featured_image', 'fp_calculate_hub_article_fb_featured_image', 10, 2 );

/**
 * Calculate fb_estimated_read_time field value.
 *
 * @param mixed   $value Value passed in.
 * @param integer $current_post_id Current post ID.
 * @return int
 */
function fp_calculate_extended_article_estimated_read_time_field( $value, $current_post_id ) {
	$post = get_post( $current_post_id );

	return fp_estimate_read_time( $post->post_content );
}

add_filter( 'acf/load_value/name=fb_estimated_read_time', 'fp_calculate_extended_article_estimated_read_time_field', 10, 2 );
