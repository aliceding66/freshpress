<?php
/**
 * Footer Bottom Partial.
 *
 * @package FreshPress\Website
 */

$phone_number_displayed = FP_Site_Options::get_option( 'fb_phone_number' );
$phone_number_href = preg_replace( '/[^0-9+]/', '', $phone_number_displayed );

?>

<div class="footer__bottom py-5 py-lg-4 my-2 mx-auto">

	<div class="country-selector d-flex justify-content-center justify-content-lg-start">
		<?php require_once get_template_directory() . '/partials/common/footer/region-selection-footer.php'; ?>
	</div>
	<!-- /.country-selector -->

	<div class="links d-inline-block">

		<div class="social-stores-container d-flex flex-column flex-lg-row">

			<div class="app-stores d-flex justify-content-center">
				<a class="app-stores__link mr-2" rel="noopener noreferrer" target="_blank" href="https://itunes.apple.com/app/apple-store/id1052884030?pt=63077">
					<?= fp_render_img(
						'images/footer/app-stores/app-store-' . fp_get_current_language() . '.svg',
						[
							'class' => 'app-stores__link-image',
							'alt'   => esc_html_x(
								'App Store',
								'Footer Links',
								'freshpress-website'
							),
							'_lazy' => true,
						]
					) ?>
				</a>
				<a class="app-stores__link ml-2" rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.freshbooks.andromeda">
					<?= fp_render_img(
						'images/footer/app-stores/google-play-' . fp_get_current_language() . '.svg',
						[
							'class' => 'app-stores__link-image',
							'alt'   => esc_html_x(
								'Google Play',
								'Footer Links',
								'freshpress-website'
							),
							'_lazy' => true,
						]
					) ?>
				</a>
			</div>
			<!-- /.app-stores -->

			<div class="social-media d-flex justify-content-center">
				<a class="social-media__link d-block mr-1" rel="noopener noreferrer" href="https://twitter.com/freshbooks" target="_blank">
					<?= fp_render_img(
						'images/footer/icon-twitter.svg',
						[
							'class' => 'social-media__link-image',
							'alt'   => esc_html_x( 'Twitter', 'Footer Links', 'freshpress-website' ),
							'_lazy' => true,
						]
					) ?>
				</a>

				<a class="social-media__link d-block ml-1 mr-1" rel="noopener noreferrer" href="https://www.facebook.com/FreshBooks" target="_blank">
					<?= fp_render_img(
						'images/footer/icon-fb.svg',
						[
							'class' => 'social-media__link-image',
							'alt'   => esc_html_x( 'Facebook', 'Footer Links', 'freshpress-website' ),
							'_lazy' => true,
						]
					) ?>
				</a>

				<a class="social-media__link d-block ml-1 mr-1" rel="noopener noreferrer" href="https://www.youtube.com/user/freshbooks" target="_blank">
					<?= fp_render_img(
						'images/footer/icon-yt.svg',
						[
							'class' => 'social-media__link-image',
							'alt'   => esc_html_x( 'YouTube', 'Footer Links', 'freshpress-website' ),
							'_lazy' => true,
						]
					) ?>
				</a>

				<a class="social-media__link d-block ml-1" rel="noopener noreferrer" href="https://www.instagram.com/freshbooks/" target="_blank">
					<?= fp_render_img(
						'images/footer/icon-ig.svg',
						[
							'class' => 'social-media__link-image',
							'alt'   => esc_html_x( 'Instagram', 'Footer Links', 'freshpress-website' ),
							'_lazy' => true,
						]
					) ?>
				</a>
			</div>
			<!-- /.social-media -->

		</div>
		<!-- /.social-stores-container -->


	</div>
	<!-- /.footer-links -->

	<div class="info d-flex flex-column flex-md-row justify-content-center justify-content-lg-end mb-3 mb-lg-0">
		<span class="info-text d-inline-block text-center"><?= FP_Site_Options::get_option( 'footer_copyright' ) ?></span>
		<?php if ( $phone_number_displayed && $phone_number_href ) : ?>
			<span class="info-text info-divider mx-2 d-none d-md-inline-block">|</span>
			<span class="info-text d-inline-block text-center"><?= esc_html__( 'Call Toll Free: ', 'freshpress-website' ) ?><a href="tel:<?= esc_attr( $phone_number_href ) ?>"><?= esc_html( $phone_number_displayed ) ?></a></span>
		<?php endif ?>
	</div>
	<!-- /.info -->

	<a class="footer__logo justify-content-center d-flex d-lg-none" href="<?= esc_url( fp_add_remove_trailing_slash( home_url() ) ); ?>">
		<?= fp_render_img(
			'images/logos/freshbooks-logo.svg',
			[
				'class' => 'footer__logo-image',
				'alt'   => 'Freshbooks Logo',
			]
		) ?>
	</a>
</div>
