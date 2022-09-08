<?php
/**
 * The 3 different collections are defined here.
 *
 * @package FreshPress\Website
 */

$featured = get_posts(
	[
		'post_type'   => 'integration',
		'post_status' => 'publish',
		'numberposts' => -1,
		'tax_query'   => [
			[
				'taxonomy' => 'integration_collection',
				'field'    => 'slug',
				'terms'    => 'featured',
			],
		],
	]
);

$top_picks = get_posts(
	[
		'post_type'   => 'integration',
		'post_status' => 'publish',
		'numberposts' => -1,
		'tax_query'   => [
			[
				'taxonomy' => 'integration_collection',
				'field'    => 'slug',
				'terms'    => 'top-picks',
			],
		],
	]
);

$freshbooks_tested = get_posts(
	[
		'post_type'   => 'integration',
		'post_status' => 'publish',
		'numberposts' => 3,
		'tax_query'   => [
			[
				'taxonomy' => 'integration_collection',
				'field'    => 'slug',
				'terms'    => 'freshbooks-tested',
			],
		],
	]
);

?>

<!-- Featured -->
<h2 class="mb-4"><?= esc_html__( 'Featured', 'freshpress-website' ); ?></h2>

<div class="integrations-taxonomy__integrations-container d-flex row m-0 mb-5 justify-content-start">

	<?php foreach ( $featured as $key => $featured_item ) : ?>
		<?php
		echo fp_render_blocks(
			[
				'name'  => 'integration-card',
				'attrs' => [
					'data'      => [
						'integration_card_id' => $featured_item->ID,
					],
					'className' => 'trackingSection-integration-card',
				],
			],
		);

		?>

	<?php endforeach; ?>

</div>

<!-- Top Picks -->
<div class="d-flex justify-content-between align-items-baseline">
	<h2 class="mb-4"><?= esc_html__( 'Top Picks', 'freshpress-website' ); ?></h2>
	<a class="integrations-taxonomy__view-all text-decoration-none" href="/integrations/collection/top-picks#integrations-taxonomy__main-content">View all</a>
</div>

<div class="integrations-taxonomy__integrations-container d-flex row m-0 mb-5 justify-content-start">

	<?php foreach ( $top_picks as $key => $top_picks_item ) : ?>
		<?php
		echo fp_render_blocks(
			[
				'name'  => 'integration-card',
				'attrs' => [
					'data'      => [
						'integration_card_id' => $top_picks_item->ID,
					],
					'className' => 'trackingSection-integration-card',
				],
			],
		);

		$top_picks_count = count( $top_picks );
		?>

		<?php
		if (
			( $top_picks_count >= 6 ) && ( 4 === $key ) ||
			( $top_picks_count < 6 ) && ( ( $top_picks_count - 1 ) === $key )
		) :
			?>
			<!-- Ad -->
			<a href="<?= esc_url( home_url( '/signup' ) ); ?>" class="integration-card integrations-taxonomy__ad rounded mb-4"></a>
			<!-- End: Ad -->
		<?php endif; ?>

	<?php endforeach; ?>

</div>

<!-- Freshbooks Tested -->
<div class="d-flex justify-content-between align-items-baseline">
	<h2 class="mb-4"><?= esc_html__( 'Freshbooks Tested', 'freshpress-website' ); ?></h2>
	<a class="integrations-taxonomy__view-all text-decoration-none" href="/integrations/collection/freshbooks-tested#integrations-taxonomy__main-content">View all</a>
</div>

<div class="integrations-taxonomy__integrations-container d-flex row m-0 justify-content-start">

	<?php foreach ( $freshbooks_tested as $key => $freshbooks_tested_item ) : ?>
		<?php
		echo fp_render_blocks(
			[
				'name'  => 'integration-card',
				'attrs' => [
					'data'      => [
						'integration_card_id' => $freshbooks_tested_item->ID,
					],
					'className' => 'trackingSection-integration-card',
				],
			],
		);

		?>

	<?php endforeach; ?>

</div>
