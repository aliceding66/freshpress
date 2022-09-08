<?php
/**
 * Tests FileDownloadBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * File Download block Test suite.
 */
class File_Download_Block_Test extends Fpbk_Blocks_Base_Test {

	/**
	 * Block used in all tests.
	 *
	 * @var \FreshpressBlocks\ABlock
	 */
	private $block;

	/**
	 * File_Download_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();

		$this->block = $this->get_fpbk_block( 'file-download' );
	}

	/**
	 * Checks whether icons are available only for all allowed local file types.
	 */
	public function testIfIconsAreSetForAllowedLocalFilesOnly() {
		// Check local file with types: excel, word and pdf.
		$correct_local_files_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'file',
						'file'          => [
							'filename' => 'excel.xlsx',
							'url'      => 'https://www.dev.freshenv.com/wp-content/uploads/excel.xlsx',
							'subtype'  => 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						],
					],
					[
						'download_type' => 'file',
						'file'          => [
							'filename' => 'excel.docx',
							'url'      => 'https://www.dev.freshenv.com/wp-content/uploads/excel.docx',
							'subtype'  => 'vnd.openxmlformats-officedocument.wordprocessingml.document',
						],
					],
					[
						'download_type' => 'file',
						'file'          => [
							'filename' => 'excel.pdf',
							'url'      => 'https://www.dev.freshenv.com/wp-content/uploads/excel.pdf',
							'subtype'  => 'pdf',
						],
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $correct_local_files_template_data );
		$this->assertCount( 3, $correct_local_files_template_data['file_download_files'] );

		for ( $i = 0; $i < 3; ++$i ) {
			$this->assertArrayHasKey( 'icon', $correct_local_files_template_data['file_download_files'][ $i ] );
			$this->assertNotEmpty( $correct_local_files_template_data['file_download_files'][ $i ]['icon'] );
			$this->assertStringContainsImgNode( $correct_local_files_template_data['file_download_files'][ $i ]['icon'] );
		}

		// Check file with unsupported type.
		$incorrect_local_file_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'file',
						'file'          => [
							'filename' => 'excel.pptx',
							'url'      => 'https://www.dev.freshenv.com/wp-content/uploads/excel.pptx',
							'subtype'  => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
						],
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $incorrect_local_file_template_data );
		$this->assertCount( 1, $incorrect_local_file_template_data['file_download_files'] );
		// Icon can be missing or be empty - both cases are valid.
		if ( ! isset( $incorrect_local_file_template_data['file_download_files'][0]['icon'] ) ) {
			$this->assertArrayNotHasKey( 'icon', $incorrect_local_file_template_data['file_download_files'][0] );
		} else {
			$this->assertEmpty( $incorrect_local_file_template_data['file_download_files'][0]['icon'] );
		}
	}

	/**
	 * Checks whether icons are available only for all allowed urls.
	 */
	public function testIfIconsAreSetForAllowedUrlsOnly() {
		// Check url with gsheet and gdoc.
		$correct_urls_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'url',
						'url'           => 'https://docs.google.com/spreadsheets/d/sheet-id/edit',
					],
					[
						'download_type' => 'url',
						'url'           => 'https://docs.google.com/document/d/document-id/edit',
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $correct_urls_template_data );
		$this->assertCount( 2, $correct_urls_template_data['file_download_files'] );

		for ( $i = 0; $i < 2; ++$i ) {
			$this->assertArrayHasKey( 'icon', $correct_urls_template_data['file_download_files'][ $i ] );
			$this->assertNotEmpty( $correct_urls_template_data['file_download_files'][ $i ]['icon'] );
			$this->assertStringContainsImgNode( $correct_urls_template_data['file_download_files'][ $i ]['icon'] );
		}

		// Check url with unsupported type.
		$incorrect_url_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'url',
						'url'           => 'https://docs.google.com/presentation/d/presentation-id/edit',
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $incorrect_url_template_data );
		$this->assertCount( 1, $incorrect_url_template_data['file_download_files'] );
		// Icon can be missing or be empty - both cases are valid.
		if ( ! isset( $incorrect_url_template_data['file_download_files'][0]['icon'] ) ) {
			$this->assertArrayNotHasKey( 'icon', $incorrect_url_template_data['file_download_files'][0] );
		} else {
			$this->assertEmpty( $incorrect_url_template_data['file_download_files'][0]['icon'] );
		}
	}

	/**
	 * Checks whether icons are available only for all allowed file passed via url.
	 */
	public function testIfIconsAreSetForAllowedUrlFilesOnly() {
		// Check url-file with types: excel, word and pdf.
		$correct_url_files_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'url',
						'url'           => 'https://example.com/file/excel.xlsx',
					],
					[
						'download_type' => 'url',
						'url'           => 'https://example.com/file/word.docx',
					],
					[
						'download_type' => 'url',
						'url'           => 'https://example.com/file/pdf.pdf',
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $correct_url_files_template_data );
		$this->assertCount( 3, $correct_url_files_template_data['file_download_files'] );

		for ( $i = 0; $i < 3; ++$i ) {
			$this->assertArrayHasKey( 'icon', $correct_url_files_template_data['file_download_files'][ $i ] );
			$this->assertNotEmpty( $correct_url_files_template_data['file_download_files'][ $i ]['icon'] );
			$this->assertStringContainsImgNode( $correct_url_files_template_data['file_download_files'][ $i ]['icon'] );
		}

		// Check url-file with unsupported type.
		$incorrect_url_file_template_data = $this->block->get_template_data(
			[
				'file_download_files' => [
					[
						'download_type' => 'url',
						'url'           => 'https://example.com/file/presentation.pptx',
					],
				],
			]
		);
		$this->assertArrayHasKey( 'file_download_files', $incorrect_url_file_template_data );
		$this->assertCount( 1, $incorrect_url_file_template_data['file_download_files'] );
		// Icon can be missing or be empty - both cases are valid.
		if ( ! isset( $incorrect_url_file_template_data['file_download_files'][0]['icon'] ) ) {
			$this->assertArrayNotHasKey( 'icon', $incorrect_url_file_template_data['file_download_files'][0] );
		} else {
			$this->assertEmpty( $incorrect_url_file_template_data['file_download_files'][0]['icon'] );
		}
	}
}
