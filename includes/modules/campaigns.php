<?php
/**
 * Campaigns.
 *
 * @package FreshPress\Website
 */

/**
 * Register Campaign post type.
 */
function fp_register_campaign_post_type() {
	fp_register_post_type(
		'campaign',
		'campaigns',
		'Campaign',
		'Campaigns',
		[
			'public'              => false,
			'show_in_nav_menus'   => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => true,
			'rewrite'             => false,
		]
	);
}

add_action( 'init', 'fp_register_campaign_post_type' );

/**
 * Get the active campaigns.
 *
 * @return array
 */
function fp_get_active_campaigns() {

	$campaign_query = new WP_Query(
		[
			'post_type'        => 'campaign',
			'post_status'      => 'publish',
			'posts_per_page'   => 1,
			'order'            => 'DESC',
			'orderby'          => 'date',
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);

	return $campaign_query->get_posts();
}

/**
 * Initialise Campaigns.
 *
 * Runs on `fp_blocks_registered` action.
 */
function fp_init_campaign() {
	if ( ! function_exists( 'get_field' ) || ! function_exists( 'get_fields' ) ) {
		return false;
	}

	$current_language = fp_get_current_language();
	$transient_name = "active_campaigns_${current_language}";
	$campaigns = fp_get_active_campaigns();

	if ( empty( $campaigns ) ) {
		return false;
	}

	$campaign_id = $campaigns[0];

	if ( empty( get_transient( $transient_name ) ) ) {

		$custom_fields = get_fields( $campaign_id );
		if ( ! $custom_fields['campaign_active'] ) {
			return false;
		}

		// Date range.
		if ( ! isset( $custom_fields['campaign_start_date'] ) ) {
			return false;
		} else {
			$campaign_start_date = fp_get_date( $custom_fields['campaign_start_date'] );
		}

		if ( isset( $custom_fields['campaign_countdown_start_date'] ) ) {
			$campaign_countdown_start_date = fp_get_date( $custom_fields['campaign_countdown_start_date'] );
		}
		if ( isset( $custom_fields['campaign_end_date'] ) ) {
			$campaign_end_date = fp_get_date( $custom_fields['campaign_end_date'] );
		}

		$current_date = fp_get_date();
		if (
			isset( $campaign_start_date )
			&& isset( $campaign_end_date )
			&& (
				( $current_date < $campaign_start_date )
				|| ( $current_date >= $campaign_end_date )
			)
		) {
			return false;
		}

		$campaign = [];
		$skip_fields = [ 'active', 'include_promo_banner', 'include_slide_in' ];

		// Initialise component data from custom fields.
		foreach ( $custom_fields as $key => $value ) {
			$stripped_key = preg_replace( '/^campaign_/', '', $key );
			if ( ! in_array( $stripped_key, $skip_fields, true ) ) {
				$campaign[ $stripped_key ] = $value;
			}
		}

		// Dates (for the countdown timer).
		if ( isset( $campaign_countdown_start_date ) && ( $campaign_countdown_start_date instanceof DateTime ) ) {
			$campaign['countdown_start_date'] = $campaign_countdown_start_date->format( 'U' );
		}
		if ( isset( $campaign_end_date ) && ( $campaign_end_date instanceof DateTime ) ) {
			$campaign['end_date'] = $campaign_end_date->format( 'U' );
		}

		set_transient( $transient_name, $campaign, 24 * HOUR_IN_SECONDS );

	} else {
		$campaign = get_transient( $transient_name );
	}

	// Excluded Post Types.
	if ( ! empty( $campaign['excluded_post_types'] ) ) {

		$excluded_post_types = $campaign['excluded_post_types'];

		foreach ( $excluded_post_types as $excluded_post_type ) {
			if ( get_post_type() === $excluded_post_type ) {
				return false;
			}
		}
	}

	// Exclusions.
	$uri = untrailingslashit( wp_parse_url( fp_get_server_var( 'REQUEST_URI' ), PHP_URL_PATH ) );

	// Header Banner Exclusions.
	$campaign_promo_banner_exclusions = array_map( 'untrailingslashit', preg_split( '/\R+/', get_field( 'campaign_promo_banner_excluded_pages', $campaign_id ) ?? '' ) );

	$campaign['include_promo_banner'] =
		get_field( 'campaign_include_promo_banner', $campaign_id ) &&
		(
			'include' === ( $campaign['promo_banner_include_exclude_criteria'] ?? '' ) && in_array( $uri, $campaign_promo_banner_exclusions, true ) ||
			'exclude' === ( $campaign['promo_banner_include_exclude_criteria'] ?? '' ) && ! in_array( $uri, $campaign_promo_banner_exclusions, true )
		);

	// Slide-In Banner Exclusions.
	$campaign_slide_in_exclusions = array_map( 'untrailingslashit', preg_split( '/\R+/', get_field( 'campaign_slide_in_excluded_pages', $campaign_id ) ?? '' ) );

	$campaign['include_slide_in'] =
		get_field( 'campaign_include_slide_in', $campaign_id ) &&
		(
			'include' === ( $campaign['slide_in_include_exclude_criteria'] ?? '' ) && in_array( $uri, $campaign_slide_in_exclusions, true ) ||
			'exclude' === ( $campaign['slide_in_include_exclude_criteria'] ?? '' ) && ! in_array( $uri, $campaign_slide_in_exclusions, true )
		);

	return $campaign;

}

/**
 * Deletes the transient once a campaign is saved.
 *
 * @param integer $post_id The ID of the post being saved.
 */
function fp_delete_campaign_transient( $post_id ) {
	if ( 'campaign' === get_post_type( $post_id ) ) {
		$current_language = fp_get_current_language();
		delete_transient( "active_campaigns_${current_language}" );
	}
}

add_action( 'acf/save_post', 'fp_delete_campaign_transient' );

/**
 * Autofills the 'Excluded Post Types' field with registered post types.
 */
add_filter( 'acf/load_field/name=campaign_excluded_post_types', 'fp_acf_filter_post_types' );
