<?php
/**
 * Accounting Partners AJAX Functions
 *
 * @package FreshPress\Website
 */

/**
 * Filter Ajax.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_accounting_partners_filter( WP_REST_Request $request ) {
	if ( isset( $request['values'] ) ) {
		$data = fp_recursive_sanitize_text_field($request['values']); // phpcs:ignore
	} else {
		return 'Missing $POST variable';
	}

	$accounting_partners_industry = fp_slugs_to_array( $data['accounting_partners_industry'] );
	$accounting_partners_service = fp_slugs_to_array( $data['accounting_partners_service'] );
	$accounting_partners_location = fp_slugs_to_array( $data['accounting_partners_location'], true );
	$accounting_partners_language = fp_slugs_to_array( $data['accounting_partners_language'] );

	$tax_query = [];

	$paged = $data['page'] ? $data['page'] : 1;

	$args = [
		'post_type'   => 'accounting_partners',
		'post_status' => 'publish',
		'paged'       => $paged,
	];

	if ( ( ! empty( $accounting_partners_industry ) && ! empty( $accounting_partners_service ) ) ||
		( ! empty( $accounting_partners_industry ) && ! empty( $accounting_partners_location ) ) ||
		( ! empty( $accounting_partners_industry ) && ! empty( $accounting_partners_language ) ) ||
		( ! empty( $accounting_partners_service ) && ! empty( $accounting_partners_location ) ) ||
		( ! empty( $accounting_partners_service ) && ! empty( $accounting_partners_language ) ) ||
		( ! empty( $accounting_partners_location ) && ! empty( $accounting_partners_language ) )
	) :
		$args['tax_query'] = [
			'relation' => 'AND',
		];
	endif;
	if ( ! empty( $accounting_partners_service ) ) :
		$tax_query[] = [
			'taxonomy' => 'accounting_partners_service',
			'field'    => 'slug',
			'terms'    => $accounting_partners_service,
		];
	endif;
	if ( ! empty( $accounting_partners_industry ) ) :
		$tax_query[] = [
			'taxonomy' => 'accounting_partners_industry',
			'field'    => 'slug',
			'terms'    => $accounting_partners_industry,
		];
	endif;
	if ( ! empty( $accounting_partners_location ) ) :
		$tax_query[] = [
			'taxonomy' => 'accounting_partners_location',
			'field'    => 'slug',
			'terms'    => $accounting_partners_location,
		];
	endif;
	if ( ! empty( $accounting_partners_language ) ) :
		$tax_query[] = [
			'taxonomy' => 'accounting_partners_language',
			'field'    => 'slug',
			'terms'    => $accounting_partners_language,
		];
	endif;

	if ( ! empty( $accounting_partners_industry ) || ! empty( $accounting_partners_service ) || ! empty( $accounting_partners_location ) || ! empty( $accounting_partners_language ) ) :
		$args['tax_query'] = $tax_query;
	endif;

	$the_query = new WP_Query( $args );

	$ap_page = get_page_by_path( 'accounting-partners', OBJECT, 'page' );
	$ap_content = get_post( $ap_page->ID );
	$ap_blocks = parse_blocks( $ap_content->post_content );

	if ( $the_query->have_posts() ) :
		$count = 0;
		$post_count = $the_query->post_count;
		$terms_obj = new stdClass();
		$mid_size = 2;
		$end_size = 3;

		if ( wp_is_mobile() ) {
			$mid_size = 1;
			$end_size = 2;
		}

		$html .= '
		<div class="accounting-partners-content__container">';
		while ( $the_query->have_posts() ) :
			$the_query->the_post();
			$service_obj = new stdClass();
			$industry_obj = new stdClass();
			$language_obj = new stdClass();

			$service_obj->terms = get_the_terms( get_the_ID(), 'accounting_partners_service' );
			$industry_obj->terms = get_the_terms( get_the_ID(), 'accounting_partners_industry' );
			$language_obj->terms = get_the_terms( get_the_ID(), 'accounting_partners_language' );

			$terms_obj->service = $service_obj;
			$terms_obj->industry = $industry_obj;
			$terms_obj->language = $language_obj;

			$html .= '<div class="accounting-partners-content__single">';

			$html .= '<div class="accounting-partners-content__profile-image">
						<a href="' . esc_url( get_the_permalink() ) . '">';

			if ( has_post_thumbnail() ) {
				$image_id = get_post_thumbnail_id( get_the_ID() );
				$image_url = wp_get_attachment_image_url( $image_id, 'medium' );
				$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				$html .= fp_render_img(
					$image_url,
					[
						'alt' => $image_alt,
					]
				);
			} else {
				$html .= fp_render_img(
					'images/accounting-partners/freshbooks-certified.png',
					[
						'alt' => 'Accounting Partner default logo',
					]
				);
			}
			$html .= '</a>
					</div>
					<div class="accounting-partners-content__profile-info">
						<h2><a href="' . esc_url( get_the_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></h2>
						<address>' . esc_html( get_field( 'am_address' ) ) . '</address>
						<div class="accounting-partners-content__description">' .
				wp_trim_words( esc_html( get_field( 'am_about' ) ), 35, '...' ) . '
						</div>
						<div class="accounting-partners-content__terms">';

			$terms = get_the_terms( get_the_ID(), 'accounting_partners_service' );
			foreach ( $terms as $term ) {
				$html .= '<span class="accounting-partners-content__term">' . esc_html( $term->name ) . '</span>';
			}
			$html .= '</div>
					</div>
					<a href="' . esc_url( get_the_permalink() ) . '" class="accounting-partners-content__button">
						' . esc_html( __( 'View Profile', 'freshpress-website' ) ) . '
					</a>';

			$html .= '</div>';

			if ( ( 5 >= $post_count && ( $count + 1 ) == $post_count ) || 4 == $count && ! empty( $ap_blocks ) ) :
				foreach ( $ap_blocks as $ap_block ) {
					if ( 'acf/accounting-partners-cta' == $ap_block['blockName'] ) {
						$html .= fp_render_blocks(
							[
								'name'  => 'accounting-partners-cta',
								'attrs' => [
									'data' => $ap_block['attrs']['data'],
								],
							],
						);
					}
				}
			endif;

			$count++;
		endwhile;
		$base = str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) );
		// Dynamic base from referer header as the pagination uses wp-json URL as base.
		if ( $request->get_header( 'referer' ) ) {
			$referer_url = $request->get_header( 'referer' );
			if ( strpos( $referer_url, '/page/' ) !== false ) {
				$referer_url = explode( 'page/', $referer_url )[0];
			}
			$base = trailingslashit( $referer_url ) . 'page/%#%/';
		}
		$html .= '<nav class="navigation accounting-partners-content__pagination">';
		$html .= paginate_links(
			[
				'base'      => $base,
				'format'    => '?paged=%#%',
				'current'   => max( 1, $paged ),
				'total'     => $the_query->max_num_pages,
				'prev_text' => 'Previous',
				'next_text' => 'Next',
				'mid_size'  => $mid_size,
				'end_size'  => $end_size,
			]
		);
		$html .= '</nav>';

		$html .= '</div>';
		wp_reset_postdata();
	endif;

	if ( '' == $html && ! empty( $ap_blocks ) ) {
		foreach ( $ap_blocks as $ap_block ) {
			if ( 'no-results' == $ap_block['attrs']['className'] ) {
				foreach ( $ap_block['innerBlocks'] as $element ) {
					$html .= $element['innerHTML'];
				}
			}
		}
	}

	if ( ! is_wp_error( $request ) ) {
		return new WP_REST_Response(
			[
				'body_response' => [ $html ],
			]
		);
	} else {
		return new WP_Error( $html );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/accounting-partners-filter',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_accounting_partners_filter',
				'permission_callback' => '__return_true',
			],
		);
	}
);

/**
 * Filter Ajax.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_accounting_partners_count_terms( WP_REST_Request $request ) {

	if ( isset( $request['values'] ) ) {
		$data = fp_recursive_sanitize_text_field($request['values']); // phpcs:ignore
	} else {
		return 'Missing $POST variable';
	}
	$all_terms = $data['all_terms_selected'];

	$terms = fp_ajax_get_updated_term_counts( $all_terms );

	if ( ! is_wp_error( $request ) ) {
		return new WP_REST_Response(
			[
				'body_response' => [ $terms ],
			]
		);
	} else {
		return new WP_Error( $data );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/accounting-partners-term-count',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_accounting_partners_count_terms',
				'permission_callback' => '__return_true',
			],
		);
	}
);

/**
 * Build Terms array
 *
 * @param array  $terms Terms.
 * @param object $tax Current Taxonomy.
 * @param int    $us_id US term ID.
 * @param int    $canada_id Canada term ID.
 * @return array
 */
