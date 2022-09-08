<?php
/**
 * Helper functions for i18n.
 *
 * @package FreshPress\Website
 */

/**
 * Return array of unique regions in the current language and their associated region-language codes.
 *
 * Options:
 *   include_hidden boolean Should hidden languages be included?
 *   wpml_format    boolean Should the returned values preserve WPML array structure?
 *
 * @param  array $options Custom options - all default to false.
 * @return array
 */
function fp_get_all_regions( $options = [] ) {
	$regions = [];

	if ( function_exists( 'wpml_get_active_languages_filter' ) ) {
		$all_languages = wpml_get_active_languages_filter(
			null,
			[
				'skip_missing' => 0, // Setting to 0 links to regional homepage if no translation exists.
				'orderby'      => 'name', // Order by region name.
				'order'        => 'asc', // Order ascending.
			]
		);

		// If we want to include hidden languages, add them.
		if ( ! empty( $options['include_hidden'] ) ) {
			$all_languages = array_merge( $all_languages, apply_filters( 'wpml_setting', [], 'hidden_languages' ) );
		}
	}

	if ( ! empty( $all_languages ) ) {
		// Some pages will have redirects to the legacy site.
		$custom_translations = get_field( 'custom_language_translation', get_the_ID() );

		foreach ( $all_languages as $lang ) {
			if ( is_array( $custom_translations ) ) {
				foreach ( $custom_translations as $custom_translation ) {
					// If the custom translation matches the region, we use it instead.
					if ( $custom_translation['custom_language_translation_region'] === $lang['code'] && fp_get_current_language() !== $lang['code'] ) {
						if ( fp_starts_with( $custom_translation['custom_language_translation_path'], 'https://' ) ) {
							// If the link is a literal URL, use as it is.
							$lang['url'] = $custom_translation['custom_language_translation_path'];
						} elseif ( fp_starts_with( $custom_translation['custom_language_translation_path'], "/{$custom_translation['custom_language_translation_region']}" ) ) {
							// If the link is prefixed with a region code, use as an absolute link.
							$lang['url'] = site_url( $custom_translation['custom_language_translation_path'] );
						} else {
							// Otherwise, construct a link using the appropriate functions and filters.
							$lang['url'] = apply_filters( 'wpml_permalink', home_url( $custom_translation['custom_language_translation_path'] ), $custom_translation['custom_language_translation_region'] );
						}
						$lang['active'] = true;
						$lang['missing'] = false;
						break; // If we have multiple entries for a region, take the first one only.
					}
				}
			}

			if ( wp_parse_url( $lang['url'], PHP_URL_PATH ) === '/' . $lang['language_code'] ) {
				$lang['url'] = trailingslashit( $lang['url'] );
			}

			// If we want the original WPML format, set that, otherwise use our custom format.
			if ( ! empty( $options['wpml_format'] ) ) {
				$regions[ $lang['language_code'] ] = $lang;
			} else {
				$split_lang_code = fp_parse_language_code( $lang['language_code'] );
				$split_lang_name = fp_parse_language_name( $lang['native_name'] );

				if ( ! empty( $split_lang_code['country'] ) && ! empty( $split_lang_name['country'] ) ) {
					if ( ! isset( $regions[ $split_lang_code['country'] ] ) ) {
						$regions[ $split_lang_code['country'] ] = [];
					}

					$regions[ $split_lang_code['country'] ][ $split_lang_code['lang'] ] = [
						'active'      => $lang['active'],
						'langCode'    => $split_lang_code['lang'],
						'langName'    => $split_lang_name['lang'],
						'countryCode' => $split_lang_code['country'],
						'countryName' => $split_lang_name['country'],
						'fullName'    => $lang['native_name'],
						'transName'   => $lang['translated_name'],
						'fullCode'    => $lang['language_code'],
						'locale'      => $lang['default_locale'],
						'url'         => $lang['url'],
						'sitePaths'   => [
							'home'    => trailingslashit( wp_parse_url( apply_filters( 'wpml_permalink', site_url( '/', 'https' ), $lang['language_code'] ), PHP_URL_PATH ) ),
							'signup'  => wp_parse_url( apply_filters( 'wpml_permalink', site_url( '/signup', 'https' ), $lang['language_code'] ), PHP_URL_PATH ),
							'pricing' => wp_parse_url( apply_filters( 'wpml_permalink', site_url( '/pricing', 'https' ), $lang['language_code'] ), PHP_URL_PATH ),
						],
					];
				}
			}
		}
	}

	return $regions;
}

/**
 * Get the code of the current active language
 */
function fp_get_current_language() {
	return apply_filters( 'wpml_current_language', null ) ?? fp_get_default_region();
}

/**
 * Split language name into parts from "Country (Language)" format
 *
 * @param  string $lang_name Region language string (ex. "Canada (French)").
 * @return array
 */
function fp_parse_language_name( $lang_name ) {
	$output = [];

	if ( preg_match( '/(?P<country>[\p{L}a-z -]+) \((?P<lang>[\p{L}a-z -]+)\)/iu', $lang_name, $matches ) ) {
		$output['country'] = $matches['country'];
		$output['lang'] = $matches['lang'];
	} else {
		$output['lang'] = $lang_name;
	}

	return $output;
}

/**
 * Split language code into parts from "language-COUNTRY" format
 *
 * @param  string $lang_code String of two character langauge and region (ex "en-CA").
 * @return array
 */
function fp_parse_language_code( $lang_code ) {
	$output = [];

	if ( strpos( $lang_code, '-' ) !== false ) {
		list($output['lang'], $output['country']) = explode( '-', $lang_code );
	} else {
		$output['lang'] = $lang_code;
	}

	return $output;
}

/**
 * Should the country selection banner be hidden
 *
 * @return boolean
 */
function fp_is_country_banner_hidden() {
	global $hide_country_selection_banner;

	return isset( $hide_country_selection_banner ) && true === $hide_country_selection_banner;
}

/**
 * Get the site default region.
 *
 * @return string
 */
function fp_get_default_region() {
	return 'en-us';
}

/**
 * Override html language attribute.
 *
 * @param string $lang Lang attribute.
 */
function fp_override_lang_attribute( $lang ) {
	if ( 'lang="en-eu"' === $lang ) {
		$lang = 'lang="en"';
	}

	return $lang;
}

add_filter( 'language_attributes', 'fp_override_lang_attribute' );
