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
		case actions.ADD_TOPIC:
			return [
				...state,
				{
					icons_list_topic_title: '',
					icons_list_topic_text: '',
					icons_list_topic_icon: emptyImageObject,
					key: `topic_${ nanoid() }`,
				},
			];

		case actions.REMOVE_TOPIC:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_TOPIC_TITLE:
			return editAtIndex( 'icons_list_topic_title' );

		case actions.EDIT_TOPIC_TEXT:
			return editAtIndex( 'icons_list_topic_text' );

		case actions.EDIT_TOPIC_ICON:
			return editAtIndex( 'icons_list_topic_icon' );

		case actions.MOVE_TOPIC_UP:
			const movedUpState = [ ...state ];
			const previousItem = movedUpState[ action.index - 1 ];
			movedUpState[ action.index - 1 ] = movedUpState[ action.index ];
			movedUpState[ action.index ] = previousItem;
			return movedUpState;

		case actions.MOVE_TOPIC_DOWN:
			const movedDownState = [ ...state ];
			const nextItem = movedDownState[ action.index + 1 ];
			movedDownState[ action.index + 1 ] = movedDownState[ action.index ];
			movedDownState[ action.index ] = nextItem;
			return movedDownState;

		default:
			return state;
	}
};
