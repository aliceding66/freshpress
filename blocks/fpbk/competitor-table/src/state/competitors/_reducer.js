import { nanoid } from 'nanoid';
import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_COMPETITOR:
			return [
				...state,
				{
					key: `competitor_${ nanoid() }`,
					has_logo: false,
					name: '',
					logo: '',
					screenshot: '',
					mobile_screenshot: '',
					features: [ ...Array( action.featuresNumber ).keys() ].map( () => ( {
						key: `competitor-feature_${ nanoid() }`,
						text: '',
						checkmark: false,
						crossmark: false,
					} ) ),
				},
			];

		case actions.COMPETITOR_REMOVE:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.COMPETITOR_EDIT_HAS_LOGO:
			return editAtIndex( 'has_logo' );

		case actions.COMPETITOR_EDIT_LOGO:
			return editAtIndex( 'logo' );

		case actions.COMPETITOR_EDIT_NAME:
			return editAtIndex( 'name' );

		case actions.COMPETITOR_EDIT_SCREENSHOT:
			return editAtIndex( 'screenshot' );

		case actions.COMPETITOR_EDIT_MOBILE_SCREENSHOT:
			return editAtIndex( 'mobile_screenshot' );

		case actions.COMPETITOR_MOVE_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.COMPETITOR_MOVE_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
