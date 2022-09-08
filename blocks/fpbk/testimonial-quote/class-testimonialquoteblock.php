<?php
/**
 * RatingBlock class.
 *
 * @package FreshpressBlocks\TestimonialQuoteBlock
 * @subpackage TestimonialQuoteBlock
 */

namespace FreshpressBlocks;

/**
 * Class TestimonialQuoteBlock
 *
 * @package FreshpressBlocks
 */
class TestimonialQuoteBlock extends ABlock {
	/**
	 * TestimonialQuoteBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();

		$this->initiate_template_data();
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['testimonial_quote_image'] ) ) {
			$additional_template_data['testimonial_quote_image'] = fp_render_img(
				$additional_template_data['testimonial_quote_image'],
				[ 'class' => 'testimonial-quote__image' ]
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
		$display_rating_class = $attributes['testimonial_quote_display_rating'] ? 'testimonial-quote_with-rating' : '';
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "testimonial-quote d-flex mx-auto px-3 flex-column flex-lg-row {$display_rating_class}",
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
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'getapp_reviews' => esc_html_x( 'Reviews Tell Our Story', 'Get App Reviews Widget', 'freshpress-website' ),
				'rating_block'   => fp_render_blocks( 'fpbk/rating' ),
			],
			'testimonialQuoteTemplateData'
		);
	}
}
