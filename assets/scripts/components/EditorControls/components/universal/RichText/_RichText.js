import { RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store } from '@wordpress/rich-text';
import listItemType from './types/_ListItemType.js';
import listOrderedType from './types/_ListOrderedType.js';
import listUnorderedType from './types/_ListUnorderedType.js';
import EditorControls from '../../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../../_helpers';

let onChangeTimeout;

const typesToAdd = [ listUnorderedType, listOrderedType, listItemType ];

/**
 * Registers types.
 */
const useRegisterFormatTypes = () => {
	typesToAdd.forEach( ( type ) => {
		type.register();
	} );
};

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

	let {
		// eslint-disable-next-line no-unused-vars
		name: tmpName = null,
		disableLocalState = false,
		isSimple = false,
		isExtended = false,
		onChange = attribute?.onChange,
		placeholder = attribute?.instructions,
		updateDelay = 300,
		value = getAttributeValueFromContext( name ),
		...restProps
	} = props;

	const onChangeCallback = onChange ? onChange : getDefaultOnChangeFromContext( name );

	if ( restProps.multiline ) {
		if ( value.indexOf( `<${ restProps.multiline }>` ) !== 0 ) {
			value = `<${ restProps.multiline }>${ value }</${ restProps.multiline }>`;
		}
	}

	const [ stateValue, setStateValue ] = useState( value );

	const presetProps = {
		inlineToolbar: true,
		preserveWhiteSpace: true,
	};
	if ( isSimple ) {
		presetProps.allowedFormats = [];
		presetProps.inlineToolbar = false;
	}
	if ( isExtended ) {
		useRegisterFormatTypes();
		const formatTypes = useSelect( ( select ) => {
			return select( store ).getFormatTypes();
		}, [] );

		presetProps.allowedFormats = formatTypes
			.map( ( e ) => e.name )
			.concat( typesToAdd.map( ( type ) => type.name ) );
	}

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			<RichText
				{ ...restProps }
				{ ...presetProps }
				placeholder={ placeholder }
				value={ disableLocalState ? value : stateValue }
				onChange={ ( newValue ) => {
					if ( disableLocalState ) {
						onChangeCallback( newValue );
					} else {
						clearTimeout( onChangeTimeout );
						setStateValue( newValue );
						onChangeTimeout = setTimeout( () => {
							onChangeCallback( newValue );
						}, updateDelay );
					}
				} }
			/>
		</EditorControls.Special.ConditionalLogic>
	);
}
