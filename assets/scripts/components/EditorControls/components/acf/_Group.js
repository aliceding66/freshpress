import EditorControls from '../../../_EditorControls';
import { getEditorControlsComponentByType, getAttributeFromBlockStore } from '../../_helpers';
import { BaseControl } from '@wordpress/components';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Accordion".
 */
export default function ( props ) {
	const attributeFromBlockStore = getAttributeFromBlockStore( props.name );

	const {
		name,
		label = attributeFromBlockStore?.label,
		instructions = attributeFromBlockStore?.instructions,
		sub_fields: fields = attributeFromBlockStore?.sub_fields,
	} = props;

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ /* eslint-disable-next-line @wordpress/no-base-control-with-label-without-id */ }
			<BaseControl
				label={ <strong style={ { lineHeight: '2rem' } }>{ label }</strong> }
				help={ instructions }
			>
				<div>
					{ fields.map( ( field, index ) => {
						const { original_type: originalType, type = '' } = field;
						const fieldName = `${ name }_${ field.name }`;
						const fieldType = originalType !== undefined ? originalType : type;
						const ComponentName = getEditorControlsComponentByType( fieldType );

						return (
							<EditorControls.Special.ConditionalLogic
								key={ `${ name }_${ index }` }
								name={ fieldName }
							>
								{ ComponentName !== null && <ComponentName name={ fieldName } /> }
								{ ComponentName === null && (
									<p>
										Missing EditorControls field for:{ ' ' }
										<strong>{ fieldType }</strong>
									</p>
								) }
							</EditorControls.Special.ConditionalLogic>
						);
					} ) }
				</div>
			</BaseControl>
		</EditorControls.Special.ConditionalLogic>
	);
}
