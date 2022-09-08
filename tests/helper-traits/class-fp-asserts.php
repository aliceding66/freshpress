<?php
/**
 * Trait that adds additional assert functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidFunctionName.MethodNameInvalid */

/**
 * FP_Asserts class.
 */
trait FP_Asserts {

	/**
	 * Helper assert function to determine if string contains <img/> node.
	 *
	 * @param string $string_to_check String to check.
	 * @param string $message Optional assertion message.
	 */
	protected function assertStringContainsImgNode( $string_to_check, $message = '' ) {
		$this->assertRegExp( '/<img[a-zA-Z0-9 -_\s]+\/>/', $string_to_check, $message );
	}

	/**
	 * Helper assert function to determine if array contains another array.
	 *
	 * @param array  $haystack Array to be checked against.
	 * @param array  $expected_subset Array that should exist withing haystack.
	 * @param string $message Optional assertion message.
	 */
	protected function assertArrayContainsArray( $haystack, $expected_subset, $message = '' ) {
		foreach ( $expected_subset as $key => $value ) {
			$this->assertArrayHasKey( $key, $haystack, $message );
			$this->assertSame( $haystack[ $key ], $value, $message );
		}
	}

	/**
	 * Helper assert function to determine if array do not contains another array.
	 *
	 * @param array  $haystack Array to be checked against.
	 * @param array  $expected_subset Array that should not exist withing haystack.
	 * @param string $message Optional assertion message.
	 */
	protected function assertArrayNotContainsArray( $haystack, $expected_subset, $message = '' ) {
		foreach ( $expected_subset as $key => $value ) {
			$this->assertArrayNotHasKey( $key, $haystack, 'Array contains key: ' . $message );
			if ( isset( $haystack[ $key ] ) ) {
				$this->assertNotSame( $haystack[ $key ], $value, 'Array contains value: ' . $message );
			}
		}
	}
}

