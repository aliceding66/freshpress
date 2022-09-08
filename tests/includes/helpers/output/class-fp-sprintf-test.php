<?php
/**
 * Tests fp_sprintf() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Sprintf_Test class.
 */
class FP_Sprintf_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_sprintf() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param mixed        $source_string String to be parsed.
	 * @param array        $replacements Replacement data.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $source_string, $replacements, $expected ) {
		$this->assertEquals( $expected, fp_sprintf( $source_string, $replacements ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty string and replacements'    => [
				'source_string' => '',
				'replacements'  => [],
				'expected'      => '',
			],
			'string with valid replacements'   => [
				'source_string' => 'Hello %s!',
				'replacements'  => [ 'John' ],
				'expected'      => 'Hello John!',
			],
			'string with invalid replacements' => [
				'source_string' => 'Hello %i!',
				'replacements'  => [ 'John' ],
				'expected'      => 'Hello !',
			],
			'string with no replacements'      => [
				'source_string' => 'Hello %i!',
				'replacements'  => [],
				'expected'      => 'Hello %i!',
			],
			'data passed as for standard wp_sprintf function' => [
				'source_string' => [ 'Hello %s!', 'John' ],
				'replacements'  => [],
				'expected'      => [ 'Hello %s!', 'John' ], // If no replacements is passed, then it returns original value.
			],
		];
	}
}
