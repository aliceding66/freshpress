import { SelectControl } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} choices
 * @param {string|null} emptyChoice
 * @return {{label: *, value: *}[]} Return choices formatted as options.
 */
const getOptions = ( choices, emptyChoice ) => {
	let options = Object.keys( choices ).map( ( choiceValue ) => ( {
		value: choiceValue,
		label: choices[ choiceValue ],
	} ) );

	if ( emptyChoice ) {
		options = [ { value: '', label: emptyChoice, disabled: true }, ...options ];
	}

	return options;
};

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Choice: Select".
 */
export default function ( props ) {
	const name = props.name ? props.name : null;
	let attribute = {};
	if ( name !== null ) {
		attribute = getAttributeFromBlockStore( name );
	}

	const {
		name: tmpName = null, // eslint-disable-line no-unused-vars
		choices = attribute?.choices,
		emptyChoice = attribute?.emptyChoice,
		instructions = attribute?.instructions,
		label = attribute?.label,
		multiple = attribute?.multiple,
		prefix = '',
		value = getAttributeValueFromContext( name ),
		...restProps
	} = props;

	if ( typeof choices !== 'object' ) {
		// eslint-disable-next-line no-console
		console.error( '<EditorControls.Select /> require "choices" to be an object.' );
	}

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			<SelectControl
				{ ...restProps }
				value={ value }
				label={ label }
				help={ instructions }
				multiple={ !! multiple }
				style={ !! multiple ? { height: 'auto' } : {} }
				onChange={ props.onChange ? props.onChange : getDefaultOnChangeFromContext( name ) }
				options={ getOptions( choices, emptyChoice ) }
				prefix={ prefix !== 'acf' ? prefix : '' }
			/>
		</EditorControls.Special.ConditionalLogic>
	);
}
