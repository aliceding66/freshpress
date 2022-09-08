<?php
/**
 * Template Name: Page - Business Name Generator
 *
 * @package FreshPress\Website
 */

fp_enqueue_template_assets( 'templates-page-businessnamegenerator' );
get_header( '', [ 'no-header' => true ] );
?>
<header class="header-wide hero-background">
	<div class="header-wide__wrapper">
		<div class="header-wide__banner d-none d-md-block">
			<div class="header-wide__phone display-control">
				<a href="<?= esc_url( get_home_url( null, '/contact-us' ) ); ?>"><?= esc_html( __( 'Questions', 'freshpress-website' ) ); ?></a>? <?= esc_html( __( 'Contact our award-winning support team', 'freshpress-website' ) ); ?>&nbsp;<a href="<?= esc_url( get_home_url( null, '/contact' ) ); ?>">1-866-303-6061</a>
			</div>
		</div>
		<div class="header-wide__responsive">
			<a href="<?= esc_url( get_home_url() ); ?>" class="freshbooks-logo">
				<?= fp_render_img(
					'images/logos/freshbooks-logo-white.svg',
					[
						'class' => 'lazy',
						'alt'   => 'FreshBooks logo',
					]
				)?>
			</a>
		</div>
	</div>
</header>
<div class="hero-background">
	<section class="hero">
		<div class="hero__wrapper">
			<div class="hero__bng-start bng-start" id="bng-start">
				<?php wp_nonce_field( 'business_name_generator', 'business_name_generator_nonce' ); ?>
				<h1 class="hero__title"><?= esc_html( __( 'Business Name Generator', 'freshpress-website' ) ); ?></h1>
				<p class="hero__subtitle hero__subtitle_bng-start"><?= esc_html( __( 'Need a business name as snappy as your idea?', 'freshpress-website' ) ); ?></p>
				<button id="get-started" class="button-primary hero__bng-start-button"><?= esc_html( __( "Let's Get Started", 'freshpress-website' ) ); ?></button>
			</div>
			<div class="hero__bng-industry hidden-step" id="bng-industry">
				<h1 class="hero__title"><?= esc_html( __( 'Select Your Industry', 'freshpress-website' ) ); ?></h1>
				<p class="hero__subtitle hero__subtitle_bng-industry"><?= esc_html( __( 'Tell us a little bit about yourself so we can make names tailored to your industry.', 'freshpress-website' ) ); ?></p>
				<div class="hero__vertical-options">
					<div class="hero__four-industry">
						<button href="" class="hero__industry" id="creatives">
							<div class="vertical-icon">
								<span class="vertical-creatives">
									<?php fp_noesc( include_once( get_template_directory() . '/partials/page/businessnamegenerator/icon-creatives.svg.php' ) ); ?>
								</span>
							</div>
							<h2 class="industry-name"><?= fp_noesc( __( 'Creatives &amp;<br>Marketing', 'freshpress-website' ) ); ?></h2>
						</button>
						<button href="" class="hero__industry" id="legal">
							<div class="vertical-icon">
								<span class="vertical-legal">
									<?php fp_noesc( include_once( get_template_directory() . '/partials/page/businessnamegenerator/icon-legal.svg.php' ) ); ?>
								</span>
							</div>
							<h2 class="industry-name"><?= fp_noesc( __( 'Legal Services &amp;<br>Business Consulting', 'freshpress-website' ) ); ?></h2>
						</button>
						<button href="" class="hero__industry" id="trades">
							<div class="vertical-icon">
								<span class="vertical-trades">
									<?php fp_noesc( include_once( get_template_directory() . '/partials/page/businessnamegenerator/icon-trades.svg.php' ) ); ?>
								</span>
							</div>
							<h2 class="industry-name"><?= fp_noesc( __( 'Trades &amp;<br>Home Services', 'freshpress-website' ) ); ?></h2>
						</button>
						<button href="" class="hero__industry" id="it">
							<div class="vertical-icon">
								<span class="vertical-it">
									<?php fp_noesc( include_once( get_template_directory() . '/partials/page/businessnamegenerator/icon-it.svg.php' ) ); ?>
								</span>
							</div>
							<h2 class="industry-name"><?= fp_noesc( __( 'Information<br>Technology', 'freshpress-website' ) ); ?></h2>
						</button>
					</div>
				</div>
			</div>
			<!-- Select your industry - end -->
			<!-- Keyword - start -->
			<div class="hero__bng-keyword hidden-step" id="bng-keyword">
				<h1 class="hero__title"><?= esc_html( __( 'Enter a Key Word', 'freshpress-website' ) ); ?></h1>
				<p class="hero__subtitle"><?= fp_noesc( __( 'What one word do you want to make sure is included in your business name?<br>(Sometimes it helps to simply state what you do or what benefit you give to customers.)', 'freshpress-website' ) ); ?></p>
				<form action="#" class="keyword-form">
					<input type="text" class="form-input keyword-input" placeholder="<?= esc_attr( __( 'Ex: Acme', 'freshpress-website' ) ); ?>">
					<button id="keyword-submit" class="button-primary keyword-submit">
						<span class="button-primary-text"><?= esc_html( __( 'Make Me a Name', 'freshpress-website' ) ); ?></span>
					</button>
				</form>
			</div>
			<!-- Keyword - end -->
			<!-- Options - start -->
			<div class="hero__bng-options hidden-step" id="bng-options">
				<h1 class="hero__title"><?= esc_html( __( 'Kazaam! A Fresh Batch of Names', 'freshpress-website' ) ); ?></h1>
				<p class="hero__subtitle"><?= esc_html( __( 'Now just pick your favorite.', 'freshpress-website' ) ); ?></p>
				<div id="options-container" class="hero__return-options"></div>
				<p class="hero__regenerate-word">
					<a class="hero__paragraph-link" id="see-more" href="">
						<?= esc_html( __( 'Show me more names', 'freshpress-website' ) ); ?>
					</a> <?= esc_html( __( 'or', 'freshpress-website' ) ); ?>
					<a class="hero__paragraph-link" id="select-new-word" href="">
						<?= esc_html( __( 'go back and change key word', 'freshpress-website' ) ); ?>
					</a>
				</p>
			</div>
			<!-- Options - end -->
			<!-- Result - start -->
			<div class="hero__bng-result hidden-step" id="bng-result">
				<p class="hero__subtitle business-name-lead-off"><?= esc_html( __( 'Behold! Your spiffy new business name is...', 'freshpress-website' ) ); ?></p>
				<div class="hero__name-container">
					<div class="lights-top lights-row"></div>
					<div class="center-content">
						<div class="lights-left cell lights-col"></div>
						<div class="business-name-result name cell"></div>
						<div class="lights-right cell lights-col"></div>
					</div>
					<div class="lights-bottom lights-row"></div>
				</div>
				<p class="hero__subtitle hero__subtitle_blog-lead-in"><?= esc_html( __( 'Your business is off to a great start. Keep that momentum going and sign up for a free FreshBooks trial.', 'freshpress-website' ) ); ?></p>
			</div>
			<!-- Result - end -->
		</div>
	</section>
