<?php
/**
 * Exit modal partial for Hub Categories.
 *
 * Needs removal of Yoast workaround.
 *
 * @package FreshPress\Website
 */

 /**
  * Get hub articles related to current context ($query).
  *
  * @param string $query     $wp_query object.
  */
function fp_hub_render_posts( $query = null ) {

	if ( ! isset( $query ) ) {
		global $wp_query;
		$query = $wp_query;
	}
	$category = false;
	$queried_object = get_queried_object();

	if ( is_tax( 'hub_category' ) && $queried_object instanceof WP_Term ) {
		$category = $queried_object;
	}

	while ( $query->have_posts() ) {
		$query->the_post();

		$current_post_id = get_the_ID();
		$post_category = $category ?? fp_get_primary_term( 'hub_category', $current_post_id );

		$attrs = [
			'article_title' => get_the_title(),
			'article_url'   => get_post_permalink(),
			'read_time'     => fp_estimate_read_time( get_the_content() ),
		];

		if ( $post_category instanceof WP_Term ) {
			$attrs['article_category'] = $post_category->name;
		}

		$attrs['bg_image']['url'] = get_field( 'hub_fb_featured_image' );
		?>
		<div class="col-12 col-md-6 col-xl-4 px-0 px-sm-2 px-lg-3 pb-4 d-flex">
			<?= fp_render_blocks(
				[
					'name'  => 'article-card',
					'attrs' => $attrs,
				]
			) ?>
		</div>
		<?php
	}

	wp_reset_postdata();
}

/**
 * Get featured image from Yoast SEO if it is not set directly.
 *
 * @param string $listing_image   Current listing image.
 * @param string $post_id         Post ID image being retrieved for.
 * @param string $term_id         Term ID taxonomy id in case no image assigned for post.
 * @return string
 */
function fp_get_post_extended_featured_image( $listing_image, $post_id, $term_id = '' ) {

	if ( empty( $listing_image ) ) {
		global $wpdb;
		$result = $wpdb->get_results( $wpdb->prepare( "SELECT open_graph_image FROM wp_yoast_indexable WHERE object_type = 'post' AND object_id = %d", $post_id ) );
		if ( ! empty( $result ) ) {
			$listing_image = $result[0]->open_graph_image;
		}
	}

	if ( empty( $listing_image ) && ! empty( $term_id ) ) {
		$seo_meta = WPSEO_Taxonomy_Meta::get_term_meta( $term_id, 'hub_category' );
		if ( isset( $seo_meta['wpseo_opengraph-image'] ) ) {
			$listing_image = $seo_meta['wpseo_opengraph-image'];
		}
	}

	return $listing_image;
}
