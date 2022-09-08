import { Button } from '@wordpress/components';
import * as competitorActions from '../state/competitors/_actions';
import EditorControls from 'scripts/components/_EditorControls';
import { _x } from '@wordpress/i18n';

const CompetitorNames = ( { attributes, competitors, competitorsDispatch } ) => {
	return (
		<>
			{ competitors.length &&
				competitors.map( ( competitor, competitorIndex ) => (
					<th key={ `competitorName_${ competitorIndex }` }>
						<div className="block-editor__block-controls d-flex justify-content-center position-relative mb-3">
							{ competitorIndex > 0 && (
								<Button
									isSmall
									onClick={ () => {
										competitorsDispatch( {
											type: competitorActions.COMPETITOR_MOVE_LEFT,
											index: competitorIndex,
										} );
									} }
									icon="arrow-left-alt2"
								/>
							) }
							<Button
								isDestructive
								isSmall
								onClick={ () => {
									competitorsDispatch( {
										type: competitorActions.COMPETITOR_REMOVE,
										index: competitorIndex,
									} );
								} }
								icon="no-alt"
							/>
							{ competitorIndex < competitors.length - 1 && (
								<Button
									isSmall
									onClick={ () => {
										competitorsDispatch( {
											type: competitorActions.COMPETITOR_MOVE_RIGHT,
											index: competitorIndex,
										} );
									} }
									icon="arrow-right-alt2"
								/>
							) }
						</div>
						<EditorControls.TrueFalse
							value={ competitor.has_logo }
							label={ 'Use logo?' }
							onChange={ ( value ) => {
								competitorsDispatch( {
									type: competitorActions.COMPETITOR_EDIT_HAS_LOGO,
									index: competitorIndex,
									value,
								} );
							} }
						/>
						{ competitor.has_logo ? (
							<EditorControls.Image
								inline
								className="img-fluid"
								value={ competitor.logo }
								onChange={ ( value ) => {
									competitorsDispatch( {
										type: competitorActions.COMPETITOR_EDIT_LOGO,
										index: competitorIndex,
										value,
									} );
								} }
								previewSize="large"
							/>
						) : (
							<EditorControls.RichText
								isSimple
								value={ competitor.name }
								onChange={ ( value ) => {
									competitorsDispatch( {
										type: competitorActions.COMPETITOR_EDIT_NAME,
										index: competitorIndex,
										value,
									} );
								} }
								placeholder={ _x(
									'Enter Competitor Name',
									'Competitor Table Block',
									'freshpress-website'
								) }
							/>
						) }
					</th>
				) ) }
			{ competitors.length < 3 && (
				<Button
					isSmall
					className="position-absolute"
					style={ {
						left: 'calc( 100% + 25px )',
						top: '50%',
						transform: 'translateY(-50%)',
					} }
					onClick={ () => {
						competitorsDispatch( {
							type: competitorActions.ADD_COMPETITOR,
							featuresNumber: attributes.features.length,
						} );
					} }
					icon="plus-alt2"
				/>
			) }
		</>
	);
};

export default CompetitorNames;