</div>

<div id="starting-small-business" class="starting-small-business">
	<section class="blog">
		<h2 class="blog__heading"><?= esc_html( __( 'Great Reads to Get Your Small Business Started', 'freshpress-website' ) ); ?></h2>
		<div class="blog__row">
			<div class="blog__post d-flex flex-column align-items-center align-items-lg-start">
				<a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/logo-creator-tools', 'freshpress-website' ) ); ?>" target="_blank">
					<?= fp_render_img(
						'images/business-name-generator/blog-logo-creator.jpg',
						[
							'class' => 'blog__image h-auto',
							'alt'   => esc_attr( __( 'Create a Memorable Logo image', 'freshpress-website' ) ),
						]
					) ?>
				</a>
				<h3 class="blog__title"><a class="blog__title-link" href="<?= esc_url( __( 'https://www.freshbooks.com/blog/logo-creator-tools', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Create a Memorable Logo', 'freshpress-website' ) ); ?></a></h3>

				<p class="blog__excerpt"><?= esc_html( __( 'Create a logo that makes the perfect first impression using these handy tools', 'freshpress-website' ) ); ?></p>
				<p class="blog__read-more"><a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/logo-creator-tools', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Read more', 'freshpress-website' ) ); ?></a></p>
			</div>
			<div class="blog__post d-flex flex-column align-items-center align-items-lg-start">
				<a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/business-milestones', 'freshpress-website' ) ); ?>" target="_blank">
					<?= fp_render_img(
						'images/business-name-generator/blog-milestones.jpg',
						[
							'class' => 'blog__image h-auto',
							'alt'   => esc_attr( __( 'Ensure a Bright Future for Your Business image', 'freshpress-website' ) ),
						]
					) ?>
				</a>
				<h3 class="blog__title"><a class="blog__title-link" href="<?= esc_url( __( 'https://www.freshbooks.com/blog/business-milestones', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Ensure a Bright Future for Your Business', 'freshpress-website' ) ); ?></a></h3>

				<p class="blog__excerpt"><?= esc_html( __( 'Achieve these 6 business milestones in your first 5 years and be set up for long term success', 'freshpress-website' ) ); ?></p>
				<p class="blog__read-more"><a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/business-milestones', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Read more', 'freshpress-website' ) ); ?></a></p>
			</div>
			<div class="blog__post d-flex flex-column align-items-center align-items-lg-start">
				<a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/entrepreneurs-biggest-fears', 'freshpress-website' ) ); ?>" target="_blank">
					<?= fp_render_img(
						'images/business-name-generator/blog-fears.jpg',
						[
							'class' => 'blog__image h-auto',
							'alt'   => esc_attr( __( 'Rise Above Your Business Fears image', 'freshpress-website' ) ),
						]
					) ?>
				</a>
				<h3 class="blog__title"><a class="blog__title-link" href="<?= esc_url( __( 'https://www.freshbooks.com/blog/entrepreneurs-biggest-fears', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Rise Above Your Business Fears', 'freshpress-website' ) ); ?></a></h3>

				<p class="blog__excerpt"><?= esc_html( __( 'You got this: Deal with your biggest business worries with these proven strategies', 'freshpress-website' ) ); ?></p>
				<p class="blog__read-more"><a href="<?= esc_url( __( 'https://www.freshbooks.com/blog/entrepreneurs-biggest-fears', 'freshpress-website' ) ); ?>" target="_blank"><?= esc_html( __( 'Read more', 'freshpress-website' ) ); ?></a></p>
			</div>
		</div>
	</section>