function fp_get_terms_arr( $terms, $tax, $us_id, $canada_id ) {
	$terms_arr = [];
	foreach ( $terms as $term ) {
		$term_obj = new stdClass();

		if ( 'accounting_partners_location' == $tax->name ) {
			if ( 0 != $term->parent ) {
				$parent = get_term( $term->parent );
				$term_obj->parent_name = $parent->name;
				$term_obj->parent_slug = $parent->slug;
				if ( $parent->term_id == $us_id->term_id ) {
					$type = __( 'State', 'freshpress-website' );
					$type_code = 2;
				} elseif ( $parent->term_id == $canada_id->term_id ) {
					$type = __( 'Province', 'freshpress-website' );
					$type_code = 2;
				} else {
					$type = __( 'City', 'freshpress-website' );
					$type_code = 3;
				}
			} else {
				$type = __( 'Country', 'freshpress-website' );
				$type_code = 1;
			}
			$term_obj->type = $type;
			$term_obj->type_code = $type_code;
		}

		$term_obj->name = $term->name;
		$term_obj->name_slug = $term->slug;
		$terms_arr[] = $term_obj;
	}

	return $terms_arr;
}

/**
 * Get Account Taxnomies.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_accounting_partners_get_taxonomies( WP_REST_Request $request ) {
	$ap_taxonomies = [];
	$us_id = get_term_by( 'slug', 'us', 'accounting_partners_location' );
	$canada_id = get_term_by( 'slug', 'canada', 'accounting_partners_location' );

	foreach ( get_object_taxonomies( 'accounting_partners', 'objects' ) as $tax ) :
		$obj = new stdClass();
		$obj->name = $tax->label;
		$obj->name_slug = $tax->name;

		$terms = get_terms(
			[
				'taxonomy'   => $tax->name,
				'hide_empty' => true,
			]
		);
		$obj->terms = fp_get_terms_arr( $terms, $tax, $us_id, $canada_id );

		$ap_taxonomies[] = $obj;
	endforeach;

	if ( ! is_wp_error( $request ) ) {
		return new WP_REST_Response(
			[
				'body_response' => $ap_taxonomies,
			]
		);
	} else {
		return new WP_Error( $ap_taxonomies );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/get-am-taxonomies',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_accounting_partners_get_taxonomies',
				'permission_callback' => '__return_true',
			],
		);
	}
);

/**
 * Get Slugs from array of object and return them as a simple array
 *
 * @param   array   $array is an array of object.
 * @param   boolean $location works as conditional fo the $array we are adding.
 */
