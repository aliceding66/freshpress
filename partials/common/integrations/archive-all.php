<?php
/**
 * All Integrations.
 *
 * @package FreshPress\Website
 */

$all = get_posts(
	[
		'post_type'   => 'integration',
		'post_status' => 'publish',
		'numberposts' => -1,
	]
);

?>

<!-- All Integrations -->
<h2 class="mb-4"><?= esc_html__( 'All Integrations', 'freshpress-website' ); ?></h2>

<div class="integrations-taxonomy__integrations-container d-flex row m-0 mb-5 justify-content-start">

	<?php foreach ( $all as $key => $item ) : ?>
		<?php
		echo fp_render_blocks(
			[
				'name'  => 'integration-card',
				'attrs' => [
					'data'      => [
						'integration_card_id' => $item->ID,
					],
					'className' => 'trackingSection-integration-card',
				],
			],
		);

		?>

	<?php endforeach; ?>

</div>
