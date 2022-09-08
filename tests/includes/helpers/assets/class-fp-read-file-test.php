<?php
/**
 * Tests fp_read_file() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Read_File_Test class.
 */
class FP_Read_File_Test extends FP_Base_Test {

	/**
	 * Content from mocked file.
	 *
	 * @var string
	 */
	private $file_content = 'File content';

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		if ( ! $this->isWindows() ) {
			$this->mock_dir( $this->getThemeRootPath() . '/dist' );
			$this->mock_dir( $this->getThemeRootPath() . '/dist/fp_read_file' );

			$this->mock_file( $this->getThemeRootPath() . '/dist/fp_read_file/test.file', $this->file_content );
			chmod( $this->getThemeRootPath() . '/dist/fp_read_file/test.file', 0444 ); // Only read.

			$this->mock_file( $this->getThemeRootPath() . '/dist/fp_read_file/unreadable.file', $this->file_content );
			chmod( $this->getThemeRootPath() . '/dist/fp_read_file/unreadable.file', 0111 ); // Only executable.

			$this->mockAssetsManifest(
				[
					'fp_read_file-test' => $this->getThemeRootPath() . '/dist/fp_read_file/test.file',
				]
			);
		}
	}

	/**
	 * Checks whether fp_read_file() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param string $file_path File path.
	 * @param array  $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $file_path, $expected ) {
		if ( ! $this->isWindows() ) {
			$this->assertEquals( $expected, fp_read_file( $file_path ) );
		}
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		$empty_file_content = '';

		return [
			// Only 1 correct case.
			'correct file path'        => [
				'file_path' => $this->getThemeRootPath() . '/dist/fp_read_file/test.file',
				'expected'  => $this->file_content,
			],

			// All other cases returns empty value.
			'file from manifest'       => [
				'file_path' => 'fp_read_file-test',
				'expected'  => $empty_file_content,
			],
			'file without permissions' => [
				'file_path' => $this->getThemeRootPath() . '/dist/fp_read_file/unreadable.file',
				'expected'  => $empty_file_content,
			],
			'missing file path'        => [
				'file_path' => $this->getThemeRootPath() . '/dist/fp_read_file/missing.file',
				'expected'  => $empty_file_content,
			],
			'file path not a string'   => [
				'file_path' => 1234567890,
				'expected'  => $empty_file_content,
			],
		];
	}
}
