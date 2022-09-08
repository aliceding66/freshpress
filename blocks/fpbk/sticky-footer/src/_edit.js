import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import standardPartial from '../templates/standard.partial.mustache';
import newsletterPartial from '../templates/newsletter.partial.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `sticky-footer sticky-bottom d-flex flex-wrap flex-md-nowrap justify-content-center align-items-center p-2 ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const isNewsletterTheme = blockProps.className.indexOf( 'is-style-newsletter' ) > 0;

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
				<PanelBody initialOpen={ true }>
					{ isNewsletterTheme && (
						<>
							<EditorControls.Text name="pardot_form_url" />
							<EditorControls.Special.ModalPicker
								label="Select Thank You Modal"
								name="pardot_form_thank_you_modal_id"
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ isNewsletterTheme ? newsletterPartial : standardPartial }
					attributes={ attributes }
					components={ {
						text: (
							<EditorControls.RichText
								className="sticky-footer__text mb-2 mb-md-0 text-center text-md-left"
								name="text"
								placeholder={ __( 'Insert text', 'freshpress-website' ) }
							/>
						),
						cta: (
							<EditorControls.Link
								inline
								className="sticky-footer__cta btn btn-cta-green py-2 py-md-3 px-2 px-md-4 mr-2 mx-md-3"
								name="cta"
							/>
						),
						secondary_link: (
							<EditorControls.Link
								inline
								className="sticky-footer__link text-white ml-2 ml-md-0"
								name="secondary_link"
							/>
						),
						pardot_form: (
							<InnerBlocks
								template={ [
									[
										'fpbk/pardot-form',
										{
											pardot_form_url: attributes.pardot_form_url,
											pardot_form_iframe_width: 585,
											pardot_form_form_name: 'Newsletter form',
										},
									],
								] }
								templateLock="all"
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
