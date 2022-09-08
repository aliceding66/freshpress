import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import blockTemplate from '../templates/block.mustache';
import tileWithImagePartial from '../templates/tile_with_image.partial.mustache';
import tileWithoutImagePartial from '../templates/tile_without_image.partial.mustache';
import * as tileActions from './state/tiles/_actions';
import tileReducer from './state/tiles/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `feature-grid wide-block row my-0 ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ tiles, tileDispatch ] = blockStateManager.addReducerManager(
		tileReducer,
		'grid_tiles'
	);

	const tilesPartials = [];
	tiles.forEach( ( tile, index ) => {
		const { key } = tile;
		tilesPartials.push(
			<Template
				attributes={ tile }
				key={ key }
				template={ tile.image.id ? tileWithImagePartial : tileWithoutImagePartial }
				components={ {
					heading: (
						<EditorControls.RichText
							isSimple
							placeholder={ __( 'Insert tile heading', 'freshpress-website' ) }
							value={ tile.heading }
							onChange={ ( value ) => {
								tileDispatch( {
									type: tileActions.EDIT_TILE_HEADING,
									index,
									value,
								} );
							} }
						/>
					),
					description: (
						<EditorControls.RichText
							isSimple
							placeholder={ __( 'Insert tile description', 'freshpress-website' ) }
							value={ tile.description }
							onChange={ ( value ) => {
								tileDispatch( {
									type: tileActions.EDIT_TILE_DESCRIPTION,
									index,
									value,
								} );
							} }
						/>
					),
					image: (
						<EditorControls.Image
							inline
							value={ tile.image }
							onChange={ ( value ) => {
								tileDispatch( {
									type: tileActions.EDIT_TILE_IMAGE,
									index,
									value,
								} );
							} }
						/>
					),
					admin_controls: (
						<div className="block-editor__block-controls position-absolute">
							{ index > 0 && (
								<Button
									isSmall
									isSecondary
									icon="arrow-left-alt2"
									onClick={ () => {
										tileDispatch( {
											type: tileActions.MOVE_TILE_LEFT,
											index,
										} );
									} }
								/>
							) }
							<Button
								isSmall
								isDestructive
								icon="no-alt"
								onClick={ () => {
									tileDispatch( { type: tileActions.REMOVE_TILE, index } );
								} }
							/>
							{ index < tiles.length - 1 && (
								<Button
									isSmall
									isSecondary
									icon="arrow-right-alt2"
									onClick={ () => {
										tileDispatch( {
											type: tileActions.MOVE_TILE_RIGHT,
											index,
										} );
									} }
								/>
							) }
						</div>
					),
				} }
			/>
		);
	} );

	if ( tilesPartials.length < 10 ) {
		tilesPartials.push(
			<div className="feature-grid__tile d-flex align-items-center justify-content-center">
				<Button
					isSecondary
					key="admin_add_button"
					onClick={ () => {
						tileDispatch( { type: tileActions.ADD_TILE } );
					} }
					icon="plus"
					text={ __( 'Add tile', 'freshpress-website' ) }
				/>
			</div>
		);
	}

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<Template
					template={ blockTemplate }
					attributes={ attributes }
					components={ {
						cta_box_before_heading: (
							<EditorControls.RichText
								isSimple
								name="cta_box_before_heading"
								placeholder={ __( 'Insert before heading', 'freshpress-website' ) }
							/>
						),
						cta_box_heading: (
							<EditorControls.RichText
								isSimple
								name="cta_box_heading"
								placeholder={ __( 'Insert heading', 'freshpress-website' ) }
							/>
						),
						cta_box_cta: (
							<EditorControls.Link
								inline
								className="btn btn-cta-green feature-grid__cta-box__cta-button px-5 px-lg-3 px-xxl-5 py-2 mt-5 font-weight-medium h4 text-left text-nowrap"
								name="cta_box_cta"
							/>
						),
						cta_box_after_cta: (
							<EditorControls.RichText
								name="cta_box_after_cta"
								placeholder={ __( 'Insert after CTA', 'freshpress-website' ) }
							/>
						),
						grid_main_tile_heading: (
							<EditorControls.RichText
								isSimple
								name="grid_main_tile_heading"
								placeholder={ __(
									'Insert main tile heading',
									'freshpress-website'
								) }
							/>
						),
						grid_main_tile_description: (
							<EditorControls.RichText
								isSimple
								name="grid_main_tile_description"
								placeholder={ __(
									'Insert main tile description',
									'freshpress-website'
								) }
							/>
						),
						grid_main_tile_image: (
							<EditorControls.Image
								inline
								className="feature-grid__tile-image d-block m-auto rounded"
								name="grid_main_tile_image"
							/>
						),
						admin_tiles_partials: <>{ tilesPartials }</>,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
