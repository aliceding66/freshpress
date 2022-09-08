import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import BackgroundImages from './components/BackgroundImages';
import ReversedCorners from './components/ReversedCorners';
import Styles from './components/Styles';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `position-relative w-auto px-3 ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( { id: generateBlockId( blockName ) } );
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, setAttributes, blockName, blockProps } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.ColourPicker name="background_colour" disableAlpha />
				</PanelBody>
				<EditorControls.Acf.Accordion name="background_images" />
				<EditorControls.Acf.Accordion name="reversed_corners" />
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Styles />
				<div
					className=" position-absolute flexible-colour-background__background-wrapper"
					style={ { zIndex: '0' } }
				>
					<ReversedCorners />
					<BackgroundImages />
				</div>
				<InnerBlocks />
			</div>
		</EditorControls.Context.Provider>
	);
}
