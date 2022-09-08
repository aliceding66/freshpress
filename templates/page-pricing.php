<?php
/**
 * Template Name: Pricing Page
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-pricing' );
get_header();

$campaign_code = 'DB_Q12022_MN_60FOR6';
$direct_buy_url = 'https://' . fp_get_fb_domain( 'my' ) . '/#/signup/direct-buy?campaign=DB_Q32022_MN_50FOR4';
$campaign = fp_init_campaign();
$start_date = strtotime( $campaign['start_date'] );
$end_date = $campaign['end_date'];
$current_time = time();
$is_campaign_active = $start_date < $current_time && $end_date > $current_time;
$countdown_start_time = $campaign['countdown_start_date'] ?? '';
$is_countdown_visible = $is_campaign_active && $countdown_start_time < $current_time;
$phone_icon = fp_get_asset( 'images/icons/phone-midnight-blue.svg' );
$plans_data = FP_Site_Options::get_option( 'plans_data' );
$comparison_data = FP_Site_Options::get_option( 'comparison_data' );
$icon_checkmark = fp_get_asset( 'images/icons/checkmark-midnight-blue.svg' );
$plans = [ 'lite', 'plus', 'premium', 'select' ];
?>
<?php if ( $is_campaign_active ) : ?>
<div class="hero promo-hero position-relative text-center row" data-has-countdown="true" data-show-countdown="true" data-is-active-campaign="<?= esc_attr( $is_campaign_active ? 'true' : 'false' ); ?>">
	<div class="hero__content <?= ! $is_countdown_visible ? 'no-countdown justify-content-center' : 'justify-content-between'; ?> mx-auto d-flex flex-column flex-md-row">
		<div class="hero__content_left <?= ! $is_countdown_visible ? 'd-flex flex-column align-items-center' : ''; ?>">
			<h1 class="hero__heading text-white px-0 <?= ! $is_countdown_visible ? 'text-center' : ''; ?>">Get 50% Off for 4 Months</h1>
			<div class="promo-hero__actions py-2 <?= ! $is_countdown_visible ? 'no-countdown' : ''; ?>">
				<div class="promo-hero__actions_links w-100 flex-column">
					<div class="promo-hero__actions_inner-wrap d-block d-md-inline-block">
						<a href="<?= esc_url( $direct_buy_url ); ?>" class="promo-hero__actions_cta btn btn-cta-green mx-auto mx-md-0 d-block px-md-4">BUY NOW & SAVE</a>
					</div>
						<div class="promo-hero__actions_inner-wrap d-block d-md-inline-block position-relative">
							<a href="#0" class="promo-hero__actions_offer-link d-block"><?= esc_html( __( 'See Offer Details', 'freshpress-website' ) ); ?></a>
							<div class="promo-hero__actions_offer-details position-absolute text-left">
								<span>
									<span class="h4">Offer Details:</span>
									<p><strong>Monthly Plans</strong></p>
									<p>Get 50% off a Lite, Plus or Premium Plan for 4 months. After the 4-month promotional period, you will be billed at full price for the plan you have selected.</p>
									<p><strong>Yearly Plans </strong></p>
									<p>Total yearly price is billed at time of purchase. Get 60% off (50% promotional discount + 10% yearly discount) a Lite, Plus or Premium plan for 4 months. After the 4-month promotional period, the 10% yearly discount will continue for the remaining period of your yearly plan.</p>
									<p>Promotional offers for both monthly and yearly plans are for a limited period. New customers only. Cannot be combined with other offers. No free trial period is included when availing this promotional discount. FreshBooks reserves the right to change this offer at any time.</p>
								</span>
							</div>
						</div>
				</div>
			</div>
		</div>
		<?php if ( $is_countdown_visible ) : ?>
			<div class="hero__content_right">
				<?= fp_render_blocks(
					[
						'name'  => 'countdown-timer',
						'attrs' => [
							'styled'                     => true,
							'colour'                     => '#001B40',
							'numbers_colour'             => '#fff',
							'lto_label'                  => 'LIMITED TIME OFFER',
							'lto_label_colour'           => '#001B40',
							'lto_label_background_image' => fp_get_asset( 'images/homepage/hero-label-orange.svg' ),
						],
					]
				); ?>
			</div>
		<?php endif; ?>
	</div>

<!--	<div class="decorative-block decorative-block__top"></div>-->
<!--	<div class="decorative-block decorative-block__bottom"></div>-->
</div>
<?php endif; ?>

<div class="pricing-table mt-3 mx-md-auto overflow-hidden" data-mobile-carousel="true" data-show="plus,lite,premium,select">
	<div class="pricing-table_term-wrapper w-100 d-flex justify-content-center align-content-center px-2 mb-3 mb-lg-4 position-relative">
		<p class="pricing-table_term-label">Extra 10% Off</p>
		<label
				class="pricing-table_term-switch d-flex align-items-center position-relative"
				data-monthly="Monthly"
				data-yearly="Yearly"
				data-promo-monthly="Monthly"
				data-promo-yearly="Yearly"
				for="switch-pricing"
		>
			<input id="switch-pricing" type="checkbox" class="pricing-table_term-switch__checkbox">
			<span class="pricing-table_term-switch__slider position-absolute" style="color: transparent; font-size: 0;">{{ labels.random }}</span>
		</label>
	</div>

	<ul class="pricing-table__desktop-categories d-none d-md-flex">
		<li data-plans-for="plus,lite,premium,select" class="active">Show All Plans</li>
		<li data-plans-for="lite,plus">Freelancers</li>
		<li data-plans-for="plus,lite">Self-Employed</li>
		<li data-plans-for="premium,plus,select">Business With Contractors</li>
		<li data-plans-for="select,premium">Business With Employees</li>
	</ul>

	<div class="px-2 d-md-none mb-5">
		<div class="pricing-table__mobile-categories d-md-none mx-auto overflow-hidden position-relative">
			<select aria-label="Select Plans" name="select-plans" id="select-plans">
				<option value="plus,lite,premium,select" selected>Show All Plans</option>
				<option value="lite,plus">Freelancers</option>
				<option value="plus,lite">Self-Employed</option>
				<option value="premium,plus,select">Business With Contractors</option>
				<option value="select,premium">Business With Employees</option>
			</select>
		</div>
	</div>

	<div class="pricing-table__price-disclaimer pr-2 mb-5 mb-md-3 d-none d-md-flex">
		USD <img src="<?= esc_url( fp_get_asset( 'images/country-flags/US.svg' ) ) ?>" alt="US Flag">
	</div>
	<div class="pricing-table__swiper-container swiper-container mt-md-5">
		<div class="pricing-table_grid mx-auto mb-1 swiper-wrapper">
			<!-- Lite column -->
			<div class="pricing-table_column border px-0 swiper-slide" data-plan="lite">
				<div class="pricing-table_column-badge w-100 position-absolute text-center">Recommended for You</div>

				<div class="pricing-table_column-label pt-4 pt-md-3 pb-4">
					<div class="px-3">
						<h3 class="pricing-table_column-label__title text-center text-md-left">Lite</h3>
					</div>
				</div>

				<div class="pricing-table_column-price w-100 text-center position-relative pb-4 pb-md-2 px-4 px-md-3">
					<div class="pricing-table_column-price__value d-flex text-left">
						<div class="w-100">
							<div class="pricing-table_column-price__numerical position-relative w-100 yearly">
								<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-2" width="218" height="25" alt="50% off for 4 months" />
								<p class="pricing-table__discount-message mt-0 mb-4 text-center">+10% OFF YEARLY PRICE</p>
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">132<sup class="pricing-table_column-price__cents">.00</sup></span>
								<sub class="pricing-table_column-price__term">/yr</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>$180.00</s> Save $48.00*</span>
								</div>
							</div>
							<div class="pricing-table_column-price__numerical position-relative w-100 monthly">
							<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-4" width="218" height="25" alt="50% off for 4 months" />
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">7<sup class="pricing-table_column-price__cents">.50</sup></span>
								<sub class="pricing-table_column-price__term">/mo</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>$15.00</s> Save $30.00*</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
						<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
					</div>
					<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
						or <a href="/signup">Try It Free</a>
					</div>
				</div>

				<div class="pricing-table_column-features px-3 py-4 d-md-block mb-md-auto">
					<span class="pricing-table_column-features__title d-none d-md-block">Lite includes:</span>
					<ul class="pricing-table_column-features__points">
						<?php foreach ( $plans_data['lite_includes'] as $k => $feature ) : ?>
							<li class="pricing-table_column-features__point<?= $feature['bold'] ? ' bold' : ''; ?>">
								<a class="pricing-table_column-features__link" href="#modal-lite-inc-<?= esc_attr( $k ); ?>" target="modal">
									<?= fp_noesc( $feature['title'] ); ?>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
					<span class="pricing-table_column-features__expand">
						<a class="pricing-table_column-features__expand-link" href="#compare">Compare Plans</a>
					</span>
				</div>

				<div class="pricing-table_column-footer w-100 mt-3 px-3 d-md-block">
					<span class="pricing-table_column-features__title">Add-ons:</span>
					<ul class="pricing-table_column-addons pricing-table_column-features p-0">
						<?php foreach ( $plans_data['lite_addons'] as $k => $addon ) : ?>
							<li class="pricing-table_column-addon pricing-table_column-features__point <?= isset( $addon['bold'] ) ? 'bold' : ''; ?>">
								<a href="#modal-lite-addon-<?= esc_attr( $k ); ?>" target="modal">
									<span class="pricing-table_column-addon__plus">+</span>
									<span class="pricing-table_column-addon__title"><?= fp_noesc( $addon['title'] ); ?></span>
									<span class="pricing-table_column-addon__subtext"><?= fp_noesc( $addon['subtext'] ); ?></span>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>

					<div class="pricing-table_column-footer-buttons position-absolute w-100 px-3 text-center py-4 d-none d-md-block">
						<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
						</div>
						<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
							or <a href="/signup">Try It Free</a>
						</div>
					</div>
				</div>
				<div class="pricing-table_column-mobile-features px-3 d-md-none">
					<span class=" h5 pricing-table_column-mobile-features__title">Everything in Lite, and more</span>
				</div>
				<a class="pricing-table_column-mobile-features__details d-md-none" href="#0">
					<span class="toggle-open">See details</span>
					<span class="toggle-hide">Hide details</span>
				</a>
			</div>

			<!-- Plus column -->
			<div class="pricing-table_column border px-0 swiper-slide recommended" data-plan="plus">
				<div class="pricing-table_column-badge w-100 position-absolute text-center">Recommended for You</div>

				<div class="pricing-table_column-label pt-4 pt-md-3 pb-4">
					<div class="px-3">
						<h3 class="pricing-table_column-label__title text-center text-md-left">Plus</h3>
					</div>
				</div>

				<div class="pricing-table_column-price w-100 text-center position-relative pb-4 pb-md-2 px-4 px-md-3">
					<div class="pricing-table_column-price__value d-flex text-left">
						<div class="w-100">
							<div class="pricing-table_column-price__numerical position-relative w-100 yearly">
								<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-2" width="218" height="25" alt="50% off for 4 months" />
								<p class="pricing-table__discount-message mt-0 mb-4 text-center">+10% OFF YEARLY PRICE</p>
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">264<sup class="pricing-table_column-price__cents">.00</sup></span>
								<sub class="pricing-table_column-price__term">/yr</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>360.00</s> Save 96.00</span>
								</div>
							</div>
							<div class="pricing-table_column-price__numerical position-relative w-100 monthly">
							<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-4" width="218" height="25" alt="50% off for 4 months" />
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">15<sup class="pricing-table_column-price__cents">.00</sup></span>
								<sub class="pricing-table_column-price__term">/mo</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>30.00</s> Save $60.00*</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
						<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
					</div>
					<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
						or <a href="/signup">Try It Free</a>
					</div>
				</div>

				<div class="pricing-table_column-features px-3 py-4 d-md-block mb-md-auto">
					<span class="pricing-table_column-features__title d-none d-md-block">All Lite Features and:</span>
					<ul class="pricing-table_column-features__points">
						<?php foreach ( $plans_data['plus_includes'] as $k => $feature ) : ?>
							<li class="pricing-table_column-features__point <?= $feature['bold'] ? 'bold' : ''; ?>">
								<a class="pricing-table_column-features__link" href="#modal-plus-inc-<?= esc_attr( $k ); ?>" target="modal">
									<?= fp_noesc( $feature['title'] ); ?>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
					<span class="pricing-table_column-features__expand">
						<a class="pricing-table_column-features__expand-link" href="#compare">Compare Plans</a>
					</span>
				</div>
				<div class="pricing-table_column-footer w-100 mt-3 px-3 d-md-block">
					<span class="pricing-table_column-features__title">Add-ons:</span>
					<ul class="pricing-table_column-addons pricing-table_column-features p-0">
						<?php foreach ( $plans_data['plus_addons'] as $k => $addon ) : ?>
							<li class="pricing-table_column-addon pricing-table_column-features__point <?= $addon['bold'] ? 'bold' : ''; ?>">
								<a href="#modal-plus-addon-<?= esc_attr( $k ); ?>" target="modal">
									<span class="pricing-table_column-addon__plus">+</span>
									<span class="pricing-table_column-addon__title"><?= fp_noesc( $addon['title'] ); ?></span>
									<span class="pricing-table_column-addon__subtext"><?= fp_noesc( $addon['subtext'] ); ?></span>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>

					<div class="pricing-table_column-footer-buttons position-absolute w-100 px-3 text-center py-4 d-none d-md-block">
						<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
						</div>
						<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
							or <a href="/signup">Try It Free</a>
						</div>
					</div>
				</div>
				<div class="pricing-table_column-mobile-features px-3 d-md-none">
					<span class="h5 pricing-table_column-mobile-features__title">Everything in Lite, and more</span>
				</div>
				<a class="pricing-table_column-mobile-features__details d-md-none" href="#0">
					<span class="toggle-open">See details</span>
					<span class="toggle-hide">Hide details</span>
				</a>
			</div>

			<!-- Premium Column -->
			<div class="pricing-table_column border px-0 swiper-slide" data-plan="premium">
				<div class="pricing-table_column-badge w-100 position-absolute text-center">Recommended for You</div>

				<div class="pricing-table_column-label pt-4 pt-md-3 pb-4">
					<div class="px-3">
						<h3 class="pricing-table_column-label__title text-center text-md-left">Premium</h3>
					</div>
				</div>

				<div class="pricing-table_column-price w-100 text-center position-relative pb-4 pb-md-2 px-4 px-md-3">
					<div class="pricing-table_column-price__value d-flex text-left">
						<div class="w-100">
							<div class="pricing-table_column-price__numerical position-relative w-100 yearly">
								<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-2" width="218" height="25" alt="50% off for 4 months" />
								<p class="pricing-table__discount-message mt-0 mb-4 text-center">+10% OFF YEARLY PRICE</p>
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">484<sup class="pricing-table_column-price__cents">.00</sup></span>
								<sub class="pricing-table_column-price__term">/yr</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>660.00</s> Save $176.00</span>
								</div>
							</div>
							<div class="pricing-table_column-price__numerical position-relative w-100 monthly">
							<img src="https://staging.web.freshenv.com/wp-content/uploads/50-Off-4-Months-Banner.svg" class="pricing-table__promo-image mb-4" width="218" height="25" alt="50% off for 4 months" />
								<sup class="pricing-table_column-price__currency">$</sup>
								<span class="pricing-table_column-price__dollar">27<sup class="pricing-table_column-price__cents">.50</sup></span>
								<sub class="pricing-table_column-price__term">/mo</sub>
								<div class="pricing-table_column-price__subtext w-100">
									<span class="pricing-table_column-price__promo-text">50% Off For 4 Months</span>
									<span class="pricing-table_column-price__promo-save-text">Was <s>55.00</s> Save $110.00*</span>
								</div>
							</div>
						</div>
					</div>
					<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
						<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
					</div>
					<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
						or <a href="/signup">Try It Free</a>
					</div>
				</div>

				<div class="pricing-table_column-features px-3 py-4 d-md-block mb-md-auto">
					<span class="pricing-table_column-features__title d-none d-md-block">All Plus Features and:</span>
					<ul class="pricing-table_column-features__points">
						<?php foreach ( $plans_data['premium_includes'] as $k => $feature ) : ?>
							<li class="pricing-table_column-features__point <?= $feature['bold'] ? 'bold' : ''; ?>">
								<a class="pricing-table_column-features__link" href="#modal-premium-inc-<?= esc_attr( $k ); ?>" target="modal">
									<?= fp_noesc( $feature['title'] ); ?>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
					<span class="pricing-table_column-features__expand">
						<a class="pricing-table_column-features__expand-link" href="#compare">Compare Plans</a>
					</span>
				</div>
				<div class="pricing-table_column-footer w-100 mt-3 px-3 d-md-block">
					<span class="pricing-table_column-features__title">Add-ons:</span>
					<ul class="pricing-table_column-addons pricing-table_column-features p-0">
						<?php foreach ( $plans_data['premium_addons'] as $k => $addon ) : ?>
							<li class="pricing-table_column-addon pricing-table_column-features__point <?= $addon['bold'] ? 'bold' : ''; ?>">
								<a href="#modal-premium-addon-<?= esc_attr( $k ); ?>" target="modal">
									<span class="pricing-table_column-addon__plus">+</span>
									<span class="pricing-table_column-addon__title"><?= fp_noesc( $addon['title'] ); ?></span>
									<span class="pricing-table_column-addon__subtext"><?= fp_noesc( $addon['subtext'] ); ?></span>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>

					<div class="pricing-table_column-footer-buttons position-absolute w-100 px-3 text-center py-4 d-none d-md-block">
						<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green mb-2 px-0" target="_self">BUY NOW & SAVE</a>
						</div>
						<div class="pricing-table_column-secondary-link standard" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
							or <a href="/signup">Try It Free</a>
						</div>
					</div>
				</div>
				<div class="pricing-table_column-mobile-features px-3 d-md-none">
					<span class="h5 pricing-table_column-mobile-features__title">Everything in Plus, and more</span>
				</div>
				<a class="pricing-table_column-mobile-features__details d-md-none" href="#0">
					<span class="toggle-open">See details</span>
					<span class="toggle-hide">Hide details</span>
				</a>
			</div>

			<!-- Select Column -->
			<div class="pricing-table_column border px-0 swiper-slide" data-plan="select">
				<div class="pricing-table_column-badge w-100 position-absolute text-center">Recommended for You</div>

				<div class="pricing-table_column-label pt-3 pb-3">
					<div class="px-3">
						<h3 class="pricing-table_column-label__title text-center text-md-left">Select</h3>
					</div>
				</div>

				<div class="pricing-table_column-price w-100 text-center position-relative pb-4 pb-md-2 px-4 px-md-3">
					<div class="pricing-table_column-price__value d-flex text-left">
						<div class="w-100">
							<h3 class="select">Let's Talk</h3>
							<div class="pricing-table_column-price__subtext w-100">
								<span class="pricing-table_column-price__text">Customize your plan to suit your business needs</span>
							</div>
						</div>
					</div>
					<div class="pricing-table_column-cta d-flex flex-column w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
						<a href="/select#select-web-to-lead-form" class="btn btn-white my-2 px-0" target="_self">Talk to a Specialist</a>
					</div>
					<div class="pricing-table_column-secondary-link standard select" data-cta-text-monthly="ortryitfree-monthly-plus" data-cta-text-yearly="ortryitfree-yearly-plus" data-cta-section="pricinggrid-top">
						or <a href="/signup">Try It Free</a>
					</div>
				</div>

				<div class="pricing-table_column-features px-3 py-4 d-md-block mb-md-auto">
					<span class="pricing-table_column-features__title d-none d-md-block">All Premium Features and:</span>
					<ul class="pricing-table_column-features__points">
						<?php foreach ( $plans_data['select_includes'] as $k => $feature ) : ?>
							<li class="pricing-table_column-features__point <?= $feature['bold'] ? 'bold' : ''; ?>">
								<a class="pricing-table_column-features__link" href="#modal-select-inc-<?= esc_attr( $k ); ?>" target="modal">
									<?= fp_noesc( $feature['title'] ); ?>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
					<span class="pricing-table_column-features__expand">
						<a class="pricing-table_column-features__expand-link" href="#compare">Compare Plans</a>
					</span>
				</div>
				<div class="pricing-table_column-footer w-100 mt-3 px-3 d-md-block">
					<span class="pricing-table_column-features__title">Add-ons:</span>
					<ul class="pricing-table_column-addons pricing-table_column-features p-0">
						<?php foreach ( $plans_data['select_addons'] as $k => $addon ) : ?>
							<li class="pricing-table_column-addon pricing-table_column-features__point <?= $addon['bold'] ? 'bold' : ''; ?>">
								<a href="#modal-select-addon-<?= esc_attr( $k ); ?>" target="modal">
									<span class="pricing-table_column-addon__plus">+</span>
									<span class="pricing-table_column-addon__title"><?= fp_noesc( $addon['title'] ); ?></span>
									<span class="pricing-table_column-addon__subtext"><?= fp_noesc( $addon['subtext'] ); ?></span>
									<span class="pricing-table_column-features__info">i</span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>

					<div class="pricing-table_column-footer-buttons position-absolute text-center px-3 py-4 w-100 d-none d-md-block">
						<div class="pricing-table_column-cta d-flex flex-column mb-4 w-100 align-items-center" data-cta-text-monthly="buynow-monthly-lite" data-cta-text-yearly="buynow-yearly-lite" data-cta-section="pricinggrid-top">
							<a href="/select#select-web-to-lead-form" class="btn btn-white mb-2 px-0" target="_self">TALK TO A SPECIALIST</a>
						</div>
					</div>
				</div>
				<div class="pricing-table_column-mobile-features px-3 d-md-none">
					<span class="h5 pricing-table_column-mobile-features__title">Everything in Premium, and more</span>
				</div>
				<a class="pricing-table_column-mobile-features__details d-md-none" href="#0">
					<span class="toggle-open">See details</span>
					<span class="toggle-hide">Hide details</span>
				</a>
			</div>
		</div>
		<div class="pricing-table__swiper-pagination swiper-pagination d-md-none"></div>
	</div>

	<div class="pricing-table__swiper-button pricing-table__swiper-button--prev swiper-button-prev d-md-none"></div>
	<div class="pricing-table__swiper-button pricing-table__swiper-button--next swiper-button-next d-md-none"></div>
</div>

<h2 class="section-heading section-heading_main text-center">Why Small Business Owners Love FreshBooks</h2>

<div class="testimonial-blocks position-relative row flex-column overflow-hidden pb-5 mb-0">
	<div class="testimonial-blocks__container swiper-container" data-swiper-breakpoint="480">
		<div class="testimonial-blocks__wrapper swiper-wrapper justify-content-md-center">
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<img src="<?= fp_get_asset( 'images/homepage/test-victoria-adams@2x.jpg' ) ?>" alt="Image of Victoria Adams" class="testimonial-blocks__item-image">
				<p class="testimonial-blocks__item-description">"We had a record year this past year. Could we have done it without FreshBooks? I don't know how we would have."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Victoria Adams</span>
				<span class="testimonial-blocks__item-position text-uppercase">Principal / Creative Director - Excentric Agency</span>
			</div>
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<img src="<?= fp_get_asset( 'images/homepage/test-graham-pugh@2x.jpg' ) ?>" alt="Image of Victoria Adams" class="testimonial-blocks__item-image">
				<p class="testimonial-blocks__item-description">"I found FreshBooks to be so intuitive. I was easily able to do time tracking, expense tracking, and invoice customers."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Graham Pugh</span>
				<span class="testimonial-blocks__item-position text-uppercase">Co-Founder, Propel Clean Energy Partners</span>
			</div>
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<img src="<?= fp_get_asset( 'images/homepage/test-carolina-ramirez@2x.jpg' ) ?>" alt="Image of Victoria Adams" class="testimonial-blocks__item-image">
				<p class="testimonial-blocks__item-description">"The competitve pricing of FreshBooks and the user interface, it's just very user-friendly. For someone in branding and marketing PR, that's important."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Carolina Ramirez Herrera</span>
				<span class="testimonial-blocks__item-position text-uppercase">Owner, CRH Collective</span>
			</div>
		</div>
	</div>
	<div class="testimonial-blocks__pagination swiper-pagination d-flex justify-content-center d-md-none"></div>
</div>

<div id="compare" class="fp-block comparison-table wp-block mt-5 wp-block-fpbk-comparison-table comparison-table position-relative px-0 px-xl-3 mx-lg-auto trackingSection-comparison-table" data-promo-exists="true" data-prefix="fpbk" data-promo-show="true" data-selected="lite" data-show="lite,plus,premium,select">
	<span class="sentinel"></span>
	<div class="comparison-table__mobile-header-sticky <?= esc_attr( $is_campaign_active ? 'has-promo-banner' : '' ); ?> table-sticky-header d-sm-none">
		<ul>
			<li data-plan="lite" class="active">Lite</li>
			<li data-plan="plus">Plus</li>
			<li data-plan="premium">Premium</li>
			<li data-plan="select">Select</li>
		</ul>
	</div>
	<div class="comparison-table__header-sticky <?= esc_attr( $is_campaign_active ? 'has-promo-banner' : '' ); ?> table-sticky-header d-none d-sm-flex">
		<table class="comparison-table__header-table table table-borderless table-responsive-lg mb-0 w-100" aria-label="Comparison Table">
			<thead class="comparison-table__header-row">
			<tr>
				<th scope="col">
					<div class="cell-content d-flex flex-column align-items-center text-center">
						<span class="comparison-table__header-row_trial-title mb-2 d-none d-sm-block not-sticky">
							Unlock all features for 30 days
						</span>

						<div class="comparison-table__header-row_button-wrapper w-100 d-flex justify-content-center not-sticky">
							<div class="standard d-none d-xl-none">
								<a href="https://my.freshbooks.com/#/signup/direct-buy?campaign=DB_Q32022_MN_50FOR4" class="btn btn-cta-green d-none d-md-inline-block d-xl-none mr-1" data-cta-text-monthly="buynow-monthly-Buy Now" data-cta-section="comparison-table">Buy Now & Save</a>
							</div>

							<div class="promo d-none d-xl-none">
								<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green d-none d-md-inline-block d-xl-none mr-1" data-cta-text-monthly="buynow-monthly-Buy Now" data-cta-section="comparison-table">Buy Now & Save</a>
							</div>

							<span>
									<a href="https://www.freshbooks.com/signup" class="btn btn-outline-grey ml-1" data-cta-text-monthly="tryitfree-TRY IT FREE" data-cta-section="comparison-table">
										TRY IT FREE
									</a>
							</span>
						</div>

						<div class="comparison-table__header-sticky-wrapper on-sticky w-100">
							<span class="comparison-table__header-sticky-label">FreshBooks Product:</span>
							<h4 class="comparison-table__header-sticky-title"></h4>
							<a href="https://www.freshbooks.com/signup" class="comparison-table__header-sticky-link">Try It Free for 30 Days</a>
						</div>
					</div>
				</th>
				<th class="text-center px-0" scope="col">
					<div class="cell-content cell-label flex-column d-flex align-items-center justify-content-center">

						<div class="comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center">
							<span class="comparison-table__header-row_cell-title mr-lg-1">Lite</span>

							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($7.50/mo)</span>
									<span class="yearly">($132.00/yr)</span>
								</span>
							</div>
							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($7.50/mo)</span>
									<span class="yearly">($132.00/yr)</span>
								</span>
							</div>
						</div>

						<div class="standard">
							<a href="https://my.freshbooks.com/#/signup/direct-buy?campaign=DB_Q32022_MN_50FOR4" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-lite" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<div class="promo w-100 d-flex justify-content-center">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-lite" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<a href="#0" class="toggle blue" aria-label="Plan Toggle" data-toggle="lite"></a>
					</div>
				</th>
				<th class="text-center px-0" scope="col">
					<div class="cell-content cell-label flex-column d-flex align-items-center justify-content-center">

						<div class="comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center">
							<span class="comparison-table__header-row_cell-title mr-lg-1">Plus</span>

							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($15.00/mo)</span>
									<span class="yearly">($264.00/yr)</span>
								</span>
							</div>
							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($15.00/mo)</span>
									<span class="yearly">($264.00/yr)</span>
								</span>
							</div>
						</div>

						<div class="standard">
							<a href="https://my.freshbooks.com/#/signup/direct-buy?campaign=DB_Q32022_MN_50FOR4" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-plus" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<div class="promo w-100 d-flex justify-content-center">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-plus" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<a href="#0" class="toggle blue" aria-label="Plan Toggle" data-toggle="plus"></a>
					</div>
				</th>
				<th class="text-center px-0" scope="col">
					<div class="cell-content cell-label flex-column d-flex align-items-center justify-content-center">

						<div class="comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center">
							<span class="comparison-table__header-row_cell-title mr-lg-1">Prem<span class="d-none d-sm-inline-block">ium</span></span>

							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($27.50/mo)</span>
									<span class="yearly">($484.00/yr)</span>
								</span>
							</div>
							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									<span class="monthly">($27.50/mo)</span>
									<span class="yearly">($484.00/yr)</span>
								</span>
							</div>
						</div>

						<div class="standard">
							<a href="https://my.freshbooks.com/#/signup/direct-buy?campaign=DB_Q32022_MN_50FOR4" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-premium" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<div class="promo w-100 d-flex justify-content-center">
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="comparison-table__header-row_cell-cta btn btn-cta-green d-none d-xl-block" data-cta-text-monthly="buynow-monthly-premium" data-cta-section="comparison-table">Buy Now & Save</a>
						</div>
						<a href="#0" class="toggle blue" aria-label="Plan Toggle" data-toggle="premium"></a>
					</div>
				</th>
				<th class="text-center px-0" scope="col">
					<div class="cell-content cell-label flex-column d-flex align-items-center justify-content-center">

						<div class="comparison-table__header-text d-flex flex-wrap flex-xl-nowrap mb-lg-2 justify-content-center">
							<span class="comparison-table__header-row_cell-title mr-lg-1">Select</span>

							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto standard">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									(Custom)
								</span>
							</div>
							<div class="comparison-table__header-row_cell-price-wrapper w-100 w-lg-auto promo">
								<span class="comparison-table__header-row_cell-price d-none d-md-block">
									(Custom)
								</span>
							</div>
						</div>

						<div class="standard">
							<a href="https://www.freshbooks.com/select" class="comparison-table__header-row_cell-cta px-2 text-uppercase font-weight-medium btn btn-white d-none d-xl-block" data-cta-text-monthly="requestademo-monthly-select" data-cta-section="comparison-table">
								Request Demo
							</a>
						</div>
						<div class="promo w-100 d-flex justify-content-center">
							<a href="https://www.freshbooks.com/select" class="comparison-table__header-row_cell-cta px-2 text-uppercase font-weight-medium btn btn-white d-none d-xl-block" data-cta-text-monthly="-monthly-select" data-cta-section="comparison-table">
								Request Demo
							</a>
						</div>
						<a href="#0" class="toggle blue" aria-label="Plan Toggle" data-toggle="select"></a>
					</div>
				</th>
			</tr>
			</thead>
		</table>
	</div>

	<?php foreach ( $comparison_data as $comparison_table_header => $comparison_table ) : ?>
		<table class="comparison-table__category-table table table-fb-striped table-borderless table-responsive-lg mb-0 w-100" aria-label="<?= esc_attr( $comparison_table_header ); ?>">
			<thead class="comparison-table__category-plan">
				<tr>
					<th scope="col" class="text-uppercase"><?= esc_html( $comparison_table_header ); ?></th>
					<th scope="col">
						<div class="cell-label d-none d-sm-flex flex-sm-column flex-md-row align-items-center justify-content-center">
							<p>Lite</p>
							<a href="#0" class="toggle" aria-label="Plan Toggle" data-toggle="lite"></a>
						</div>
					</th>
					<th id="add-ons_plus" scope="col">
						<div class="cell-label d-none d-sm-flex flex-sm-column flex-md-row align-items-center justify-content-center">
							<p>Plus</p>
							<a href="#0" class="toggle" aria-label="Plan Toggle" data-toggle="plus"></a>
						</div>
					</th>
					<th id="add-ons_premium" scope="col">
						<div class="cell-label d-none d-sm-flex flex-sm-column flex-md-row align-items-center justify-content-center">
							<p>Premium</p>
							<a href="#0" class="toggle" aria-label="Plan Toggle" data-toggle="premium"></a>
						</div>
					</th>
					<th id="add-ons_select" scope="col">
						<div class="cell-label d-none d-sm-flex flex-sm-column flex-md-row align-items-center justify-content-center">
							<p>Select</p>
							<a href="#0" class="toggle" aria-label="Plan Toggle" data-toggle="select"></a>
						</div>
					</th>
				</tr>
			</thead>

			<tbody>
				<?php foreach ( $comparison_table as $comparison_row_header => $comparison_row ) : ?>
					<tr>
						<th scope="row">
							<?php if ( ! empty( $comparison_row['modal_heading'] ) ) : ?>
								<a href="#modal-<?= esc_attr( strtolower( preg_replace( '/( |\(|\)|\+)/', '', $comparison_row_header ) ) ); ?>" target="modal">
									<?= esc_html( $comparison_row_header ); ?>
									<span class="comparison-table__info">i</span>
								</a>
							<?php else : ?>
								<?= esc_html( $comparison_row_header ); ?>
							<?php endif; ?>
						</th>

						<?php foreach ( $plans as $plan ) : ?>
							<td class="text-center px-0 d-table-cell align-middle">
								<?php if ( true === $comparison_row[ $plan ] ) : ?>
									<img loading="lazy" class="checkmark w-auto skip-lazy" alt="Checkmark" src="<?= esc_url( $icon_checkmark ); ?>" width="22" height="17">
								<?php else : ?>
									<?= fp_noesc( $comparison_row[ $plan ] ); ?>
								<?php endif; ?>
							</td>
						<?php endforeach; ?>
					</tr>
				<?php endforeach; ?>
				<tr class="comparison-table__category-plan_gap">
					<td rowspan="99">&nbsp;</td>
				</tr>
			</tbody>
		</table>
	<?php endforeach; ?>
</div>

<?php get_template_part( 'partials/content' ); ?>
<?php foreach ( $plans_data['lite_includes'] as $k => $feature ) : ?>
	<div id="modal-lite-inc-<?= esc_attr( $k ); ?>" class="fp-block pricing-modal modal wp-block wp-block-fpbk-modal fade my-0 trackingSection-modal" tabindex="-1" data-visibility="everyone" data-auto-show="0" data-prefix="fpbk" style="display: none;" aria-hidden="true">
		<div class="modal__dialog modal-dialog modal-dialog-centered modal-full" role="document">
			<div class="modal__content modal-content pt-6 pb-7">
				<div class="modal__content-wrapper d-flex flex-wrap justify-content-center">
					<div class="modal__column col-12 col-sm-10 col-md-8 col-lg-6 mb-5 mb-lg-0 d-flex flex-wrap justify-content-center justify-content-lg-start">
						<h4 class="modal__heading text-center text-lg-left"><?= fp_noesc( $feature['modal_heading'] ); ?></h4>
						<div class="modal__inner-content mb-4 pr-lg-5">
							<?= fp_noesc( $feature['modal_content'] ); ?>
						</div>
						<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green modal__cta m-2 mt-lg-0 mr-lg-3 mb-lg-0 ml-lg-0">BUY NOW & SAVE</a>
						<a href="<?= esc_url( home_url( '/signup' ) ) ?>" class="btn btn-white modal__cta m-2 m-lg-0">Try It Free</a>
						<?php if ( empty( $feature['modal_image'] ) ) : ?>
							<div class="modal__contact w-100">
								<p>Have questions? <br>Talk to a Specialist:</p>
								<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
							</div>
						<?php endif; ?>
					</div>
					<?php if ( ! empty( $feature['modal_image'] ) ) : ?>
						<div class="modal__column col-12 col-lg-6 text-right d-flex flex-column justify-content-center align-items-center">
							<?php
								$image_arr = explode( ':', $feature['modal_image'] );
								$is_yt = 'yt' === $image_arr[0];
							?>
							<?php if ( $is_yt ) : ?>
								<?php
									$yt_url = 'https://www.youtube.com/embed/' . $image_arr[1];
								?>
								<iframe width="560" height="315" src="<?= esc_url( $yt_url ); ?>" title="<?= esc_attr( $feature['title'] ); ?>" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							<?php else : ?>
								<img src="<?= esc_url( $feature['modal_image'] ); ?>" alt="<?= esc_attr( $feature['title'] ); ?> modal">
							<?php endif; ?>
							<div class="modal__contact">
								<p>Have questions? <br>Talk to a Specialist:</p>
								<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
							</div>
						</div>
					<?php endif; ?>
				</div>
				<button data-dismiss="modal" class="modal__close-button position-absolute" style="color: #50697B;">
					Close
					<span class="position-absolute" style="background-color: #50697B;"></span>
					<span class="position-absolute" style="background-color: #50697B;"></span>
				</button>
			</div>
		</div>
	</div>
<?php endforeach; ?>

<?php foreach ( $plans as $plan ) : ?>
	<?php foreach ( $plans_data[ $plan . '_includes' ] as $k => $feature ) : ?>
		<div id="modal-<?= esc_attr( $plan ); ?>-inc-<?= esc_attr( $k ); ?>" class="fp-block pricing-modal modal wp-block wp-block-fpbk-modal fade my-0 trackingSection-modal" tabindex="-1" data-visibility="everyone" data-auto-show="0" data-prefix="fpbk" style="display: none;" aria-hidden="true">
			<div class="modal__dialog modal-dialog modal-dialog-centered modal-full" role="document">
				<div class="modal__content modal-content pt-6 pb-7">
					<div class="modal__content-wrapper d-flex flex-wrap justify-content-center">
						<div class="modal__column col-12 col-sm-10 col-md-8 col-lg-6 mb-5 mb-lg-0 d-flex flex-wrap justify-content-center justify-content-lg-start">
							<h4 class="modal__heading text-center text-lg-left"><?= fp_noesc( $feature['modal_heading'] ); ?></h4>
							<div class="modal__inner-content mb-4 pr-lg-5">
								<?= fp_noesc( $feature['modal_content'] ); ?>
							</div>
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green modal__cta m-2 mt-lg-0 mr-lg-3 mb-lg-0 ml-lg-0">BUY NOW & SAVE</a>
							<a href="<?= esc_url( home_url( '/signup' ) ) ?>" class="btn btn-white modal__cta m-2 m-lg-0">Try It Free</a>
							<?php if ( empty( $feature['modal_image'] ) ) : ?>
								<div class="modal__contact w-100">
									<p>Have questions? <br>Talk to a Specialist:</p>
									<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
								</div>
							<?php endif; ?>
						</div>
						<?php if ( ! empty( $feature['modal_image'] ) ) : ?>
							<div class="modal__column col-12 col-lg-6 text-right d-flex flex-column justify-content-center align-items-center">
								<?php
									$image_arr = explode( ':', $feature['modal_image'] );
									$is_yt = 'yt' === $image_arr[0];
								?>
								<?php if ( $is_yt ) : ?>
									<?php
									$yt_url = 'https://www.youtube.com/embed/' . $image_arr[1];
									?>
									<iframe width="560" height="315" src="<?= esc_url( $yt_url ); ?>" title="<?= esc_attr( $feature['title'] ); ?>" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								<?php else : ?>
									<img src="<?= esc_url( $feature['modal_image'] ); ?>" alt="<?= esc_attr( $feature['title'] ); ?> modal">
								<?php endif; ?>
								<div class="modal__contact">
									<p>Have questions? <br>Talk to a Specialist:</p>
									<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
								</div>
							</div>
						<?php endif; ?>
					</div>
					<button data-dismiss="modal" class="modal__close-button position-absolute" style="color: #50697B;">
						Close
						<span class="position-absolute" style="background-color: #50697B;"></span>
						<span class="position-absolute" style="background-color: #50697B;"></span>
					</button>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
	<?php foreach ( $plans_data[ $plan . '_addons' ] as $k => $feature ) : ?>
		<div id="modal-<?= esc_attr( $plan ); ?>-addon-<?= esc_attr( $k ); ?>" class="fp-block pricing-modal modal wp-block wp-block-fpbk-modal fade my-0 trackingSection-modal" tabindex="-1" data-visibility="everyone" data-auto-show="0" data-prefix="fpbk" style="display: none;" aria-hidden="true">
			<div class="modal__dialog modal-dialog modal-dialog-centered modal-full" role="document">
				<div class="modal__content modal-content pt-6 pb-7">
					<div class="modal__content-wrapper d-flex flex-wrap justify-content-center">
						<div class="modal__column col-12 col-sm-10 col-md-8 col-lg-6 mb-5 mb-lg-0 d-flex flex-wrap justify-content-center justify-content-lg-start">
							<h4 class="modal__heading text-center text-lg-left"><?= fp_noesc( $feature['modal_heading'] ); ?></h4>
							<div class="modal__inner-content mb-4 pr-lg-5">
								<?= fp_noesc( $feature['modal_content'] ); ?>
							</div>
							<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green modal__cta m-2 mt-lg-0 mr-lg-3 mb-lg-0 ml-lg-0">BUY NOW & SAVE</a>
							<a href="<?= esc_url( home_url( '/signup' ) ) ?>" class="btn btn-white modal__cta m-2 m-lg-0">Try It Free</a>
							<?php if ( empty( $feature['modal_image'] ) ) : ?>
								<div class="modal__contact w-100">
									<p>Have questions? <br>Talk to a Specialist:</p>
									<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
								</div>
							<?php endif; ?>
						</div>
						<?php if ( ! empty( $feature['modal_image'] ) ) : ?>
							<div class="modal__column col-12 col-lg-6 text-right d-flex flex-column justify-content-center align-items-center">
								<?php
									$image_arr = explode( ':', $feature['modal_image'] );
									$is_yt = 'yt' === $image_arr[0];
								?>
								<?php if ( $is_yt ) : ?>
									<?php
									$yt_url = 'https://www.youtube.com/embed/' . $image_arr[1];
									?>
									<iframe width="560" height="315" src="<?= esc_url( $yt_url ); ?>" title="<?= esc_attr( $feature['title'] ); ?>" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								<?php else : ?>
									<img src="<?= esc_url( $feature['modal_image'] ); ?>" alt="<?= esc_attr( $feature['title'] ); ?> modal">
								<?php endif; ?>
								<div class="modal__contact">
									<p>Have questions? <br>Talk to a Specialist:</p>
									<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
								</div>
							</div>
						<?php endif; ?>
					</div>
					<button data-dismiss="modal" class="modal__close-button position-absolute" style="color: #50697B;">
						Close
						<span class="position-absolute" style="background-color: #50697B;"></span>
						<span class="position-absolute" style="background-color: #50697B;"></span>
					</button>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
<?php endforeach; ?>
<?php foreach ( $comparison_data as $comparison_table_header => $comparison_table ) : ?>
	<?php foreach ( $comparison_table as $comparison_row_header => $comparison_row ) : ?>
		<?php if ( ! empty( $comparison_row['modal_heading'] ) ) : ?>
			<div id="modal-<?= esc_attr( strtolower( preg_replace( '/( |\(|\)|\+)/', '', $comparison_row_header ) ) ); ?>" class="fp-block pricing-modal modal wp-block wp-block-fpbk-modal fade my-0 trackingSection-modal" tabindex="-1" data-visibility="everyone" data-auto-show="0" data-prefix="fpbk" style="display: none;" aria-hidden="true">
				<div class="modal__dialog modal-dialog modal-dialog-centered modal-full" role="document">
					<div class="modal__content modal-content pt-6 pb-7">
						<div class="modal__content-wrapper d-flex flex-wrap justify-content-center">
							<div class="modal__column col-12 col-sm-10 col-md-8 col-lg-6 mb-5 mb-lg-0 d-flex flex-wrap justify-content-center justify-content-lg-start">
								<h4 class="modal__heading text-center text-lg-left"><?= fp_noesc( $comparison_row['modal_heading'] ); ?></h4>
								<div class="modal__inner-content mb-4 pr-lg-5">
									<?= fp_noesc( $comparison_row['modal_content'] ); ?>
								</div>
								<a href="<?= esc_url( $direct_buy_url ); ?>" class="btn btn-cta-green modal__cta m-2 mt-lg-0 mr-lg-3 mb-lg-0 ml-lg-0">BUY NOW & SAVE</a>
								<a href="<?= esc_url( home_url( '/signup' ) ) ?>" class="btn btn-white modal__cta m-2 m-lg-0">Try It Free</a>
								<?php if ( empty( $comparison_row['modal_image'] ) ) : ?>
									<div class="modal__contact w-100">
										<p>Have questions? <br>Talk to a Specialist:</p>
										<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
									</div>
								<?php endif; ?>
							</div>
							<?php if ( ! empty( $comparison_row['modal_image'] ) ) : ?>
								<div class="modal__column col-12 col-lg-6 text-right d-flex flex-column justify-content-center align-items-center">
									<?php
										$image_arr = explode( ':', $comparison_row['modal_image'] );
										$is_yt = 'yt' === $image_arr[0];
									?>
									<?php if ( $is_yt ) : ?>
										<?php
										$yt_url = 'https://www.youtube.com/embed/' . $image_arr[1];
										?>
										<iframe width="560" height="315" src="<?= esc_url( $yt_url ); ?>" title="<?= esc_attr( $comparison_row['title'] ); ?>" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									<?php else : ?>
										<img src="<?= esc_url( $comparison_row['modal_image'] ); ?>" alt="<?= esc_attr( $comparison_row['title'] ); ?> modal">
									<?php endif; ?>
									<div class="modal__contact">
										<p>Have questions? <br>Talk to a Specialist:</p>
										<a href="tel:1.888.674.3175" class="btn btn-white modal__cta"><img src="<?= esc_url( $phone_icon ); ?>" alt="Phone icon">1.888.674.3175</a>
									</div>
								</div>
							<?php endif; ?>
						</div>
						<button data-dismiss="modal" class="modal__close-button position-absolute" style="color: #50697B;">
							Close
							<span class="position-absolute" style="background-color: #50697B;"></span>
							<span class="position-absolute" style="background-color: #50697B;"></span>
						</button>
					</div>
				</div>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>
<?php endforeach; ?>

<?php
get_footer();

