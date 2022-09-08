<?php
/**
 * Primary Nav With Description.
 *
 * @package FreshPress\Website
 */

/**
 * Nav Walker.
 *
 * Adds description to specific items.
 */
class FP_Primary_Nav_With_Description extends Walker_Nav_Menu {

	/**
	 * Add description flag.
	 *
	 * @var boolean
	 */
	public $add_description = false;

	/**
	 * Description.
	 *
	 * @var string
	 */
	public $description = '';

	/**
	 * Start level.
	 *
	 * @param string $output The output.
	 * @param int    $depth The depth of nav.
	 * @param array  $args The arguments.
	 */
	public function start_lvl( &$output, $depth = 0, $args = [] ) {
		if ( $this->add_description ) {
			$output .= '<ul class="sub-menu"><li class="header__nav--description">' . $this->description . '</li>';
		} else {
			$output .= '<ul class="sub-menu">';
		}
	}

	/**
	 * End level.
	 *
	 * @param string $output The output.
	 * @param int    $depth The depth of nav.
	 * @param array  $args The arguments.
	 */
	public function end_lvl( &$output, $depth = 0, $args = [] ) {
		if ( strpos( $output, '<a>' ) !== false ) {
			$output = str_replace( '<a>', '<a tabindex="0">', $output );
		}

		$output .= '</ul><div class="tri-outer d-none"></div><div class="tri-inner d-none"></div>';
	}

	/**
	 * Start el.
	 *
	 * @param string $output The output.
	 * @param object $item The item.
	 * @param int    $depth The depth of nav.
	 * @param array  $args The arguments.
	 * @param int    $id The element id.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ) {
		$this->add_description = in_array( 'custom-dropdown', $item->classes, true );

		if ( $this->add_description ) {
			$this->description = $item->description;
		}

		parent::start_el( $output, $item, $depth, $args, $id );
	}
}
