<?php
/**
 * Iframe class.
 *
 * @package FreshpressBlocks\Iframe
 * @subpackage Iframe
 */

namespace FreshpressBlocks;

/**
 * Class Iframe

 * @package FreshpressBlocks
 */
class IframeBlock extends ABlock {
	/**
	 * IframeBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
		if ( ! empty( $attributes['iframe_url'] ) ) {
			$additional_attributes = [
				'class'       => 'm-0 p-0',
				'frameborder' => '0',
				'width'       => '100%',
				'src'         => $attributes['iframe_url'],
				'style'       => 'width: 100%',
			];

			if ( ! empty( $attributes['iframe_width'] ) ) {
				$additional_attributes['width'] = $attributes['iframe_width'];
				$additional_attributes['style'] = ( 'width: ' . $attributes['iframe_width'] . 'px;' );
			}

			if ( ! empty( $attributes['iframe_height'] ) ) {
				$additional_attributes['height'] = $attributes['iframe_height'];
			}

			$wrapper_properties = $this->get_wrapper_properties(
				$attributes,
				$additional_attributes
			);

			return "<iframe {$wrapper_properties}></iframe>";
		}

		return '';
	}
}
