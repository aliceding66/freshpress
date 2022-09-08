<?php
/**
 * RatingBlock class.
 *
 * @package FreshpressBlocks\WhiteCardBlock
 * @subpackage WhiteCardBlock
 */

namespace FreshpressBlocks;

/**
 * Class WhiteCardBlock
 *
 * @package FreshpressBlocks
 */
class WhiteCardBlock extends ABlock {
	/**
	 * WhiteCardBlock constructor.
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
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['white_card_image'] ) ) {
			$additional_template_data['white_card_image'] = fp_render_img(
				$additional_template_data['white_card_image'],
				[ 'class' => 'white-card__image w-auto h-auto d-block mx-auto mb-5 mb-md-0' ]
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
		$white_card_display_background = ! empty( $attributes['white_card_display_background'] ) && $attributes['white_card_display_background'] ? $attributes['white_card_display_background'] : '';

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => $white_card_display_background ? 'white-card-with-secondary-content' : '',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		if ( $white_card_display_background ) {
			$inner_blocks_content = <<< HTML
<div class="white-card__secondary-content no-gutters" >
	$inner_blocks_content
</div >
HTML;
		}

		return <<< HTML
<div {$wrapper_properties}>
	{$inner_blocks_content}
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
				'fb_phone_number'  => \FP_Site_Options::get_option( 'fb_phone_number' ),
				'fb_support_email' => \FP_Site_Options::get_option( 'fb_support_email' ),
			],
			'whiteCardTemplateData'
		);
	}
}
