import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';
import GridElement from './components/_GridElement';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `freshbookers-grid-bar d-flex flex-wrap ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const FreshbookersGridElements = () => {
		return attributes.freshbookers.map( ( freshbooker, index ) => (
			<GridElement key={ `grid_${ index }` } freshbooker={ freshbooker } index={ index } />
		) );
	};

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<FreshbookersGridElements />
			</div>
		</EditorControls.Context.Provider>
	);
}
