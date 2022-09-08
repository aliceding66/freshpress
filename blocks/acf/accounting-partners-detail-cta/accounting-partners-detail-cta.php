<?php
/**
 * Accounting Partners Detail CTA template.
 *
 * @package FreshPress\Website
 */

$partner = get_the_ID();
$acd_title = get_field( 'accounting-partners-detail-cta_title' );
$cta = get_field( 'accounting-partners-details-cta_cta' );
$button_link = $cta['button_link'];
$send_partners_name = $cta['send_partners_name'];
$button_class_name = 'btn-cta-green';
$button_class_name .= ' btn';
$description = get_field( 'accounting-partners-detail-cta_description' );
?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( 'accounting-partners-detail-cta' ) ); ?>">
	<div class="accounting-partners-detail-cta__top">
		<?php if ( $acd_title ) : ?>
			<h3 class="accounting-partners-detail-cta__title"><?= esc_html( $acd_title ); ?></h3>
		<?php endif; ?>
		<?php if ( $button_link && $button_link['url'] && $button_link['title'] ) : ?>
			<?php
			$new_link = $button_link['url'];
			if ( $send_partners_name ) {
				$new_link .= '?partner=' . $partner;
			}
			?>
			<a class="<?= esc_attr( $button_class_name ); ?>" href="<?= esc_url( $new_link ); ?>">
				<?= esc_html( $button_link['title'] ); ?>
			</a>
		<?php endif; ?>
	</div>
	<?php if ( $description ) : ?>
		<div class="accounting-partners-detail-cta__bottom">
			<p><?= esc_html( $description ); ?></p>
		</div>
	<?php endif; ?>
</div>
