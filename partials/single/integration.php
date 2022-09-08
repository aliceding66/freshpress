<?php
/**
 * Single template for Integrations.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-single-integrations' );

the_post();

$cta = get_field( 'integrations_hero_cta' );
$built_by = get_field( 'integrations_developer_name' ) ?? 'Freshbooks';
$developer_url = get_field( 'integrations_developer_site_url' );
$tested_by_freshbooks = has_term( 'freshbooks-tested', 'integration_collection' );
$top_pick = has_term( 'top-picks', 'integration_collection' );
$available_in = get_the_terms( get_the_ID(), 'integration_availability' );
$categories = get_the_terms( get_the_ID(), 'integration_category' );
?>

<div class="m-0">

	<div class="integrations__hero">

		<ul class="integrations__breadcrumb integrations__breadcrumb_mobile list-unstyled p-0 d-flex d-md-none">
			<li><a href="/integrations" class="integrations__back-link pl-3">Back</a></li>
		</ul>

		<?php if ( $categories ) : ?>
		<ul class="integrations__breadcrumb list-unstyled p-0 d-none d-md-flex">
			<li><a href="/integrations">Apps &amp; Integrations</a></li>
			<li><img src="<?= fp_get_asset( 'images/single/integrations/integrations-breadcrumb-separator.svg' ) ?>" alt=">"></li>
			<li><a href="/integrations/<?= esc_attr( $categories[0]->slug ) ?>" class="integrations__category-link"><?= esc_html( $categories[0]->name ); ?></a></li>
		</ul>
		<?php endif; ?>

		<div class="integrations__info columns row text-center text-md-left">

			<div class="integrations__logo-container order-2 order-md-1 column col col-12 col-md-4">

				<div class="integrations__logo-wrapper text-center w-100 mx-auto mx-md-0 mb-3">
					<?php if ( the_post_thumbnail() ) : ?>
						<?= esc_html( the_post_thumbnail() ); ?>
					<?php endif; ?>
					<?php if ( $top_pick ) : ?>
						<div class="integrations__top-pick position-absolute"></div>
					<?php endif; ?>
				</div>

				<?php if ( $tested_by_freshbooks ) : ?>
					<p class="integrations__freshbooks-tested text-left text-uppercase d-inline-block pl-3 mx-auto mr-md-0 ml-md-2 ml-lg-3">Freshbooks Tested</p>
				<?php endif; ?>

			</div>

			<div class="integrations__text-container order-1 order-md-2 column col col-12 col-md-8 mx-auto mx-md-0 mb-4 mb-md-0 p-0">

				<div class="integrations__title-container align-items-end m-auto m-md-0">
					<h1 class="integrations__title mb-2 mr-2"><?= esc_html( the_title() ); ?></h1>
					<p class="integrations__built-by m-0">Integration by
						<?php if ( $developer_url ) : ?>
							<a href="<?= esc_attr( $developer_url ); ?>" target="_blank">
						<?php endif; ?>
								<?= esc_html( $built_by ); ?>
						<?php if ( $developer_url ) : ?>
							</a>
						<?php endif; ?>
					</p>
				</div>

				<p><?= esc_html( the_excerpt() ); ?></p>

				<?php if ( $available_in ) : ?>
					<div class="integrations__available-in mb-3">
						<p class="pb-2 m-0 d-inline-block">Available in</p>
						<div class="d-inline-block">
							<?php foreach ( $available_in as $country ) : ?>
								<span class="fi fi-<?= esc_html( $country->slug ); ?> ml-2 d-inline-block float-left"></span>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>

				<?php if ( $cta ) : ?>
					<a class="btn-cta-green btn d-inline-block m-auto m-md-0" href="<?= esc_attr( $cta['url'] ); ?>" target="<?= esc_attr( $cta['target'] ); ?>">
						<p class="integrations__cta-title d-inline"><?= esc_html( $cta['title'] ); ?></p>
					</a>
				<?php endif; ?>

			</div>

		</div>
	</div>

	<div class="integrations__content mb-5 mb-lg-0">
		<?= esc_html( the_content() ); ?>
	</div>

	<div class="integrations__info columns row px-3 my-0">
		<div class="column col col-12 col-lg-3"></div>
		<div class="column col col-12 col-lg-9 p-0">

			<!-- Similar Apps -->
			<?php $similar_apps = get_field( 'integrations_similar_apps' ); ?>
			<?php if ( ! empty( $similar_apps ) ) : ?>
				<h2 class="mb-4"><?= esc_html__( 'Similar Apps', 'freshpress-website' ); ?></h2>
			<?php endif; ?>
			<div class="d-flex row m-0 justify-content-start">
				<?php
				if ( ! empty( $similar_apps ) ) {
					foreach ( $similar_apps as $similar_app ) {
						if ( 'publish' === get_post_status( $similar_app ) ) {
							echo fp_render_blocks(
								[
									'name'  => 'integration-card',
									'attrs' => [
										'data'      => [
											'integration_card_id' => $similar_app,
										],
										'className' => 'trackingSection-integration-card',
									],
								],
							);
						}
					}
				}
				?>
			</div>


		</div>
	</div>

	<div class="integrations__developers-banner">
		<?php require_once get_template_directory() . '/partials/common/integrations/developers-banner.php'; ?>
	</div>
</div>
