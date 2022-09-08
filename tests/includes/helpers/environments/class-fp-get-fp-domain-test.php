<?php
/**
 * Tests fp_get_fb_domain() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Get_Fp_Domain_Test class.
 */
class FP_Get_Fp_Domain_Test extends FP_Base_Test {

	/**
	 * Checks whether fp_get_fb_domain() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $env Mocked environment.
	 * @param string $subdomain Subdomain.
	 * @param string $expected Expected enqueues.
	 */
	public function testIfReturnsExpectedResult( $env, $subdomain, $expected ) {
		$this->mockFunction(
			'fp_get_env',
			function() use ( $env ) {
				return $env;
			}
		);

		$this->assertEquals( $expected, fp_get_fb_domain( $subdomain ) );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'no data passed on local'      => [
				'env'       => 'local',
				'subdomain' => '',
				'expected'  => 'staging.freshenv.com',
			],
			'no data passed on staging'    => [
				'env'       => 'staging',
				'subdomain' => '',
				'expected'  => 'staging.freshenv.com',
			],
			'no data passed on test'       => [
				'env'       => 'test',
				'subdomain' => '',
				'expected'  => 'staging.freshenv.com',
			],
			'no data passed on production' => [
				'env'       => 'production',
				'subdomain' => '',
				'expected'  => 'freshbooks.com',
			],
			'subdomain passed with valid chars only on production' => [
				'env'       => 'production',
				'subdomain' => 'app',
				'expected'  => 'app.freshbooks.com',
			],
			'subdomain passed with additional spaces and "." on production' => [
				'env'       => 'production',
				'subdomain' => ' app . ',
				'expected'  => 'app.freshbooks.com',
			],
			'subdomain passed with invalid chars only on production' => [
				'env'       => 'production',
				'subdomain' => ' ... ',
				'expected'  => 'freshbooks.com',
			],
		];
	}
}
