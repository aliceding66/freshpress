<?php
/**
 * IconTiles class.
 *
 * @package FreshpressBlocks\IconTiles
 * @subpackage IconTiles
 */

namespace FreshpressBlocks;

/**
 * Class IconTiles

 * @package FreshpressBlocks
 */
class IconTilesBlock extends ABlock {
	/**
	 * IconTilesBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
				'tile' => 'templates/tile.mustache',
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
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['icon_tiles_tile'] ) ) {
			foreach ( $additional_template_data['icon_tiles_tile'] as $index => $tile ) {
				if ( ! empty( $tile['icon_tiles_tile_image'] ) ) {
					$additional_template_data['icon_tiles_tile'][ $index ]['icon_tiles_tile_image'] = fp_render_img(
						$tile['icon_tiles_tile_image'],
						[ 'class' => 'icon-tiles__tile-image mx-auto d-block mb-4 mw-100 h-auto' ]
					);
				} else {
					$additional_template_data['icon_tiles_tile'][ $index ]['icon_tiles_tile_image'] = '';
				}
			}
		}

		$additional_template_data['has_tiles'] = ! empty( $additional_template_data['icon_tiles_tile'] );

		if ( ! empty( $additional_template_data['icon_tiles_cta'] ) ) {
			$additional_template_data['icon_tiles_cta'] = fp_generate_link_html(
				$additional_template_data['icon_tiles_cta'],
				[
					'className' => 'icon-tiles__cta btn btn-cta-green d-inline-lock mx-auto px-5 mb-3',
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
				'class' => 'text-center',
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
