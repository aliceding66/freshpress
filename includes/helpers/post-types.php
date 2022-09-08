<?php
/**
 * Helper functions for custom post types.
 *
 * @package FreshPress\Website
 */

/**
 * Register a custom post type with auto default values.
 *
 * @param string $post_type         Singular slug for the post type used as an ID (snake_case).
 * @param string $post_type_plural  Plural slug for the post type used as an ID (snake_case).
 * @param string $label             Singular admin label for the post type (Title Case With Spaces).
 * @param string $label_plural      Plural admin label for the post type (Title Case With Spaces).
 * @param array  $args              Other arguments to be passed to register_post_type.
 * @return void
 */
function fp_register_post_type( $post_type, $post_type_plural, $label, $label_plural, $args = [] ) {
	if ( empty( $post_type ) || empty( $label ) ) {
		return;
	}

	if ( empty( $post_type_plural ) ) {
		$post_type_plural = $post_type;
	}

	if ( empty( $label_plural ) ) {
		$label_plural = $label;
	}

	$label_lower = strtolower( $label );
	$label_plural_lower = strtolower( $label_plural );

	$defaults = [
		'labels'     => [
			'name'                  => $label_plural,
			'singular_name'         => $label,
			'menu_name'             => $label_plural,
			'name_admin_bar'        => $label,
			'archives'              => "$label Archives",
			'attributes'            => "$label Attributes",
			'parent_item_colon'     => "Parent $label:",
			'all_items'             => "All $label_plural",
			'add_new'               => "Add $label",
			'add_new_item'          => "Add New $label",
			'new_item'              => "New $label",
			'edit_item'             => "Edit $label",
			'update_item'           => "Update $label",
			'view_item'             => "View $label",
			'view_items'            => "View $label_plural",
			'search_items'          => "Search $label_plural",
			'not_found'             => "No $label_plural_lower found",
			'not_found_in_trash'    => "No $label_plural_lower found in Trash",
			'insert_into_item'      => "Insert into $label_lower",
			'uploaded_to_this_item' => "Uploaded to this $label_lower",
			'items_list'            => "$label_plural list",
			'items_list_navigation' => "$label_plural list navigation",
			'filter_items_list'     => "Filter $label_plural_lower list",
		],
		'rewrite'    => [
			'slug'       => str_replace( '_', '-', $post_type_plural ),
			'with_front' => false,
			'pages'      => false,
			'feeds'      => false,
		],
		'supports'   => [
			'editor',
			'page-attributes',
			'revisions',
			'title',
		],
		'taxonomies' => [],
	];

	$capability_type = ( $post_type !== $post_type_plural ? [ $post_type, $post_type_plural ] : $post_type );

	$args += [
		'label'               => $label,
		'can_export'          => true,
		'capability_type'     => $capability_type,
		'map_meta_cap'        => true,
		'exclude_from_search' => true,
		'has_archive'         => false,
		'hierarchical'        => false,
		'public'              => true,
		'publicly_queryable'  => true,
		'query_var'           => true,
		'rest_base'           => $post_type_plural,
		'show_in_admin_bar'   => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => false,
		'show_in_rest'        => true,
		'show_ui'             => true,
	];

	foreach ( $defaults as $key => $values ) {
		if ( empty( $args[ $key ] ) ) {
			$args[ $key ] = $values;
		} elseif ( is_array( $args[ $key ] ) ) {
			$args[ $key ] += $values;
		}
	}

	register_post_type( $post_type, $args );
	fp_adjust_capabilities_by_role( $capability_type );
}

/**
 * Register all custom post types.
 *
 * @param array $post_types Post types to register.
 */
function fp_register_all_post_types( $post_types = [] ) {
	if ( ! empty( $post_types ) ) {
		foreach ( $post_types as $post_type ) {
			fp_register_post_type( $post_type['post_type'], $post_type['post_type_plural'] ?? '', $post_type['label'], $post_type['label_plural'] ?? '', $post_type['args'] );
		}
	}
}

/**
 * Get the custom post type archive link.
 *
 * @param string $post_type Post Type.
 * @param string $page_slug Page slug used as archive page.
 * @return string|boolean Post Type Archive Url
 */
function fp_get_post_type_archive_link( $post_type, $page_slug = '' ) {
	$post_type_obj = get_post_type_object( $post_type );

	if ( empty( $post_type_obj ) ) {
		return false;
	}

	if ( $post_type_obj->has_archive ) {
		return get_post_type_archive_link( $post_type );
	}

	return home_url( $page_slug );
}

/**
 * Retrieve all relevant post types for the site. The $options array is passed along to the
 * WP get_post_types function after having the value of $options['exclude'] parsed separately
 * and removed.
 *
 * @param array  $options     Array of arguments passed to get_post_types function.
 * @param string $output_type Type of return value. One of 'names' or 'objects'.
 * @return array
 */
