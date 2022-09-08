import { RangeControl } from '@wordpress/components';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';
import ConditionalLogic from '../special/_ConditionalLogic';
/**
 * @param {Object} props
 * @return {JSX.Element} Returns component for ACF field with type "Basic: RangeControl".
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
		min = attribute?.min,
		max = attribute?.max,
		step = attribute?.step,
	} = props;

	return (
		<ConditionalLogic name={ name }>
			<RangeControl
				label={ label }
				help={ instructions }
				value={ value }
				onChange={ props.onChange ? props.onChange : getDefaultOnChangeFromContext( name ) }
				min={ min }
				max={ max }
				step={ step }
			/>
		</ConditionalLogic>
	);
}
