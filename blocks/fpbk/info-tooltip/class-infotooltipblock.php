<?php
/**
 * InfoTooltip class.
 *
 * @package FreshpressBlocks\InfoTooltip
 * @subpackage InfoTooltip
 */

namespace FreshpressBlocks;

/**
 * Class InfoTooltip
 *
 * @package FreshpressBlocks
 */
class InfoTooltipBlock extends ABlock {
	/**
	 * InfoTooltipBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'info-tooltip-block' );
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
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'd-inline-block m-0',
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
		if ( function_exists( 'fp_render_img' ) ) {
			$this->set_static_template_data(
				[
					'icon' => fp_render_img(
						'images/icons/icon-info-circle.svg',
						[
							'class' => 'info-tooltip__icon h-auto',
							'alt'   => __(
								'Info Tooltip',
								'freshpress-website'
							),
						]
					),
				],
				'infoTooltipTemplateData'
			);
		}
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
				'copy' => [
					'label' => __( 'Copy', 'freshpress-website' ),
					'type'  => 'string',
				],
			]
		);
	}
}
