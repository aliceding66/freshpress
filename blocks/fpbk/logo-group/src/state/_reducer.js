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
		case actions.REMOVE_LOGO:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.ADD_LOGO:
			return [
				...state,
				{
					logo_type: 'svg',
					logo_image: emptyImageObject,
					logo_svg: emptyImageObject,
					adjust_logo_size: 0,
					decrease_logo_size: 0,
					increase_logo_size: 0,
					key: `logo_${ nanoid() }`,
				},
			];

		case actions.EDIT_LOGO_IMAGE:
			return editAtIndex( 'logo_image' );

		case actions.EDIT_LOGO_SVG:
			return editAtIndex( 'logo_svg' );

		case actions.EDIT_LOGO_TYPE:
			return editAtIndex( 'logo_type' );

		case actions.EDIT_ADJUST_LOGO_SIZE:
			return editAtIndex( 'adjust_logo_size' );

		case actions.EDIT_DECREASE_LOGO_SIZE:
			return editAtIndex( 'decrease_logo_size' );

		case actions.EDIT_INCREASE_LOGO_SIZE:
			return editAtIndex( 'increase_logo_size' );

		case actions.MOVE_LOGO_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_LOGO_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		case actions.SLICE_TO_LIMIT:
			return state.slice( 0, 8 );

		default:
			return state;
	}
};
