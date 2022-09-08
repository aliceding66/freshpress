<?php
/**
 * WebinarsList class.
 *
 * @package FreshpressBlocks\WebinarsList
 * @subpackage WebinarsList
 */

namespace FreshpressBlocks;

require get_stylesheet_directory() . '/vendor/autoload.php';

use Carbon\Carbon;
use \Firebase\JWT\JWT;
use \DateTime;
use \WP_REST_Request;

/**
 * Class WebinarsList

 * @package FreshpressBlocks
 */
class WebinarsListBlock extends ABlock {
	/**
	 * WebinarsListBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
		$this->enqueue_style();

		$this->initiate_template_data();

		$this->register_test_webinars_api_endpoint();
	}
	/**
	 * Return evaluated Mustache template
	 *
	 * @param string $local_path Local path to template.
	 * @param array  $template_data Data to be passed to Mustache template.
	 *
	 * @return string
	 */
	public function load_template( $local_path, $template_data ) {
		$this->set_template_partials(
			[
				'webinar' => 'templates/webinar.partial.mustache',
			]
		);

		return parent::load_template( $local_path, $template_data );
	}
	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$webinars = $this->get_upcoming_webinars( $additional_template_data );

		$additional_template_data['webinars'] = $webinars->webinars;

		if ( ! empty( $additional_template_data['webinars'] ) ) {
			foreach ( $additional_template_data['webinars'] as $key => $webinar ) {
				$additional_template_data['webinars'][ $key ]['button'] = fp_render_blocks(
					[
						'name'  => 'button',
						'attrs' => [
							'button_link'      => [
								'title' => __( 'Register', 'freshpress-website' ),
								'url'   => $webinar['url'],
							],
							'button_max_width' => '143px',
							'className'        => 'is-style-btn-white',
						],
					]
				);
			}
		}
		return parent::get_template_data( $additional_template_data );
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$button = fp_render_blocks(
			[
				'name'  => 'button',
				'attrs' => [
					'button_link'      => [
						'title' => __( 'Register', 'freshpress-website' ),
						'url'   => '#0',
					],
					'button_max_width' => '143px',
					'className'        => 'is-style-btn-white',
				],
			]
		);

