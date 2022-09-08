<?php
/**
 * LogoGroup class.
 *
 * @package FreshpressBlocks\LogoGroup
 * @subpackage LogoGroup
 */

namespace FreshpressBlocks;

/**
 * Class LogoGroup

 * @package FreshpressBlocks
 */
class LogoGroupBlock extends ABlock {
	/**
	 * LogoGroupBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
				'logo' => 'templates/logo.partial.mustache',
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
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['logos'] ) ) {
			foreach ( $additional_template_data['logos'] as $index => $logo ) {
				$additional_template_data['logos'][ $index ]['logo_class'] = 'logo-group__logo_';
				if ( 'svg' === $logo['logo_type'] ) {
					$additional_template_data['logos'][ $index ]['logo_class'] .= 'svg';
					$logo_field_name = 'logo_svg';
				} else {
					$additional_template_data['logos'][ $index ]['logo_class'] .= 'raster';
					$logo_field_name = 'logo_image';
				}

				$logo_resize_class = '';
				$adjust_logo_size = intval( $logo['adjust_logo_size'] );
				$decrease_logo_size = ! empty( $logo['decrease_logo_size'] ) ? $logo['decrease_logo_size'] : 0;
				$increase_logo_size = ! empty( $logo['increase_logo_size'] ) ? $logo['increase_logo_size'] : 0;
				if ( 0 !== $adjust_logo_size ) {
					$direction = 1 === $adjust_logo_size ? 'increase' : 'decrease';
					$amount = 1 === $adjust_logo_size ? $increase_logo_size : $decrease_logo_size;
					$logo_resize_class = 'logo-group__logo_' . $direction . '_' . $amount;
				}

				if ( ! empty( $logo[ $logo_field_name ] ) ) {
					$additional_template_data['logos'][ $index ]['logo'] = fp_render_img(
						$logo[ $logo_field_name ],
						[
							'class' => "logo-group__logo w-auto skip-lazy {$logo_resize_class}",
						]
					);
				} else {
					$additional_template_data['logos'][ $index ]['logo'] = '';
				}
			}
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
		$hide_lines = ! empty( $attributes['logo_group_hide_lines'] ) && $attributes['logo_group_hide_lines'] ? 'hide-lines ' : '';
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "logo-group {$hide_lines}",
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

		$this->block_attributes['headline']['default'] = _x( 'FEATURED IN', 'Featured in Headline', 'freshpress-website' );
	}
}
