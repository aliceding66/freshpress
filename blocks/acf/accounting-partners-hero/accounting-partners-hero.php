<?php
/**
 * Accounting Partners Hero template.
 *
 * @package FreshPress\Website
 */

$certified = get_field( 'accounting-partners-hero_certified' );
$ap_title = get_field( 'accounting-partners-hero_title' );
$description = get_field( 'accounting-partners-hero_description' );
$image = get_field( 'accounting-partners-hero_image' );

?>
<div <?= fp_get_block_id( $block, true ); ?> class="<?= esc_attr( fp_get_block_classes( 'accounting-partners-hero' ) ); ?>">
	<div class="accounting-partners-hero__container">
		<div class="accounting-partners-hero__left">
			<?php if ( $certified ) : ?>
				<span class="accounting-partners-hero__certified"><?= esc_html( $certified ); ?></span>
			<?php endif; ?>
			<?php if ( $ap_title ) : ?>
				<h1><?= esc_html( $ap_title ); ?></h1>
			<?php endif; ?>
			<?php if ( $description ) : ?>
				<div class="accounting-partners-hero__description">
					<p><?= esc_html( $description ); ?></p>
				</div>
			<?php endif; ?>
		</div>
		<div class="accounting-partners-hero__right d-none d-md-flex">
			<?php
			if ( $image ) {
				echo fp_render_img( $image, [], 'full' );
			}
			?>
		</div>
	</div>
</div>
