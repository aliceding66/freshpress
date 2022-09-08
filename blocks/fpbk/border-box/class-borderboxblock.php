<?php
/**
 * BorderBox class.
 *
 * @package FreshpressBlocks\BorderBox
 * @subpackage BorderBox
 */

namespace FreshpressBlocks;

/**
 * Class BorderBox

 * @package FreshpressBlocks
 */
class BorderBoxBlock extends ABlock {
	/**
	 * BorderBoxBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();
	}

	/**
	 * Generate styles for the block.
	 *
	 * @param array $attributes Block's attributes.
	 *
	 * @return string
	 */
	private function get_styles( array $attributes ) {
		$style = '';

		if ( ! empty( $this->get_block_id( $attributes ) ) ) {
			$background_selector = '#' . esc_html( $this->get_block_id( $attributes ) );
			$background_color = ! empty( $attributes['background_colour'] ) ? 'background-color: ' . esc_html( $attributes['background_colour']['hex'] ) . ';' : '';
			$max_width = ! empty( $attributes['max_width'] ) ? 'max-width: ' . esc_html( $attributes['max_width'] ) . ';' : '';
			$border_color = ! empty( $attributes['border_colour'] ) && is_array( $attributes['border_colour'] ) && ! empty( $attributes['border_colour']['hex'] ) ? 'border-color: ' . esc_html( $attributes['border_colour']['hex'] ) . ' !important;' : '';
			$negative_margin = ! empty( $attributes['negative_margin'] ) ? 'margin-top: -' . esc_html( $attributes['negative_margin'] ) . 'px;' : '';

			if (
				! empty( $background_color ) ||
				! empty( $max_width ) ||
				! empty( $border_color ) ||
				! empty( $negative_margin )
			) {
				$style = <<<STYLE
<style>
	$background_selector {
		$background_color
		$max_width
		$border_color
		$negative_margin
	}
</style>
STYLE;
			}
		}

		return $style;
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
		$class_name = 'no-gutters';
		if ( 'none' !== $attributes['border_type'] ) {
			$class_name .= ' border';
		}

		if ( 'rounded' === $attributes['border_radius'] ) {
			$class_name .= ' rounded';
		}

		if ( ! empty( $attributes['align'] ) ) {
			if ( 'right' === $attributes['align'] ) {
				$class_name .= ' ml-md-auto mr-md-0';
			} elseif ( 'left' === $attributes['align'] ) {
				$class_name .= ' mr-md-auto ml-md-0';
			} else {
				$class_name .= ' mx-auto';
			}
		}

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => $class_name,
			]
		);

		$style = $this->get_styles( $attributes );

		return <<< HTML
{$style}
<div {$wrapper_properties}>
	{$inner_blocks_content}
</div>
HTML;
	}
}
