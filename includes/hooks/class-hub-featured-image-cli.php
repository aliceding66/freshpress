<?php
// phpcs:ignoreFile
/**
 * Initial set up of featuring images for hub articles.
 * To run on local first run this command: `wp --no-color --skip-themes search-replace //staging.web.freshenv.com //www.dev.freshenv.com --all-tables --no-report`.
 * Adjust line 89 on: update-local.sh
 * make cli
 * wp hub-articles setFeaturedImages
 */

if ( ! class_exists( 'WP_CLI' ) ) {
	return;
}

class HubArticles {
	function setFeaturedImages() {
		global $wpdb;

		$query = new WP_Query(
			[
				'posts_per_page'   => -1,
				'suppress_filters' => true,
				'post_type'        => 'hub_article',
			]
		);

		while ( $query->have_posts() ) {
			$query->the_post();

			$revisions = wp_get_post_revisions();
			$rev = array_shift( $revisions );
			$post_id = get_the_ID();
			if (strpos($rev->post_modified, '2022-04-22') !== false) {
				$rev = array_shift( $revisions );
				if (!isset($rev)) {
					$rev=get_post($post_id);
					$rev->post_modified = $rev->post_date;
					$rev->post_modified_gmt = $rev->post_date_gmt;
				}
			}
			$wpdb->query( "UPDATE $wpdb->posts SET post_modified = '{$rev->post_modified}', post_modified_gmt = '{$rev->post_modified_gmt}'  WHERE ID = {$post_id}" );

			if ( fp_get_featured_image( '_featured_image', get_the_ID() ) === '' ) {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT open_graph_image FROM wp_yoast_indexable WHERE object_type = 'post' AND object_id = %d", $post_id ) );
				if ( ! empty( $result ) ) {
					$attachment = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE guid='%s'", $result[0]->open_graph_image ) );
					if ( sizeof( $attachment ) > 0 ) {
						set_post_thumbnail( get_the_ID(), end( $attachment ) );
					} else {
						echo 'post_id: ' . get_the_ID() . "\n";
						echo $result[0]->open_graph_image . "\n";
					}
				}
			}
		}
	}

}

WP_CLI::add_command( 'hub-articles', 'HubArticles' );
