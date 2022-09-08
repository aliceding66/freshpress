<?php
/**
 * BoxesBlock class.
 *
 * @package FreshpressBlocks\OneColumnBlock
 * @subpackage OneColumnBlock
 */

namespace FreshpressBlocks;

/**
 * Class OneColumnBlock
 *
 * @package FreshpressBlocks
 */
class OneColumnBlock extends ABlock {
	/**
	 * OneColumnBlock constructor.
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
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['one_column_image'] ) ) {
			$additional_template_data['one_column_image'] = fp_render_img(
				$additional_template_data['one_column_image'],
				[
					'class' => 'one-column__image d-block mx-auto h-auto',
				],
				'full'
			);
		}

		if ( ! empty( $additional_template_data['one_column_cta'] ) ) {
			$additional_template_data['one_column_cta'] = fp_generate_link_html(
				$additional_template_data['one_column_cta'],
				[
					'className' => 'btn btn-white mb-5',
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
				'class' => 'one-column',
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
