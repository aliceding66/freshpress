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
		case actions.ADD_COLUMN:
			return [
				...state,
				{
					author_photo: emptyImageObject,
					author_name: '',
					author_title: '',
					testimonial_quote: '',
					key: `topic_${ nanoid() }`,
				},
			];

		case actions.REMOVE_COLUMN:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_COLUMN_AUTHOR_PHOTO:
			return editAtIndex( 'author_photo' );

		case actions.EDIT_COLUMN_AUTHOR_NAME:
			return editAtIndex( 'author_name' );

		case actions.EDIT_COLUMN_AUTHOR_TITLE:
			return editAtIndex( 'author_title' );

		case actions.EDIT_COLUMN_TESTIMONIAL_QUOTE:
			return editAtIndex( 'testimonial_quote' );

		case actions.MOVE_COLUMN_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_COLUMN_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
