<?php
/**
 * Tests Pricing_Table_Block_Test class.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . '/../../../class-fpbk-blocks-base-test.php';

/**
 * Pricing Table block Test suite.
 */
class Pricing_Table_Block_Test extends Fpbk_Blocks_Base_Test {
	/**
	 * Default data only for 1 plan: Lite.
	 */
	const DEFAULT_DATA = [
		'most_popular_plan'                      => 'plus',
		'price_disclaimer_align'                 => 'left',
		'pricing_term_suffix_monthly_plan'       => '/mo',
		'pricing_term_suffix_yearly_plan'        => '/yr',
		'pricing_term_suffix_promo_monthly_plan' => '/mo',
		'pricing_term_suffix_promo_yearly_plan'  => '/yr',
		'base_pricing_info'                      => 'category,lite' . PHP_EOL . 'blurb,Lite' . PHP_EOL . 'price_monthly,15.00' . PHP_EOL . 'price_yearly,13.50' . PHP_EOL . 'custom_pricing,FALSE',
		'promo_lite_monthly_price'               => 10,
		'promo_lite_yearly_price'                => 100,
	];

	/**
	 * Block element.
	 *
	 * @var \FreshpressBlocks\PricingTableBlock
	 */
	private $block;

	/**
	 * Pricing_Block_Test setup.
	 */
	public function setUp() {
		parent::setUp();
		$this->passthru_fpbk_block_registration_functions();
		$this->block = $this->get_fpbk_block( 'pricing-table' );

		WP_Mock::passthruFunction( 'wp_strip_all_tags' );
	}

	/**
	 * Checks whether links are converted correctly.
	 */
	public function testIfStandardAndPromoLinksAreConvertedCorrectly() {
		$cta_link = [
			'url'   => 'https://cta.link',
			'title' => 'CTA link',
			'html'  => '<a class="btn mb-2 px-1 standard btn-outline-grey" target="_self" href="https://cta.link">CTA link</a>',
		];
		$secondary_links = 'Secondary link';
		$promo_cta_link = [
			'url'   => 'https://promo.cta.link',
			'title' => 'Promo CTA link',
			'html'  => '<a class="btn mb-2 px-1 promo btn-cta-green" target="_self" href="https://promo.cta.link">Promo CTA link</a>',
		];
		$promo_secondary_links = 'Promo secondary link';

		$template_data = $this->block->get_template_data(
			array_merge(
				self::DEFAULT_DATA,
				[
					'links_lite_cta'                   => $cta_link,
					'links_lite_cta_style'             => 'ghost',
					'links_lite_secondary_links'       => $secondary_links,
					'links_lite_secondary_links_style' => 'ghost',

					'promo_lite_links_cta'             => $promo_cta_link,
					'promo_lite_links_cta_style'       => 'green',
					'promo_lite_links_secondary_links' => $promo_secondary_links,
					'promo_lite_links_secondary_links_style' => 'green',
				]
			)
		);

		$this->assertIsArray( $template_data['plans'] );
		$lite_plan_data = $template_data['plans'][0];

		$this->assertArrayHasKey( 'cta', $lite_plan_data );
		$this->assertEquals( $cta_link, $lite_plan_data['cta'] );
		$this->assertEquals( 'ctalink', $lite_plan_data['data_cta_text'] );
		$this->assertEquals( 'btn-outline-grey', $lite_plan_data['cta_class'] );

		$this->assertArrayHasKey( 'secondary_links', $lite_plan_data );
		$this->assertEquals( $secondary_links, $lite_plan_data['secondary_links'] );
		$this->assertEquals( 'secondarylink', $lite_plan_data['data_secondary_links_text'] );
		$this->assertArrayNotHasKey( 'secondary_links_class', $lite_plan_data );

		$this->assertArrayHasKey( 'promo_cta', $lite_plan_data );
		$this->assertEquals( $promo_cta_link, $lite_plan_data['promo_cta'] );
		$this->assertEquals( 'promoctalink', $lite_plan_data['promo_data_cta_text'] );
		$this->assertEquals( 'btn-cta-green', $lite_plan_data['promo_cta_class'] );

		$this->assertArrayHasKey( 'promo_secondary_links', $lite_plan_data );
		$this->assertEquals( $promo_secondary_links, $lite_plan_data['promo_secondary_links'] );
		$this->assertEquals( 'promosecondarylink', $lite_plan_data['promo_data_secondary_links_text'] );
		$this->assertArrayNotHasKey( 'promo_secondary_links_class', $lite_plan_data );
	}
}
