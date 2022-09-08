import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import {
	getBlockAttributeSubfieldDefinition,
	getCommonBlockSettingsClass,
} from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import * as fileActions from './state/file_download_files/_actions';
import fileReducer from './state/file_download_files/_reducer';
import { getAlignClass, getFileUrlType } from './_utils';
import { name as blockName } from '../block.json';
import { RawHTML } from '@wordpress/element';

// eslint-disable-next-line no-undef
export const { icons = {}, urlTypes = {}, urlFileTypes = {} } = fileDownloadTemplateData;

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `file-download my-0 ${ getAlignClass(
			attributes
		) }${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const downloadTypeDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'file_download_files',
		'download_type'
	);

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ files, filesDispatch ] = blockStateManager.addReducerManager(
		fileReducer,
		'file_download_files'
	);

	const fileNodes = files.map( ( file, index ) => {
		const urlType = getFileUrlType( file, urlTypes, urlFileTypes );

		return (
			<div className="d-flex flex-column" key={ file.key }>
				<EditorControls.Select
					className="text-center w-auto"
					choices={ downloadTypeDefinition.choices }
					value={ file.download_type }
					onChange={ ( value ) => {
						filesDispatch( {
							type: fileActions.EDIT_FILE_DOWNLOAD_TYPE,
							index,
							value,
						} );
					} }
				/>
				{ file.download_type !== 'file' && (
					<>
						<EditorControls.Text
							value={ file.url }
							onChange={ ( value ) => {
								filesDispatch( { type: fileActions.EDIT_FILE_URL, index, value } );
							} }
						/>
						{ urlType === false && (
							<small className="text-danger mb-3">
								{ __(
									'URL can be a link to Google document or file with .pdf/.xslx/.docx extension.',
									'freshpress-website'
								) }
							</small>
						) }
						{ urlType !== false && icons[ urlType ] && (
							<RawHTML className="text-center mb-3">{ icons[ urlType ] }</RawHTML>
						) }
					</>
				) }

				{ file.download_type === 'file' && (
					<EditorControls.File
						inline
						allowedTypes={ [
							'application/pdf',
							'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
							'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						] }
						preview={ ( props ) => (
							<div className="d-flex flex-column justify-content-center align-items-center h-100">
								<RawHTML>{ icons[ props.subtype ] }</RawHTML>
								<small className="mb-4">{ props.filename }</small>
							</div>
						) }
						value={ file.file }
						onChange={ ( value ) => {
							filesDispatch( { type: fileActions.EDIT_FILE_FILE, index, value } );
						} }
					/>
				) }
				<div className="block-editor__block-controls text-center">
					{ index > 0 && (
						<Button
							isSmall
							onClick={ () => {
								filesDispatch( { type: fileActions.MOVE_FILE_LEFT, index } );
							} }
							icon="arrow-left-alt2"
						/>
					) }
					<Button
						isDestructive
						isSmall
						onClick={ () => {
							filesDispatch( { type: fileActions.REMOVE_FILE, index } );
						} }
						icon="no-alt"
					/>
					{ index < files.length - 1 && (
						<Button
							isSmall
							onClick={ () => {
								filesDispatch( { type: fileActions.MOVE_FILE_RIGHT, index } );
							} }
							icon="arrow-right-alt2"
						/>
					) }
				</div>
			</div>
		);
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="d-flex flex-row justify-content-around">{ fileNodes }</div>
				<Button
					isSecondary
					className="d-block mx-auto mt-4"
					onClick={ () => {
						filesDispatch( { type: fileActions.ADD_FILE } );
					} }
					icon="plus"
					text={ __( 'Add file', 'freshpress-website' ) }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
