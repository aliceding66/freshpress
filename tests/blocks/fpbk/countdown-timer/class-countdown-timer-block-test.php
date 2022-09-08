<?php
/**
 * Tests CountdownTimerBlock class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Countdown Timer block Test suite.
 */
class Countdown_Timer_Block_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Countdown_Timer_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
	}

	/**
	 * Checks whether block is shown when there is active campaign with properly set start and end dates.
	 */
	public function testCountdownTimerShowsOnlyForActiveCampaignWithStartAndEndDatesSet() {
		$start_date = strtotime( '-7 day' );
		$end_date = strtotime( '+7 day' );

		// Checks whether block is not shown when there is no active campaign.
		$this->mockFunction(
			'fp_init_campaign',
			function() {
				return false;
			}
		);
		$block_without_active_campaign = $this->get_fpbk_block( 'countdown-timer' );
		$template_data_without_active_campaign = $block_without_active_campaign->get_template_data();
		$this->assertArrayNotHasKey( 'campaign_exists', $template_data_without_active_campaign );

		// Checks whether block is not shown when there is no end_date set in campaign.
		$this->mockFunction(
			'fp_init_campaign',
			function() use ( $start_date ) {
				return [
					'countdown_start_date' => $start_date,
				];
			}
		);
		$block_without_end_date = $this->get_fpbk_block( 'countdown-timer' );
		$template_data_without_end_date = $block_without_end_date->get_template_data();
		$this->assertArrayNotHasKey( 'campaign_exists', $template_data_without_end_date );

		// Checks whether block is not shown when there is no countdown_start_date set in campaign.
		$this->mockFunction(
			'fp_init_campaign',
			function() use ( $end_date ) {
				return [
					'end_date' => $end_date,
				];
			}
		);
		$block_without_start_date = $this->get_fpbk_block( 'countdown-timer' );
		$template_data_without_start_date = $block_without_start_date->get_template_data();
		$this->assertArrayNotHasKey( 'campaign_exists', $template_data_without_start_date );
		$this->assertArrayNotHasKey( 'countdown_time', $template_data_without_start_date );

		// Checks whether block is shown when there are countdown_start_date and end_date set in campaign.
		$this->mockFunction(
			'fp_init_campaign',
			function() use ( $start_date, $end_date ) {
				return [
					'countdown_start_date' => $start_date,
					'end_date'             => $end_date,
				];
			}
		);
		$block_with_correct_campaign = $this->get_fpbk_block( 'countdown-timer' );
		$template_data_with_correct_campaign = $block_with_correct_campaign->get_template_data();
		$this->assertArrayHasKey( 'campaign_exists', $template_data_with_correct_campaign );
		$this->assertTrue( $template_data_with_correct_campaign['campaign_exists'] );
	}

	/**
	 *  Checks whether "themed" classes are added only when "styled" attribute is set.
	 */
	public function testBlockHasCorrectClassDependingOnStylesAttributeValue() {
		$this->mockFunction(
			'fp_init_campaign',
			function() {
				return false;
			}
		);
		$block = $this->get_fpbk_block( 'countdown-timer' );
		$default_properties = [ 'class' => 'countdown-timer' ];
		$themed_class_regex = '/class=".+ themed.+"/u';

		// Theme classes is added then styled is checked.
		$block_with_checked_styled_attribute = $block->get_wrapper_properties( [ 'styled' => true ], $default_properties );
		$this->assertRegExp( $themed_class_regex, $block_with_checked_styled_attribute );

		// Theme classes is not added then styled is unchecked.
		$block_with_unchecked_styled_attribute = $block->get_wrapper_properties( [ 'styled' => false ], $default_properties );
		$this->assertNotRegExp( $themed_class_regex, $block_with_unchecked_styled_attribute );
		$block_with_missing_styled_attribute = $block->get_wrapper_properties( [], $default_properties );
		$this->assertNotRegExp( $themed_class_regex, $block_with_missing_styled_attribute );
	}
}
