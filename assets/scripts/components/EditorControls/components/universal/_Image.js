import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

export const emptyImageObject = { id: null, url: '', alt: '', sizes: [], width: '', height: '' };

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: Image".
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
		inlineControlsAlign = 'center',
		className = '',
		inline = false,
		instructions = attribute?.instructions,
		label = attribute?.label,
		allowedTypes = [ 'image' ],
		onChange = attribute?.onChange,
		previewSize = 'thumbnail',
		value = getAttributeValueFromContext( name, emptyImageObject ),
	} = props;
	const { id = '', url = '', alt = '', sizes = {} } = value;
	const onChangeCallback = onChange ? onChange : getDefaultOnChangeFromContext( name );
	const isStaticImage = ! id && url.length > 0;

	const previewUrl =
		sizes[ previewSize ] && sizes[ previewSize ]?.url ? sizes[ previewSize ]?.url : url;

	const ImagePicker = () => (
		<MediaUpload
			value={ id }
			allowedTypes={ allowedTypes }
			onSelect={ ( newImage ) => {
				const newImageToSet = {
					id: newImage.id,
					url: newImage.url,
					alt: newImage.alt,
					sizes: newImage.sizes,
					width: newImage.width,
					height: newImage.height,
				};
				onChangeCallback( newImageToSet );
			} }
			render={ ( { open } ) => (
				// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
				<BaseControl
					className={ `${
						inline
							? `block-editor__editor-controls__file--inline block-editor__editor-controls__file--inline--${ inlineControlsAlign }`
							: ''
					} ${ previewUrl ? '' : 'block-editor__editor-controls__file--inline--show' }` }
				>
					<Tooltip
						text={
							isStaticImage
								? __(
										"This image can't be edited as it is static URL. Please remove it first and then add new one on it.",
										'freshpress-website'
								  )
								: ''
						}
					>
						<Button
							className={
								! previewUrl && inline
									? 'btn btn-outline-grey border-dashed text-muted shadow-none h-auto'
									: ''
							}
							disabled={ isStaticImage }
							isPrimary
							text={
								// eslint-disable-next-line no-nested-ternary
								previewUrl
									? inline
										? ''
										: __( 'Edit image', 'freshpress-website' )
									: `${ __( 'Add image', 'freshpress-website' ) } ${
											label ? `(${ label })` : ''
									  }`
							}
							icon={ previewUrl ? 'edit' : 'plus' }
							onClick={ open }
						/>
					</Tooltip>

					{ previewUrl && (
						<Button
							isPrimary
							isDestructive
							text={ inline ? '' : __( 'Remove', 'freshpress-website' ) }
							icon="no-alt"
							onClick={ () => {
								onChangeCallback( emptyImageObject );
							} }
						/>
					) }
				</BaseControl>
			) }
		/>
	);

	const ImagePreview = () =>
		previewUrl ? (
			<img id={ id } src={ previewUrl } alt={ alt } className={ className } />
		) : null;

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			<MediaUploadCheck>
				{ inline && (
					<div className="position-relative block-editor__editor-controls__file-wrapper">
						<ImagePicker />
						<ImagePreview />
					</div>
				) }
				{ ! inline && (
					// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
					<BaseControl label={ label } help={ instructions }>
						<div>
							<ImagePicker />
							<ImagePreview />
						</div>
					</BaseControl>
				) }
			</MediaUploadCheck>
		</EditorControls.Special.ConditionalLogic>
	);
}
