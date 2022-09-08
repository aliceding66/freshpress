import { nanoid } from 'nanoid';
import * as actions from './_actions';
import { emptyFileObject } from 'scripts/components/EditorControls/components/universal/_File';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_FILE:
			return [
				...state,
				{
					download_type: 'url',
					url: '',
					file: emptyFileObject,
					key: `file_${ nanoid() }`,
				},
			];

		case actions.REMOVE_FILE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_FILE_DOWNLOAD_TYPE:
			return editAtIndex( 'download_type' );

		case actions.EDIT_FILE_URL:
			return editAtIndex( 'url' );

		case actions.EDIT_FILE_FILE:
			return editAtIndex( 'file' );

		case actions.MOVE_FILE_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_FILE_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
