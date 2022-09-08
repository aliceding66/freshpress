<?php
/**
 * ColumnBlock class.
 *
 * @package FreshpressBlocks\ColumnBlock
 * @subpackage ColumnBlock
 */

namespace FreshpressBlocks;

/**
 * Class ColumnBlock
 *
 * @package ColumnBlock
 */
class ColumnBlock extends ABlock {
	/**
	 * ColumnBlock constructor.
	 *
	 * @param string $dir Just pass __DIR__ here.
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
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "column my-0 {$attributes['bootstrap_class']}",
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
				'bootstrap_class' => [
					'type'    => 'string',
					'default' => 'col-12 col-md-6',
				],
			]
		);
	}
}
