import * as competitorActions from '../state/competitors/_actions';
import EditorControls from 'scripts/components/_EditorControls';

const CompetitorScreenshots = ( { competitors, competitorsDispatch } ) => {
	return (
		competitors.length &&
		competitors.map( ( competitor, competitorIndex ) => (
			<td key={ competitorIndex }>
				<div className="text-center">{ 'Desktop Screenshot' }</div>
				<EditorControls.Image
					inline
					className="img-fluid"
					value={ competitor.screenshot }
					onChange={ ( value ) => {
						competitorsDispatch( {
							type: competitorActions.COMPETITOR_EDIT_SCREENSHOT,
							index: competitorIndex,
							value,
						} );
					} }
					previewSize="large"
				/>
				<div className="text-center mt-2">{ 'Mobile Screenshot' }</div>
				<EditorControls.Image
					inline
					className="img-fluid"
					value={ competitor.mobile_screenshot }
					onChange={ ( value ) => {
						competitorsDispatch( {
							type: competitorActions.COMPETITOR_EDIT_MOBILE_SCREENSHOT,
							index: competitorIndex,
							value,
						} );
					} }
					previewSize="large"
				/>
			</td>
		) )
	);
};

export default CompetitorScreenshots;
