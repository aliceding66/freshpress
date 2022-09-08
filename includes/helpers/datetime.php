<?php
/**
 * Helper functions for dates and times.
 *
 * @package FreshPress\Website
 */

/**
 * Get a DateTime object for a given date/time string.
 *
 * @param string $input  Date/time string to convert to a DateTime object (defaults to 'now').
 * @param string $format Format for parsing $input (defaults to 'Y-m-d H:i:s').
 * @param string $tz     Time zone for the date returned (defaults to 'America/Toronto').
 * @return DateTime
 */
function fp_get_date( $input = 'now', $format = 'Y-m-d H:i:s', $tz = 'America/Toronto' ) {
	if ( 'now' === $input ) {
		return new DateTime( $input, new DateTimeZone( $tz ) );
	}

	return DateTime::createFromFormat( $format, $input, new DateTimeZone( $tz ) );
}
