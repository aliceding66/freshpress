import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import StatAbout from './components/_StatAbout';
import StatTiles from './components/_StatTiles';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `stat-tiles ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, blockStateManager, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<StatTiles />
				<StatAbout />
			</div>
		</EditorControls.Context.Provider>
	);
}
