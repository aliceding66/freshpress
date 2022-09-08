import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `vat-text-image ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	// eslint-disable-next-line no-undef
	const vatTextImageTemplateData = { ...attributes };
	vatTextImageTemplateData.background_attribute = attributes.vat_text_image__background_color?.hex
		? `background-color: ${ attributes.vat_text_image__background_color.hex };`
		: '';

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse
						name="vat_text_image_crop"
						label={ __( 'Remove Image Crop', 'freshpress-website' ) }
					/>
					<EditorControls.ColourPicker
						default="#ecf5fd"
						name="vat_text_image__background_color"
						label={ __( 'Background color', 'freshpress-website' ) }
					/>
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ vatTextImageTemplateData }
					components={ {
						vat_text_image__title: (
							<EditorControls.RichText
								name="vat_text_image__title"
								placeholder={ __( 'Title', 'freshpress-website' ) }
							/>
						),
						vat_text_image__description: (
							<EditorControls.RichText
								name="vat_text_image__description"
								placeholder={ __( 'Description', 'freshpress-website' ) }
							/>
						),
						vat_text_image__image: (
							<EditorControls.Image
								inline
								name="vat_text_image__image"
								className="vat-text-image__image"
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
