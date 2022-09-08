import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_CONTACT_LINK:
			return [
				...state,
				{
					type: 'mailto',
					label: '',
					value: '',
					key: `contact_link_${ nanoid() }`,
				},
			];

		case actions.REMOVE_CONTACT_LINK:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_CONTACT_LINK_TYPE:
			return editAtIndex( 'type' );

		case actions.EDIT_CONTACT_LINK_LABEL:
			return editAtIndex( 'label' );

		case actions.EDIT_CONTACT_LINK_VALUE:
			return editAtIndex( 'value' );

		case actions.MOVE_CONTACT_LINK_UP:
			const movedUpState = [ ...state ];
			const leftItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = leftItem;
			return movedUpState;

		case actions.MOVE_CONTACT_LINK_DOWN:
			const movedDownState = [ ...state ];
			const rightItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = rightItem;
			return movedDownState;

		default:
			return state;
	}
};
