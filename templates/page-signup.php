<?php
/**
 * Template Name: Signup Page
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-signup' );
get_header( '', [ 'no-header' => true ] );

// Direct Buy.
$campaign = fp_init_campaign();

if ( $campaign ) {
	$include_sign_up_banner = $campaign['include_sign_up_banner'];
}
?>

<style>
	html {
		margin: 0 !important;
	}

	body {
		background-color: #0d83dd !important;
	}
</style>

<div class="container-fluid signup-page p-0 px-lg-4 d-flex align-items-center justify-content-center">
	<div class="row">
		<div class="col-12 col-lg-6 signup-page__row signup-page__row_right">
			<?php require_once get_template_directory() . '/partials/common/signup/signup-page-form.php'; ?>
		</div>
		<div class="col-lg-6 signup-page__row signup-page__row_left pl-lg-5 pr-lg-7 pt-4 pb-5 signup-page__content-wrapper d-flex flex-column justify-content-lg-center <?= ! empty( $include_sign_up_banner ) ? 'has-banner' : ''; ?> ">
			<div class="signup-page__content position-relative pt-lg-0 d-flex flex-column align-items-center align-items-lg-start">
				<span id="content-expander" class="signup-page__content-expander d-lg-none"><?= esc_html( __( 'Why FreshBooks?', 'freshpress-website' ) ); ?></span>
				<?php get_template_part( 'partials/content' ); ?>
				<span id="content-button" class="signup-page__content-button btn btn-outline-grey d-inline-block mx-auto mt-4 mb-2 d-lg-none text-white px-5 py-1"><?= esc_html( __( 'Ok, Got it', 'freshpress-website' ) ); ?></span>
			</div>
		</div>
	</div>
</div>

<?php
get_footer( '', [ 'no-footer' => true ] );
