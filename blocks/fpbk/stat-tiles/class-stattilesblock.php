<?php
/**
 * StatTiles class.
 *
 * @package FreshpressBlocks\StatTiles
 * @subpackage StatTiles
 */

namespace FreshpressBlocks;

/**
 * Class StatTiles

 * @package FreshpressBlocks
 */
class StatTilesBlock extends ABlock {
	/**
	 * StatTilesBlock constructor.
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
				'stat'         => 'templates/stat.partial.mustache',
				'contact_link' => 'templates/contact-link.partial.mustache',
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
		if ( function_exists( 'fp_render_img' ) && ! empty( $additional_template_data['about_team_image'] ) ) {
			if ( ! empty( $additional_template_data['about_team_image'] ) ) {
				$additional_template_data['about_team_image'] = fp_render_img(
					$additional_template_data['about_team_image'],
					[ 'class' => 'stat-tiles__image mb-2 mx-auto mt-md-2 h-auto' ]
				);
			} else {
				$additional_template_data['about_team_image'] = '';
			}
		}

		if ( ! empty( $additional_template_data['about_team_contact_links'] ) ) {
			foreach ( $additional_template_data['about_team_contact_links'] as $index => $contact_link ) {
				$additional_template_data['about_team_contact_links'][ $index ]['href'] = 'Url' === $contact_link['type'] ? '' : $contact_link['type'] . ':';
				$additional_template_data['about_team_contact_links'][ $index ]['href'] .= $contact_link['value'];
			}
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
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		$this->block_attributes['stats']['default'] = array_fill(
			0,
			3,
			[
				'number'      => '',
				'description' => '',
			]
		);
	}
}
