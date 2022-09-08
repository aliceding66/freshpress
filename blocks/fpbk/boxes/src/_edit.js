import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from '../../../../assets/scripts/helpers/_fpbk_blocks';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	let alignClass = 'mx-auto';
	if ( attributes?.align === 'right' ) {
		alignClass = ' ml-lg-auto mr-lg-0';
	} else if ( attributes?.align === 'left' ) {
		alignClass = ' mr-lg-auto ml-lg-0';
	}

	const blockProps = useBlockProps( {
		className: `box ${ alignClass } ${ getCommonBlockSettingsClass( attributes ) }`,
		style: attributes.boxes_max_width ? { maxWidth: attributes.boxes_max_width } : {},
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody>
					<EditorControls.Text name="boxes_max_width" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<EditorControls.Special.VariationPicker name={ blockName }>
					<InnerBlocks />
				</EditorControls.Special.VariationPicker>
			</div>
		</EditorControls.Context.Provider>
	);
}
