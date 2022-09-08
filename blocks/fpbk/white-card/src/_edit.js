import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `white-card ${
			attributes.white_card_display_background ? 'white-card-with-secondary-content' : ''
		} ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	// eslint-disable-next-line no-undef
	const templateData = { ...whiteCardTemplateData, ...attributes };

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse name="white_card_display_background" />
					<EditorControls.TrueFalse name="white_card_display_support_contact_info" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ attributes.white_card_display_background && (
					<div className="white-card__secondary-content no-gutters">
						<InnerBlocks />
					</div>
				) }
				<Template
					className={ blockProps.className }
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						white_card_image: (
							<EditorControls.Image
								inline
								name="white_card_image"
								className="white-card__image w-auto h-auto d-block mx-auto mb-5 mb-md-0"
							/>
						),
						white_card_title: (
							<EditorControls.RichText
								name="white_card_title"
								placeholder={ __( 'Insert title', 'freshpress-website' ) }
							/>
						),
						white_card_description: (
							<EditorControls.RichText
								name="white_card_description"
								placeholder={ __( 'Insert description', 'freshpress-website' ) }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
