<?php
/**
 * CtaBanner class.
 *
 * @package FreshpressBlocks\CtaBanner
 * @subpackage CtaBanner
 */

namespace FreshpressBlocks;

/**
 * Class CtaBanner

 * @package FreshpressBlocks
 */
class CtaBannerBlock extends ABlock {
	/**
	 * CtaBannerBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
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
		$wrapper_properties = $this->get_wrapper_properties( $attributes );
		$heading = ! empty( $attributes['heading'] ) ? $attributes['heading'] : '';
		$target = '_self';
		$url = home_url( '/signup' );

		if ( ! empty( $inner_blocks_content ) ) {
			$content = $inner_blocks_content;

			preg_match( '/[\s<]target="([^"]+)"[\s>]/', $inner_blocks_content, $target_matches );
			if ( ! empty( $target_matches[1] ) ) {
				$target = $target_matches[1];
			}

			preg_match( '/[\s<]href="([^"]+)"[\s>]/', $inner_blocks_content, $url_matches );
			if ( ! empty( $url_matches[1] ) ) {
				$url = $url_matches[1];
			}
		} else {
			$content = fp_render_blocks(
				[
					'name'    => 'fpbk/columns',
					'content' => [
						fp_render_blocks(
							[
								'name'      => 'fpbk/column',
								'attrs'     => [
									'bootstrap_class' => 'col col-md-6 col-8 col-lg-8',
								],
								'className' => 'banner-heading',
								'content'   => ( '<h2 class="banner-heading">' . $heading . '</h2>' ),
							]
						),
						fp_render_blocks(
							[
								'name'    => 'fpbk/column',
								'attrs'   => [
									'bootstrap_class' => 'col col-4 col-md-6 col-lg-4',
									'className'       => 'align-items-end justify-content-center l-50',
								],
								'content' => fp_render_blocks(
									[
										'name'  => 'fpbk/button',
										'attrs' => [
											'button_max_width' => '242px',
											'button_link' => [
												'url'   => home_url( '/signup' ),
												'title' => __( 'SIGN ME UP', 'freshpress-website' ),
											],
											'className'   => 'btn-midnight-blue',
										],
									]
								),
							]
						),
					],
				]
			);
		}

		$content = str_replace( [ '<a', '</a' ], [ '<span', '</span' ], $content );

		return <<< HTML
<div {$wrapper_properties}>
    <a target="{$target}" href="{$url}">
        {$content}
    </a>
</div>
HTML;
	}
}
