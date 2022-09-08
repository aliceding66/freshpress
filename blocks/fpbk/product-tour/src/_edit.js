import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Arrow from './components/_Arrow';
import EditorControls from 'scripts/components/_EditorControls';
import {
	getBlockAttributeSubfieldDefinition,
	getCommonBlockSettingsClass,
} from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import carouselItemDefaultPartial from '../templates/carousel-item/default.partial.mustache';
import carouselItemWithVideoPartial from '../templates/carousel-item/with-video.partial.mustache';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import * as itemsActions from './state/items/_actions';
import itemsReducer from './state/items/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `product-tour pb-5 pb-xl-0 position-relative ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const [ activeItemIndex, setActiveItemIndex ] = useState( 0 );
	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ items, itemDispatch ] = blockStateManager.addReducerManager(
		itemsReducer,
		'product_tour_items'
	);
	const activeItem = items[ activeItemIndex ];
	useEffect( () => {
		if ( items.length > 0 && activeItemIndex >= items.length ) {
			setActiveItemIndex( items.length - 1 );
		}
	}, [ items.length ] );

	const isWithVideoTheme =
		attributes?.className && attributes.className.includes( 'is-style-with-video' );
	const itemVideoIdFieldDefinition = getBlockAttributeSubfieldDefinition(
		blockName,
		'product_tour_items',
		'product_tour_item_video_id'
	);

	const partialNavs = [];

	items.forEach( ( item, index ) => {
		partialNavs.push(
			// eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
			<a
				key={ item.key }
				className={ `product-tour__nav-link mx-1 pb-2 px-1 text-decoration-none ${
					activeItemIndex === index ? 'product-tour__nav-link_active' : ''
				}` }
				onClick={ () => {
					setActiveItemIndex( index );
				} }
			>
				<div className="block-editor__block-controls">
					{ index > 0 && (
						<Button
							isSmall
							onClick={ ( event ) => {
								event.stopPropagation();
								event.preventDefault();

								itemDispatch( {
									type: itemsActions.MOVE_ITEM_LEFT,
									index,
								} );

								if ( activeItemIndex === index ) {
									setActiveItemIndex( activeItemIndex - 1 );
								}
							} }
							icon="arrow-left-alt2"
						/>
					) }
					<Button
						isDestructive
						isSmall
						onClick={ ( event ) => {
							event.stopPropagation();
							event.preventDefault();

							itemDispatch( {
								type: itemsActions.REMOVE_ITEM,
								index,
							} );
						} }
						icon="no-alt"
					/>
					{ index < items.length - 1 && (
						<Button
							isSmall
							onClick={ ( event ) => {
								event.stopPropagation();
								event.preventDefault();

								itemDispatch( {
									type: itemsActions.MOVE_ITEM_RIGHT,
									index,
								} );

								if ( activeItemIndex === index ) {
									setActiveItemIndex( activeItemIndex + 1 );
								}
							} }
							icon="arrow-right-alt2"
						/>
					) }
				</div>
				<EditorControls.RichText
					isSimple
					value={ item.product_tour_item_nav_title }
					onChange={ ( value ) => {
						itemDispatch( {
							type: itemsActions.EDIT_ITEM_NAV_TITLE,
							index,
							value,
						} );
					} }
					placeholder={ __( 'Insert nav title', 'freshpress-website' ) }
				/>
			</a>
		);
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse name="mobile_carousel" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ isWithVideoTheme && (
					<>
						<div className="reversed-corner reversed-corner_down reversed-corner_white d-none d-lg-block">
							<div />
						</div>
						<h2 className="mb-4 pb-2 mb-md-4 section-heading section-heading_first text-center">
							<EditorControls.RichText
								isSimple
								name="product_tour_title"
								placeholder={ __( 'Insert main title', 'freshpress-website' ) }
							/>
						</h2>
					</>
				) }
				<div className="product-tour__nav-container d-flex mb-0 mx-auto">
					{ partialNavs }
				</div>
				{ items.length > 0 && (
					<div className="product-tour__content-container d-flex">
						<Arrow
							active={ activeItemIndex > 0 }
							onClick={ () => {
								if ( activeItemIndex > 0 ) {
									setActiveItemIndex( activeItemIndex - 1 );
								}
							} }
							type="previous"
						/>
						<Template
							attributes={ {
								...activeItem,
								item_active_class: 'product-tour__item_active mx-auto',
								is_with_video_theme: isWithVideoTheme,
							} }
							key={ `product_tour_item_${ activeItemIndex }` }
							template={
								isWithVideoTheme
									? carouselItemWithVideoPartial
									: carouselItemDefaultPartial
							}
							components={ {
								product_tour_item_title: (
									<EditorControls.RichText
										isSimple
										value={ activeItem?.product_tour_item_title }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_TITLE,
												index: activeItemIndex,
												value,
											} );
										} }
										placeholder={ __( 'Insert title', 'freshpress-website' ) }
									/>
								),
								product_tour_item_description: (
									<EditorControls.RichText
										value={ activeItem?.product_tour_item_description }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_DESCRIPTION,
												index: activeItemIndex,
												value,
											} );
										} }
										placeholder={ __(
											'Insert description',
											'freshpress-website'
										) }
									/>
								),
								product_tour_item_link: (
									<EditorControls.Link
										inline
										className={ `product-tour__item-cta ${
											isWithVideoTheme
												? 'product-tour__item-cta py-2 d-inline-block'
												: 'btn btn-outline-grey py-2 px-4 mx-auto'
										}` }
										value={ activeItem?.product_tour_item_link }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_LINK,
												index: activeItemIndex,
												value,
											} );
										} }
									/>
								),
								product_tour_item_image: (
									<EditorControls.Image
										inline
										value={ activeItem?.product_tour_item_image }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_IMAGE,
												index: activeItemIndex,
												value,
											} );
										} }
										previewSize="large"
									/>
								),
								has_mobile_image: true,
								product_tour_item_mobile_image: (
									<>
										<p>Mobile image: </p>
										<EditorControls.Image
											inline
											value={ activeItem?.product_tour_item_mobile_image }
											onChange={ ( value ) => {
												itemDispatch( {
													type: itemsActions.EDIT_ITEM_MOBILE_IMAGE,
													index: activeItemIndex,
													value,
												} );
											} }
											previewSize="large"
										/>
									</>
								),
								product_tour_item_watch_video_label: (
									<EditorControls.RichText
										isSimple
										className="px-0"
										value={ activeItem?.product_tour_item_watch_video_label }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_WATCH_VIDEO_LABEL,
												index: activeItemIndex,
												value,
											} );
										} }
									/>
								),
								product_tour_item_cta: (
									<EditorControls.Link
										inline
										className="py-2 px-3 btn btn-cta-green cta__button"
										value={ activeItem?.product_tour_item_cta }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_CTA,
												index: activeItemIndex,
												value,
											} );
										} }
									/>
								),
								product_tour_item_cta_text: (
									<EditorControls.RichText
										isSimple
										className="px-0"
										value={ activeItem?.product_tour_item_cta_text }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_CTA_TEXT,
												index: activeItemIndex,
												value,
											} );
										} }
									/>
								),
								product_tour_item_edit_video_id: (
									<EditorControls.Text
										key={ `product_tour_item_edit_video_id_${ activeItemIndex }` }
										label={ itemVideoIdFieldDefinition.label }
										value={ activeItem?.product_tour_item_video_id }
										onChange={ ( value ) => {
											itemDispatch( {
												type: itemsActions.EDIT_ITEM_VIDEO_ID,
												index: activeItemIndex,
												value,
											} );
										} }
										placeholder={ itemVideoIdFieldDefinition.placeholder }
									/>
								),
							} }
						/>
						<Arrow
							active={ activeItemIndex < items.length - 1 }
							onClick={ () => {
								if ( activeItemIndex < items.length - 1 ) {
									setActiveItemIndex( activeItemIndex + 1 );
								}
							} }
							type="next"
						/>
					</div>
				) }

				<Button
					isSecondary
					className="d-block mx-auto mt-4 position-relative"
					style={ { zIndex: 2000 } }
					disabled={ items.length >= 8 }
					onClick={ () => {
						itemDispatch( { type: itemsActions.ADD_ITEM } );
						if ( items.length > 0 ) {
							setActiveItemIndex( items.length );
						}
					} }
					icon="plus"
					text={ __( 'Add item', 'freshpress-website' ) }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
