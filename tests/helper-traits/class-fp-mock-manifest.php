<?php
/**
 * Trait that enabled mocking asset and script dependencies manifests.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidFunctionName.MethodNameInvalid */

/**
 * FP_Mock_Manifest class.
 */
trait FP_Mock_Manifest {

	/**
	 * To store mocked $asset_manifest global.
	 *
	 * @var array|null
	 */
	protected $mocked_asset_manifest = null;

	/**
	 * To store mocked $script_dependencies global.
	 *
	 * @var array|null
	 */
	protected $mocked_script_dependencies = null;

	/**
	 * SetUp helper function.
	 */
	public function setUpManifestMocks() {
		$this->setUpMocks();
	}

	/**
	 * TearDown helper function.
	 */
	public function tearDownManifestMock() {
		$this->resetMocks();
	}

	/**
	 * Registering manifest functions mocks.
	 */
	public function setUpMocks() {
		$this->mockFunction(
			'fp_get_manifest',
			function() {
				if ( ! is_null( $this->mocked_asset_manifest ) ) {
					return $this->mocked_asset_manifest;
				} else {
					return Patchwork\relay();  // Call original "fp_get_manifest".
				}
			}
		);

		$this->mockFunction(
			'fp_get_script_dependencies',
			function() {
				if ( ! is_null( $this->mocked_script_dependencies ) ) {
					return $this->mocked_script_dependencies;
				} else {
					return Patchwork\relay();  // Call original "fp_get_manifest".
				}
			}
		);
	}

	/**
	 * Rollback mocked manifests.
	 */
	public function resetMocks() {
		$this->mocked_asset_manifest = null;
		$this->mocked_script_dependencies = null;
	}

	/**
	 * Mock assets manifest.
	 *
	 * @param array $new_manifest Manifest content to be set.
	 */
	protected function mockAssetsManifest( $new_manifest ) {
		$this->mocked_asset_manifest = $new_manifest;
	}

	/**
	 * Mock script dependencies manifest.
	 *
	 * @param array $new_manifest Manifest content to be set.
	 */
	protected function mockScriptDependenciesManifest( $new_manifest ) {
		$this->mocked_script_dependencies = $new_manifest;
	}
}

