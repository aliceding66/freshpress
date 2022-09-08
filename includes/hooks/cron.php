<?php
/**
 * Cron jobs.
 *
 * @package FreshPress\Website
 */

add_action( 'init', 'fp_register_daily_img_checker_setup' );

/**
 * Setting up a cron job.
 */
function fp_register_daily_img_checker_setup() {
	if ( ! wp_next_scheduled( 'fp_register_daily_img_checker' ) ) {
		wp_schedule_single_event( strtotime( '00:00 tomorrow' ), 'fp_register_daily_img_checker' );
	}
}

add_action( 'fp_register_daily_img_checker', 'fp_register_daily_img_checker' );

/**
 * Actual cron job worker function.
 */
function fp_register_daily_img_checker() {
	$query = new WP_Query(
		[
			'posts_per_page'   => -1,
			'suppress_filters' => true,
			'post_type'        => 'hub_article',
		]
	);

	while ( $query->have_posts() ) {
		$query->the_post();
		$content = get_the_content();

		if ( '' === $content ) {
			continue; }

		$is_modified = false;

		$content = preg_replace_callback(
			'/\<img[^\>]*src\s*\=\s*\"([^\"]+)\"[^\>]*\>/i',
			function( $img ) use ( &$is_modified ) {
				if ( strpos( $img[0], ' width=' ) || strpos( $img[0], ' height=' ) ) {
					return $img[0];
				}

				$img_size = fp_get_asset_with_meta( $img[1] );
				if ( ! isset( $img_size['width'] ) || 0 === $img_size['width'] || ! isset( $img_size['height'] ) || 0 === $img_size['height'] ) {
					return $img[0];
				}

				$is_modified = true;
				return str_replace( '<img ', '<img width="' . $img_size['width'] . '" height="' . $img_size['height'] . '" ', $img[0] );
			},
			$content
		);

		if ( $is_modified ) {
			wp_update_post(
				[
					'ID'           => get_the_ID(),
					'post_content' => $content,
				]
			);
		}
	}

	wp_reset_query();
}

