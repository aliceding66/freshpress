<?php
/**
 * Region Selection (Header) template
 *
 * @package FreshPress\Website
 */

$class_name = 'region-selection-header';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
	$class_name .= ' align' . $block['align'];
}

// Get region options and settings.
$all_regions = fp_get_all_regions();
$hide_country_selection_banner = fp_is_country_banner_hidden();
?>

<?php if ( ! empty( $all_regions ) && ! $hide_country_selection_banner ) { ?>
	<div id="region-selection-header" class="<?= esc_attr( $class_name ) ?> d-none">
		<div class="region-selection-header__content">

			<!-- Label -->
			<div class="region-selection-header__copy">
				<?php
					$current_country = fp_parse_language_code( fp_get_current_language() )['country'];
					$span = '<span class="fi fi-' . $current_country . '"></span>';
					echo fp_sprintf(
						/* translators: Regionalised Banner Text */
						__( 'You\'re currently on our %1$s%2$s site%3$s. Select your regional site here:', 'freshpress-website' ),
						[
							'<strong>',
							strtoupper( $current_country ),
							'</strong>',
						]
					)
				?>
			</div>

			<!-- Select -->
			<div class="region-selection-header__inputs">
				<div class="region-selection-header__select">
					<label for="form-control" class="d-none">Select your region</label>
					<select id="form-control" class="form-control">
						<option disabled selected><?= esc_html_x( 'Select your region', 'region selection banner', 'freshpress-website' ); ?></option>
						<?php foreach ( $all_regions as $country_code => $languages ) { ?>
							<?php foreach ( $languages as $lang ) { ?>
								<?php
									$option_name = count( $languages ) > 1 ? $lang['fullName'] : $lang['countryName'];
								?>
								<option value="<?= esc_attr( $lang['fullCode'] ) ?>"><?= esc_html( $option_name ) ?></option>
							<?php } ?>
						<?php } ?>
					</select>
				</div>
			</div>

			<!-- Close -->
			<a type="button" class="close region-selection-header__close btn-close" tabindex="0" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</a>

		</div>
	</div>
<?php } ?>
