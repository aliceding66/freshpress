import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `confirmation-box mx-auto text-center ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						confirmation_box_title: (
							<EditorControls.RichText isSimple name="confirmation_box_title" />
						),
						confirmation_box_primary_message: (
							<EditorControls.RichText
								isSimple
								name="confirmation_box_primary_message"
							/>
						),
						confirmation_box_secondary_message: (
							<EditorControls.RichText
								name="confirmation_box_secondary_message"
								multiline="p"
							/>
						),
						confirmation_box_cta: (
							<EditorControls.Link
								inline
								className="confirmation-box__cta btn btn-cta-green px-4 py-3"
								name="confirmation_box_cta"
							/>
						),
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
