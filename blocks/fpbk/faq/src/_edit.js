import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import questionAndAnswerPartial from '../templates/qa.partial.mustache';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import qaReducer from './state/questions_and_answers/_reducer';
import * as qaActions from './state/questions_and_answers/_actions';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `faq ${ getCommonBlockSettingsClass( attributes ) }`,
	} );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ qaState, qaDispatch ] = blockStateManager.addReducerManager(
		qaReducer,
		'questions_and_answers'
	);

	// Templates
	const qaPartials = qaState.map( ( qa, index ) => (
		<Template
			attributes={ { ...qa, ...attributes } }
			key={ qa.key }
			template={ questionAndAnswerPartial }
			components={ {
				question: (
					<EditorControls.RichText
						isSimple
						value={ qa.question }
						onChange={ ( value ) => {
							qaDispatch( {
								type: qaActions.EDIT_QA_QUESTION,
								index,
								value,
							} );
						} }
						placeholder={ __( 'Insert question here', 'freshpress-website' ) }
					/>
				),
				answer: (
					<EditorControls.RichText
						isExtended
						value={ qa.answer }
						onChange={ ( value ) => {
							qaDispatch( {
								type: qaActions.EDIT_QA_ANSWER,
								index,
								value,
							} );
						} }
						placeholder={ __( 'Answer the above question', 'freshpress-website' ) }
					/>
				),
				admin_controls: (
					<div className="block-editor__block-controls faq__item_buttons d-flex flex-column flex-nowrap position-absolute m-0">
						{ index > 0 && (
							<Button
								isSmall
								onClick={ () => {
									qaDispatch( { type: qaActions.MOVE_QA_UP, index } );
								} }
								icon="arrow-up-alt2"
							/>
						) }
						<Button
							isDestructive
							isSmall
							onClick={ () => {
								qaDispatch( { type: qaActions.REMOVE_QA, index } );
							} }
							icon="no-alt"
						/>
						{ index < qaState.length - 1 && (
							<Button
								isSmall
								onClick={ () => {
									qaDispatch( { type: qaActions.MOVE_QA_DOWN, index } );
								} }
								icon="arrow-down-alt2"
							/>
						) }
					</div>
				),
			} }
		/>
	) );

	qaPartials.push(
		/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
		<Button
			isSecondary
			className={ `faq__item faq__button_add-row py-2 px-3 mt-1 mb-2 d-block mx-auto` }
			key="admin_add_button"
			onClick={ () => {
				qaDispatch( { type: qaActions.ADD_QA } );
			} }
			text={ __( 'Add FAQ row', 'freshpress-website' ) }
			icon="plus"
		/>
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<h2 className="faq__headline text-center">
					<EditorControls.RichText
						name="headline"
						placeholder={ __( 'Insert FAQ Headline', 'freshpress-website' ) }
					/>
				</h2>
				<div className="faq__items">{ qaPartials }</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
