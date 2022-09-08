<?php
/**
 * BoxesBlock class.
 *
 * @package FreshpressBlocks\ButtonBlock
 * @subpackage ButtonBlock
 */

namespace FreshpressBlocks;

/**
 * Class ButtonBlock
 *
 * @package FreshpressBlocks
 */
class ButtonBlock extends ABlock {
	/**
	 * ButtonBlock constructor.
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
		$template_data = parent::get_template_data( $additional_template_data );

		if ( ! empty( $additional_template_data['button_click_action'] ) && 'open_modal' === $additional_template_data['button_click_action'] ) {
			$template_data['button_link']['target'] = 'modal';
		} else if ( ! empty( $additional_template_data['button_click_action'] ) && 'open_drift' === $additional_template_data['button_click_action'] ) {
			$template_data['button_link']['target'] = 'drift';
		} else if ( ! empty( $additional_template_data['button_click_action'] ) && 'execute_script' === $additional_template_data['button_click_action'] ) {
			$template_data['button_link']['target'] = 'script';
		}

		$link_props = [];
		if ( ! empty( $additional_template_data['button_max_width'] ) ) {
			$link_props['style'] = 'max-width: ' . $additional_template_data['button_max_width'];
		}

		$default_button_class = ' btn-cta-green';
		if ( ! empty( $additional_template_data['className'] ) ) {
			$template_data['button_class_name'] = ( ' ' . $additional_template_data['className'] );

			if ( strpos( $additional_template_data['className'], 'is-style-btn-white' ) !== false ) {
				$template_data['button_class_name'] .= ' btn-white';
			} else if ( strpos( $additional_template_data['className'], 'is-style-btn-midnight-blue' ) !== false ) {
				$template_data['button_class_name'] .= ' btn-midnight-blue';
			} else {
				$template_data['button_class_name'] .= $default_button_class;
			}
		} else {
			$template_data['button_class_name'] = $default_button_class;
		}

		$link_props['className'] = 'btn' . $template_data['button_class_name'];
		if ( ! empty( $template_data['button_link'] ) ) {
			$template_data['button_link'] = fp_generate_link_html( $template_data['button_link'], $link_props );
		}

		return $template_data;
	}

	/**
	 * Function that is called inside "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$class_name = '';
		if ( ! empty( $attributes['className'] ) ) {
			$class_name = $attributes['className'];
			$attributes['className'] = '';
		}

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'button my-0',
			]
		);

		$attributes['className'] = $class_name;
		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
