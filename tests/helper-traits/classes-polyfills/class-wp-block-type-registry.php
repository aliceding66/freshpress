<?php
/**
 * WP_Block_Type_Registry mock class.
 *
 * @package FreshPress\Website
 */

if ( ! class_exists( 'WP_Block_Type_Registry' ) ) {

	/**
	 * WP_Block_Type_Registry class.
	 */
	class WP_Block_Type_Registry {

		/**
		 * Singleton.
		 *
		 * @var WP_Block_Type_Registry
		 */
		private static $instance;

		/**
		 * WP_Block_Type_Registry mocked data.
		 *
		 * @var array
		 */
		private $mocked_data = [];

		/**
		 * Singleton.
		 *
		 * @return WP_Block_Type_Registry
		 */
		public static function get_instance() {
			if ( empty( static::$instance ) ) {
				static::$instance = new WP_Block_Type_Registry();
			}

			return static::$instance;
		}

		/**
		 * Helper function to mock class data.
		 *
		 * @param array $mocked_data Mocked data.
		 */
		public function mock_data( $mocked_data ) {
			$this->mocked_data = $mocked_data;
		}

		/**
		 * Return all registered blocks.
		 *
		 * @return array
		 */
		public function get_all_registered() {
			if ( ! empty( $this->mocked_data['blocks'] ) ) {
				return $this->mocked_data['blocks'];
			} else {
				return [];
			}
		}
	}
}
