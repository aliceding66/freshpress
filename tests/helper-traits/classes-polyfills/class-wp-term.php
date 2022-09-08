<?php
/**
 * WP_Term mock class.
 *
 * @package FreshPress\Website
 */

if ( ! class_exists( 'WP_Term' ) ) {

	/**
	 * WP_Term class.
	 */
	class WP_Term {

		/**
		 * WP_Term mocked data.
		 *
		 * @var array
		 */
		private $mocked_data = [];

		/**
		 * WP_Term constructor.
		 *
		 * @param mixed $data Mocked data.
		 */
		public function __construct( $data = [] ) {
			if ( ! is_array( $data ) && ! is_object( $data ) ) {
				if ( is_numeric( $data ) || is_string( $data ) ) {
					$data = [ 'term_id' => $data ];
				} else {
					$data = [];
				}
			}

			$this->mocked_data = (array) $data;
		}

		/**
		 * Retrieve field like in object.
		 *
		 * @param string $name Field name.
		 *
		 * @return mixed
		 */
		public function &__get( $name ) {
			return $this->mocked_data[ $name ];
		}

		/**
		 * Set field like in object.
		 *
		 * @param string $name Field to be mocked.
		 * @param mixed  $value Value to be mocked.
		 */
		public function __set( $name, $value ) {
			$this->mocked_data[ $name ] = $value;
		}

		/**
		 * Check if field exists.
		 *
		 * @param string $name Field to be checked.
		 *
		 * @return bool
		 */
		public function __isset( $name ) {
			return isset( $this->mocked_data[ $name ] );
		}
	}
}
