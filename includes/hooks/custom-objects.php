<?php
/**
 * Custom WordPress objects (post types, taxonomies, queries, etc).
 *
 * @package FreshPress\Website
 */

/**
 * Register custom WordPress objects for the theme.
 */
function fp_register_custom_objects() {
	$custom_objects = [
		'taxonomies'    => glob( get_stylesheet_directory() . '/includes/custom-objects/taxonomies/*.json' ),
		'post_types'    => glob( get_stylesheet_directory() . '/includes/custom-objects/post-types/*.json' ),
		'options_pages' => glob( get_stylesheet_directory() . '/includes/custom-objects/options-pages/*.json' ),
	];

	// Process the custom objects in order of priority (taxonomies must go first).
	foreach ( $custom_objects as $key => $file_paths ) {
		if ( ! empty( $file_paths ) ) {
			$data = [];

			// Process each file in the expanded glob.
			foreach ( $file_paths as $file_path ) {
				$current_file = fp_read_file( $file_path );

				// Make sure we have file content to process.
				if ( ! empty( $current_file ) ) {
					$decoded_data = json_decode( $current_file, true );

					// Ensure that the post type or taxonomy is enabled.
					if ( ! empty( $decoded_data ) && empty( $decoded_data['disabled'] ) ) {
						$data[] = $decoded_data;
					}
				}
			}

			// If there is registration data, use it.
			if ( ! empty( $data ) ) {
				if ( 'options_pages' === $key && function_exists( 'acf_add_options_page' ) ) {
					foreach ( $data as $options_page ) {
						call_user_func( 'acf_add_options_' . $options_page['type'], $options_page );
					}
				} else if ( function_exists( "fp_register_all_{$key}" ) ) {
					call_user_func( "fp_register_all_{$key}", $data );
				}
			}
		}
	}
}
add_action( 'init', 'fp_register_custom_objects', 10 );

/**
 * Add custom rewrites for all of our custom objects.
 */
function fp_custom_object_rewrites() {
	$custom_post_types = fp_get_post_types( [ '_builtin' => false ], 'objects' );
	if ( empty( $custom_post_types ) ) {
		return;
	}

	// Rewrite rule for News Coverage.
	add_rewrite_rule( 'press/news-coverage/?$', 'index.php?post_type=press_article&taxonomy=press_category&press_category=releases&news_coverage=true', 'top' );
	add_rewrite_rule( 'press/news-coverage/([0-9]{4})/?$', 'index.php?post_type=press_article&taxonomy=press_category&press_category=releases&news_coverage=true&year_filter=$matches[1]', 'top' );

	foreach ( $custom_post_types as $post_type ) {
		if ( ! empty( $post_type->rewrite['slug'] ) ) {
			$rewrite_tag_index = strpos( $post_type->rewrite['slug'], '%', 2 );
			if ( false !== $rewrite_tag_index ) {
				$slug = substr( $post_type->rewrite['slug'], 0, $rewrite_tag_index - 1 );
			} else {
				$slug = $post_type->rewrite['slug'];
			}

			if ( 'integrations/pages' !== $slug ) {
				add_rewrite_rule( "$slug/page/?([0-9]{1,})/?$", "index.php?post_type={$post_type->name}&paged=\$matches[1]", 'top' );
			}

			if ( ! empty( $post_type->taxonomies ) && is_array( $post_type->taxonomies ) ) {
				foreach ( $post_type->taxonomies as $taxonomy_name ) {
					$taxonomy = get_taxonomy( $taxonomy_name );
					if ( ! empty( $taxonomy ) && $taxonomy instanceof WP_Taxonomy && ! empty( $taxonomy->rewrite['slug'] ) ) {
						add_rewrite_rule( "{$taxonomy->rewrite['slug']}/([^/]{1,})/page/?([0-9]{1,})/?$", "index.php?post_type={$post_type->name}&$taxonomy_name=\$matches[1]&paged=\$matches[2]", 'top' );
						if ( $taxonomy->rewrite['ep_mask'] & EP_YEAR ) {
							add_rewrite_rule( "{$taxonomy->rewrite['slug']}/([^/]{1,})/([0-9]{4})/?$", "index.php?post_type={$post_type->name}&$taxonomy_name=\$matches[1]&year_filter=\$matches[2]", 'top' );
							add_rewrite_rule( "{$taxonomy->rewrite['slug']}/([^/]{1,})/([0-9]{4})/page/?([0-9]{1,})/?$", "index.php?post_type={$post_type->name}&$taxonomy_name=\$matches[1]&year_filter=\$matches[2]&paged=\$matches[3]", 'top' );
						}
					}
				}
			}

			if ( $post_type->has_archive ) {
				add_rewrite_rule( "$slug/?$", "index.php?post_type={$post_type->name}", 'top' );
			}
		}
	}

	// Rewrite rules for archive pages.
	add_rewrite_rule( 'integrations/pages/?$', 'index.php?pagename=integrations', 'top' );
	add_rewrite_rule( 'podcast/?$', 'index.php?pagename=podcast', 'top' );
	add_rewrite_rule( 'education/?$', 'index.php?pagename=education', 'top' );
	add_rewrite_rule( 'accounting-templates/?$', 'index.php?pagename=accounting-templates', 'top' );
	add_rewrite_rule( 'accounting-software/?$', 'index.php?pagename=accounting-software', 'top' );
	add_rewrite_rule( 'hub/page/?([0-9]{1,})/?$', 'index.php?pagename=hub&paged=$matches[1]', 'top' );
}
add_filter( 'init', 'fp_custom_object_rewrites', 11 );

