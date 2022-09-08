<?php
/**
 * BlueCtaBarBlock class.
 *
 * @package FreshpressBlocks\BlueCtaBarBlock
 * @subpackage BlueCtaBarBlock
 */

namespace FreshpressBlocks;

/**
 * Class BlueCtaBarBlock
 *
 * @package FreshpressBlocks
 */
class BlueCtaBarBlock extends ABlock {
	/**
	 * BlueCtaBarBlock constructor.
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
		$template_data = parent::get_template_data( $additional_template_data );

		if ( ! empty( $additional_template_data['blue_cta_bar_image'] ) && ! empty( $additional_template_data['blue_cta_bar_image']['url'] ) ) {
			$template_data['blue_cta_bar_image'] = fp_render_img(
				$additional_template_data['blue_cta_bar_image'],
				[
					'class' => 'blue-cta-bar__image d-inline-block',
				]
			);
		} else {
			$template_data['blue_cta_bar_image'] = fp_render_img(
				'images/blue-cta-bar/blue-cta-bar-default.png',
				[
					'class' => 'blue-cta-bar__image d-inline-block',
					'alt'   => esc_html_x(
						'Join 24 million people who have used Freshbooks',
						'Blue CTA Bar Image',
						'freshpress-website'
					),
				]
			);
		}

		if ( empty( $template_data['blue_cta_bar_title'] ) ) {
			$template_data['blue_cta_bar_title'] = $this->get_default_title();
		}

		if ( empty( $template_data['blue_cta_bar_text'] ) ) {
			$template_data['blue_cta_bar_text'] = fp_noesc( '<p>No credit card required.</p><p>Set up only takes a few minutes.</p>' );
		}

		if ( empty( $template_data['blue_cta_bar_cta'] ) || ! is_array( $template_data['blue_cta_bar_cta'] ) ) {
			$template_data['blue_cta_bar_cta'] = [];
		}

		if ( empty( $template_data['blue_cta_bar_cta']['url'] ) ) {
			$template_data['blue_cta_bar_cta']['url'] = home_url( '/signup' );
		}

		if ( empty( $template_data['blue_cta_bar_cta']['title'] ) ) {
			$template_data['blue_cta_bar_cta']['title'] = esc_html_x( 'Try it Free', 'Footer blue-cta-bar CTA text', 'freshpress-website' );
		}

		if ( ! empty( $template_data['blue_cta_bar_cta'] ) ) {
			$template_data['blue_cta_bar_cta'] = fp_generate_link_html( $template_data['blue_cta_bar_cta'], [ 'className' => 'btn btn-cta-green blue-cta-bar__cta-button py-2 mb-4 mb-lg-0' ] );
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
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'blue-cta-bar no-gutters text-center text-lg-left',
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
	 * Initiates static template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'default_image' => fp_get_asset( 'images/blue-cta-bar/blue-cta-bar-default.png' ),
			],
			'blueCtaBarTemplateData'
		);
	}

	/**
	 * Returns default title.
	 *
	 * @return string
	 */
	private function get_default_title() {
		return _x( 'Get started for free today.', 'Footer blue-cta-bar Title', 'freshpress-website' );
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		$this->block_attributes['blue_cta_bar_title']['default'] = $this->get_default_title();
		$this->block_attributes['blue_cta_bar_title']['default'] = $this->get_default_title();
		$this->block_attributes['blue_cta_bar_cta']['default']['title'] = esc_html_x( 'Try it Free', 'Footer blue-cta-bar CTA text', 'freshpress-website' );
		$this->block_attributes['blue_cta_bar_cta']['default']['url'] = home_url( '/signup' );
		$this->block_attributes['blue_cta_bar_text']['default'] = fp_noesc(
			'<p>No credit card required.</p><p>Set up only takes a few minutes.</p>'
		);
	}
}
