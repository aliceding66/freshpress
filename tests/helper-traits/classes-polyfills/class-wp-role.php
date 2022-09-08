<?php
/**
 * WP_Role mock class.
 *
 * @package FreshPress\Website
 */
class WP_Role {
	/**
	 * Role name.
	 *
	 * @since 2.0.0
	 * @var string
	 */
	public $name;

	/**
	 * List of capabilities the role contains.
	 *
	 * @since 2.0.0
	 * @var bool[] Array of key/value pairs where keys represent a capability name and boolean values
	 *             represent whether the role has that capability.
	 */
	public $capabilities;

	/**
	 * Constructor - Set up object properties.
	 *
	 * The list of capabilities must have the key as the name of the capability
	 * and the value a boolean of whether it is granted to the role.
	 *
	 * @since 2.0.0
	 *
	 * @param string $role         Role name.
	 * @param bool[] $capabilities Array of key/value pairs where keys represent a capability name and boolean values
	 *                             represent whether the role has that capability.
	 */
	public function __construct( $role, $capabilities ) {
		$this->name         = $role;
		$this->capabilities = $capabilities;
	}

	/**
	 * Assign role a capability.
	 *
	 * @since 2.0.0
	 *
	 * @param string $cap   Capability name.
	 * @param bool   $grant Whether role has capability privilege.
	 */
	public function add_cap( $cap, $grant = true ) {
		return;
	}

	/**
	 * Removes a capability from a role.
	 *
	 * @since 2.0.0
	 *
	 * @param string $cap Capability name.
	 */
	public function remove_cap( $cap ) {
		return;
	}
}
