<?php
/**
 * ROI Calculator Calculations & Generate Report.
 *
 * @package FreshPress\Website
 */

/**
 * Fetch Calculations Ajax.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_roi_calculate( WP_REST_Request $request ) {
	if ( isset( $request['industry'], $request['software'], $request['client_count'], $request['staff_count'], $request['average_revenue'], $request['cost_hour'] ) ) {

		$data_file = file_get_contents( get_template_directory() . '/blocks/acf/roi-calculator/data/data.json' );
		$feature_usage_file = file_get_contents( get_template_directory() . '/blocks/acf/roi-calculator/data/featureUsage.json' );

		$data = json_decode( $data_file, true );
		$feature_usage = json_decode( $feature_usage_file, true );

		// Form Variables.
		$vertical = sanitize_text_field( wp_unslash( $request['industry'] ) );
		$software = sanitize_text_field( wp_unslash( $request['software'] ) );
		$client_count = sanitize_text_field( wp_unslash( $request['client_count'] ) );
		$staff_count = sanitize_text_field( wp_unslash( $request['staff_count'] ) );
		$average_revenue = sanitize_text_field( wp_unslash( $request['average_revenue'] ) );
		$cost_hour = sanitize_text_field( wp_unslash( $request['cost_hour'] ) );

		// Calculated.

		$total_revenue = $client_count * $average_revenue; // Total Revenue = Client Count (P) * Avg Revenue (P).
		$stage = fp_return_stage( $total_revenue );
		$search_term_1 = $stage . $vertical . $software; // Search Term1 = Stage (P) + Vertical (P) + Prev Software (P).
		$search_term_2 = $vertical . $stage;     // Search Term2 = Vertical (P) + Stage (P).
		$time_spent_per_client = ( $staff_count * 40 * 4 ) / $client_count;   // Time Spent per Client is equal to Number of Staff (P) * 40 * 4 divided by Number of Clients (P) - $time_spent_per_client.
		$data_item = fp_lookup( $data, $search_term_1 );
		$usage_item = fp_lookup( $feature_usage, $search_term_2 );

		$time_saved_software = fp_calculate_time_saved_software( $data_item, $usage_item );
		$time_spent_accounting = fp_calculate_time_spent_accounting( $data_item, $usage_item );

		$new_clients = round( $time_saved_software / $time_spent_per_client, 2 ); // Increase in new clients is equal to Time Saved on Accounting (MISTAKE? Software or Accounting? ) (C) / Time Spent per Client (C).
		$transaction_savings = fp_calculate_transaction_savings( $total_revenue );
		$saved_per_month = round( $cost_hour * $time_saved_software + $transaction_savings / 12 );     // Money Saved/Month is equal to Cost/Hr (P) * Total Time Saved Over Previous Software (C) + Transaction Savings (C) / 12.
		$total_roi = fp_calculate_roi( $total_revenue, $saved_per_month );

		// Final returned object full of calculations.

		$result = (object) [
			'transaction_savings'   => round( $transaction_savings ),
			'time_spent_per_client' => $time_spent_per_client,
			'time_saved'            => $time_saved_software,
			'time_spent_accouting'  => $time_spent_accounting,
			'saved_per_month'       => $saved_per_month,
			'payments_speed'        => $data_item['Payments Speed'],
			'new_clients'           => $new_clients,
			'roi'                   => $total_roi,
		];

		return json_encode( $result );
	} else {
		return false;
	}
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'roi-calc',
			'/roi-calculate',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_roi_calculate',
				'permission_callback' => '__return_true',
				'args'                => [
					'nonce' => [
						'validate_callback' => function( $nonce ) {
							return wp_verify_nonce( $nonce, 'nonce' );
						},
						'required'          => true,
					],
				],
			],
		);
	}
);

/**
 * Total Time Saved Over Previous Software.
 *
 * @param array $data_item The data item retrieved from the data.json helper file.
 * @param array $usage_item The usage item retrieved from the featureUsage.json helper file.
 * @return integer - represented by Hours/Month as the first item.
 */
