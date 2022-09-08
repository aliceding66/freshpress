import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import Template from 'scripts/components/_Template';
import tilePartial from '../templates/tile.mustache';
import * as tileActions from './state/tiles/_actions';
import tileReducer from './state/tiles/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `icon-tiles text-center ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ tiles, tileDispatch ] = blockStateManager.addReducerManager(
		tileReducer,
		'icon_tiles_tile'
	);

	const partialTemplates = {
		tiles: [],
	};

	const tileEditorTemplate = ( index, tile ) => ( {
		icon_tiles_tile_image: (
			<EditorControls.Image
				inline
				className="icon-tiles__tile-image mx-auto d-block mb-4 mw-100 h-auto"
				value={ tile.icon_tiles_tile_image }
				onChange={ ( value ) => {
					tileDispatch( {
						type: tileActions.EDIT_TILE_IMAGE,
						index,
						value,
					} );
				} }
			/>
		),
		icon_tiles_tile_title: (
			<EditorControls.RichText
				isSimple
				value={ tile.icon_tiles_tile_title }
				onChange={ ( value ) => {
					tileDispatch( {
						type: tileActions.EDIT_TILE_TITLE,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Title', 'freshpress-website' ) }
			/>
		),
		icon_tiles_tile_description: (
			<EditorControls.RichText
				isSimple
				value={ tile.icon_tiles_tile_description }
				onChange={ ( value ) => {
					tileDispatch( {
						type: tileActions.EDIT_TILE_DESCRIPTION,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Description', 'freshpress-website' ) }
			/>
		),
		admin_controls: (
			<div className="block-editor__block-controls">
				{ index > 0 && (
					<Button
						isSmall
						onClick={ () => {
							tileDispatch( {
								type: tileActions.MOVE_TILE_LEFT,
								index,
							} );
						} }
						icon="arrow-left-alt2"
					/>
				) }
				<Button
					isDestructive
					isSmall
					onClick={ () => {
						tileDispatch( {
							type: tileActions.REMOVE_TILE,
							index,
						} );
					} }
					icon="no-alt"
				/>
				{ index < tiles.length - 1 && (
					<Button
						isSmall
						onClick={ () => {
							tileDispatch( {
								type: tileActions.MOVE_TILE_RIGHT,
								index,
							} );
						} }
						icon="arrow-right-alt2"
					/>
				) }
			</div>
		),
	} );

	attributes.icon_tiles_tile.forEach( ( tile, tileIndex ) => {
		partialTemplates.tiles.push(
			<Template
				attributes={ { ...tile } }
				template={ tilePartial }
				key={ tile.key }
				components={ tileEditorTemplate( tileIndex, tile ) }
			/>
		);
	} );

	return (
		<EditorControls.Context.Provider value={ { attributes, blockName, setAttributes } }>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<h2 className="icon-tiles__title text-center">
					<EditorControls.RichText
						isSimple
						name="icon_tiles_title"
						placeholder={ __( 'Icon Tiles Block Title', 'freshpress-website' ) }
					/>
				</h2>
				<div className="icon-tiles__tiles_container d-flex flex-column flex-md-row">
					{ partialTemplates.tiles }
				</div>
				<Button
					isSecondary
					disabled={ attributes.icon_tiles_tile.length >= 4 }
					className={ `icon-tiles__cta d-block mx-auto mb-4` }
					onClick={ () => {
						tileDispatch( { type: tileActions.ADD_TILE } );
					} }
					text={ 'Add tile' }
					icon="plus"
				/>
				<EditorControls.Link
					inline
					className="icon-tiles__cta btn btn-cta-green d-inline-block mx-auto px-5 mb-3"
					name="icon_tiles_cta"
				/>
				<EditorControls.RichText
					isSimple
					name="icon_tiles_subtext"
					placeholder={ __( 'Icon Tiles Block Subtext', 'freshpress-website' ) }
					className="icon-tiles__subtext"
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
