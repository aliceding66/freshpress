<?php
/**
 * Filter and action handlers for front end menu setup.
 *
 * @package FreshPress\Website
 */

/**
 * Register menus for the theme.
 */
function fp_register_menus() {
	register_nav_menus(
		[
			'primary_navigation' => __( 'Primary Navigation', 'freshpress-website' ),
			'footer_navigation'  => __( 'Footer Navigation', 'freshpress-website' ),
			'subnav_menu'        => __( 'Subnav Menu', 'freshpress-website' ),
			'subnav_about_menu'  => __( 'Subnav About Menu', 'freshpress-website' ),
		]
	);
}
add_action( 'init', 'fp_register_menus' );

/**
 * Filters the HTML attributes applied to a menu item's anchor element.
 *
 * @param array   $atts  The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
 * @param WP_Post $item  The current menu item.
 * @return array
 */
function fp_modify_menu_link_attributes( $atts, $item ) {
	if ( ! empty( $item->link_classes ) ) {
		$atts['class'] = esc_attr( is_array( $item->link_classes ) ? implode( ' ', $item->link_classes ) : $item->link_classes );
	}
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'fp_modify_menu_link_attributes', 10, 2 );

/**
 * Add '.current-menu-item' to a menu item that contains a parent URL of our current request, if that menu doesn't already have one.
 *
 * @param  array $items Array of menu items.
 * @return array
 */
function fp_add_current_item_class_fallback( $items ) {
	$current_url_path = fp_get_server_var( 'REQUEST_URI' );
	$has_current = false;
	$fallback_current_item_key = -1;

	foreach ( $items as $key => $item ) {
		// Keep track of whether this menu has any items marked as current.
		$has_current = $has_current || $item->current;
		$item_url_parts = wp_parse_url( $item->url );
		if (
			// If it's a custom menu type.
			'custom' === $item->type &&
			array_key_exists( 'path', $item_url_parts ) &&
			// If it is a parent of the current page.
			fp_starts_with( $current_url_path, $item_url_parts['path'] ) &&
			// If we are on the same host or there's no host.
			( fp_starts_with( $item->url, home_url() ) || empty( $item_url_parts['host'] ) )
		) {
			$fallback_current_item_key = $key;
		}
	}

	// If this menu doesn't already have a current item set.
	if ( ! $has_current && $fallback_current_item_key > 0 ) {
		$items[ $fallback_current_item_key ]->current = true;
		$items[ $fallback_current_item_key ]->classes[] = 'current-menu-item';
	}

	return $items;
}
add_filter( 'wp_nav_menu_objects', 'fp_add_current_item_class_fallback' );
