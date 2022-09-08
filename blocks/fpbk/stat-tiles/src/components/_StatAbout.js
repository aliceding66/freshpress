import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import * as contactLinkActions from '../../state/contact_links/_actions';
import contactLinkReducer from '../../state/contact_links/_reducer';
import { name as blockName } from '../../block.json';

export default () => {
	const { attributes, blockStateManager } = getEditorControlsContext();
	const [ contactLinks, contactLinkDispatch ] = blockStateManager.addReducerManager(
		contactLinkReducer,
		'about_team_contact_links'
	);

	/**
	 * TODO refactor after merging Logo Group block
	 * const typeDefinition = getBlockAttributeSubfieldDefinition( blockName, 'about_team_contact_links', 'type' );
	 */
	const columnsDefinitions = useSelect( ( select ) => {
		return select( 'core/blocks' ).getBlockType( blockName )?.attributes
			?.about_team_contact_links;
	}, [] );
	const getColumnFieldDefinition = ( fieldName ) => {
		return columnsDefinitions.sub_fields.filter( ( field ) => field.name === fieldName )[ 0 ];
	};

	const contactLinkElements = contactLinks.map( ( contactLink, index ) => {
		const { key, type, value, label } = contactLinks[ index ];

		return (
			<div key={ key } className="d-flex mt-3 align-items-center justify-content-between">
				<EditorControls.Select
					value={ type }
					choices={ getColumnFieldDefinition( 'type' ).choices }
					// choices={ typeDefinition?.choices } // TODO refactor after merging Logo Group block.
					style={ { flex: '0 0 33.3%' } }
					onChange={ ( valueChange ) => {
						contactLinkDispatch( {
							type: contactLinkActions.EDIT_CONTACT_LINK_TYPE,
							index,
							value: valueChange,
						} );
					} }
				/>
				<EditorControls.RichText
					isSimple
					placeholder={ __( 'Insert value', 'freshpress-website' ) }
					value={ value }
					style={ { flex: '0 0 33.3%' } }
					onChange={ ( valueChange ) => {
						contactLinkDispatch( {
							type: contactLinkActions.EDIT_CONTACT_LINK_VALUE,
							index,
							value: valueChange,
						} );
					} }
				/>
				<EditorControls.RichText
					isSimple
					placeholder={ __( 'Insert label', 'freshpress-website' ) }
					value={ label }
					style={ { flex: '0 0 33.3%' } }
					onChange={ ( valueChange ) => {
						contactLinkDispatch( {
							type: contactLinkActions.EDIT_CONTACT_LINK_LABEL,
							index,
							value: valueChange,
						} );
					} }
				/>
				<div className="block-editor__block-controls d-flex flex-column">
					{ index > 0 && (
						<Button
							onClick={ () => {
								contactLinkDispatch( {
									type: contactLinkActions.MOVE_CONTACT_LINK_UP,
									index,
								} );
							} }
							icon="arrow-up-alt2"
						/>
					) }
					<Button
						isSecondary
						className={ `is-destructive` }
						onClick={ () => {
							contactLinkDispatch( {
								type: contactLinkActions.REMOVE_CONTACT_LINK,
								index,
							} );
						} }
						icon="no-alt"
					/>
					{ index < contactLinks.length - 1 && (
						<Button
							onClick={ () => {
								contactLinkDispatch( {
									type: contactLinkActions.MOVE_CONTACT_LINK_DOWN,
									index,
								} );
							} }
							icon="arrow-down-alt2"
						/>
					) }
				</div>
			</div>
		);
	} );

	return (
		<div className="stat-tiles__about d-flex flex-column-reverse px-4 px-lg-5 pt-md-4 mx-md-1 mx-lg-auto flex-md-row align-items-start">
			<div className="stat-tiles__about-content d-flex flex-column px-2 pr-md-2 pl-md-4 pl-lg-5 mt-md-5">
				<h3 className="stat-tiles__about-heading mb-4">
					<EditorControls.RichText
						isSimple
						placeholder={ __( 'Insert heading', 'freshpress-website' ) }
						name="about_team_heading"
					/>
				</h3>
				<div className="stat-tiles__about-body">
					<EditorControls.RichText
						isSimple
						placeholder={ __( 'Insert body', 'freshpress-website' ) }
						name="about_team_body"
					/>
				</div>
				{ contactLinkElements }
				<Button
					isSecondary
					className={ `mt-4` }
					onClick={ () => {
						contactLinkDispatch( {
							type: contactLinkActions.ADD_CONTACT_LINK,
						} );
					} }
					text={ 'Add contact link' }
					icon="plus"
				/>
			</div>
			<EditorControls.Image
				inline
				value={ attributes.about_team_image }
				name="about_team_image"
			/>
		</div>
	);
};
