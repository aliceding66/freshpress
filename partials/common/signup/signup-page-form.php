<?php
/**
 * Sign up form template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-signup-page-form' );

// Direct Buy.
$campaign = fp_init_campaign();

if ( $campaign ) {
	$mobile_content = $campaign['sign_up_mobile_content'];
	$desktop_content = $campaign['sign_up_desktop_content'];
	$campaign_end_date = $campaign['end_date'];
	if ( isset( $campaign['sign_up_cta'] ) && ( '' !== $campaign['sign_up_cta'] ) ) {
		$cta_title = $campaign['sign_up_cta']['title'];
		$cta_url = $campaign['sign_up_cta']['url'];
		$cta_target = ( ! empty( $campaign['sign_up_cta']['target'] ) ) ? $campaign['sign_up_cta']['target'] : '_self';
	}
	$include_sign_up_banner = $campaign['include_sign_up_banner'];
}

require_once get_stylesheet_directory() . '/includes/popups/cookies-popup.php';
?>

<div
	class="sign-up my-2 my-xxl-4 py-0 px-3 d-flex flex-column align-items-center justify-content-start justify-content-lg-center row <?= ! empty( $include_sign_up_banner ) ? 'pt-promo' : '' ?>"
	<?= ! empty( $include_sign_up_banner ) ? "data-promo='false'" : '' ?>
	<?= ! empty( $include_sign_up_banner ) && ! empty( $campaign_end_date ) ? fp_noesc( "data-promo-end=\"$campaign_end_date\"" ) : '' ?>
>
	<div class="sign-up__wrapper d-flex flex-column align-items-center text-center w-100 position-relative <?= $include_sign_up_banner ? 'pt-promo' : '' ?>">

		<?php if ( ! empty( $include_sign_up_banner ) && ! empty( $mobile_content ) ) : ?>
			<div class="sign-up__promo-banner_mobile w-100 position-absolute justify-content-center align-content-center mx-auto d-flex d-lg-none">
				<h3 class="sign-up__promo-banner_mobile-header text-left align-self-center mb-0 mr-2">
					<?= esc_html( $mobile_content ); ?>
				</h3>
				<?php if ( isset( $cta_title ) ) : ?>
					<a class="sign-up__promo-banner_mobile-cta btn btn-cta-green ml-2" href="<?= esc_url( $cta_url ); ?>" target="<?= esc_attr( $cta_target ); ?>">
						<?= esc_html( $cta_title ); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $include_sign_up_banner ) && ! empty( $desktop_content ) ) : ?>
			<div class="sign-up__promo-banner_desktop w-100 justify-content-around align-content-center position-absolute d-none d-lg-flex">
				<h3 class="sign-up__promo-banner_desktop-header text-left align-self-center mb-0">
					<?= esc_html( $desktop_content ); ?>
				</h3>
				<?php if ( isset( $cta_title ) ) : ?>
					<a class="sign-up__promo-banner_desktop-cta btn btn-cta-green" href="<?= esc_url( $cta_url ); ?>" target="<?= esc_attr( $cta_target ); ?>">
						<?= esc_html( $cta_title ); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?= fp_render_img(
			'images/logos/freshbooks-logo.svg',
			[
				'class' => 'sign-up__logo-image mb-4',
				'alt'   => __(
					'Freshbooks Logo',
					'freshpress-website'
				),
			]
		) ?>
		<h1 class="sign-up__heading"><?= esc_html( __( 'Try FreshBooks Free', 'freshpress-website' ) ); ?></h1>

		<div class="d-none d-lg-block"><?= fp_noesc(
			fp_render_blocks(
				[
					'name'  => 'rating',
					'attrs' => [
						'rating_wrap'  => '1',
						'rating_image' => 'white_yellow',
					],
				]
			)
		) ?></div>
		<div class="d-block d-lg-none d-editor-none"><?= fp_noesc(
			fp_render_blocks(
				[
					'name'  => 'rating',
					'attrs' => [
						'className'    => 'my-0',
						'rating_image' => 'white_yellow',
						'rating_wrap'  => '2',
					],
				]
			)
		) ?></div>

		<form method="post" class="sign-up__form w-100 needs-validation with-arrows" data-form-handler="handleSignup" data-action="https://<?= esc_attr( fp_get_fb_domain( 'api' ) ) ?>/auth/api/v1/smux/registrations" novalidate>

			<!-- Email -->
			<div class="form-group sign-up__form-group sign-up__form-email mb-md-2 position-relative">
				<input
					required
					name="email"
					type="email"
					class="form-control shadow-none"
					id="email"
					placeholder="<?= esc_attr( __( 'Email', 'freshpress-website' ) ); ?>"
					aria-label="<?= esc_attr( __( 'Email', 'freshpress-website' ) ); ?>"
				/>
				<div class="invalid-tooltip py-2 px-3">
					<?= esc_html( __( 'Email is invalid.', 'freshpress-website' ) ); ?>
				</div>
			</div>

			<!-- Password -->
			<div class="form-group sign-up__form-group sign-up__form-password mb-md-2 position-relative">
				<input
					required
					minlength="8"
					name="password"
					type="password"
					class="form-control shadow-none"
					id="password"
					placeholder="<?= esc_attr( __( 'Password (min. 8 characters)', 'freshpress-website' ) ); ?>"
					aria-label="<?= esc_attr( __( 'Password (min. 8 characters)', 'freshpress-website' ) ); ?>"
				/>
				<div class="invalid-tooltip py-2 px-3">
					<?= esc_html( __( 'Password is invalid.', 'freshpress-website' ) ); ?>
				</div>
			</div>

			<!-- Submit -->
			<div class="form-group sign-up__form-group sign-up__form-btn mt-4 mt-md-2 mb-2 position-relative">
				<button type="submit" name="submit" class="btn btn-cta-green btn-block btn-lg sign-up__submit text-uppercase"><?= esc_html( __( 'Try It Free', 'freshpress-website' ) ); ?></button>
				<?= fp_render_img( 'images/signup/arrow-yellow.svg', [ 'class' => 'position-absolute d-none d-lg-block signup-page__submit-arrow' ] ) ?>
			</div>

			<div class="sign-up__divider position-relative w-100 my-4"><?= esc_html( __( 'OR', 'freshpress-website' ) ); ?></div>

			<!-- Apple SSO -->
			<div class="sign-up__sso d-flex mb-4 flex-column flex-lg-row">
				<a
					href="#"
					data-href="https://<?= fp_noesc( fp_get_fb_domain( 'auth' ) ) ?>/service/auth/auth/apple?intent=sign_up"
					class="sso-signup_apple btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center mb-2 mb-lg-0"
				>
					<?= fp_render_img(
						'images/logos/apple-logo.svg',
						[
							'class' => 'position-absolute',
							'alt'   => __(
								'Apple Logo',
								'freshpress-website'
							),
						]
					) ?><?= esc_html( __( 'Sign up with Apple', 'freshpress-website' ) ); ?>
				</a>

				<!-- Google SSO -->
				<a
					href="#"
					data-href="https://<?= fp_noesc( fp_get_fb_domain( 'auth' ) ) ?>/service/auth/auth/google_oauth2_central_sso?intent=sign_up"
					class="sso-signup_google btn btn-outline-grey bg-white sign-up__ghost-btn d-flex align-items-center position-relative justify-content-center"
				>
					<?= fp_render_img(
						'images/logos/google-logo-icon.svg',
						[
							'class' => 'position-absolute',
							'alt'   => __(
								'Google Logo',
								'freshpress-website'
							),
						]
					) ?><?= esc_html( __( 'Sign up with Google', 'freshpress-website' ) ); ?>
				</a>
			</div>

			<!-- Terms of Service -->
			<div class="sign-up__policy-privacy d-flex align-items-start justify-content-center position-relative mb-2 pt-1 pb-1 mt-4">
				<input
					required
					type="checkbox"
					id="tos-accepted"
					name="tos-accepted"
					class="form-control-checkbox float-left"
				/>
				<label for="tos-accepted">
					<?php /* translators: %1$s: ToS URL, %2$s: Privacy Policy URL */ ?>
					<?= fp_noesc( sprintf( __( 'I confirm that I have read and agree to FreshBooks <a href="%1$s">Terms of Service</a> and <a href="%2$s">Privacy Policy</a>.', 'freshpress-website' ), home_url( '/policies/terms-of-service' ), home_url( '/policies/privacy' ) ) ); ?>
				</label>
				<div class="invalid-tooltip invalid-checkbox-tooltip py-2 px-3">
					<?= esc_html( __( 'This field is required.', 'freshpress-website' ) ); ?>
				</div>
			</div>
		</form>
		<div class="sign-up__already-registered"><?= fp_noesc( __( 'Already have an account? <a class="signup-link" href="https://my.freshbooks.com/#/login">Log In</a>', 'freshpress-website' ) ); ?></div>
	</div>
	<span class="sign-up__security text-center mt-3">
		<a href="<?= esc_url( _x( 'https://www.freshbooks.com/policies/security-safeguards', 'Security Safeguards URL', 'freshpress-website' ) ); ?>" class="sign-up__security-link d-inline-block" target="_blank">
			<?= fp_render_img( 'images/icons/lock.svg', [ 'alt' => 'Lock icon' ] ) ?><?= esc_html( __( 'Security Safeguards', 'freshpress-website' ) ); ?>
		</a>
	</span>
</div>
