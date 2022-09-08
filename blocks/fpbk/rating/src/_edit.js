import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { name as blockName } from '../block.json';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `rating rating__wrap_${
			attributes.rating_wrap
		} d-flex justify-content-center py-4 text-center ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	// eslint-disable-next-line no-undef
	const { images, ...restTemplateData } = ratingTemplateData;
	const ratingImage = images[ attributes.rating_image ]
		? images[ attributes.rating_image ]
		: images.white_green;

	return (
		<EditorControls.Context.Provider value={ { blockName, attributes, setAttributes } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select name="rating_wrap" />
					<EditorControls.Select name="rating_image" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					className={ blockProps.className }
					template={ blockTemplate }
					attributes={ {
						...restTemplateData,
						rating_image: ratingImage,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
