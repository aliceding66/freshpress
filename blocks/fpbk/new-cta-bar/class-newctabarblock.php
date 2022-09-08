<?php
/**
 * NewCtaBar class.
 *
 * @package FreshpressBlocks\NewCtaBar
 * @subpackage NewCtaBar
 */

namespace FreshpressBlocks;

/**
 * Class NewCtaBar
 *
 * @package FreshpressBlocks
 */
class NewCtaBarBlock extends ABlock {
	/**
	 * NewCtaBarBlock constructor.
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
		$common_image_classes = 'new-cta-bar__image fp-animate fp-animate--offscreen-reset position-absolute';

		if ( ! empty( $additional_template_data['images_left'] ) ) {
			$additional_template_data['images_left'] = fp_render_img(
				$additional_template_data['images_left'],
				[
					'class' => "$common_image_classes new-cta-bar__image-left fp-animate__slide_in_left",
				]
			);
		}

		if ( ! empty( $additional_template_data['images_top_right'] ) ) {
			$additional_template_data['images_top_right'] = fp_render_img(
				$additional_template_data['images_top_right'],
				[
					'class' => "$common_image_classes new-cta-bar__image-top-right fp-animate__slide_in_right fp-animate--order-3",
				]
			);
		}

		if ( ! empty( $additional_template_data['images_bottom_right'] ) ) {
			$additional_template_data['images_bottom_right'] = fp_render_img(
				$additional_template_data['images_bottom_right'],
				[
					'class' => "$common_image_classes new-cta-bar__image-bottom-right fp-animate__slide_in_right fp-animate--order-3",
				]
			);
		}

		if ( ! empty( $additional_template_data['background_color'] ) && ! empty( $additional_template_data['background_color']['hex'] ) ) {
			$additional_template_data['background_attribute'] = "background-color: {$additional_template_data['background_color']['hex']};";
		}

		if ( ! empty( $additional_template_data['cta_link'] ) ) {
			$additional_template_data['cta_link'] = fp_generate_link_html(
				$additional_template_data['cta_link'],
				[
					'className' => 'btn btn-cta-green new-cta-bar__cta-button font-weight-medium text-nowrap',
				]
			);
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
				'class' => 'wide-block my-0 row',
			]
		);

		$attributes['inner_blocks'] = $inner_blocks_content;
		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