function fp_calculate_time_saved_software( $data_item, $usage_item ) {
	$totals = [];

	array_push(
		$totals,
		$data_item['Invoices Time Saved/Month'] * (float) $usage_item['Invoice__1'] / 100,
		$data_item['Estimates & Proposals Time Saved/Month'] * (float) $usage_item['Estimate__1'] / 100,
		$data_item['Estimates & Proposals Time Saved/Month'] * (float) $usage_item['Proposal__1'] / 100,
		$data_item['Expenses Time Saved/Month'] * (float) $usage_item['Expense__1'] / 100,
		$data_item['Accounting Time Saved/Month'] * 1,
		$data_item['Time Tracking Time Saved/Month'] * (float) $usage_item['Time Entry__1'] / 100,
		$data_item['Tax Filing Saved/Month'] * 1
	);

	return round( array_sum( $totals ) );
}

/**
 * Total Time Saved On Accounting.
 *
 * @param array $data_item The data item retrieved from the data.json helper file.
 * @param array $usage_item The usage item retrieved from the featureUsage.json helper file.
 * @return integer - represented by Hours/Month - doesn't seemed to be used currently.
 */
function fp_calculate_time_spent_accounting( $data_item, $usage_item ) {

	$totals = [];

	array_push(
		$totals,
		( $data_item['Invoices Time Saved/Month'] / fp_return_decimal( $data_item['Invoices Time Save %'] ) ) * (float) $usage_item['Invoice__1'] / 100, // Invoices.
		( $data_item['Estimates & Proposals Time Saved/Month'] / fp_return_decimal( $data_item['Estimates Average Time Saved'] ) ) * (float) $usage_item['Estimate__1'] / 100, // Estimates.
		( $data_item['Estimates & Proposals Time Saved/Month'] / fp_return_decimal( $data_item['Estimates Average Time Saved'] ) ) * (float) $usage_item['Proposal__1'] / 100,  // Proposals.
		( $data_item['Expenses Time Saved/Month'] / fp_return_decimal( $data_item['Expenses Average Time Saved'] ) ) * (float) $usage_item['Expense__1'] / 100, // Expenses.
		( $data_item['Accounting Time Saved/Month'] / fp_return_decimal( $data_item['Accounting Average Time Saved'] ) ), // Accounting.
		( $data_item['Time Tracking Time Saved/Month'] / fp_return_decimal( $data_item['Time Tracking Average Time Saved'] ) ) * (float) $usage_item['Time Entry__1'] / 100, // Time Tracking.
		( $data_item['Tax Filing Saved/Month'] / fp_return_decimal( $data_item['Tax Filing Average Time Saved'] ) ),  // Tax Filling.
	);

	return ceil( array_sum( $totals ) );
}

/**
 * Transaction Savings.
 *
 * @param integer $total_revenue if this number is above 120,000 then multiply it by 0.3% otherwise make it 0.
 * @return integer - is equal to Total Revenue (C) * 92.65%.
 */
function fp_calculate_transaction_savings( $total_revenue ) {
	if ( $total_revenue > 120000 ) {
		return round( $total_revenue * 0.9265 * 0.003, 2 );
	} else {
		return 0;
	}
}

/**
 * Determine Total ROI percentage.
 *
 * @param integer $total_revenue comes from total revenue calc.
 * @param integer $saved_per_month comes from amount saved each month calc.
 * @return integer - percentage representing total roi saved for the client.
 */
function fp_calculate_roi( $total_revenue, $saved_per_month ) {
	$plan = 'Plus'; // base plan.
	if ( $total_revenue >= 50000 ) {
		if ( $total_revenue >= 125000 ) {
			if ( $total_revenue >= 250000 ) {
				if ( $total_revenue >= 500000 ) {
					$plan = 'Select300';
				} else {
					$plan = 'Select200';
				}
			} else {
				$plan = 'Select100';
			}
		} else {
			$plan = 'Premium';
		}
	}

	switch ( $plan ) {
		case 'Premium':
			$monthly_cost = 45;
			break;
		case 'Select100':
			$monthly_cost = 100;
			break;
		case 'Select200':
			$monthly_cost = 200;
			break;
		case 'Select300':
			$monthly_cost = 300;
			break;
		default:
			$monthly_cost = 22.5; // base price.
	}

	return round( $saved_per_month / $monthly_cost * 100 );
}

/**
 * Return stage.
 *
 * @param integer $total_revenue comes from total revenue calc.
 * @return string - representing current stage of client development.
 */
function fp_return_stage( $total_revenue ) {
	if ( $total_revenue > 125000 ) {
		return 'Scaling';
	} else if ( $total_revenue > 50000 ) {
		return 'FullTime';
	} else {
		return 'PartTime';
	}
}

// UTILS.

