<?php
/**
 * Tests function fp_estimate_read_time() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

use PHPUnit\Framework\Error\Warning;

/**
 *  FP_Estimate_Read_Time_Test class.
 */
class FP_Estimate_Read_Time_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_estimate_read_time() return expected value.
	 *
	 * @dataProvider returnsExpectedValueDataProvider
	 *
	 * @param string $content Content.
	 * @param int    $rate Rate of words per minute.
	 * @param bool   $expected Expected values.
	 */
	public function testIfReturnsExpectedValue( $content, $rate, $expected ) {
		if ( Warning::class === $expected ) {
			$this->expectException( Warning::class );
			fp_estimate_read_time( $content, $rate );
		} else {
			$this->assertEquals( $expected, fp_estimate_read_time( $content, $rate ) );
		}
	}

	/**
	 * Data provider for testIfReturnsExpectedValue().
	 *
	 * @return array
	 */
	public function returnsExpectedValueDataProvider() {
		return [
			'no data passed'                             => [
				'content'  => '',
				'rate'     => null,
				'expected' => Warning::class,
			],
			'rate is 0'                                  => [
				'content'  => $this->get_text_with_words_amount( 20 ),
				'rate'     => 0,
				'expected' => Warning::class,
			],
			'same word and rate amount'                  => [
				'content'  => $this->get_text_with_words_amount( 60 ),
				'rate'     => 60,
				'expected' => 1,
			],
			'HTML is not counted as estimated read time' => [
				'content'  => '<span invalid-word> valid-word-1 </span> valid-word-2',
				'rate'     => 1, // 1 word per minute to easily test that case.
				'expected' => 2,
			],
			'string with special chars'                  => [
				'content'  => $this->get_text_with_words_amount( 60, '😊word😊' ),
				'rate'     => 60,
				'expected' => 1,
			],
			'string with newlines'                       => [
				'content'  => $this->get_text_with_words_amount( 60, "word\nword" ),
				'rate'     => 60,
				'expected' => 2, // Each word is actually 2 words with newline which is treated as well as word separator.
			],
		];
	}

	/**
	 * Helper function to get text with proper amount of text.
	 *
	 * @param int    $words_amount Amount of words to be used withing text.
	 * @param string $word Word to be used within text.
	 *
	 * @return string
	 */
	private function get_text_with_words_amount( $words_amount, $word = 'word' ) {
		return implode( ' ', array_fill( 0, $words_amount, $word ) );
	}
}
