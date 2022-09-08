<?php
/**
 * RelatedLinks class.
 *
 * @package FreshpressBlocks\RelatedLinks
 * @subpackage RelatedLinks
 */

namespace FreshpressBlocks;

/**
 * Class RelatedLinks
 *
 * @package FreshpressBlocks
 */
class RelatedLinksBlock extends ABlock {

	/**
	 * Flag that indicated if REST endpoint used by ServerSideRenderer must be enabled.
	 *
	 * @var bool
	 */
	protected $enable_rest_render_endpoint = true;

	/**
	 * RelatedLinksBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'related-links-block' );
		$this->enqueue_style();
	}

	/**
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$this->set_template_partials(
			[
				'not_taxonomy_or_custom' => 'templates/not_taxonomy_or_custom.partial.mustache',
				'taxonomy'               => 'templates/taxonomy.partial.mustache',
				'predefined'             => 'templates/predefined.partial.mustache',
				'custom'                 => 'templates/custom.partial.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {

		// Select posts or taxonomy.
		$selected_links_type = $additional_template_data['links_type'];
		$additional_template_data['selected_links_type'] = $additional_template_data['links_type']; // This is repeated because $selected_links_type is used both in the logic and in the template.
		$selected_taxonomy = $additional_template_data['select_categories'] ?? null;
		$custom_links = $additional_template_data['custom_links'] ?? null;

		if ( 'taxonomy' === $selected_links_type && ! empty( $selected_taxonomy ) ) {

			// If taxonomy selected.
			$category_layout = $additional_template_data['category_layout'];
			$taxonomy_links = [];
			$active_taxonomy = get_taxonomy( $selected_taxonomy );
			$taxonomy_post_type = ( $active_taxonomy->object_type ?? [] )[0];

			if ( is_tax( $selected_taxonomy ) ) {
				$current_slug = get_query_var( 'term' );
			} elseif ( is_single() ) {
				$terms = get_the_terms( get_post(), $active_taxonomy->name );
				if ( is_array( $terms ) && ! empty( $terms ) ) {
					$current_slug = $terms[0]->slug;
				} else {
					$current_slug = '';
				}
			}

			$args = [
				'taxonomy'   => $selected_taxonomy,
				'orderby'    => 'name',
				'order'      => 'ASC',
				'hide_empty' => true,
			];
			$term_query = new \WP_Term_Query( $args );

			foreach ( $term_query->get_terms() as $tax_term ) {
				$taxonomy_links[] = [
					'url'    => get_term_link( $tax_term ),
					'title'  => $tax_term->name,
					'target' => '_self',
					'active' => isset( $current_slug ) && $current_slug === $tax_term->slug,
				];
			}

			if ( $taxonomy_post_type && is_post_type_viewable( $taxonomy_post_type ) && 'dropdown_list' !== $category_layout ) {
				// Add "All Items" first link.
				array_unshift(
					$taxonomy_links,
					[
						'url'    => fp_get_post_type_archive_link( $taxonomy_post_type, 'hub' ),
						'title'  => get_post_type_object( $taxonomy_post_type )->labels->all_items,
						'target' => '_self',
						// Set active if no other entry is active.
						'active' => ! array_reduce(
							$taxonomy_links,
							function( $carry, $item ) {
								return $carry || $item['active'];
							},
							false
						),
					],
				);
			}
		} elseif ( 'predefined' === $additional_template_data['links_type'] && ! empty( $additional_template_data['predefined_links'] ) ) {
			$category_layout = $additional_template_data['select_layout'];
			$taxonomy_links = $additional_template_data['predefined_links'];
		} elseif ( 'fixed_link_posts' === $additional_template_data['links_type'] ) {
			// Create query if posts are selected.
			$query_args = [];
			$current_post_date = get_the_date( 'Y-m-d H:i:s' );
			$current_post_type = get_post_type();
			$selected_post_type = $current_post_type;

			$order_by = '';
			$order = '';

			if ( array_key_exists( 'order_by', $additional_template_data ) ) {
				$order_by = $additional_template_data['order_by'];

				$order = 'ASC';
				if ( 'date_desc' === $order_by ) {
					$order = 'DESC';
				}
			}

			$number_of_posts = 6;
			if ( array_key_exists( 'number_of_posts', $additional_template_data ) ) {
				$number_of_posts = (int) $additional_template_data['number_of_posts'];
			}

			$selected_post_type_taxonomy = get_object_taxonomies( $current_post_type )[0] ?? '';
			// Set the $query_args['category'] if provided.

			$category = fp_get_primary_term( 'hub_category', get_the_ID() );
			$terms = $category->slug;

			if ( isset( $additional_template_data['category'] ) ) {
				$terms = $additional_template_data['category'];
			}

			if ( ! empty( $category ) && 'all' !== $category ) {
				$query_args['tax_query'] = [
					[
						'taxonomy' => 'hub_category',
						'field'    => 'slug',
						'terms'    => $terms,
					],
				];
			}

			$query_args += [
				'fields'         => 'ids',
				'post_type'      => $current_post_type,
				'posts_per_page' => $number_of_posts,
				'orderby'        => $order_by,
				'order'          => $order,
				'page'           => 1,
				'post_status'    => 'publish',
				'post__not_in'   => [ get_the_ID() ],
				'date_query'     => [
					'before' => $current_post_date,
				],
			];

			$query = new \WP_Query( $query_args );
			$post_ids = $query->posts;

			if ( $query->post_count < $number_of_posts ) {
				$query_add_args = $query_args;
				unset( $query_add_args['tax_query'] );
				$query_add_args['posts_per_page'] -= $query->post_count;
				$query_add = new \WP_Query( $query_add_args );
				$post_ids = array_merge( $post_ids, $query_add->posts );
			}

			if ( sizeof( $post_ids ) < $number_of_posts ) {
				unset( $query_add_args['date_query'] );
				$query_add_args['posts_per_page'] = $number_of_posts - sizeof( $post_ids );
				$query_add = new \WP_Query( $query_add_args );
				$post_ids = array_merge( $post_ids, $query_add->posts );
			}

			$query = new \WP_Query(
				[
					'post_type' => $current_post_type,
					'post__in'  => $post_ids,
					'orderby'   => $order_by,
					'order'     => $order,
				]
			);
		} else {

			// Create query if posts are selected.
			$query_args = [];
			$current_post_date = get_the_date( 'Y-m-d H:i:s' );

			// the query's post type.
			$current_post_type = get_post_type();
			if ( 'custom_posts' === $selected_links_type ) {
				$selected_post_type = fp_get_post_types( [ 'exclude' => [ 'attachment' ] ], 'names' );
			} elseif ( 'custom_post_type' === $selected_links_type ) {
				$selected_post_type = $additional_template_data['select_post_type'];
			} else {
				$selected_post_type = $current_post_type;
			}

			$order_by = '';
			$order = '';

			if ( array_key_exists( 'order_by', $additional_template_data ) ) {
				$order_by = $additional_template_data['order_by'];

				$order = 'ASC';
				if ( 'date_desc' === $order_by ) {
					$order = 'DESC';
				}
			}

			$number_of_posts = 5;
			if ( array_key_exists( 'number_of_posts', $additional_template_data ) ) {
				$number_of_posts = $additional_template_data['number_of_posts'];
			}

			// $query_args['date_query']
			$posts_visibility = $additional_template_data['posts_visibility'] ?? null;
			if ( 'default' !== $posts_visibility ) {
				$query_args['date_query'] = [
					$posts_visibility => $current_post_date,
				];
			}

			$selected_post_type_taxonomy = get_object_taxonomies( $selected_post_type )[0] ?? '';

			// Set the $query_args['category'] if provided.
			$category = $additional_template_data['post_category'] ?? null;
			if ( ! empty( $category ) && 'all' !== $category ) {
				$query_args['tax_query'] = [
					[
						'taxonomy' => $additional_template_data['selected_post_type_taxonomy'],
						'field'    => 'slug',
						'terms'    => $category,
					],
				];
			}

			$query_args += [
				'post_type'      => $selected_post_type,
				'posts_per_page' => $number_of_posts,
				'orderby'        => $order_by,
				'order'          => $order,
				'page'           => 1,
				'post_status'    => 'publish',
				'post__not_in'   => [ get_the_ID() ],
			];

			$query = new \WP_Query( $query_args );
		}

		// Layout settings.
		if ( array_key_exists( 'select_layout', $additional_template_data ) ) {
			$selected_layout = str_replace( '_', '-', $additional_template_data['select_layout'] );
			$additional_template_data['selected_layout'] = $selected_layout;
			$additional_template_data['container_tag'] = 'cards-grid' === $additional_template_data['selected_layout'] ? 'div' : 'ul';
		}

		if ( array_key_exists( 'category_layout', $additional_template_data ) ) {
			$additional_template_data['container_tag'] = 'dropdown_list' === $additional_template_data['category_layout'] ? 'div' : 'ul';
		}

		if ( array_key_exists( 'links_colour', $additional_template_data ) && array_key_exists( 'selected_layout', $additional_template_data ) ) {
			$additional_template_data['list_colour_inline_style'] = ( ! in_array( $selected_links_type, [ 'taxonomy' ] ) && $additional_template_data['links_colour'] && 'simple-list' === $additional_template_data['selected_layout'] ) ? 'style="color:' . esc_attr( $additional_template_data['links_colour']['hex'] ) . ';"' : '';
		}

		$additional_template_data['use_anchors'] = ! empty( $additional_template_data['use_anchors'] ) ? 'true' : 'false';
		$additional_template_data['show_block'] = ! empty( $taxonomy_links ) || isset( $query ) || ! empty( $custom_links );

		// Not taxonomy or custom links.
		if ( ! in_array( $selected_links_type, [ 'taxonomy', 'custom_links' ] ) && isset( $query ) ) {
			$additional_template_data['show_not_taxonomy_or_custom'] = true;
			$additional_template_data['links'] = [];
			$counter = 0;
			while ( $query->have_posts() ) {
				$query->the_post();
				$current_post_id = get_the_ID();
				$primary_term = fp_get_primary_term( $selected_post_type_taxonomy, $current_post_id );
				$title_prefix = '';

				if ( 'podcast' === $selected_post_type ) {
					$season_number = sprintf( '%02d', get_field( 'season_number', $current_post_id ) );
					$episode_number = sprintf( '%02d', get_field( 'episode_number', $current_post_id ) );
					$is_nerdisode = get_field( 'nerdisode', $current_post_id );
					$title_prefix = __( 'S', 'freshpress-website' ) . "$season_number" . ( $is_nerdisode ? '' : __( 'E', 'freshpress-website' ) . "$episode_number" ) . ': ';
				}

				if ( 'cards-grid' === $selected_layout ) {
					$additional_template_data['show_cards_grid'] = true;
					$listing_image = fp_get_featured_image( '_featured_image', $current_post_id );

					$listing_image = fp_get_post_extended_featured_image( $listing_image, $current_post_id, $primary_term->term_id );

					if ( empty( $listing_image ) && fp_asset_exists( 'images/hub/icon-' . $primary_term->slug . '.png' ) ) {
						$listing_image = fp_get_asset( 'images/hub/icon-' . $primary_term->slug . '.png' );
					}

					$additional_template_data['links'][ $counter ]['background_image_style'] = ! empty( $listing_image ) ? 'style="background-image: url(\'' . esc_url( $listing_image ) . '\');"' : '';
				} else {
					$additional_template_data['do_not_show_cards_grid'] = true;
				}
				$additional_template_data['links'][ $counter ]['post_link'] = get_the_permalink();
				$additional_template_data['links'][ $counter ]['title_prefix'] = $title_prefix;
				$additional_template_data['links'][ $counter ]['the_title'] = get_the_title();

				$counter++;
			}
			wp_reset_postdata();
		}

		// Taxonomy.
		if ( 'taxonomy' === $selected_links_type && ! empty( $taxonomy_links ) ) {
			$additional_template_data['show_taxonomy'] = true;
			$additional_template_data['links'] = [];

			$additional_template_data['dropdown_list'] = ( 'dropdown_list' === $additional_template_data['category_layout'] ) ? 'true' : null;
			$additional_template_data['simple_list'] = ( 'simple_list' === $additional_template_data['category_layout'] ) ? 'true' : null;

			$counter = 0;

			foreach ( $taxonomy_links as $taxonomy_link ) {
				$additional_template_data['links'][ $counter ]['active'] = $taxonomy_link['active'] ? 'active' : false;
				$additional_template_data['links'][ $counter ]['url'] = $taxonomy_link['url'];
				$additional_template_data['links'][ $counter ]['title'] = $taxonomy_link['title'];
				$additional_template_data['links'][ $counter ]['target'] = $taxonomy_link['target'];
				$counter++;
			}
		}

		// Predefined (Example: API).
		if ( 'predefined' === $selected_links_type && ! empty( $taxonomy_links ) && 'dropdown_list' === $category_layout ) {
			$additional_template_data['show_predefined'] = true;
			$counter = 0;

			foreach ( $taxonomy_links as $key => $taxonomy_link ) {

				if ( is_array( $taxonomy_link ) && ! empty( $taxonomy_link[0] ) ) {

					$additional_template_data['show_multidimensional'] = true;
					$additional_template_data['links'][ $counter ]['key'] = $key;
					$children_counter = 0;

					foreach ( $taxonomy_link as $child ) {
						$additional_template_data['links'][ $counter ]['children'][ $children_counter ]['active'] = $child['active'];
						$additional_template_data['links'][ $counter ]['children'][ $children_counter ]['selected'] = $child['active'] ? 'selected' : '';
						$additional_template_data['links'][ $counter ]['children'][ $children_counter ]['url'] = $child['url'];
						$additional_template_data['links'][ $counter ]['children'][ $children_counter ]['title'] = $child['title'];
						$children_counter++;
					}

					$counter++;

				}
			}
		}

		// Custom Links.
		if ( 'custom_links' === $selected_links_type && ! empty( $custom_links ) ) {
			$additional_template_data['show_custom'] = true;
			$counter = 0;
			foreach ( $custom_links as $custom_link ) {
				if ( ! empty( $custom_link['link']['url'] ) && ! empty( $custom_link['link']['title'] ) ) {
					$additional_template_data['links'][ $counter ]['url'] = $custom_link['link']['url'];
					$additional_template_data['links'][ $counter ]['title'] = $custom_link['link']['title'];
					$additional_template_data['links'][ $counter ]['target'] = $custom_link['link']['target'];
				}
				$counter++;
			}
		}

		return parent::get_template_data( $additional_template_data );
	}

	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$use_anchors = ! empty( $attributes['use_anchors'] ) ? 'true' : 'false';

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class'            => 'm-0 w-100',
				'data-use-anchors' => $use_anchors,
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