function fp_slugs_to_array( $array, $location = false ) {
	$new_arr = [];
	if ( $location ) {
		$array = $array[0];
		if ( count( $array ) > 1 ) {
			$array = [ array_pop( $array ) ];
		}
	}
	foreach ( $array as $arr ) {
		$new_arr[] = $arr['slug'];
	}
	return $new_arr;
}

/** Tranform terms to string with each element split with a divider
 *
 * @param   array $terms transform array of object in a string.
 */
function fp_terms_to_string( $terms ) {
	$str = 'location|';
	foreach ( $terms as $index => $term ) {
		if ( 0 !== $index ) {
			$str .= '|';
		}
		$str .= $term->slug;
	}
	return $str;
}

/** Custom Permalink Structure  */
function fp_accounting_partners_add_rewrite_rules() {
	$services = get_terms(
		[
			'taxonomy'   => 'accounting_partners_service',
			'hide_empty' => true,
		]
	);

	$locations = get_terms(
		[
			'taxonomy'   => 'accounting_partners_location',
			'hide_empty' => true,
		]
	);
	$str = fp_terms_to_string( $services ) . '|' . fp_terms_to_string( $locations );
	global $wp_rewrite;
	$new_rules = [
		'accounting-partners/(service|location)/(.+?)/(service|location)/(.+?)/?$' => 'index.php?post_type=accounting_partners&' . $wp_rewrite->preg_index( 1 ) . '=' . $wp_rewrite->preg_index( 2 ) . '&' . $wp_rewrite->preg_index( 3 ) . '=' . $wp_rewrite->preg_index( 4 ),
		'accounting-partners/(' . $str . ')/(.+)/?$' => 'index.php?post_type=accounting_partners&' . $wp_rewrite->preg_index( 1 ) . '=' . $wp_rewrite->preg_index( 2 ),
	];
	$wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
}
add_action( 'generate_rewrite_rules', 'fp_accounting_partners_add_rewrite_rules' );

