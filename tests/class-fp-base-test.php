<?php
/**
 * Abstract Test class with WP_Mock enabled.
 *
 * @package FreshPress\Website
 */

use PHPUnit\Framework\TestCase;

/**
 * WP_Base_Test that is a base for other test suites.
 */
abstract class FP_Base_Test extends TestCase {

	use FP_Asserts, FP_Mock_Default_WP_Core, FP_Mock_Files, FP_Mock_Manifest, FP_Polyfill_Classes;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::activateStrictMode();
		WP_Mock::setUp();

		$this->setUpWPCoreDefaultMocks();
		$this->setUpManifestMocks();
	}

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		$this->addToAssertionCount( Mockery::getContainer()->mockery_getExpectationCount() );
		WP_Mock::tearDown();

		$this->tearDownManifestMock();
		$this->tearDownFilesMock();
		Patchwork\restoreAll();

		parent::tearDown();
	}

	/**
	 * Helper function to get Freshpress theme root path.
	 *
	 * @return string
	 */
	protected function getThemeRootPath() {
		return str_replace( DIRECTORY_SEPARATOR . 'tests', '', __DIR__ );
	}

	/**
	 * Helper function that mocks user function.
	 *
	 * @param string   $function_name Function to be mocked.
	 * @param callable $callable Function to be called.
	 */
	protected function mockFunction( $function_name, $callable ) {
		if ( ! function_exists( $function_name ) ) {
			// @codingStandardsIgnoreStart
			eval( "function $function_name() { return null; }" );
			// @codingStandardsIgnoreEnd
		}

		Patchwork\redefine( $function_name, $callable );
	}

	/**
	 * Helper function that checks whether script are launched in Windows OS.
	 *
	 * @return bool
	 */
	protected function isWindows() {
		return 'win' === strtolower( substr( PHP_OS, 0, 3 ) );
	}

}

