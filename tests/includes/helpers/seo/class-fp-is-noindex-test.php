<?php
/**
 * Tests function fp_is_noindex() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Is_Noindex_Test class.
 */
class FP_Is_Noindex_Test extends FP_Base_Test {

	/**
	 * Checks whether function fp_is_noindex() return expected value.
	 *
	 * @dataProvider returnsExpectedValuesDataProvider
	 *
	 * @param array $robots Robots mock.
	 * @param bool  $expected Expected values.
	 */
	public function testIfReturnsExpectedValues( $robots, $expected ) {
		$this->mockFunction(
			'fp_get_robots_meta',
			function() use ( $robots ) {
				return $robots;
			}
		);

		$this->assertEquals( $expected, fp_is_noindex() );
	}

	/**
	 * Data provider for testIfReturnsExpectedValues().
	 *
	 * @return array
	 */
	public function returnsExpectedValuesDataProvider() {
		return [
			'no data passed'            => [
				'robots'   => [],
				'expected' => false,
			],
			'not array'                 => [
				'robots'   => null,
				'expected' => false,
			],
			'noIndex with invalid case' => [
				'robots'   => [ 'noIndex' ],
				'expected' => false,
			],
			'valid noindex'             => [
				'robots'   => [ 'noindex' ],
				'expected' => true,
			],
		];
	}
}
