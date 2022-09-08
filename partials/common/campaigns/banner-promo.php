<?php
/**
 * Direct Buy Banner partial template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-header-banner-promo' );

$campaign = fp_init_campaign();
$content_desktop = $campaign['promo_banner_desktop_content'];
$content_mobile = $campaign['promo_banner_mobile_content'];
$content_desktop_countdown = $campaign['promo_banner_desktop_content_countdown'];
$optimizely_content = $campaign['promo_banner_optimizely'];

$inline_colour_style = ! empty( $campaign['promo_banner_text_colour'] ) ? 'style="color: ' . esc_attr( $campaign['promo_banner_text_colour'] ) . ';"' : '';
$inline_background_style = ! empty( $campaign['promo_banner_background_colour'] ) ? 'style="background-color: ' . esc_attr( $campaign['promo_banner_background_colour'] ) . ';"' : '';

$cta = $campaign['promo_banner_cta'];
$class_name = 'slide-in';

if ( isset( $_COOKIE['smux_login'] ) ) {
	$class_name = 'd-none';
}
?>

<?php if ( $content_desktop && $content_mobile ) : ?>
	<div
		class="banner-promo <?= esc_attr( $class_name ) ?>"
		role="alert"
		data-has-countdown="false"
		<?= fp_noesc( $inline_background_style ); ?>
	>
		<span class="banner-promo__content-desktop d-none d-md-block" <?= fp_noesc( $inline_colour_style ); ?>>
			<span class="non-countdown">
				<?= fp_noesc( $content_desktop ); ?>
			</span>
			<span class="for-countdown">
				<?php
					$countdown_text = str_replace( '<replace-data>optimizely</replace-data>', $optimizely_content, $content_desktop_countdown );
					$countdown_text = str_replace(
						'<replace-data>countdown</replace-data>',
						fp_render_blocks(
							[
								'name' => 'countdown-timer',
							]
						),
						$countdown_text
					);
					echo fp_noesc( $countdown_text );
				?>
				<?php if ( ! empty( $cta['url'] ) && ! empty( $cta['title'] ) ) : ?>
					<a href="<?= esc_url( $cta['url'] ); ?>" target="<?= esc_attr( $cta['target'] ?? '_self' ); ?>"><?= esc_html( $cta['title'] ); ?></a>
				<?php endif; ?>
			</span>
		</span>
		<span class="banner-promo__content-mobile d-md-none" <?= fp_noesc( $inline_colour_style ); ?>>
			<?= fp_noesc( $content_mobile ); ?>
		</span>
	</div>
<?php endif; ?>
