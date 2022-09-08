import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { BaseControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import Template from 'scripts/components/_Template';
import SignupFormTemplate from './components/_SignupFormTemplate';
import blockTemplate from '../templates/block.mustache';
import heroCtas from '../templates/hero-ctas.mustache';
import { templateString as heroImageLabelPartial } from '../templates/hero-image-label.mustache';
import generateTemplateData from './utlis/_generateTemplateData';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const decreaseVerticalPaddingClass = attributes.decrease_vertical_padding
		? 'py-0'
		: 'pt-2 pt-lg-4 pb-lg-5';

	const blockProps = useBlockProps( {
		className: `hero ${ decreaseVerticalPaddingClass } ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const additionalTemplateData = generateTemplateData(
		heroTemplateData, // eslint-disable-line no-undef
		attributes,
		blockProps?.id
	);
	const templateData = { ...heroTemplateData, ...additionalTemplateData }; // eslint-disable-line no-undef
	const isCenteredWithSsoTheme = blockProps?.className.includes( 'is-style-centered-with-sso' );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Text
						isSimple
						name="hero_content_max_width"
						placeholder={ __( '200px, 50% etc.', 'freshpress-website' ) } // eslint-disable-line @wordpress/i18n-translator-comments
					/>
					{ isCenteredWithSsoTheme && (
						<EditorControls.ColourPicker name="hero_content_background_color" />
					) }
					<EditorControls.ColourPicker name="hero_label_colour" />
					<EditorControls.TrueFalse
						label="Enable Star Review"
						name="hero_label_star_review"
					/>
					<EditorControls.TrueFalse name="hero_label_colour_copy" />
					<EditorControls.Acf.Repeater
						name="hero_labels_with_icons"
						buttonLabel={ __( 'Add Image Label', 'freshpress-website' ) }
					/>
					<EditorControls.ColourPicker name="headline_colour" />
					<EditorControls.Select name="headline_mobile_size" />
					<EditorControls.Select name="headline_tablet_size" />
					<EditorControls.Select name="headline_desktop_size" />
					<EditorControls.TrueFalse name="decrease_vertical_padding" />
					<EditorControls.ColourPicker name="text_colour" />
					<EditorControls.TrueFalse
						label={ __( 'Hide Text on Mobile', 'freshpress-website' ) }
						name="text_mobile_visibility"
					/>
					<EditorControls.Acf.Repeater name="images" />
				</PanelBody>
				<PanelBody
					initialOpen={ true }
					title={ __( 'Interactivity', 'freshpress-website' ) }
				>
					<EditorControls.TrueFalse name="include_cta_button" />
					<EditorControls.Acf.Group name="cta_button" />
					<EditorControls.TrueFalse name="hero_include_second_cta" />
					<EditorControls.Acf.Group name="hero_second_cta" />
					<EditorControls.TrueFalse name="include_signup_form" />
					{ attributes.include_signup_form === true && (
						// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
						<BaseControl
							label={
								<strong style={ { lineHeight: '2rem' } }>
									{ __( 'Signup form', 'freshpress-website' ) }
								</strong>
							}
						>
							<EditorControls.TrueFalse name="signup_form_include_default_terms_of_service" />
							<EditorControls.ColourPicker name="signup_form_hero_terms_of_service_colour" />
							<EditorControls.Checkbox name="signup_form_visibility" />
						</BaseControl>
					) }
					<EditorControls.TrueFalse name="hero_include_pardot_form" />
					{ attributes.hero_include_pardot_form === true && (
						// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
						<BaseControl
							label={
								<strong style={ { lineHeight: '2rem' } }>
									{ __( 'Pardot form', 'freshpress-website' ) }
								</strong>
							}
						>
							<EditorControls.Text name="pardot_form_url" />
							<EditorControls.Number name="pardot_form_iframe_width" />
							<EditorControls.Text name="pardot_form_form_name" />
							<EditorControls.Special.ModalPicker
								label={ __( 'Select Thank You Modal', 'freshpress-website' ) }
								name="pardot_form_thank_you_modal_id"
								emptyLabel="No Thank You modal selected"
							/>
						</BaseControl>
					) }
					<EditorControls.TrueFalse name="hero_include_hero_search" />
				</PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div>
					<Template
						template={ blockTemplate }
						attributes={ templateData }
						partials={ {
							hero_image_label: heroImageLabelPartial,
						} }
						components={ {
							hero_label: (
								<EditorControls.RichText
									isSimple
									name="hero_label"
									placeholder={ __(
										'Insert Hero Label Text',
										'freshpress-website'
									) }
								/>
							),
							headline: (
								<EditorControls.RichText
									isSimple
									name="headline"
									placeholder={ __( 'Insert Headline', 'freshpress-website' ) }
								/>
							),
							text: (
								<EditorControls.RichText
									isSimple
									name="text"
									placeholder={ __( 'Insert Description', 'freshpress-website' ) }
								/>
							),
						} }
					/>
					{ attributes.include_signup_form === true && (
						<SignupFormTemplate
							attributes={ { ...attributes, ...additionalTemplateData } }
						/>
					) }
					{ attributes.include_cta_button === true && (
						<Template
							template={ heroCtas }
							attributes={ { ...attributes, ...additionalTemplateData } }
						/>
					) }
					{ attributes.hero_include_pardot_form === true && (
						<InnerBlocks
							template={ [
								[
									'fpbk/pardot-form',
									{
										pardot_form_url: attributes.pardot_form_url,
										pardot_form_iframe_width:
											attributes.pardot_form_iframe_width,
										pardot_form_form_name: attributes.pardot_form_form_name,
									},
								],
							] }
							templateLock="all"
						/>
					) }
					{ attributes.hero_include_hero_search === true && (
						<div className="hero__search-content d-flex flex-wrap w-100 p-2 mx-auto ml-md-0">
							<div className="hero__search-input-container w-100 position-relative">
								<EditorControls.RichText
									isSimple
									className="st-default-search-input form-control hero-search__input pl-5"
									name="hero_search_input_placeholder_text"
									placeholder={ __(
										'Insert Search Input Placeholder',
										'freshpress-website'
									) }
								/>
							</div>
						</div>
					) }
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
