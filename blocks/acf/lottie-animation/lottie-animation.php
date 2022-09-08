<?php
/**
 * Lottie Animation template.
 *
 * @package FreshPress\Website
 */

$url_animation_type = get_field( 'url_animation_type' );
if ( $url_animation_type ) {
	$animation = get_field( 'animation_url' );
} else {
	$animation = get_field( 'animation' );
}
$renderer = get_field( 'renderer' );
$speed = get_field( 'animation_speed' );

if ( ! empty( $animation ) ) : ?>
	<div
		<?= fp_get_block_id( $block, true ); ?>
		class="<?= esc_attr( fp_get_block_classes( 'lottie-animation' ) ); ?> p-0 my-0 mx-auto position-relative d-block"
	>
		<pre class="d-none d-editor-none" data-name="animation<?= $url_animation_type ? '-url' : '' ?>"><?= fp_noesc( $animation ) ?></pre>
		<pre class="d-none d-editor-none" data-name="renderer"><?= fp_noesc( $renderer ) ?></pre>
		<pre class="d-none d-editor-none" data-name="speed"><?= fp_noesc( $speed ) ?></pre>
	</div>
<?php endif; ?>
