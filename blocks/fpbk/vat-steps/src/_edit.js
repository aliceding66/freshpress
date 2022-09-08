import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import Template from 'scripts/components/_Template';
// import blockTemplate from '../templates/block.mustache';
import vatStepsPartial from '../templates/step.partial.mustache';
// eslint-disable-next-line no-unused-vars
import * as stepActions from './state/vat-steps_step/_actions';
import reducer from './state/vat-steps_step/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `vat-steps ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const commonStepAttributes = attributes;

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	// eslint-disable-next-line no-unused-vars
	const [ vatStepsStep, stepDispatch ] = blockStateManager.addReducerManager(
		reducer,
		'vat_steps_step'
	);

	const stepPartials = [];
	vatStepsStep.forEach( ( step, index ) => {
		stepPartials.push(
			<Template
				key={ step.key }
				attributes={ { ...commonStepAttributes } }
				template={ vatStepsPartial }
				components={ {
					vat_steps_step__title: (
						<EditorControls.RichText
							isSimple
							className="vat-steps-step__title"
							value={ step.vat_steps_step__title }
							onChange={ ( value ) => {
								stepDispatch( {
									type: stepActions.EDIT_STEP_TITLE,
									index,
									value,
								} );
							} }
							placeholder={ __( 'Insert title', 'freshpress-website' ) }
						/>
					),
					vat_steps_step__text: (
						<EditorControls.RichText
							className="vat-steps-step__text"
							value={ step.vat_steps_step__text }
							onChange={ ( value ) => {
								stepDispatch( {
									type: stepActions.EDIT_STEP_TEXT,
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
										stepDispatch( {
											type: stepActions.MOVE_STEP_UP,
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
									const newStep = [ ...attributes.vat_steps_step ];
									newStep.splice( index, 1 );
									setAttributes( { vat_steps_step: newStep } );
								} }
								icon="no-alt"
							/>
							{ index < vatStepsStep.length - 1 && (
								<Button
									isSmall
									onClick={ () => {
										stepDispatch( {
											type: stepActions.MOVE_STEP_DOWN,
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

	stepPartials.push(
		<Button
			key="admin_add_button"
			isSecondary
			className="icon__add-button d-block mx-auto"
			onClick={ () => {
				stepDispatch( {
					type: stepActions.ADD_STEP,
				} );
			} }
			text={ __( 'Add Step', 'freshpress-website' ) }
			icon="plus"
		/>
	);
	stepPartials.push(
		<Button
			key="admin_remove_button"
			isSecondary
			className="icon__remove-button d-block mx-auto"
			onClick={ () => {
				stepDispatch( {
					type: stepActions.REMOVE_STEP,
				} );
			} }
			text={ __( 'Remove Step', 'freshpress-website' ) }
			icon="minus"
		/>
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }></PanelBody>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<h2 className="vat-steps__title text-center">
					<EditorControls.RichText
						name="vat_steps__title"
						placeholder={ __( 'Insert title', 'freshpress-website' ) }
					/>
				</h2>

				<ul className="vat-steps__steps">{ stepPartials }</ul>
			</div>
		</EditorControls.Context.Provider>
	);
}
