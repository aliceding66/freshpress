import * as actions from './_actions';

export default ( state, action ) => {
	switch ( action.type ) {
		case actions.ENABLE_SHARE_ICON:
			const stateWithEnabled = [ ...state ];
			stateWithEnabled.push( action.value );
			return stateWithEnabled;

		case actions.DISABLE_SHARE_ICON:
			return state.filter( ( item ) => item !== action.value );

		case actions.SET_SHARE_ICON_ORDER:
			const newIndex = action.index - 1;
			const stateWithOrderChanged = [ ...state ].filter( ( item ) => item !== action.value );
			stateWithOrderChanged.splice( newIndex, 0, action.value );
			return stateWithOrderChanged;

		default:
			return state;
	}
};
