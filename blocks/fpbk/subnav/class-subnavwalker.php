<?php
/**
 * Generate subnav menu items in the style of a list for use with desktop viewport.
 *
 * @package FreshPress\Website
 */

namespace FreshpressBlocks;

use Walker_Nav_Menu, WP_Post, stdClass;

/**
 * Nav Walker.
 *
 * Outputs list elements with defined attributes for available menu items.
 */
class SubnavWalker extends Walker_Nav_Menu {
	/**
	 * Start el.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param WP_Post  $item   Menu item data object.
	 * @param int      $depth  Depth of menu item.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 * @param int      $id     Current item ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$menu_item_id = $item->ID ? "menu-item-{$item->ID}" : '';
		if ( is_array( $item->classes ) ) {
			$item->classes[] = esc_attr( $menu_item_id );
		} else {
			$item->classes .= ( ' ' . esc_attr( $menu_item_id ) );
		}

		if ( ! empty( $args->menu_id ) && fp_ends_with( $args->menu_id, '_mobile' ) ) {
			$attrs = [
				'id'       => esc_attr( $menu_item_id ),
				'class'    => esc_attr( implode( ' ', $item->classes ) ),
				'selected' => $item->current ? 'selected' : '',
				'data-url' => esc_url( $item->url ),
			];

			$output .= '<option '
					. array_reduce(
						array_keys( $attrs ),
						function( $carry, $key ) use ( $attrs ) {
							return empty( $attrs[ $key ] ) ? $carry : "$carry $key=\"{$attrs[ $key ]}\"";
						},
						''
					)
					. ">{$item->title}";
		} else {
			$item->classes = array_merge(
				$item->classes,
				[
					'text-center',
					'flex-grow-1',
					'flex-shrink-0',
					'mb-0',
					'py-1',
				]
			);

			$item->link_classes = [
				'text-decoration-none',
				'd-block',
				'py-3',
			];

			parent::start_el( $output, $item, $depth, $args, $id );
		}
	}

	/**
	 * End el.
	 *
	 * @param string   $output Used to append additional content (passed by reference).
	 * @param WP_Post  $item   Menu item data object.
	 * @param int      $depth  Depth of menu item.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		if ( ! empty( $args->menu_id ) && fp_ends_with( $args->menu_id, '_mobile' ) ) {
			$output .= "</option>\n";
		} else {
			parent::end_el( $output, $item, $depth, $args );
		}
	}
}
