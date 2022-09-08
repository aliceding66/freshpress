import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `partner-feature d-flex justify-content-center ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select name="partner_feature_font_size" />
					<EditorControls.Select name="partner_feature_block_position" />
				</PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						partner_feature_image: (
							<EditorControls.Image
								inline
								name="partner_feature_image"
								className="partner-feature__image d-none d-sm-inline"
							/>
						),
						partner_feature_text: (
							<EditorControls.RichText
								name="partner_feature_text"
								placeholder={ __( 'Insert text', 'freshpress-website' ) }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
