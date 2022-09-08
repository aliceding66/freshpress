<?php
/**
 * Two Columns VAT Description template.
 *
 * @package FreshPress\Website
 */

// cta variables.
$switch = get_field( 'two_columns_vat_description_switch_positions' );
$switch_class = '';
if ( $switch ) {
	$switch_class = ' two-columns-vat-description__container__reverse';
}
$cta = get_field( 'two_columns_vat_description_cta' );
$button_link = $cta['button_link'];
$button_style = $cta['button_style'];
$button_max_width = $cta['max_width'];
$button_inline_styles = ! empty( $button_max_width ) ? 'style="max-width:' . esc_attr( $button_max_width ) . '"' : '';
$class_name = ( 'Blue' === $button_style ) ? 'btn-cta-blue' : 'btn-cta-green';
$class_name .= ' btn';

?>
<div <?= fp_get_block_id( $block, true ); ?> class="two-columns-vat-description <?= esc_attr( fp_get_block_classes() ); ?>">
	<div class="two-columns-vat-description__container<?= esc_attr( $switch_class ); ?>">
		<div class="two-columns-vat-description__left">
			<?php if ( get_field( 'two_columns_vat_description_title' ) ) : ?>
				<h2><?= esc_html( get_field( 'two_columns_vat_description_title' ) ); ?></h2>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_vat_description_description' ) ) : ?>
				<div class="two-columns-vat-description__description_1">
					<?= fp_noesc( get_field( 'two_columns_vat_description_description' ) ); ?>
				</div>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_vat_description_gray_label' ) ) : ?>
				<div class="two-columns-vat-description__gray">
					<p><?= esc_html( get_field( 'two_columns_vat_description_gray_label' ) ); ?>
					</p>
				</div>
			<?php endif; ?>
			<div class="two-columns-vat-description__rates">
				<?php foreach ( get_field( 'two_columns_vat_description_rates' ) as $rate ) : ?>
					<div class="two-columns-vat-description__rate">
						<?php if ( $rate['title'] ) : ?>
							<h3><?= esc_html( $rate['title'] ); ?>
							<?php endif; ?>
							</h3>
							<?php if ( $rate['description'] ) : ?>
								<p><?= esc_html( $rate['description'] ); ?></p>
							<?php endif; ?>
					</div>
				<?php endforeach; ?>
			</div>
			<?php if ( get_field( 'two_columns_vat_description_description_2' ) ) : ?>
				<div class="d-none d-lg-block">
					<?= fp_noesc( get_field( 'two_columns_vat_description_description_2' ) ); ?>
				</div>
			<?php endif; ?>
			<?php if ( is_array( $button_link ) && $button_link['url'] && $button_link['title'] ) : ?>
				<a <?= fp_noesc( $button_inline_styles ); ?> class="<?= esc_attr( $class_name . ' d-none d-lg-inline-block' ); ?>" href="<?= esc_url( $button_link['url'] ); ?>">
					<?= esc_html( $button_link['title'] ); ?>
				</a>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_vat_description_text_below_cta' ) ) : ?>
				<span class="two-columns-vat-description__below-cta d-none d-lg-block">
					<?= fp_noesc( get_field( 'two_columns_vat_description_text_below_cta' ) ); ?>
				</span>
			<?php endif; ?>
		</div>
		<div class="two-columns-vat-description__right">
			<?php if ( get_field( 'two_columns_vat_description_description_2' ) ) : ?>
				<div class="d-block d-lg-none">
					<?= fp_noesc( get_field( 'two_columns_vat_description_description_2' ) ); ?>
				</div>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_vat_description_image' ) ) : ?>
				<?= fp_render_img( get_field( 'two_columns_vat_description_image' ), [], 'large' ); ?>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_vat_description_description_3' ) ) : ?>
				<div class="two-columns-vat-description__under-image">
					<?= fp_noesc( get_field( 'two_columns_vat_description_description_3' ) ); ?>
				</div>
			<?php endif; ?>
			<div>
				<?php if ( is_array( $button_link ) && $button_link['url'] && $button_link['title'] ) : ?>
					<a <?= fp_noesc( $button_inline_styles ); ?> class="<?= esc_attr( $class_name . ' d-inline-block d-lg-none' ); ?>" href="<?= esc_url( $button_link['url'] ); ?>">
						<?= esc_html( $button_link['title'] ); ?>
					</a>
				<?php endif; ?>
				<?php if ( get_field( 'two_columns_vat_description_text_below_cta' ) ) : ?>
					<span class="two-columns-vat-description__below-cta d-block d-lg-none">
						<?= fp_noesc( get_field( 'two_columns_vat_description_text_below_cta' ) ); ?>
					</span>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
