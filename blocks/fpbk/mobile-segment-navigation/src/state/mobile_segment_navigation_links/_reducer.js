import { nanoid } from 'nanoid';
import * as actions from './_actions';
import { emptyLinkObject } from 'scripts/components/EditorControls/components/universal/_Link';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_MOBILE_SEGMENT_NAVIGATION_LINK:
			return [
				...state,
				{
					mobile_segment_navigation_link: emptyLinkObject,
					key: `mobile_segment_navigation_link_${ nanoid() }`,
				},
			];

		case actions.REMOVE_MOBILE_SEGMENT_NAVIGATION_LINK:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_MOBILE_SEGMENT_NAVIGATION_LINK:
			return editAtIndex( 'mobile_segment_navigation_link' );

		case actions.MOVE_MOBILE_SEGMENT_NAVIGATION_LINK_UP:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_MOBILE_SEGMENT_NAVIGATION_LINK_DOWN:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
