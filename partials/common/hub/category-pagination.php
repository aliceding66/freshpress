<?php
/**
 * Pagination partial for Hub Categories.
 *
 * @package FreshPress\Website
 */

add_filter( 'paginate_links', 'untrailingslashit' );

$pagination_array = paginate_links(
	[
		'prev_text' => fp_render_img( 'images/icons/arrow-left.svg' ),
		'next_text' => fp_render_img( 'images/icons/arrow-right.svg' ),
		'type'      => 'array',
		'total'     => ! empty( $wp_query_hub ) ? $wp_query_hub->max_num_pages : $wp_query->max_num_pages,
	]
);

if ( ! empty( $pagination_array ) ) :
	?>
	<nav
		class="pagination d-block mt-4 mb-5 text-right"
		role="navigation"
		aria-label="Pages"
	>
		<?= fp_noesc( implode( ' ', $pagination_array ) ) ?>
	</nav>
	<?php
endif;
