<?php
/**
 * BoxesBlock class.
 *
 * @package FreshpressBlocks\PardotFormBlock
 * @subpackage PardotFormBlock
 */

namespace FreshpressBlocks;

/**
 * Class PardotFormBlock
 *
 * @package FreshpressBlocks
 */
class PardotFormBlock extends ABlock {
	/**
	 * PardotFormBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'pardot-form' );
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
				'class'          => 'm-0 p-0',
				'data-form-name' => $attributes['pardot_form_form_name'],
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $attributes );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
