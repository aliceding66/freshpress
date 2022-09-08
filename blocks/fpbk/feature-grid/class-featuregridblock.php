<?php
/**
 * FeatureGrid class.
 *
 * @package FreshpressBlocks\FeatureGrid
 * @subpackage FeatureGrid
 */

namespace FreshpressBlocks;

/**
 * Class FeatureGrid
 *
 * @package FreshpressBlocks
 */
class FeatureGridBlock extends ABlock {
	/**
	 * FeatureGridBlock constructor.
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
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$this->set_template_partials(
			[
				'partial__tile_with_image'    => 'templates/tile_with_image.partial.mustache',
				'partial__tile_without_image' => 'templates/tile_without_image.partial.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		if ( ! empty( $additional_template_data['grid_main_tile_image'] ) ) {
			$additional_template_data['grid_main_tile_image'] = $this->render_img(
				$additional_template_data['grid_main_tile_image'],
				'feature-grid__tile-image d-block m-auto rounded'
			);
		}

		foreach ( $additional_template_data['grid_tiles'] as $tile_key => $tile ) {
			$additional_template_data['grid_tiles'][ $tile_key ]['image'] = $this->render_img( $tile['image'], 'feature-grid__tile-image m-auto rounded' );
		}

		if ( ! empty( $additional_template_data['cta_box_cta'] ) ) {
			$additional_template_data['cta_box_cta'] = fp_generate_link_html( $additional_template_data['cta_box_cta'], [ 'className' => 'btn btn-cta-green feature-grid__cta-box__cta-button fp-animate fp-animate__swing-in-bottom px-5 px-lg-3 px-xxl-5 py-2 mt-5 font-weight-medium h4 text-left text-nowrap' ] );
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
				'class' => 'wide-block row my-0',
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
	 * Helper function to generate proper <img /> HTML string.
	 *
	 * @param array  $image Array object of image.
	 * @param string $class_name Class attribute to be set on <img />.
	 *
	 * @return string
	 */
	private function render_img( $image, $class_name ) {
		$url = $image['url'];
		if ( ! empty( $image['sizes'] ) && ! empty( $image['sizes']['medium'] ) && ! empty( $image['sizes']['url'] ) ) {
			$url = $image['sizes']['medium']['url'];
		}

		if ( ! empty( $url ) ) {
			return <<< HTML
<img
	class="{$class_name}"
	src="{$url}"
	alt="{$image['alt']}"
	{$this->get_image_half_size_attributes( $image )}
/>
HTML;
		} else {
			return null;
		}
	}

	/**
	 * Helper function that returns half-sized attributes for <img />.
	 *
	 * @param array $image Array object of image.
	 *
	 * @return string
	 */
	private function get_image_half_size_attributes( $image ) {
		$sizes = '';
		if ( ! empty( $image['width'] ) ) {
			$sizes .= ' width="' . ( intval( $image['width'] / 2 ) ) . '"';
		}
		if ( ! empty( $image['height'] ) ) {
			$sizes .= ' height="' . ( intval( $image['height'] / 2 ) ) . '"';
		}

		return $sizes;
	}
}
