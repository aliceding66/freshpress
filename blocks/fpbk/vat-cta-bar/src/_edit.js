import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `vat-cta-bar wide-block my-0 ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const templateData = { ...attributes };
	templateData.background_attribute = attributes.background_color?.hex
		? `background-color: ${ attributes.background_color.hex };`
		: '';

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.ColourPicker default="#0075dd" name="background_color" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						vat_cta_title: (
							<EditorControls.RichText
								name="vat_cta_title"
								placeholder={ __( 'Insert Title', 'freshpress-website' ) }
							/>
						),
						vat_cta_link: (
							<EditorControls.Link
								inline
								className="btn btn-cta-green vat-cta-bar__cta-button font-weight-medium text-nowrap"
								name="vat_cta_link"
							/>
						),
						inner_blocks: <InnerBlocks />,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
