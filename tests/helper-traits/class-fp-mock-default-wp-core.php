<?php
/**
 * Trait that adds default mocks for WP core functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidFunctionName.MethodNameInvalid */
/* phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound */

/**
 * FP_Mock_Default_WP_Core class.
 */
trait FP_Mock_Default_WP_Core {

	/**
	 * Allows to disable some general default mocks for WP functions.
	 * If You need more precise or different mock for selected WP function, please set "false" on selected ones.
	 * WP_Mock is taking first defined mock into test, not the ones that are described in more detailed way.
	 * Remember to adjust them before parent::setUp() call.
	 *
	 * @var array
	 */
	protected $use_default_mocks = [
		'set_transient'                => true,
		'get_transient'                => true,
		'get_stylesheet_directory'     => true,
		'get_stylesheet_directory_uri' => true,
		'get_site_url'                 => true,
		'site_url'                     => true,
		'home_url'                     => true,
		'get_home_path'                => true,
		'wp_get_environment_type'      => true,
		'get_role'                     => true,
		'wp_parse_url'                 => true,
		'wp_sprintf'                   => true,
		'wp_json_encode'               => true,
		'trailingslashit'              => true,
		'wp_strip_all_tags'            => true,
		'strip_shortcodes'             => true,
		'do_blocks'                    => true,
		'register_post_type'           => true,
		'untrailingslashit'            => true,
		'is_admin'                     => true,
		'is_404'                       => true,
		'get_template_directory'       => true,
	];

	/**
	 * SetUp helper trait.
	 */
	public function setUpWPCoreDefaultMocks() {
		$this->registerDefaultWPMocks();
	}

	/**
	 * Setup default WP core functions mocks based on $this->user_default_mocks config.
	 */
	private function registerDefaultWPMocks() {
		if ( ! defined( 'MINUTE_IN_SECONDS' ) ) {
			define( 'MINUTE_IN_SECONDS', 60 );
		}
		if ( ! defined( 'HOUR_IN_SECONDS' ) ) {
			define( 'HOUR_IN_SECONDS', 60 * MINUTE_IN_SECONDS );
		}

		$this->use_default_mocks['set_transient'] && WP_Mock::passthruFunction( 'set_transient' );
		$this->use_default_mocks['get_transient'] && WP_Mock::userFunction(
			'get_transient',
			[
				'return' => null,
			]
		);
		$this->use_default_mocks['get_stylesheet_directory'] && WP_Mock::userFunction(
			'get_stylesheet_directory',
			[
				'return' => __DIR__ . '/../..',
			]
		);
		$this->use_default_mocks['get_stylesheet_directory_uri'] && WP_Mock::userFunction(
			'get_stylesheet_directory_uri',
			[
				'return' => 'https://www.dev.freshenv.com/wp-content/themes/freshpress',
			]
		);
		$this->use_default_mocks['get_site_url'] && WP_Mock::userFunction(
			'get_site_url',
			[
				'return' => 'https://www.dev.freshenv.com',
			]
		);
		$this->use_default_mocks['site_url'] && WP_Mock::userFunction(
			'site_url',
			[
				'return' => function( $path, $scheme = 'https' ) {
					if ( 'http' !== $scheme && 'https' !== $scheme ) {
						$scheme = 'https';
					}

					return $scheme . '://www.dev.freshenv.com/' . ltrim( $path, '/' );
				},
			]
		);
		$this->use_default_mocks['home_url'] && WP_Mock::userFunction(
			'home_url',
			[
				'return' => function( $path = '', $scheme = 'https' ) {
					if ( 'http' !== $scheme && 'https' !== $scheme ) {
						$scheme = 'https';
					}

					return $scheme . '://www.dev.freshenv.com/' . ltrim( $path, '/' );
				},
			]
		);
		$this->use_default_mocks['get_home_path'] && WP_Mock::userFunction(
			'get_home_path',
			[
				'return' => __DIR__ . '/../../../../',
			]
		);
		$this->use_default_mocks['wp_get_environment_type'] && WP_Mock::userFunction(
			'wp_get_environment_type',
			[
				'return' => 'local',
			]
		);
		$this->use_default_mocks['get_role'] && WP_Mock::userFunction(
			'get_role',
			[
				'return' => function( $role ) {
					return new WP_Role( $role, [] );
				},
			]
		);
		$this->use_default_mocks['wp_parse_url'] && WP_Mock::userFunction(
			'wp_parse_url',
			[
				'return' => function( $url, $flags = - 1 ) {
					return parse_url( $url, $flags );
				},
			]
		);
		$this->use_default_mocks['wp_sprintf'] && WP_Mock::userFunction(
			'wp_sprintf',
			[
				'return' => function( ...$args ) {
					return sprintf( ...$args );
				},
			]
		);
		$this->use_default_mocks['wp_json_encode'] && WP_Mock::userFunction(
			'wp_json_encode',
			[
				'args'   => [ WP_Mock\Functions::type( 'array' ), \WP_Mock\Functions::type( 'integer' ) ],
				'return' => function( $array, $flags = - 1 ) {
					return json_encode( $array, $flags );
				},
			]
		);
		$this->use_default_mocks['trailingslashit'] && WP_Mock::userFunction(
			'trailingslashit',
			[
				'return' => function( $string ) {
					return rtrim( $string, '/\\' ) . '/';
				},
			]
		);
		$this->use_default_mocks['wp_strip_all_tags'] && WP_Mock::userFunction(
			'wp_strip_all_tags',
			[
				'return' => function( $string, $remove_breaks = false ) {
					$string = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', $string );
					$string = strip_tags( $string );

					if ( $remove_breaks ) {
						$string = preg_replace( '/[\r\n\t ]+/', ' ', $string );
					}

					return trim( $string );
				},
			]
		);
		$this->use_default_mocks['strip_shortcodes'] && WP_Mock::userFunction(
			'strip_shortcodes',
			[
				'return' => function( $string ) {
					return $string;
				},
			]
		);
		$this->use_default_mocks['do_blocks'] && WP_Mock::userFunction(
			'do_blocks',
			[
				'return' => function( $string ) {
					return $string;
				},
			]
		);
		$this->use_default_mocks['register_post_type'] && WP_Mock::passthruFunction( 'register_post_type' );
		$this->use_default_mocks['untrailingslashit'] && WP_Mock::userFunction(
			'untrailingslashit',
			[
				'return' => function( $string ) {
					return rtrim( $string, '/\\' );
				},
			]
		);
		$this->use_default_mocks['is_admin'] && WP_Mock::userFunction( 'is_admin', [ 'return' => false ] );
		$this->use_default_mocks['is_404'] && WP_Mock::userFunction( 'is_404', [ 'return' => false ] );
		$this->use_default_mocks['get_template_directory'] && WP_Mock::userFunction(
			'get_template_directory',
			[
				'return' => __DIR__ . '/../../',
			]
		);
	}
}

