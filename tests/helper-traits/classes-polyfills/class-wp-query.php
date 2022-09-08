<?php
/**
 * WP_Query mock class.
 *
 * @package FreshPress\Website
 */

if ( ! class_exists( 'WP_Query' ) ) {

	/**
	 * WP_Query class.
	 */
	class WP_Query {

		/**
		 * WP_Query mocked data.
		 *
		 * @var array
		 */
		private $mocked_data = [];

		/**
		 * Bool if is main query.
		 *
		 * @var bool
		 */
		private $main_query = false;

		/**
		 * Is post type archive.
		 *
		 * @var bool
		 */
		public $is_post_type_archive = null;

		/**
		 * Users table.
		 *
		 * @var string
		 */
		public $users = 'wp_users';

		/**
		 * Usermeta table.
		 *
		 * @var string
		 */
		public $usermeta = 'wp_usermeta';

		/**
		 * WP_Query constructor.
		 *
		 * @param mixed $data Mocked data.
		 */
		public function __construct( $data = [] ) {
			$this->mocked_data = (array) $data;
		}

		/**
		 * Retrieve field.
		 *
		 * @param string $name Field name.
		 *
		 * @return mixed
		 */
		public function get( $name ) {
			if ( isset( $this->mocked_data[ $name ] ) ) {
				return $this->mocked_data[ $name ];
			}

			return null;
		}

		/**
		 * Set field.
		 *
		 * @param string $name Field to be mocked.
		 * @param mixed  $value Value to be mocked.
		 */
		public function set( $name, $value ) {
			$this->mocked_data[ $name ] = $value;
		}

		/**
		 * If is main query.
		 *
		 * @return bool
		 */
		public function is_main_query() {
			return $this->main_query;
		}

		/**
		 * Set if is main query.
		 *
		 * @param bool $main_query If is main query.
		 */
		public function set_is_main_query( $main_query ) {
			$this->main_query = $main_query;
		}

		/**
		 * WP_Query base function.
		 *
		 * @return mixed
		 */
		public function get_var() {
			return null;
		}

		/**
		 * WP_Query base function.
		 *
		 * @return mixed
		 */
		public function prepare() {
			return null;
		}
	}
}
