<?php
/**
 * Security Gate class.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash */
/* phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized */

/**
 * Security Gate for non-production environments.
 */
class FP_Security_Gate {

	/**
	 * Singleton class.
	 *
	 * @var FP_Security_Gate
	 */
	private static $instance;

	/**
	 * If Security Gate is enabled.
	 *
	 * @var bool
	 */
	private $security_gate_enabled = false;

	/**
	 * Singleton helper method.
	 *
	 * @return FP_Security_Gate
	 */
	public static function get_instance() {
		if ( empty( static::$instance ) ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * FP_Security_Gate constructor.
	 */
	public function __construct() {
		$this->init_options();
	}

	/**
	 * Return if Security Gate is enabled.
	 *
	 * @return bool
	 */
	public function is_enabled() {
		return $this->security_gate_enabled;
	}

	/**
	 * Prevents guest users from seeing non-prod pages.
	 * They should see info page with ability to redirect to login page.
	 */
	public function prevent_guests_from_visiting_non_prod_pages() {
		if (
			$this->security_gate_enabled
			&& ! $this->is_cli()
			&& ! $this->is_api_call()
			&& ! $this->is_production_environment()
			&& ! $this->is_admin_page()
			&& ! $this->is_temporarily_allowed_bot()
			&& ! $this->user_has_access_to_page()
		) {
			$this->show_unauthorized_page();
		}
	}

	/**
	 * Check if WP was called from CLI.
	 *
	 * @return bool
	 */
	private function is_cli() {
		return strpos( php_sapi_name(), 'cli' ) !== false;
	}

	/**
	 * Check if WP was called to API endpoint.
	 *
	 * @return bool
	 */
	private function is_api_call() {
		$trimmed_request_uri = trim( $this->get_server_value( 'REQUEST_URI' ), '/' );

		return (
			! empty( $trimmed_request_uri ) && (
				( fp_starts_with( $trimmed_request_uri, 'wp-json' ) || ( defined( 'REST_REQUEST' ) && true === REST_REQUEST ) )
				||
				( fp_starts_with( $trimmed_request_uri, 'xmlrpc.php' ) || ( defined( 'XMLRPC_REQUEST' ) && true === XMLRPC_REQUEST ) )
			)
		);
	}

	/**
	 * Checks if on production environment.
	 *
	 * @return bool
	 */
	private function is_production_environment() {
		return 'production' === fp_get_env();
	}

	/**
	 * Checks if on login page.
	 *
	 * @return bool
	 */
	private function is_admin_page() {
		$script_name = $this->get_server_value( 'SCRIPT_NAME' );

		return (
			! empty( $script_name ) && (
				strpos( $script_name, 'wp-admin' ) !== false
				|| strpos( $script_name, 'wp-login.php' ) !== false
			)
		);
	}

	/**
	 * Check if is temporarily allowed bot.
	 *
	 * @return bool
	 */
	private function is_temporarily_allowed_bot() {
		if ( ! fp_is_temporarily_allowed_bots_timestamp_expired() ) {
			$allowed_bots = get_field( 'allowed_bots', 'option' );
			if ( is_string( $allowed_bots ) ) {
				$allowed_bots_array = array_map( 'trim', explode( "\n", $allowed_bots ) );
				$user_agent = $this->get_server_value( 'HTTP_USER_AGENT' );

				foreach ( $allowed_bots_array as $allowed_bot ) {
					if ( strpos( $user_agent, $allowed_bot ) !== false ) {
						return true;
					}
				}
			}
		}

		return false;
	}

	/**
	 * Check if is logged user that has access to environment.
	 *
	 * @return bool
	 */
	private function user_has_access_to_page() {
		$has_access = false;

		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();
			$user_login = $user->user_login;
		} else {
			$user_login = $this->try_get_user_login_from_cookie();
		}

		if ( ! empty( $user_login ) ) {
			try {
				$allowed_users = get_field( 'allowed_users', 'option' );
				$has_access_data = is_array( $allowed_users ) && in_array( $user_login, $allowed_users );

				if ( ! empty( $has_access_data ) ) {
					$has_access = true;
				}
			} catch ( Exception | Error $e ) {
				$has_access = false;
			}
		}

		return $has_access;
	}

	/**
	 * Try to fetch user login from cookie.
	 *
	 * @return string
	 */
	private function try_get_user_login_from_cookie() {
		foreach ( $_COOKIE as $key => $cookie ) {
			if ( strpos( $key, 'wordpress_logged_in_' ) === 0 ) {
				$exploded_cookie = explode( '|', urldecode( $cookie ) );
				if ( ! empty( $exploded_cookie ) && $exploded_cookie[0] ) {
					return $exploded_cookie[0];
				}
			}
		}

		return '';
	}

	/**
	 * Show unauthorized HTML content with 401 HTTP code send.
	 */
	private function show_unauthorized_page() {
		$html_variables = [
			'prod_domain'                                => 'https://www.freshbooks.com',
			'domain'                                     => 'https://' . $this->get_server_value( 'HTTP_HOST', 'www.freshbooks.com' ),
			'heading'                                    => '403',
			'text'                                       => 'The page you are trying to access is restricted.',
			'link'                                       => '<a href="https://www.freshbooks.com" target="_self">Please visit the FreshBooks website.</a>',
			'footer_copyright'                           => sprintf( '© 2000-%s FreshBooks', gmdate( 'Y' ) ),
			'font-grotesk-regular'                       => fp_get_asset( 'fonts/founders-grotesk-web-regular.woff2' ),
			'font-grotesk-medium'                        => fp_get_asset( 'fonts/founders-grotesk-web-medium.woff2' ),

			'global.css'                                 => fp_get_asset( 'styles/global.css' ),
			'templates-page-404.css'                     => fp_get_asset( 'styles/templates-page-404.css' ),
			'templates-common-banner-cookie-consent.css' => fp_get_asset( 'styles/templates-common-banner-cookie-consent.css' ),

			'common-helpers.js'                          => fp_get_asset( 'scripts/common-helpers.js' ),
			'common-modules.js'                          => fp_get_asset( 'scripts/common-modules.js' ),
			'common-json.js'                             => fp_get_asset( 'scripts/common-json.js' ),
			'templates-common-banner-cookie-consent.js'  => fp_get_asset( 'scripts/templates-common-banner-cookie-consent.js' ),
			'global.js'                                  => fp_get_asset( 'scripts/global.js' ),
			'vendor-bootstrap.js'                        => fp_get_asset( 'scripts/vendor-bootstrap.js' ),
			'vendor-core-js.js'                          => fp_get_asset( 'scripts/vendor-core-js.js' ),
			'vendor-dashify.js'                          => fp_get_asset( 'scripts/vendor-dashify.js' ),
			'vendor-is-plain-obj.js'                     => fp_get_asset( 'scripts/vendor-is-plain-obj.js' ),
			'vendor-mobile-device-detect.js'             => fp_get_asset( 'scripts/vendor-mobile-device-detect.js' ),
			'vendor-magnum-ui.js'                        => fp_get_asset( 'scripts/vendor-magnum-ui.js' ),
			'vendor-smoothscroll-polyfill.js'            => fp_get_asset( 'scripts/vendor-smoothscroll-polyfill.js' ),
			'vendor-js-cookie.js'                        => fp_get_asset( 'scripts/vendor-js-cookie.js' ),
			'vendor-uuid.js'                             => fp_get_asset( 'scripts/vendor-uuid.js' ),
			'vendor-validator.js'                        => fp_get_asset( 'scripts/vendor-validator.js' ),

			'freshbooks-logo.svg'                        => fp_get_asset( 'images/logos/freshbooks-logo.svg' ),
			'app-store-en-us.svg'                        => fp_get_asset( 'images/footer/app-stores/app-store-en-us.svg' ),
			'google-play-en-us.svg'                      => fp_get_asset( 'images/footer/app-stores/google-play-en-us.svg' ),
			'icon-twitter.svg'                           => fp_get_asset( 'images/footer/icon-twitter.svg' ),
			'icon-fb.svg'                                => fp_get_asset( 'images/footer/icon-fb.svg' ),
			'icon-yt.svg'                                => fp_get_asset( 'images/footer/icon-yt.svg' ),
			'icon-ig.svg'                                => fp_get_asset( 'images/footer/icon-ig.svg' ),
		];
		http_response_code( 403 );
		echo fp_noesc( $this->replace_html_variables( file_get_contents( __DIR__ . '/../templates/html/forbidden.html' ), $html_variables ) );
		fp_die();
	}

	/**
	 * Initiate options.
	 */
	private function init_options() {
		try {
			$security_gate_enabled_data = get_option( 'options_enable_security_gate', false );

			if ( ! empty( $security_gate_enabled_data ) && '1' === $security_gate_enabled_data ) {
				$this->security_gate_enabled = true;
			}
		} catch ( Exception | Error $e ) {
			$this->security_gate_enabled = false;
		}
	}

	/**
	 * Helper function to fetch $_SERVER data with phpcs omit comment.
	 *
	 * @param string $key $_SERVER key to fetch.
	 * @param mixed  $default Default value to return.
	 *
	 * @return mixed
	 */
	private function get_server_value( $key, $default = '' ) {
		return ! empty( $_SERVER[ $key ] ) ? $_SERVER[ $key ] : $default;
	}

	/**
	 * Helper function to parse HTML with dynamic content.
	 *
	 * @param string $html HTML to be parsed.
	 * @param array  $variables Variable to replace.
	 *
	 * @return string
	 */
	private function replace_html_variables( $html, $variables ) {
		foreach ( $variables as $variable_name => $value ) {
			$html = preg_replace( "/{{\s+{$variable_name}\s+}}/i", $value, $html );
		}

		return $html;
	}
}
