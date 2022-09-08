<?php
/**
 * Animate class.
 *
 * @package FreshpressBlocks\Animate
 * @subpackage Animate
 */

namespace FreshpressBlocks;

/**
 * Class Animate

 * @package FreshpressBlocks
 */
class AnimateBlock extends ABlock {
	/**
	 * AnimateBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
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

		if ( ! empty( $template_data['animations'] ) && is_array( $template_data['animations'] ) ) {
			$template_data['multiple_animations'] = count( $template_data['animations'] ) > 1;

			foreach ( $template_data['animations'] as $key => $animation ) {
				$animation_class = "fp-animate fp-animate__{$animation['animation']}";
				if ( 'hover' === $animation['trigger'] ) {
					$animation_class .= " fp-animate__{$animation['animation']}--on-hover";
				} else {
					if ( $animation['delay'] > 0 ) {
						$animation_class .= " fp-animate--delay-{$animation['delay']}";
					}

					if ( $animation['offscreen_reset'] ) {
						$animation_class .= ' fp-animate--offscreen-reset';
					}
				}

				$template_data['animations'][ $key ]['animation_class'] = $animation_class;
			}
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
		$wrapper_properties = $this->get_wrapper_properties( $attributes );
		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( array_merge( $attributes, [ 'inner_blocks_content' => $inner_blocks_content ] ) ) );

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

		$this->set_block_attributes(
			[
				'animations' => [
					'type'    => 'array',
					'default' => [
						[
							'animation'       => '',
							'trigger'         => 'page_load',
							'delay'           => 0,
							'offscreen_reset' => false,
							'key'             => 'animation_0',
						],
					],
				],
			]
		);
	}
}
