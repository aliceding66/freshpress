<?php
/**
 * Product Tour Grey Line template.
 *
 * @package FreshPress\Website
 */

$container_classes = 'product-tour-grey-line__container position-absolute d-none d-xl-block w-100 px-xl-5';
$snap_to_checkpoint_threshold = get_field( 'snap_to_checkpoint_threshold' );
$checkpoint_placement = get_field( 'checkpoint_placement' );
$show_start_checkpoint = boolval( get_field( 'show_start_checkpoint' ) );

if ( is_null( $snap_to_checkpoint_threshold ) || false === $snap_to_checkpoint_threshold ) {
	$snap_to_checkpoint_threshold = 100;
}
if ( is_null( $checkpoint_placement ) || false === $checkpoint_placement ) {
	$checkpoint_placement = 'heading';
}
if ( $show_start_checkpoint ) {
	$container_classes .= ' product-tour-grey-line__container--with-start-dot ';
}

?>

<div id="<?= fp_get_block_id( $block ) ?>" class="<?= esc_attr( fp_get_block_classes( 'product-tour-grey-line' ) ) ?> position-relative px-lg-7">
	<InnerBlocks/>

	<div
		class="<?= fp_noesc( $container_classes ) ?>"
		data-finished="0"
		data-snap-to-checkpoint-threshold="<?= (int) $snap_to_checkpoint_threshold ?>"
		data-checkpoint-placement="<?= esc_attr( $checkpoint_placement ) ?>"
		data-show-start-checkpoint="<?= esc_attr( $show_start_checkpoint ) ?>"
		style="opacity: 0; --top-offset: 0px;"
	>
		<div class="product-tour-grey-line__line-left-bottom position-absolute w-25">
			<div
				class="product-tour-grey-line__line-left-bottom--revealer position-absolute h-100 overflow-hidden border-0"
				style="--revealed-y: 100%; --revealed-x: 100%;"
			>
				<div class="product-tour-grey-line__line-left-bottom--color position-absolute w-100 h-100"></div>
			</div>
		</div>

		<div class="product-tour-grey-line__line-bottom-finish position-absolute">
			<div
				class="product-tour-grey-line__line-bottom-finish--revealer position-absolute h-100 overflow-hidden border-0"
				style="--revealed-y: 100%; --revealed-x: 100%;"
			>
				<div class="product-tour-grey-line__line-bottom-finish--color position-absolute w-100 h-100"></div>
			</div>
			<div class="product-tour-grey-line__circle-marker-checkpoint product-tour-grey-line__circle-marker-checkpoint--last position-absolute"></div>
		</div>

		<div class="product-tour-grey-line__circle-marker-coordinator--vertical position-absolute w-50" style="--y: 0%">
			<div class="product-tour-grey-line__circle-marker-coordinator--horizontal position-absolute w-100" style="--x: 0%">
				<div class="product-tour-grey-line__circle-marker-main position-absolute"></div>
			</div>
		</div>
	</div>
</div>
