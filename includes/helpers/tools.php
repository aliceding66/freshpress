<?php
/**
 * Helper functions for working with code.
 *
 * @package FreshPress\Website
 */

if ( ! function_exists( 'fp_dumpdie' ) ) {
	/**
	 * Dump & die - debugging helper function.
	 *
	 * @param mixed ...$values Variables or values to dump.
	 */
	function fp_dumpdie( ...$values ) {
		$is_cli = php_sapi_name() === 'cli';
		echo $is_cli ? '' : '<style>body{opacity:1!important;}</style><pre>';
		var_dump( ...$values );
		echo $is_cli ? '' : '</pre>';
		fp_die();
	}
}

if ( ! function_exists( 'fp_die' ) ) {
	/**
	 *  Alias function for core "die()" to be able to add PHPUnit tests for functions using PHP termination.
	 *
	 * @param int|string $status Optional status that can be passed to die function.
	 */
	function fp_die( $status = '' ) {
		/* phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped */
		die( $status );
	}
}
