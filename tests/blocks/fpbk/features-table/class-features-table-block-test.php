<?php
/**
 * Tests FeaturesTableBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Features Table block Test suite.
 */
class Features_Table_Block_Test extends Fpbk_Blocks_Base_Test {

	/**
	 * Block object.
	 *
	 * @var \FreshpressBlocks\ABlock
	 */
	private $block;

	/**
	 * Default attributes.
	 *
	 * @var array
	 */
	private $default_attributes = [
		'table_width_0'    => '',
		'table_row_titles' => [],
	];

	/**
	 * Features_Table_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
		$this->block = $this->get_fpbk_block( 'features-table' );
	}

	/**
	 * Checks whether template data is formatted correctly.
	 *
	 * @param string $message Error message to be shown.
	 * @param array  $attributes Block attributes to be passed.
	 * @param array  $expected Expected output.
	 * @dataProvider templateDataFormattedCorrectlyProvider
	 */
	public function testIfTemplateDataIsFormattedCorrectly( $message, $attributes, $expected ) {
		$template_data = $this->block->get_template_data( array_merge( $this->default_attributes, $attributes ) );
		$this->assertArrayContainsArray( $template_data, $expected, $message );
	}

	/**
	 * Checks whether image attributes are created correctly.
	 */
	public function testIfImageDataIsPassedCorrectly() {
		$template_data = $this->block->get_template_data( $this->default_attributes );

		$image_asset_prefixes = [ 'mark_check_green', 'mark_check_grey', 'mark_x' ];
		foreach ( $image_asset_prefixes as $image_asset_prefix ) {
			$image = "{$image_asset_prefix}_image";
			$src = "{$image_asset_prefix}_src";

			$this->assertArrayHasKey( $image, $template_data );
			$this->assertArrayHasKey( $src, $template_data );
			$this->assertStringContainsImgNode( $template_data[ $image ] );
			$this->assertStringContainsString( $template_data[ $src ], $template_data[ $image ] );
		}
	}

	/**
	 * Data provider for testIfTemplateDataIsFormattedCorrectly.
	 *
	 * @return array
	 */
	public function templateDataFormattedCorrectlyProvider() {
		$example_colour = [ 'hex' => '#123456' ];
		$example_width = '123px';
		$example_row_title = [
			'title'     => 'Row title',
			'padding'   => 'normal',
			'font_size' => 'small',
		];
		$example_row = [
			'mark_check_green'  => true,
			'mark_check_grey'   => false,
			'mark_x'            => false,
			'list_exists'       => true,
			'list'              => [ [ 'text' => 'List item' ] ],
			'paragraphs'        => [ [ 'text' => 'Paragraph' ] ],
			'background_colour' => [],
		];

		return [
			[
				'Column heading data are passed incorrectly.',
				[
					'table_heading_1'           => 'Heading 1',
					'table_background_colour_1' => $example_colour,
					'table_heading_2'           => 'Heading 2',
					'table_width_2'             => $example_width,
					'table_heading_3'           => 'Heading 3',
					'table_background_colour_3' => $example_colour,
					'table_width_3'             => $example_width,
					'table_heading_4'           => 'Heading 4',
				],
				[
					'columns' => [
						[
							'heading'           => 'Heading 1',
							'background_colour' => $example_colour,
							'width'             => '',
						],
						[
							'heading'           => 'Heading 2',
							'background_colour' => [],
							'width'             => $example_width,
						],
						[
							'heading'           => 'Heading 3',
							'background_colour' => $example_colour,
							'width'             => $example_width,
						],
						[
							'heading'           => 'Heading 4',
							'background_colour' => [],
							'width'             => '',
						],
					],
				],
			],
			[
				'Empty column heading must be omitted.',
				[
					'table_heading_1'           => '',
					'table_background_colour_1' => $example_colour,
					'table_width_1'             => $example_width,
				],
				[ 'columns' => [] ],
			],
			[
				'Middle/before last empty column heading must be created.',
				[
					'table_heading_1'           => '',
					'table_background_colour_1' => $example_colour,
					'table_heading_2'           => '',
					'table_width_2'             => $example_width,
					'table_heading_3'           => '',
					'table_background_colour_3' => $example_colour,
					'table_width_3'             => $example_width,
					'table_heading_4'           => '',
					'table_heading_5'           => 'Heading 5',
				],
				[
					'columns' => [
						[
							'heading'           => '',
							'background_colour' => $example_colour,
							'width'             => '',
						],
						[
							'heading'           => '',
							'background_colour' => [],
							'width'             => $example_width,
						],
						[
							'heading'           => '',
							'background_colour' => $example_colour,
							'width'             => $example_width,
						],
						[
							'heading'           => '',
							'background_colour' => [],
							'width'             => '',
						],
						[
							'heading'           => 'Heading 5',
							'background_colour' => [],
							'width'             => '',
						],
					],
				],
			],
			[
				'Title column width is formatted correctly.',
				[ 'table_width_0' => $example_width ],
				[ 'title_column_width' => $example_width ],
			],
			[
				'Row titles are passed correctly.',
				[
					'table_row_titles' => [
						$example_row_title,
						[],
						$example_row_title,
					],
				],
				[
					'row_titles' => [
						$example_row_title,
						[],
						$example_row_title,
					],
				],
			],
			[
				'Column rows are formatted correctly.',
				[
					'table_row_titles'    => [ $example_row_title ],
					'table_heading_1'     => 'Heading 1',
					'table_column_1_rows' => [ $example_row ],
				],
				[ 'row_titles' => [ array_merge( $example_row_title, [ 'row_columns' => [ $example_row ] ] ) ] ],
			],
			[
				'Column header background colour must be passed to column rows.',
				[
					'table_heading_1'           => 'Heading 1',
					'table_background_colour_1' => $example_colour,
					'table_row_titles'          => [ $example_row_title ],
					'table_column_1_rows'       => [ $example_row ],
				],
				[ 'row_titles' => [ array_merge( $example_row_title, [ 'row_columns' => [ array_merge( $example_row, [ 'background_colour' => $example_colour ] ) ] ] ) ] ],
			],
		];
	}
}
