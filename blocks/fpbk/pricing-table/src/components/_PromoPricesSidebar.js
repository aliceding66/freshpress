import { Panel, PanelBody } from '@wordpress/components';
import EditorControls from 'scripts/components/_EditorControls';
import { toTitleCase } from 'scripts/helpers/_strings';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';

export default ( props ) => {
	const { plans } = props;
	const { attributes, setAttributes } = getEditorControlsContext();

	const getSubtextInstructions = ( fieldName ) => {
		return (
			<span>
				Subtext below the plan price.
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a
					href="#"
					onClick={ () => {
						setAttributes( {
							[ fieldName ]:
								attributes[ fieldName ] +
								` <span class="show-tooltip">Hover Text Here <span class="hover-tooltip">Tooltip Text Here</span></span>`,
						} );
					} }
				>
					Click to insert tooltip markup.
				</a>
			</span>
		);
	};

	return plans.map( ( plan ) => (
		<Panel key={ `promo_prices_${ plan }` }>
			<PanelBody title={ toTitleCase( plan ) } initialOpen={ false }>
				<EditorControls.TrueFalse name={ `promo_${ plan }_exclude_plan` } />
				<EditorControls.TrueFalse name={ `promo_${ plan }_custom_pricing` } />
				<EditorControls.Text name={ `promo_${ plan }_monthly_price` } />
				<EditorControls.TrueFalse
					name={ `promo_${ plan }_include_monthly_price_asterisk` }
				/>
				<EditorControls.TextArea
					name={ `promo_${ plan }_monthly_price_subtext` }
					onChange={ ( newSubtext ) => {
						setAttributes( {
							[ `promo_${ plan }_monthly_price_subtext` ]: newSubtext,
						} );
					} }
					instructions={ getSubtextInstructions(
						`promo_${ plan }_monthly_price_subtext`
					) }
				/>
				<EditorControls.Text name={ `promo_${ plan }_yearly_price` } />
				<EditorControls.TrueFalse
					name={ `promo_${ plan }_include_yearly_price_asterisk` }
				/>
				<EditorControls.TextArea
					name={ `promo_${ plan }_yearly_price_subtext` }
					onChange={ ( newSubtext ) => {
						setAttributes( {
							[ `promo_${ plan }_yearly_price_subtext` ]: newSubtext,
						} );
					} }
					instructions={ getSubtextInstructions(
						`promo_${ plan }_yearly_price_subtext`
					) }
				/>
			</PanelBody>
		</Panel>
	) );
};
