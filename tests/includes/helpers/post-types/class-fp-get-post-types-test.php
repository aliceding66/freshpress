<?php
/**
 * Tests function fp_get_post_types() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Post_Types_Test class.
 */
class FP_Get_Post_Types_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'get_post_types',
			[
				'return' => function( $options, $output_type ) {
					return [];
				},
			]
		);
	}

	/**
	 * Checks whether function fp_register_post_type() return expected value.
	 *
	 * @dataProvider returnsExpectedValuesDataProvider
	 *
	 * @param array  $options Options.
	 * @param string $output_type Output type.
	 * @param array  $expected Expected values.
	 */
	public function testIfReturnsExpectedValues( $options, $output_type, $expected ) {
		$test_passed = true;
		$test_failed_msg = '';

		$this->mockFunction(
			'get_post_types',
			function( $options, $output_type ) use ( &$test_passed, &$test_failed_msg, $expected ) {
				if ( isset( $expected['output_type'] ) && $output_type !== $expected['output_type'] ) {
					$test_passed = false;
					$test_failed_msg = 'output_type has wrong value';
				}

				if ( 'objects' === $output_type ) {
					return $this->getMockedPostTypes();
				} else {
					return array_keys( $this->getMockedPostTypes() );
				}
			}
		);

		$this->assertEquals( $expected['return'], fp_get_post_types( $options, $output_type ) );
		$this->assertTrue( $test_passed, $test_failed_msg );
	}

	/**
	 * Data provider for testIfReturnsExpectedValues().
	 *
	 * @return array
	 */
	public function returnsExpectedValuesDataProvider() {
		return [
			'no data passed'                    => [
				'options'     => [],
				'output_type' => '',
				'expected'    => [
					'return'      => $this->getMockedPostTypes(),
					'options'     => [ 'public' => true ],
					'output_type' => 'objects',
				],
			],
			'invalid output_type passed'        => [
				'options'     => [],
				'output_type' => 'structure',
				'expected'    => [
					'return'      => $this->getMockedPostTypes(),
					'output_type' => 'objects',
				],
			],
			'output_type as names'              => [
				'options'     => [],
				'output_type' => 'names',
				'expected'    => [
					'return' => array_keys( $this->getMockedPostTypes() ),
				],
			],
			'exclude as array'                  => [
				'options'     => [ 'exclude' => [ 'post' ] ],
				'output_type' => '',
				'expected'    => [
					'return' => $this->getMockedPostTypes( [ 'page' ] ),
				],
			],
			'exclude as string'                 => [
				'options'     => [ 'exclude' => 'post' ],
				'output_type' => 'structure',
				'expected'    => [
					'return' => $this->getMockedPostTypes( [ 'page' ] ),
				],
			],
			'exclude with output_type as names' => [
				'options'     => [ 'exclude' => [ 'post' ] ],
				'output_type' => 'names',
				'expected'    => [
					'return' => [ 1 => 'page' ], // fp_get_post_types is not resetting post_types keys.
				],
			],
		];
	}

	/**
	 * Helper function to mock post types.
	 *
	 * @param array $types Post types to return.
	 *
	 * @return array
	 */
	private function getMockedPostTypes( $types = [ 'post', 'page' ] ) {
		$post_types = [];
		foreach ( $types as $type ) {
			$post_types[ $type ] = (object) [ 'name' => $type ];
		}

		return $post_types;
	}
}
