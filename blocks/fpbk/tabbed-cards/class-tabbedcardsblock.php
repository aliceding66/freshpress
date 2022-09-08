<?php
/**
 * RatingBlock class.
 *
 * @package FreshpressBlocks\TabbedCardsBlock
 * @subpackage TabbedCardsBlock
 */

namespace FreshpressBlocks;

/**
 * Class TabbedCardsBlock
 *
 * @package FreshpressBlocks
 */
class TabbedCardsBlock extends ABlock {
	/**
	 * TabbedCardsBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'tabbed-cards' );
		$this->enqueue_style();
		$this->enqueue_editor_style();
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
				'nav-item'    => 'templates/nav-item.partial.mustache',
				'tab-content' => 'templates/tab-content.partial.mustache',
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
		if ( ! empty( $additional_template_data['cards'] ) && is_array( $additional_template_data['cards'] ) ) {
			foreach ( $additional_template_data['cards'] as $card_key => $card ) {
				$additional_template_data['cards'][ $card_key ]['card_id'] = "card-{$card_key}";
				$additional_template_data['cards'][ $card_key ]['active'] = 0 === $card_key ? 'active' : '';
			}
		}

		$additional_template_data['tab_y_padding'] = 'py-3';
		$additional_template_data['card_content_position'] = 'static';
		if (
			! empty( $additional_template_data['className'] )
			&& strpos( $additional_template_data['className'], 'is-style-new' ) !== false
		) {
			$additional_template_data['tab_y_padding'] = 'pt-2 pb-3';
			$additional_template_data['card_content_position'] = 'relative';
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
				'class' => 'm-0 p-0',
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

		$this->block_attributes['cards']['default'] = [
			[
				'tab_title'    => '',
				'card_content' => '',
			],
		];
	}
}
