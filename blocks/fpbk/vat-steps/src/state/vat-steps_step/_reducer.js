import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_STEP:
			return [
				...state,
				{
					vat_steps_step__title: '',
					vat_steps_step__text: '',
					key: `step_${ nanoid() }`,
				},
			];

		case actions.REMOVE_STEP:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( -1 );
			return stateWithRemoved;

		case actions.EDIT_STEP_TITLE:
			return editAtIndex( 'vat_steps_step__title' );

		case actions.EDIT_STEP_TEXT:
			return editAtIndex( 'vat_steps_step__text' );

		case actions.MOVE_STEP_UP:
			const movedUpState = [ ...state ];
			const previousItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = previousItem;
			return movedUpState;

		case actions.MOVE_STEP_DOWN:
			const movedDownState = [ ...state ];
			const nextItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = nextItem;
			return movedDownState;

		default:
			return state;
	}
};
