import { CheckboxControl, ToggleControl } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Choice: True / False".
 */
export default function ( props ) {
	const name = props.name ? props.name : null;
	let attribute = {};
	if ( name !== null ) {
		attribute = getAttributeFromBlockStore( name );
	}

	const {
		// eslint-disable-next-line no-unused-vars
		name: tmpName = null,
		// eslint-disable-next-line no-unused-vars
		type: tmpType = null,
		instructions = attribute?.instructions,
		label = attribute?.label,
		value = getAttributeValueFromContext( name ),
		...restProps
	} = props;

	let { ui = attribute?.ui } = props;
	if ( isNaN( Number( ui ) ) ) {
		ui = 1;
	}

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ ui > 0 && (
				<ToggleControl
					{ ...restProps }
					checked={ value }
					label={ label }
					help={ instructions }
					onChange={
						props.onChange ? props.onChange : getDefaultOnChangeFromContext( name )
					}
				/>
			) }
			{ ( ui < 1 || Number( ui ) < 1 ) && (
				<CheckboxControl
					{ ...restProps }
					checked={ value }
					label={ label }
					help={ instructions }
					onChange={
						props.onChange ? props.onChange : getDefaultOnChangeFromContext( name )
					}
				/>
			) }
		</EditorControls.Special.ConditionalLogic>
	);
}
