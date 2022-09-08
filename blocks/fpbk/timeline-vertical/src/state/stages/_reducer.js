import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_STAGE:
			return [
				...state,
				{
					key: `topic_${ nanoid() }`,
					date: '',
					title: '',
					description: '',
				},
			];

		case actions.STAGE_REMOVE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.STAGE_EDIT_DATE:
			return editAtIndex( 'date' );

		case actions.STAGE_EDIT_TITLE:
			return editAtIndex( 'title' );

		case actions.STAGE_EDIT_DESCRIPTION:
			return editAtIndex( 'description' );

		case actions.STAGE_MOVE_UP:
			const movedUpState = [ ...state ];
			const previousItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = previousItem;
			return movedUpState;

		case actions.STAGE_MOVE_DOWN:
			const movedDownState = [ ...state ];
			const nextItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = nextItem;
			return movedDownState;

		default:
			return state;
	}
};
