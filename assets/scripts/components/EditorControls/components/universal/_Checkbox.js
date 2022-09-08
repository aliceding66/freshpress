import { BaseControl, PanelBody } from '@wordpress/components';
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
		choices = attribute?.choices,
		instructions = attribute?.instructions,
		label = attribute?.label,
		value = getAttributeValueFromContext( name ),
	} = props;

	const onChange = props.onChange ? props.onChange : getDefaultOnChangeFromContext( name );

	const checkboxes = Object.entries( choices ).map(
		( [ currentChoiceValue, currentChoiceLabel ], index ) => {
			return (
				<EditorControls.TrueFalse
					key={ `label_${ index }` }
					className={ 'my-0' }
					value={ value.includes( currentChoiceValue ) }
					label={ currentChoiceLabel }
					onChange={ ( currentChoiceChecked ) => {
						let newValue = [ ...value ];
						if ( currentChoiceChecked === true ) {
							newValue.push( currentChoiceValue );
						} else {
							newValue = newValue.filter(
								( innerValue ) => innerValue !== currentChoiceValue
							);
						}

						onChange( newValue );
					} }
				/>
			);
		}
	);

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ /* eslint-disable-next-line @wordpress/no-base-control-with-label-without-id */ }
			<BaseControl label={ label } help={ instructions }>
				<PanelBody>{ checkboxes }</PanelBody>
			</BaseControl>
		</EditorControls.Special.ConditionalLogic>
	);
}
