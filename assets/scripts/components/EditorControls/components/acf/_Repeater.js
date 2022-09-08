import { BaseControl, Button, CardDivider } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from '../../../_EditorControls';
import {
	getEditorControlsComponentByType,
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Repeater".
 */
export default function ( props ) {
	const attributeFromBlockStore = getAttributeFromBlockStore( props.name );

	const {
		name,
		label = attributeFromBlockStore?.label,
		instructions = attributeFromBlockStore?.instructions,
		button_label: buttonLabel = attributeFromBlockStore?.button_label,
		max = attributeFromBlockStore?.max,
		sub_fields: fields = attributeFromBlockStore?.sub_fields,
	} = props;

	const repeaterValue = getAttributeValueFromContext( name, [] );
	const defaultOnChange = getDefaultOnChangeFromContext( name );
	const emptyRow = {};
	fields.forEach( ( field ) => {
		if (
			field.default_value === false &&
			typeof field.choices === 'object' &&
			Object.keys( field.choices ).length > 0
		) {
			emptyRow[ field.name ] = Object.keys( field.choices )[ 0 ];
		} else {
			emptyRow[ field.name ] = field.default_value;
		}
	} );

	const toRenderFields = repeaterValue.map( ( fieldValues, rowIndex ) => {
		return (
			<div key={ rowIndex }>
				{ fields.map( ( field ) => {
					const { original_type: originalType, type = '' } = field;
					const fieldType = originalType !== undefined ? originalType : type;
					const ComponentName = getEditorControlsComponentByType( fieldType );
					if ( ComponentName === null ) {
						return (
							<div>
								Missing EditorControls component definition for:{ ' ' }
								<strong>{ fieldType }</strong>
							</div>
						);
					}
					const {
						name: fieldName,
						// eslint-disable-next-line no-unused-vars
						onChange = null,
						// eslint-disable-next-line no-unused-vars
						value = null,
						...fieldToPass
					} = field;

					return (
						<ComponentName
							{ ...fieldToPass }
							key={ `repeater_${ fieldName }_${ rowIndex }` }
							name={ fieldName }
							onChange={ ( newValue ) => {
								repeaterOnChange( rowIndex, fieldName, newValue );
							} }
							value={ fieldValues[ field.name ] }
						/>
					);
				} ) }
				<div className="block-editor__block-controls">
					{ rowIndex > 0 && (
						<Button
							onClick={ () => {
								repeaterMoveUp( rowIndex );
							} }
							icon="arrow-up-alt2"
						/>
					) }
					<Button
						isSmall
						isDestructive
						onClick={ () => {
							removeRow( rowIndex );
						} }
						icon="no-alt"
					/>
					{ rowIndex < repeaterValue.length - 1 && (
						<Button
							onClick={ () => {
								repeaterMoveDown( rowIndex );
							} }
							icon="arrow-down-alt2"
						/>
					) }
				</div>
				<CardDivider />
			</div>
		);
	} );

	const handleNewRow = () => {
		const newRepeaterValue = [ ...repeaterValue ];
		newRepeaterValue.push( emptyRow );
		defaultOnChange( newRepeaterValue );
	};

	/**
	 * @param {number} rowIndex Index of fields group in repeater.
	 * @param {string} fieldName Field name in group.
	 * @param {*} fieldValue
	 */
	const repeaterOnChange = ( rowIndex, fieldName, fieldValue ) => {
		const newRepeaterValue = [ ...repeaterValue ];

		if ( newRepeaterValue[ rowIndex ] === undefined ) {
			newRepeaterValue[ rowIndex ] = {};
		}

		if ( fieldName !== null ) {
			newRepeaterValue[ rowIndex ][ fieldName ] = fieldValue;
		}
		defaultOnChange( newRepeaterValue );
	};

	/**
	 * @param {number} rowIndex
	 */
	const repeaterMoveUp = ( rowIndex ) => {
		const newRepeaterValue = [ ...repeaterValue ];

		const previousItem = newRepeaterValue[ rowIndex - 1 ];
		newRepeaterValue[ rowIndex - 1 ] = newRepeaterValue[ rowIndex ];
		newRepeaterValue[ rowIndex ] = previousItem;

		defaultOnChange( newRepeaterValue );
	};

	/**
	 * @param {number} rowIndex
	 */
	const repeaterMoveDown = ( rowIndex ) => {
		const newRepeaterValue = [ ...repeaterValue ];

		const previousItem = newRepeaterValue[ rowIndex + 1 ];
		newRepeaterValue[ rowIndex + 1 ] = newRepeaterValue[ rowIndex ];
		newRepeaterValue[ rowIndex ] = previousItem;

		defaultOnChange( newRepeaterValue );
	};

	/**
	 * @param {number} rowIndex Index of fields group in repeater.
	 */
	const removeRow = ( rowIndex ) => {
		const newRepeaterValue = [ ...repeaterValue ];
		newRepeaterValue.splice( rowIndex, 1 );
		defaultOnChange( newRepeaterValue );
	};

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ /* eslint-disable-next-line @wordpress/no-base-control-with-label-without-id */ }
			<BaseControl
				label={ <strong style={ { lineHeight: '2rem' } }>{ label }</strong> }
				help={ instructions }
			>
				<div>
					{ toRenderFields }
					<Button
						isPrimary
						onClick={ () => handleNewRow() }
						text={ buttonLabel || __( 'Add Row', 'freshpress-website' ) }
						disabled={ parseInt( max ) > 0 && repeaterValue.length >= parseInt( max ) }
					/>
				</div>
			</BaseControl>
		</EditorControls.Special.ConditionalLogic>
	);
}
