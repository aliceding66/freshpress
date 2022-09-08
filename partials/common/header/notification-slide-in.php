<?php
/**
 * Slide-in Notification template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-notification-slide-in' );

$campaign = fp_init_campaign();

$slide_in_title = $campaign['slide_in_title'];
$text = $campaign['slide_in_text'];
if ( isset( $campaign['slide_in_cta'] ) && ( '' !== $campaign['slide_in_cta'] ) ) {
	$cta_title = $campaign['slide_in_cta']['title'];
	$cta_url = $campaign['slide_in_cta']['url'];
	$cta_target = ( ! empty( $campaign['slide_in_cta']['target'] ) ) ? $campaign['slide_in_cta']['target'] : '_self';
}
$background_image = $campaign['slide_in_background_image'];
$badge_image = $campaign['slide_in_badge_image'];

?>

<div class="notification-slide-in" role="alert">
	<div class="notification-slide-in__card" style="background-image: url(<?= esc_attr( $background_image['url'] ); ?>)">
		<!-- Copy -->
		<div class="notification-slide-in__card-body">
			<?= fp_render_img( $badge_image, [ 'class' => 'notification-slide-in__card-body_badge' ] ) ?>
			<h2 class="notification-slide-in__card-body_title">
				<?= fp_noesc( $slide_in_title ); ?>
			</h2>
			<p class="notification-slide-in__card-body_text">
				<?= fp_noesc( $text ); ?>
			</p>
			<?php if ( isset( $cta_title ) ) : ?>
				<a href="<?= esc_attr( $cta_url ) ?>" class="notification-slide-in__card-body_btn" target="<?= esc_attr( $cta_target ); ?>">
					<?= fp_noesc( $cta_title ); ?>
				</a>
			<?php endif; ?>
		</div>

		<!-- Close -->
		<button type="button" class="notification-slide-in__card_dismiss fp-dma-dismiss" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
</div>
