<?php
/**
 * Tests fp_sanitize_field_value() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 * FP_Sanitize_Field_Value_Test class.
 */
class FP_Sanitize_Field_Value_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_sanitize_field_value return correct values.
	 *
	 * @dataProvider returnsCorrectValuesDataProvider
	 *
	 * @param mixed $value Value to sanitize.
	 * @param array $expected Expected value.
	 */
	public function testIfReturnsCorrectValues( $value, $expected ) {

		$this->assertEquals( $expected, fp_sanitize_field_value( $value ) );
	}

	/**
	 * Data provider for testIfReturnsCorrectValues().
	 *
	 * @return array
	 */
	public function returnsCorrectValuesDataProvider() {
		return [
			'array'   => [
				'value'    => [ 'key' => 'value' ],
				'expected' => [ 'key' => 'value' ],
			],
			'null'    => [
				'value'    => null,
				'expected' => null,
			],
			'numeric' => [
				'value'    => 123456,
				'expected' => 123456,
			],
			'string'  => [
				'value'    => 'Hello!',
				'expected' => 'Hello!',
			],
			// This is trimming all characters that do not match /[\x00-\x1F\x7F]/ regex.
			'string with trimmed valued (control characters)' => [
				'value'    => "Hello\x00\x01\x02\x1F\x7F!",
				'expected' => 'Hello!',
			],
		];
	}
}