</div>

<div class="hero-background">
	<!-- Email Sign-Up - start -->
	<section id="email-sign-up" class="email-signup">
		<h2 class="email-signup__title"><?= esc_html( __( 'Want these handy reads delivered to your inbox?', 'freshpress-website' ) ); ?></h2>
		<p class="email-signup__info"><?= esc_html( __( "Get the inside scoop on all the do's (and don'ts) of starting your own business. We'll only email you once a month and promise never to share your email address with anyone—pinky swear.", 'freshpress-website' ) ); ?></p>
		<div class="email-signup__form">
			<div class="email-signup__form-container">
				<?= fp_render_blocks(
					[
						'name'  => 'pardot-form',
						'attrs' => [
							'data'      => [
								'pardot_form_url'  => 'https://go.pardot.com/l/490351/2018-04-08/2dskpm',
								'pardot_form_name' => 'newsletter-signup',
							],
							'className' => 'trackingSection-pardot-form',
						],
					],
				); ?>
			</div>
		</div>
	</section>
</div>
<footer class="classic-footer">
	<div class="classic-footer__wrapper">
		<p><?= fp_noesc( __( 'FreshBooks, 1655 Dupont St. Suite 250, Toronto, ON M6P 3T1 Canada<br>Copyright © 2000-2020 FreshBooks is a service of 2ndSite Inc. All rights reserved.', 'freshpress-website' ) ); ?></p>
	</div>
</footer>
<?php
get_footer( '', [ 'no-footer' => true ] );
