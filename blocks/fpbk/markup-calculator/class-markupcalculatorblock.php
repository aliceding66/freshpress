<?php
/**
 * MarkupCalculator class.
 *
 * @package FreshpressBlocks\MarkupCalculator
 * @subpackage MarkupCalculator
 */

namespace FreshpressBlocks;

/**
 * Class MarkupCalculator

 * @package FreshpressBlocks
 */
class MarkupCalculatorBlock extends ABlock {
	/**
	 * MarkupCalculatorBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'markup-calculator-block' );
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
				'data-tool' => 'MarkupCalculator',
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
				'labels' => [
					'title'               => __( 'Enter your markup information', 'freshpress-website' ),
					'subtitle'            => __( 'To get started, enter two of the fields below and we will automatically calculate the rest.', 'freshpress-website' ),
					'tooltip_content'     => __( 'Input value used to calculate results.', 'freshpress-website' ),
					'input_cost_label'    => __( 'Cost', 'freshpress-website' ),
					'input_markup_label'  => __( 'Markup', 'freshpress-website' ),
					'input_margin_label'  => __( 'Margin', 'freshpress-website' ),
					'input_revenue_label' => __( 'Revenue', 'freshpress-website' ),
					'input_profit_label'  => __( 'Profit', 'freshpress-website' ),
					'refresh'             => __( 'Refresh', 'freshpress-website' ),
				],
				'icons'  => [
					'dollar'  => fp_inline_asset( 'images/freshpress-tools/icon-dollar.svg' ),
					'point'   => fp_inline_asset( 'images/freshpress-tools/icon-point.svg' ),
					'rate'    => fp_inline_asset( 'images/freshpress-tools/icon-rate.svg' ),
					'refresh' => fp_inline_asset( 'images/freshpress-tools/icon-refresh.svg' ),
				],
			],
			'markupCalculatorTemplateData'
		);
	}
}
