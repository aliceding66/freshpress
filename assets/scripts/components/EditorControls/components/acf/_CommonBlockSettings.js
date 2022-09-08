import { PanelBody } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';

/**
 * @return {JSX.Element} Returns all common block fields.
 */
export default function () {
	return (
		<>
			<PanelBody>
				<EditorControls.Text name="block_settings_tracking_section" />
			</PanelBody>
			<EditorControls.Acf.Accordion name="block_display_options" />
		</>
	);
}
