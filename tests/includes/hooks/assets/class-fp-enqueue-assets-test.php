<?php
/**
 * Tests fp_enqueue_assets() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Enqueue_Assets_Test class.
 */
class FP_Enqueue_Assets_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		WP_Mock::passthruFunction( 'wp_enqueue_script' );
	}

	/**
	 * Checks whether function fp_enqueue_assets() enqueues correct amount of scripts.
	 *
	 * @dataProvider enqueueCorrectAmountOfScriptsDataProvider
	 *
	 * @param array $asset_manifest_to_mock Asset manifest to mock.
	 * @param int   $expected_registered_scripts Expected amount of registered scripts.
	 */
	public function testIfEnqueueCorrectAmountOfScripts( $asset_manifest_to_mock, $expected_registered_scripts ) {
		$enqueued_scripts = 0;
		$this->mockAssetsManifest( $asset_manifest_to_mock );
		WP_Mock::userFunction(
			'wp_register_script',
			[
				'return' => function() use ( &$enqueued_scripts ) {
					++ $enqueued_scripts;

					return true;
				},
			]
		);

		fp_enqueue_assets();

		$this->assertEquals( $expected_registered_scripts, $enqueued_scripts, 'Incorrect amount of scripts enqueued' );
	}

	/**
	 * Data provider for testIfEnqueueCorrectAmountOfScripts().
	 *
	 * @return array
	 */
	public function enqueueCorrectAmountOfScriptsDataProvider() {
		return [
			'empty data'                               => [
				'asset_manifest_to_mock' => [],
				'expected'               => 0,
			],
			'valid script to enqueue'                  => [
				'asset_manifest_to_mock' => [
					'scripts/valid.js' => 'path/valid.js',
				],
				'expected'               => 1,
			],
			'block script that should not be enqueued' => [
				'asset_manifest_to_mock' => [
					'scripts/blocks-script.js' => 'path/blocks-script.js',
				],
				'expected'               => 0,
			],
			'admin script that should not be enqueued' => [
				'asset_manifest_to_mock' => [
					'scripts/admin.js' => 'path/admin.js',
				],
				'expected'               => 0,
			],
			'combined scripts scenario'                => [
				'asset_manifest_to_mock' => [
					'scripts/valid.js'         => 'path/valid.js',
					'scripts/blocks-script.js' => 'path/blocks-script.js',
					'scripts/admin.js'         => 'path/admin.js',
				],
				'expected'               => 1,
			],
		];
	}
}
