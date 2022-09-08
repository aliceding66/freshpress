<?php
/**
 * Modal class.
 *
 * @package FreshpressBlocks\Modal
 * @subpackage Modal
 */

namespace FreshpressBlocks;

/**
 * Class Modal
 *
 * @package FreshpressBlocks
 */
class ModalBlock extends ABlock {

	/**
	 * ModalBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'modal-block' );
		$this->enqueue_style();
		$this->enqueue_editor_style();

		$this->initiate_template_data();
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
				'partial__stage' => 'templates/stage.partial.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}


	/**
	 * Returns formatted wrapper properties.
	 *
	 * @param array $attributes Block's attributes.
	 * @param array $properties Custom properties.
	 *
	 * @return string
	 */
	public function get_wrapper_properties( $attributes, $properties = [] ) {
		$properties['class'] = 'fade my-0';

		if ( isset( $attributes['modal_form_include'] ) && $attributes['modal_form_include'] ) {
			$properties['class'] .= ' modal_with-form';
		}
		if ( isset( $attributes['modal_pardot'] ) && $attributes['modal_pardot'] ) {
			$properties['class'] .= ' pardot-modal';
		}

		$properties['tabindex'] = '-1';
		$properties['role'] = 'dialog';
		$properties['aria-hidden'] = 'true';
		$properties['data-visibility'] = $attributes['modal_visibility'];
		$properties['data-pardot-thank-you'] = $attributes['modal_pardot_thank_you'] ?? 'false';
		$properties['data-auto-show'] = $attributes['modal_open_on_page_load'];
		$properties['data-show-when-cookies-accepted'] = $attributes['modal_show_when_cookies_accepted'];
		$properties['data-open-once'] = $attributes['modal_open_once'];
		if ( isset( $attributes['modal_open_on_page_load'] ) && $attributes['modal_open_on_page_load'] ) {
			$properties['data-delay'] = $attributes['modal_delay'];
			$properties['data-user-action'] = $attributes['modal_user_action'];
		}

		return parent::get_wrapper_properties( $attributes, $properties );
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function. Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$additional_template_data['is_with_stages_theme'] = ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-with-stages' ) !== false;
		if ( ! empty( $additional_template_data['modal_stages'] ) ) {
			$additional_template_data['modal_stages'][0]['first_stage'] = true;
			foreach ( $additional_template_data['modal_stages'] as $k => $modal_stage ) {
				$additional_template_data['modal_stages'][ $k ]['list_items'] = ! empty( $modal_stage['list_text'] ) ? explode( ';', $modal_stage['list_text'] ) : [];
				$additional_template_data['modal_stages'][ $k ]['has_list_items'] = ! empty( $modal_stage['list_text'] );

				if ( function_exists( 'fp_render_blocks' ) && isset( $modal_stage['include_form'] ) && $modal_stage['include_form'] ) {
					$additional_template_data['modal_stages'][ $k ]['stage_pardot_form'] = fp_render_blocks(
						[
							'name'  => 'fpbk/pardot-form',
							'attrs' => [
								'pardot_form_url'          => $modal_stage['pardot_form_url'],
								'pardot_form_iframe_width' => $modal_stage['pardot_form_iframe_width'],
								'pardot_form_form_name'    => $modal_stage['pardot_form_form_name'],
								'pardot_form_no_close'     => $modal_stage['pardot_form_no_close'],
							],
						]
					);
				}
			}
		}

		if ( function_exists( 'fp_render_blocks' ) && isset( $additional_template_data['modal_form_include'] ) && $additional_template_data['modal_form_include'] ) {
			$additional_template_data['pardot_form'] = fp_render_blocks(
				[
					'name'  => 'fpbk/pardot-form',
					'attrs' => [
						'pardot_form_url'          => $additional_template_data['pardot_form_url'],
						'pardot_form_iframe_width' => $additional_template_data['pardot_form_iframe_width'],
						'pardot_form_form_name'    => $additional_template_data['pardot_form_form_name'],
						'pardot_form_no_close'     => $additional_template_data['pardot_form_no_close'],
					],
				]
			);
		}

		if ( ! empty( $additional_template_data['modal_cta'] ) ) {
			$additional_template_data['modal_cta'] = fp_generate_link_html(
				$additional_template_data['modal_cta'],
				[
					'className' => 'btn btn-cta-green btn-block btn-lg mt-4 mt-sm-5 modal__cta mx-auto',
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
		$wrapper_properties = $this->get_wrapper_properties( $attributes );
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
				'close_label' => __( 'Close', 'freshpress-website' ),
			],
			'modalTemplateData'
		);
	}
}
