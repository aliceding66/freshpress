import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import statPartialTemplate from '../../templates/stat.partial.mustache';
import statReducer from '../../state/stats/_reducer';
import * as statActions from '../../state/stats/_actions';

export default () => {
	const { blockStateManager } = getEditorControlsContext();
	const [ stats, statDispatch ] = blockStateManager.addReducerManager( statReducer, 'stats' );

	const partialTemplates = stats.map( ( stat, index ) => (
		<Template
			attributes={ stat }
			template={ statPartialTemplate }
			key={ stat.key }
			components={ {
				number: (
					<EditorControls.RichText
						isSimple
						value={ stat.number }
						onChange={ ( value ) => {
							statDispatch( {
								type: statActions.EDIT_STAT_NUMBER,
								index,
								value,
							} );
						} }
						placeholder="000"
					/>
				),
				description: (
					<EditorControls.RichText
						isSimple
						value={ stat.description }
						onChange={ ( value ) => {
							statDispatch( {
								type: statActions.EDIT_STAT_DESCRIPTION,
								index,
								value,
							} );
						} }
						placeholder={ __( 'Insert description', 'freshpress-website' ) }
					/>
				),
			} }
		/>
	) );

	return (
		<div className="stat-tiles__bg-row px-md-3 px-xl-5 text-center">
			<h4 className="stat-tiles__heading px-3 mt-lg-3">
				<EditorControls.RichText
					isSimple
					placeholder={ __( 'Insert Heading', 'freshpress-website' ) }
					name="heading"
				/>
			</h4>

			<div className="stat-tiles__stats d-md-flex px-md-3 px-lg-4">{ partialTemplates }</div>
		</div>
	);
};