/** Fetch posts ids by common term slugs
 *
 * @param   array $term_slugs is an simple array with term slugs.
 */
function fp_fetch_posts_by_common_term_slugs( $term_slugs ) {
	global $wpdb;
	$count_term_slugs = count( $term_slugs );
	$having = $count_term_slugs > 1 ? 1 : 0;
	$slugs_placeholders = implode( ', ', array_fill( 0, count( $term_slugs ), '%s' ) );

	return $wpdb->get_results( $wpdb->prepare( "SELECT p.ID FROM wp_posts p INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id INNER JOIN wp_terms t ON tt.term_id = t.term_id WHERE p.post_type = 'accounting_partners' AND p.post_status = 'publish' AND t.slug IN ($slugs_placeholders) GROUP BY p.ID HAVING COUNT(*) > $having ORDER BY p.ID DESC", $term_slugs ) ); // WPCS: unprepared SQL OK.
}

/** Fetch terms for post ids
 *
 * @param   array $post_ids is an simple array with posts ids.
 */
function fp_fetch_terms_for_post_ids( $post_ids ) {
	global $wpdb;
	$slugs_placeholders = implode( ', ', array_fill( 0, count( $post_ids ), '%s' ) );

	return $wpdb->get_results( $wpdb->prepare( "SELECT t.slug, p.ID, tt.taxonomy FROM wp_posts p INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id INNER JOIN wp_terms t ON tt.term_id = t.term_id WHERE p.post_type = 'accounting_partners' AND p.post_status = 'publish' AND p.ID IN ($slugs_placeholders) ORDER BY p.ID DESC", $post_ids ) ); // WPCS: unprepared SQL OK.
}

/** Count terms by slugs
 *
 * @param   array $results is an associative array with term and amount of terms.
 */
function fp_count_posts_by_term_slugs( $results ) {
	$query_posts = [];
	foreach ( $results as $result ) {
		if ( isset( $query_posts[ $result->ID ] ) ) {
			$query_posts[ $result->ID ][] = $result->slug;
		} else {
			$query_posts[ $result->ID ] = [ $result->slug ];
		}
	}

	$term_counts = [];
	$previous_query_post_id = null;
	foreach ( $query_posts as $post_id => $query_post_terms ) {
		foreach ( $query_post_terms as $query_post_term ) {
			if ( isset( $term_counts[ $query_post_term ] ) && $previous_query_post_id != $post_id ) {
				$term_counts[ $query_post_term ] += 1;
			} else if ( ! isset( $term_counts[ $query_post_term ] ) ) {
				$term_counts[ $query_post_term ] = 1;
			}
		}
		$previous_query_post_id = $post_id;
	}

	return $term_counts;
}

