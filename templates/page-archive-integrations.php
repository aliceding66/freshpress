<?php
/**
 * Template Name: Page Archive - Integrations
 *
 * @package FreshPress\Website
 */

get_header();

fp_enqueue_template_assets( 'templates-common-integrations' );

// Nav queries.
$categories_list = get_terms(
	[
		'taxonomy'   => 'integration_category',
		'hide_empty' => true,
	]
);

$collections_list = get_terms(
	[
		'taxonomy'   => 'integration_collection',
		'hide_empty' => true,
	]
);

?>
<div class="integrations-taxonomy">

	<?php require_once get_template_directory() . '/partials/common/integrations/hero.php'; ?>

	<div
		id="integrations-taxonomy__main-content"
		class="integrations-taxonomy__main-content columns row pt-5"
	>

		<div class="integrations-taxonomy__left-column col col-12 col-lg-3 mx-auto p-0 pr-lg-5">

			<div
				id="integrations-taxonomy__navigation-wrapper"
				class="integrations-taxonomy__navigation-wrapper border-md border-primary rounded border-lg-0 px-3 py-3 py-lg-0 mx-md-3">

				<div class="integrations-taxonomy__navigation-header d-flex justify-content-between d-lg-none mb-5">
					<div class="integrations-taxonomy__navigation-group-by">Group By</div>
					<a
						id="integrations-taxonomy__navigation-close"
						class="integrations-taxonomy__navigation-close d-block"
						aria-label="Close"
					></a>
				</div>

				<div class="integrations-taxonomy__navigation-inner-wrapper pb-3 d-md-flex row wrap px-3">

					<div class="integrations-taxonomy__navigation-collections-wrapper">
						<h3 class="integrations-taxonomy__navigation-title">Collections</h3>
						<ul class="integrations-taxonomy__navigation-list integrations-taxonomy__navigation-list_collections mb-5 list-unstyled">
							<?php foreach ( $collections_list as $collections_item ) : ?>
								<?php if ( 'featured' !== $collections_item->slug ) : ?>
									<li class="py-1 px-2 mb-0">
										<a href="/integrations/collection/<?= esc_attr( $collections_item->slug ); ?>#integrations-taxonomy__main-content" class="text-decoration-none d-block">
											<?= esc_html( $collections_item->name ); ?>
										</a>
									</li>
								<?php endif; ?>
							<?php endforeach; ?>
						</ul>
					</div>

					<div class="integrations-taxonomy__navigation-categories-wrapper pl-md-5 pl-lg-0">
						<h3 class="integrations-taxonomy__navigation-title">Categories</h3>
						<ul class="integrations-taxonomy__navigation-list integrations-taxonomy__navigation-list_categories mb-5 list-unstyled">
							<?php
							$current_cat_class = '';
							if (
								isset( $_SERVER['REQUEST_URI'] )
								&& strpos( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), 'pages' ) > -1
							) {
								$current_cat_class = 'current';
							}
							?>
							<li class="py-1 px-2 mb-0 integrations-taxonomy__navigation-item <?= esc_attr( $current_cat_class ); ?>">
								<a href="/integrations/pages" class="text-decoration-none d-block mb-0">View All Integrations</a>
							</li>
							<?php foreach ( $categories_list as $categories_item ) : ?>
								<li class="py-1 px-2 mb-0 integrations-taxonomy__navigation-item">
									<a href="/integrations/<?= esc_attr( $categories_item->slug ); ?>#integrations-taxonomy__main-content" class="text-decoration-none d-block">
										<?= esc_html( $categories_item->name ); ?>
									</a>
								</li>
							<?php endforeach; ?>
						</ul>
					</div>

					<div class="integrations-taxonomy__cancel-button-wrapper text-center m-auto">
						<a
							id="integrations-taxonomy__cancel-button"
							class="integrations-taxonomy__cancel-button btn btn-white border d-block d-lg-none"
						>
							Cancel
						</a>
					</div>

				</div>
			</div>

		</div>

		<div class="integrations-taxonomy__right-column col col-12 col-lg-9 mx-auto px-3">

			<div class="integrations-taxonomy__search-wrapper d-flex justify-content-start justify-content-md-between align-items-start mb-5">
				<!-- Group By -->
				<div
					id="integrations-taxonomy__navigation-toggle"
					class="integrations-taxonomy__navigation-toggle position-relative d-lg-none pl-md-5"
				>
					<span class="d-none d-md-inline-block">Group By</span>
				</div>

				<!-- Search -->
				<?= fp_render_blocks(
					[
						'name'  => 'search-swiftype',
						'attrs' => [
							'block_settings_tracking_section' => 'integrations-search-field',
							'className'   => 'm-0 mr-2',
							'swiftype_id' => 'JhegJx_7S2W8bo-syFsg',
							'placeholder' => 'Find a new app or service you already use',
						],
					],
				); ?>
			</div>

			<?php
			if ( isset( $_SERVER['REQUEST_URI'] ) ) {
				if ( strpos( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), 'pages' ) > -1 ) {
					require_once get_template_directory() . '/partials/common/integrations/archive-all.php';
				} else {
					require_once get_template_directory() . '/partials/common/integrations/archive-landing.php';
				}
			}
			?>
		</div>

	</div>

	<div class="integrations__developers-banner">
		<?php require_once get_template_directory() . '/partials/common/integrations/footer.php'; ?>
	</div>

</div>

<?php get_footer(); ?>
