import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useState } from '@wordpress/element';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import AnimationsRepeater from './components/_AnimationsRepeater';
import AnimationsPlaybackControl, {
	PLAYBACK_STATE_NO_ANIMATION,
} from './components/_AnimationsPlaybackControl';
import animationReducer from './state/animations/_reducer';
import { getTemplateData } from './_utils';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `animate position-relative pb-4 ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ animations, animationDispatch ] = blockStateManager.addReducerManager(
		animationReducer,
		'animations'
	);
	const [ playbackState, setPlaybackState ] = useState( PLAYBACK_STATE_NO_ANIMATION );

	return (
		<EditorControls.Context.Provider
			value={ {
				animations,
				animationDispatch,
				attributes,
				blockName,
				clientId,
				playbackState,
				setAttributes,
				setPlaybackState,
			} }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<AnimationsRepeater />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					attributes={ getTemplateData( attributes, playbackState ) }
					template={ blockTemplate }
					components={ {
						inner_blocks_content: <InnerBlocks />,
						admin_playback_control: <AnimationsPlaybackControl />,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
