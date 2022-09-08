<?php
/**
 * ACli class.
 *
 * @package FreshpressBlocks\ACli
 * @subpackage ACli
 */

namespace FreshpressBlocks;

require_once __DIR__ . '/autoloader.php';

/**
 * Class ACli.
 *
 * @package FreshpressBlocks
 */
abstract class ACli {

	/**
	 * Output to CLI without newline.
	 *
	 * @param string $message Message to output.
	 */
	protected function write( $message ) {
		// @codingStandardsIgnoreStart
		echo $message;
		// @codingStandardsIgnoreEnd
	}

	/**
	 * Output to CLI with newline.
	 *
	 * @param string $message Message to output.
	 */
	protected function write_line( $message ) {
		// @codingStandardsIgnoreStart
		echo $message . PHP_EOL;
		// @codingStandardsIgnoreEnd
	}

	/**
	 * Call CLI command.
	 *
	 * @param string $command Command to call.
	 */
	protected function call_command( $command ) {
		$this->write_line( "Called command: $command. Please wait..." );
		shell_exec( "{$command} 2>&1" );
	}

	/**
	 * Shows error and stop executing script.
	 *
	 * @param string $error Error to output.
	 */
	protected function throw_error( $error ) {
		// @codingStandardsIgnoreStart
		echo PHP_EOL . PHP_EOL . 'ERROR: ' . $error . PHP_EOL;
		// @codingStandardsIgnoreEnd
		exit;
	}

	/**
	 * Gets text input from user.
	 *
	 * @param string $message Message to output before fetching data.
	 * @param string $default Default value to use if user will not input anything.
	 *
	 * @return mixed|string
	 */
	protected function get_text( $message, $default = '' ) {
		$message = $message . ( '' !== $default ? " [$default]" : '' ) . ': ';

		$this->write( $message );

		$value = trim( fgets( STDIN ) );

		if ( '' === $value ) {
			return $default;
		} else {
			return $value;
		}
	}

	/**
	 * Gets boolean input from user.
	 *
	 * @param string $message Message to output before fetching data.
	 *
	 * @return mixed|string
	 */
	protected function get_confirm( $message ) {
		readline_callback_handler_install(
			$message . ' [y/N] ',
			function() {
				// Nothing.
			}
		);
		$input = mb_strtolower( stream_get_contents( STDIN, 1 ) );
		readline_callback_handler_remove();

		if ( 'y' === $input ) {
			$this->write_line( '[YES]' );

			return true;
		} else {
			$this->write_line( '[NO]' );

			return false;
		}
	}
}
