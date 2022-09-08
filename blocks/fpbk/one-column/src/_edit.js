import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `one-column ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					className={ blockProps.className }
					template={ blockTemplate }
					attributes={ { ...attributes } }
					components={ {
						one_column_title: (
							<EditorControls.RichText
								isSimple
								name="one_column_title"
								placeholder={ __( 'Insert title', 'freshpress-website' ) }
							/>
						),
						one_column_description: (
							<EditorControls.RichText
								name="one_column_description"
								placeholder={ __( 'Insert description', 'freshpress-website' ) }
							/>
						),
						one_column_image: (
							<EditorControls.Image
								inline
								name="one_column_image"
								className="one-column__image d-block mx-auto h-auto"
							/>
						),
						one_column_cta: (
							<EditorControls.Link
								inline
								className="btn btn-white mb-5"
								name="one_column_cta"
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
