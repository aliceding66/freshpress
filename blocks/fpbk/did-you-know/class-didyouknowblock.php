<?php
/**
 * DidYouKnow class.
 *
 * @package FreshpressBlocks\DidYouKnow
 * @subpackage DidYouKnow
 */

namespace FreshpressBlocks;

/**
 * Class DidYouKnow

 * @package FreshpressBlocks
 */
class DidYouKnowBlock extends ABlock {
	/**
	 * DidYouKnowBlock constructor.
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

		$template_data = parent::get_template_data( $additional_template_data );

		if ( ! empty( $additional_template_data['did_you_know_image'] ) && ! empty( $additional_template_data['did_you_know_image']['url'] ) ) {
			$template_data['did_you_know_image'] = fp_render_img(
				$additional_template_data['did_you_know_image'],
				[
					'class' => 'did-you-know__image h-auto',
				]
			);
		}

		if ( ! empty( $template_data['did_you_know_cta'] ) ) {
			$template_data['did_you_know_cta'] = fp_generate_link_html( $template_data['did_you_know_cta'], [ 'className' => 'did-you-know__cta btn btn-cta-green btn-block btn-lg' ] );
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
				'class' => 'mx-auto mw-100 my-0 text-center',
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
