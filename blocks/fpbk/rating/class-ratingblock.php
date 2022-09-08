<?php
/**
 * RatingBlock class.
 *
 * @package FreshpressBlocks\RatingBlock
 * @subpackage RatingBlock
 */

namespace FreshpressBlocks;

use FP_Site_Options;

/**
 * Class RatingBlock
 *
 * @package FreshpressBlocks
 */
class RatingBlock extends ABlock {
	/**
	 * RatingBlock constructor.
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
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		if ( empty( $attributes['block_settings_tracking_section'] ) ) {
			$attributes['block_settings_tracking_section'] = 'rating';
		}

		if ( empty( $attributes['rating_wrap'] ) ) {
			$attributes['rating_wrap'] = 1;
		}

		if ( empty( $attributes['rating_image'] ) ) {
			$attributes['rating_image'] = 'white_green';
		}

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "rating__wrap_{$attributes['rating_wrap']} d-flex justify-content-center py-4 m-auto text-center",
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
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$template_data = parent::get_template_data( $additional_template_data );

		$images = $template_data['images'];
		$selected_image = $template_data['rating_image'];
		$template_data['rating_image'] = ! empty( $images[ $selected_image ] ) ? $images[ $selected_image ] : $images['white_green'];
		unset( $template_data['images'] );

		return $template_data;
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		 $reviews_number = number_format_i18n( FP_Site_Options::get_option( 'getapp_reviews' ) );
		// translators: ratings widget.
		$rating_link = fp_noesc( fp_sprintf( __( '(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/" target="_blank" >%1$s GetApp reviews</a>)', 'freshpress-website' ), [ $reviews_number ] ) );
		$rating_image_options = [
			'class' => 'rating__star-image d-inline-block',
			'alt'   => esc_html_x( '4.5 stars', 'GetApp rating', 'freshpress-website' ),
		];

		$this->set_static_template_data(
			[
				'get_app_rating_text' => esc_html_x( 'Excellent', 'GetApp rating text', 'freshpress-website' ),
				'rating_link'         => $rating_link,
				'images'              => [
					'white_green'  => fp_render_img( 'images/rating/white-green.svg', $rating_image_options ),
					'yellow'       => fp_render_img( 'images/rating/yellow.svg', $rating_image_options ),
					'white_yellow' => fp_render_img( 'images/rating/white-yellow.svg', $rating_image_options ),
				],
			],
			'ratingTemplateData'
		);
	}
}
