<?php
/**
 * Tests fp_init_campaign() helper functions.
 *
 * @package FreshPress\Website
 */

/* phpcs:disable WordPress.NamingConventions.ValidVariableName.VariableNotSnakeCase */

use \PHPUnit\Framework\Error\Error;

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Init_Campaign_Test class.
 */
class FP_Init_Campaign_Test extends FP_Base_Test {

	const ACTIVE_CAMPAIGN_ID = 1;
	const INACTIVE_CAMPAIGN_ID = 2;
	const EXCLUDED_POST_TYPE_FROM_CAMPAIGN = 'no-campaign-for-me';
	const CURRENT_PAGE = '/test-page';

	/**
	 * Active campaign data.
	 *
	 * @var array
	 */
	private $campaign_data = [];

	/**
	 * Dates snapshots.
	 *
	 * @var array
	 */
	private $dates = [];

	/**
	 * Mocked "campaign_include_promo_banner" for any campaign.
	 *
	 * @var bool
	 */
	private $include_promo_banner = false;

	/**
	 * Mocked "campaign_include_slide_in" for any campaign.
	 *
	 * @var bool
	 */
	private $include_slide_in = false;

	/**
	 * FP_Init_Campaign_Test constructor.
	 *
	 * @param null   $name Name.
	 * @param array  $data Data.
	 * @param string $dataName Data name.
	 */
	public function __construct( $name = null, array $data = [], $dataName = '' ) {
		parent::__construct( $name, $data, $dataName );

		$date_format = 'Y-m-d H:i:s';
		$timestamp_format = 'U';

		$this->dates = [
			'now'        => gmdate( $date_format, strtotime( 'now' ) ),
			'before_now' => gmdate( $date_format, strtotime( '-1 week' ) ),
			'after_now'  => gmdate( $date_format, strtotime( '+1 week' ) ),
		];
		$this->dates['now_timestamp'] = fp_get_date( $this->dates['now'], $date_format )->format( $timestamp_format );
		$this->dates['before_now_timestamp'] = fp_get_date( $this->dates['before_now'], $date_format )->format( $timestamp_format );
		$this->dates['after_now_timestamp'] = fp_get_date( $this->dates['after_now'], $date_format )->format( $timestamp_format );
	}

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		$this->mockFunction(
			'fp_get_active_campaigns',
			function() {
				return $this->active_campaigns;
			}
		);

		$this->mockFunction(
			'get_fields',
			function( $campaign_id ) {
				switch ( $campaign_id ) {
					case self::ACTIVE_CAMPAIGN_ID:
						return array_merge(
							[
								'campaign_active' => 1,
							],
							$this->campaign_data
						);
					case self::INACTIVE_CAMPAIGN_ID:
						return [
							'campaign_active' => 0,
						];
					default:
						return false;
				}
			}
		);

		$this->mockFunction(
			'get_field',
			function( $field_name, $value ) {
				switch ( $field_name ) {
					case 'campaign_include_promo_banner':
						return $this->include_promo_banner;
					case 'campaign_include_slide_in':
						return $this->include_slide_in;
					case 'campaign_promo_banner_excluded_pages':
						return $this->include_promo_banner ? self::CURRENT_PAGE : '';
					case 'campaign_slide_in_excluded_pages':
						return $this->include_slide_in ? self::CURRENT_PAGE : '';
					default:
						return false;
				}
			}
		);

		$this->mockFunction(
			'fp_get_server_var',
			function( $field_name ) {
				return 'https://www.dev.freshenv.com' . self::CURRENT_PAGE;
			}
		);

