import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import {
	getCommonBlockSettingsClass,
	getBlockAttributeSubfieldDefinition,
} from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import Template from 'scripts/components/_Template';
import logoPartial from '../templates/logo.partial.mustache';
import logoReducer from './state/_reducer';
import * as logoActions from './state/_actions';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const hideLines = attributes.logo_group_hide_lines ? 'hide-lines' : '';
	const blockProps = useBlockProps( {
		className: `logo-group position-relative pb-7 ${ hideLines } ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const logoTypeDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'logos',
		'logo_type'
	);
	const adjustLogoSizeDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'logos',
		'adjust_logo_size'
	);

	const imageTypesMap = {
		svg: [ 'image/svg+xml' ],
		raster: [ 'image/jpg', 'image/png', 'image/gif' ],
	};

	const rangeCommonConfig = {
		min: 0,
		max: 100,
		step: 5,
	};

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ logoState, logoDispatch ] = blockStateManager.addReducerManager( logoReducer, 'logos' );

	const formatLogos = ( logo, index ) => {
		let logoResizeClass = '';
		const adjustLogoSize = logo?.adjust_logo_size;
		const decreaseLogoSize = parseInt( logo?.decrease_logo_size );
		const increaseLogoSize = parseInt( logo?.increase_logo_size );
		if ( '0' !== adjustLogoSize ) {
			const logoResizeDirection = '+1' === adjustLogoSize ? 'increase' : 'decrease';
			const logoResizeAmount = '+1' === adjustLogoSize ? increaseLogoSize : decreaseLogoSize;
			logoResizeClass = `logo-group__logo_${ logoResizeDirection }_${ logoResizeAmount }`;
		}

		return {
			logo: (
				<EditorControls.Image
					inline
					className={ `logo-group__logo w-100 ${ logoResizeClass }` }
					value={ logo.logo_type === 'svg' ? logo.logo_svg : logo.logo_image }
					allowedTypes={ imageTypesMap[ logo.logo_type ] }
					onChange={ ( value ) => {
						logoDispatch( {
							type:
								logo.logo_type === 'svg'
									? logoActions.EDIT_LOGO_SVG
									: logoActions.EDIT_LOGO_IMAGE,
							index,
							value,
						} );
					} }
				/>
			),
			admin_logo_edit: (
				<>
					<EditorControls.Select
						choices={ logoTypeDefinition?.choices }
						value={ logo.logo_type }
						onChange={ ( value ) => {
							logoDispatch( {
								type: logoActions.EDIT_LOGO_TYPE,
								index,
								value,
							} );
						} }
					/>
					<EditorControls.Select
						choices={ adjustLogoSizeDefinition?.choices }
						value={ logo.adjust_logo_size }
						onChange={ ( value ) => {
							logoDispatch( {
								type: logoActions.EDIT_ADJUST_LOGO_SIZE,
								index,
								value,
							} );
						} }
					/>
					{ logo?.adjust_logo_size === '-1' && (
						<EditorControls.Range
							{ ...rangeCommonConfig }
							value={ logo?.decrease_logo_size ?? 0 }
							onChange={ ( value ) => {
								logoDispatch( {
									type: logoActions.EDIT_DECREASE_LOGO_SIZE,
									index,
									value,
								} );
							} }
						/>
					) }
					{ logo?.adjust_logo_size === '+1' && (
						<EditorControls.Range
							{ ...rangeCommonConfig }
							value={ logo?.increase_logo_size ?? 0 }
							onChange={ ( value ) => {
								logoDispatch( {
									type: logoActions.EDIT_INCREASE_LOGO_SIZE,
									index,
									value,
								} );
							} }
						/>
					) }
				</>
			),
			admin_controls: (
				<div className="block-editor__block-controls text-center">
					{ index > 0 && (
						<Button
							isSmall
							onClick={ () => {
								logoDispatch( {
									type: logoActions.MOVE_LOGO_LEFT,
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
							logoDispatch( {
								type: logoActions.REMOVE_LOGO,
								index,
							} );
						} }
						icon="no-alt"
					/>
					{ index < logoState.length - 1 && (
						<Button
							isSmall
							onClick={ () => {
								logoDispatch( {
									type: logoActions.MOVE_LOGO_RIGHT,
									index,
								} );
							} }
							icon="arrow-right-alt2"
						/>
					) }
				</div>
			),
		};
	};

	const logoPartials = logoState.map( ( logo, index ) => {
		return (
			<Template
				attributes={ logo }
				template={ logoPartial }
				key={ logo.key }
				components={ formatLogos( logo, index ) }
			/>
		);
	} );

	const isStyleType = ( type ) => {
		return blockProps.className.includes( `is-style-logo-group_${ type }` );
	};

	const isLogoLimitReached =
		logoState.length >= 8 &&
		( isStyleType( 'single-line' ) || isStyleType( 'above-the-fold' ) );

	useEffect( () => {
		if ( isLogoLimitReached ) {
			logoDispatch( { type: logoActions.SLICE_TO_LIMIT } );
		}
	}, [ attributes.className ] );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				{ isStyleType( 'single-line' ) && (
					<PanelBody initialOpen={ true }>
						<EditorControls.TrueFalse name="logo_group_hide_lines" />
					</PanelBody>
				) }
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="logo-group__logos">
					<h3 className="logo_group__headline">
						<EditorControls.RichText
							name="headline"
							placeholder={ __( 'Insert headline', 'freshpress-website' ) }
						/>
					</h3>
				</div>
				<div
					className={ `logo-group__logo d-flex justify-content-around ${
						isStyleType( 'multiline' ) ? 'flex-wrap h-auto' : ''
					}` }
				>
					{ logoPartials }
				</div>

				<Button
					isSecondary
					disabled={ isLogoLimitReached }
					className="d-block mx-auto position-absolute"
					style={ { bottom: 0, left: '50%', transform: 'translateX( -50% )' } }
					onClick={ () => {
						logoDispatch( { type: logoActions.ADD_LOGO } );
					} }
					text={ __( 'Add Logo', 'freshpress-website' ) }
					icon="plus"
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
