<?php
/**
 * Helper functions for custom taxonomies.
 *
 * @package FreshPress\Website
 */

/**
 * Register a custom taxonomy with auto default values.
 *
 * @param string $taxonomy        Singular name for the taxonomy used as an ID (snake_case).
 * @param string $taxonomy_plural Plural name for the taxonomy used as an ID (snake_case).
 * @param string $label           Singular label for the taxonomy (Title Case With Spaces).
 * @param string $label_plural    Plural label for the taxonomy (Title Case With Spaces).
 * @param array  $post_types      Names of post types to which this taxonomy applies.
 * @param array  $args            Other arguments to be passed to register_taxomony.
 */
function fp_register_taxonomy( $taxonomy, $taxonomy_plural, $label, $label_plural, $post_types, $args = [] ) {
	if ( empty( $taxonomy ) || empty( $label ) ) {
		return;
	}

	if ( empty( $taxonomy_plural ) ) {
		$taxonomy_plural = $taxonomy;
	}

	if ( empty( $label_plural ) ) {
		$label_plural = $label;
	}

	$label_plural_lower = strtolower( $label_plural );

	$defaults = [
		'labels' => [
			'name'                       => $label_plural,
			'singular_name'              => $label,
			'menu_name'                  => $label_plural,
			'all_items'                  => "All $label_plural",
			'parent_item'                => "Parent $label",
			'parent_item_colon'          => "Parent $label:",
			'new_item_name'              => "New $label Name",
			'add_new_item'               => "Add New $label",
			'edit_item'                  => "Edit $label",
			'update_item'                => "Update $label",
			'view_item'                  => "View $label",
			'separate_items_with_commas' => "Separate $label_plural_lower with commas",
			'add_or_remove_items'        => "Add or remove $label_plural_lower",
			'popular_items'              => "Popular $label_plural",
			'search_items'               => "Search $label_plural",
			'not_found'                  => "No $label_plural_lower found",
			'no_terms'                   => "No $label_plural_lower",
			'items_list'                 => "$label_plural list",
			'items_list_navigation'      => "$label_plural list navigation",
		],
	];

	$args += [
		'hierarchical'      => true,
		'public'            => true,
		'query_var'         => true,
		'rest_base'         => $taxonomy_plural,
		'rewrite'           => false,
		'show_admin_column' => true,
		'show_in_nav_menus' => false,
		'show_in_rest'      => true,
		'show_tagcloud'     => false,
		'show_ui'           => true,
	];

	if ( ! empty( $args['rewrite'] ) && ! empty( $args['rewrite']['ep_mask'] ) ) {
		if ( ! is_array( $args['rewrite']['ep_mask'] ) ) {
			$args['rewrite']['ep_mask'] = [ $args['rewrite']['ep_mask'] ];
		}

		$bitwise_mask = 0;
		foreach ( $args['rewrite']['ep_mask'] as $mask ) {
			if ( defined( $mask ) ) {
				$bitwise_mask |= constant( $mask );
			}
		}

		$args['rewrite']['ep_mask'] = $bitwise_mask;
	}

	foreach ( $defaults as $key => $values ) {
		if ( empty( $args[ $key ] ) ) {
			$args[ $key ] = $values;
		} elseif ( is_array( $args[ $key ] ) ) {
			$args[ $key ] += $values;
		}
	}

	register_taxonomy( $taxonomy, $post_types, $args );
}


/**
 * Register all custom taxonomies.
 *
 * @param array $taxonomies Taxonomies to register.
 */
function fp_register_all_taxonomies( $taxonomies = [] ) {
	if ( ! empty( $taxonomies ) ) {
		foreach ( $taxonomies as $taxonomy ) {
			if ( empty( $taxonomy['args'] ) ) {
				$taxonomy['args'] = [];
			}
			fp_register_taxonomy( $taxonomy['taxonomy'], $taxonomy['taxonomy_plural'] ?? '', $taxonomy['label'], $taxonomy['label_plural'] ?? '', $taxonomy['post_types'], $taxonomy['args'] );
		}
	}
}

/**
 * Get the primary WP_Term for a given taxonomy and post.
 *
 * @param string      $taxonomy Taxonomy slug.
 * @param int|WP_Post $post     (Optional) Post ID or Post object, defaults to the current global post.
 * @return WP_Term
 */
function fp_get_primary_term( $taxonomy, $post = null ) {
	if ( null === $post ) {
		$post = get_the_ID();
	} elseif ( $post instanceof WP_Post ) {
		$post = $post->ID;
	}

	// Make sure we're returning a real WP_Term object regardless.
	$primary_term = new WP_Term( new stdClass() );
	// Check if we have terms associated with this post/taxonomy combination.
	$terms = get_the_terms( $post, $taxonomy );

	if ( ! empty( $terms ) && is_array( $terms ) ) {
		if ( count( $terms ) > 1 && function_exists( 'yoast_get_primary_term_id' ) ) {
			// If the Yoast primary term functionality is available, use that.
			$wpseo_primary_term = get_term( yoast_get_primary_term_id( $taxonomy, $post ) );

			// Only set the return value if we receive a real WP_Term in response.
			if ( $wpseo_primary_term instanceof WP_Term ) {
				$primary_term = $wpseo_primary_term;
			}
		} else {
			// If we can't get a primary term through Yoast, or there's only one available, just get the first one.
			$primary_term = array_shift( $terms );
		}
	}

	return $primary_term;
}
