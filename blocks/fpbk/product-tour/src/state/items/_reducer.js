import { nanoid } from 'nanoid';
import * as actions from './_actions';
import { emptyLinkObject } from 'scripts/components/EditorControls/components/universal/_Link';
import { emptyImageObject } from 'scripts/components/EditorControls/components/universal/_Image';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.ADD_ITEM:
			return [
				...state,
				{
					product_tour_item_nav_title: '',
					product_tour_item_title: '',
					product_tour_item_description: '',
					product_tour_item_link: emptyLinkObject,
					product_tour_item_video_id: '',
					product_tour_item_watch_video_label: 'Watch video',
					product_tour_item_cta: emptyLinkObject,
					product_tour_item_cta_text:
						'Try It Free for 30 Days. No credit card required. Cancel anytime.',
					product_tour_item_image: emptyImageObject,
					product_tour_item_mobile_image: emptyImageObject,
					key: `product_tour_item_${ nanoid() }`,
				},
			];

		case actions.REMOVE_ITEM:
			const stateWithRemoved = [ ...state ];
			stateWithRemoved.splice( action.index, 1 );
			return stateWithRemoved;

		case actions.EDIT_ITEM_NAV_TITLE:
			return editAtIndex( 'product_tour_item_nav_title' );

		case actions.EDIT_ITEM_TITLE:
			return editAtIndex( 'product_tour_item_title' );

		case actions.EDIT_ITEM_DESCRIPTION:
			return editAtIndex( 'product_tour_item_description' );

		case actions.EDIT_ITEM_LINK:
			return editAtIndex( 'product_tour_item_link' );

		case actions.EDIT_ITEM_IMAGE:
			return editAtIndex( 'product_tour_item_image' );

		case actions.EDIT_ITEM_MOBILE_IMAGE:
			return editAtIndex( 'product_tour_item_mobile_image' );

		case actions.EDIT_ITEM_VIDEO_ID:
			return editAtIndex( 'product_tour_item_video_id' );

		case actions.EDIT_ITEM_WATCH_VIDEO_LABEL:
			return editAtIndex( 'product_tour_item_watch_video_label' );

		case actions.EDIT_ITEM_CTA:
			return editAtIndex( 'product_tour_item_cta' );

		case actions.EDIT_ITEM_CTA_TEXT:
			return editAtIndex( 'product_tour_item_cta_text' );

		case actions.MOVE_ITEM_LEFT:
			const movedLeftState = [ ...state ];
			const previousItem = movedLeftState[ action.index - 1 ];
			movedLeftState[ action.index - 1 ] = movedLeftState[ action.index ];
			movedLeftState[ action.index ] = previousItem;
			return movedLeftState;

		case actions.MOVE_ITEM_RIGHT:
			const movedRightState = [ ...state ];
			const nextItem = movedRightState[ action.index + 1 ];
			movedRightState[ action.index + 1 ] = movedRightState[ action.index ];
			movedRightState[ action.index ] = nextItem;
			return movedRightState;

		default:
			return state;
	}
};
