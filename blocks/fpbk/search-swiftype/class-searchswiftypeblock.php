<?php
/**
 * SearchSwiftype class.
 *
 * @package FreshpressBlocks\SearchSwiftype
 * @subpackage SearchSwiftype
 */

namespace FreshpressBlocks;

/**
 * Class SearchSwiftype
 *
 * @package FreshpressBlocks
 */
class SearchSwiftypeBlock extends ABlock {
	/**
	 * SearchSwiftypeBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'search-swiftype-block' );
		$this->enqueue_style();
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
				'data-swiftype-id' => $attributes['swiftype_id'],
			]
		);

		if ( ! empty( $attributes['swiftype_id'] ) ) {
			$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );
		} else {
			$block_template = '';
		}

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
