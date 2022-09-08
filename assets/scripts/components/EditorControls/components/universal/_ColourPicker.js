import { BaseControl, Button, ColorPicker, Modal } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "jQuery: Color Picker".
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
		default: defaultColour = attribute?.default,
		inline = false,
		isSmall = false,
		instructions = attribute?.instructions,
		label = attribute?.label,
		value = getAttributeValueFromContext( name, {} ),
		...restProps
	} = props;
	const onChange = props.onChange ? props.onChange : getDefaultOnChangeFromContext( name );
	const defaultColorObject = { hex: defaultColour ? defaultColour : '#ffffff' };

	// A tweak to force re-load ColorPicker component to use cleared colour.
	const [ showColorPicker, setColorPickerState ] = useState( true );
	useEffect( () => {
		if ( showColorPicker === false ) {
			setColorPickerState( true );
		}
	}, [ showColorPicker ] );
	const reloadColorPicker = () => {
		setColorPickerState( false );
	};
	const [ modalOpened, setModalOpened ] = useState( false );
	const openModal = () => {
		setModalOpened( true );
	};
	const closeModal = () => {
		setModalOpened( false );
	};

	const ColourPickerContent = () => (
		//eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
		<BaseControl label={ label } help={ instructions }>
			{ showColorPicker === true && value.hex !== '' && (
				<ColorPicker
					{ ...restProps }
					color={ value ? value : defaultColorObject }
					onChangeComplete={ onChange }
				/>
			) }
			<EditorControls.TrueFalse
				label={ __( 'No colour', 'freshpress-website' ) }
				value={ value.hex === '' || value === '' }
				onChange={ ( isTransparent ) => {
					if ( isTransparent ) {
						onChange( { hex: '' } );
					} else {
						onChange( defaultColorObject );
					}
				} }
			/>
			<Button
				isSecondary
				isSmall
				text={ __( 'Clear', 'freshpress-website' ) }
				onClick={ () => {
					onChange( defaultColorObject );
					reloadColorPicker();
				} }
			/>
		</BaseControl>
	);

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ inline === true && (
				<Button
					isPrimary
					isSmall={ isSmall }
					icon="color-picker"
					showTooltip={ true }
					title={ `${ __( 'Pick', 'freshpress-website' ) }: ${ label }` }
					onClick={ openModal }
				/>
			) }

			{ inline === true && modalOpened === true && (
				<Modal
					style={ { width: '500px', height: '600px' } }
					title={ __( 'Insert/edit colour', 'freshpress-website' ) }
					onRequestClose={ closeModal }
				>
					<ColourPickerContent />
					<Button
						isPrimary
						text={ __( 'Close modal', 'freshpress-website' ) }
						onClick={ closeModal }
					/>
				</Modal>
			) }

			{ inline === false && <ColourPickerContent /> }
		</EditorControls.Special.ConditionalLogic>
	);
}
