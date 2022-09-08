<?php
/**
 * Resellers Commission template.
 *
 * @package FreshPress\Website
 */

$class_name = 'resellers-commission';
$background_selector = '#' . fp_get_block_id( $block, false );

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
	if ( 'right' === $block['align'] ) {
		$class_name .= ' ml-md-auto mr-md-0';
	} elseif ( 'left' === $block['align'] ) {
		$class_name .= ' mr-md-auto ml-md-0';
	}
}

if ( get_field( 'shape' ) === 'circle' ) {
	$class_name .= ' rounded-circle justify-content-center';
}

$content_align = $block['align'] ? ' justify-content-' . $block['align'] : '';
?>

<?php if ( get_field( 'background_color' ) ) : ?>
	<style>
		<?= esc_html( $background_selector ); ?> {
			background-color: <?= esc_html( get_field( 'background_color' ) ); ?>;
		}
	</style>
<?php endif; ?>

<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( $class_name ) ); ?> mx-auto d-flex align-items-center">
	<div class="resellers-commission__content d-flex flex-wrap align-items-end <?= esc_attr( $content_align ); ?>">
		<div class="resellers-commission__upper-text w-100" style="color: <?= esc_attr( get_field( 'up_to_text_color' ) ); ?>"><?= esc_html( get_field( 'up_to_text' ) ) ?></div>
		<div class="resellers-commission__highlighted-text" style="color: <?= esc_attr( get_field( 'highlighted_text_color' ) ); ?>"><?= esc_html( get_field( 'highlighted_text' ) ) ?></div>
		<div class="resellers-commission__off-text ml-1" style="color: <?= esc_attr( get_field( 'off_text_color' ) ); ?>"><?= esc_html( get_field( 'off_text' ) ) ?></div>
	</div>
</div>
