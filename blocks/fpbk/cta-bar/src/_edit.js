import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `cta-bar container-fluid d-flex ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ { ...attributes } }
					components={ {
						copy: <EditorControls.RichText name="copy" multiline="p" />,
						cta: (
							<EditorControls.Link
								inline
								className="box__cta btn btn-cta-green"
								name="cta"
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
