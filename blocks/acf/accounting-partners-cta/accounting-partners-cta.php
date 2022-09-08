<?php
/**
 * Accounting Partners CTA template.
 *
 * @package FreshPress\Website
 */

$pre_head = get_field( 'accounting-partners-cta_pre_head' );
$ac_title = get_field( 'accounting-partners-title' );
$description = get_field( 'accounting-partners-cta_description' );
$cta = get_field( 'accounting-partners-cta_button' );
$button_link = $cta['button_link'];
$button_max_width = $cta['max_width'];
$button_inline_styles = ! empty( $button_max_width ) ? 'style="max-width:' . esc_attr( $button_max_width ) . '"' : '';
$class_name = 'btn-cta-green';
$class_name .= ' btn';

$container_class_name = '';
if ( ! empty( $block['align'] ) ) {
	$container_class_name .= ' align' . $block['align'];
}
?>
<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $container_class_name . ' accounting-partners-cta' ) ); ?>">
	<div class="accounting-partners-cta__container">
		<div class="accounting-partners-cta__content">
			<?php if ( $pre_head ) : ?>
				<span class="accounting-partners-cta__pre-hed"><?= esc_html( $pre_head ); ?></span>
			<?php endif; ?>
			<?php if ( $ac_title ) : ?>
				<h3 class="accounting-partners-cta__title"><?= esc_html( $ac_title ); ?></h3>
			<?php endif; ?>
			<?php if ( $description ) : ?>
				<p class="accounting-partners-cta__description"><?= esc_html( $description ); ?></p>
			<?php endif; ?>
			<?php if ( $button_link && $button_link['url'] && $button_link['title'] ) : ?>
				<a <?= fp_noesc( $button_inline_styles ); ?> class="<?= esc_attr( $class_name ); ?>" href="<?= esc_url( $button_link['url'] ); ?>">
					<?= esc_html( $button_link['title'] ); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
</div>
