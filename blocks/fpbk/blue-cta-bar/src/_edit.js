import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `blue-cta-bar text-center text-lg-left ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	// eslint-disable-next-line no-undef
	let imageUrl = blueCtaBarTemplateData.default_image;
	if ( attributes.blue_cta_bar_image?.url ) {
		imageUrl = attributes.blue_cta_bar_image.url;
	}

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Image name="blue_cta_bar_image" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					className={ blockProps.className }
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						blue_cta_bar_title: (
							<EditorControls.RichText
								className="blue-cta-bar__title"
								name="blue_cta_bar_title"
								placeholder={ __( 'Insert title', 'freshpress-website' ) }
							/>
						),
						blue_cta_bar_text: (
							<EditorControls.RichText
								name="blue_cta_bar_text"
								placeholder={ __( 'Insert text', 'freshpress-website' ) }
							/>
						),
						blue_cta_bar_cta: (
							<EditorControls.Link
								inline
								className="btn btn-cta-green blue-cta-bar__cta-button py-2 mb-4 mb-lg-0"
								name="blue_cta_bar_cta"
							/>
						),
						blue_cta_bar_image: (
							<img
								className="blue-cta-bar__image d-inline-block"
								alt=""
								src={ `${ imageUrl }` }
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
