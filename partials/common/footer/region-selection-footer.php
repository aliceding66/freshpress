<?php
/**
 * Region Selection template.
 *
 * @package FreshPress\Website
 */

$class_name = 'region-selection-footer';

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
	$class_name .= ' align' . $block['align'];
}

// Get regional settings and options.
$all_regions = fp_get_all_regions();
$hide_country_selection_banner = fp_is_country_banner_hidden();
?>

<?php if ( ! empty( $all_regions ) && ! $hide_country_selection_banner ) { ?>
	<?php
		$current_region_lang = fp_parse_language_code( fp_get_current_language() );
		$current_region = $all_regions[ $current_region_lang['country'] ][ $current_region_lang['lang'] ];
	?>

	<div id="region-selection-footer" class="region-selection-footer <?= esc_attr( $class_name ) ?> region-<?= esc_attr( strtolower( $current_region_lang['country'] ) ) ?>">
		<div class="region-selection-footer__input region-select <?= esc_attr( $class_name ) ?>">
			<span class="fi fi-<?= esc_attr( $current_region['countryCode'] ) ?>"></span>
			<div class="selector">
				<?= esc_html( $current_region['countryName'] ) ?>
			</div>
		</div>
		<div class="region-selection-footer__modal modal__region d-none">
			<?php foreach ( $all_regions as $country_code => $languages ) { ?>
				<?php
					$default = reset( $languages ); // Gets the first element from an assoc array.
					$multilingual = count( $languages ) > 1 ? 'multilingual' : '';
				?>
				<a href="<?= esc_url( $default['url'] ) ?>" class="region <?= esc_attr( $multilingual ) ?>" data-country-code="<?= esc_attr( $country_code ) ?>" data-country-name="<?= esc_attr( $default['countryName'] ) ?>">
					<span class="fi fi-<?= esc_attr( strtolower( $country_code ) ) ?>"></span>
					<?= esc_html( $default['countryName'] ) ?>
				</a>
			<?php } ?>
		</div>
		<div class="region-selection-footer__input language-select <?= count( $all_regions[ $current_region_lang['country'] ] ) === 1 ? 'd-none' : '' ?>">
			<div class="selector">
				<?= esc_html( $current_region['langName'] ) ?>
			</div>
		</div>
		<div class="region-selection-footer__modal modal__language d-none">
			<?php foreach ( $all_regions as $country_code => $languages ) { ?>
				<?php foreach ( $languages as $lang ) { ?>
					<a href="<?= esc_url( $lang['url'] ) ?>" class="language <?= esc_attr( $country_code ) ?> <?= $country_code !== $current_region['countryCode'] ? 'd-none' : '' ?>">
						<?= esc_html( $lang['langName'] ) ?>
					</a>
				<?php } ?>
			<?php } ?>
		</div>
	</div>

<?php } ?>
