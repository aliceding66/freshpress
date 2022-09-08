import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { generateBlockId, BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import stagePartial from '../templates/stage.partial.mustache';
import * as stageActions from './state/stages/_actions';
import reducer from './state/stages/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `timeline-vertical position-relative my-0 pr-5 pr-lg-2 pr-xl-0 pl-0 pl-md-4 d-flex py-4 flex-column justify-content-between ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( {
			id: generateBlockId( blockName ),
		} );
	}
	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ stages, stagesDispatch ] = blockStateManager.addReducerManager( reducer, 'stages' );

	const partialTemplates = {
		stages: [],
	};

	const stageTemplateComponents = ( index, stage ) => ( {
		date: (
			<EditorControls.RichText
				isSimple
				value={ stage.date }
				onChange={ ( value ) => {
					stagesDispatch( {
						type: stageActions.STAGE_EDIT_DATE,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Date', 'freshpress-website' ) }
			/>
		),
		title: (
			<EditorControls.RichText
				isSimple
				value={ stage.title }
				onChange={ ( value ) => {
					stagesDispatch( {
						type: stageActions.STAGE_EDIT_TITLE,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Title', 'freshpress-website' ) }
			/>
		),
		description: (
			<EditorControls.RichText
				value={ stage.description }
				onChange={ ( value ) => {
					stagesDispatch( {
						type: stageActions.STAGE_EDIT_DESCRIPTION,
						index,
						value,
					} );
				} }
				placeholder={ __( 'Insert Description', 'freshpress-website' ) }
			/>
		),
		admin_controls: (
			<div
				className="block-editor__block-controls d-flex flex-column jusdify-content-center position-absolute"
				style={ { top: '50%', left: '20px', transform: 'translateY( -50% )' } }
			>
				{ index > 0 && (
					<Button
						isSmall
						onClick={ () => {
							stagesDispatch( {
								type: stageActions.STAGE_MOVE_UP,
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
						stagesDispatch( {
							type: stageActions.STAGE_REMOVE,
							index,
						} );
					} }
					icon="no-alt"
				/>
				{ index < stages.length - 1 && (
					<Button
						isSmall
						onClick={ () => {
							stagesDispatch( {
								type: stageActions.STAGE_MOVE_DOWN,
								index,
							} );
						} }
						icon="arrow-down-alt2"
					/>
				) }
			</div>
		),
	} );

	stages.forEach( ( stage, stageIndex ) => {
		partialTemplates.stages.push(
			<Template
				attributes={ { ...stage } }
				template={ stagePartial }
				key={ stage.key }
				components={ stageTemplateComponents( stageIndex, stage ) }
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
				{ partialTemplates.stages }
				<Button
					isSecondary
					className={ `mt-4` }
					onClick={ () => {
						stagesDispatch( { type: stageActions.ADD_STAGE } );
					} }
					text={ 'Add Stage' }
					icon="plus"
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
