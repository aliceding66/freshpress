<?php
/**
 * Filter and action handlers extending security,
 *
 * @package FreshPress\Website
 */

/**
 * Prevent guest users from visiting pages from other envs then production.
 *
 * @return void
 */
function fp_prevent_guests_from_visiting_non_prod_pages() {
	FP_Security_Gate::get_instance()->prevent_guests_from_visiting_non_prod_pages();
}

add_action( 'init', 'fp_prevent_guests_from_visiting_non_prod_pages' );
