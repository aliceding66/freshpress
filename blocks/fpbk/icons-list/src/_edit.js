import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { setCommonAttributes, setTopicAttributes } from './utils';
import Template from 'scripts/components/_Template';
import topicPartial from '../templates/topic.partial.mustache';
import * as topicActions from './state/topics/_actions';
import topicReducer from './state/topics/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `icons-list px-4 mx-auto icons-list_${
			attributes.block_settings_icons_list_columns
		}-col ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}

	// Sets common attributes.
	const commonTopicAttributes = setCommonAttributes( attributes );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ topics, topicDispatch ] = blockStateManager.addReducerManager(
		topicReducer,
		'icons_list_topic'
	);

	const topicPartials = [];
	topics.forEach( ( iconListTopic, index ) => {
		iconListTopic = setTopicAttributes( iconListTopic, index );

		topicPartials.push(
			<Template
				key={ iconListTopic.key }
				attributes={ { ...commonTopicAttributes, ...iconListTopic } }
				template={ topicPartial }
				components={ {
					icons_list_topic_icon: (
						<EditorControls.Image
							className={ `icons-list__topic-image mx-md-0 mb-2 mr-md-4 ${ commonTopicAttributes.topic_icon_class }` }
							inline
							value={ iconListTopic.icons_list_topic_icon }
							onChange={ ( value ) => {
								topicDispatch( {
									type: topicActions.EDIT_TOPIC_ICON,
									index,
									value,
								} );
							} }
						/>
					),
					icons_list_topic_title: (
						<EditorControls.RichText
							isSimple
							className="icons-list__topic-title"
							value={ iconListTopic.icons_list_topic_title }
							onChange={ ( value ) => {
								topicDispatch( {
									type: topicActions.EDIT_TOPIC_TITLE,
									index,
									value,
								} );
							} }
							placeholder={ __( 'Insert title', 'freshpress-website' ) }
						/>
					),
					icons_list_topic_text: (
						<EditorControls.RichText
							className="icons-list__topic-text"
							value={ iconListTopic.icons_list_topic_text }
							onChange={ ( value ) => {
								topicDispatch( {
									type: topicActions.EDIT_TOPIC_TEXT,
									index,
									value,
								} );
							} }
							placeholder={ __( 'Insert text', 'freshpress-website' ) }
						/>
					),
					admin_controls: (
						<div className="block-editor__block-controls d-flex flex-column">
							{ index > 0 && (
								<Button
									isSmall
									onClick={ () => {
										topicDispatch( {
											type: topicActions.MOVE_TOPIC_UP,
											index,
										} );
									} }
									icon="arrow-up-alt2"
								/>
							) }
							<Button
								// className="icon__remove-button"
								isDestructive
								isSmall
								onClick={ () => {
									const newIconsListTopic = [ ...attributes.icons_list_topic ];
									newIconsListTopic.splice( index, 1 );
									setAttributes( { icons_list_topic: newIconsListTopic } );
								} }
								icon="no-alt"
							/>
							{ index < topics.length - 1 && (
								<Button
									isSmall
									onClick={ () => {
										topicDispatch( {
											type: topicActions.MOVE_TOPIC_DOWN,
											index,
										} );
									} }
									icon="arrow-down-alt2"
								/>
							) }
						</div>
					),
				} }
			/>
		);
	} );

	topicPartials.push(
		<Button
			key="admin_add_button"
			isSecondary
			className="icon__add-button d-block mx-auto"
			onClick={ () => {
				topicDispatch( {
					type: topicActions.ADD_TOPIC,
				} );
			} }
			text={ __( 'Add topic', 'freshpress-website' ) }
			icon="plus"
		/>
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Acf.Group name="block_settings" />
				</PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div>
					<h2 className="icons-list__title text-center">
						<EditorControls.RichText
							name="icons_list_title"
							placeholder={ __( 'Insert title', 'freshpress-website' ) }
						/>
					</h2>

					<div className="icons-list__topics row">{ topicPartials }</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
