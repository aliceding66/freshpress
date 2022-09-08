import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.EDIT_STAT_NUMBER:
			return editAtIndex( 'number' );

		case actions.EDIT_STAT_DESCRIPTION:
			return editAtIndex( 'description' );

		default:
			return state;
	}
};
