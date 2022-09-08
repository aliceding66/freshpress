<?php
/**
 * New Cta Inner Content template.
 *
 * @package FreshPress\Website
 */

$container_class_name = 'new-cta-inner-content';
if ( ! empty( $block['align'] ) ) {
	$container_class_name .= ' align' . $block['align'];
}
$pre_title = get_field( 'new-cta-inner-content_pre_heading' );
$ncta_title = get_field( 'new-cta-inner-content_title' );
$description = get_field( 'new-cta-inner-content_description' );
$cta = get_field( 'new-cta-inner-content_cta' );
$button_link = $cta['button_link'];
$button_style = $cta['button_style'];
$button_class_name = 'btn-cta-green';
if ( 'Blue' === $button_style ) {
	$button_class_name = 'btn-cta-blue';
}
if ( 'White' === $button_style ) {
	$button_class_name = 'btn-cta-white';
}
$button_class_name .= ' btn';
if ( $pre_title ) {
	$container_class_name .= ' new-cta-inner-content_lesswidth';
}
?>
<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $container_class_name ) ); ?>">
	<?php if ( $pre_title ) : ?>
		<span class="new-cta-inner-content__pre-heading"><?= esc_html( $pre_title ); ?></span>
	<?php endif; ?>
	<?php if ( $ncta_title ) : ?>
		<h3 class="new-cta-inner-content__title"><?= esc_html( $ncta_title ); ?></h3>
	<?php endif; ?>
	<?php if ( $description ) : ?>
		<p><?= esc_html( $description ); ?></p>
	<?php endif; ?>
	<?php if ( $button_link && $button_link['url'] && $button_link['title'] ) : ?>
		<a class="<?= esc_attr( $button_class_name ); ?>" href="<?= esc_url( $button_link['url'] ); ?>">
			<?= esc_html( $button_link['title'] ); ?>
		</a>
	<?php endif; ?>
</div>
