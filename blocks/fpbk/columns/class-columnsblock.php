<?php
/**
 * Columns class.
 *
 * @package FreshpressBlocks\Columns
 * @subpackage Columns
 */

namespace FreshpressBlocks;

/**
 * Class Columns

 * @package FreshpressBlocks
 */
class ColumnsBlock extends ABlock {
	/**
	 * ColumnsBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
		$this->enqueue_style();
	}

	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$same_height = $attributes['same_height'] ? 'columns--same-height' : '';
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class'              => "columns row my-0 {$same_height}",
				'data-column-layout' => $attributes['data-column-layout'],
			]
		);

		return <<< HTML
<div {$wrapper_properties}>
    {$inner_blocks_content}
</div>
HTML;
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		$this->set_block_attributes(
			[
				'same_height'        => [
					'type'    => 'boolean',
					'default' => false,
				],
				'data-column-layout' => [
					'type'    => 'string',
					'label'   => 'Data column layout',
					'default' => '',
				],
			]
		);
	}
}
