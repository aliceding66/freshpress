<?php
/**
 * FreshbookersGridBar class.
 *
 * @package FreshpressBlocks\FreshbookersGridBar
 * @subpackage FreshbookersGridBar
 */

namespace FreshpressBlocks;

/**
 * Class FreshbookersGridBar

 * @package FreshpressBlocks
 */
class FreshbookersGridBarBlock extends ABlock {
	/**
	 * FreshbookersGridBarBlock constructor.
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
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'd-flex flex-wrap no-gutters',
			]
		);

		$inner_content = '';

		if ( ! empty( $attributes['freshbookers'] ) ) {
			foreach ( $attributes['freshbookers'] as $key => $freshbooker ) {
				$display_class = 'd-none';

				if ( $key < 6 ) {
					$display_class = 'd-block';
				} elseif ( $key < 8 ) {
					$display_class .= ' d-sm-block';
				} elseif ( $key < 12 ) {
					$display_class .= ' d-md-block';
				} elseif ( $key < 16 ) {
					$display_class .= ' d-lg-block';
				} elseif ( $key < 20 ) {
					$display_class .= ' d-xl-block';
				}
				$inline_image_style = ! empty( $freshbooker['freshbooker_thumbnail'] ) ? 'style="background-image: url(' . esc_url( $freshbooker['freshbooker_thumbnail']['url'] ) . ');"' : '';
				$inner_content .= "<div class='freshbookers-grid-bar__item position-relative $display_class' $inline_image_style></div>";
			}
		}

		return <<< HTML
<div {$wrapper_properties}>
	{$inner_content}
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

		$this->block_attributes['freshbookers']['default'] = array_fill(
			0,
			20,
			[
				'freshbooker_thumbnail' => [
					'id'  => '',
					'url' => '',
					'alt' => '',
				],
			]
		);
	}
}
