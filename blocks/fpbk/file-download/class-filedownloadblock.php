<?php
/**
 * FileDownload class.
 *
 * @package FreshpressBlocks\FileDownload
 * @subpackage FileDownload
 */

namespace FreshpressBlocks;

/**
 * Class FileDownload
 *
 * @package FreshpressBlocks
 */
class FileDownloadBlock extends ABlock {
	/**
	 * Allowed file types.
	 *
	 * @var array File types.
	 */
	private $file_types = [
		'vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'excel',
		'xlsx' => 'excel',
		'vnd.openxmlformats-officedocument.wordprocessingml.document' => 'word',
		'docx' => 'word',
		'pdf'  => 'pdf',
	];

	/**
	 * Allowed url types.
	 *
	 * @var array Url types.
	 */
	private $url_types = [
		'docs.google.com/spreadsheets' => 'gsheet',
		'docs.google.com/document'     => 'gdoc',
	];

	/**
	 * Allowed url file extensions.
	 *
	 * @var array Url file types.
	 */
	private $url_file_types = [
		'xlsx' => 'excel',
		'xslx' => 'excel',
		'docx' => 'word',
		'pdf'  => 'pdf',
	];


	/**
	 * FileDownloadBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_style();

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
		foreach ( $additional_template_data['file_download_files'] as $file_key => $file ) {
			$icon = '';
			if ( 'url' === $file['download_type'] && ! empty( $file['url'] ) ) {
				$url = $file['url'];
				$parsed_url = wp_parse_url( $url );
				$parsed_host = $parsed_url['host'] ?? '';
				$parsed_path = $parsed_url['path'] ?? '';
				$url_type = $parsed_host . '/' . explode( '/', ltrim( $parsed_path, '/' ) )[0];
				if ( array_key_exists( $url_type, $this->url_types ) ) {
					$icon = parent::get_template_data()['icons'][ $url_type ];
					$additional_template_data['file_download_files'][ $file_key ]['file_type'] = $this->url_types[ $url_type ];
				} else {
					$file_extension = ! empty( pathinfo( $url )['extension'] ) ? pathinfo( $url )['extension'] : '';
					if ( ! empty( $file_extension ) && array_key_exists( $file_extension, $this->url_file_types ) ) {
						$icon = parent::get_template_data()['icons'][ $file_extension ];
						$additional_template_data['file_download_files'][ $file_key ]['file_type'] = $this->url_file_types[ $file_extension ];
					}
				}
			} elseif ( 'file' === $file['download_type'] && array_key_exists( 'subtype', $file['file'] ) && isset( $this->file_types[ $file['file']['subtype'] ] ) ) {
				$additional_template_data['file_download_files'][ $file_key ]['url'] = $file['file']['url'];
				if ( array_key_exists( $file['file']['subtype'], $this->file_types ) ) {
					$additional_template_data['file_download_files'][ $file_key ]['file_type'] = $this->file_types[ $file['file']['subtype'] ];
					$icon = parent::get_template_data()['icons'][ $file['file']['subtype'] ];
				}
			}

			$additional_template_data['file_download_files'][ $file_key ]['icon'] = $icon;
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
				'class' => "m-0 {$this->get_align_class( $attributes )}",
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
		$icons = array_map(
			function( $file_type ) {
				return fp_render_img(
					"images/icons/icon-file-{$file_type}.svg",
					[
						'class' => 'file-download__icon',
						'alt'   => "{$file_type} file icon",
					]
				);
			},
			array_merge( $this->file_types, $this->url_types, $this->url_file_types )
		);

		$this->set_static_template_data(
			[
				'icons'        => $icons,
				'fileTypes'    => $this->file_types,
				'urlTypes'     => $this->url_types,
				'urlFileTypes' => $this->url_file_types,
			],
			'fileDownloadTemplateData'
		);
	}

	/**
	 * Return align class.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return string
	 */
	private function get_align_class( $attributes ) {
		$align_class = '';

		if ( ! empty( $attributes['align'] ) ) {
			$align_class .= ' d-flex';

			if ( 'right' === $attributes['align'] ) {
				$align_class .= ' justify-content-end';
			} elseif ( 'left' === $attributes['align'] ) {
				$align_class .= ' justify-content-start';
			} else {
				$align_class .= ' justify-content-center';
			}
		}

		return $align_class;
	}
}
