<?php
/**
 * Commission Details template.
 *
 * @package FreshPress\Website
 */

$class_name = 'commission-details';
$background_selector = '#' . fp_get_block_id( $block, false );

$currency = get_field( 'currency' );
$currency_sign = get_field( 'currency_sign' );
$tiles = [ 'trial_tile', 'upgrade_tile' ];
?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $class_name ) ); ?>">
	<div class="commission-details__container container">
		<div class="commission-details__row row justify-content-center px-1">
			<?php foreach ( $tiles as $tile ) : ?>
				<?php $bg_class = 'commission-details__' . $tile; ?>
				<style>
					<?php if ( get_field( $tile )['background'] ) : ?>
						<?= esc_html( $background_selector ); ?> .<?= esc_html( $bg_class ); ?> {
							background-image: url(<?= esc_html( get_field( $tile )['background']['url'] ); ?>);
						}
					<?php endif; ?>
				</style>
				<div class="commission-details__tile text-center text-md-left h-100 px-3 px-md-5 mx-lg-3 mx-xl-5 mb-5 mb-xl-0 <?= esc_attr( $bg_class ); ?>">
					<h4 class="commission-details__heading commission-details__heading--desktop d-block m-0 mt-5"><?= esc_html( get_field( $tile )['heading'] ); ?></h4>
					<div class="commission-details__description px-2 px-md-0 mt-3 mb-5"><?= esc_textarea( get_field( $tile )['description'] ); ?></div>
					<div class="commission-details__earn-up-to mb-3"><?= esc_html( get_field( $tile )['earn_up_to_text'] ); ?></div>
					<div class="commission-details__value d-flex justify-content-center justify-content-md-start align-items-start mb-5">
						<span class="commission-details__currency-sign"><?= esc_html( $currency_sign ); ?></span>
						<?= esc_html( get_field( $tile )['value'] ); ?>
						<span class="commission-details__currency align-self-end"><?= esc_html( $currency ); ?></span>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