/**
 * Lookup.
 *
 * @param array  $array array to search in.
 * @param string $term term to search in array.
 * @return index element of array that term represents.
 */
function fp_lookup( $array, $term ) {
	$index = array_search( $term, array_column( $array, 'Search Term' ) );
	return $array[ $index ];
}

/**
 * Return Decimal.
 *
 * @param int $percentage a percentage value in int format to convert to decimal.
 * @return float - decimal value of percentage.
 */
function fp_return_decimal( $percentage ) {
	return (float) $percentage / 100;
}

/**
 * Generate Report Ajax.
 *
 * @param WP_REST_Request $request The JSON array provided by the calling JS function.
 */
function fp_generate_report( WP_REST_Request $request ) {
	if ( isset( $request['values'] ) ) {
		$data = fp_recursive_sanitize_text_field($request['values']); // phpcs:ignore
	} else {
		return 'Missing $POST variable';
	}

	if ( ! isset( $data ) ) {
		return 'No values provided.';
	}

	$api_data = get_field( 'pdf_generation_server', 'option' );
	$secret_key = $api_data['API_SECRET'];
	$key_id = $api_data['API_KEY'];
	$host = $api_data['API_HOST'];
	$date_string = gmdate( DATE_RFC822 );

	// Build Signature - https://github.com/arkerone/api-key-auth/blob/master/signature.md .

	// DO NOT change below indentation else the signature will be invalid and authentication to PDF Server will fail.
	$header_string = '(request-target): post /api/generate-pdf
host: ' . $host . '
date: ' . $date_string . '
x-data: ' . $data['calculated']['roi']; // phpcs:ignore
	$signature = base64_encode( hash_hmac( 'sha256', $header_string, $secret_key, true ) );

	$signature_params = [
		'keyId="' . $key_id . '"',
		'algorithm="hmac-sha256"',
		'headers="(request-target) host date x-data"',
		'signature="' . $signature . '"',
	];
	$authorization = 'Signature ' . implode( ',', $signature_params );

	$headers = [
		'authorization: ' . $authorization,
		'host: ' . $host,
		'date: ' . $date_string,
		'Content-Type: application/json',
		'x-forwarded-for: ' . fp_get_ip_address(),
		'x-data: ' . $data['calculated']['roi'],
	];

	$url = $api_data['API_URL'];

	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_POST, 1 );
	curl_setopt( $ch, CURLOPT_TIMEOUT, 30 );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $data ) );
	curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );

	$result = curl_exec( $ch );

	$http_status = curl_getinfo( $ch, CURLINFO_HTTP_CODE );

	if ( false === $result ) {
		$generate_error = esc_attr( curl_error( $ch ) );
		$res = (object) [
			'success' => false,
			'message' => $generate_error,
			'status'  => $http_status,
		];
	} else {

		if ( 401 === $http_status || 400 === $http_status ) {
			$generate_error = esc_attr( curl_error( $ch ) );
			$res = (object) [
				'success' => false,
				'error'   => $generate_error,
				'status'  => $http_status,
			];
		} else {

			$res = [
				'success' => true,
				'url'     => $url,
				'res'     => json_decode( $result ),
			];
		}
	}
	curl_close( $ch );
	return $res;
}

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'roi-calc',
			'/generate-report',
			[
				'methods'             => 'POST',
				'callback'            => 'fp_generate_report',
				'permission_callback' => '__return_true',
				'args'                => [
					'nonce' => [
						'validate_callback' => function( $nonce ) {
							return wp_verify_nonce( $nonce, 'nonce' );
						},
						'required'          => true,
					],
				],
			],
		);
	}
);

/**
 * Get IP Address of submitter.
 *
 * @return integer - IP address of submitter
 */
function fp_get_ip_address() {
	if ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
		$ip_addresses = explode( ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) );
		return trim( end( $ip_addresses ) );
	} elseif ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
		return sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
	} else {
		return 'Unable to access IP';
	}
}

/**
 * Recursive sanitation for an array.
 *
 * @param array $array - Array to be sanitized.
 *
 * @return array $array - Sanitized array.
 */
function fp_recursive_sanitize_text_field( $array ) {
	foreach ( $array as &$value ) {
		if ( is_array( $value ) ) {
			$value = fp_recursive_sanitize_text_field( $value );
		} else {
			$value = sanitize_text_field( wp_unslash( $value ) );
		}
	}

	return $array;
}
