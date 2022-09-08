<?php
/**
 * Two Columns Text template.
 *
 * @package FreshPress\Website
 */

$bg_style = get_field( 'two_columns_text_bg_style' );
$nocrop = get_field( 'two_columns_text_bg_nocrop' );
$style = '';
$block_classes = 'two-columns-text';
if ( 'background_color' == $bg_style ) {
	$bg_color = get_field( 'two_columns_text_bg_color' );
	$style = ' style=background-color:' . esc_attr( $bg_color ) . '; ';
} elseif ( 'background_image' == $bg_style ) {
	$bg_image = get_field( 'two_columns_text_bg_image' );
	$style = ' style=background-size:cover;background-position:center;background-image:url(' . esc_url( $bg_image['url'] ) . '); ';
} else {
	$block_classes .= ' two-columns-text__default-color';
}
if ( ! $nocrop ) {
	$block_classes .= ' two-columns-text__default-crop';
}
?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $block_classes ) ); ?>" <?= esc_attr( $style ); ?>>
	<div class="two-columns-text__container">
		<div class="two-columns-text__content_left">
			<?php if ( get_field( 'two_columns_text_title' ) ) : ?>
				<h2><?= esc_html( get_field( 'two_columns_text_title' ) ); ?></h2>
			<?php endif; ?>
			<?php if ( get_field( 'two_columns_text_description' ) ) : ?>
				<?= fp_noesc( get_field( 'two_columns_text_description' ) ); ?>
			<?php endif; ?>
		</div>
		<?php if ( get_field( 'two_columns_text_description_2' ) ) : ?>
			<div class="two-columns-text__content_right">
				<?= fp_noesc( get_field( 'two_columns_text_description_2' ) ); ?>
			</div>
		<?php endif; ?>
	</div>
</div>
