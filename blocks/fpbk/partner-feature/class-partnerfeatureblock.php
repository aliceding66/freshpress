<?php
/**
 * PartnerFeature class.
 *
 * @package FreshpressBlocks\PartnerFeature
 * @subpackage PartnerFeature
 */

namespace FreshpressBlocks;

/**
 * Class PartnerFeature

 * @package FreshpressBlocks
 */
class PartnerFeatureBlock extends ABlock {
	/**
	 * PartnerFeatureBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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

		$additional_template_data['text_class'] = ! empty( $additional_template_data['partner_feature_image'] ) ? 'text-sm-left' : '';

		$additional_template_data['partner_feature_image'] = fp_render_img(
			$additional_template_data['partner_feature_image'],
			[
				'class' => 'wp-block-fpbk-partner-feature__image d-none d-sm-inline',
			]
		);

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
				'class' => 'partner-feature m-0 d-flex justify-content-center position-relative',
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

		$this->block_attributes['partner_feature_block_position']['default'] = 'lifted';
	}
}
