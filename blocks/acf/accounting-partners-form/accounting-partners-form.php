<?php
/**
 * Accounting Partners Form template.
 *
 * @package FreshPress\Website
 */

$thank_you_flag = false;
if ( isset( $_GET['thank-you'] ) ) {
	$thank_you_flag = true;
}

$container_class_name = '';
if ( ! empty( $block['align'] ) ) {
	$container_class_name .= ' align' . $block['align'];
}

if ( $thank_you_flag ) : ?>
	<?php
	$thank_you_name = '';
	if ( isset( $_GET['firm-name'] ) ) {
		$thank_you_name = sanitize_text_field( wp_unslash( $_GET['firm-name'] ) );
	}
	$thank_you_title = get_field( 'accounting-partners-thank-you_title' );
	$thank_you_message_1 = get_field( 'accounting-partners-thank-you_message_1' );
	$thank_you_message_2 = get_field( 'accounting-partners-thank-you_message_2' );
	$thank_you_resource_title = get_field( 'accounting-partners-thank-you_resource_title' );
	$thank_you_resource_items = get_field( 'accounting-partners-thank-you_resource_items' );
	?>
	<div <?= fp_get_block_id( $block, true ); ?> class="accounting-partners-thank-you <?= esc_attr( fp_get_block_classes( $container_class_name ) ); ?>">
		<div class="container">
			<div class="row">
				<div class="col-md-8 text-center mx-auto">
					<div class="accounting-partners-thank-you__header">
						<?php if ( $thank_you_title ) : ?>
							<h1><?= esc_html( $thank_you_title ); ?></h1>
						<?php endif; ?>
						<?php if ( $thank_you_message_1 || $thank_you_message_2 ) : ?>
							<p><?= esc_html( $thank_you_message_1 ) . ' ' . esc_html( $thank_you_name ) . esc_html( $thank_you_message_2 ); ?></p>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<div class="row accounting-partners-thank-you__resources">
				<?php if ( $thank_you_resource_title ) : ?>
					<div class="col-12">
						<h2><?= esc_html( $thank_you_resource_title ); ?></h2>
					</div>
				<?php endif; ?>
				<?php if ( ! empty( $thank_you_resource_items ) ) : ?>
					<?php foreach ( $thank_you_resource_items as $item ) : ?>
						<div class="col-md-4 accounting-partners-thank-you__resources-single">
							<div class="accounting-partners-thank-you__resources-image">
								<?php
								if ( ! empty( $item['image'] ) ) {
									echo fp_render_img( $item['image'], [], 'large' );
								} else {
									echo fp_render_img(
										'images/accounting-partners/freshbooks-certified.png',
										[
											'alt' => 'Accounting Partner Resource default image',
										]
									);
								}
								?>
							</div>
							<?php if ( $item['title'] ) : ?>
								<h3><?= esc_html( $item['title'] ); ?></h3>
							<?php endif; ?>
							<?php if ( ! empty( $item['cta'] ) ) : ?>
								<a href="<?= esc_url( $item['cta']['url'] ); ?>" target="<?= esc_url( $item['cta']['target'] ); ?>" class="btn btn-white"><?= esc_html( $item['cta']['title'] ); ?></a>
							<?php endif; ?>

						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
