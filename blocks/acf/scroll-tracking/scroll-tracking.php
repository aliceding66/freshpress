<?php
/**
 * Scroll Tracking template.
 *
 * @package FreshPress\Website
 */

$class_name = 'scroll-tracking hidden ';

if ( ! empty( $block['className'] ) ) {
	$class_name .= $block['className'];
}

$tracking_section = get_field( 'tracking_section_name' );
if ( is_admin() ) : ?>
	<style>
		.acf-block-preview #<?= esc_html( $block['id'] ); ?> {
			display: block;
		}

		.acf-block-preview #<?= esc_html( $block['id'] ); ?>::before {
			display: flex;
			justify-content: center;
			margin-top: 1rem;
			margin-bottom: 1rem;
			font-size: 1.5rem;
			content: 'Scroll Tracking Enabled for "<?= esc_html( $tracking_section ); ?>"';
		}
	</style>
<?php endif; ?>
<div id="<?= esc_attr( $block['id'] ); ?>"
	class="<?= esc_attr( fp_get_block_classes( $class_name ) ); ?>"
	data-tracking-section="<?= esc_attr( $tracking_section ); ?>"
></div>
