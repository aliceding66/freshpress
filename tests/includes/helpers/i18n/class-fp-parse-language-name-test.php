<?php
/**
 * Tests fp_parse_language_name() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Parse_Language_Name_Test class.
 */
class FP_Parse_Language_Name_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_parse_language_name() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string       $language_name Language name to test.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $language_name, $expected ) {
		$this->assertEquals( $expected, fp_parse_language_name( $language_name ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'working name'                      => [
				'language_name' => 'Canada (English)',
				'expected'      => [
					'country' => 'Canada',
					'lang'    => 'English',
				],
			],
			'just country'                      => [
				'language_name' => 'Canada',
				'expected'      => [
					'lang' => 'Canada',
				],
			],
			'just language'                     => [
				'language_name' => '(English)',
				'expected'      => [
					'lang' => '(English)',
				],
			],
			'empty string'                      => [
				'language_name' => '',
				'expected'      => [
					'lang' => '',
				],
			],
			'empty string with valid structure' => [
				'language_name' => '()',
				'expected'      => [
					'lang' => '()',
				],
			],
			'French with special char'          => [
				'language_name' => 'France (Français)',
				'expected'      => [
					'country' => 'France',
					'lang'    => 'Français',
				],
			],
		];
	}
}
