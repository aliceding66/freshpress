import { __ } from '@wordpress/i18n';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { dispatch } = getEditorControlsContext();
	const { action, active, columnIndex, rowIndex, src } = props;

	const altTitleAttribute = active
		? __( 'Toggle off', 'freshpress-website' )
		: __( 'Toggle on', 'freshpress-website' );

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
		<img
			alt={ altTitleAttribute }
			title={ altTitleAttribute }
			className="px-2 cursor-pointer"
			src={ src }
			style={ {
				opacity: active === true ? 1 : 0.3,
				minWidth: '45px',
			} }
			onClick={ () => {
				dispatch( {
					type: action,
					value: ! active,
					columnIndex,
					rowIndex,
				} );
			} }
		/>
	);
};
