<?php
/**
 * Two Columns CTA template.
 *
 * @package FreshPress\Website
 */

$cta = get_field( 'two_columns_cta_cta' );
$button_link = $cta['button_link'];
$button_style = $cta['button_style'];
$button_max_width = $cta['max_width'];
$button_inline_styles = ! empty( $button_max_width ) ? 'style="max-width:' . esc_attr( $button_max_width ) . '"' : '';
$class_name = ( 'Blue' === $button_style ) ? 'btn-cta-blue' : 'btn-cta-green';
$class_name .= ' btn';

?>
<div <?= fp_get_block_id( $block, true ); ?> class="two-columns-cta <?= esc_attr( fp_get_block_classes() ); ?>">
	<div class="two-columns-cta__container">
		<div class="two-columns-cta__content_left">
			<div class="two-columns-cta__hightlighed">
			<?php if ( get_field( 'two_columns_cta_hightlighed' ) ) : ?>
				<h2 class="font-additional"><?= esc_html( get_field( 'two_columns_cta_hightlighed' ) ); ?></h2>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_cta_description' ) ) : ?>
				<p class="font-additional"><?= esc_html( get_field( 'two_columns_cta_description' ) ); ?></p>
			<?php endif; ?>
			</div>
		</div>
		<div class="two-columns-cta__content_right">
			<?php if ( is_array( $button_link ) && $button_link['url'] && $button_link['title'] ) : ?>
				<div class="two-columns-cta__cta">
					<a <?= fp_noesc( $button_inline_styles ); ?> class="<?= esc_attr( $class_name ); ?>"
					href="<?= esc_url( $button_link['url'] ); ?>">
					<?= esc_html( $button_link['title'] ); ?>
				</a>
			</div>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_cta_cta_description' ) ) : ?>
				<div class="two-columns-cta__cta-description">
					<p><?= esc_html( get_field( 'two_columns_cta_cta_description' ) ); ?></p>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>
