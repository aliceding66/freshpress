<?php
/**
 * VAT Calculator template.
 *
 * @package FreshPress\Website
 */

// Tools Variable.
$tools = get_field( 'vat_calculator_tools' );

// Content Variables.
$country_title = get_field( 'vat_calculator_country' );
$vat_title = get_field( 'vat_calculator_title' );
$description = get_field( 'vat_calculator_description' );
$cta = get_field( 'vat_calculator_cta' );
$button_link = $cta['button_link'];
$button_style = $cta['button_style'];
$button_max_width = $cta['max_width'];
$button_inline_styles = ! empty( $button_max_width ) ? 'style="max-width:' . esc_attr( $button_max_width ) . '"' : '';

// Create class attribute allowing for custom "className" value.
$class_name = ( 'Blue' === $button_style ) ? 'btn-cta-blue' : 'btn-cta-green';
$class_name .= ' btn';
$container_class_name = '';
if ( ! empty( $block['align'] ) ) {
	$container_class_name .= ' align' . $block['align'];
}

// Form variable.
$form = get_field( 'vat_calculator_form' );

// rate option variable.
$rate_options = $form['rate_options'];

// labels variables.
$add = $form['add'];
$remove = $form['remove'];
$enter_amount = $form['enter_amount'];
$enter_amount_without = $form['enter_amount_without'];
$enter_amount_with = $form['enter_amount_with'];
$vat_rate = $form['vat_rate'];
$vat_amount = $form['vat_amount'];
$total = $form['total'];
$currency = $form['currency'];
$input_placeholder = "$currency 00.00";

