<?php
/**
 * Tests FeatureGridBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Feature Grid block Test suite.
 */
class Feature_Grid_Block_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Button_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
	}

	/**
	 * Checks whether images used in block has correctly set half of it's image original size.
	 */
	public function testIfImagesHasHalfOfSizeSetCorrectly() {
		$block = $this->get_fpbk_block( 'feature-grid' );
		// Image with even width and height.
		$image_even = [
			'url'    => 'even_img.png',
			'alt'    => 'Even image',
			'width'  => 10,
			'height' => 20,
		];
		// Image with odd width and height.
		$image_odd = [
			'url'    => 'odd_img.png',
			'alt'    => 'Odd image',
			'width'  => 21,
			'height' => 41,
		];

		$template_data = $block->get_template_data(
			[
				'grid_main_tile_image' => $image_even,
				'grid_tiles'           => [
					[
						'image' => $image_even,
					],
					[
						'image' => $image_odd,
					],
				],
			]
		);

		// Check if main tile has properly half-sized image.
		$this->assertArrayHasKey( 'grid_main_tile_image', $template_data );
		$this->assertStringContainsImgNode( $template_data['grid_main_tile_image'] );
		$this->assertRegExp( '/width="5"/', $template_data['grid_main_tile_image'] );
		$this->assertRegExp( '/height="10"/', $template_data['grid_main_tile_image'] );

		// Check if tiles has properly half-sized images. Odd sizes should be parsed as int.
		$this->assertArrayHasKey( 'grid_tiles', $template_data );
		$this->assertCount( 2, $template_data['grid_tiles'] );
		// First tile.
		$this->assertArrayHasKey( 'image', $template_data['grid_tiles'][0] );
		$this->assertStringContainsImgNode( $template_data['grid_tiles'][0]['image'] );
		$this->assertRegExp( '/width="5"/', $template_data['grid_tiles'][0]['image'] );
		$this->assertRegExp( '/height="10"/', $template_data['grid_tiles'][0]['image'] );
		// Second tile.
		$this->assertArrayHasKey( 'image', $template_data['grid_tiles'][1] );
		$this->assertStringContainsImgNode( $template_data['grid_tiles'][1]['image'] );
		$this->assertRegExp( '/width="10"/', $template_data['grid_tiles'][1]['image'] );
		$this->assertRegExp( '/height="20"/', $template_data['grid_tiles'][1]['image'] );
	}
}
