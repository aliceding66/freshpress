import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { dispatch } = getEditorControlsContext();
	const { action, label, rowIndex, value } = props;

	return (
		<EditorControls.Select
			label={ label }
			choices={ {
				normal: 'Normal',
				medium: 'Medium',
				small: 'Small',
			} }
			value={ value }
			onChange={ ( newValue ) => {
				dispatch( {
					type: action,
					value: newValue,
					rowIndex,
				} );
			} }
		/>
	);
};
