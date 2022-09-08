<?php
/**
 * IconsList class.
 *
 * @package FreshpressBlocks\IconsList
 * @subpackage IconsList
 */

namespace FreshpressBlocks;

/**
 * Class IconsList

 * @package FreshpressBlocks
 */
class IconsListBlock extends ABlock {
	/**
	 * IconsListBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();
		$this->enqueue_editor_style();
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
				'topic' => 'templates/topic.partial.mustache',
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

		// Number of columns.
		$columns_number = $additional_template_data['block_settings_icons_list_columns'];
		$columns_class = 'col-12';
		if ( '2' === $columns_number ) {
			$columns_class .= ' col-sm-6';
		} elseif ( '3' === $columns_number ) {
			$columns_class .= ' col-sm-6 col-md-4';
		} elseif ( '4' === $columns_number ) {
			$columns_class .= ' col-sm-6 col-md-4 col-lg-3';
		}

		// Stack.
		if ( $additional_template_data['block_settings_topic_elements_stack'] ) {
			$columns_class .= ' flex-column justify-content-center';
		}

		$additional_template_data['columns_class'] = $columns_class;

		// Topic Icon Class.
		$topic_icon_class = 'mr-3';
		if ( $additional_template_data['block_settings_topic_elements_stack'] ) {
			$topic_icon_class = 'mx-auto';
		}
		$additional_template_data['topic_icon_class'] = $topic_icon_class;

		// Looped properties (numbered topics, image, description classes).
		foreach ( $additional_template_data['icons_list_topic'] as $key => $topic ) {

			// Index.
			$additional_template_data['icons_list_topic'][ $key ]['index'] = $key + 1;

			// Title Vertical Align Class / Has Description.
			$title_vertical_align_class = 'align-self-center';
			if ( $topic['icons_list_topic_text'] ) {
				$title_vertical_align_class = '';
			}
			$additional_template_data['icons_list_topic'][ $key ]['title_vertical_align_class'] = $title_vertical_align_class;

			// Description Class.
			$numbered_topic_info_class = '';
			$additional_template_data['show_icons'] = true;
			if ( $additional_template_data['block_settings_numbered_topics'] ) {
				$numbered_topic_info_class = 'pl-3 pl-md-1';
				$additional_template_data['show_icons'] = false;

			}
			$additional_template_data['icons_list_topic'][ $key ]['numbered_topic_info_class'] = $numbered_topic_info_class;

			// Mobile Align Class.
			$mobile_align_class = 'ml-0';
			if ( $additional_template_data['block_settings_numbered_topics'] ) {
				$mobile_align_class = 'text-left';
			} elseif ( $additional_template_data['block_settings_topic_elements_stack'] ) {
				$mobile_align_class = 'mx-auto text-center';
			}
			$additional_template_data['icons_list_topic'][ $key ]['mobile_align_class'] = $mobile_align_class;

			// Image.
			if ( ! empty( $additional_template_data['icons_list_topic'][ $key ]['icons_list_topic_icon'] ) ) {
				$additional_template_data['icons_list_topic'][ $key ]['icons_list_topic_icon'] = fp_render_img(
					$additional_template_data['icons_list_topic'][ $key ]['icons_list_topic_icon'],
					[
						'class' => 'icons-list__topic-image ' . $additional_template_data['topic_icon_class'] . ' mx-md-0 mb-2 mr-md-4',
					]
				);
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
		$icons_list_class = "icons-list_{$attributes['block_settings_icons_list_columns']}-col";
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "px-4 mx-auto {$icons_list_class}",
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
