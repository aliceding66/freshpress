<?php
/**
 * Roi Calculator block template.
 *
 * @package FreshPress\Website
 */

$class_name = 'roi-calculator';

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$block_title = get_field( 'title' );
$calculation_explanation_prompt = get_field( 'calculation_explanation_prompt' );
$calculation_explanation = get_field( 'calculation_explanation' );
$form_title = get_field( 'form_title' );
$form_subtitle = get_field( 'form_subtitle' );
$form_button_text = get_field( 'form_button_text' );

$info_icon = fp_render_img(
	'images/icons/icon-info-circle-filled.svg',
	[
		'class' => 'info-tooltip__icon h-auto',
		'alt'   => __( 'Info Tooltip', 'freshpress-website' ),
	]
)

?>

<div <?= fp_get_block_id( $block, true ); ?> class="roi-calculator container-fluid my-5 <?= esc_attr( $class_name ) ?>" data-nonce="<?= esc_attr( wp_create_nonce( 'nonce' ) ) ?>" data-nonce-admin="<?= esc_attr( wp_create_nonce( 'wp_rest' ) ) ?>">
	<div class="row h-100">
		<div class="col-md-12 col-lg-4 roi-calculator__left-column">
			<div class="p-2 p-md-4">
				<?php
				if ( $block_title ) {
					echo '<h2>' . esc_html( $block_title ) . '</h2>';
				}
				?>
				<div class="roi-calculator__left-column__inputs">
					<div class="roi-calculator__left-column__input">
						<label for="software">Current Accounting Software</label>
						<select id="software" class="roi-calculator__select">
							<option value="" selected="selected" hidden="hidden">Choose Software...</option>
							<option value="QBO">Quickbooks</option>
							<option value="Xero">Xero</option>
							<option value="Wave">Wave</option>
							<option value="Sage">Sage</option>
							<option value="Excel">Excel</option>
							<option value="Pen and Paper">Pen and Paper</option>
							<option value="Others">Others</option>
						</select>
					</div>
					<div class="roi-calculator__left-column__input">
						<label for="industry">Industry</label>
						<select id="industry" class="roi-calculator__select">
							<option value="" selected="selected" hidden="hidden">Choose Industry...</option>
							<option value="Creative">Creative</option>
							<option value="IT">IT</option>
							<option value="Trades">Trades</option>
							<option value="Legal">Legal</option>
							<option value="Marketing">Marketing</option>
							<option value="Construction">Construction</option>
							<option value="Consulting">Consulting</option>
							<option value="Others">Others</option>
						</select>
					</div>
					<div class="roi-calculator__left-column__input">
						<label for="team_member">Number of client facing team members (incl. you)</label>
						<input type="number" inputmode="numeric" id="staff_count" placeholder="0" min="0" max="1000000" />
					</div>
					<div class="roi-calculator__left-column__input">
						<label for="cost_hour">Hourly rate of your team (incl. you)</label>
						<input type="number" inputmode="numeric" id="cost_hour" placeholder="0" min="0" max="100000" />
					</div>
					<div class="roi-calculator__left-column__input">
						<label for="client_count">Number of Clients</label>
						<input type="number" inputmode="numeric" id="client_count" placeholder="0" min="0" max="1000000" />
					</div>
					<div class="roi-calculator__left-column__input">
						<label for="transactional_value">Average transactional value/client/year</label>
						<input type="number" inputmode="numeric" id="average_revenue" placeholder="0" min="0" max="1000000000" />
					</div>
					<div class="my-3 d-block d-md-none">
						<button class="roi-calculator__submit-btn" disabled id="mobile-report-btn">Get The Report</button>
					</div>
					<div class="roi-calculator__left-column__footer d-flex flex-column justify-content-center align-items-center">
						<button id="roi-calculator-reset">
							<svg class="mr-1" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.89126 14C7.08176 14 5.38049 13.3053 4.10128 12.0431C2.7829 10.7422 2.07857 9.01272 2.11882 7.17327C2.12317 6.98819 2.28906 6.85301 2.46636 6.8455C2.65346 6.84926 2.80248 7.00268 2.79868 7.18775C2.76224 8.84267 3.39586 10.3989 4.58207 11.5689C5.73293 12.704 7.26341 13.3295 8.89126 13.3295C10.5191 13.3295 12.0496 12.704 13.2004 11.5689C13.3332 11.438 13.5485 11.438 13.6812 11.5689C13.8139 11.6997 13.8139 11.9122 13.6812 12.0431C12.402 13.3053 10.7008 14 8.89126 14Z" fill="white" />
								<path d="M0.339545 10.2139C0.282437 10.2139 0.224785 10.2 0.171485 10.1699C0.00831997 10.0782 -0.0482439 9.87326 0.0447601 9.71233L2.15775 6.05864C2.2154 5.95886 2.32091 5.89502 2.43676 5.88966C2.55369 5.88 2.6641 5.9374 2.731 6.03181L5.18826 9.46986C5.2965 9.62113 5.25951 9.83034 5.10614 9.93709C4.95276 10.0433 4.74065 10.0074 4.63296 9.85609L2.48353 6.84881L0.634873 10.0449C0.572327 10.1533 0.457567 10.2139 0.339545 10.2139Z" fill="white" />
								<path d="M15.5413 7.1543H15.5337C15.3461 7.15001 15.197 6.99712 15.2014 6.81151C15.2373 5.15713 14.6042 3.60092 13.4174 2.43094C12.2666 1.29584 10.7361 0.67035 9.10826 0.67035C7.48042 0.67035 5.94993 1.29584 4.79907 2.43094C4.66637 2.56184 4.45099 2.56184 4.31828 2.43094C4.18557 2.30005 4.18557 2.08762 4.31828 1.95673C5.59749 0.69449 7.29876 -0.000199795 9.10826 -0.000199795C10.9178 -0.000199795 12.619 0.69449 13.8982 1.95673C15.2172 3.2576 15.9215 4.98708 15.8812 6.82653C15.8769 7.00892 15.7257 7.1543 15.5413 7.1543Z" fill="white" />
								<path d="M15.5473 8.11053C15.4369 8.11053 15.333 8.05796 15.2693 7.96838L12.8121 4.5298C12.7038 4.37852 12.7408 4.16931 12.8942 4.0631C13.047 3.95635 13.2592 3.99229 13.3679 4.14356L15.5168 7.15084L17.3649 3.95474C17.4579 3.7938 17.6652 3.73801 17.8289 3.82975C17.992 3.92148 18.0486 4.1264 17.9556 4.28733L15.8426 7.94156C15.7849 8.04133 15.68 8.10463 15.5636 8.11053C15.5581 8.11053 15.5527 8.11053 15.5473 8.11053Z" fill="white" />
							</svg>
							<span>Reset</span>
						</button>
						<?php
						if ( $calculation_explanation_prompt && $calculation_explanation ) {
							?>
							<div class="roi-calculator__tooltip" data-toggle="tooltip" data-placement="top" title="<?= esc_html( $calculation_explanation ) ?>"><?= esc_html( $calculation_explanation_prompt ) ?></div>
							<?php
						}
						?>
					</div>
				</div>
			</div>
		</div>
		<div class="d-none d-md-flex col-md-12 col-lg-8 h-100 roi-calculator__right-column">
			<div class="py-4 p-md-5 flex-wrap w-100">
				<div class="roi-calculator__right-column__card p-1 pt-md-4 pb-md-4 d-none d-md-flex">
					<?= fp_inline_asset( 'images/roi-calculator/roi_icon.svg' ) ?>
					<div class="roi-calculator__right-column__card-info w-50 pl-4 d-flex flex-column">
						<span class="roi-calculator__value" id="yearly-roi"></span>
						<span class="roi-calculator__type roi-calculator__type--large"><span>Your yearly ROI with a </span><span>Freshbooks subscription<span></span>
					</div>
				</div>
				<div class="d-md-none d-flex justify-content-end">
					<button class="btn btn-link" id="close-mobile-report-btn">
						<?= fp_inline_asset( 'images/roi-calculator/close-button.svg' ) ?>
					</button>
				</div>
				<h2 class="d-block d-md-none text-center roi-calculator__right-column__title ">ROI Results</h2>
				<div class="roi-calculator__right-column__card  p-1 pt-md-4 pb-md-4">
					<div class="row justify-content-around w-100">
						<div class="col-6 col-md-auto mt-3 text-center d-flex d-md-none">
							<div class="d-block w-100 text-center text-md-left">
								<div class="d-none ">
									<?= fp_inline_asset( 'images/roi-calculator/roi_icon.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<div class="roi-calculator__type text-center text-md-left">
										<span class="roi-calculator__value" id="yearly-roi-mobile"></span>
										<span class="roi-calculator__type"> Return on Investment
											<span class="roi-calculator__tooltip d-none" data-toggle="tooltip" data-placement="top" title="Loading...">
												<?= fp_noesc( $info_icon ) ?>
											</span>
											<span>
									</div>
								</div>
							</div>
						</div>

						<div class="col-6 col-md-auto  mt-3 text-center" id="time-saved-col">
							<div class="d-block w-100  text-center text-md-left">
								<div class="d-none d-md-inline-block roi-calculator__right-column__card-image">
									<?= fp_inline_asset( 'images/roi-calculator/clock.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<span class="roi-calculator__value" id="hours-month"></span>
									<div class="roi-calculator__type">
										<span> Hours / </span>
										<span>Month
											<span class="roi-calculator__tooltip d-none">
												<?= fp_noesc( $info_icon ) ?>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-auto  mt-3 text-center " id="payment-speed-col">
							<div class="d-block w-100  text-center text-md-left">
								<div class="d-none d-md-inline-block roi-calculator__right-column__card-image">
									<?= fp_inline_asset( 'images/roi-calculator/cash.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<div class="roi-calculator__type  one-word-per-line">
										<span class="roi-calculator__value" id="faster-payments"></span>
										<span>
											<span>Faster </span>
											<span>Payments
												<span class="roi-calculator__tooltip d-none" data-toggle="tooltip" data-placement="top" title="Loading...">
													<?= fp_noesc( $info_icon ) ?>
												</span>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-auto d-none mt-3 text-center " id="more-clients-col">
							<div class="d-block w-100  text-center text-md-left">
								<div class="d-none d-md-inline-block roi-calculator__right-column__card-image">
									<?= fp_inline_asset( 'images/roi-calculator/clients.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<div class="roi-calculator__type  one-word-per-line">
										<span class="roi-calculator__value" id="more-clients"></span>
										<span>More</span>
										<span>Clients
												<span class="roi-calculator__tooltip d-none" data-toggle="tooltip" data-placement="top" title="Loading...">
													<?= fp_noesc( $info_icon ) ?>
												</span>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-auto mt-3 text-center" id="dollars-month-col">
							<div class="d-block w-100  text-center text-md-left">
								<div class="d-none d-md-inline-block roi-calculator__right-column__card-image">
									<?= fp_inline_asset( 'images/roi-calculator/piggy_bank.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<span class="roi-calculator__value" id="dollars-month"></span>
									<div class="roi-calculator__type">
										<span>Dollars / </span>
										<span>Month
											<span class="roi-calculator__tooltip d-none" data-toggle="tooltip" data-placement="top" title="Loading...">
												<?= fp_noesc( $info_icon ) ?>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-6 col-md-auto mt-3 d-none  text-center " id="transaction-savings-col">
							<div class="d-block w-100  text-center text-md-left">
								<div class="d-none d-md-inline-block roi-calculator__right-column__card-image">
									<?= fp_inline_asset( 'images/roi-calculator/coins.svg' ); ?>
								</div>
								<div class="roi-calculator__right-column__card-info  d-flex flex-column">
									<div class="roi-calculator__type one-word-per-line">
										<span class="roi-calculator__value" id="transaction-savings"></span>
										<span>
											<span> Transaction fee savings </span>
											<span>/ year <span class="roi-calculator__tooltip d-none" data-toggle="tooltip" data-placement="top" title="Loading...">
													<?= fp_noesc( $info_icon ) ?>
												</span>
											</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?= fp_inline_asset( 'images/roi-calculator/divider.svg' ); ?>
				<div class="roi-calculator__form">
					<div class="row justify-content-center form-header mt-5 mt-lg-0">
						<div class="col-lg-12 text-center ">
							<?php
							if ( $form_title ) {
								echo '<h2>' . esc_html( $form_title ) . '</h2>';
							}
							if ( $form_subtitle ) {
								echo '<div class="free-trial-link">' . fp_noesc( $form_subtitle ) . '</div>';
							}
							?>
						</div>
					</div>
					<form class="mt-1  w-100 roi-calculator__right-column-inputs" id="roi-calculator-form">
						<div class="row m-0 w-100 ">
							<div class="col-md-6">
								<input placeholder="First Name*" id="first_name" required class="w-100 mt-3">
							</div>
							<div class="col-md-6">
								<input placeholder="Last Name*" id="last_name" required class="w-100 mt-3">
							</div>
						</div>
						<div class="row m-0  w-100">
							<div class="col-md-6">
								<input placeholder="Phone Number*" id="phone_number" class="w-100 mt-3" required>
							</div>
							<div class="col-md-6">
								<input placeholder="Email Address*" type="email" required id="email" class="w-100 mt-3 ">
							</div>
						</div>
						<div class="row mt-4 mb-2 w-100 w-lg-75 mx-auto roi-calculator__right-column-footer">
							<div class="col-lg-12">
								<label>
									<input type="checkbox" name="checkbox" id="consent" class="mr-1 p-0"><span>Send me helpful tips and advice for small businesses. I acknowledge and agree to FreshBook’s <a href="https://www.freshbooks.com/policies/privacy">Privacy Policy</a>, and can unsubscribe at any time by contacting help@freshbooks.com.</span>
								</label>
							</div>
							<button class="roi-calculator__submit-btn roi-calculator__submit-btn--pdf mx-auto mt-4" id="generate-report-btn" type="submit" disabled> <?= $form_button_text ? esc_html( $form_button_text ) : 'Get a Copy of the ROI Report' ?></button>

							<span id="error-message" class="d-none mt-2 text-center w-100">There was an error connecting to the server. Please Try Again Later.</span>
						</div>
					</form>
					<div class="d-flex d-md-none justify-content-center">
						<button id="roi-calculator-reset-mobile" class="btn btn-link  w-100">
							<?= fp_inline_asset( 'images/roi-calculator/reset.svg' ); ?>
							<span class="d-none d-md-flex text-white">Reset</span>
						</button>
					</div>
				</div>
				<div id="roi-calculator-success" class="d-none flex-column align-items-center">
					<h3 class="mt-5 mt-md-0">Thanks! Check your email for your ROI report</h3>
					<?= fp_render_img(
						'images/roi-calculator/roi_demo.png',
						[
							'class' => 'w-25 mx-auto my-3 h-auto',
							'alt'   => 'ROI demo',
						]
					) ?>
					<a class=" roi-calculator__submit-btn w-lg-50 mx-auto mt-4" href="https://calendly.com/acq-ae" rel="noopener noreferrer">Book a Demo</a>
					<p class="mt-3">or <a href="https://www.freshbooks.com/signup" target="_blank" rel="noopener noreferrer">Start a Free Trial</a></p>
				</div>
			</div>
		</div>
	</div>
</div>
