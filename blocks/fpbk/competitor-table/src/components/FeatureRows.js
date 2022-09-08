import { Button } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { changeCompetitorFeature } from '../utils/competitor-features';
import { __ } from '@wordpress/i18n';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import * as featureActions from '../state/features/_actions';
import featureReducer from '../state/features/_reducer';
import checkmarkImage from 'images/icons/checkmark-green-gradient.svg';
import crossmarkImage from 'images/icons/crossmark-red-gradient.svg';

const FeatureRows = ( { attributes, setAttributes } ) => {
	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ features, featuresDispatch ] = blockStateManager.addReducerManager(
		featureReducer,
		'features'
	);

	return (
		<>
			{ features.length &&
				features.map( ( feature, featureIndex ) => (
					<tr
						key={ `${ feature.key }_feature_row` }
						className="competitor-table__feature-row"
					>
						<td className="position-relative">
							<div
								className="block-editor__block-controls d-flex flex-column justify-content-center position-absolute"
								style={ {
									top: '50%',
									left: '-50px',
									transform: 'translateY( -50% )',
								} }
							>
								{ featureIndex > 0 && (
									<Button
										isSmall
										onClick={ () => {
											featuresDispatch( {
												type: featureActions.FEATURE_MOVE_UP,
												index: featureIndex,
											} );
											changeCompetitorFeature(
												false,
												featureIndex,
												false,
												'move_up',
												attributes.competitors,
												setAttributes
											);
										} }
										icon="arrow-up-alt2"
									/>
								) }
								<Button
									isDestructive
									isSmall
									onClick={ () => {
										featuresDispatch( {
											type: featureActions.FEATURE_REMOVE,
											index: featureIndex,
										} );
										changeCompetitorFeature(
											false,
											featureIndex,
											false,
											'remove',
											attributes.competitors,
											setAttributes
										);
									} }
									icon="no-alt"
								/>
								{ featureIndex < features.length - 1 && (
									<Button
										isSmall
										onClick={ () => {
											featuresDispatch( {
												type: featureActions.FEATURE_MOVE_DOWN,
												index: featureIndex,
											} );
											changeCompetitorFeature(
												false,
												featureIndex,
												false,
												'move_down',
												attributes.competitors,
												setAttributes
											);
										} }
										icon="arrow-down-alt2"
									/>
								) }
							</div>
							<EditorControls.RichText
								isSimple
								value={ feature.name }
								onChange={ ( value ) => {
									featuresDispatch( {
										type: featureActions.FEATURE_EDIT_NAME,
										index: featureIndex,
										value,
									} );
								} }
								placeholder={ __( 'Insert Name', 'freshpress-website' ) }
							/>
						</td>
						{ attributes.competitors.map( ( competitor, competitorIndex ) => (
							<td key={ `${ competitor.key }_feature_row` }>
								<div className="d-flex justify-content-center">
									<label
										htmlFor={ `${ competitor.key }_feature_row-checkmark` }
										className="competitor-table__feature-row-label position-relative overflow-hidden mx-2"
									>
										<input
											id={ `${ competitor.key }_feature_row-checkmark` }
											type="checkbox"
											value={ competitor.features[ featureIndex ].checkmark }
											checked={
												competitor.features[ featureIndex ].checkmark
											}
											onChange={ () => {
												const newFeature = {
													...competitor.features[ featureIndex ],
												};
												if ( newFeature.checkmark ) {
													newFeature.checkmark = false;
												} else if (
													! newFeature.checkmark &&
													newFeature.crossmark
												) {
													newFeature.crossmark = ! competitor.features[
														featureIndex
													].crossmark;
													newFeature.checkmark = ! competitor.features[
														featureIndex
													].checkmark;
												} else {
													newFeature.checkmark = true;
												}
												changeCompetitorFeature(
													competitorIndex,
													featureIndex,
													newFeature,
													'update',
													attributes.competitors,
													setAttributes
												);
											} }
										/>
										<img src={ checkmarkImage } alt="checkmark" />
									</label>

									<label
										htmlFor={ `${ competitor.key }_feature_row-crossmark` }
										className="competitor-table__feature-row-label position-relative overflow-hidden mx-2"
									>
										<input
											id={ `${ competitor.key }_feature_row-crossmark` }
											type="checkbox"
											value={ competitor.features[ featureIndex ].crossmark }
											checked={
												competitor.features[ featureIndex ].crossmark
											}
											onChange={ () => {
												const newFeature = {
													...competitor.features[ featureIndex ],
												};
												if ( newFeature.crossmark ) {
													newFeature.crossmark = false;
												} else if (
													! newFeature.crossmark &&
													newFeature.checkmark
												) {
													newFeature.crossmark = ! competitor.features[
														featureIndex
													].crossmark;
													newFeature.checkmark = ! competitor.features[
														featureIndex
													].checkmark;
												} else {
													newFeature.crossmark = true;
												}
												changeCompetitorFeature(
													competitorIndex,
													featureIndex,
													newFeature,
													'update',
													attributes.competitors,
													setAttributes
												);
											} }
										/>
										<img src={ crossmarkImage } alt="crossmark" />
									</label>
								</div>
								<EditorControls.RichText
									isSimple
									value={ competitor.features[ featureIndex ].text }
									onChange={ ( value ) => {
										const newFeature = {
											...competitor.features[ featureIndex ],
										};
										newFeature.text = value;
										changeCompetitorFeature(
											competitorIndex,
											featureIndex,
											newFeature,
											'update',
											attributes.competitors,
											setAttributes
										);
									} }
									placeholder={ __( 'Insert Text', 'freshpress-website' ) }
								/>
							</td>
						) ) }
					</tr>
				) ) }
			<Button
				isSmall
				className="position-absolute"
				style={ { bottom: '36px', left: '33px' } }
				onClick={ () => {
					featuresDispatch( {
						type: featureActions.ADD_FEATURE,
					} );
					changeCompetitorFeature(
						false,
						false,
						false,
						'add',
						attributes.competitors,
						setAttributes
					);
				} }
				icon="plus-alt2"
			/>
		</>
	);
};

export default FeatureRows;
