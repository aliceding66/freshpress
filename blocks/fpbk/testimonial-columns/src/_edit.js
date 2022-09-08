import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import headerPartialTemplate from '../templates/header.partial.mustache';
import columnPartialTemplate from '../templates/column.partial.mustache';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import * as columnActions from './state/columns/_actions';
import columnReducer from './state/columns/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'testimonial-columns container-fluid px-md-4',
	} );

	const columnsAmount = attributes.columns.length;
	let commonColumnClass = 'col-12';
	if ( 2 === columnsAmount ) {
		commonColumnClass = 'col-12 col-md-6';
	} else if ( 3 === columnsAmount ) {
		commonColumnClass = 'col-12 col-md-6 col-lg-4';
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ columns, columnDispatch ] = blockStateManager.addReducerManager(
		columnReducer,
		'columns'
	);

	return (
		<EditorControls.Context.Provider value={ { attributes, setAttributes, blockName } }>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse name="include_header" />
				</PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ getCommonBlockSettingsClass( attributes ) }>
					<Template
						template={ headerPartialTemplate }
						attributes={ { ...attributes } }
						components={ {
							header: (
								<EditorControls.RichText
									isSimple
									name="header"
									placeholder={ __( 'Insert header', 'freshpress-website' ) }
								/>
							),
						} }
					/>

					<div className="row position-relative" style={ { minHeight: '10px' } }>
						{ columns.map( ( column, index ) => {
							const templateColumn = { ...column };
							const marginBottomClass =
								index === columnsAmount - 1 ? ' mb-0' : ' mb-5 mb-md-0';
							const displayAdjustClass = index > 1 ? ' d-md-none d-lg-flex' : '';
							templateColumn.column_classes = `${ commonColumnClass }${ marginBottomClass }${ displayAdjustClass } position-relative`;

							return (
								<Template
									key={ `column_${ column.key }` }
									template={ columnPartialTemplate }
									attributes={ { ...templateColumn } }
									components={ {
										testimonial_quote: (
											<EditorControls.RichText
												isSimple
												value={ templateColumn.testimonial_quote }
												onChange={ ( value ) =>
													columnDispatch( {
														type:
															columnActions.EDIT_COLUMN_TESTIMONIAL_QUOTE,
														index,
														value,
													} )
												}
												placeholder={ __(
													'Insert quote',
													'freshpress-website'
												) }
											/>
										),
										author_photo_html: (
											<EditorControls.Image
												inline
												className="testimonial__photo h-auto"
												value={ templateColumn.author_photo }
												onChange={ ( value ) =>
													columnDispatch( {
														type:
															columnActions.EDIT_COLUMN_AUTHOR_PHOTO,
														index,
														value,
													} )
												}
												previewSize="thumbnail"
											/>
										),
										author_name: (
											<EditorControls.RichText
												isSimple
												value={ templateColumn.author_name }
												onChange={ ( value ) =>
													columnDispatch( {
														type: columnActions.EDIT_COLUMN_AUTHOR_NAME,
														index,
														value,
													} )
												}
												placeholder={ __(
													'Insert author name',
													'freshpress-website'
												) }
											/>
										),
										author_title: (
											<EditorControls.RichText
												isSimple
												value={ templateColumn.author_title }
												onChange={ ( value ) =>
													columnDispatch( {
														type:
															columnActions.EDIT_COLUMN_AUTHOR_TITLE,
														index,
														value,
													} )
												}
												placeholder={ __(
													'Insert author title',
													'freshpress-website'
												) }
											/>
										),
										admin_controls: (
											<div className="block-editor__block-controls position-absolute">
												{ index > 0 && (
													<Button
														isSmall
														onClick={ () => {
															columnDispatch( {
																type:
																	columnActions.MOVE_COLUMN_LEFT,
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
														columnDispatch( {
															type: columnActions.REMOVE_COLUMN,
															index,
														} );
													} }
													icon="no-alt"
												/>
												{ index < columns.length - 1 && (
													<Button
														isSmall
														onClick={ () => {
															columnDispatch( {
																type:
																	columnActions.MOVE_COLUMN_RIGHT,
																index,
															} );
														} }
														icon="arrow-right-alt2"
													/>
												) }
											</div>
										),
									} }
								/>
							);
						} ) }
						<Button
							isSecondary
							className="d-block mx-auto mt-4"
							disabled={ columnsAmount >= 3 }
							onClick={ () => {
								columnDispatch( { type: columnActions.ADD_COLUMN } );
							} }
							icon="plus"
							text={ __( 'Add testimonial column', 'freshpress-website' ) }
						/>
					</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
