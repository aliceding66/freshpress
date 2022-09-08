<?php
/**
 * Cookies Acceptance Modal.
 *
 * @package FreshPress\Website
 */

?>

<div
	id="modal-cookies"
	class="modal modal-cookies fade my-0"
	tabindex="-1"
	role="dialog"
	aria-hidden="true"
>
	<div class="modal__dialog modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal__content modal-content text-center">
			<div class="modal__header modal-header">
				<span class="modal-title w-100 h2"><?= esc_html( _x( 'Optional cookies and other technologies', 'Cookies acceptance modal', 'freshpress-website' ) ); ?></span>
			</div>
			<div class="modal__body modal-body mx-auto py-5 px-2 px-md-5">
				<p><?= esc_html( _x( 'We use analytics cookies to ensure you get the best experience on our website. You can decline analytics cookies and navigate our website, however cookies must be consented to and enabled prior to using the FreshBooks platform. To learn about how we use your data, please Read our Privacy Policy. Necessary cookies will remain enabled to provide core functionality such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.', 'Cookies acceptance modal', 'freshpress-website' ) ); ?></p>
				<p><?= fp_noesc( _x( 'To learn more about how we use your data, please read our <a href="/policies/privacy">Privacy Statement</a>.', 'Cookies acceptance modal', 'freshpress-website' ) ); ?></p>
				<button type="button" data-dismiss="modal" class="js-cookies-accept btn btn-cta-green w-50"><?= esc_html( _x( 'I Accept', 'Cookies acceptance modal', 'freshpress-website' ) ); ?></button>
				<a class="js-cookies-decline d-block mt-3" data-dismiss="modal" aria-label="Close"><?= esc_html( _x( 'No, Thank You', 'Cookies acceptance modal', 'freshpress-website' ) ); ?></a>
			</div>
		</div>
	</div>
</div>
