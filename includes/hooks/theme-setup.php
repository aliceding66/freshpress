<?php
/**
 * Filter and action handlers for initial theme setup.
 *
 * @package FreshPress\Website
 */

/**
 * Move scripts to Footer.
 */
function fp_move_scripts_from_head_to_footer() {
	remove_action( 'wp_head', 'wp_enqueue_scripts', 1 );
	remove_action( 'wp_head', 'wp_print_head_scripts', 9 );
	remove_action( 'wp_head', 'wp_print_scripts' );

	add_action( 'wp_footer', 'wp_enqueue_scripts', 50 );
	add_action( 'wp_footer', 'wp_print_head_scripts', 50 );
	add_action( 'wp_footer', 'wp_print_scripts', 50 );
}

add_action( 'wp_enqueue_scripts', 'fp_move_scripts_from_head_to_footer' );

/**
 * Initialise the theme.
 */
function fp_init_theme() {
	add_theme_support( 'menus' );
	add_theme_support( 'post-thumbnails' );
	load_theme_textdomain( 'freshpress-website', get_template_directory() . '/lang' );
}

add_action( 'after_setup_theme', 'fp_init_theme' );

/*
 * Disable non-ES5 scripts added by PublishPress.
 */
// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
define( 'PRESSPERMIT_NO_NAV_MENU_SCRIPTS', true );

/**
 * Disable unusued elements (e.g., Posts, comments).
 */
function fp_disable_unused_components() {
	// Disable core Category and Tag taxonomies.
	global $wp_taxonomies;
	$taxonomy_names = [ 'category', 'post_tag' ];
	foreach ( $taxonomy_names as $tax ) {
		if ( ! empty( $wp_taxonomies[ $tax ] ) ) {
			$wp_taxonomies[ $tax ]->_builtin = false;
			$wp_taxonomies[ $tax ]->public = false;
			$wp_taxonomies[ $tax ]->publicly_queryable = false;
			$wp_taxonomies[ $tax ]->query_var = false;
			$wp_taxonomies[ $tax ]->rewrite = false;
			$wp_taxonomies[ $tax ]->show_in_menu = false;
			$wp_taxonomies[ $tax ]->show_in_nav_menus = false;
			$wp_taxonomies[ $tax ]->show_in_rest = false;
			$wp_taxonomies[ $tax ]->show_tagcloud = false;
			$wp_taxonomies[ $tax ]->show_ui = false;
			$wp_taxonomies[ $tax ]->object_type = [];
		}
	}

	// Disable core Post post type.
	$post_post_type = get_post_type_object( 'post' );
	$post_post_type->exclude_from_search = true;
	$post_post_type->public = false;
	$post_post_type->publicly_queryable = false;
	$post_post_type->show_in_admin_bar = false;
	$post_post_type->show_in_menu = false;
	$post_post_type->show_in_nav_menus = false;
	$post_post_type->show_in_rest = false;
	$post_post_type->show_ui = false;
	$post_post_type->taxonomies = [];

	// Disable comments.
	remove_post_type_support( 'page', 'comments' );
	remove_post_type_support( 'post', 'comments' );
	// Disable trackbacks.
	remove_post_type_support( 'page', 'trackbacks' );
	remove_post_type_support( 'post', 'trackbacks' );
}

add_action( 'init', 'fp_disable_unused_components' );

/**
 * Disable unusued elements (e.g., Posts, comments) in admin-only contexts.
 */
function fp_disable_unused_components_admin() {
	// Remove the draft post widget from the dashboard.
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'normal' );
	// Remove the recent comments widget from the dashboard.
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
}

add_action( 'admin_init', 'fp_disable_unused_components_admin' );

/**
 * Modify admin menus.
 */
function fp_modify_menus() {
	// Remove Posts from the admin menu.
	remove_menu_page( 'edit.php' );
	// Remove Comments from the admin menu.
	remove_menu_page( 'edit-comments.php' );
}

add_action( 'admin_menu', 'fp_modify_menus' );

/**
 * Set the order of post types so ours are at the top (below Pages).
 *
 * @param array $menu_order Array of menu page links to reorder.
 *
 * @return array
 */
function fp_reorder_menu( $menu_order ) {
	$insertion_point_1 = array_search( 'edit.php?post_type=page', $menu_order, true );
	$insertion_point_2 = array_search( 'separator2', $menu_order, true );
	$custom_post_types = [];

	for ( $i = $insertion_point_2 - 1; $i > $insertion_point_1; $i -- ) {
		if ( fp_starts_with( $menu_order[ $i ], 'edit.php?post_type=' ) ) {
			$custom_post_types[] = $menu_order[ $i ];
			unset( $menu_order[ $i ] );
		}
	}

	if ( ! empty( $custom_post_types ) ) {
		array_splice( $menu_order, $insertion_point_1 + 1, 0, array_reverse( $custom_post_types ) );
	}

	return $menu_order;
}

add_filter( 'custom_menu_order', '__return_true' );
add_filter( 'menu_order', 'fp_reorder_menu' );

// Ensure that comments and trackbacks are always disabled.
add_filter( 'comments_open', '__return_false', 20, 2 );
add_filter( 'pings_open', '__return_false', 20, 2 );

/**
 * Remove comments section from admin bar.
 */
function fp_remove_admin_bar_comments_menu_item() {
	global $wp_admin_bar;
	if ( ! empty( $wp_admin_bar ) && method_exists( $wp_admin_bar, 'remove_menu' ) ) {
		$wp_admin_bar->remove_menu( 'comments' );
	}
}

add_action( 'wp_before_admin_bar_render', 'fp_remove_admin_bar_comments_menu_item' );


/**
 * Dequeue Gutenberg icons stylesheet.
 */
function fp_dequeue_gutenberg_frontend_css() {
	// We can remove these stylesheets because they are not used in non admin pages or when the user is not logged in.
	if ( ! is_admin() && ! is_user_logged_in() ) {
		wp_deregister_style( 'dashicons' );
	}
}

add_action( 'wp_enqueue_scripts', 'fp_dequeue_gutenberg_frontend_css', 100 );

/**
 * Disable Gutenberg block additional styles added in WordPress 6 to avoid layout issues.
 */
function fp_disable_wp_render_layout_support_flag() {
	remove_filter( 'render_block', 'wp_render_layout_support_flag' );
}

add_action( 'init', 'fp_disable_wp_render_layout_support_flag' );
