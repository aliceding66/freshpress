<?php
/**
 * Tests fp_render_blocks() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Render_Blocks_Test class.
 */
class FP_Render_Blocks_Test extends FP_Base_Test {

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		$this->use_default_mocks['do_blocks'] = false;
		parent::setUp();

		$this->mockWPBlockTypeRegistrySingleton(
			[
				'acf/acf-block'     => [],
				'fpbk/fpbk-block'   => [],

				'acf/common-block'  => [],
				'fpbk/common-block' => [],
			]
		);

		$this->mockFunction(
			'fp_get_block_id',
			function() {
				return 'id';
			}
		);

		$this->mockFunction(
			'fp_get_acf_blocks',
			function() {
				return [ 'acf-block', 'common-block' ];
			}
		);

		$this->mockFunction(
			'fp_get_fpbk_blocks',
			function() {
				return [ 'fpbk-block', 'common-block' ];
			}
		);
	}

	/**
	 * Checks whether fp_render_blocks() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param array  $input Blocks to render data.
	 * @param string $expected Expected enqueues.
	 */
	public function testIfReturnsExpectedResult( $input, $expected ) {
		WP_Mock::userFunction(
			'do_blocks',
			[
				'args'  => function( $output ) use ( $expected ) {
					return false === $expected['do_blocks_called'] || $output === $expected['do_blocks_output'];
				},
				'times' => $expected['do_blocks_called'] ? 1 : 0,
			]
		);

		fp_render_blocks( $input );
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'no input'                                     => [
				'input'    => [],
				'expected' => [
					'do_blocks_called' => false,
					'do_blocks_output' => '',
				],
			],
			'registered ACF block'                         => [
				'input'    => [ 'name' => 'acf-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/acf-block {"name":"acf/acf-block","id":"id"} --><!-- /wp:acf/acf-block -->',
				],
			],
			'registered FPBK block'                        => [
				'input'    => [ 'name' => 'fpbk-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:fpbk/fpbk-block {"name":"fpbk/fpbk-block","id":"id"} --><!-- /wp:fpbk/fpbk-block -->',
				],
			],
			'registered ACF and FPBK block - FPBK have higher priority' => [
				'input'    => [ 'name' => 'common-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:fpbk/common-block {"name":"fpbk/common-block","id":"id"} --><!-- /wp:fpbk/common-block -->',
				],
			],
			'registered block with prefix'                 => [
				'input'    => [ 'name' => 'acf/acf-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/acf-block {"name":"acf/acf-block","id":"id"} --><!-- /wp:acf/acf-block -->',
				],
			],
			'registered ACF block with FPBK prefix - no prevention added, output just try to render passed block' => [
				'input'    => [ 'name' => 'fpbk/acf-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:fpbk/acf-block {"name":"fpbk/acf-block","id":"id"} --><!-- /wp:fpbk/acf-block -->',
				],
			],
			'registered FPBK block with ACF prefix - no prevention added, output just try to render passed block' => [
				'input'    => [ 'name' => 'acf/fpbk-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/fpbk-block {"name":"acf/fpbk-block","id":"id"} --><!-- /wp:acf/fpbk-block -->',
				],
			],
			'not registered ACF nor FPBK - it try to renders blocks with ACF prefix' => [
				'input'    => [ 'name' => 'missing-block' ],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/missing-block {"name":"acf/missing-block","id":"id"} --><!-- /wp:acf/missing-block -->',
				],
			],

			'"data" attribute is removed and it\'s content is merged with standard "attrs" for FPBK blocks' => [
				'input'    => [
					'name'  => 'fpbk-block',
					'attrs' => [ 'data' => [ 'key' => 'value' ] ],
				],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:fpbk/fpbk-block {"name":"fpbk/fpbk-block","id":"id","key":"value"} --><!-- /wp:fpbk/fpbk-block -->',
				],
			],
			'"data" attribute is left untouched for ACF blocks' => [
				'input'    => [
					'name'  => 'acf-block',
					'attrs' => [ 'data' => [ 'key' => 'value' ] ],
				],
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/acf-block {"data":{"key":"value"},"name":"acf/acf-block","id":"id"} --><!-- /wp:acf/acf-block -->',
				],
			],

			'blocks passed as string without prefix'       => [
				'input'    => 'acf-block',
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/acf-block {"name":"acf/acf-block","id":"id"} --><!-- /wp:acf/acf-block -->',
				],
			],
			'blocks passed as string with prefix'          => [
				'input'    => 'acf/acf-block',
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => '<!-- wp:acf/acf-block {"name":"acf/acf-block","id":"id"} --><!-- /wp:acf/acf-block -->',
				],
			],

			'passed string that is not a valid block name' => [
				'input'    => 'some string',
				'expected' => [
					'do_blocks_called' => true,
					'do_blocks_output' => 'some string',
				],
			],
		];
	}
}
