<?php
/**
 * App Smart Banner template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-app-smart-banner' );
?>
<div class="app-smart-banner app-smart-banner_android position-relative w-100 overflow-hidden my-0">
	<div class="app-smart-banner__container">
		<a href="#" class="app-smart-banner__close d-block position-absolute text-center">&times;</a>
		<span class="app-smart-banner__app-icon position-absolute d-flex align-content-center justify-content-center">
			<?= fp_render_img(
				'images/icons/icon-freshbooks-mobile-app.svg',
				[
					'class' => 'align-self-center skip-lazy',
					'alt'   => __(
						'FreshBooks App Logo',
						'freshpress-website'
					),
				]
			) ?>
		</span>
		<div class="app-smart-banner__app-info position-absolute">
			<div class="app-smart-banner__app-title"><?= esc_attr( __( 'FreshBooks', 'freshpress-website' ) ); ?></div>
			<div><?= esc_html( __( 'Official App', 'freshpress-website' ) ); ?></div>
			<span><?= esc_html( __( 'Free - Google Play', 'freshpress-website' ) ); ?></span>
		</div>
		<a href="<?= esc_url( __( 'https://play.google.com/store/apps/details?id=com.freshbooks.andromeda&utm_source=', 'freshpress-website' ) ); ?>" class="app-smart-banner__button position-absolute text-center">
			<span class="app-smart-banner__button-text d-block text-center px-1"><?= esc_html( __( 'Get it', 'freshpress-website' ) ); ?></span>
		</a>
	</div>
</div>
