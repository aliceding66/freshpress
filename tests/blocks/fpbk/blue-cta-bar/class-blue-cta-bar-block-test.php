<?php
/**
 * Tests BlueCtaBarBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Blue CTA Bar block Test suite.
 */
class Blue_Cta_Bar_Block_Test extends Fpbk_Blocks_Base_Test {

	/**
	 * Block element.
	 *
	 * @var \FreshpressBlocks\ABlock
	 */
	private $block;

	/**
	 * Blue_Cta_Bar_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
		$this->block = $this->get_fpbk_block( 'blue-cta-bar' );
	}

	/**
	 * Checks whether default values are set.
	 */
	public function testDefaultValueAreSet() {
		$template_data = $this->block->get_template_data();

		// Check if default image is <img /> tag with src property set.
		$this->assertArrayHasKey( 'blue_cta_bar_image', $template_data );
		$this->assertNotEmpty( $template_data['blue_cta_bar_image'] );
		$this->assertStringContainsImgNode( $template_data['blue_cta_bar_image'] );
		$this->assertRegExp( '/src=".+"/', $template_data['blue_cta_bar_image'] );

		// Check if default title is set.
		$this->assertArrayHasKey( 'blue_cta_bar_title', $template_data );
		$this->assertNotEmpty( $template_data['blue_cta_bar_title'] );

		// Check if default text is set.
		$this->assertArrayHasKey( 'blue_cta_bar_text', $template_data );
		$this->assertNotEmpty( $template_data['blue_cta_bar_text'] );

		// Check if default link is set.
		$this->assertIsArray( $template_data['blue_cta_bar_cta'] );
		$this->assertArrayHasKey( 'url', $template_data['blue_cta_bar_cta'] );
		$this->assertArrayHasKey( 'title', $template_data['blue_cta_bar_cta'] );
		$this->assertNotEmpty( $template_data['blue_cta_bar_cta']['url'] );
		$this->assertNotEmpty( $template_data['blue_cta_bar_cta']['title'] );
	}

	/**
	 * Check whether CTA is always fully filled for different cases.
	 *
	 * @dataProvider dataCtaCases
	 * @param mixed $cta_case Single case data.
	 */
	public function testIfCtaIsAlwaysFilled( $cta_case ) {
		$template_data = $this->block->get_template_data( [ 'blue_cta_bar_cta' => $cta_case ] );

		$this->assertIsArray( $template_data['blue_cta_bar_cta'] );
		$this->assertArrayHasKey( 'url', $template_data['blue_cta_bar_cta'] );
		$this->assertNotEmpty( $template_data['blue_cta_bar_cta']['url'] );
		$this->assertArrayHasKey( 'title', $template_data['blue_cta_bar_cta'] );
		$this->assertNotEmpty( $template_data['blue_cta_bar_cta']['title'] );
	}

	/**
	 * Data provider for testIfCtaIsAlwaysFilled().
	 *
	 * @return array
	 */
	public function dataCtaCases() {
		return [
			'empty string'  => [
				'',
			],
			'empty array'   => [
				[],
			],
			'missing title' => [
				[
					'url' => 'https://example.com',
				],
			],
			'empty title'   => [
				[
					'url'   => 'https://example.com',
					'title' => '',
				],
			],
		];
	}
}
