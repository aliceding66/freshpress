<?php
/**
 * Custom content-wide variables, like amount of active customers.
 *
 * @package FreshPress\Website
 */

 /**
  * Processes page content by replacing variable tokens with data from Site Wide Settings.
  *
  * @param string $buffer page content.
  * @return string
  */
function fp_process_sitewide_variables( $buffer ) {
	if ( function_exists( 'get_field' ) ) {
		$buffer = str_replace( '{%SWS.CLIENTS_AMOUNT%}', get_field( 'sws_clients_amount', 'options' ), $buffer );
		$buffer = str_replace( '{%LC:SWS.CLIENTS_AMOUNT%}', mb_strtolower( get_field( 'sws_clients_amount', 'options' ) ), $buffer );
		$buffer = str_replace( '{%SWS.COUNTRIES_AMOUNT%}', get_field( 'sws_countries_amount', 'options' ), $buffer );
		$buffer = str_replace( '{%LC:SWS.COUNTRIES_AMOUNT%}', mb_strtolower( get_field( 'sws_countries_amount', 'options' ) ), $buffer );
	}
	return $buffer;
}

/**
 * Starts catching output for future replacements.
 */
function fp_buffer_start() {
	if ( ! is_admin() ) {
		ob_start( 'fp_process_sitewide_variables' );
	}
}

/**
 * Ends buffer catching.
 */
function fp_buffer_end() {
	if ( ! is_admin() ) {
		@ob_end_flush();
	}
}

add_action( 'after_setup_theme', 'fp_buffer_start' );
add_action( 'shutdown', 'fp_buffer_end' );

