<?php
/**
 * BoxesBlock class.
 *
 * @package FreshpressBlocks\BoxesBlock
 * @subpackage BoxesBlock
 */

namespace FreshpressBlocks;

/**
 * Class BoxesBlock
 *
 * @package FreshpressBlocks
 */
class BoxesBlock extends ABlock {
	/**
	 * BoxesBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();
		$this->enqueue_editor_style();
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
		$style_node = $this->get_style_node( $attributes );

		$align_class = 'mx-auto';
		if ( ! empty( $attributes['align'] ) && 'right' === $attributes['align'] ) {
			$align_class = ' ml-lg-auto mr-lg-0';
		} elseif ( ! empty( $attributes['align'] ) && 'left' === $attributes['align'] ) {
			$align_class = ' mr-lg-auto ml-lg-0';
		}

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "box mt-0 mb-2 {$align_class}",
			]
		);

		return <<< HTML
<div {$wrapper_properties}>
    {$style_node}
	{$inner_blocks_content}
</div>
HTML;
	}

	/**
	 * Returns style node if should be applied.
	 *
	 * @param array $attributes Block's attributes.
	 * @return string
	 */
	private function get_style_node( $attributes ) {
		if ( ! empty( $attributes['boxes_max_width'] ) && ! empty( $this->get_block_id( $attributes ) ) ) {
			return <<< HTML
<style>
    #{$this->get_block_id( $attributes )} {
        max-width: {$attributes['boxes_max_width']};
    }
</style>
HTML;

		}

		return '';
	}
}
