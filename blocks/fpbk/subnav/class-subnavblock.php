<?php
/**
 * Subnav class.
 *
 * @package FreshpressBlocks\Subnav
 * @subpackage Subnav
 */

namespace FreshpressBlocks;

use WP_Error;

/**
 * Load custom NavWalker.
 */
require_once __DIR__ . '/class-subnavwalker.php';

/**
 * Class Subnav
 *
 * @package FreshpressBlocks
 */
class SubnavBlock extends ABlock {
	/**
	 * SubnavBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'subnav-block' );
		$this->enqueue_editor_style();
		$this->enqueue_style();

		$this->initiate_block_attributes();

		$this->register_get_subnav_menus_endpoint();
		$this->register_filters();
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
			$attributes,
			[
				'class' => 'row d-block my-0',
			]
		);

		$menu = $this->get_subnav_menu( $attributes['subnav_menu'] );

		return <<< HTML
<div {$wrapper_properties}>
	{$this->get_desktop_subnav( $menu )}
	{$this->get_mobile_subnav( $menu )}
</div>
HTML;
	}

	/**
	 * Handles get subnav menus endpoint.
	 *
	 * @param array $data Data from Ajax call.
	 *
	 * @return array
	 * @throws Exception If there is missing param passed.
	 */
	public function handle_get_subnav_menus_endpoint( $data ) {
		if ( ! empty( $data['menu'] ) ) {
			return wp_send_json(
				[
					'desktop' => $this->get_desktop_subnav( $data['menu'] ),
					'mobile'  => $this->get_mobile_subnav( $data['menu'] ),
				]
			);
		} else {
			return wp_send_json_error( 'Missing param.', 400 );
		}
	}

	/**
	 * Authorizes get subnav menus endpoint.
	 *
	 * @return bool
	 */
	public function authorize_get_subnav_menus_endpoint() {
		if ( function_exists( 'fp_authorize_ajax_call' ) ) {
			return fp_authorize_ajax_call();
		} else {
			return true;
		}
	}

	/**
	 * Get menu object.
	 *
	 * @param string $selected_menu Selected menu.
	 *
	 * @return string
	 */
	public function get_subnav_menu( $selected_menu = 'subnav-menu' ) {
		$subnav_menu_field = $this->block_attributes['subnav_menu'];

		if (
			! empty( $subnav_menu_field['choices'] )
			&& ! empty( $subnav_menu_field['choices'][ $selected_menu ] )
		) {
			return $this->block_attributes['subnav_menu']['choices'][ $selected_menu ];
		} else {
			if ( function_exists( 'fp_add_menus_to_field_choices' ) ) {
				$subnav_menu_field = fp_add_menus_to_field_choices( [] );
				if (
					! empty( $subnav_menu_field['choices'] )
					&& ! empty( $subnav_menu_field['choices'][ $selected_menu ] )
				) {
					return $subnav_menu_field['choices'][ $selected_menu ];
				}
			}
		}

		// Fallback logic if above fails.
		if ( ! empty( $selected_menu ) ) {
			return 'Subnav Menu';
		} else {
			return '';
		}
	}

	/**
	 * Initiate block attributes.
	 *
	 * @param string $override_block_name Pass block name if in ACF file is different from in block.json.
	 */
	protected function initiate_block_attributes( $override_block_name = '' ) {
		parent::initiate_block_attributes();

		$this->block_attributes['subnav_menu']['default'] = 'primary-navigation';
	}

	/**
	 * Registers WP filters.
	 */
	private function register_filters() {
		if ( function_exists( 'fp_add_menus_to_field_choices' ) ) {
			add_filter( 'acf/load_field/name=subnav_menu', 'fp_add_menus_to_field_choices' );
		}
	}

	/**
	 * Retrieves Desktop Subnav Menu.
	 *
	 * @param string $menu_label Menu label.
	 *
	 * @return string
	 */
	private function get_desktop_subnav( $menu_label = 'Menu' ) {
		if ( ! empty( $menu_label ) ) {
			$args = $this->get_subnav_args(
				'subnav_menu',
				$menu_label,
				[
					'menu_class'      => 'subnav_menu d-flex flex-nowrap justify-content-around align-items-center list-unstyled mb-0 py-0',
					'container_class' => 'subnav__desktop d-none d-lg-block',
					'items_wrap'      => '<nav class="subnav__items" role="navigation"><ul id="%1$s" class="%2$s">%3$s</ul></nav>',
					'link_before'     => '<span>',
					'link_after'      => '</span>',
				]
			);

			return $this->fetch_menu( $args );
		}

		return '';
	}

	/**
	 * Retrieves Mobile Subnav Menu.
	 *
	 * @param string $menu_label Menu label.
	 *
	 * @return string
	 */
	private function get_mobile_subnav( $menu_label = 'Menu' ) {
		if ( ! empty( $menu_label ) ) {
			$args = $this->get_subnav_args(
				'subnav_menu_mobile',
				$menu_label,
				[
					'menu_class'      => 'subnav_menu_mobile custom-select custom-select-lg d-flex flex-row justify-content-center align-items-center',
					'container_class' => 'subnav__mobile pt-4 d-lg-none',
					'items_wrap'      => '<nav class="subnav__items d-flex flex-row justify-content-center align-items-center" role="navigation"><select id="%1$s" class="%2$s">%3$s</select></nav>',
				]
			);

			return $this->fetch_menu( $args );
		}

		return '';
	}

	/**
	 * Get $args for menu.
	 *
	 * @param string $id Menu id.
	 * @param string $menu_label Menu label.
	 * @param array  $args Custom $args passed to subnav args.
	 *
	 * @return array
	 */
	private function get_subnav_args( $id, $menu_label, $args = [] ) {
		return array_merge(
			[
				'container' => 'div',
				'menu'      => $menu_label,
				'menu_id'   => $id,
				'walker'    => new SubnavWalker(),
			],
			$args
		);
	}

	/**
	 * Register get subnav menus endpoint.
	 */
	private function register_get_subnav_menus_endpoint() {
		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'fp/v1',
					'/get_subnav_menus/(?P<menu>[a-zA-Z-_]+)/',
					[
						'methods'             => 'GET',
						'callback'            => [ $this, 'handle_get_subnav_menus_endpoint' ],
						'permission_callback' => [ $this, 'authorize_get_subnav_menus_endpoint' ],
					]
				);
			}
		);
	}

	/**
	 * Returns menu as a string.
	 *
	 * @param array $args Menu $args.
	 *
	 * @return string
	 */
	private function fetch_menu( $args ) {
		ob_start();
		(string) wp_nav_menu( $args );

		return ob_get_clean();
	}
}
