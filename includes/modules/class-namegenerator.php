<?php
/**
 * Business Name Generator.
 *
 * @package FreshPress\Website
 */

/**
 * NameGenerator class.
 */
class NameGenerator {
	/**
	 * Industry name variable.
	 *
	 * @var $industry string Industry name.
	 */
	private $industry;

	/**
	 * Keywords variable.
	 *
	 * @var $key_word string Keywords.
	 */
	private $key_word;

	/**
	 * Start variable.
	 *
	 * @var $start string Start.
	 */
	private $start;

	/**
	 * Templates variable.
	 *
	 * @var $templates string Templates.
	 */
	private $templates;

	/**
	 * Construct name.
	 *
	 * @param string $industry Industry for name being requested.
	 * @param string $key_word Key word provided for the business name.
	 * @param int    $start Index to start generating names (defaults to 0).
	 */
	public function __construct( $industry, $key_word, $start = 0 ) {
		$this->industry = $industry;
		$this->key_word = $key_word;
		$this->start = $start;
		$this->templates = $this->get_templates( $industry );
	}

	/**
	 * The templates are hardcoded for now but should be read in from somewhere?
	 *
	 * @param string $industry Industry name.
	 * @return array
	 */
	private function get_templates( $industry ) {
		if ( 'creatives' == $industry ) {
			return [
				'{} Shop',
				'{} Idea',
				'{} Concept',
				'{} Pixel Perfect',
				'{} Space',
				'{} Union',
				'{} Portfolio',
				'{} Interactive',
				'{} Creative',
				'{} Agency',
				'{} Biz',
				'{} Avant-garde',
				'{} Bonanza',
				'{} Art Market',
				'{} Solutions',
				'The {} Group',
				'{} Collective',
				'{} Crew',
				'Unique {}',
				'{} Creations',
				'{} Boutique',
				'{} Studio',
				'Studio {}',
				'Creative {}',
				'{} Collective',
				'House of {}',
				'The Mighty {}',
				'{} Concepts',
				'{} Factory',
				'The Factory of {}',
			];
		} elseif ( 'legal' == $industry ) {
			return [
				'{} Biz',
				'{} And Order',
				'{} Leading Edge',
				'{} Theorem',
				'{} Foundation',
				'{} Market Watch',
				'{} Growth',
				'{} Business Center',
				'{} Counsel',
				'{} At-law',
				'{} Barrister',
				'{} Advisory',
				'The {} Group',
				'{} Partners',
				'{} Advisory',
				'{} Associates',
				'{} and Associates',
				'{} Council',
				'Council of {}',
			];
		} elseif ( 'trades' == $industry ) {
			return [
				'{} Homeservices',
				'{} Zervices',
				'{} Hammer Times',
				'{} Fabricator',
				'{} Maker',
				'{} Foundry',
				'{} General',
				'{} Co-op',
				'{} Artisan',
				'{} Jobber',
				'{} Megacorp',
				'{} Handy',
				'{} Depot',
				'{} Bolt & Nut',
				'{} Handicraft',
				'{} Enterprise',
				'{} Limited',
				'Trade of {}',
				'{} Foundry',
				'Foundry of {}',
				'{} Supplies',
			];
		} else {
			// $industry == 'it' at this point (should already be validated).
			return [
				'{} Limited',
				'{} Nerd Squad',
				'{} Compu-global',
				'{} Hyper-mega',
				'{} Micro-logic',
				'{} Abacus Inc',
				'{} Intelligence',
				'{} Data Processing',
				'{} Brain Trust',
				'{} Quadrants',
				'{} Gizmo',
				'{} Infinity',
				'{} Wizard',
				'{} Labs',
				'{} Solution',
				'{} Communications',
				'{} Enterprise',
				'Data {}',
				'{} Innovations',
				'{} Interactive',
				'Interactive {}',
				'{} Multimedia',
				'Cyber {}',
				'Infinity {}',
				'Digital {}',
				'{} Cybernauts',
				'{} Lightspeed',
				'{} Optics',
				'{} Technology',
				'{} Digital',
				'{} Cybertronics',
			];
		}
	}

	/**
	 * Generates names.
	 *
	 * @param int $number_of_names Number of names to generate.
	 * @return array[BusinessName]  An array of objects of type BusinessName.
	 */
	public function generate( $number_of_names ) {
		$names = [];
		for ( $i = 0; $i < $number_of_names; $i++ ) {
			$template = $this->templates[ ( $i + $this->start ) % count( $this->templates ) ];
			array_push( $names, new BusinessName( $template, $this->key_word ) );
		}
		return $names;
	}
}

/**
 * BusinessName class.
 */
class BusinessName {
	/**
	 * Construct name.
	 *
	 * @var $name string name.
	 */
	public $name;

	/**
	 * Using a class for this for when it expands to have more fields.
	 *
	 * @param string $template template for the business name where {} will be replaced by the key word.
	 * @param string $key_word key word being used to generate the name.
	 */
	public function __construct( $template, $key_word ) {
		$this->name = str_replace( '{}', $key_word, $template );
	}
}

/**
 * Business Name Generator logic.
 *
 * @param array $request Request { industry: string, key_word: string, count: int, start: int, nonce: string }.
 */
function fp_business_name_generator( $request ) {
	$industry = $request->get_param( 'industry' );
	$nonce = $request->get_param( 'nonce' );
	$key_word = $request->get_param( 'key_word' );
	$start = intval( $request->get_param( 'start' ) );
	$count = intval( $request->get_param( 'count' ) );

	// Check if nonce empty.
	if ( ! isset( $nonce ) ) {
		$response = new WP_REST_Response( [ 'message' => 'Nonce is empty' ] );
		$response->set_status( 400 );
		return $response;
	}

	// Verify nonce.
	if ( ! wp_verify_nonce( $nonce, 'business_name_generator' ) && ! fp_authorize_ajax_call() ) {
		$response = new WP_REST_Response( [ 'message' => 'Nonce is invalid.' ] );
		$response->set_status( 400 );
		return $response;
	}

	// Server side validation.
	$errors = [];

	if ( empty( $industry ) ) {
		array_push( $errors, 'Industry not provided.' );
	} elseif ( ! preg_match( '/^(creatives|legal|trades|it)$/', $industry ) ) {
		array_push( $errors, 'Industry not valid.' );
	}

	if ( empty( $key_word ) ) {
		array_push( $errors, 'Key Word not provided.' );
	} elseif ( ! preg_match( '/^[a-zA-Z0-9][a-zA-Z\'0-9\-]*( [a-zA-Z0-9][a-zA-Z\'0-9\-]*)*$/', $key_word ) ) {
		array_push( $errors, 'Key Word not valid.' );
	}

	if ( empty( $count ) ) {
		array_push( $errors, 'Count not provided.' );
	} elseif ( $count <= 0 ) {
		array_push( $errors, 'Count not valid.' );
	}

	if ( empty( $start ) || $start < 0 ) {
		array_push( $errors, 'Start not valid.' );
	}

	if ( ! empty( $errors ) ) {
		$response = new WP_REST_Response( $errors );
		$response->set_status( 400 );
		return $response;
	} else {
		$name_generator = new NameGenerator( $industry, $key_word, $start );
		$names = $name_generator->generate( $count );
		return $names;
	}
}

/**
 * Register BNG rest route.
 */
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'bng',
			'/generate/',
			[
				'methods'             => 'GET',
				'callback'            => 'fp_business_name_generator',
				'permission_callback' => '__return_true',
			]
		);
	}
);
