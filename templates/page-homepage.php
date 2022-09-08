<?php
/**
 * Template Name: Homepage
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-homepage' );
$campaign = fp_init_campaign();
$start_date = ! empty( $campaign['start_date'] ) ? strtotime( $campaign['start_date'] ) : '';
$end_date = $campaign['end_date'] ?? '';
$current_time = time();
$is_campaign_active = $start_date < $current_time && $end_date > $current_time;

$close_video = __( 'Close video', 'freshpress-website' );

get_header();

?>
<div class="hero position-relative text-center row">
	<div class="hero__content mx-auto pt-5 px-4 p-md-5">
		<div class="hero__rating1 d-none d-md-flex align-items-center justify-content-center">
			<span class="hero__rating1-text">Excellent</span>
			<?= fp_render_img(
				'images/rating/yellow.svg',
				[
					'class' => 'hero__rating1-stars',
					'alt'   => __( 'Star Rating', 'freshpress-website' ),
				]
			) ?>
			<span class="hero__rating1-getapp">(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/">1,954 GetApp reviews</a>)</span>
		</div>
		<h1 class="hero__heading text-white px-0 px-sm-3">Accounting Software Built for Business Owners, Their Clients and Accountants</h1>
		<div class="hero__rating2 d-flex align-items-center flex-wrap justify-content-center d-md-none">
			<span class="hero__rating2-score"><?= esc_html( __( 'Excellent', 'freshpress-website' ) ); ?></span>
			<?= fp_render_img(
				'images/rating/white-yellow.svg',
				[
					'class' => 'hero__rating2-stars',
					'alt'   => __( 'Star Rating', 'freshpress-website' ),
				]
			) ?>
			<span class="hero__rating2-getapp">(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/">1,954 GetApp reviews</a>)</span>
		</div>
		<form method="post" class="hero__signup-form needs-validation with-arrows position-relative" data-form-handler="handleSignup" data-action="https://<?= esc_attr( fp_get_fb_domain( 'api' ) ) ?>/auth/api/v1/smux/registrations" novalidate>
			<div class="form-group hero__signup-form-group px-2 px-md-4 hero__signup-form-email position-relative">
				<label class="sr-only" for="signup_email">Enter Your Email</label>
				<input
						required
						type="email"
						name="email"
						class="form-control shadow-none"
						id="signup_email"
						placeholder="Enter Your Email"
				/>
				<div class="invalid-tooltip py-2 px-3">
					<?= esc_html( __( 'Email is invalid.', 'freshpress-website' ) ); ?>
				</div>
			</div>
			<div class="expandable px-2 px-md-4">
				<div class="form-group hero__signup-form-group hero__signup-form-password position-relative">
					<label class="sr-only" for="signup_password">Create a Password (min 8 characters)</label>
					<input
							required
							minlength="8"
							type="password"
							name="password"
							class="form-control shadow-none"
							id="signup_password"
							placeholder="Create a Password (min 8 characters)"
					/>
					<div class="invalid-tooltip py-2 px-3">
						<?= esc_html( __( 'Password is invalid.', 'freshpress-website' ) ); ?>
					</div>
				</div>
				<div class="hero__signup-form__terms text-left position-relative pb-3">
					<label for="tos-accepted" class="d-flex align-items-start">
						<input
								required
								type="checkbox"
								id="tos-accepted"
								name="tos-accepted"
								class="form-control-checkbox"
						/>
						<div class="invalid-tooltip invalid-checkbox-tooltip py-2 px-3">
							<?= esc_html( __( 'This field is required.', 'freshpress-website' ) ); ?>
						</div>
						<div><?= fp_noesc( FP_Site_Options::get_option( 'default_terms_of_service' ) ); ?></div>
					</label>
				</div>
			</div>
			<div class="form-group hero__signup-form-group hero__signup-form-btn mb-2 pb-0 px-2 px-md-4">
				<button type="submit" name="submit" class="btn btn-cta-green btn-block btn-lg">Try It Free</button>
			</div>

			<p class="hero__signup-form__btn-text text-center mb-4 mb-md-5 px-2 px-md-4">Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
			<div class="expandable sso expanded mb-5 mb-md-0 px-2 px-md-4">
				<div class="hero__signup-form__sso d-flex flex-wrap">
					<a
							href="#"
							data-href="https://<?= fp_noesc( fp_get_fb_domain( 'auth' ) ) ?>/service/auth/auth/apple?intent=sign_up"
							class="sso-signup_apple btn btn-outline-grey bg-white hero__signup-form__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-2"
					>
						<?= fp_render_img(
							'images/logos/apple-logo.svg',
							[
								'class' => 'position-absolute',
								'alt'   => __(
									'Apple Logo',
									'freshpress-website'
								),
							]
						) ?><?= esc_html( __( 'Sign up with Apple', 'freshpress-website' ) ); ?>
					</a>

					<!-- Google SSO -->
					<a
							href="#"
							data-href="https://<?= fp_noesc( fp_get_fb_domain( 'auth' ) ) ?>/service/auth/auth/google_oauth2_central_sso?intent=sign_up"
							class="sso-signup_google btn btn-outline-grey bg-white hero__signup-form__ghost-btn d-flex align-items-center position-relative justify-content-center w-100 mb-3"
					>
						<?= fp_render_img(
							'images/logos/google-logo-icon.svg',
							[
								'class' => 'position-absolute',
								'alt'   => __(
									'Google Logo',
									'freshpress-website'
								),
							]
						) ?><?= esc_html( __( 'Sign up with Google', 'freshpress-website' ) ); ?>
					</a>
				</div>
				<div class="hero__signup-form__terms sso text-left position-relative pb-2 pb-3">
					<label for="tos-accepted-sso" class="d-flex align-items-start checkbox-sso">
						<input
								required
								type="checkbox"
								id="tos-accepted-sso"
								name="tos-accepted-sso"
								class="form-control-checkbox checkbox-sso"
						/>
						<div class="invalid-tooltip invalid-checkbox-tooltip py-2 px-3">
							<?= esc_html( __( 'This field is required.', 'freshpress-website' ) ); ?>
						</div>
						<div><?= fp_noesc( FP_Site_Options::get_option( 'default_terms_of_service' ) ); ?></div>
					</label>
				</div>
			</div>
			<span id="close-form" class="close-form position-absolute text-uppercase"><?= esc_html( __( 'Close', 'freshpress-website' ) ); ?></span>
		</form>
	</div>

	<div class="reversed-corner reversed-corner_down-right reversed-corner_light-blue d-none d-lg-block"><div></div></div>
</div>

<div class="hero promo-hero position-relative text-center row d-none" data-is-active-campaign="<?= esc_attr( $is_campaign_active ? 'true' : 'false' ); ?>">
	<div class="hero__content mx-auto pt-5 px-4 p-md-5">
		<?= fp_render_img(
			'images/homepage/hero-label-notext.svg',
			[
				'class' => 'hero__label',
				'alt'   => __(
					'End of Year Sale',
					'freshpress-website'
				),
			]
		) ?>
		<h1 class="hero__heading text-white px-0 px-sm-3">Accounting Software Built for Business Owners, Their Clients and Accountants</h1>
		<h2 class="hero__subheading">Now 60% Off for 6 Months</h2>
		<a class="hero__cta btn btn-cta-green" href="/pricing">BUY NOW & SAVE</a>
		<div class="hero__rating1 align-items-center justify-content-center d-none">
			<span class="hero__rating1-text">Excellent</span>
			<?= fp_render_img(
				'images/rating/yellow.svg',
				[
					'class' => 'hero__rating1-stars',
					'alt'   => __( 'Star Rating', 'freshpress-website' ),
				]
			) ?>
			<span class="hero__rating1-getapp">(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/">1,954 GetApp reviews</a>)</span>
		</div>
		<div class="hero__rating2 d-flex align-items-center flex-wrap justify-content-center">
			<span class="hero__rating2-score"><?= esc_html( __( 'Excellent', 'freshpress-website' ) ); ?></span>
			<?= fp_render_img(
				'images/rating/white-yellow.svg',
				[
					'class' => 'hero__rating2-stars',
					'alt'   => __( 'Star Rating', 'freshpress-website' ),
				]
			) ?>
			<span class="hero__rating2-getapp">(Based on <a href="https://www.getapp.com/finance-accounting-software/a/freshbooks/">1,954 GetApp reviews</a>)</span>
		</div>
	</div>

	<div class="reversed-corner reversed-corner_down-right reversed-corner_light-blue d-none d-lg-block"><div></div></div>
</div>

<!-- product-tour -->
<div class="fp-block product-tour trackingSection-product-tour pb-5 pb-xl-0 position-relative mt-0 pt-6 pt-md-8" data-mobile-carousel="true">
	<div class="reversed-corner reversed-corner_down reversed-corner_white d-none d-lg-block"><div></div></div>

	<h2 class="mb-4 pb-2 mb-md-4 section-heading section-heading_first text-center">Accounting Solutions and Features</h2>

	<div class="product-tour__nav-container d-none d-lg-flex justify-content-between mb-5 mb-xl-0 mx-auto">
		<a class="product-tour__nav-link text-decoration-none product-tour__nav-link_active" data-id="invoicing" title="Invoicing">Invoicing</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="expenses" title="Expenses">Expenses</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="time-tracking" title="Time Tracking">Time Tracking</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="projects" title="Projects">Projects</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="payments" title="Payments">Payments</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="reporting" title="Reporting">Reporting</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="accounting" title="Accounting">Accounting</a>
		<a class="product-tour__nav-link text-decoration-none " data-id="mobile-" title="Mobile ">Mobile </a>
	</div>

	<!-- Swiper container -->
	<div class="product-tour__swiper-container swiper-container">
		<div class="product-tour__content-container d-flex swiper-wrapper">
			<a class="product-tour__item-nav-link product-tour__item-nav-link_previous" href="#" title="Previous"></a>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row product-tour__item_active swiper-slide" data-id="invoicing">
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0">
					<h2 class="product-tour__item-title mb-2">Professional Invoicing</h2>
					<div class="product-tour__item-description mb-4">Impress clients with professional Invoices that clearly show the work you’ve done and what it costs...then, just click send. Oh, and use automated payment reminders to nudge clients for payment.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/invoice/" target="" title="Learn More about Invoicing ">Learn more about Invoicing</a><br><br>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Invoicing-mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block d-lg-none',
							'alt'   => 'Mobile',
						]
					) ?>
					<?= fp_render_img(
						'images/homepage/Carousel-Invoicing.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-none d-lg-inline-block',
							'alt'   => 'Desktop',
						]
					) ?>
					<lite-youtube id="video0" videoid="DaJIMwkp_Lg" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="expenses">
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Never Miss an Expense</h2>
					<div class="product-tour__item-description mb-4">FreshBooks lets you snap receipt photos, forward email receipts to your account, and import expenses from your bank account. Then organize and assign them to clients. Tracking every dollar keeps you ready for tax time.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/expenses-and-receipts-tracking/" target="" title="Learn More about Expenses">Learn more about Expenses</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Expense-mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block d-lg-none',
							'alt'   => 'Mobile',
						]
					) ?>
					<?= fp_render_img(
						'images/homepage/Carousel-Expense.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-none d-lg-inline-block',
							'alt'   => 'Desktop',
						]
					) ?>
					<lite-youtube id="video1" videoid="FuXHnFVpLv4" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="time-tracking" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2">Track Time to the Minute</h2>
					<div class="product-tour__item-description mb-4">You (and your team) work on lots of projects at once, and missing billable time can be costly. Time Tracking in FreshBooks makes it easy for teams to log time and automatically add it to invoices, so all time is accounted for.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/timesheets-and-time-tracking" target="" title="Learn More about Time Tracking" >Learn more about Time Tracking</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-TimeTracking-mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block d-lg-none',
							'alt'   => 'Mobile',
						]
					) ?>
					<?= fp_render_img(
						'images/homepage/Carousel-TimeTracking.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-none d-lg-inline-block',
							'alt'   => 'Desktop',
						]
					) ?>
					<lite-youtube id="video2" videoid="<lite-youtube id="video1" videoid="FuXHnFVpLv4" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="projects" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Everyone on the Same Page</h2>
					<div class="product-tour__item-description mb-4" >With a business to run and projects to manage, it’s tough to keep everyone synced up and on schedule. Projects in FreshBooks make it easy for your clients, team, and contractors to collaborate, and share files and updates...all in one place.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/projects-and-collaboration/" target="" title="Learn More about Projects" >Learn more about Projects</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Projects.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block',
							'alt'   => 'Mobile',
						]
					) ?>
					<lite-youtube id="video3" videoid="ffIx00KedCI" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="payments" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Fast & Easy, for You and Your Clients</h2>
					<div class="product-tour__item-description mb-4" >With automated online payment options, FreshBooks lets your clients pay their preferred way. Try automated recurring payments for even faster billing. When it’s this easy to pay invoices, you get paid twice as fast.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/accept-payments/" target="" title="Learn More about Payments" >Learn more about Payments</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Payments-mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block d-lg-none',
							'alt'   => 'Mobile',
						]
					) ?>
					<?= fp_render_img(
						'images/homepage/Carousel-Payments.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-none d-lg-inline-block',
							'alt'   => 'Desktop',
						]
					) ?>
					<lite-youtube id="video4" videoid="YwUfLcY0x6U" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="reporting" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Know Your Business Better</h2>
					<div class="product-tour__item-description mb-4" >FreshBooks tracks every dollar in and out of your business so you can run reports to easily see how your business is doing. And at tax time, do it yourself or just give your accountant access to quickly find what they need.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/financial-reporting/" target="" title="Learn More about Reporting" >Learn more about Reporting</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Reports-mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block d-lg-none',
							'alt'   => 'Mobile',
						]
					) ?>
					<?= fp_render_img(
						'images/homepage/Carousel-Reports.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-none d-lg-inline-block',
							'alt'   => 'Desktop',
						]
					) ?>
					<lite-youtube id="video5" videoid="IAw8sFQNcus" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="accounting" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Keep Tabs on Your Business Health</h2>
					<div class="product-tour__item-description mb-4" >Simple or complex, your finances tell you how your business is doing. FreshBooks’ easy-to-use Double-Entry Accounting tools and reports show profitability, how healthy your cash flow is, and details your spending.</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/accounting/" target="" title="Learn More about Accounting" >Learn more about Accounting</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Accounting.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block',
							'alt'   => 'Mobile',
						]
					) ?>
					<lite-youtube id="video6" videoid="FuXHnFVpLv4" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<div class="product-tour__item position-relative justify-content-between align-items-start flex-column flex-lg-row  swiper-slide" data-id="mobile-" >
				<div class="product-tour__item-text mx-auto mx-lg-0 text-center text-lg-left pb-4 pb-lg-0" >
					<h2 class="product-tour__item-title mb-2" >Take FreshBooks With You...Everywhere</h2>
					<div class="product-tour__item-description mb-4" >Stay connected to your clients and team, even on the go. Send invoices, track expenses, and check on projects all with the FreshBooks mobile app. Oh, and if you drive a lot for your business, check out <a href="https://www.freshbooks.com/mileage-tracking-app">Mileage Tracker</a>. .</div>
					<div class="product-tour__buttons mx-auto ml-lg-0">
						<div class="product-tour__watch">
							Watch Video
						</div>
						<a class="product-tour__item-cta py-2 d-inline-block" href="/mobile-apps/" target="" title="Learn More about Mobile" >Learn more about the Mobile App</a>
					</div>
					<div class="product-tour__try-it-free mx-auto ml-lg-0">
						<a class="py-2 px-3 btn btn-cta-green cta__button" href="/signup">TRY IT FREE</a>
						<p>Try It Free for 30 Days. No credit card required. Cancel anytime.</p>
					</div>
				</div>
				<div class="product-tour__item-image-container position-relative mx-auto text-center" >
					<?= fp_render_img(
						'images/homepage/Carousel-Mobile.png',
						[
							'class' => 'product-tour__item-image skip-lazy w-auto h-auto d-inline-block',
							'alt'   => 'Mobile',
						]
					) ?>
					<lite-youtube id="video6" videoid="hUqzcHfqy6M" params="enablejsapi=1" class="product-tour__item-video"></lite-youtube>
					<div class="product-tour__item-close-video"><?= esc_html( $close_video ); ?></div>
				</div>
			</div>
			<a class="product-tour__item-nav-link product-tour__item-nav-link_active product-tour__item-nav-link_next" href="#" title="Next" ></a>
		</div>

	</div>
	<div class="product-tour__swiper-pagination swiper-pagination d-lg-none d-flex justify-content-center" ></div>
	<div class="product-tour__swiper-button product-tour__swiper-button--prev swiper-button-prev d-lg-none" ></div>
	<div class="product-tour__swiper-button product-tour__swiper-button--next swiper-button-next d-lg-none" ></div>
</div>
<h2 class="mb-4 mb-md-5 section-heading section-heading_main text-center">Invoicing and Accounting Tools Built For Any Sized Business</h2>

<div class="clickable-blocks d-flex flex-wrap flex-lg-nowrap justify-content-center mb-5">
	<a class="clickable-blocks__item mr-2 mr-sm-3 mb-2 mb-md-3 mb-lg-0" href="/for-freelancers">
		<div class="clickable-blocks__item-image d-none d-md-block" style="background-image: url('<?= fp_get_asset( 'images/homepage/segment-freelancers-home.jpg' ) ?>')"></div>
		<div class="clickable-blocks__item-content p-3 p-sm-4 d-flex flex-column text-md-center">
			<h5 class="clickable-blocks__item-heading">For Freelancers</h5>
			<p class="clickable-blocks__item-description d-none d-md-block">Keep your books in check, your clients happy, and deliver the work you love doing.</p>
			<span class="clickable-blocks__item-button btn btn-white d-none d-md-inline-block">Learn More</span>
		</div>
	</a>
	<a class="clickable-blocks__item mr-lg-3 mb-2 mb-md-3 mb-lg-0" href="/self-employed-professionals">
		<div class="clickable-blocks__item-image d-none d-md-block" style="background-image: url('<?= fp_get_asset( 'images/homepage/segment-self-home.jpg' ) ?>')"></div>
		<div class="clickable-blocks__item-content p-3 p-sm-4 d-flex flex-column text-md-center">
			<h5 class="clickable-blocks__item-heading">For Self-Employed Professionals</h5>
			<p class="clickable-blocks__item-description d-none d-md-block">Get more time for your business and clients, and even a little extra to plan for the future.</p>
			<span class="clickable-blocks__item-button btn btn-white d-none d-md-inline-block">Learn More</span>
		</div>
	</a>
	<a class="clickable-blocks__item mr-2 mr-sm-3" href="/businesses-with-contractors">
		<div class="clickable-blocks__item-image d-none d-md-block" style="background-image: url('<?= fp_get_asset( 'images/homepage/segment-contractors-home.jpg' ) ?>')"></div>
		<div class="clickable-blocks__item-content p-3 p-sm-4 d-flex flex-column text-md-center">
			<h5 class="clickable-blocks__item-heading">For Businesses With Contractors</h5>
			<p class="clickable-blocks__item-description d-none d-md-block">Work better with your partners by staying organized and always knowing where you stand.</p>
			<span class="clickable-blocks__item-button btn btn-white d-none d-md-inline-block">Learn More</span>
		</div>
	</a>
	<a class="clickable-blocks__item" href="/businesses-with-employees">
		<div class="clickable-blocks__item-image d-none d-md-block" style="background-image: url('<?= fp_get_asset( 'images/homepage/segment-employees-home.jpg' ) ?>')"></div>
		<div class="clickable-blocks__item-content p-3 p-sm-4 d-flex flex-column text-md-center">
			<h5 class="clickable-blocks__item-heading">For Businesses With Employees</h5>
			<p class="clickable-blocks__item-description d-none d-md-block">Empower your staff to help grow your business and build lasting client relationships.</p>
			<span class="clickable-blocks__item-button btn btn-white d-none d-md-inline-block">Learn More</span>
		</div>
	</a>
</div>

<h2 class="mb-4 section-heading section-heading_main text-center">Why 30+ Million People Have Used FreshBooks</h2>

<div class="testimonial-blocks overflow-hidden position-relative row flex-column">
	<div class="testimonial-blocks__container swiper-container" data-swiper-breakpoint="480">
		<div class="testimonial-blocks__wrapper swiper-wrapper justify-content-md-center">
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<?= fp_render_img(
					'images/homepage/test-victoria-adams@2x.jpg',
					[
						'class' => 'testimonial-blocks__item-image h-auto',
						'alt'   => 'Image of Victoria Adams',
					]
				) ?>
				<p class="testimonial-blocks__item-description">"We had a record year this past year. Could we have done it without FreshBooks? I don’t know how we would have."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Victoria Adams</span>
				<span class="testimonial-blocks__item-position text-uppercase">Principal / Creative Director - Excentric Agency</span>
			</div>
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<?= fp_render_img(
					'images/homepage/test-graham-pugh@2x.jpg',
					[
						'class' => 'testimonial-blocks__item-image h-auto',
						'alt'   => 'Image of Victoria Adams',
					]
				) ?>
				<p class="testimonial-blocks__item-description">"I found FreshBooks to be so intuitive. I was easily able to do time tracking, expense tracking, and invoice customers."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Graham Pugh</span>
				<span class="testimonial-blocks__item-position text-uppercase">Co-Founder, Propel Clean Energy Partners</span>
			</div>
			<div class="testimonial-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<?= fp_render_img(
					'images/homepage/test-carolina-ramirez@2x.jpg',
					[
						'class' => 'testimonial-blocks__item-image h-auto',
						'alt'   => 'Image of Victoria Adams',
					]
				) ?>
				<p class="testimonial-blocks__item-description">"The competitive pricing of FreshBooks and the user interface, it’s just very user-friendly. For someone in branding and marketing PR, that’s important."</p>
				<div class="testimonial-blocks__item-separator"></div>
				<span class="testimonial-blocks__item-name text-uppercase">Carolina Ramirez Herrera</span>
				<span class="testimonial-blocks__item-position text-uppercase">Owner, CRH Collective</span>
			</div>
		</div>
	</div>
	<div class="testimonial-blocks__pagination swiper-pagination d-flex justify-content-center d-md-none"></div>
</div>

<hr class="wp-block-separator has-text-color has-background mb-4 d-none d-md-block" style="background-color:#e5e9eb;color:#e5e9eb">

<div class="rating-blocks overflow-hidden position-relative row flex-column">
	<div class="rating-blocks__container swiper-container" data-swiper-breakpoint="480">
		<div class="rating-blocks__wrapper swiper-wrapper justify-content-md-center">
			<div class="rating-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<div class="rating-blocks__item-rating">
					<span class="rating-blocks__item-score"><?= esc_html( __( '4.5 Excellent', 'freshpress-website' ) ); ?></span>
					<?= fp_render_img(
						'images/rating/white-yellow.svg',
						[
							'class' => 'rating-blocks__item-stars',
							'alt'   => __( 'Star Rating', 'freshpress-website' ),
						]
					) ?>
				</div>
				<a class="rating-blocks__item-link" rel="noopener noreferrer" target="_blank" href="<?= esc_attr( __( 'https://www.pcmag.com/reviews/freshbooks', 'freshpress-website' ) ); ?>">(<?= esc_html( __( 'Read more from PCMag.com', 'freshpress-website' ) ); ?>)</a>
				<p class="rating-blocks__item-description mb-5">"FreshBooks offers a well-rounded, intuitive, and attractive double-entry accounting experience. It anticipates the needs of freelancers and small businesses well—better than competitors in this class."</p>
				<?= fp_render_img(
					'images/homepage/logo-pc-mag.png',
					[
						'class' => 'rating-blocks__item-image h-auto',
						'alt'   => 'PCMAG Image',
					]
				) ?>
			</div>
			<div class="rating-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<div class="rating-blocks__item-rating">
					<span class="rating-blocks__item-score"><?= esc_html( __( '4.4 Excellent', 'freshpress-website' ) ); ?></span>
					<?= fp_render_img(
						'images/rating/white-yellow.svg',
						[
							'class' => 'rating-blocks__item-stars',
							'alt'   => __( 'Star Rating', 'freshpress-website' ),
						]
					) ?>
				</div>
				<a class="rating-blocks__item-link" rel="noopener noreferrer" target="_blank" href="<?= esc_attr( __( 'https://www.capterra.ca/software/142390/freshbooks ', 'freshpress-website' ) ); ?>">(<?= esc_html( __( 'Read more from Capterra', 'freshpress-website' ) ); ?>)</a>
				<p class="rating-blocks__item-description mb-5">"FreshBooks automates daily accounting activities namely invoice creation, payment acceptance, expenses tracking, billable time tracking, and financial reporting."</p>
				<?= fp_render_img(
					'images/homepage/logo-capterra.png',
					[
						'class' => 'rating-blocks__item-image h-auto',
						'alt'   => 'Capterra Image',
					]
				) ?>
			</div>
			<div class="rating-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<div class="rating-blocks__item-rating d-flex">
					<span class="rating-blocks__item-score"><?= esc_html( __( '4.5 Excellent', 'freshpress-website' ) ); ?></span>
					<?= fp_render_img(
						'images/rating/white-yellow.svg',
						[
							'class' => 'rating-blocks__item-stars',
							'alt'   => __( 'Star Rating', 'freshpress-website' ),
						]
					) ?>
				</div>
				<a class="rating-blocks__item-link" rel="noopener noreferrer" target="_blank" href="https://www.g2.com/products/freshbooks/reviews">(<?= esc_html( __( 'Read more from G2', 'freshpress-website' ) ); ?>)</a>
				<p class="rating-blocks__item-description mb-5">"FreshBooks is an online accounting and invoicing service that saves you time and makes you look professional - Fortune 500 professional."</p>
				<?= fp_render_img(
					'images/homepage/logo-g2.png',
					[
						'class' => 'rating-blocks__item-image h-auto',
						'alt'   => 'G2 Image',
					]
				) ?>
			</div>
			<div class="rating-blocks__item swiper-slide d-flex flex-column align-items-center text-center py-4 px-3">
				<div class="rating-blocks__item-rating">
					<span class="rating-blocks__item-score"><?= esc_html( __( '4.47 Excellent', 'freshpress-website' ) ); ?></span>
					<?= fp_render_img(
						'images/rating/white-yellow.svg',
						[
							'class' => 'rating-blocks__item-stars',
							'alt'   => __( 'Star Rating', 'freshpress-website' ),
						]
					) ?>
				</div>
				<a class="rating-blocks__item-link" rel="noopener noreferrer" target="_blank" href="<?= esc_attr( __( 'https://www.softwareadvice.com/accounting/freshbooks-profile/', 'freshpress-website' ) ); ?>">(<?= esc_html( __( 'Read more from Software Advice', 'freshpress-website' ) ); ?>)</a>
				<p class="rating-blocks__item-description mb-5">"FreshBooks takes billing out of your hands and puts it on autopilot. Set up automated invoicing, online payment options, and late payment reminders to get paid 2x faster."</p>
				<?= fp_render_img(
					'images/homepage/logo-software-advise.png',
					[
						'class' => 'rating-blocks__item-image h-auto',
						'alt'   => 'Software Advice Image',
					]
				) ?>
			</div>
		</div>
	</div>
	<div class="rating-blocks__pagination swiper-pagination d-flex justify-content-center d-md-none"></div>
</div>

<?php get_template_part( 'partials/content' ); ?>

<?php
get_footer();

