import { Button } from '@wordpress/components';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { dispatch } = getEditorControlsContext();

	const {
		vertical = false,
		movePreviousAction,
		removeAction,
		moveNextAction,
		indexName,
		index,
	} = props;

	return (
		<div
			className={ `block-editor__block-controls  d-inline-flex p-1 rounded shadow-sm bg-white ${
				vertical ? 'flex-column' : 'mb-1'
			}` }
		>
			<Button
				isSmall
				onClick={ () => {
					dispatch( {
						type: movePreviousAction,
						[ indexName ]: index,
					} );
				} }
				icon={ `arrow-${ vertical ? 'up' : 'left' }-alt2` }
			/>
			<Button
				isDestructive
				isSmall
				onClick={ () => {
					dispatch( {
						type: removeAction,
						[ indexName ]: index,
					} );
				} }
				icon="no-alt"
			/>
			<Button
				isSmall
				onClick={ () => {
					dispatch( {
						type: moveNextAction,
						[ indexName ]: index,
					} );
				} }
				icon={ `arrow-${ vertical ? 'down' : 'right' }-alt2` }
			/>
		</div>
	);
};