		WP_Mock::userFunction(
			'get_post_type',
			[
				'return' => self::EXCLUDED_POST_TYPE_FROM_CAMPAIGN,
			]
		);
	}

	/**
	 * Checks whether function fp_init_campaign() return expected value.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param array        $active_campaigns Returned by fp_get_active_campaigns().
	 * @param array        $campaign_data Active campaign data.
	 * @param bool         $include_promo_banner If campaign includes promo banner.
	 * @param bool         $include_slide_in If campaign includes slide in.
	 * @param string|array $expected Expected value.
	 */
	public function testIfReturnsExpectedResult( $active_campaigns, $campaign_data, $include_promo_banner, $include_slide_in, $expected ) {
		$this->active_campaigns = $active_campaigns;
		$this->campaign_data = $campaign_data;
		$this->include_promo_banner = $include_promo_banner;
		$this->include_slide_in = $include_slide_in;

		if ( Error::class === $expected ) {
			$this->expectException( Error::class );
			fp_init_campaign();
		} else {
			$this->assertEquals( $expected, fp_init_campaign() );
		}
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		return [
			'empty data'                                   => [
				'active_campaigns'     => [],
				'campaign_data'        => [],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'inactive campaign'                            => [
				'active_campaigns'     => [ self::INACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'active campaign with start/end date before now' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['before_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'active campaign with start date before now without end date set' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'active campaign with end date after now'      => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['after_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'active campaign with start/end date within range of now' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'active campaign with start date before now and end date now' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'active campaign with start date now and end date after now' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'valid campaign trim "campaign_" prefix from fields' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
					'campaign_key'        => 'value',
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
					'key'                  => 'value',
				],
			],
			'valid campaign converts to timestamp only "campaign_countdown_start_date" - no end date there' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date'           => $this->dates['before_now'],
					'campaign_end_date'             => $this->dates['after_now'],
					'campaign_countdown_start_date' => $this->dates['before_now'],
					'campaign_countdown_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'countdown_start_date' => $this->dates['before_now_timestamp'],
					'countdown_end_date'   => $this->dates['after_now'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],

			// Exclude post types.
			'valid campaign with empty exclude post types' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'excluded_post_types' => [],
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'excluded_post_types'  => [],
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'valid campaign with exclude post types that do not match current post type' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'excluded_post_types' => [ 'post', 'page' ],
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => [
					'excluded_post_types'  => [ 'post', 'page' ],
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'valid campaign with exclude post types that matches current post type' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'excluded_post_types' => [ 'post', self::EXCLUDED_POST_TYPE_FROM_CAMPAIGN ],
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => false,
			],
			'valid campaign with exclude post types as string' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'excluded_post_types' => self::EXCLUDED_POST_TYPE_FROM_CAMPAIGN,
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => false,
				'expected'             => Error::class,
			],

			// Include promo banner.
			'valid campaign without promo banner criteria' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => true,
				'include_slide_in'     => false,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_promo_banner' => false,
					'include_slide_in'     => false,
				],
			],
			'valid campaign with include promo banner criteria -> there is mock setup that points included page for current one' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'promo_banner_include_exclude_criteria' => 'include',
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => true,
				'include_slide_in'     => false,
				'expected'             => [
					'include_promo_banner' => true,
					'promo_banner_include_exclude_criteria' => 'include',
					'include_slide_in'     => false,
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
				],
			],
			'valid campaign with valid exclude promo banner criteria -> there is mock setup that points excluded page for current one' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'promo_banner_include_exclude_criteria' => 'exclude',
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => true,
				'include_slide_in'     => false,
				'expected'             => [
					'include_promo_banner' => false,
					'promo_banner_include_exclude_criteria' => 'exclude',
					'include_slide_in'     => false,
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
				],
			],

			// Include slide in.
			'valid campaign without slide in criteria'     => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'campaign_start_date' => $this->dates['before_now'],
					'campaign_end_date'   => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => true,
				'expected'             => [
					'start_date'           => $this->dates['before_now'],
					'end_date'             => $this->dates['after_now_timestamp'],
					'include_slide_in'     => false,
					'include_promo_banner' => false,
				],
			],
			'valid campaign with include slide in criteria -> there is mock setup that points included page for current one' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'slide_in_include_exclude_criteria' => 'include',
					'campaign_start_date'               => $this->dates['before_now'],
					'campaign_end_date'                 => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => true,
				'expected'             => [
					'include_slide_in'                  => true,
					'slide_in_include_exclude_criteria' => 'include',
					'include_promo_banner'              => false,
					'start_date'                        => $this->dates['before_now'],
					'end_date'                          => $this->dates['after_now_timestamp'],
				],
			],
			'valid campaign with valid exclude slide in criteria -> there is mock setup that points excluded page for current one' => [
				'active_campaigns'     => [ self::ACTIVE_CAMPAIGN_ID ],
				'campaign_data'        => [
					'slide_in_include_exclude_criteria' => 'exclude',
					'campaign_start_date'               => $this->dates['before_now'],
					'campaign_end_date'                 => $this->dates['after_now'],
				],
				'include_promo_banner' => false,
				'include_slide_in'     => true,
				'expected'             => [
					'include_slide_in'                  => false,
					'slide_in_include_exclude_criteria' => 'exclude',
					'include_promo_banner'              => false,
					'start_date'                        => $this->dates['before_now'],
					'end_date'                          => $this->dates['after_now_timestamp'],
				],
			],
		];
	}
}
