<?php
/**
 * Trait that adds ability to mock selected WP classes.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidFunctionName.MethodNameInvalid */

/**
 * FP_Polyfill_Classes class.
 */
trait FP_Polyfill_Classes {

	/**
	 * Class mocks list.
	 *
	 * @var array
	 */
	private static $polyfill_classes = [
		'Fastly_Cache_Keys'      => 'class-fastly-cache-keys',
		'WP_Block_Type_Registry' => 'class-wp-block-type-registry',
		'WP_Error'               => 'class-wp-error',
		'WP_Post'                => 'class-wp-post',
		'WP_Term'                => 'class-wp-term',
		'WP_Query'               => 'class-wp-query',
		'WP_Role'                => 'class-wp-role',
	];

	/**
	 * SetUp classes mocks.
	 */
	public static function loadClassPolyfills() {
		foreach ( self::$polyfill_classes as $class => $filename ) {
			if ( ! class_exists( $class ) ) {
				$path = ( __DIR__ . '/classes-polyfills/' . $filename . '.php' );
				if ( file_exists( $path ) ) {
					require_once $path;
				}
			}
		}
	}

	/**
	 * Helper function to mock WP_Block_Type_Registry class.
	 *
	 * @param array $blocks All registered blocks.
	 *
	 * @return WP_Block_Type_Registry
	 */
	protected function mockWPBlockTypeRegistrySingleton( $blocks = [] ) {
		$block_type_registry_mock = WP_Block_Type_Registry::get_instance();
		if ( method_exists( $block_type_registry_mock, 'mock_data' ) ) {
			$block_type_registry_mock->mock_data(
				[
					'blocks' => $blocks,
				]
			);
		}

		return $block_type_registry_mock;
	}
}