/**
 * Modify query in pre_get_posts.
 *
 * @param WP_Query $query The current WP_Query object.
 */
function fp_pre_get_posts( $query ) {
	if ( $query->is_main_query() && ! is_admin() ) {

		// Custom post type and taxonomy query vars.
		if ( is_post_type_archive( 'hub_article' ) || is_tax( [ 'hub_category' ] ) ) {
			$query->set( 'post_type', 'hub_article' );
			$query->set( 'posts_per_page', is_tax( 'hub_category' ) ? 18 : 9 );
		} elseif ( is_post_type_archive( 'press_article' ) || is_tax( [ 'press_category' ] ) ) {
			$query->set( 'post_type', 'press_article' );
			$query->set( 'posts_per_page', -1 );
			if ( is_tax() ) {

				$query->is_post_type_archive = false;
				if ( $query->get( 'press_category' ) === 'releases' ) {
					$year = ! empty( $query->get( 'year_filter' ) ) ? $query->get( 'year_filter' ) : gmdate( 'Y' );
					$query->set( 'year', $year );
				}
			}
		} elseif ( is_post_type_archive( 'invoice_template' ) || is_tax( [ 'invoice_template_category' ] ) ) {
			$query->set( 'post_type', 'invoice_template' );
		}
	}
}
add_filter( 'pre_get_posts', 'fp_pre_get_posts' );

/**
 * Create post permalink by updating placeholder value.
 *
 * @param string $post_link Link to the post.
 * @param Object $post Relevant post object.
 * @return string
 */
function fp_custom_post_link( $post_link, $post ) {
	$custom_taxonomies = get_taxonomies(
		[
			'_builtin' => false,
			'public'   => true,
			'rewrite'  => true,
		]
	);

	foreach ( $custom_taxonomies as $custom_taxonomy ) {
		if ( false !== strpos( $post_link, "%${custom_taxonomy}%" ) ) {
			$custom_taxonomy_term = ! empty( $post ) && $post instanceof WP_Post ? fp_get_primary_term( $custom_taxonomy, $post->ID ) : false;
			if ( $custom_taxonomy_term ) {
				$post_link = str_replace( "%${custom_taxonomy}%", $custom_taxonomy_term->slug, $post_link );
			} else {
				$post_link = str_replace( "%${custom_taxonomy}%", '', $post_link );
			}
		}
	}
	return $post_link;
}
add_filter( 'post_type_link', 'fp_custom_post_link', 10, 2 );
add_filter( 'post_type_archive_link', 'fp_custom_post_link', 10, 2 );

/**
 * Register custom query_vars.
 *
 * @param  array $vars Query vars.
 * @return array
 */
function fp_register_custom_query_vars( $vars ) {
	$vars[] = 'year_filter';
	$vars[] = 'news_coverage';
	return $vars;
}
add_filter( 'query_vars', 'fp_register_custom_query_vars' );
