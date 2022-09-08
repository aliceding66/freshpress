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
		className: `new-cta-bar wide-block my-0 ${ getCommonBlockSettingsClass( attributes ) }`,
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
					<EditorControls.ColourPicker default="#001a43" name="background_color" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ templateData }
					components={ {
						inner_blocks: <InnerBlocks />,
						cta_link: (
							<EditorControls.Link
								inline
								className="btn btn-cta-green new-cta-bar__cta-button font-weight-medium text-nowrap"
								name="cta_link"
							/>
						),
						cta_after: (
							<EditorControls.RichText
								isSimple
								name="cta_after"
								placeholder={ __( 'Insert text after CTA', 'freshpress-website' ) }
							/>
						),
						images_left: (
							<div className="new-cta-bar__image position-absolute new-cta-bar__image-left">
								<EditorControls.Image
									inline
									className="new-cta-bar__image-left"
									name="images_left"
								/>
							</div>
						),
						images_top_right: (
							<div className="new-cta-bar__image position-absolute new-cta-bar__image-top-right">
								<EditorControls.Image
									inline
									inlineControlsAlign="bottom"
									className="new-cta-bar__image-top-right"
									name="images_top_right"
								/>
							</div>
						),
						images_bottom_right: (
							<div className="new-cta-bar__image position-absolute new-cta-bar__image-bottom-right">
								<EditorControls.Image
									inline
									inlineControlsAlign="top"
									className="new-cta-bar__image-bottom-right"
									name="images_bottom_right"
								/>
							</div>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
