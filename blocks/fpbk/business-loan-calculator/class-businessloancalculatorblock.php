<?php
/**
 * BusinessLoanCalculator class.
 *
 * @package FreshpressBlocks\BusinessLoanCalculator
 * @subpackage BusinessLoanCalculator
 */

namespace FreshpressBlocks;

/**
 * Class BusinessLoanCalculator

 * @package FreshpressBlocks
 */
class BusinessLoanCalculatorBlock extends ABlock {
	/**
	 * BusinessLoanCalculatorBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'business-loan-calculator-block' );
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
				'data-tool' => 'BusinessLoanCalculator',
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
					'title'                         => __( 'Enter your loan information', 'freshpress-website' ),
					'results_title'                 => __( 'How much will your loan cost', 'freshpress-website' ),
					'input_amount_label'            => __( 'Loan amount ($)', 'freshpress-website' ),
					'input_rate_label'              => __( 'Annual interest rate (%)', 'freshpress-website' ),
					'input_term_label'              => __( 'Length of term', 'freshpress-website' ),
					'input_extra_payment_label'     => __( 'Extra Monthly Payment ($)', 'freshpress-website' ),
					'years'                         => __( 'years', 'freshpress-website' ),
					'yr'                            => __( 'yr', 'freshpress-website' ),
					'calculate'                     => __( 'Calculate', 'freshpress-website' ),
					'refresh'                       => __( 'Refresh', 'freshpress-website' ),
					'result_title'                  => __( 'How much will your loan cost', 'freshpress-website' ),
					'result_description--to-borrow' => __( 'To borrow', 'freshpress-website' ),
					'result_description--over-a'    => __( 'over a', 'freshpress-website' ),
					'result_description--year-term-your-monthly-payment-will-be' => __( 'year term your monthly payment will be', 'freshpress-website' ),
					'result_description--at-an-interest-rate-of' => __( 'at an interest rate of', 'freshpress-website' ),
					'total_cost'                    => __( 'Total borrowing cost', 'freshpress-website' ),
					'avg_monthly_interest'          => __( 'Average monthly interest', 'freshpress-website' ),
					'monthly_payment'               => __( 'Monthly payment', 'freshpress-website' ),
					'total_interest'                => __( 'Total interest', 'freshpress-website' ),
					'number_of_years'               => __( 'Number of years', 'freshpress-website' ),
				],
				'icons'  => [
					'dollar'  => fp_inline_asset( 'images/freshpress-tools/icon-dollar.svg' ),
					'rate'    => fp_inline_asset( 'images/freshpress-tools/icon-rate.svg' ),
					'refresh' => fp_inline_asset( 'images/freshpress-tools/icon-refresh.svg' ),
				],
			],
			'businessLoanCalculatorTemplateData'
		);
	}
}
