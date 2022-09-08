<?php
/**
 * Taxonomy template for Hub Categories.
 *
 * @package FreshPress\Website
 */

?>
<?php
// This additional break requrid as otherwise we will have wired "Missing file doc comment (Squiz.Commenting.FileComment.Missing)" false-positive error.
require_once get_template_directory() . '/partials/common/hub/common-functions.php';
fp_enqueue_template_assets( 'templates-page-hub' );


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
);
?>

<div class="row px-2 px-3 py-5">
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
				<?php fp_hub_render_posts(); ?>
			</div>
			<?php require_once get_template_directory() . '/partials/common/hub/category-pagination.php'; ?>
		</div>
	</div>
</div>


<?php
require_once get_template_directory() . '/partials/common/hub/common-footer.php';
