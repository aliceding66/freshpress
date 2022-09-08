<?php
/**
 * Tests fp_acf_filter_post_types() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 * FP_Acf_Filter_Post_Types_Test class.
 */
class FP_Acf_Filter_Post_Types_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'fp_get_post_types',
			function() {
				return [
					'page' => (object) [
						'name'  => 'page',
						'label' => 'Page',
					],
				];
			}
		);
	}

	/**
	 * Checks whether fp_acf_filter_post_types return correct values.
	 *
	 * @dataProvider returnsCorrectValuesDataProvider
	 *
	 * @param array $field Field to filter.
	 * @param array $expected Expected value.
	 */
	public function testIfReturnsCorrectValues( $field, $expected ) {

		$this->assertEquals( $expected, fp_acf_filter_post_types( $field ) );
	}

	/**
	 * Data provider for testIfReturnsCorrectValues().
	 *
	 * @return array
	 */
	public function returnsCorrectValuesDataProvider() {
		return [
			'empty field'                      => [
				'field'    => [],
				'expected' => [],
			],
			'field with choices'               => [
				'field'    => [ 'choices' => [ 'key' => 'value' ] ],
				'expected' => [ 'choices' => [ 'page' => 'Page' ] ],
			],
			'field with empty post_type field' => [
				'field'    => [ 'post_type' => [] ],
				'expected' => [ 'post_type' => [ 'page' ] ],
			],
		];
	}
}
