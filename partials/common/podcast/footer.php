<?php
/**
 * Podcast footer.
 *
 * @package FreshPress\Website
 */

if ( ! isset( $global_podcast ) ) {
	$global_podcast = [];
}
if ( ! isset( $signup_form ) ) {
	$signup_form = [];
}

$has_offer_details = ! empty( $global_podcast['footer_hero']['offer_details'] );

?>

<section class="footer-hero px-3 px-md-5 py-5 row">
	<div class="mw-450 text-center text-lg-left ml-auto ml-lg-0 ml-xl-5">
		<h2 class="text-white mb-0"><?= fp_noesc( $global_podcast['footer_hero']['heading'] ); ?></h2>
		<span class="offer-details-container d-inline-block mt-2 pb-3 position-relative see-offer">
			<span class="d-inline-block text-white <?= $has_offer_details ?: 'text-decoration-none' ?>"><?= esc_html( __( 'Try it free for 30 days. No credit card required.', 'freshpress-website' ) ); ?></span>
			<?php if ( $has_offer_details ) : ?>
				<div class="offer-details position-absolute text-left">
					<h3><?= esc_html( __( 'Offer Terms', 'freshpress-website' ) ); ?></h3>
					<?= fp_noesc( $global_podcast['footer_hero']['offer_details'] ); ?>
				</div>
			<?php endif; ?>
		</span>
		<form method="post" class="needs-validation with-arrows pr-0 pr-lg-5" data-form-handler="handleSignup"
			  data-action="https://<?= esc_attr( fp_get_fb_domain( 'api' ) ) ?>/auth/api/v1/smux/registrations" novalidate>
			<div class="form-group position-relative bg-white rounded">
				<label class="sr-only"
					   for="footer-hero-form-email"><?= esc_html( $signup_form['email_placeholder_text'] ); ?></label>
				<input
						required
						type="email"
						name="email"
						class="form-control shadow-none"
						id="footer-hero-form-email"
						placeholder="<?= esc_attr( $signup_form['email_placeholder_text'] ); ?>"
				/>
				<div class="invalid-tooltip py-2 px-3">
					<?= esc_html( __( 'Email is invalid.', 'freshpress-website' ) ); ?>
				</div>
			</div>
			<div class="form-group position-relative bg-white rounded">
				<label class="sr-only"
					   for="footer-hero-form-password"><?= esc_html( $signup_form['password_placeholder_text'] ); ?></label>
				<input
						required
						minlength="8"
						type="password"
						name="password"
						class="form-control shadow-none"
						id="footer-hero-form-password"
						placeholder="<?= esc_attr( $signup_form['password_placeholder_text'] ); ?>"
				/>
				<div class="invalid-tooltip py-2 px-3">
					<?= esc_html( __( 'Password is invalid.', 'freshpress-website' ) ); ?>
				</div>
			</div>
			<div class="form-group">
				<button type="submit" name="submit"
						class="btn btn-cta-green btn-block btn-lg font-weight-medium"><?= esc_html( $signup_form['submit_button_text'] ); ?></button>
			</div>
			<div class="text-center position-relative" style="color: #fff;">
				<label class="font-size-smaller terms" for="tos-accepted">
					<input
							required
							type="checkbox"
							id="tos-accepted"
							name="tos-accepted"
							class="float-left mt-1"
					/>
					<?= fp_noesc( FP_Site_Options::get_option( 'default_terms_of_service' ) ); ?>
				</label>
			</div>
		</form>
	</div>
</section>
<section class="footer-contact row flex-column align-items-center text-center px-3 px-md-5 py-5"
		 style="background-color: #0d83dd;">
	<h2 class="text-white mt-4"><?= esc_html( $global_podcast['contact_footer']['heading'] ); ?></h2>
	<p class="text-white mw-680 px-0 px-md-3"><?= fp_noesc( $global_podcast['contact_footer']['text'] ); ?></p>
	<?php if ( ! empty( $global_podcast['contact_footer']['cta'] ) ) : ?>
		<a class="btn btn-cta-green px-4 py-2 mb-5"
		   href="<?= esc_url( $global_podcast['contact_footer']['cta']['url'] ); ?>">
			<?= esc_html( $global_podcast['contact_footer']['cta']['title'] ); ?>
		</a>
	<?php endif; ?>
</section>
