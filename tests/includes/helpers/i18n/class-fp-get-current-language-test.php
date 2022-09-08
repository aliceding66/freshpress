<?php
/**
 * Tests fp_get_current_language() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Current_Language_Test class.
 */
class FP_Get_Current_Language_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::userFunction(
			'fp_get_default_region',
			[
				'return' => 'default',
			]
		);
	}

	/**
	 * Checks whether fp_get_current_language() return value from WPML filter if that one exists.
	 */
	public function testIfReturnWPMLFilterValueIfSet() {
		WP_Mock::onFilter( 'wpml_current_language' )->with( null )->reply( 'filter' );

		 $this->assertEquals( 'filter', fp_get_current_language() );
	}

	/**
	 * Checks whether fp_get_current_language() return default value if WPML filter do not exists.
	 */
	public function testIfReturnDefaultValueIfNoWPMLFilterExists() {
		WP_Mock::onFilter( 'wpml_current_language' )->with( null )->reply( null );

		$this->assertEquals( 'default', fp_get_current_language() );
	}
}
