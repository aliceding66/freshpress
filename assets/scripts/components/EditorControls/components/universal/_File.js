import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';

export const emptyFileObject = { id: null, filename: '', url: '', subtype: '' };

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: File".
 */
export default function ( props ) {
	const name = props?.name;
	const parent = props?.parent;

	let attribute = {};
	if ( name !== undefined ) {
		attribute = getAttributeFromBlockStore( name, parent );
	}

	const {
		// eslint-disable-next-line no-unused-vars
		name: tmpName = null,
		// eslint-disable-next-line no-unused-vars
		type: tmpType = null,
		inlineControlsAlign = 'center',
		inline = false,
		instructions = attribute?.instructions,
		label = attribute?.label,
		allowedTypes = [ 'application', 'audio' ],
		onChange = attribute?.onChange,
		value = getAttributeValueFromContext( name, emptyFileObject ),
	} = props;
	const { id = '', filename = '', url = '', subtype = '' } = value;
	const onChangeCallback = onChange ? onChange : getDefaultOnChangeFromContext( name );

	const FilePicker = () => (
		<MediaUpload
			value={ id }
			allowedTypes={ allowedTypes }
			onSelect={ ( newFile ) => {
				const newFileToSet = {
					id: newFile.id,
					filename: newFile.name,
					url: newFile.url,
					subtype: newFile.subtype,
				};
				onChangeCallback( newFileToSet );
			} }
			render={ ( { open } ) => (
				// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
				<BaseControl
					className={ `${
						inline
							? `block-editor__editor-controls__file--inline block-editor__editor-controls__file--inline--${ inlineControlsAlign }`
							: ''
					} ${ url ? '' : 'block-editor__editor-controls__file--inline--show' }` }
				>
					<Button
						className={
							! url && inline
								? 'btn btn-outline-grey border-dashed text-muted shadow-none h-auto'
								: ''
						}
						isPrimary
						text={
							// eslint-disable-next-line no-nested-ternary
							url
								? inline
									? ''
									: __( 'Edit file', 'freshpress-website' )
								: `${ __( 'Add file', 'freshpress-website' ) } ${
										label ? `(${ label })` : ''
								  }`
						}
						icon={ url ? 'edit' : 'plus' }
						onClick={ open }
					/>

					{ url && (
						<Button
							isPrimary
							isDestructive
							text={ inline ? '' : __( 'Remove', 'freshpress-website' ) }
							icon="no-alt"
							onClick={ () => {
								onChangeCallback( emptyFileObject );
							} }
						/>
					) }
				</BaseControl>
			) }
		/>
	);

	const FilePreview = () => {
		if ( url ) {
			if ( props.preview ) {
				return (
					<props.preview
						id={ id }
						filename={ filename }
						url={ url }
						subtype={ subtype }
					/>
				);
			}
			return <p>{ url }</p>;
		}

		return null;
	};

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			<MediaUploadCheck>
				{ inline && (
					<div className="position-relative block-editor__editor-controls__file-wrapper text-center">
						<FilePicker />
						<FilePreview />
					</div>
				) }
				{ ! inline && (
					// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
					<BaseControl label={ label } help={ instructions }>
						<div>
							<FilePicker />
							<FilePreview />
						</div>
					</BaseControl>
				) }
			</MediaUploadCheck>
		</EditorControls.Special.ConditionalLogic>
	);
}
