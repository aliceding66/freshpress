<?php
/**
 * VatTextImage class.
 *
 * @package FreshpressBlocks\VatTextImage
 * @subpackage VatTextImage
 */

namespace FreshpressBlocks;

/**
 * Class VatTextImage

 * @package FreshpressBlocks
 */
class VatTextImageBlock extends ABlock {



	/**
	 * VatTextImageBlock constructor.
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
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['vat_text_image__image'] ) ) {
			$additional_template_data['vat_text_image__image'] = fp_render_img(
				$additional_template_data['vat_text_image__image'],
				[ 'class' => 'vat-text-image__image' ],
				'large'
			);
		}
		if ( ! empty( $additional_template_data['vat_text_image__background_color'] ) && ! empty( $additional_template_data['vat_text_image__background_color']['hex'] ) ) {
			$additional_template_data['background_attribute'] = "background-color: {$additional_template_data['vat_text_image__background_color']['hex']};";
		}
		return parent::get_template_data( $additional_template_data );
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
				'class' => 'vat-text-image',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
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
				'vat_text_image_crop' => [
					'type'    => 'boolean',
					'default' => false,
				],
			]
		);
	}
}
