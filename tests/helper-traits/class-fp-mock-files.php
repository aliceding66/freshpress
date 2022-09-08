<?php
/**
 * Trait that enabled "mocking" files within test suites.
 * It actually creates files/dirs if are missing and removed them after PHPUnit ends running.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidFunctionName.MethodNameInvalid */

/**
 * FP_Mock_Files class.
 */
trait FP_Mock_Files {

	/**
	 * List of mocked filesystem elements that needs to be deleted at tearDown.
	 *
	 * @var array
	 */
	protected $filesystem_mocks = [
		'files' => [],
		'dirs'  => [],
	];

	/**
	 * SetUp helper trait.
	 */
	public function tearDownFilesMock() {
		$this->cleanFiles();
		register_shutdown_function( [ $this, 'cleanFiles' ] );
	}

	/**
	 * Clean files function.
	 */
	public function cleanFiles() {
		foreach ( $this->filesystem_mocks['files'] as $mocked_file ) {
			if ( is_file( $mocked_file ) ) {
				unlink( $mocked_file );
			}
		}
		foreach ( array_reverse( $this->filesystem_mocks['dirs'] ) as $mocked_dir ) {
			if ( is_dir( $mocked_dir ) ) {
				rmdir( $mocked_dir );
			}
		}
	}

	/**
	 * Dir mocker.
	 *
	 * @param string $dirpath Dir to be mocked.
	 */
	protected function mock_dir( $dirpath ) {
		if ( ! is_dir( $dirpath ) ) {
			mkdir( $dirpath );
			$this->filesystem_mocks['dirs'][] = $dirpath;
		}
	}

	/**
	 * File mocker.
	 *
	 * @param string $filepath Filepath to be mocked.
	 * @param string $content File content to be mocked.
	 */
	protected function mock_file( $filepath, $content = '' ) {
		if ( ! file_exists( $filepath ) ) {
			file_put_contents( $filepath, $content );
			$this->filesystem_mocks['files'][] = $filepath;
		}
	}
}

