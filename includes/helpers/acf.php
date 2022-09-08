<?php
/**
 * Helper functions for ACF.
 *
 * @package FreshPress\Website
 */

/**
 * Populates the choices for a field with all site menus.
 *
 * @param  array $field The ACF field being modified.
 * @return array
 */
function fp_add_menus_to_field_choices( $field ) {
	$field['choices'] = [];

	$menus = wp_get_nav_menus();

	if ( is_array( $menus ) ) {
		foreach ( $menus as $menu ) {
			$field['choices'][ $menu->slug ] = $menu->name;
		}
	}

	return $field;
}

/**
 * Returns trial length attribute.
 *
 * @param  boolean $format_as_attr Whether to return attribute value or full attribute string.
 * @return string|int
 */
function fp_get_trial_length_attr( $format_as_attr = true ) {
	if ( function_exists( 'get_field' ) ) {
		$trial_length = get_field( 'trial_length' );

		if ( ! empty( $trial_length ) && 'not_set' !== $trial_length ) {
			$trial_length = intval( $trial_length );

			if ( $trial_length > 0 ) {
				return $format_as_attr ? "data-tl=\"$trial_length\"" : $trial_length;
			}
		}
	}
	return $format_as_attr ? '' : 0;
}

/**
 * Returns if temporarily_allow_bots_timestamp is expired.
 *
 * @return bool
 */
function fp_is_temporarily_allowed_bots_timestamp_expired() {
	$temporarily_allow_bots_timestamp = (int) get_option( 'temporarily_allow_bots_timestamp' );
	$now = strtotime( 'now' );

	return $temporarily_allow_bots_timestamp <= 0 || $now > $temporarily_allow_bots_timestamp;
}
