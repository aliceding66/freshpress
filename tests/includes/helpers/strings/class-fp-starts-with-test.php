<?php
/**
 * Tests function fp_starts_with() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Starts_With_Test class.
 */
class FP_Starts_With_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_starts_with() return expected value.
	 *
	 * @dataProvider returnsExpectedValueDataProvider
	 *
	 * @param string $haystack Haystack.
	 * @param string $needle Needle.
	 * @param bool   $expected Expected values.
	 */
	public function testIfReturnsExpectedValue( $haystack, $needle, $expected ) {
		$this->assertEquals( $expected, fp_starts_with( $haystack, $needle ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedValue().
	 *
	 * @return array
	 */
	public function returnsExpectedValueDataProvider() {
		return [
			'no data passed'                       => [
				'haystack' => '',
				'needle'   => '',
				'expected' => false,  // This differs from fp_ends_with().
			],
			'only needle passed'                   => [
				'haystack' => '',
				'needle'   => 'needle',
				'expected' => false,
			],
			'only haystack'                        => [
				'haystack' => 'straw straw',
				'needle'   => '',
				'expected' => false,
			],
			'needle at end'                        => [
				'haystack' => 'straw straw needle',
				'needle'   => 'needle',
				'expected' => false,
			],
			'needle in the middle'                 => [
				'haystack' => 'straw needle straw',
				'needle'   => 'needle',
				'expected' => false,
			],
			'needle at the beginning'              => [
				'haystack' => 'needle straw straw',
				'needle'   => 'needle',
				'expected' => true,
			],
			'needle as a special char'             => [
				'haystack' => '😊 straw straw',
				'needle'   => '😊',
				'expected' => true,
			],
			'needle with spaces'                   => [
				'haystack' => '1 2 3 4 5 6 7 8 9',
				'needle'   => '1 2 3',
				'expected' => true,
			],
			'needle with newlines'                 => [
				'haystack' => "1\n2\n3\n4\n5\n6\n7\n8\n9",
				'needle'   => "1\n2\n3",
				'expected' => true,
			],
			'needle with invalid amount of spaces' => [
				'haystack' => '1 2 3 4 5 6 7 8 9',
				'needle'   => '1  2  3',
				'expected' => false,
			],
		];
	}
}
