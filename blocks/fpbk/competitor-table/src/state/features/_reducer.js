import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_FEATURE:
			return [
				...state,
				{
					key: `feature_${ nanoid() }`,
					name: '',
				},
			];

		case actions.FEATURE_REMOVE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.FEATURE_EDIT_NAME:
			return editAtIndex( 'name' );

		case actions.FEATURE_MOVE_UP:
			const movedUpState = [ ...state ];
			const previousItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = previousItem;
			return movedUpState;

		case actions.FEATURE_MOVE_DOWN:
			const movedDownState = [ ...state ];
			const nextItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = nextItem;
			return movedDownState;

		default:
			return state;
	}
};
