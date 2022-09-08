<?php
/**
 * Tests function fp_to_snake_case() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_To_Snake_Case_Test class.
 */
class FP_To_Snake_Case_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_to_snake_case() return expected value.
	 *
	 * @dataProvider returnsExpectedValueDataProvider
	 *
	 * @param string $string Input string.
	 * @param bool   $expected Expected values.
	 */
	public function testIfReturnsExpectedValue( $string, $expected ) {
		$this->assertEquals( $expected, fp_to_snake_case( $string ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedValue().
	 *
	 * @return array
	 */
	public function returnsExpectedValueDataProvider() {
		return [
			'no data passed'               => [
				'string'   => '',
				'expected' => '',
			],
			'standard string'              => [
				'string'   => 'an example phrase',
				'expected' => 'an_example_phrase',
			],
			'string with punctuation'      => [
				'string'   => '...an example, with punctuation',
				'expected' => '...an_example,_with_punctuation', // This does not match JS case convert result.
			],
			'string with single letter'    => [
				'string'   => 'a phrase starting with one letter',
				'expected' => 'a_phrase_starting_with_one_letter',
			],
			'string with question mark'    => [
				'string'   => 'a question?',
				'expected' => 'a_question?',  // This does not match JS case convert result.
			],
			'string with number'           => [
				'string'   => 'example with 1 number',
				'expected' => 'example_with_1_number',
			],
			'string with 2 numbers'        => [
				'string'   => '2nd example with 2 numbers',
				'expected' => '2nd_example_with_2_numbers',
			],
			'string with mixed case words' => [
				'string'   => 'MixedCase words like FreshBooks',
				'expected' => 'mixedcase_words_like_freshbooks',  // This does not match JS case convert result.
			],
			'string with underscore'       => [
				'string'   => 'Example with under_scores',
				'expected' => 'example_with_under_scores',
			],
			'string with special char'     => [
				'string'   => 'example 😊 phrase',
				'expected' => 'example_😊_phrase',
			],
		];
	}
}
