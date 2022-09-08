import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import teamMemberTemplate from '../templates/team_member.mustache';
import * as teamMemberActions from './state/team_members/_actions';
import teamMemberReducer from './state/team_members/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `team-members d-md-flex flex-wrap justify-content-center px-lg-5 ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ teamMembers, teamMemberDispatch ] = blockStateManager.addReducerManager(
		teamMemberReducer,
		'team_members'
	);

	const teamMemberPartialComponents = ( index, teamMember ) => ( {
		image: (
			<EditorControls.Image
				inline
				className="team-members__image w-100 h-auto"
				value={ teamMember.image }
				onChange={ ( value ) => {
					teamMemberDispatch( {
						type: teamMemberActions.EDIT_TEAM_MEMBER_IMAGE,
						index,
						value,
					} );
				} }
			/>
		),
		name: (
			<EditorControls.RichText
				isSimple
				value={ teamMember.name }
				onChange={ ( value ) => {
					teamMemberDispatch( {
						type: teamMemberActions.EDIT_TEAM_MEMBER_NAME,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Name', 'freshpress-website' ) }
			/>
		),
		position: (
			<EditorControls.RichText
				isSimple
				value={ teamMember.position }
				onChange={ ( value ) => {
					teamMemberDispatch( {
						type: teamMemberActions.EDIT_TEAM_MEMBER_POSITION,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Position', 'freshpress-website' ) }
			/>
		),
		description: (
			<EditorControls.RichText
				isSimple
				value={ teamMember.description }
				onChange={ ( value ) => {
					teamMemberDispatch( {
						type: teamMemberActions.EDIT_TEAM_MEMBER_DESCRIPTION,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Description', 'freshpress-website' ) }
			/>
		),
		admin_controls: (
			<div className="block-editor__block-controls d-flex flex-column">
				{ index > 0 && (
					<Button
						isSmall
						onClick={ () => {
							teamMemberDispatch( {
								type: teamMemberActions.MOVE_TEAM_MEMBER_UP,
								index,
							} );
						} }
						icon="arrow-up-alt2"
					/>
				) }
				<Button
					isDestructive
					isSmall
					onClick={ () => {
						teamMemberDispatch( { type: teamMemberActions.REMOVE_TEAM_MEMBER, index } );
					} }
					icon="no-alt"
				/>
				{ index < teamMembers.length - 1 && (
					<Button
						isSmall
						onClick={ () => {
							teamMemberDispatch( {
								type: teamMemberActions.MOVE_TEAM_MEMBER_DOWN,
								index,
							} );
						} }
						icon="arrow-down-alt2"
					/>
				) }
			</div>
		),
	} );

	const teamMembersPartials = teamMembers.map( ( teamMember, index ) => {
		return (
			<Template
				attributes={ { ...teamMember } }
				template={ teamMemberTemplate }
				key={ teamMember.key }
				components={ teamMemberPartialComponents( index, teamMember ) }
			/>
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
				{ teamMembersPartials }
				<Button
					isSecondary
					className="d-block mx-auto my-3"
					onClick={ () => {
						teamMemberDispatch( { type: teamMemberActions.ADD_TEAM_MEMBER } );
					} }
					text={ 'Add team member' }
					icon="plus"
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