/** Get updated terms count
 *
 * @param   array $term_slugs is an array of terms slugs.
 */
function fp_ajax_get_updated_term_counts( $term_slugs ) {
	$posts = fp_fetch_posts_by_common_term_slugs( $term_slugs );
	$post_ids = array_map(
		function( $post ) {
			return $post->ID;
		},
		$posts
	);
	if ( ! empty( $post_ids ) ) {
		$post_with_term_slugs = fp_fetch_terms_for_post_ids( $post_ids );
		if ( ! empty( $post_with_term_slugs ) ) {
			return fp_count_posts_by_term_slugs( $post_with_term_slugs );
		}
	}
	return false;
}

/**
 * CMP reorder array of objects
 *
 * @param   object $a is a term object.
 * @param object $b is a term object.
 */
function fp_cmp( $a, $b ) {
	return strcmp( $a->parent, $b->parent );
}

/**
 * Send data to Pardot from forms.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_accounting_partners_submit_pardot_forms( WP_REST_Request $request ) {
	if ( isset( $request['values'] ) ) {
		$data = fp_recursive_sanitize_text_field($request['values']); // phpcs:ignore
	} else {
		return 'Missing data variables';
	}

	// User handler.
	$pardot_handler = 'https://www2.freshbooks.com/l/490351/2021-09-27/2hmpvrv';

	// Fields to be send.
	$fields = [];

	foreach ( $data['formValues'] as $key => $val ) {
		if ( 'partner-id' != $key ) {
			$fields[ $key ] = $val;
		}
	}

	// dynamic partner email and name field.
	$partner_id = $data['formValues']['partner-id'];
	$partner_name = '';
	$partner_email = '';
	if ( '' !== $partner_id ) {
		$partner_name = get_field( 'am_firm_name', $partner_id );
		$partner_email = get_field( 'am_email', $partner_id );
	}
	// Add partner name to $fields.
	$fields['partner-name'] = $partner_name;

	// Send by POST.
	$postdata = http_build_query( $fields );
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $pardot_handler );
	curl_setopt( $ch, CURLOPT_POST, true );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, $postdata );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
	$result = curl_exec( $ch );

	// Checking Response.
	$success = false;

	if ( false !== strpos( $result, site_url() ) || false !== strpos( $result, 'freshbooks.com' ) ) {
		$success = true;
	}

	$result = [];
	if ( ! is_wp_error( $request ) ) {
		$result = fp_accounting_partners_send_partners_email(
			[
				'form'    => $data['formValues'],
				'partner' => [
					'email' => $partner_email,
					'name'  => $partner_name,
				],
			]
		);
	}

	if ( array_key_exists( 'success', $result ) ) {
		return new WP_REST_Response(
			[
				'body_response' => [ $success, $partner_name ],
			]
		);
	} else {
		return new WP_Error( $result['error'] ?? $partner_name );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/submit-pardot-forms',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_accounting_partners_submit_pardot_forms',
				'permission_callback' => '__return_true',
				'args'                => [
					'nonce' => [
						'validate_callback' => function( $nonce ) {
							return wp_verify_nonce( $nonce, 'check_form_submission' );
						},
						'required'          => true,
					],
				],
			],
		);
	}
);

/** Enqueue style in head tag */
function fp_accounting_partners_move_styles_in_head() {
	 $url = get_the_permalink();
	if ( isset( $url ) ) {
		$url = explode( '/', esc_url_raw( wp_unslash( $url ) ) );

		if ( in_array( 'accounting-partners', $url ) || in_array( 'accounting-partners?from=single', $url ) ) {
			fp_enqueue_template_assets( 'templates-archive-accounting-partners' );
		}
	}
}
add_action( 'pre_get_posts', 'fp_accounting_partners_move_styles_in_head' );

/**
 * Sends email to partner through SendGrid
 *
 * @param array $data contains partner and form info.
 */
