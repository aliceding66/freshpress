<?php
/**
 * Tests fp_get_env() helper functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Env_Test class.
 */
class FP_Get_Env_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		if ( ! defined( 'WP_ENV' ) ) {
			define( 'WP_ENV', 'main-env' );
		}
	}

	/**
	 * Checks whether fp_get_env() return expected value for different cases.
	 * Test class is ran in separate process to no use WP_ENV const in other tests.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 * @runClassInSeparateProcess
	 *
	 * @param string $hostname Hostname.
	 * @param string $expected Expected enqueues.
	 */
	public function testIfReturnsExpectedResult( $hostname, $expected ) {
		$this->assertEquals( $expected, fp_get_env( $hostname ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			// Based on hostname.
			'local domain'                  => [
				'hostname' => 'www.dev.freshenv.com',
				'expected' => 'local',
			],
			'staging domain'                => [
				'hostname' => 'staging.web.freshenv.com',
				'expected' => 'staging',
			],
			'test domain'                   => [
				'hostname' => 'test1.web.freshenv.com',
				'expected' => 'development',
			],
			'qa domain'                     => [
				'hostname' => 'qa.web.freshenv.com',
				'expected' => 'development',
			],
			'uat domain'                    => [
				'hostname' => 'uat.web.freshenv.com',
				'expected' => 'staging',
			],
			'production domain'             => [
				'hostname' => 'www.freshbooks.com',
				'expected' => 'production',
			],
			'production alternative domain' => [
				'hostname' => 'prod.web.freshenv.com',
				'expected' => 'production',
			],
			'domain outside of FreshBooks'  => [
				'hostname' => 'example.com',
				'expected' => 'development',
			],

			// Based on constants.
			'WP_ENV set to "main-env"'      => [
				'hostname' => '',
				'expected' => 'main-env',
			],
		];
	}
}
