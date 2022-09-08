import * as actions from './_actions';

export default ( state, action ) => {
	const editAtIndex = ( fieldName ) => {
		return state.map( ( item, i ) =>
			i === action.index ? { ...item, [ fieldName ]: action.value } : item
		);
	};

	switch ( action.type ) {
		case actions.EDIT_COLUMN_TYPE:
			return editAtIndex( 'type' );

		case actions.EDIT_COLUMN_IMAGE:
			return editAtIndex( 'image' );

		case actions.EDIT_COLUMN_IMAGE_MOBILE_MAX_WIDTH:
			return editAtIndex( 'image_mobile_max_width' );

		case actions.EDIT_COLUMN_IMAGE_ALIGN_TO_GUTTER:
			return editAtIndex( 'align_to_gutter' );

		case actions.EDIT_COLUMN_HEADER:
			return editAtIndex( 'header' );

		case actions.EDIT_COLUMN_BODY:
			return editAtIndex( 'body' );

		case actions.EDIT_COLUMN_SUBTEXT:
			return editAtIndex( 'subtext' );

		case actions.EDIT_COLUMN_CTA:
			return editAtIndex( 'cta' );

		case actions.EDIT_COLUMN_SECONDARY_CTA:
			return editAtIndex( 'secondary_cta' );

		default:
			return state;
	}
};
