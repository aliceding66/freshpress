<?php
/**
 * Nicereply class.
 *
 * @package FreshpressBlocks\Nicereply
 * @subpackage Nicereply
 */

// phpcs:ignore WordPress.Security.NonceVerification.Missing

namespace FreshpressBlocks;

/**
 * Class Nicereply
 *
 * @package FreshpressBlocks
 */
class NicereplyBlock extends ABlock {
	/**
	 * NicereplyBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_script( 'nicereply-block' );
		$this->enqueue_style();

		$this->initiate_template_data();
		$this->register_nicereply_endpoint();
	}

	/**
	 * Returns values that are used in Mustache template.
	 *
	 * @param array $additional_template_data Usually $attributes passed from render() function.
	 *
	 * @return array
	 */
	public function get_template_data( $additional_template_data = [] ) {
		$additional_template_data['responses'] = [
			[
				'type'  => 'bad',
				'title' => 'Aww, That Is Not Good at All',
				'body'  => 'Please tell us what made this a poor experience, so we can grow!',
			],
			[
				'type'  => 'ok',
				'title' => 'O.K. Is Good But Not Great...',
				'body'  => 'What could have made this experience better?',
			],
			[
				'type'  => 'good',
				'title' => 'I\'m so Glad That You\'re Happy!',
				'body'  => 'Can you tell us what made this experience so great?',
			],
		];

		$additional_template_data['continue_button'] = fp_render_blocks(
			[
				'name'  => 'button',
				'attrs' => [
					'button_link'         => [
						'url'   => '#',
						'title' => 'Continue',
					],
					'button_style'        => 'green',
					'button_click_action' => 'open_link',
					'button_max_width'    => '242px',
					'className'           => 'nicereply__btn-continue w-100 mt-3 py-3',
				],
			]
		);

		$additional_template_data['submit_button'] = fp_render_blocks(
			[
				'name'  => 'button',
				'attrs' => [
					'button_link'         => [
						'url'   => '#',
						'title' => 'Submit',
					],
					'button_style'        => 'green',
					'button_click_action' => 'open_link',
					'button_max_width'    => '242px',
					'className'           => 'nicereply__btn-submit w-100 mt-3 py-3',
				],
			]
		);

		$additional_template_data['thank_you'] = esc_html__( 'Thank You for Taking the Time to Rate Your Experience', 'freshpress-website' );
		$additional_template_data['rate_support'] = esc_html__( '* Please rate your support experience.', 'freshpress-website' );
		$additional_template_data['error'] = esc_html__( '* An error occurred. Please try again.', 'freshpress-website' );

		return parent::get_template_data( $additional_template_data );
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
				'class' => 'nicereply',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}

	/**
	 * Handle nice reply endpoint
	 */
	public function handle_nicereply_endpoint() {
		$fields = get_field( 'nicereply', 'option' );
		$secret = $fields['api_secret'];
		$survey_id = (int) $fields['survey_id'];

		$url = 'https://api.nicereply.com/v1/csat/ratings';
		$extra_question_id = 881;

		$user = fp_get_post_var( 'user', 0 );
		$ticket_id = fp_get_post_var( 'ticketid', 0 );
		$support_experience = fp_get_post_var( 'supportExperience', 0 );
		$comment = fp_get_post_var( 'comment', '' );
		$product_feedback = fp_get_post_var( 'productFeedback', '' );

		if ( $user > 0 && $ticket_id > 0 ) {
			$json = [
				'from'      => '/nicereply on freshbooks.com',
				'survey_id' => $survey_id,
				'user'      => [
					'username' => $user,
				],
				'ticket'    => $ticket_id,
				'score'     => $support_experience,
				'comment'   => $comment,
			];

			if ( ! empty( $product_feedback ) ) {
				$json['extra_questions'] = [
					[
						'id'    => $extra_question_id ?? '',
						'score' => $product_feedback,
					],
				];
			}

			$encoded = json_encode( $json );
			$curl = curl_init( $url );

			curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, 'POST' );
			curl_setopt( $curl, CURLOPT_POSTFIELDS, $encoded );
			curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
			curl_setopt(
				$curl,
				CURLOPT_HTTPHEADER,
				[
					'Authorization: Basic ' . base64_encode( ":$secret" ),
					'Accept: application/json',
					'Content-Type: application/json',
					'Content-Length: ' . strlen( $encoded ),
				]
			);

			$result = json_decode( curl_exec( $curl ), true );

			if ( array_key_exists( '_results', $result ) ) {
				return true;
			}

			if ( array_key_exists( 'errors', $result ) ) {
				error_log( 'Nicereply error: ' . implode( ' ', $result['errors'] ) );
			}
		}

		return false;
	}

	/**
	 * Register nice reply endpoint
	 */
	public function register_nicereply_endpoint() {
		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					'nicereply',
					'/send/',
					[
						'methods'             => 'POST',
						'callback'            => [ $this, 'handle_nicereply_endpoint' ],
						'permission_callback' => '__return_true',
					]
				);
			}
		);
	}

	/**
	 * Initiate template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'tell_us'          => esc_html__( 'Tell Us About Your Experience', 'freshpress-website' ),
				'product_feedback' => esc_html__( 'How would you rate the product?', 'freshpress-website' ),
				'rating'           => esc_html__( '1 is bad, 10 is excellent', 'freshpress-website' ),
				'product_boxes'    => fp_render_blocks(
					[
						'name'    => 'boxes',
						'attrs'   => [
							'className' => 'box-media-text w-100 p-4',
						],
						'content' => [
							$this->nicereply_form( 'productFeedback', 10 ),
						],
					]
				),
				'support_feedback' => esc_html__( 'How was your support experience?', 'freshpress-website' ),
				'support_boxes'    => fp_render_blocks(
					[
						'name'    => 'boxes',
						'attrs'   => [
							'className' => 'box-media-text w-100 p-4',
						],
						'content' => [
							$this->nicereply_form( 'supportExperience', 10 ),
						],
					]
				),
			],
			'nicereplyTemplateData'
		);
	}

	/**
	 * Output a nicereply form of radio buttons.
	 *
	 * @param string $name Name for form and child options.
	 * @param int    $number Number of radio options, labelled from 1 to this number.
	 *
	 * @return string
	 */
	private function nicereply_form( $name, $number ) {
		$emoji_breakpoints = [
			1  => 'bad',
			5  => 'neutral',
			8  => 'smile',
			10 => 'grin',
		];

		$i = 1;
		$output = "<form id='$name' class='nicereply__survey-items d-flex flex-wrap justify-content-between align-items-start' action=''>";
		while ( $i <= $number ) :
			$emoji = '';
			if ( isset( $emoji_breakpoints[ $i ] ) ) {
				$emoji = fp_render_img(
					'images/icons/emoji-' . $emoji_breakpoints[ $i ] . '.svg',
					[
						'class' => 'survey-emoji d-none d-md-block',
					]
				);
			}

			$output .= "<div class='nicereply__survey-item'>
				<label for='$name.$i' class='d-flex flex-column flex-wrap align-items-center'>
					$i
					<input type='radio' id='$name.$i' name='$name' value='$i' class='my-3' />
					$emoji
				</label>
			</div>";
			$i ++;
		endwhile;
		$output .= '</form>';

		return $output;
	}
}
