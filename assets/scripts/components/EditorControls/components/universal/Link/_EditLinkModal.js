// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Button, Modal, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { trimChar } from 'scripts/helpers/_strings';
import { getBlockAttributesDefinitions } from '../../../_helpers';

export default ( props ) => {
	const {
		addLink,
		cancelLink,
		closeModal,
		extraModalFields,
		instructions,
		link,
		linkText,
		linkType = 'open_link',
		removeLink = null,
		setLink,
		setLinkText,
		setLinkType,
	} = props;

	const modalHeight = 640 + extraModalFields.length * 50;
	const buttonBlockAttributeDefinitions = getBlockAttributesDefinitions( 'fpbk/button' );
	const linkTypeOptions = Object.entries(
		buttonBlockAttributeDefinitions?.button_click_action?.choices
	).map( ( [ value, label ] ) => ( { value, label } ) );

	return (
		<Modal
			style={ { width: '500px', height: `${ modalHeight }px` } }
			title={ __( 'Insert/edit Link', 'freshpress-website' ) }
			onRequestClose={ closeModal }
		>
			<SelectControl
				label={ __( 'Link type', 'freshpress-website' ) }
				value={ linkType }
				options={ linkTypeOptions }
				onChange={ ( newLinkType ) => {
					setLinkType( newLinkType );
					setLink( {
						url: newLinkType !== 'open_link' ? '#' : '',
						script: '',
						target: newLinkType?.replace( /(?:open_|execute_)/, '' ),
					} );
				} }
			/>

			<TextControl
				value={ linkText }
				label={ __( 'Link text', 'freshpress-website' ) }
				help={ instructions }
				onChange={ ( newLinkText ) => {
					setLinkText( newLinkText );
				} }
			/>

			{ linkType === 'open_link' && (
				<>
					<p>
						{ __(
							'Enter the destination URL or link to existing content',
							'freshpress-website'
						) }
					</p>
					<LinkControl
						value={ link }
						text={ __( 'Search', 'freshpress-website' ) }
						showInitialSuggestions={ true }
						forceIsEditingLink={ true }
						onChange={ ( newLink ) => {
							setLink( newLink );
						} }
					/>
				</>
			) }

			{ linkType === 'open_modal' && (
				<EditorControls.Special.ModalPicker
					label={ __( 'Select Modal', 'freshpress-website' ) }
					value={ link?.url ? trimChar( link.url, '#' ) : '' }
					onChange={ ( newLink ) => {
						setLink( { url: newLink, target: 'modal' } );
					} }
				/>
			) }

			{ linkType === 'open_drift' && (
				<EditorControls.Text
					label={ __( 'Drift Interaction ID', 'freshpress-website' ) }
					value={ link?.drift_interaction_id ? link.drift_interaction_id : 331999 }
					onChange={ ( newInteractionId ) => {
						setLink( {
							url: '#',
							drift_interaction_id: newInteractionId,
							target: 'drift',
						} );
					} }
				/>
			) }

			{ linkType === 'execute_script' && (
				<EditorControls.TextArea
					label={ __( 'Script to execute', 'freshpress-website' ) }
					instructions={ __(
						'Do not include <script></script> tags.',
						'freshpress-website'
					) }
					value={ link?.script ? link.script : '' }
					onChange={ ( newScript ) => {
						setLink( { url: '#', script: newScript, target: 'script' } );
					} }
				/>
			) }

			{ extraModalFields.length > 0 && extraModalFields }
			<div style={ { position: 'absolute', bottom: '20px' } }>
				<Button
					isSecondary
					text={ __( 'Cancel', 'freshpress-website' ) }
					onClick={ cancelLink }
				/>
				<Button
					isPrimary
					text={ __( 'Add Link', 'freshpress-website' ) }
					onClick={ addLink }
				/>
				{ removeLink && (
					<Button
						isDestructive
						text={ __( 'Remove Link', 'freshpress-website' ) }
						onClick={ removeLink }
					/>
				) }
			</div>
		</Modal>
	);
};
