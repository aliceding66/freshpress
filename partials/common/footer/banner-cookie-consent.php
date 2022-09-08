<?php
/**
 * Cookie Consent Banner template
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-banner-cookie-consent' );
?>

<div class="banner-cookie-consent alert alert-fresh-blue px-3 d-none" role="alert">
	<div class="content d-flex flex-row flex-wrap flex-md-nowrap justify-content-center align-items-center">
		<p class="text-left flex-fill">
			<?php
				$cookie_link = fp_sprintf(
					'<a href="%1$s">%2$s </a>',
					[
						'fr-fr' === fp_get_current_language() ? '/fr-fr/policies-privacy' : '/policies/privacy',
						__( 'cookies information', 'freshpress-website' ),
					]
				);
				echo fp_sprintf(
					/* translators: %1$s is replaced with cookie link string */
					__(
						'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. Review our %1$s
		for more details.',
						'freshpress-website'
					),
					[ $cookie_link ]
				);
				?>
		</p>
		<div class="buttons d-flex flex-fill justify-content-between">
			<button type="button" class="btn btn-cta-green js-cookies-accept">
				<?= esc_html( __( 'Agree', 'freshpress-website' ) ); ?>
			</button>
			<button type="button" class="btn btn-outline-light js-cookies-decline">
				<?= esc_html( __( 'Disagree', 'freshpress-website' ) ); ?>
			</button>
		</div>
	</div>
</div>
