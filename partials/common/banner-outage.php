<?php
/**
 * Outage Banner template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-banner-outage' );
if ( ! empty( $outage_banner_data ) && ! empty( $outage_banner_data['desktop_content'] ) && ! empty( $outage_banner_data['mobile_content'] ) && ! empty( $outage_banner_data['button_text'] ) ) :
	?>

<div class="banner-outage" role="alert">
	<p class="banner-outage__content-mobile"><?= esc_html( $outage_banner_data['mobile_content'] ) ?></p>
	<p class="banner-outage__content-desktop"><?= esc_html( $outage_banner_data['desktop_content'] ) ?></p>
	<button type="button" class="dismiss-outage-banner" data-dismiss="alert" aria-label="close">
		<span><?= esc_html( $outage_banner_data['button_text'] ) ?></span>
	</button>
</div>

	<?php
endif;
?>
