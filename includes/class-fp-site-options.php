<?php
/**
 * Site Options class.
 *
 * @package FreshPress\Website
 */

/**
 * Site Options.
 */
class FP_Site_Options {
	/**
	 * Static class instance.
	 *
	 * @var FP_Site_Options
	 */
	private static $instance = null;

	/**
	 * Site options values.
	 *
	 * @var array
	 */
	private static $options = [];

	/**
	 * Initialise our options array.
	 *
	 * @param array $files Array of files to import into options.
	 */
	public static function init( $files = [] ) {
		if ( ! empty( $files ) && is_array( $files ) ) {
			foreach ( $files as $file ) {
				$file_content = null;

				if ( fp_ends_with( $file, '.json' ) ) {
					$file_content = fp_read_file( $file );
					if ( ! empty( $file_content ) ) {
						$file_content = json_decode( $file_content, true );
					}
				} elseif ( fp_ends_with( $file, '.php' ) ) {
					$file_content = include $file;
				}

				if ( ! empty( $file_content ) && is_array( $file_content ) ) {
					self::$options = array_merge( self::$options, $file_content );
				}
			}
		}

		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'fp/v1',
					'/authorize-token',
					[
						'methods'             => 'POST',
						'callback'            => [ static::class, 'handle_authorize_token_api_endpoint' ],
						'permission_callback' => '__return_true',
					]
				);
			}
		);
	}

	/**
	 * Get instance of this class.
	 *
	 * @return FP_Site_Options
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get a site option by key for a region (defaults to current region).
	 *
	 * @param string      $key    Option key being requested.
	 * @param string|null $region Specific region to request the option for (optional).
	 * @return mixed
	 */
	public static function get_option( $key, $region = null ) {
		$output = null;

		if ( null === $region ) {
			$region = fp_get_current_language();
		}

		if ( ! empty( self::$options ) && isset( self::$options[ $key ] ) && is_array( self::$options[ $key ] ) ) {
			$default_region = fp_get_default_region();

			if ( array_key_exists( $region, self::$options[ $key ] ) && ! empty( $region ) ) {
				$output = self::$options[ $key ][ $region ];
			} elseif ( array_key_exists( $default_region, self::$options[ $key ] ) ) {
				$output = self::$options[ $key ][ $default_region ];
			}
		}

		if ( null === $output ) {
			$output = self::$options[ $key ];
		}

		return $output ?? '';
	}

	/**
	 * Get all site options for a region (defaults to current region).
	 *
	 * @param string|null $region Specific region to request the option for (optional).
	 * @return array
	 */
	public static function get_all_options( $region = null ) {
		$output = [];

		if ( null === $region ) {
			$region = fp_get_current_language();
		}

		if ( ! empty( self::$options ) ) {
			foreach ( array_keys( self::$options ) as $key ) {
				$output[ $key ] = self::get_option( $key, $region );
			}
		}

		return $output;
	}

	/**
	 * Handles authorize_token rest API endpoint.
	 *
	 * @param array $data POST data.
	 */
	public static function handle_authorize_token_api_endpoint( $data ) {
		header( 'Access-Control-Allow-Origin: *' );

		$to_check_token = isset( $data['token'] ) ? esc_html( $data['token'] ) : '';
		$to_check_domain = fp_get_base_domain( fp_get_server_var( 'HTTP_ORIGIN' ) );

		$current_time = time();

		$available_tokens = get_field( 'fb_tokens', 'options' );

		$available_tokens = array_filter(
			$available_tokens,
			function( $available_token ) use ( $to_check_domain ) {
				return fp_get_base_domain( $available_token['fb_token_domain'] ) === $to_check_domain;
			}
		);
		if ( empty( $available_tokens ) ) {
			$result = [
				'valid' => false,
				'error' => 'Domain not found',
			];
		}

		if ( ! empty( $available_tokens ) ) {
			$available_tokens = array_filter(
				$available_tokens,
				function( $available_token ) use ( $to_check_token ) {
					return $available_token['fb_token'] === $to_check_token;
				}
			);
			if ( empty( $available_tokens ) ) {
				$result = [
					'valid' => false,
					'error' => 'Token not found',
				];
			}
		}

		if ( ! empty( $available_tokens ) ) {
			$available_tokens = array_filter(
				$available_tokens,
				function( $available_token ) use ( $current_time ) {
					return $available_token['fb_token_expiry_date'] > $current_time;
				}
			);
			if ( empty( $available_tokens ) ) {
				$result = [
					'valid' => false,
					'error' => 'Token expired',
				];
			}
		}

		if ( ! empty( $available_tokens ) ) {
			$result = [ 'valid' => true ];
		}

		wp_send_json( $result );
		fp_die();
	}
}

FP_Site_Options::get_instance()::init( glob( get_stylesheet_directory() . '/site-options/*.*' ) );
