<?php
/**
 * Faq class.
 *
 * @package FreshpressBlocks\Faq
 * @subpackage Faq
 */

namespace FreshpressBlocks;

/**
 * Class Faq
 *
 * @package FreshpressBlocks
 */
class FaqBlock extends ABlock {
	/**
	 * FaqBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'faq-block' );
		$this->enqueue_editor_style();
		$this->enqueue_style();

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
		$this->set_template_partials( [ 'partial__qa' => 'templates/qa.partial.mustache' ] );

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
		if ( ! empty( $additional_template_data['questions_and_answers'] && is_array( $additional_template_data['questions_and_answers'] ) ) ) {
			foreach ( $additional_template_data['questions_and_answers'] as $key => $val ) {
				$additional_template_data['questions_and_answers'][ $key ]['item_id'] = "faq__item-${key}";
			}
		}

		$additional_template_data['column_sizing'] = 'col-md-10 col-lg-9';
		if ( ! empty( $additional_template_data['className'] ) && strpos( $additional_template_data['className'], 'is-style-new' ) !== false ) {
			$additional_template_data['column_sizing'] = 'col-md-12 col-lg-11';
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
			[ 'arrow_icon' => fp_inline_asset( 'images/faq/arrow.svg' ) ],
			'faqTemplateData'
		);
	}
}
