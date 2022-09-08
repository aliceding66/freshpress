import { nanoid } from 'nanoid';
import * as actions from './_actions';
import { emptyImageObject } from 'scripts/components/EditorControls/components/universal/_Image';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_TILE:
			return [
				...state,
				{
					icon_tiles_tile_title: '',
					icon_tiles_tile_description: '',
					icon_tiles_tile_image: emptyImageObject,
					key: `tile_${ nanoid() }`,
				},
			];

		case actions.REMOVE_TILE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_TILE_TITLE:
			return editAtIndex( 'icon_tiles_tile_title' );

		case actions.EDIT_TILE_DESCRIPTION:
			return editAtIndex( 'icon_tiles_tile_description' );

		case actions.EDIT_TILE_IMAGE:
			return editAtIndex( 'icon_tiles_tile_image' );

		case actions.MOVE_TILE_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_TILE_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
