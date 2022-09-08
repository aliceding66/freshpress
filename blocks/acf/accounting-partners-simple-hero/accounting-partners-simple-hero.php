<?php
/**
 * Accounting Partners Simple Hero template.
 *
 * @package FreshPress\Website
 */

$bg_color = get_field( 'accounting-partners-simple-hero_bg_color' );
$max_width = get_field( 'accounting-partners-simple-hero_max_width' );
$style = '';
$style_container = '';
if ( $bg_color ) {
	$style .= 'style=background-color:' . $bg_color . ';';
}
if ( $max_width ) {
	$style_container .= 'style=max-width:' . $max_width . ';';
}

$acs_title = get_field( 'accounting-partners-simple-hero_title' );

?>
<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( 'accounting-partners-simple-hero' ) ); ?>" <?= esc_attr( $style ); ?>>
	<div class="accounting-partners-simple-hero__container">
		<div <?= esc_attr( $style_container ); ?>>
			<h1><?= esc_html( $acs_title ); ?></h1>
		</div>
	</div>
</div>
