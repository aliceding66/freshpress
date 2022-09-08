<?php
/**
 * ConfirmationBoxBlock class.
 *
 * @package FreshpressBlocks\ConfirmationBoxBlock
 * @subpackage ConfirmationBoxBlock
 */

namespace FreshpressBlocks;

/**
 * Class ConfirmationBoxBlock
 *
 * @package FreshpressBlocks
 */
class ConfirmationBoxBlock extends ABlock {
	/**
	 * ConfirmationBoxBlock constructor.
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
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$template_data = parent::get_template_data( $additional_template_data );

		if ( ! empty( $template_data['confirmation_box_cta'] ) ) {
			$template_data['confirmation_box_cta'] = fp_generate_link_html( $template_data['confirmation_box_cta'], [ 'className' => 'confirmation-box__cta btn btn-cta-green px-4 py-3' ] );
		}

		return $template_data;
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
				'class' => 'mx-auto text-center',
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
