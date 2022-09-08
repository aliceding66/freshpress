<?php
/**
 * Tests fp_add_to_preload() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Add_To_Preload_Test class.
 */
class FP_Add_To_Preload_Test extends FP_Base_Test {

	/**
	 * Clean up after the test is run.
	 */
	public function tearDown() {
		parent::tearDown();

		$GLOBALS['preload_assets'] = [];
	}

	/**
	 * Check whether global stores preload_assets.
	 */
	public function testIfGlobalForStoringPreloadedAssetsExists() {
		$this->assertArrayHasKey( 'preload_assets', $GLOBALS );
	}

	/**
	 * Checks whether function fp_add_to_preload() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string       $href Asset href.
	 * @param string       $as Asset type.
	 * @param bool         $onload If asset should have added onload event.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $href, $as, $onload, $expected ) {
		fp_add_to_preload( $href, $as, $onload );

		$this->assertEquals( $expected, $GLOBALS['preload_assets'] );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'               => [
				'href'     => '',
				'as'       => '',
				'onload'   => false,
				'expected' => [
					[
						'href' => '',
						'as'   => '',
					],
				], // There is no check if asset was added empty.
			],
			'any asset without onload' => [
				'href'     => 'href',
				'as'       => 'type',
				'onload'   => false,
				'expected' => [
					[
						'href' => 'href',
						'as'   => 'type',
					],
				],
			],
			'style with onload'        => [
				'href'     => 'href',
				'as'       => 'style',
				'onload'   => true,
				'expected' => [
					[
						'href'   => 'href',
						'as'     => 'style',
						'onload' => "this.onload=null;this.rel='stylesheet'",
					],
				],
			],
			'not style with onload'    => [
				'href'     => 'href',
				'as'       => 'type',
				'onload'   => true,
				'expected' => [
					[
						'href' => 'href',
						'as'   => 'type',
					],
				],
			],
		];
	}
}