function fp_get_post_types( $options = [], $output_type = '' ) {
	// Setup our exclusions list.
	$exclude = [];
	if ( array_key_exists( 'exclude', $options ) ) {
		if ( ! empty( $options['exclude'] ) ) {
			$exclude = is_array( $options['exclude'] ) ? $options['exclude'] : [ $options['exclude'] ];
		}
		unset( $options['exclude'] );
	}

	// Get only public post types by default.
	if ( ! array_key_exists( 'public', $options ) ) {
		$options['public'] = true;
	}

	// Set the default output type and only allow specific values.
	if ( empty( $output_type ) || ! in_array( $output_type, [ 'names', 'objects' ], true ) ) {
		$output_type = 'objects';
	}

	$post_types = get_post_types( $options, $output_type );

	// Process our exclusions if required.
	if ( ! empty( $exclude ) && is_array( $exclude ) ) {
		if ( 'names' === $output_type ) {
			$post_types = array_diff( $post_types, $exclude );
		} else {
			$post_types = array_filter(
				$post_types,
				function( $pt ) use ( $exclude ) {
					return ! in_array( $pt->name, $exclude, true );
				}
			);
		}
	}

	// Ensure we are returning an array.
	return $post_types ?? [];
}

const FP_ROLE_ADMINISTRATOR = 'administrator';
const FP_ROLE_EDITOR = 'editor';
const FP_ROLE_AUTHOR = 'author';
const FP_ROLE_SEO_MANAGER = 'wpseo_manager';
const FP_ROLE_SEO_EDITOR = 'wpseo_editor';

/**
 * Adjusts the capabilities per role
 *
 * @param array $capability_type Array of capabilities.
 */
function fp_adjust_capabilities_by_role( $capability_type ) {
	// [0] for singular terms, [1] for plural. We are using both below because there are multiple situations previously set in code.
	// Accounting Partners is an exception for the automatic loop because of the way it was originally set.

	$role_names = [ FP_ROLE_ADMINISTRATOR, FP_ROLE_EDITOR, FP_ROLE_AUTHOR, FP_ROLE_SEO_MANAGER, FP_ROLE_SEO_EDITOR ];

	foreach ( $role_names as $role_name ) {
		$role = get_role( $role_name );

		$role->add_cap( 'manage_categories' );
		$role->add_cap( 'edit_pages' );
		$role->add_cap( 'delete_pages' );
		$role->add_cap( 'edit_others_pages' );
		$role->add_cap( 'edit_published_pages' );

		// CPTs.
		$role->add_cap( 'edit_' . $capability_type[0] );
		$role->add_cap( 'edit_' . $capability_type[1] );
		$role->add_cap( 'edit_accounting_partners' );

		$role->add_cap( 'delete_' . $capability_type[0] );
		$role->add_cap( 'delete_' . $capability_type[1] );
		$role->add_cap( 'delete_accounting_partners' );

		$role->add_cap( 'edit_others_' . $capability_type[0] );
		$role->add_cap( 'edit_others_' . $capability_type[1] );
		$role->add_cap( 'edit_others_accounting_partners' );

		$role->add_cap( 'edit_published_' . $capability_type[0] );
		$role->add_cap( 'edit_published_' . $capability_type[1] );
		$role->add_cap( 'edit_published_accounting_partners' );

		if ( FP_ROLE_EDITOR === $role->name || FP_ROLE_ADMINISTRATOR === $role->name ) {
			$role->add_cap( 'publish_posts' );
			$role->add_cap( 'publish_pages' );
			$role->add_cap( 'publish_' . $capability_type[0] );
			$role->add_cap( 'publish_' . $capability_type[1] );
			$role->add_cap( 'publish_accounting_partners' );

			$role->add_cap( 'delete_others_posts' );
			$role->add_cap( 'delete_others_pages' );
			$role->add_cap( 'delete_others_' . $capability_type[0] );
			$role->add_cap( 'delete_others_' . $capability_type[1] );
			$role->add_cap( 'delete_others_accounting_partners' );

			$role->add_cap( 'delete_published_posts' );
			$role->add_cap( 'delete_published_pages' );
			$role->add_cap( 'delete_published_' . $capability_type[0] );
			$role->add_cap( 'delete_published_' . $capability_type[1] );
			$role->add_cap( 'delete_published_accounting_partners' );
		}

		if ( FP_ROLE_AUTHOR === $role->name ) {
			$role->remove_cap( 'manage_categories' );
			$role->remove_cap( 'publish_posts' );
			$role->remove_cap( 'publish_pages' );
			$role->remove_cap( 'publish_' . $capability_type[0] );
			$role->remove_cap( 'publish_' . $capability_type[1] );
			$role->remove_cap( 'publish_accounting_partners' );
		}
	}
}
