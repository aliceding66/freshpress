import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import tabContentPartial from '../templates/tab-content.partial.mustache';
import navItemPartial from '../templates/nav-item.partial.mustache';
import * as cardActions from './state/cards/_actions';
import cardReducer from './state/cards/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `tabbed-cards ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ cards, cardDispatch ] = blockStateManager.addReducerManager( cardReducer, 'cards' );
	const [ activeCard, setActiveCard ] = useState( 0 );

	useEffect( () => {
		if ( cards.length > 0 && activeCard >= cards.length ) {
			setActiveCard( cards.length - 1 );
		}
	}, [ cards.length ] );

	const templateData = { ...attributes };
	templateData.tab_y_padding = 'py-3 pb-4';
	templateData.card_content_position = 'static';
	if ( blockProps.className.indexOf( 'is-style-new' ) >= 0 ) {
		templateData.tab_y_padding = 'pt-2 pb-4';
		templateData.card_content_position = 'relative';
	}

	const partialTemplates = {
		navItems: [],
		tabContents: [],
	};

	{
		cards.forEach( ( card, index ) => {
			const { key } = card;
			card.card_id = `card-${ index }`;
			card.active = activeCard === index ? 'active' : '';

			partialTemplates.navItems.push(
				<Template
					attributes={ { ...card, ...templateData } }
					key={ `nav_item_${ key }` }
					template={ navItemPartial }
					components={ {
						admin_tab: (
							<>
								{ /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */ }
								<span
									className={ `nav-link ${ templateData.tab_y_padding } px-2 px-sm-4 px-md-2 px-xl-4 ${ card.active }` }
									onClick={ () => {
										setActiveCard( index );
									} }
								>
									<EditorControls.RichText
										isSimple
										value={ card.tab_title }
										onChange={ ( value ) => {
											cardDispatch( {
												type: cardActions.EDIT_CARD_TAB_TITLE,
												index,
												value,
											} );
										} }
										placeholder={ __( 'Insert title', 'freshpress-website' ) }
									/>
									<div className="block-editor__block-controls block-editor__tabbed-cards-controls position-absolute m-0">
										{ index > 0 && (
											<Button
												isSmall
												onClick={ ( event ) => {
													event.stopPropagation();
													event.preventDefault();

													cardDispatch( {
														type: cardActions.MOVE_CARD_LEFT,
														index,
													} );

													if ( activeCard === index ) {
														setActiveCard( activeCard - 1 );
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

												cardDispatch( {
													type: cardActions.REMOVE_CARD,
													index,
												} );
											} }
											icon="no-alt"
										/>
										{ index < cards.length - 1 && (
											<Button
												isSmall
												onClick={ ( event ) => {
													event.stopPropagation();
													event.preventDefault();

													cardDispatch( {
														type: cardActions.MOVE_CARD_RIGHT,
														index,
													} );

													if ( activeCard === index ) {
														setActiveCard( activeCard + 1 );
													}
												} }
												icon="arrow-right-alt2"
											/>
										) }
									</div>
								</span>
							</>
						),
					} }
				/>
			);
			partialTemplates.tabContents.push(
				<Template
					attributes={ { ...card } }
					key={ `tab_content_${ key }` }
					template={ tabContentPartial }
					components={ {
						card_content: (
							<EditorControls.RichText
								value={ card.card_content }
								onChange={ ( value ) => {
									cardDispatch( {
										type: cardActions.EDIT_CARD_CONTENT,
										index,
										value,
									} );
								} }
								placeholder={ __( 'Insert content', 'freshpress-website' ) }
							/>
						),
					} }
				/>
			);
		} );
	}

	partialTemplates.navItems.push(
		<Template
			attributes={ { ...templateData } }
			key={ 'tab_admin' }
			template={ navItemPartial }
			components={ {
				admin_tab: (
					/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
					<span
						className={ `nav-link ${ templateData.tab_y_padding } px-2 px-sm-4 px-md-2 px-xl-4 cursor-pointer` }
						title={ __( 'Add tab', 'freshpress-website' ) }
						onClick={ () => {
							cardDispatch( {
								type: cardActions.ADD_CARD,
							} );

							if ( cards.length > 0 ) {
								setActiveCard( cards.length );
							}
						} }
					>
						+
					</span>
				),
			} }
		/>
	);

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="tabbed-cards__cards w-100 mx-auto">
					<ul className="nav nav-tabs border-0" id="myTab" role="tablist">
						{ partialTemplates.navItems }
					</ul>
					<div
						className={ `tab-content card mt-0 position-${ templateData.card_content_position }` }
						id="myTabContent"
					>
						{ partialTemplates.tabContents }
					</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
