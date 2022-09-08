<?php
/**
 * SocialShare class.
 *
 * @package FreshpressBlocks\SocialShare
 * @subpackage SocialShare
 */

namespace FreshpressBlocks;

/**
 * Class SocialShare
 *
 * @package FreshpressBlocks
 */
class SocialShareBlock extends ABlock {
	/**
	 * SocialShareBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
		if ( ! empty( $additional_template_data['share_text_colour'] ) && ! empty( $additional_template_data['share_text_colour']['hex'] ) ) {
			$additional_template_data['share_text_inline_styles'] = 'style="color: ' . esc_attr( $additional_template_data['share_text_colour']['hex'] ) . ';"';
		}

		$social_info = [];
		if ( ! empty( $additional_template_data['share_icons_order'] ) ) {
			foreach ( $additional_template_data['share_icons_order'] as $social_platform ) {
				if ( is_array( $social_platform ) ) {
					$social_platform = $social_platform['value'];
				}
				$platform_group_prefix = 'share_on_' . $social_platform . '_group';

				$sharing_title = $additional_template_data[ "{$platform_group_prefix}_sharing_title" ];
				if ( empty( $sharing_title ) ) {
					// translators: 'Share on ___' where ___ is the social media service (eg, Facebook or LinkedIn).
					$sharing_title = fp_sprintf( __( 'Share on %s', 'freshpress-website' ), [ $additional_template_data[ "{$platform_group_prefix}_label" ] ] );
				}
				if ( $additional_template_data[ "{$platform_group_prefix}_share_custom_page" ] ) {
					$share_url = fp_get_sharing_url(
						$social_platform,
						$additional_template_data[ "{$platform_group_prefix}_custom_page_url" ],
						$additional_template_data[ "{$platform_group_prefix}_custom_page_title" ]
					);
				} else {
					$share_url = fp_get_sharing_url( $social_platform );
				}

				$social_info[] = [
					'sharing_title' => $sharing_title,
					'share_icon'    => parent::get_template_data()['icons'][ $social_platform ],
					'share_url'     => $share_url,
				];
			}
		}
		$additional_template_data['social_info'] = $social_info;

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
		$class_name = 'social-share';

		$align_class = $this->get_align_class( $attributes['align'] ?? '' );

		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => "{$class_name} {$align_class}",
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
		$icons = [];
		if ( ! empty( $this->block_attributes['share_icons_order'] ) ) {
			foreach ( array_keys( $this->block_attributes['share_icons_order']['choices'] ) as $share_service ) {
				$share_icon_path = 'images/icons/icon-share-' . $share_service . '.svg';
				$icons[ $share_service ] = fp_asset_exists( $share_icon_path ) ? fp_render_img(
					$share_icon_path,
					[
						'width'  => 32,
						'height' => 32,
						'alt'    => $share_service . ' icon',
					]
				) : '';
			}
		}

		$this->set_static_template_data(
			[
				'icons' => $icons,
			],
			'socialShareTemplateData'
		);
	}

	/**
	 * Get formatted align class.
	 *
	 * @param string $align Align set in block.
	 *
	 * @return string
	 */
	private function get_align_class( $align = '' ) {
		if ( 'right' === $align ) {
			return ' text-right ml-md-auto mr-md-0';
		} elseif ( 'left' === $align ) {
			return ' text-left mr-md-auto ml-md-0';
		} else {
			return ' text-center mr-md-auto ml-md-0';
		}
	}
}
