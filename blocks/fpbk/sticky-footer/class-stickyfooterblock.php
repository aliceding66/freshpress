<?php
/**
 * StickyFooter class.
 *
 * @package FreshpressBlocks\StickyFooter
 * @subpackage StickyFooter
 */

namespace FreshpressBlocks;

/**
 * Class StickyFooter

 * @package FreshpressBlocks
 */
class StickyFooterBlock extends ABlock {
	/**
	 * StickyFooterBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'sticky-footer-block' );
		$this->enqueue_style();

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
				'partial__standard'   => 'templates/standard.partial.mustache',
				'partial__newsletter' => 'templates/newsletter.partial.mustache',
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
		$additional_template_data['is_newsletter_theme'] = ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-newsletter' ) !== false;

		$additional_template_data['pardot_form'] = fp_render_blocks(
			[
				'name'  => 'fpbk/pardot-form',
				'attrs' => [
					'pardot_form_url'                => $additional_template_data['pardot_form_url'],
					'pardot_form_iframe_width'       => '585',
					'pardot_form_form_name'          => 'Newsletter form',
					'pardot_form_thank_you_modal_id' => $additional_template_data['pardot_form_thank_you_modal_id'],
				],
			]
		);

		if ( ! empty( $additional_template_data['cta'] ) ) {
			$additional_template_data['cta'] = fp_generate_link_html(
				$additional_template_data['cta'],
				[
					'className' => 'sticky-footer__cta btn btn-cta-green py-2 py-md-3 px-2 px-md-4 mr-2 mx-md-3',
				]
			);
		}

		if ( ! empty( $additional_template_data['secondary_link'] ) ) {
			$additional_template_data['secondary_link'] = fp_generate_link_html(
				$additional_template_data['secondary_link'],
				[
					'className' => 'sticky-footer__link ml-2 ml-md-0',
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
				'class' => 'sticky-footer row sticky-bottom d-flex flex-wrap flex-md-nowrap justify-content-center align-items-center p-2',
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
