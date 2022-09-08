<?php
/**
 * Tests fp_add_menus_to_field_choices() helper functions.
 *
 * @package FreshPress\Website
 */

use PHPUnit\Framework\TestCase;

/**
 * FP_Add_Menus_To_Field_Choices_Test class.
 */
class FP_Add_Menus_To_Field_Choices_Test extends TestCase {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		\WP_Mock::setUp();
	}

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		// This triggers checks for WP_Mock::expect* functions used during tests.
		$this->addToAssertionCount( Mockery::getContainer()->mockery_getExpectationCount() );
		\WP_Mock::tearDown();
	}

	/**
	 * Checks whether fp_add_menus_to_field_choices return correct values.
	 *
	 * @dataProvider returnsCorrectValuesDataProvider
	 * @param array $menus Menus to be mocked.
	 * @param array $expected Expected value.
	 */
	public function testIfReturnsCorrectValues( $menus, $expected ) {
		WP_Mock::userFunction(
			'wp_get_nav_menus',
			[
				'return' => $menus,
				'times'  => 1,
			]
		);

		$this->assertEquals( $expected, fp_add_menus_to_field_choices( [] ) );
	}

	/**
	 * Data provider for testIfReturnsCorrectValues().
	 *
	 * @return array
	 */
	public function returnsCorrectValuesDataProvider() {
		return [
			'empty menu'     => [
				'menus'    => [],
				'expected' => [ 'choices' => [] ],
			],
			'menu with item' => [
				'menus'    => [
					(object) [
						'name' => 'Primary Menu',
						'slug' => 'primary-menu',
					],
				],
				'expected' => [ 'choices' => [ 'primary-menu' => 'Primary Menu' ] ],
			],
		];
	}
}
