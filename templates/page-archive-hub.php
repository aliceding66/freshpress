<?php
/**
 * Template Name: Page Archive - Hub
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-hub' );

$page_no = get_query_var( 'paged' ) ?? get_query_var( 'page' ) ?? 1;

$wp_query_args = [
	'post_type'      => 'hub_article',
	'posts_per_page' => 9,
	'post_status'    => 'publish',
	'paged'          => $page_no,
];
$wp_query_hub = new WP_Query( $wp_query_args );

if ( $page_no > 1 && ! $wp_query_hub->have_posts() ) {
	fp_serve_404();
} else {
	fp_add_paginated_canonicals( $wp_query_hub );
	get_header();

	require_once get_template_directory() . '/partials/common/hub/common-functions.php';

	echo fp_render_blocks(
		[
			'name'  => 'hero-search',
			'attrs' => [
				'header'           => 'Small Business Resource Hub',
				'placeholder'      => 'Search Here',
				'background_image' => get_field( 'hub_articles', 'option' )['hero_image'],
				'text_color'       => '',
			],
		]
	); ?>

<div class="row px-2 px-3 py-1 mt-lg-4">
	<div class="d-none d-lg-block col-lg-3 hub-category__nav-bar">
		<div class="sticky-top mb-5">
			<?= fp_render_blocks(
				[
					'name'  => 'related-links',
					'attrs' => [
						'className'         => 't-100',
						'links_type'        => 'taxonomy',
						'select_categories' => 'hub_category',
						'select_layout'     => 'list_with_bg',
					],
				]
			); ?>

			<!-- CTA Banner -->
			<?= fp_render_blocks(
				[
					'name'  => 'cta-banner',
					'attrs' => [
						'heading'   => __( 'Resources for Your Growing Business', 'freshpress-website' ),
						'className' => 'is-style-navigation mt-5',
					],
				]
			); ?>
		</div>

	</div>

	<div id="mobile-sidebar" class="fp-block mb-3 mobile-list-container d-lg-none sticky-top flexible-colour-background wp-block wp-block-fpbk-flexible-colour-background no-gutters w-auto trackingSection-flexible-colour-background" data-prefix="fpbk">
		<div class="position-absolute flexible-colour-background__background-wrapper"></div>
		<p class="mobile-list-title">Articles<span class="mobile-list-arrow"></span></p>

		<div id="block_en-us_6048c308aa2fa" class="fp-block d-lg-none position-relative mobile-list related-links wp-block wp-block-fpbk-related-links m-0 w-100 trackingSection-related-links" data-use-anchors="true" data-prefix="fpbk">

			<?= fp_render_blocks(
				[
					'name'  => 'related-links',
					'attrs' => [
						'links_type'        => 'taxonomy',
						'select_categories' => 'hub_category',
						'select_layout'     => 'list_with_bg',
					],
				]
			); ?>

		</div>

	</div>

	<div class="p-0 mx-0 mt-0 mb-5 col-12 d-block d-lg-none hub__mobile-cta-banner">
		<!-- CTA Banner -->
		<?= fp_render_blocks(
			[
				'name'  => 'cta-banner',
				'attrs' => [
					'heading'   => __( 'Resources for Your<br />Growing Business', 'freshpress-website' ),
					'className' => 'm-0 p-0',
				],
			]
		); ?>
	</div>


	<div class="col-12 col-lg-9 hub-category__main-container">
		<div>
			<h5 class="mt-0 mb-3 d-block font-weight-medium"><?= esc_html__( 'TOP STORIES', 'freshpress-website' ) ?></h5>
			<div class="row">
				<?php
				if ( $wp_query_hub->have_posts() ) {
					fp_hub_render_posts( $wp_query_hub );
				}
				?>
			</div>
			<?php require_once get_template_directory() . '/partials/common/hub/category-pagination.php'; ?>
		</div>
	</div>

</div>

	<?php
	require_once get_template_directory() . '/partials/common/hub/common-footer.php';

	get_footer();
}
