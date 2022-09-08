<?php
/**
 * RatingBlock class.
 *
 * @package FreshpressBlocks\TestimonialColumnsBlock
 * @subpackage TestimonialColumnsBlock
 */

namespace FreshpressBlocks;

/**
 * Class TestimonialColumnsBlock
 *
 * @package FreshpressBlocks
 */
class TestimonialColumnsBlock extends ABlock {
	/**
	 * TestimonialColumnsBlock constructor.
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
				'header-partial' => 'templates/header.partial.mustache',
				'column-partial' => 'templates/column.partial.mustache',
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
		$common_column_class = 'col-12';

		if ( is_array( $additional_template_data['columns'] ) ) {
			$column_count = count( $additional_template_data['columns'] );
			if ( 2 === $column_count ) {
				$common_column_class = 'col-12 col-md-6';
			} elseif ( 3 === $column_count ) {
				$common_column_class = 'col-12 col-md-4 col-lg-4';
			}

			foreach ( $additional_template_data['columns'] as $column_index => $column ) {
				$margin_bottom_class = $column_index === $column_count - 1 ? ' mb-0' : ' mb-5 mb-md-0';
				$display_adjust_class = $column_index > 1 ? ' d-lg-flex' : '';
				$additional_template_data['columns'][ $column_index ]['column_classes'] = "{$common_column_class}{$margin_bottom_class}{$display_adjust_class}";

				if ( function_exists( 'fp_render_img' ) && ! empty( $column['author_photo'] ) ) {
					$additional_template_data['columns'][ $column_index ]['author_photo_html'] = fp_render_img( $column['author_photo'], [ 'class' => 'testimonial__photo h-auto' ] );
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
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'container-fluid px-md-4',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