function fp_accounting_partners_send_partners_email( $data ) {
	$url = 'https://api.sendgrid.com/v3/mail/send';
	$bearer = get_field( 'sendgrid_api_key', 'options' );
	$template_id = get_field( 'sendgrid_template_id', 'options' );
	$from_email = get_field( 'sendgrid_from_email', 'options' );
	$from_name = get_field( 'sendgrid_from_name', 'options' );

	$params = [
		'from'             => [
			'email' => $from_email,
			'name'  => $from_name,
		],
		'personalizations' => [
			[
				'to'                    => [
					[
						'email' => $data['form']['email'],
						'name'  => $data['partner']['name'],
					],
				],
				'dynamic_template_data' => $data,
			],
		],
		'template_id'      => $template_id,
	];
	$ch = curl_init();

	$headers = [
		'Authorization: Bearer ' . $bearer,
		'Content-Type: application/json',
	];

	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $ch, CURLOPT_TIMEOUT, 60 );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
	curl_setopt( $ch, CURLOPT_POST, 1 );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $params ) );

	$data = curl_exec( $ch );
	$result = @json_decode( $data );

	$return = [];
	if ( curl_errno( $ch ) || property_exists( $result, 'errors' ) ) {
		$return = [
			'error' => ( curl_error( $ch ) !== '' ? curl_error( $ch ) : join(
				"\n",
				array_map(
					function( $a ) {
						return $a->message;
					},
					$result->errors
				)
			) ),
		];
	} else {
		$return = [
			'success' => true,
		];
	}
	curl_close( $ch );

	return $return;
}

/**
 * Verify with Google Captcha
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_accounting_partners_verify_with_google_captcha( WP_REST_Request $request ) {
	if ( isset( $request['values'] ) ) {
		$data = fp_recursive_sanitize_text_field($request['values']); // phpcs:ignore
	} else {
		return 'Missing data variables';
	}

	$id = $data['formValues']['page-id'];
	$blocks = parse_blocks( get_post( $id )->post_content );
	$secret = '';
	foreach ( $blocks as $block ) {
		if ( 'acf/accounting-partners-form' == $block['blockName'] ) {
			$secret = $block['attrs']['data']['accounting-partners-form_grecaptcha_secretkey'];
		}
	}

	header( 'Content-Type: application/json' );

	$response = false;
	if ( isset( $data['formValues']['g-recaptcha-response'] ) && $secret ) {
		$captcha = $data['formValues']['g-recaptcha-response'];
		$response = file_get_contents( 'https://www.google.com/recaptcha/api/siteverify?secret=' . $secret . '&response=' . $captcha . '&remoteip=' . ( isset( $_SERVER['REMOTE_ADDR'] ) ?? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) ) );
		$response = json_decode( $response, true );
	}
	if ( ! is_wp_error( $request ) ) {
		return new WP_REST_Response(
			[
				'body_response' => $response['success'],
			]
		);
	} else {
		return new WP_Error( false );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/g-recaptcha',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_accounting_partners_verify_with_google_captcha',
				'permission_callback' => '__return_true',
			]
		);
	}
);

/**
 * Filter Array of WP Object taxonomies by Parent ID
 *
 * @param   array $array of wp objects.
 * @param   int   $id Parent Location ID.
 * @return object
 */
function fp_check_parent( $array, $id ) {
	$key = array_search( $id, array_column( json_decode( json_encode( $array ), true ), 'parent' ) );
	return $array[ $key ];
}

/**
 * Create Nonce
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 *
 * @return Object
 */
function fp_create_nonces( WP_REST_Request $request ) {
	$nonces = new stdClass();
	$nonces->nonce = wp_create_nonce( 'check_form_submission' );

	if ( ! is_wp_error( $request ) ) {
		return new WP_REST_Response(
			[
				'body_response' => $nonces,
			]
		);
	} else {
		return new WP_Error( false );
	}
}
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'acct-accounting-partners',
			'/fp-create-nonce',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_create_nonces',
				'permission_callback' => '__return_true',
			]
		);
	}
);
