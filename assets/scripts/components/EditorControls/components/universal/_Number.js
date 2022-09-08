// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { BaseControl, TextControl } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Text".
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
		instructions = attribute?.instructions,
		label = attribute?.label,
		max = attribute?.max,
		min = attribute?.min,
		step = attribute?.step,
		value = getAttributeValueFromContext( name ),
		...restProps
	} = props;

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ /* eslint-disable-next-line @wordpress/no-base-control-with-label-without-id */ }
			<BaseControl label={ label } help={ instructions }>
				<TextControl
					{ ...restProps }
					type="number"
					value={ value }
					max={ max }
					min={ min }
					step={ step }
					onChange={
						props.onChange ? props.onChange : getDefaultOnChangeFromContext( name )
					}
				/>
			</BaseControl>
		</EditorControls.Special.ConditionalLogic>
	);
}
