import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import fullscreenPartial from '../templates/fullscreen.partial.mustache';
import inlinePartial from '../templates/inline.partial.mustache';
import formFullscreenPartialTemplate from '../templates/form/fullscreen.partial.mustache';
import formInlinePartialTemplate from '../templates/form/inline.partial.mustache';
import { templateString as formSsoPartialTemplate } from '../templates/form/sso.partial.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const isInlineTheme =
		attributes?.className && attributes.className.includes( 'is-style-inline' );

	const blockProps = useBlockProps( {
		className: `sign-up py-4 px-3 p-md-3 d-flex flex-column align-items-center justify-content-center ${ getCommonBlockSettingsClass(
			attributes
		) }${ isInlineTheme ? 'min-vh-100' : '' }`,
	} );

	const templateAttributes = {
		...attributes,
		...signUpTemplateData, //eslint-disable-line no-undef
		is_inline_theme: isInlineTheme,
	};

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ isInlineTheme ? inlinePartial : fullscreenPartial }
					attributes={ templateAttributes }
					components={ {
						heading: (
							<EditorControls.RichText
								isSimple
								className="sign-up__heading"
								name="heading"
								placeholder={ __( 'Insert heading', 'freshpress-website' ) }
							/>
						),
						subscribe_form: (
							<>
								<div className="form-group sign-up__form-group sign-up__form-email mb-md-2 position-relative">
									<EditorControls.RichText
										isSimple
										className="form-control shadow-none text-left text-muted"
										name="sign_up_form_email_placeholder_text"
										placeholder={ __(
											'Insert email placeholder',
											'freshpress-website'
										) }
									/>
								</div>
								<div className="form-group sign-up__form-group sign-up__form-btn mt-4 mt-md-2 mb-2">
									<EditorControls.RichText
										isSimple
										className="btn btn-cta-green btn-block btn-lg sign-up__submit"
										name="sign_up_form_submit_button_text"
										placeholder={
											// eslint-disable-next-line no-undef
											signUpTemplateData?.labels.default_submit_text
										}
									/>
								</div>
							</>
						),
						sub_heading: (
							<EditorControls.RichText
								isSimple
								className="sign-up__sub-heading"
								name="sub_heading"
								placeholder={ __( 'Insert subheading', 'freshpress-website' ) }
							/>
						),
						already_registered_text: (
							<EditorControls.RichText
								name="already_registered_text"
								placeholder={ __(
									'Insert already registered',
									'freshpress-website'
								) }
							/>
						),
						security_safeguards_link: (
							<EditorControls.Link
								inline
								className="sign-up__security-link mt-3"
								name="security_safeguards_link"
							/>
						),
						admin_form: (
							<Template
								template={
									isInlineTheme
										? formInlinePartialTemplate
										: formFullscreenPartialTemplate
								}
								attributes={ templateAttributes }
								partials={ {
									partial__form_sso: formSsoPartialTemplate,
								} }
								components={ {
									admin_form_input_fields: (
										<>
											<div className="form-group sign-up__form-group sign-up__form-email mb-md-2 position-relative">
												<EditorControls.RichText
													isSimple
													className="form-control shadow-none text-left text-muted"
													name="sign_up_form_email_placeholder_text"
													placeholder={ __(
														'Insert email placeholder',
														'freshpress-website'
													) }
												/>
											</div>
											<div className="form-group sign-up__form-group sign-up__form-password mb-md-2 position-relative">
												<EditorControls.RichText
													isSimple
													className="form-control shadow-none text-left text-muted"
													name="sign_up_form_password_placeholder_text"
													placeholder={ __(
														'Insert password placeholder',
														'freshpress-website'
													) }
												/>
											</div>
										</>
									),
									admin_form_tos: (
										<div className="sign-up__policy-privacy position-relative mb-2 pt-1 pb-1 mt-4">
											<input
												type="checkbox"
												className="form-control-checkbox position-absolute"
											/>
											<EditorControls.RichText
												name="privacy_policy_text"
												placeholder={ __(
													'Insert privacy policy',
													'freshpress-website'
												) }
											/>
										</div>
									),
									admin_form_submit: (
										<div className="form-group sign-up__form-group sign-up__form-btn mt-4 mt-md-2 mb-2">
											<EditorControls.RichText
												isSimple
												className="btn btn-cta-green btn-block btn-lg sign-up__submit"
												name="sign_up_form_submit_button_text"
												placeholder={
													// eslint-disable-next-line no-undef
													signUpTemplateData?.labels.default_submit_text
												}
											/>
										</div>
									),
								} }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
