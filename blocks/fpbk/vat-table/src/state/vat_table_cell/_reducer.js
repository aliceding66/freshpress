import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_TABLE:
			return [
				...state,
				{
					vat_table_cell__title: '',
					vat_table_cell__text: '',
					key: `table_${ nanoid() }`,
				},
			];

		case actions.REMOVE_TABLE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( -1 );
			return stateWithRemoved;

		case actions.EDIT_TABLE_TITLE:
			return editAtIndex( 'vat_table_cell__title' );

		case actions.EDIT_TABLE_TEXT:
			return editAtIndex( 'vat_table_cell__text' );

		case actions.MOVE_TABLE_UP:
			const movedUpState = [ ...state ];
			const previousItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = previousItem;
			return movedUpState;

		case actions.MOVE_TABLE_DOWN:
			const movedDownState = [ ...state ];
			const nextItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = nextItem;
			return movedDownState;

		default:
			return state;
	}
};
