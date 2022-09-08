import { Panel, PanelBody } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';
import { getEditorControlsComponentByType, getAttributeFromBlockStore } from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component only for ACF field with type "Layout: Accordion".
 */
export default function ( props ) {
	const { name } = props;
	const { label, fields = [] } = getAttributeFromBlockStore( name );

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			<Panel>
				<PanelBody title={ label } initialOpen={ false }>
					{ fields.map( ( fieldName, index ) => {
						const attribute = getAttributeFromBlockStore( fieldName );
						const { original_type: originalType, type = '' } = attribute;
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
				</PanelBody>
			</Panel>
		</EditorControls.Special.ConditionalLogic>
	);
}
