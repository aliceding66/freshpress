import { __ } from '@wordpress/i18n';

export default ( templateData, attributes, id = '' ) => {
	let additionalTemplateData = [];
	const headlineMobileSize = 'mobile-' + attributes.headline_mobile_size;
	const headlineTabletSize = 'tablet-' + attributes.headline_tablet_size;
	const headlineDesktopSize = 'desktop-' + attributes.headline_desktop_size;

	additionalTemplateData.signup_form = {
		email_placeholder_text: attributes.signup_form_email_placeholder_text,
		password_placeholder_text: attributes.signup_form_password_placeholder_text,
		submit_button_text: attributes.signup_form_submit_button_text,
		include_default_terms_of_service: attributes.signup_form_include_default_terms_of_service,
		custom_terms_of_service: attributes.signup_form_custom_terms_of_service,
		default_terms: templateData.default_terms_of_service,
		hero_terms_of_service_colour: attributes.signup_form_hero_terms_of_service_colour,
		visibility: attributes.signup_form_visibility,
		action: templateData.signup_form_action,
		terms_of_service_inline_styles: !! attributes.signup_form_hero_terms_of_service_colour
			? `style='color: ${ attributes.signup_form_hero_terms_of_service_colour.hex };'`
			: '',
		invalid_email: __( 'Email is invalid.', 'freshpress-website' ),
		invalid_password: __( 'Password is invalid.', 'freshpress-website' ),
		field_required: __( 'This field is required.', 'freshpress-website' ),
	};
	const signupForm = additionalTemplateData.signup_form;
	const breakpointKeys = templateData.breakpoint_keys;
	const formVisibility = [];

	if ( attributes.include_signup_form ) {
		if ( breakpointKeys ) {
			breakpointKeys.forEach( ( key ) => {
				if ( 'sm' === key ) {
					formVisibility[ key ] = signupForm.visibility.includes( key )
						? 'd-flex'
						: 'd-none';
				} else {
					formVisibility[ key ] = signupForm.visibility.includes( key )
						? 'd-key-flex'
						: 'd-key-none';
				}
			} );
		}

		additionalTemplateData.signup_form.visibility = formVisibility.join( ' ' );
	}

	const ctaVisibility = {};

	if ( attributes.include_cta_button ) {
		if ( breakpointKeys ) {
			breakpointKeys.forEach( ( key ) => {
				if ( 'sm' === key ) {
					ctaVisibility[ key ] = attributes.cta_button_visibility.includes( key )
						? 'd-flex'
						: 'd-none';
				} else {
					ctaVisibility[ key ] = attributes.cta_button_visibility.includes( key )
						? `d-${ key }-flex`
						: `d-${ key }-none`;
				}
			} );
		}
	}

	const secondCtaVisibility = {};

	if ( attributes.hero_include_second_cta ) {
		if ( breakpointKeys ) {
			breakpointKeys.forEach( ( key ) => {
				if ( 'sm' === key ) {
					secondCtaVisibility[ key ] = attributes.hero_second_cta_visibility.includes(
						key
					)
						? 'd-flex'
						: 'd-none';
				} else {
					secondCtaVisibility[ key ] = attributes.hero_second_cta_visibility.includes(
						key
					)
						? `d-${ key }-flex`
						: `d-${ key }-none`;
				}
			} );
		}
	}

	const cols = [];
	let contentPosition = 'justify-content-center';
	let contentColumnPosition = 'align-items-center';
	let textAlign = 'text-center';
	let mainSectionPaddings = '';
	let contentPaddings = '';
	const images = attributes.images;
	const imagesByBreakpoint = {};

	if ( images ) {
		images.forEach( ( img ) => {
			imagesByBreakpoint[ img.screen_size ] = img;
		} );
	}
	const imgs = [];
	if ( images ) {
		const selector = '#' + id;
		breakpointKeys.forEach( ( bp ) => {
			if ( Object.keys( imagesByBreakpoint ).includes( bp ) ) {
				const bpImg =
					imagesByBreakpoint[ bp ] && imagesByBreakpoint[ bp ]?.image?.url
						? imagesByBreakpoint[ bp ].image.url
						: null;
				const displayImage = imagesByBreakpoint[ bp ].display_image && bpImg !== null;
				const bpBg = imagesByBreakpoint[ bp ].background_color
					? imagesByBreakpoint[ bp ].background_color.hex
					: null;
				const bpBottomPadding = imagesByBreakpoint[ bp ].bottom_padding
					? imagesByBreakpoint[ bp ].bottom_padding
					: null;
				const hasBpBottomPadding = bpBottomPadding || '0' === bpBottomPadding;

				if ( imagesByBreakpoint[ bp ].hero_content_position ) {
					contentPosition += ` justify-content-${ bp }-${ imagesByBreakpoint[ bp ].hero_content_position }`;
					contentColumnPosition += ` align-items-${ bp }-${ imagesByBreakpoint[ bp ].hero_content_position }`;

					if ( 'start' === imagesByBreakpoint[ bp ].hero_content_position ) {
						textAlign += ` text-${ bp }-left`;
						mainSectionPaddings += ' pl-lg-3';
						contentPaddings += ' pl-lg-5 pr-lg-0';
					} else if ( 'end' === imagesByBreakpoint[ bp ].hero_content_position ) {
						textAlign += ` text-${ bp }-right`;
						mainSectionPaddings += ' pr-lg-3';
						contentPaddings += ' pr-lg-5 pl-lg-0';
					} else {
						textAlign += ` text-${ bp }-center`;
					}
				}

				if ( 'xs' === bp ) {
					cols.push( 'col' );
				} else if (
					bpImg &&
					'center bottom' !== imagesByBreakpoint[ bp ].background_position
				) {
					cols.push( `col-${ bp }-6` );
				} else if (
					bpImg &&
					'center bottom' === imagesByBreakpoint[ bp ].background_position
				) {
					cols.push( `col-${ bp }-12` );
				} else if ( bpBg && ! bpImg ) {
					cols.push( `col-${ bp }-12` );
				}

				const breakpoints = templateData.breakpoints;
				const bpPxWidth = breakpoints[ bp ] + 'px';
				let bpBgPos = '';
				let bpCss = hasBpBottomPadding ? `padding-bottom: ${ bpBottomPadding }; ` : '';

				if ( imagesByBreakpoint[ bp ] ) {
					let bpBgSize = 'background-size: ';

					if ( 'cover' === imagesByBreakpoint[ bp ].background_size ) {
						bpBgSize += 'cover; ';
					} else if ( 'normal' === imagesByBreakpoint[ bp ].background_size ) {
						bpBgSize += 'auto 100%; ';
					} else if ( 'custom' === imagesByBreakpoint[ bp ].background_size ) {
						bpBgSize += imagesByBreakpoint[ bp ].hero_custom_background_size + '; ';
					}

					bpBgPos =
						'background-position: ' +
						( 'normal' === imagesByBreakpoint[ bp ].background_position
							? '100% 100%; '
							: imagesByBreakpoint[ bp ].background_position + '; ' );
					bpCss += bpBgSize + bpBgPos;
				}
				let url = '';

				if ( bpImg && displayImage ) {
					url = bpImg;
					bpCss += `background-image: url(${ url });`;
				} else if ( ! displayImage && bpBg ) {
					bpCss += `background-image: none; background-color: ${ bpBg };`;
				}
				imgs.push( `@media (min-width: ${ bpPxWidth }) { ${ selector } { ${ bpCss } } }` );
			}
		} );
	}
	const imagesStyles = imgs.join( ' ' );
	additionalTemplateData.images_style_tag = imgs ? `<style>${ imagesStyles }</style>` : '';

	additionalTemplateData = {
		...additionalTemplateData,
		content_position: contentPosition,
		content_inline_styles: attributes.hero_content_max_width
			? `style="max-width: ${ attributes.hero_content_max_width };"`
			: '',
		main_section_classes: cols.join( ' ' ) + mainSectionPaddings,
		label_inline_styles: attributes.hero_label_colour
			? `style="color: ${ attributes.hero_label_colour.hex };"`
			: '',
		headline_inline_styles: attributes.headline_colour
			? `style="color: ${ attributes.headline_colour.hex };"`
			: '',
		headline_font_sizes: [ headlineMobileSize, headlineTabletSize, headlineDesktopSize ].join(
			' '
		),
		text_inline_styles: attributes.text_colour
			? `style="color: ${ attributes.text_colour.hex };"`
			: '',
		text_align: textAlign,
		text_display_class: ! attributes.text_mobile_visibility ? '' : ' d-none d-md-block',
		content_paddings: contentPaddings,
		cta_button_inline_style: attributes.cta_button_max_width
			? 'style=max-width:' + attributes.cta_button_max_width
			: '',
		cta_button_wrapper_classname: attributes.hero_include_second_cta
			? 'flex-column flex-lg-row ' + contentColumnPosition
			: '',
		cta_button_visibility_classname: ctaVisibility
			? Object.values( ctaVisibility ).join( ' ' )
			: '',
		cta_button_offer_terms_text: 'Offer terms:',
		cta_button_subtext_classname: attributes.cta_button_offer_details_text ? 'underline' : '',
		cta_button_mice_inline_styles: attributes.cta_button_hero_mice_type_colour?.hex
			? `style="color:${ attributes.cta_button_hero_mice_type_colour.hex };"`
			: '',
		second_cta_inline_style: attributes.hero_second_cta_max_width
			? `style="max-width: ${ attributes.hero_second_cta_max_width };'`
			: '',
		second_cta_visibility_classname: secondCtaVisibility
			? Object.values( secondCtaVisibility ).join( ' ' )
			: '',
		second_cta_subtext_classname: attributes.hero_second_cta_offer_details_text
			? 'underline'
			: '',
		second_cta_mice_inline_styles: attributes.hero_second_cta_hero_mice_type_colour
			? `style="color: ${ attributes.hero_second_cta_hero_mice_type_colour.hex };"`
			: '',
		hero_label_colour_copy: attributes.hero_label_colour_copy,
		hero_label_star_review: attributes.hero_label_star_review,
		hero_labels_with_icons: attributes.hero_labels_with_icons
			? attributes.hero_labels_with_icons.map( ( icon ) => {
					icon.image_label_inline_styles = icon.label_colour
						? `style="color: ${ icon.label_colour.hex };"`
						: 'no-style';
					return icon;
			  } )
			: [],
	};

	return additionalTemplateData;
};
