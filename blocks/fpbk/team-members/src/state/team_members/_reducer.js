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
		case actions.ADD_TEAM_MEMBER:
			return [
				...state,
				{
					image: emptyImageObject,
					name: '',
					position: '',
					description: '',
					key: `topic_${ nanoid() }`,
				},
			];

		case actions.REMOVE_TEAM_MEMBER:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_TEAM_MEMBER_IMAGE:
			return editAtIndex( 'image' );

		case actions.EDIT_TEAM_MEMBER_NAME:
			return editAtIndex( 'name' );

		case actions.EDIT_TEAM_MEMBER_POSITION:
			return editAtIndex( 'position' );

		case actions.EDIT_TEAM_MEMBER_DESCRIPTION:
			return editAtIndex( 'description' );

		case actions.MOVE_TEAM_MEMBER_UP:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_TEAM_MEMBER_DOWN:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
