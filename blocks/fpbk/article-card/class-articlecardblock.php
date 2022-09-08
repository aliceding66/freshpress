<?php
/**
 * ArticleCardBlock class.
 *
 * @package FreshpressBlocks\ArticleCardBlock
 * @subpackage ArticleCardBlock
 */

namespace FreshpressBlocks;

/**
 * Class ArticleCardBlock
 *
 * @package FreshpressBlocks
 */
class ArticleCardBlock extends ABlock {
	/**
	 * ArticleCardBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();
		$this->enqueue_editor_style();

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

		if ( isset( $additional_template_data['read_time'] ) ) {
			// Translators: Article read time in minutes.
			$template_data['read_min'] = fp_sprintf( _x( '%1$s Min. Read', 'Read time', 'freshpress-website' ), [ esc_html( $additional_template_data['read_time'] ) ] );
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
				'class' => 'article-card position-relative d-flex flex-wrap flex-column my-0 w-100',
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
				'read_more' => esc_html( __( 'Read More', 'freshpress-website' ) ),
			],
			'articleCardTemplateData'
		);
	}
}
