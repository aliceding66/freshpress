import { store as blockEditorStore } from '@wordpress/block-editor';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext, getAttributeValueFromContext } from '../../_helpers';
import { useSelect } from '@wordpress/data';

export default function ( props ) {
	const {
		name,
		clientId = getEditorControlsContext()?.clientId,
		value = getAttributeValueFromContext( name ),
		canSelectEmpty = true,
		emptyLabel = 'No modal selected',
		...restProps
	} = props;
	const allModals = {};

	if ( canSelectEmpty ) {
		allModals.no_modal = emptyLabel;
	}

	const pageBlocks = useSelect( ( select ) => select( blockEditorStore ).getBlocks(), [
		clientId,
	] );

	const getModals = ( blockObject ) => {
		if ( blockObject ) {
			if ( blockObject.name === 'fpbk/modal' ) {
				allModals[
					blockObject.attributes.id
				] = `${ blockObject.attributes.modal_title } ID: ${ blockObject.attributes.id }`;
			}

			if ( blockObject.innerBlocks.length ) {
				blockObject.innerBlocks.forEach( ( innerBlock ) => getModals( innerBlock ) );
			}
		}
	};

	pageBlocks.forEach( ( block ) => getModals( block ) );

	return (
		<EditorControls.Select
			{ ...restProps }
			value={ value }
			name={ name }
			choices={ allModals }
		/>
	);
}