<?php else : ?>
	<?php
	$partner = '';
	$partner_id = '';
	if ( isset( $_GET['partner'] ) && ! empty( $_GET['partner'] ) ) {
		$partner_id = sanitize_text_field( wp_unslash( $_GET['partner'] ) );
		$partner = get_field( 'am_firm_name', $partner_id );
	} elseif ( get_field( 'accounting-partners-form_default-form' ) && ! is_admin() ) {
		$directory_home_link = esc_url( site_url() . '/accounting-partners' );
		header( 'Location: ' . $directory_home_link );
	}

	$locations = get_the_terms( $partner_id, 'accounting_partners_location' );

	$certified = get_field( 'accounting-partners-form_certified' );
	$form_title = get_field( 'accounting-partners-form_title' );
	$side_title = get_field( 'accounting-partners-form_side_title' );
	$side_list = get_field( 'accounting-partners-form_side_list' );
	$side_blockquote = get_field( 'accounting-partners-form_side_blockquote' );
	?>
	<div <?= fp_get_block_id( $block, true ); ?> class="accounting-partners-form <?= esc_attr( fp_get_block_classes( $container_class_name ) ); ?>" data-partner-id="<?= esc_html( $partner_id ); ?>">
		<div class="container">
			<?php if ( ! is_admin() ) : ?>
				<div class="accounting-partners-form__top">
					<div class="accounting-partners-form__breadcrumbs">
						<div class="col-md-12 text-left text-sm-center text-lg-left">
							<?php

							if ( get_field( 'accounting-partners-form_default-form' ) ) {
								$city = '';
								$state = '';
								$country = '';
								$country = fp_check_parent( $locations, 0 );
								$ac_terms = [ $country ];
								$state = fp_check_parent( $locations, $country->term_id );
								if ( $state ) {
									$ac_terms[] = $state;
								}
								$city = fp_check_parent( $locations, $state->term_id );
								if ( $city ) {
									$ac_terms[] = $city;
								}
								if ( ! empty( $ac_terms ) ) {
									echo '<a href="' . esc_url( site_url() ) . '/accounting-partners">' . esc_html( __( 'Home', 'freshpress-website' ) ) . '</a><span class="accounting-partners-form__breadcrumbs-divider">/</span>';
									foreach ( $ac_terms as $i => $ac_term ) {
										echo '<a href="' . esc_url( site_url() . '/accounting-partners/location/' . $ac_term->slug ) . '">' . esc_html( $ac_term->name ) . '</a><span class="accounting-partners-form__breadcrumbs-divider">/</span>';
									}
									echo '<a href="' . esc_url( get_the_permalink( $partner_id ) ) . '">' . esc_html( $partner ) . '</a>';
								}
							} else {
								echo '<a href="' . esc_url( site_url() ) . '/accounting-partners">' . esc_html( __( 'Home', 'freshpress-website' ) ) . '</a>';
							}
							?>
						</div>
					</div>
				</div>
			<?php endif; ?>
			<div class="row">
				<div class="col-lg-8">
					<div class="accounting-partners-form__left-side">
						<div class="text-center">
							<?php if ( $certified ) : ?>
								<span class="accounting-partners-form__certified"><?= esc_html( $certified ); ?></span>
							<?php endif; ?>
							<?php if ( $form_title || $partner ) : ?>
								<h1>
									<?= esc_html( $form_title ); ?>
									<?php if ( $partner ) : ?>
										<span><?= esc_html( $partner ); ?></span>
									<?php endif; ?>
								</h1>
							<?php endif; ?>
						</div>

						<?php if ( get_field( 'accounting-partners-form_default-form' ) ) : ?>
							<?php if ( ! is_admin() ) : ?>
								<form class="accounting-partners-form_default-form needs-validation" novalidate>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="first-name" id="first-name" placeholder="First Name" aria-required="true" required>
												<label for="first-name">First Name<sup>*</sup></label>
												<div class="invalid-feedback">
													First Name is required.
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="last-name" id="last-name" placeholder="Last Name" aria-required="true" required>
												<label for="last-name">Last Name<sup>*</sup></label>
												<div class="invalid-feedback">
													Last Name is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="job-title" id="job-title" placeholder="Job Title" aria-required="true" required>
												<label for="job-title">Job Title<sup>*</sup></label>
												<div class="invalid-feedback">
													Job Title is required.
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="business-name" id="business-name" placeholder="Business Name" aria-required="true" required>
												<label for="business-name">Business Name<sup>*</sup></label>
												<div class="invalid-feedback">
													Business Name is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="email" name="email" id="email" placeholder="Email" aria-required="true" required>
												<label for="email">Email<sup>*</sup></label>
												<div class="invalid-feedback">
													<span class="invalid-feedback-required">Email is required.</span>
													<span class="invalid-feedback-format">Enter a valid email.</span>
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="tel" name="work-phone" id="work-phone" placeholder="000-000-0000" aria-required="true" required>
												<label for="work-phone">Work Phone<sup>*</sup></label>
												<div class="invalid-feedback">
													Work Phone is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="address" id="address" placeholder="Address 1" aria-required="true" required>
												<label for="address">Address 1<sup>*</sup></label>
												<div class="invalid-feedback">
													Address 1 is required.
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="city" id="city" placeholder="City" aria-required="true" required>
												<label for="city">City<sup>*</sup></label>
												<div class="invalid-feedback">
													City is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="province-state" id="province-state" placeholder="Province/State" aria-required="true" required>
												<label for="province-state">Province/State<sup>*</sup></label>
												<div class="invalid-feedback">
													Province/State is required.
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<input class="form-control" type="text" name="zip" id="zip" placeholder="Postal Code / Zip Code" aria-required="true" required>
												<label for="zip">Postal Code / Zip Code<sup>*</sup></label>
												<div class="invalid-feedback">
													Postal Code / Zip Code is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-6">
											<div class="accounting-partners-form__field has-validation">
												<select name="country" id="country" class="form-control" aria-required="true" required>
													<option value="" selected disabled>Country *</option>
													<option value="Canada">Canada</option>
													<option value="United States">United States</option>
													<option value="Afghanistan">Afghanistan</option>
													<option value="Albania">Albania</option>
													<option value="Algeria">Algeria</option>
													<option value="American Samoa">American Samoa</option>
													<option value="Andorra">Andorra</option>
													<option value="Angola">Angola</option>
													<option value="Anguilla">Anguilla</option>
													<option value="Antarctica">Antarctica</option>
													<option value="Antigua and Barbuda">Antigua and Barbuda</option>
													<option value="Argentina">Argentina</option>
													<option value="Armenia">Armenia</option>
													<option value="Aruba">Aruba</option>
													<option value="Australia">Australia</option>
													<option value="Austria">Austria</option>
													<option value="Azerbaijan">Azerbaijan</option>
													<option value="Bahamas">Bahamas</option>
													<option value="Bahrain">Bahrain</option>
													<option value="Bangladesh">Bangladesh</option>
													<option value="Barbados">Barbados</option>
													<option value="Belarus">Belarus</option>
													<option value="Belgium">Belgium</option>
													<option value="Belize">Belize</option>
													<option value="Benin">Benin</option>
													<option value="Bermuda">Bermuda</option>
													<option value="Bhutan">Bhutan</option>
													<option value="Bolivia">Bolivia</option>
													<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
													<option value="Botswana">Botswana</option>
													<option value="Brazil">Brazil</option>
													<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
													<option value="British Virgin Islands">British Virgin Islands</option>
													<option value="Brunei">Brunei</option>
													<option value="Bulgaria">Bulgaria</option>
													<option value="Burkina Faso">Burkina Faso</option>
													<option value="Burundi">Burundi</option>
													<option value="Cambodia">Cambodia</option>
													<option value="Cameroon">Cameroon</option>
													<option value="Cape Verde">Cape Verde</option>
													<option value="Cayman Islands">Cayman Islands</option>
													<option value="Central African Republic">Central African Republic</option>
													<option value="Chad">Chad</option>
													<option value="Chile">Chile</option>
													<option value="China">China</option>
													<option value="Christmas Island">Christmas Island</option>
													<option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
													<option value="Colombia">Colombia</option>
													<option value="Comoros">Comoros</option>
													<option value="Congo">Congo</option>
													<option value="Cook Islands">Cook Islands</option>
													<option value="Costa Rica">Costa Rica</option>
													<option value="Croatia">Croatia</option>
													<option value="Cuba">Cuba</option>
													<option value="Curaçao">Curaçao</option>
													<option value="Cyprus">Cyprus</option>
													<option value="Czech Republic">Czech Republic</option>
													<option value="Côte d’Ivoire">Côte d’Ivoire</option>
													<option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
													<option value="Denmark">Denmark</option>
													<option value="Djibouti">Djibouti</option>
													<option value="Dominica">Dominica</option>
													<option value="Dominican Republic">Dominican Republic</option>
													<option value="Ecuador">Ecuador</option>
													<option value="Egypt">Egypt</option>
													<option value="El Salvador">El Salvador</option>
													<option value="Equatorial Guinea">Equatorial Guinea</option>
													<option value="Eritrea">Eritrea</option>
													<option value="Estonia">Estonia</option>
													<option value="Ethiopia">Ethiopia</option>
													<option value="Falkland Islands">Falkland Islands</option>
													<option value="Faroe Islands">Faroe Islands</option>
													<option value="Fiji">Fiji</option>
													<option value="Finland">Finland</option>
													<option value="France">France</option>
													<option value="French Guiana">French Guiana</option>
													<option value="French Polynesia">French Polynesia</option>
													<option value="French Southern Territories">French Southern Territories</option>
													<option value="Gabon">Gabon</option>
													<option value="Gambia">Gambia</option>
													<option value="Georgia">Georgia</option>
													<option value="Germany">Germany</option>
													<option value="Ghana">Ghana</option>
													<option value="Gibraltar">Gibraltar</option>
													<option value="Greece">Greece</option>
													<option value="Greenland">Greenland</option>
													<option value="Grenada">Grenada</option>
													<option value="Guadeloupe">Guadeloupe</option>
													<option value="Guam">Guam</option>
													<option value="Guatemala">Guatemala</option>
													<option value="Guernsey">Guernsey</option>
													<option value="Guinea">Guinea</option>
													<option value="Guinea-Bissau">Guinea-Bissau</option>
													<option value="Guyana">Guyana</option>
													<option value="Haiti">Haiti</option>
													<option value="Honduras">Honduras</option>
													<option value="Hong Kong S.A.R., China">Hong Kong S.A.R., China</option>
													<option value="Hungary">Hungary</option>
													<option value="Iceland">Iceland</option>
													<option value="India">India</option>
													<option value="Indonesia">Indonesia</option>
													<option value="Iran">Iran</option>
													<option value="Iraq">Iraq</option>
													<option value="Ireland">Ireland</option>
													<option value="Isle of Man">Isle of Man</option>
													<option value="Israel">Israel</option>
													<option value="Italy">Italy</option>
													<option value="Jamaica">Jamaica</option>
													<option value="Japan">Japan</option>
													<option value="Jersey">Jersey</option>
													<option value="Jordan">Jordan</option>
													<option value="Kazakhstan">Kazakhstan</option>
													<option value="Kenya">Kenya</option>
													<option value="Kiribati">Kiribati</option>
													<option value="Kuwait">Kuwait</option>
													<option value="Kyrgyzstan">Kyrgyzstan</option>
													<option value="Laos">Laos</option>
													<option value="Latvia">Latvia</option>
													<option value="Lebanon">Lebanon</option>
													<option value="Lesotho">Lesotho</option>
													<option value="Liberia">Liberia</option>
													<option value="Libya">Libya</option>
													<option value="Liechtenstein">Liechtenstein</option>
													<option value="Lithuania">Lithuania</option>
													<option value="Luxembourg">Luxembourg</option>
													<option value="Macao S.A.R., China">Macao S.A.R., China</option>
													<option value="Macedonia">Macedonia</option>
													<option value="Madagascar">Madagascar</option>
													<option value="Malawi">Malawi</option>
													<option value="Malaysia">Malaysia</option>
													<option value="Maldives">Maldives</option>
													<option value="Mali">Mali</option>
													<option value="Malta">Malta</option>
													<option value="Marshall Islands">Marshall Islands</option>
													<option value="Martinique">Martinique</option>
													<option value="Mauritania">Mauritania</option>
													<option value="Mauritius">Mauritius</option>
													<option value="Mayotte">Mayotte</option>
													<option value="Mexico">Mexico</option>
													<option value="Micronesia">Micronesia</option>
													<option value="Moldova">Moldova</option>
													<option value="Monaco">Monaco</option>
													<option value="Mongolia">Mongolia</option>
													<option value="Montenegro">Montenegro</option>
													<option value="Montserrat">Montserrat</option>
													<option value="Morocco">Morocco</option>
													<option value="Mozambique">Mozambique</option>
													<option value="Myanmar">Myanmar</option>
													<option value="Namibia">Namibia</option>
													<option value="Nauru">Nauru</option>
													<option value="Nepal">Nepal</option>
													<option value="Netherlands">Netherlands</option>
													<option value="New Caledonia">New Caledonia</option>
													<option value="New Zealand">New Zealand</option>
													<option value="Nicaragua">Nicaragua</option>
													<option value="Niger">Niger</option>
													<option value="Nigeria">Nigeria</option>
													<option value="Niue">Niue</option>
													<option value="Norfolk Island">Norfolk Island</option>
													<option value="North Korea">North Korea</option>
													<option value="Northern Mariana Islands">Northern Mariana Islands</option>
													<option value="Norway">Norway</option>
													<option value="Oman">Oman</option>
													<option value="Pakistan">Pakistan</option>
													<option value="Palau">Palau</option>
													<option value="Palestinian Territory">Palestinian Territory</option>
													<option value="Panama">Panama</option>
													<option value="Papua New Guinea">Papua New Guinea</option>
													<option value="Paraguay">Paraguay</option>
													<option value="Peru">Peru</option>
													<option value="Philippines">Philippines</option>
													<option value="Pitcairn">Pitcairn</option>
													<option value="Poland">Poland</option>
													<option value="Portugal">Portugal</option>
													<option value="Puerto Rico">Puerto Rico</option>
													<option value="Qatar">Qatar</option>
													<option value="Romania">Romania</option>
													<option value="Russia">Russia</option>
													<option value="Rwanda">Rwanda</option>
													<option value="Réunion">Réunion</option>
													<option value="Saint Barthélemy">Saint Barthélemy</option>
													<option value="Saint Helena">Saint Helena</option>
													<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
													<option value="Saint Lucia">Saint Lucia</option>
													<option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
													<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
													<option value="Samoa">Samoa</option>
													<option value="San Marino">San Marino</option>
													<option value="Sao Tome and Principe">Sao Tome and Principe</option>
													<option value="Saudi Arabia">Saudi Arabia</option>
													<option value="Senegal">Senegal</option>
													<option value="Serbia">Serbia</option>
													<option value="Seychelles">Seychelles</option>
													<option value="Sierra Leone">Sierra Leone</option>
													<option value="Singapore">Singapore</option>
													<option value="Slovakia">Slovakia</option>
													<option value="Slovenia">Slovenia</option>
													<option value="Solomon Islands">Solomon Islands</option>
													<option value="Somalia">Somalia</option>
													<option value="South Africa">South Africa</option>
													<option value="South Korea">South Korea</option>
													<option value="South Sudan">South Sudan</option>
													<option value="Spain">Spain</option>
													<option value="Sri Lanka">Sri Lanka</option>
													<option value="Sudan">Sudan</option>
													<option value="Suriname">Suriname</option>
													<option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
													<option value="Swaziland">Swaziland</option>
													<option value="Sweden">Sweden</option>
													<option value="Switzerland">Switzerland</option>
													<option value="Syria">Syria</option>
													<option value="Taiwan">Taiwan</option>
													<option value="Tajikistan">Tajikistan</option>
													<option value="Tanzania">Tanzania</option>
													<option value="Thailand">Thailand</option>
													<option value="Timor-Leste">Timor-Leste</option>
													<option value="Togo">Togo</option>
													<option value="Tokelau">Tokelau</option>
													<option value="Tonga">Tonga</option>
													<option value="Trinidad and Tobago">Trinidad and Tobago</option>
													<option value="Tunisia">Tunisia</option>
													<option value="Turkey">Turkey</option>
													<option value="Turkmenistan">Turkmenistan</option>
													<option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
													<option value="Tuvalu">Tuvalu</option>
													<option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
													<option value="Uganda">Uganda</option>
													<option value="Ukraine">Ukraine</option>
													<option value="United Arab Emirates">United Arab Emirates</option>
													<option value="United Kingdom">United Kingdom</option>
													<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
													<option value="Uruguay">Uruguay</option>
													<option value="Uzbekistan">Uzbekistan</option>
													<option value="Vanuatu">Vanuatu</option>
													<option value="Vatican">Vatican</option>
													<option value="Venezuela">Venezuela</option>
													<option value="Viet Nam">Viet Nam</option>
													<option value="Wallis and Futuna">Wallis and Futuna</option>
													<option value="Western Sahara">Western Sahara</option>
													<option value="Yemen">Yemen</option>
													<option value="Zambia">Zambia</option>
													<option value="Zimbabwe">Zimbabwe</option>
												</select>
												<label for="country">Country<sup>*</sup></label>
												<div class="invalid-feedback">
													Country is required.
												</div>
											</div>
										</div>
									</div>
									<div class="row align-items-end">
										<div class="col-md-6">
											<div class="accounting-partners-form__field">
												<select name="products-services" id="products-services">
													<option value="" selected disabled>Industry</option>
													<option value="Accounting and Finance">Accounting and Finance</option>
													<option value="Administration">Administration</option>
													<option value="Agriculture">Agriculture</option>
													<option value="Architecture">Architecture</option>
													<option value="Arts and Entertainment">Arts and Entertainment</option>
													<option value="Automotive and Transport">Automotive and Transport</option>
													<option value="Catering">Catering</option>
													<option value="Construction and Trades">Construction and Trades</option>
													<option value="Creative Professionals">Creative Professionals</option>
													<option value="Education">Education</option>
													<option value="Engineering">Engineering</option>
													<option value="Environment">Environment</option>
													<option value="Event Planning">Event Planning</option>
													<option value="Fashion and Beauty">Fashion and Beauty</option>
													<option value="Food Services">Food Services</option>
													<option value="Health and Wellness">Health and Wellness</option>
													<option value="Hospitality">Hospitality</option>
													<option value="Travel and Tourism">Travel and Tourism</option>
													<option value="Human Resources and Staffing">Human Resources and Staffing</option>
													<option value="Information Technology and Support">Information Technology and Support</option>
													<option value="Legal">Legal</option>
													<option value="Management Consulting">Management Consulting</option>
													<option value="Manufacturing">Manufacturing</option>
													<option value="Marketing">Marketing</option>
													<option value="Communications & Media">Communications & Media</option>
													<option value="Marketing Agency">Marketing Agency</option>
													<option value="Non-Profit and Volunteer Management">Non-Profit and Volunteer Management</option>
													<option value="Print Management">Print Management</option>
													<option value="Professional Services">Professional Services</option>
													<option value="Real Estate and Property Management">Real Estate and Property Management</option>
													<option value="Retail">Retail</option>
													<option value="Sales and Business Development">Sales and Business Development</option>
													<option value="Telecommunications">Telecommunications</option>
													<option value="Tutoring">Tutoring</option>
													<option value="Utilities">Utilities</option>
													<option value="Web Hosting">Web Hosting</option>
													<option value="Other">Other</option>
												</select>
												<label for="products-services">What type of products or services does your business sell?</label>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field">
												<ul class="accounting-partners-form__checkbox-facade" id="how-we-help-facade">
													<li>Analytics And Reporting</li>
													<li>Audit</li>
													<li>Bookkeeping</li>
													<li>Budgeting And Forecasting</li>
													<li>Cash Flow Forecasting</li>
													<li>Catch-Up And Clean-Up Work</li>
													<li>Corporate Tax Returns</li>
													<li>Developing Client Workflows</li>
													<li>Financial Advisory</li>
													<li>Outsourced CFO</li>
													<li>Payroll</li>
													<li>Personal Tax Returns</li>
													<li>Technology Training</li>
													<li class="other">Other</li>
												</ul>
												<input class="form-control how-we-help" type="text" name="how-we-help" id="how-we-help" placeholder="Services">
												<label for="how-we-help">How can we help?</label>
											</div>
										</div>
									</div>
									<div class="row align-items-start">
										<div class="col-md-12">
											<div class="accounting-partners-form__field">
												<textarea class="form-control comments" name="comments" id="comments" placeholder="Tell us more..."></textarea>
												<label for="comments">Anything else?</label>
											</div>
										</div>
									</div>
									<div class="row align-items-end">
										<div class="col-md-6">
											<div class="accounting-partners-form__field">
												<select name="languages" id="languages">
													<option value="" selected disabled>Please select</option>
													<option value="English">English</option>
													<option value="Spanish">Spanish</option>
													<option value="French">French</option>
													<option value="Chinese">Chinese</option>
													<option value="Arabic">Arabic</option>
													<option value="Tagalog">Tagalog</option>
													<option value="Vietnamese">Vietnamese</option>
													<option value="Korean">Korean</option>
													<option value="Russian">Russian</option>
													<option value="Other">Other</option>
												</select>
												<label for="languages">Please have the Accouting Partner contact me using my preferred language of correspondence: </label>
											</div>
										</div>
										<div class="col-md-6 d-none">
											<div class="accounting-partners-form__field">
												<input class="form-control" type="text" name="languages-other" id="languages-other" placeholder="Other Language">
												<label for="languages-other">Please, specify other language: </label>
											</div>
										</div>
										<div class="col-md-6">
											<div class="accounting-partners-form__field">
												<select name="background-details" id="background-details">
													<option value="" selected disabled>Please select</option>
													<option value="I have worked with an Accountant/Bookkeeper/Tax Professional in the past.">I have worked with an Accountant/Bookkeeper/Tax Professional in the past.</option>
													<option value="I currently have an Accountant/Bookkeeper/Tax Professional.">I currently have an Accountant/Bookkeeper/Tax Professional.</option>
													<option value="I am interested in working with an Accountant/Bookkeeper/Tax Professional.">I am interested in working with an Accountant/Bookkeeper/Tax Professional.</option>
												</select>
												<label for="background-details">Please provide some background regarding your experience working with a professional services provider:</label>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-md-12">
											<div class="accounting-partners-form__checkbox">
												<input type="checkbox" name="have-freshbooks" id="have-freshbooks">
												<label for="have-freshbooks">I am currently using FreshBooks.</label>
											</div>
											<div class="accounting-partners-form__checkbox">
												<input type="checkbox" name="consent" id="consent">
												<label for="consent">I agree to receive emails from FreshBooks including product information, useful resources, and webinar invitations.</label>
											</div>
											<div class="accounting-partners-form__field">
												<div class="g-recaptcha" data-sitekey="<?= esc_attr( get_field( 'accounting-partners-form_grecaptcha_sitekey' ) ); ?>"></div>
												<div class="invalid-feedback recaptcha-error-message">Please verify that you are not a robot.</div>
												<input type="hidden" name="page-id" id="page-id" value="<?= get_the_ID(); ?>">
											</div>
											<input class="accounting-partners-form__submit" type="submit" value="Submit">

											<div class="accounting-partners-form__disclaimer accounting-partners-form__confirm text-center">
												<span>By clicking the button above I confirm that I have read and agree to the FreshBooks <a href="https://www.freshbooks.com/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy.</a></span>
												<br><span>When you enter into a contract with your FreshBooks-certified Accounting Partner of choice, you are responsible for validating the function and security of the FreshBooks-certified Accounting Partner Services. Further, you are responsible for making yourself aware of the terms of service and privacy policy of the FreshBooks-certified Accounting Partner you seek to use.</span>
											</div>
										</div>
									</div>
								</form>
							<?php else : ?>
								<code style="display:block;text-align:center;">Default form will show up here</code>
							<?php endif; ?>
						<?php endif; ?>

						<InnerBlocks />

					</div>
				</div>
				<div class="col-lg-4">
					<div class="accounting-partners-form__right-side">
						<?php if ( $side_title ) : ?>
							<h2 class="accounting-partners-form__side-title"><?= esc_html( $side_title ); ?></h2>
						<?php endif; ?>
						<?php if ( ! empty( $side_list ) ) : ?>
							<ul>
								<?php foreach ( $side_list as $side_item ) : ?>
									<li><?= esc_html( $side_item['list_item'] ); ?></li>
								<?php endforeach; ?>
							</ul>
						<?php endif; ?>
						<?php if ( ! empty( $side_blockquote ) ) : ?>
							<blockquote>
								<?php if ( ! empty( $side_blockquote['blockquote'] ) ) : ?>
									<span>
										<?= esc_html( $side_blockquote['blockquote'] ); ?>
									</span>
								<?php endif; ?>
								<?php if ( ! empty( $side_blockquote['author'] ) ) : ?>
									<cite>
										<?= esc_html( $side_blockquote['author'] ); ?>
									</cite>
								<?php endif; ?>
							</blockquote>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php
endif;
