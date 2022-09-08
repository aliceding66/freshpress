<?php
/**
 * Informational Banner template.
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-common-banner-informational' );

if ( ! isset( $informational_banner_data ) || ( empty( $informational_banner_data['desktop_content'] ) && empty( $informational_banner_data['mobile'] ) ) ) {
	return;
}

$mobile = $informational_banner_data['mobile'];
$content_desktop = $informational_banner_data['content_desktop'];
?>

<div class="banner-informational" role="alert">
	<span class="banner-informational__content-desktop">
		<?= fp_noesc( $content_desktop ) ?>
	</span>
	<?php if ( ! empty( $mobile['url'] ) ) { ?>
		<a href="<?= esc_url( $mobile['url'] ) ?>" class="banner-informational_mobile-clickable"></a>
	<?php } ?>
	<span class="banner-informational__content-mobile">
		<?= fp_noesc( $mobile['content'] ) ?>
	</span>
</div>