?>
<div <?= fp_get_block_id( $block, true ); ?> class="vat-calculator <?= esc_attr( fp_get_block_classes() ); ?>">
	<div class="vat-calculator__container">
		<div class="d-block d-xl-flex justify-content-xl-between align-items-end">
			<div class="vat-calculator__content text-center">
				<div class="vat-calculator__tools">
					<div class="vat-calculator__tools-select">
						<?php if ( $tools['tools_main_label'] ) : ?>
							<span class="vat-calculator__tools-arrow">
								<?= esc_html( $tools['tools_main_label'] ); ?>
							</span>
						<?php endif; ?>
						<?php
						$other_tools = $tools['other_tools'];
						if ( ! empty( $other_tools ) ) :
							?>
							<div class="vat-calculator__tools-options">
								<div class="vat-calculator__tools-container">
									<div class="row">
										<div class="col-12">
											<?php
											foreach ( $other_tools as $vat_link ) {
												echo '<a href="' . esc_url( $vat_link['link']['url'] ) . '">' . esc_html( $vat_link['link']['title'] ) . '</a>';
											}
											?>
										</div>
									</div>
								</div>
							</div>
						<?php endif; ?>
					</div>
				</div>
				<?php if ( $country_title ) : ?>
					<span class="vat-calculator__country-label">
						<?= esc_html( $country_title ); ?>
					</span>
				<?php endif; ?>
				<?php if ( $country_title ) : ?>
					<h1 class="vat-calculator__title">
						<?= esc_html( $vat_title ); ?>
					</h1>
				<?php endif; ?>
				<?php if ( $description ) : ?>
					<div class="vat-calculator__description">
						<?= fp_noesc( $description ); ?>
					</div>
				<?php endif; ?>
				<?php if ( $button_link && $button_link['url'] && $button_link['title'] ) : ?>
					<a <?= fp_noesc( $button_inline_styles ); ?> class="<?= esc_attr( $class_name ); ?>" href="<?= esc_url( $button_link['url'] ); ?>">
						<?= esc_html( $button_link['title'] ); ?>
					</a>
				<?php endif; ?>
			</div>
			<div class="vat-calculator__form-container">
				<ul class="nav nav-tabs vat-calculator__tabs" id="vat-calculator__tabs" role="tablist">
					<li class="nav-item" role="presentation">
						<a class="nav-link active" id="vat-calculator__add-tab" data-toggle="tab" href="#vat-add" role="tab" aria-controls="add" aria-selected="true"><?= esc_html( $add ); ?></a>
					</li>
					<li class="nav-item" role="presentation">
						<a class="nav-link" id="vat-calculator__remove-tab" data-toggle="tab" href="#vat-remove" role="tab" aria-controls="remove" aria-selected="false"><?= esc_html( $remove ); ?></a>
					</li>
				</ul>
				<div class="tab-content vat-calculator__tabs-content" id="vat-calculator__tabs-content">
					<div class="tab-pane show active" id="vat-add" role="tabpanel" aria-labelledby="vat-calculator__add-tab">
						<form class="vat-calculator__form">
							<div class="vat-calculator__form_content_top">
								<div class="row">
									<div class="col-md-7">
										<label for="vat-calculator__input_add" class="vat-calculator__input-label"><?= esc_html( $enter_amount ); ?>
											<span><?= esc_html( $enter_amount_without ); ?></span>
										</label>
										<input name="vat-calculator__input_add" class="vat-calculator__input" id="vat-calculator__input_add" type="text" placeholder="<?= esc_attr( $input_placeholder ); ?>" data-currency="<?= esc_attr( $currency ); ?>" maxlength="16">
									</div>
									<?php
									$select = '<div class="vat-calculator__select-wrapper"><div name="vat-calculator__select-container" class="vat-calculator__select-container">';
									$tooltip = '<ul class="vat-calculator__options">';
									if ( ! empty( $rate_options ) ) {
										foreach ( $rate_options as $index => $rate_option ) {
											$option = $rate_option['number'] . '% ' . $rate_option['title'];
											if ( 0 == $index ) {
												$active = ' vat-calculator__option_active';
											} else {
												$active = '';
											}
											$select .= '<div class="vat-calculator__option' . $active . '" data-value="' . esc_attr( $rate_option['number'] ) . '">' . esc_html( $option ) . '</div>';
											$tooltip .= '<li class="vat-calculator__options-items"><span class="vat-calculator__options-items_bold">' . $rate_option['number'] . '% :</span> ' . $rate_option['description'] . '</li>';
										}
									}
									$tooltip .= '</ul>';
									$select .= '</div></div>';
									?>
									<div class="col-md-5">
										<label for="vat-calculator__select" class="vat-calculator__input-label"><?= esc_html( $vat_rate ); ?></label>
										<button class="vat-calculator__button" type="button" data-container=".vat-calculator" data-toggle="tooltip" data-placement="bottom" data-html="true" data-template="<?= esc_attr( '<div class="tooltip vat-calculator__tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>' ); ?>" title="<?= esc_attr( $tooltip ); ?>">
											<?= fp_render_img( get_template_directory_uri() . '/assets/images/vat-calculator/info-icon.svg', [ 'alt' => 'icon info add vat' ], 'full' ); ?>
										</button>
										<input type="hidden" class="vat-calculator__select" value="<?= esc_attr( $rate_options[0]['number'] ); ?>">
										<?= fp_noesc( $select ); ?>
									</div>
								</div>
							</div>
							<div class="vat-calculator__form_content_bottom">
								<div class="row">
									<div class="col-md-6">
										<span class="vat-calculator__label">
											<?= esc_html( $vat_amount ) ?>
										</span>
										<span class="vat-calculator__amount" id="vat-calculator__amount-add">
											<span><?= esc_html( $currency ); ?>00.00</span>
										</span>
									</div>
									<div class="col-md-6">
										<span class="vat-calculator__label">
											<?= esc_html( $total ) ?>
										</span>
										<span class="vat-calculator__amount vat-calculator__amount_font_bold" id="vat-calculator__total-add">
											<span><?= esc_html( $currency ); ?>00.00</span>
										</span>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="tab-pane" id="vat-remove" role="tabpanel" aria-labelledby="vat-calculator__remove-tab">
						<form class="vat-calculator__form">
							<div class="vat-calculator__form_content_top">
								<div class="row">
									<div class="col-md-7">
										<label for="vat-calculator__input_remove" class="vat-calculator__input-label">
											<?= esc_html( $enter_amount ); ?>
											<span><?= esc_html( $enter_amount_with ); ?></span>
										</label>
										<input name="vat-calculator__input_remove" class="vat-calculator__input" id="vat-calculator__input_remove" type="text" placeholder="<?= esc_attr( $input_placeholder ); ?>" data-currency="<?= esc_attr( $currency ); ?>" maxlength="16">
									</div>
									<?php
									$select = '<div class="vat-calculator__select-wrapper"><div name="vat-calculator__select-container" class="vat-calculator__select-container">';
									$tooltip = '<ul class="vat-calculator__options">';
									if ( ! empty( $rate_options ) ) {
										foreach ( $rate_options as $index => $rate_option ) {
											$option = $rate_option['number'] . '% ' . $rate_option['title'];
											if ( 0 == $index ) {
												$active = ' vat-calculator__option_active';
											} else {
												$active = '';
											}
											$select .= '<div class="vat-calculator__option' . $active . '" data-value="' . esc_attr( $rate_option['number'] ) . '">' . esc_html( $option ) . '</div>';
											$tooltip .= '<li class="vat-calculator__options-items"><span class="vat-calculator__options-items_bold">' . $rate_option['number'] . '%:</span> ' . $rate_option['description'] . '</li>';
										}
									}
									$tooltip .= '</ul>';
									$select .= '</div></div>';
									?>
									<div class="col-md-5">
										<label for="vat-calculator__select" class="vat-calculator__input-label"><?= esc_html( $vat_rate ); ?></label>
										<button class="vat-calculator__button" type="button" data-container=".vat-calculator" data-toggle="tooltip" data-placement="bottom" data-html="true" data-template="<?= esc_attr( '<div class="tooltip vat-calculator__tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>' ); ?>" title="<?= esc_attr( $tooltip ); ?>">
											<?= fp_render_img( get_template_directory_uri() . '/assets/images/vat-calculator/info-icon.svg', [ 'alt' => 'icon info remove vat' ], 'full' ); ?>
										</button>
										<input type="hidden" class="vat-calculator__select" value="<?= esc_attr( $rate_options[0]['number'] ); ?>">
										<?= fp_noesc( $select ); ?>
									</div>
								</div>
							</div>
							<div class="vat-calculator__form_content_bottom">
								<div class="row">
									<div class="col-md-6">
										<span class="vat-calculator__label">
											<?= esc_html( $vat_amount ); ?>
										</span>
										<span class="vat-calculator__amount" id="vat-calculator__amount-remove">
											<span><?= esc_html( $currency ); ?>00.00</span>
										</span>
									</div>
									<div class="col-md-6">
										<span class="vat-calculator__label">
											<?= esc_html( $total ) ?>
										</span>
										<span class="vat-calculator__amount vat-calculator__amount_font_bold" id="vat-calculator__total-remove">
											<span><?= esc_html( $currency ); ?>00.00</span>
										</span>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