		$this->set_static_template_data(
			[
				'webinars' => [
					[
						'topic'     => __( "101: Webinar's topic", 'freshpress-website' ),
						'date'      => 'Saturday February 01, 2022',
						'startTime' => '1:30 pm',
						'endTime'   => '2:30 pm',
						'timezone'  => 'EDT',
						'button'    => $button,
					],
					[
						'topic'     => __( "201: Webinar's topic", 'freshpress-website' ),
						'date'      => 'Sunday February 02, 2022',
						'startTime' => '1:30 pm',
						'endTime'   => '2:30 pm',
						'timezone'  => 'EDT',
						'button'    => $button,
					],
				],
			],
			'webinarsListTemplateData'
		);
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
			$attributes
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}

	/**
	 * Build upcoming webinars data from response
	 *
	 * This function is used in blade files to get webinars
	 *
	 * @param  array $attributes  Block's attributes.
	 * @return mixed
	 */
	private function get_upcoming_webinars( $attributes ) {
		$params = [
			'user_id'       => $attributes['user_id'] ?? false,
			'api_key'       => $attributes['api_key'] ?? false,
			'api_secret'    => $attributes['api_secret'] ?? false,
			'visible_count' => $attributes['visible_count'] ?? 6,
		];

		if ( empty( $params['user_id'] ) || empty( $params['api_key'] ) || empty( $params['api_secret'] ) ) {
			return (object) [
				'message'  => 'Missing authorization data',
				'webinars' => [],
			];
		}

		// Get available webinar info.
		$webinars = [];
		$page_number = 1;
		$page_size = 30;
		$api_base_url = 'https://api.zoom.us/v2/';

		do {
			// Build endpoint.
			$user_endpoint = $api_base_url . 'users/' . $params['user_id'] . '/webinars';

			// Create expiring access JWT.
			$token = [
				'iss' => $params['api_key'],
				'exp' => time() + 60, // 1 min expiration.
			];
			$jwtoken = JWT::encode( $token, $params['api_secret'] );
			$access_token = 'access_token=' . $jwtoken;

			// Request upcoming webinars.
			$api_url = $user_endpoint . "?$access_token&page_size=$page_size&page_number=$page_number";
			$api_args = [
				'headers' => [
					"Authorization: Bearer $access_token",
				],
			];
			$response = wp_remote_get( $api_url, $api_args );

			// Handle response.
			$webinar_data = $this->check_api_response( $response );
			if ( ! isset( $webinar_data->data ) ) {
				return (object) [
					'message'  => $webinar_data->message,
					'webinars' => [],
				];
			}

			// Parse response data.
			foreach ( $webinar_data->data->webinars as $webinar ) {
				// If recurring, get next recurring date (default shows last for some reason).
				if ( 6 == $webinar->type || 9 == $webinar->type ) {
					// Build endpoint for this webinar.
					$webinar_endpoint = $api_base_url . "webinars/$webinar->id?$access_token";
					$webinar_response = wp_remote_get( $webinar_endpoint, $api_args );

					// Check for status/error message.
					if ( is_wp_error( $webinar_response ) ) {
						$webinar_response = new WP_REST_Response( [ 'message' => 'Wordpress Error' ] );
						$webinar_response->set_status( 400 );
						return $webinar_response;
					} else {
						$webinar_response = $this->check_api_response( $webinar_response );
					}

					$occurrences = (array) $webinar_response->data->occurrences;
					if ( ! empty( $occurrences ) ) {
						// Return the next occurrence start time.
						foreach ( $occurrences as $occurrence ) {
							if ( 'deleted' !== $occurrence->status ) {
								$now = new Carbon();
								$start = new Carbon( $occurrence->start_time );
								if ( $now < $start ) {
									return $occurrence->start_time;
								}
							}
						}
					}
				}

				// Check if webinar expired.
				$now = new Carbon();
				$webinar_start = new Carbon( $webinar->start_time );
				$webinar_end = $webinar_start->addMinutes( $webinar->duration );
				$is_expired = $now >= $webinar_end;
				if ( ! $webinar->start_time || $is_expired ) {
					continue;
				}

				// Get formatted date and time values for webinar display.
				$est_datetime = $this->get_datetime( $webinar->start_time, $webinar_end->format( DateTime::ISO8601 ) );

				/* phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase */
				$webinars[] = [
					'topic'     => $webinar->topic,
					'url'       => esc_url( $webinar->join_url ),
					'timezone'  => $est_datetime->timezone,
					'startTime' => $est_datetime->startTime,
					'endTime'   => $est_datetime->endTime,
					'date'      => $est_datetime->date,
					'duration'  => $webinar->duration,
				];
				/* phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase */
			}

			$page_number = $webinar_data->data->page_number + 1;
		} while ( isset( $webinar_data->data ) && $webinar_data->data->page_number < $webinar_data->data->page_count );

		// Data to display.
		return (object) [
			'message'  => $webinar_data->message,
			'webinars' => array_slice( $webinars, 0, $params['visible_count'] ),
		];
	}

	/**
	 * Function to get formatted date and time of webinar in eastern local timezone
	 *
	 * @param  string $start    Start datetime.
	 * @param  string $end      End datetime.
	 * @return object
	 */
	private function get_datetime( $start, $end ) {
		$webinar_start = Carbon::parse( $start )->tz( 'America/Toronto' );
		$webinar_end = Carbon::parse( $end )->tz( 'America/Toronto' );

		return (object) [
			'date'      => $webinar_start->format( 'l F j, Y' ),
			'startTime' => $webinar_start->format( 'g:i a' ),
			'endTime'   => $webinar_end->format( 'g:i a' ),
			'timezone'  => $webinar_start->format( 'T' ), // This will always be EDT since we are setting it in set_timezone.
		];
	}

	/**
	 * Check api response and return custom obj for error handling
	 *
	 * @param  Object $response API response to check.
	 * @return Object
	 */
	private function check_api_response( $response ) {
		$response_code = wp_remote_retrieve_response_code( $response );
		$body = wp_remote_retrieve_body( $response );
		$response_msg = wp_remote_retrieve_response_message( $response );

		if ( 200 == $response_code && 'OK' == $response_msg ) {
			$obj = (object) [
				'code'    => $response_code,
				'message' => $response_msg,
				'data'    => json_decode( $body ),
			];
		} else {
			$obj = (object) [
				'code'    => $response_code,
				'message' => $response_msg,
			];
		}

		return $obj;
	}

	/**
	 * Register test webinars api endpoint.
	 */
	private function register_test_webinars_api_endpoint() {
		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'fp/v1',
					'/test-webinars-api',
					[
						'methods'             => 'POST',
						'callback'            => [ $this, 'handle_test_webinars_api_endpoint' ],
						'permission_callback' => [ $this, 'authorize_test_webinars_api_endpoint' ],
					]
				);
			}
		);
	}

	/**
	 * Handles test webinars api endpoint.
	 *
	 * @param WP_REST_Request $data Data from Ajax call.
	 *
	 * @return bool
	 */
	public function handle_test_webinars_api_endpoint( $data ) {
		try {
			return $this->get_upcoming_webinars( $data->get_json_params() )->message === 'OK';
		} catch ( \Exception $e ) {
			return false;
		}
	}

	/**
	 * Authorizes test webinars api endpoint.
	 *
	 * @return bool
	 */
	public function authorize_test_webinars_api_endpoint() {
		if ( function_exists( 'fp_authorize_ajax_call' ) ) {
			return fp_authorize_ajax_call();
		} else {
			return true;
		}
	}
}
