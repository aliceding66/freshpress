import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `nicereply ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	// eslint-disable-next-line no-undef
	const templateData = { ...nicereplyTemplateData, is_editor: true };

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template template={ blockTemplate } attributes={ templateData } />
			</div>
		</EditorControls.Context.Provider>
	);
}
