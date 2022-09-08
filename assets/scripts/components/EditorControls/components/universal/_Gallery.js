import { MediaPlaceholder, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Gallery".
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
		className = '',
		instructions = attribute?.instructions,
		label = attribute?.label,
		onChange = attribute?.onChange,
		value = getAttributeValueFromContext( name, [] ),
		slider = false,
	} = props;
	const onChangeCallback = onChange ? onChange : getDefaultOnChangeFromContext( name );

	const Slides = () =>
		value.map( ( item, index ) => (
			<img
				key={ index }
				src={ item.url }
				alt={ item.alt }
				style={
					slider
						? {
								maxHeight: '150px',
								marginRight: '15px',
						  }
						: {
								maxHeight: '150px',
								width: '25%',
						  }
				}
			/>
		) );

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ /* eslint-disable-next-line @wordpress/no-base-control-with-label-without-id */ }
			<BaseControl label={ label } help={ instructions } className={ className }>
				<MediaUploadCheck>
					<MediaPlaceholder
						onSelect={ ( newGallery ) => {
							onChangeCallback( newGallery );
						} }
						className={ value ? 'has-images' : '' }
						value={ value }
						allowedTypes={ [ 'image' ] }
						multiple={ true }
						labels={ { title: 'Select Gallery Images' } }
					>
						<div
							style={
								slider
									? {
											whiteSpace: 'nowrap',
											overflowX: 'scroll',
									  }
									: {
											display: 'flex',
											flexWrap: 'wrap',
									  }
							}
						>
							<Slides />
						</div>
					</MediaPlaceholder>
				</MediaUploadCheck>
			</BaseControl>
		</EditorControls.Special.ConditionalLogic>
	);
}
