<?php
/**
 * Fastly_Cache_Keys mock class.
 * Class name is actually made up as I didn't find original class name and well this is not important to perform test with it.
 *
 * @package FreshPress\Website
 */

if ( ! class_exists( 'Fastly_Cache_Keys' ) ) {

	/**
	 * Fastly_Cache_Keys class.
	 */
	class Fastly_Cache_Keys {

		/**
		 * Fastly_Cache_Keys keys.
		 *
		 * @var array
		 */
		private $keys = [];

		/**
		 * Add key to object.
		 *
		 * @param string $key Key to be added.
		 */
		public function add_key( $key ) {
			$this->keys[] = $key;
			$this->keys = array_unique( $this->keys );
		}

		/**
		 * Return keys.
		 *
		 * @return array
		 */
		public function get_keys() {
			return $this->keys;
		}
	}
}
