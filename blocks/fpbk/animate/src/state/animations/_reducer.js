import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_ANIMATION:
			return [
				...state,
				{
					animation: '',
					trigger: 'page_load',
					delay: 0,
					offscreen_reset: false,
					key: `animation_${ nanoid() }`,
				},
			];

		case actions.REMOVE_ANIMATION:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_ANIMATION_ANIMATION:
			return editAtIndex( 'animation' );

		case actions.EDIT_ANIMATION_TRIGGER:
			return editAtIndex( 'trigger' );

		case actions.EDIT_ANIMATION_DELAY:
			return editAtIndex( 'delay' );

		case actions.EDIT_ANIMATION_OFFSCREEN_RESET:
			return editAtIndex( 'offscreen_reset' );

		default:
			return state;
	}
};
