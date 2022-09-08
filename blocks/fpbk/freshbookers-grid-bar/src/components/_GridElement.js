import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, Button } from '@wordpress/components';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { key, index, freshbooker } = props;
	const { attributes = {}, setAttributes = () => {} } = getEditorControlsContext();

	const backgroundImage = freshbooker.freshbooker_thumbnail
		? `url(${ freshbooker.freshbooker_thumbnail.url })`
		: '';
	const url = freshbooker.freshbooker_thumbnail?.url;

	const handleChange = ( newPhoto ) => {
		const newFreshbookers = [ ...attributes.freshbookers ];
		newFreshbookers[ index ].freshbooker_thumbnail = newPhoto;
		setAttributes( { freshbookers: newFreshbookers } );
	};

	return (
		<div
			key={ key }
			className={ `freshbookers-grid-bar__item position-relative ${
				freshbooker.freshbooker_thumbnail ? 'has-image' : ''
			}` }
			style={ { backgroundImage } }
		>
			<MediaUploadCheck>
				<div
					className={ 'media-wrapper position-absolute' }
					style={ {
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					} }
				>
					<MediaUpload
						value={ url }
						allowedTypes={ [ 'image' ] }
						onSelect={ ( newPhoto ) => {
							handleChange( newPhoto, index );
						} }
						render={ ( { open } ) => (
							<BaseControl>
								<Button isSecondary isDefault icon="edit" onClick={ open } />

								{ url && (
									<Button
										isDestructive
										icon="no-alt"
										onClick={ () => {
											handleChange( {}, index );
										} }
									/>
								) }
							</BaseControl>
						) }
					/>
				</div>
			</MediaUploadCheck>
		</div>
	);
};
