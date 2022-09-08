<?php
/**
 * Filter and action handlers for Accounting Partners pages SEO.
 *
 * @package FreshPress\Website
 */

/**
 * Get meta tags title and description from custom fields in taxonomy location.
 *
 * @param  array $fp_ap_terms_obj with location_term & service_term.
 */
function fp_get_custom_meta_tags( $fp_ap_terms_obj ) {
	$location = '';
	if ( isset( $fp_ap_terms_obj['location_term'] ) ) {
		$location = $fp_ap_terms_obj['location_term'];
	}
	$service = '';
	if ( isset( $fp_ap_terms_obj['service_term'] ) ) {
		$service = $fp_ap_terms_obj['service_term'];
	}
	$meta_tags = get_field( 'ap_meta_tags', $location );
	if ( $meta_tags ) {
		foreach ( $meta_tags as $meta_tag ) {
			if ( isset( $meta_tag['service'] ) && isset( $service->term_id ) && $service->term_id == $meta_tag['service'] ) {
				return $meta_tag;
			}
		}
	}
	return false;
}
/**
 * Change wpseo_metatitle and wpseo_opengraph_title on accouting partners urls.
 *
 * @param  string $wpseo_replace_var Title to adjust.
 */
function fp_filter_wpseo_title( $wpseo_replace_var ) {
	$fp_ap_terms_obj = fp_accounting_partners_check_location_url();
	$new_var = $wpseo_replace_var;
	$meta_tags = fp_get_custom_meta_tags( $fp_ap_terms_obj );
	if ( ! empty( $meta_tags ) && ! empty( $meta_tags['title'] ) ) {
		$new_var = $meta_tags['title'];
	} elseif ( 2 < count( $fp_ap_terms_obj ) && isset( $fp_ap_terms_obj['seo_title'] ) && ! $fp_ap_terms_obj['service_term'] ) {
		$new_var = $fp_ap_terms_obj['seo_title'];
	} elseif ( isset( fp_default_content_meta_tags( $fp_ap_terms_obj )->title ) ) {
		$new_var = fp_default_content_meta_tags( $fp_ap_terms_obj )->title;
	}
	return $new_var;
}
add_filter( 'wpseo_title', 'fp_filter_wpseo_title' );
add_filter( 'wpseo_opengraph_title', 'fp_filter_wpseo_title', 20, 1 );

/**
 * Change wpseo_metadesc and wpseo_opengraph_desc on accouting partners urls.
 *
 * @param  string $wpseo_replace_var Description to adjust.
 */
function fp_filter_wpseo_desc( $wpseo_replace_var ) {
	$fp_ap_terms_obj = fp_accounting_partners_check_location_url();
	$new_var = $wpseo_replace_var;
	$meta_tags = fp_get_custom_meta_tags( $fp_ap_terms_obj );
	if ( ! empty( $meta_tags ) && ! empty( $meta_tags['description'] ) ) {
		$new_var = $meta_tags['description'];
	} elseif ( 2 < count( $fp_ap_terms_obj ) && isset( $fp_ap_terms_obj['seo_desc'] ) && ! $fp_ap_terms_obj['service_term'] ) {
		$new_var = $fp_ap_terms_obj['seo_desc'];
	} elseif ( isset( fp_default_content_meta_tags( $fp_ap_terms_obj )->description ) ) {
		$new_var = fp_default_content_meta_tags( $fp_ap_terms_obj )->description;
	}
	return $new_var;
}
add_filter( 'wpseo_metadesc', 'fp_filter_wpseo_desc' );
add_filter( 'wpseo_opengraph_desc', 'fp_filter_wpseo_desc', 20, 1 );

/**
 * Change wpseo_opengraph_urlon accouting partners urls.
 *
 * @param  string $url URL to adjust.
 */
function fp_adjust_op_url( $url ) {
	if ( isset( $_SERVER['REQUEST_URI'] ) && isset( $_SERVER['HTTPS'] ) && isset( $_SERVER['HTTP_HOST'] ) ) {
		$url = ( isset( $_SERVER['HTTPS'] ) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http' ) . '://' . esc_url_raw( wp_unslash( $_SERVER['HTTP_HOST'] ) ) . esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );
	}
	return esc_url_raw( $url );
}
add_filter( 'wpseo_opengraph_url', 'fp_adjust_op_url', 20, 1 );

/**
 * Add Canonical link tag to accouting partners urls.
 */
function fp_check_canonical_accounting_partners() {
	if ( isset( $_SERVER['REQUEST_URI'] ) && isset( $_SERVER['HTTPS'] ) && isset( $_SERVER['HTTP_HOST'] ) ) {
		$url = ( isset( $_SERVER['HTTPS'] ) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http' ) . '://' . esc_url_raw( wp_unslash( $_SERVER['HTTP_HOST'] ) ) . esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );
		echo '<link rel="canonical" href="' . esc_url_raw( $url ) . '">';
	}
}
add_action( 'wp_head', 'fp_check_canonical_accounting_partners', 20 );

/**
 * Prepare default title and description meta tags
 *
 * @param  array $fp_ap_terms_obj with location_term & service_term.
 */
function fp_default_content_meta_tags( $fp_ap_terms_obj ) {
	$content = new stdClass();
	$month_year = gmdate( 'F Y' );

	$term_parent_location_id = isset( $fp_ap_terms_obj['location_term']->parent ) ? $fp_ap_terms_obj['location_term']->parent : '';
	$term_parent_location = get_term( $term_parent_location_id );
	$after_location = '';

	if ( isset( $term_parent_location->name ) ) {
		$parent_location = $term_parent_location->slug;
		if ( strlen( $parent_location ) > 2 ) {
			$after_location = ', ' . $term_parent_location->name;
		} else {
			$after_location = ', ' . strtoupper( $term_parent_location->slug );
		}
	}
	$count = isset( $fp_ap_terms_obj['location_term']->count ) ? $fp_ap_terms_obj['location_term']->count : 0;
	if ( $fp_ap_terms_obj['location_term'] ) {
		if ( $fp_ap_terms_obj['service_term'] ) {
			$term_count = fp_ajax_get_updated_term_counts( [ $fp_ap_terms_obj['service_term']->slug, $fp_ap_terms_obj['location_term']->slug ] );
			if ( ! empty( $term_count[ $fp_ap_terms_obj['service_term']->slug ] ) ) {
				$count = $term_count[ $fp_ap_terms_obj['service_term']->slug ];
			}
			$professionals = 2 > $count && 0 != $count ? 'Professional' : 'Professionals';
			$count = $count ? ' ' . $count : '';
			$content->title = 'Top' . $count . ' ' . $fp_ap_terms_obj['service_term']->name . ' Services in ' . $fp_ap_terms_obj['location_term']->name . $after_location . ' - ' . $month_year . ' - FreshBooks';
			$content->description = 'Connect with FreshBooks Certified ' . $fp_ap_terms_obj['service_term']->name . ' Services in ' . $fp_ap_terms_obj['location_term']->name . $after_location . '.';
		} else {
			$professionals = 2 > $count && 0 != $count ? 'Professional' : 'Professionals';
			$count = $count ? ' ' . $count : '';
			$content->title = 'Top' . $count . ' Accounting ' . $professionals . ' in ' . $fp_ap_terms_obj['location_term']->name . $after_location . ' - ' . $month_year . ' - FreshBooks';
			$content->description = 'Connect with FreshBooks Certified Accounting Professionals in ' . $fp_ap_terms_obj['location_term']->name . $after_location . '.';
		}
	}

	return $content;
}
