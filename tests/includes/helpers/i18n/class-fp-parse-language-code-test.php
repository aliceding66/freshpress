<?php
/**
 * Tests fp_parse_language_code() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Parse_Language_Code_Test class.
 */
class FP_Parse_Language_Code_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_parse_language_code() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string       $language_code Language code to test.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $language_code, $expected ) {
		$this->assertEquals( $expected, fp_parse_language_code( $language_code ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'working code'                      => [
				'language_code' => 'en-CA',
				'expected'      => [
					'country' => 'CA',
					'lang'    => 'en',
				],
			],
			'just country'                      => [
				'language_code' => 'CA',
				'expected'      => [
					'lang' => 'CA',
				],
			],
			'just language'                     => [
				'language_code' => 'en',
				'expected'      => [
					'lang' => 'en',
				],
			],
			'empty string'                      => [
				'language_code' => '',
				'expected'      => [
					'lang' => '',
				],
			],
			'empty string with valid structure' => [
				'language_code' => '-',
				'expected'      => [
					'lang'    => '',
					'country' => '',
				],
			],
		];
	}
}
