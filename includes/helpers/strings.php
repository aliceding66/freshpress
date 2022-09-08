<?php
/**
 * Helper functions for strings.
 *
 * @package FreshPress\Website
 */

/**
 * Check if a string starts with a substring.
 *
 * @todo Replace with str_starts_with when upgrading to PHP v8.
 *
 * @param string $haystack String to search.
 * @param string $needle   Substring to find.
 * @return boolean
 */
function fp_starts_with( $haystack, $needle ) {
	$length = strlen( $needle );
	return $length > 0 && strncmp( $haystack, $needle, $length ) === 0;
}

/**
 * Check if a string ends with a substring.
 *
 * @todo Replace with str_ends_with when upgrading to PHP v8.
 *
 * @param string $haystack String to search.
 * @param string $needle   Substring to find.
 * @return boolean
 */
function fp_ends_with( $haystack, $needle ) {
	return substr_compare( $haystack, $needle, -strlen( $needle ) ) === 0;
}

/**
 * Estimates the reading time for a given piece of $content.
 *
 * @param  string $content Content for which to calculate read time.
 * @param  int    $rate    Estimated words per minute of read rate.
 * @return int    $time    Read time estimate in minutes.
 */
function fp_estimate_read_time( $content = '', $rate = 200 ) {
	$word_count = str_word_count( fp_remove_emoji( wp_strip_all_tags( strip_shortcodes( do_blocks( $content ) ) ) ) );

	return ceil( $word_count / $rate );
}

/**
 * Returns string in snake_case.
 *
 * @param string $string String to convert.
 * @return string
 */
function fp_to_snake_case( $string ) {
	return preg_replace( '/(?<!^)[ ]/', '_', mb_strtolower( $string ) );
}

/**
 * Returns trimmed string from eny emojis or symbols generally known to be used in text.
 *
 * @source https://stackoverflow.com/questions/12807176/php-writing-a-simple-removeemoji-function
 * @param string $text String to be trimmed.
 *
 * @return string
 */
function fp_remove_emoji( $text ) {

	// Match Emoticons.
	$regex_emoticons = '/[\x{1F600}-\x{1F64F}]/u';
	$text = preg_replace( $regex_emoticons, '', $text );

	// Match Miscellaneous Symbols and Pictographs.
	$regex_symbols = '/[\x{1F300}-\x{1F5FF}]/u';
	$text = preg_replace( $regex_symbols, '', $text );

	// Match Transport And Map Symbols.
	$regex_transport = '/[\x{1F680}-\x{1F6FF}]/u';
	$text = preg_replace( $regex_transport, '', $text );

	// Match Miscellaneous Symbols.
	$regex_misc = '/[\x{2600}-\x{26FF}]/u';
	$text = preg_replace( $regex_misc, '', $text );

	// Match Dingbats. Last replacement.
	$regex_dingbats = '/[\x{2700}-\x{27BF}]/u';
	return preg_replace( $regex_dingbats, '', $text );
}
