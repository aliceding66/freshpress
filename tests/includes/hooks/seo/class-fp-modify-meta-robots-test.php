<?php
/**
 * Tests fp_modify_meta_robots() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Modify_Meta_Robots_Test class.
 */
class FP_Modify_Meta_Robots_Test extends FP_Base_Test {

	/**
	 * Stores page used in fp_get_env() function.
	 *
	 * @var string
	 */
	private $env;

	/**
	 * Stores page used in fp_get_server_var() function.
	 *
	 * @var string
	 */
	private $host;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'fp_get_env',
			function() {
				return $this->env;
			}
		);

		$this->mockFunction(
			'fp_get_server_var',
			function( $var ) {
				if ( 'HTTP_HOST' === $var ) {
					return $this->host;
				} else {
					return '';
				}
			}
		);
	}

	/**
	 * Checks whether functions fp_modify_meta_robots() is properly modifying robots data.
	 *
	 * @dataProvider properlyModifyingRobotsDataDataProvider
	 *
	 * @param array  $robots Input robots.
	 * @param string $env Mocked env.
	 * @param string $host Mocked host.
	 * @param string $expected If to expect banners to be added.
	 */
	public function testIfProperlyModifyingRobotsData( $robots, $env, $host, $expected ) {
		$this->env = $env;
		$this->host = $host;

		$this->assertEquals( $expected, fp_modify_meta_robots( $robots ) );
	}

	/**
	 * Data provider for testIfProperlyModifyingRobotsData().
	 *
	 * @return array
	 */
	public function properlyModifyingRobotsDataDataProvider() {
		return [
			'empty data'                              => [
				'robots'   => [],
				'env'      => '',
				'host'     => '',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'localhost has noindex nofollow'          => [
				'robots'   => [],
				'env'      => 'local',
				'host'     => 'www.dev.freshenv.com',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'test has noindex nofollow'               => [
				'robots'   => [],
				'env'      => 'development',
				'host'     => 'test1.web.freshenv.com',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'qa has noindex nofollow'                 => [
				'robots'   => [],
				'env'      => 'development',
				'host'     => 'qa.web.freshenv.com',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'staging has noindex nofollow'            => [
				'robots'   => [],
				'env'      => 'staging',
				'host'     => 'staging.web.freshenv.com',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'uat has noindex nofollow'                => [
				'robots'   => [],
				'env'      => 'staging',
				'host'     => 'uat.web.freshenv.com',
				'expected' => [
					'index'  => 'noindex',
					'follow' => 'nofollow',
				],
			],
			'production do not have noindex nofollow' => [
				'robots'   => [],
				'env'      => 'production',
				'host'     => 'www.freshbooks.com',
				'expected' => [],
			],
		];
	}
}
