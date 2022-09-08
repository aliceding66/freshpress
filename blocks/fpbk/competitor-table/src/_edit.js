import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components'; // eslint-disable-line
import { _x } from '@wordpress/i18n'; // eslint-disable-line
import EditorControls from 'scripts/components/_EditorControls';
import { BlockStateManager, generateBlockId } from 'scripts/helpers/_fpbk_blocks';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { name as blockName } from '../block.json';

import FeatureRows from './components/FeatureRows';
import CompetitorScreenshots from './components/CompetitorScreenshots';
import CompetitorNames from './components/CompetitorNames';
import competitorReducer from './state/competitors/_reducer';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `competitor-table position-relative ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	if ( ! attributes.id || attributes.id === '' ) {
		setAttributes( { id: generateBlockId( blockName ) } );
	}

	const blockStateManager = new BlockStateManager( attributes, setAttributes );

	const [ competitors, competitorsDispatch ] = blockStateManager.addReducerManager(
		competitorReducer,
		'competitors'
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.ColourPicker name="freshbooks_column_colour" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps } style={ { padding: '0 5rem' } }>
				<style>
					{ `#${ attributes.id } tr td:nth-child(2), #${ attributes.id } tr th:nth-child(2) {
							background-color: ${ attributes.freshbooks_column_colour };
						}` }
				</style>
				<table className="w-100">
					<tr className="position-relative">
						<th>
							{ _x(
								'Product Comparison',
								'Competitor Table Block',
								'freshpress-website'
							) }
						</th>
						<CompetitorNames
							attributes={ attributes }
							competitors={ competitors }
							competitorsDispatch={ competitorsDispatch }
						/>
					</tr>
					<tr>
						<td>
							{ _x(
								'Product Screenshot',
								'Competitor Table Block',
								'freshpress-website'
							) }
						</td>
						<CompetitorScreenshots
							competitors={ competitors }
							competitorsDispatch={ competitorsDispatch }
						/>
					</tr>
					<FeatureRows attributes={ attributes } setAttributes={ setAttributes } />
				</table>
				<span
					className="competitor-table__subtext mx-auto d-block"
					style={ { maxWidth: '320px' } }
				>
					<EditorControls.RichText
						name="subtext"
						placeholder={ _x(
							'Enter Subtext Here',
							'Competitor Table Block',
							'freshpress-website'
						) }
					/>
				</span>
			</div>
		</EditorControls.Context.Provider>
	);
}
