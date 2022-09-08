<?php
/**
 * Accounting Partners Hero Service Location template.
 *
 * @package FreshPress\Website
 */

$certified = get_field( 'accounting-partners-hero-service-location-service-location_certified' );
$title_1 = get_field( 'accounting-partners-hero-service-location-service-location_title_1' );
$title_2 = get_field( 'accounting-partners-hero-service-location-service-location_title_2' );
$title_3 = get_field( 'accounting-partners-hero-service-location-service-location_title_3' );
$description = get_field( 'accounting-partners-hero-service-location-service-location_description' );

?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( 'accounting-partners-hero-service-location' ) ); ?>">
	<div class="accounting-partners-hero-service-location__container">
		<?php if ( $certified ) : ?>
			<span class="accounting-partners-hero-service-location__certified"><?= esc_html( $certified ); ?></span>
		<?php endif; ?>
		<?php if ( $title_1 || $title_2 || $title_3 ) : ?>
			<h1>
				<?php if ( $title_1 ) : ?>
					<?= esc_html( $title_1 ); ?>
				<?php endif; ?>
				<span class="title_service"></span>
				<?php if ( $title_2 ) : ?>
					<?= esc_html( $title_2 ); ?>
				<?php endif; ?>
				<span class="title_location"></span>
				<?php if ( $title_3 ) : ?>
					<?= esc_html( $title_3 ); ?>
				<?php endif; ?>
			</h1>
		<?php endif; ?>
		<?php if ( $description ) : ?>
			<div class="accounting-partners-hero-service-location__description">
				<p><?= esc_html( $description ); ?></p>
			</div>
		<?php endif; ?>
	</div>
</div>
