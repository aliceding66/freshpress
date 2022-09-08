import { nanoid } from 'nanoid';
import { useEffect, useState } from '@wordpress/element';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import switchPartial from '../../templates/switch.partial.mustache';

export default () => {
	const {
		attributes,
		setAttributes,
		pricePeriod,
		setPricePeriod,
		isPromoPreview = false,
	} = getEditorControlsContext();
	const labelKeys = {
		monthly: 'term_switch_monthly_term_label',
		monthlyPromo: 'term_switch_promo_monthly_term_label',
		yearly: 'term_switch_yearly_term_label',
		yearlyPromo: 'term_switch_promo_yearly_term_label',
	};
	const { random = nanoid() } = pricingTableTemplateData; // eslint-disable-line no-undef

	const [ monthlyLabel, setMonthlyLabel ] = useState( attributes[ labelKeys.monthly ] );
	const [ monthlyPromoLabel, setMonthlyPromoLabel ] = useState(
		attributes[ labelKeys.monthlyPromo ]
	);
	const [ yearlyLabel, setYearlyLabel ] = useState( attributes[ labelKeys.yearly ] );
	const [ yearlyPromoLabel, setYearlyPromoLabel ] = useState(
		attributes[ labelKeys.yearlyPromo ]
	);

	useEffect( () => {
		setAttributes( {
			[ labelKeys.monthly ]: monthlyLabel,
			[ labelKeys.monthlyPromo ]: monthlyPromoLabel,
			[ labelKeys.yearly ]: yearlyLabel,
			[ labelKeys.yearlyPromo ]: yearlyPromoLabel,
		} );
	}, [ monthlyLabel, monthlyPromoLabel, yearlyLabel, yearlyPromoLabel ] );

	return (
		<Template
			template={ switchPartial }
			attributes={ {
				default_to_yearly: attributes.default_to_yearly,
				labels: { random },
			} }
			components={ {
				admin_term_switch: (
					<input
						id={ random }
						type="checkbox"
						className="pricing-table_term-switch__checkbox"
						checked={ pricePeriod === 'yearly' }
						onChange={ ( event ) => {
							if ( event.target.checked ) {
								setPricePeriod( 'yearly' );
							} else {
								setPricePeriod( 'monthly' );
							}
						} }
					/>
				),
				admin_monthly_label: isPromoPreview ? (
					<EditorControls.RichText
						isSimple
						className="pricing-table_term-switch__monthly-label"
						key="term_monthly_label"
						value={ monthlyPromoLabel }
						onChange={ ( newMonthlyPromoLabel ) => {
							setMonthlyPromoLabel( newMonthlyPromoLabel );
						} }
					/>
				) : (
					<EditorControls.RichText
						isSimple
						className="pricing-table_term-switch__monthly-label"
						key="term_monthly_promo_label"
						value={ monthlyLabel }
						onChange={ ( newMonthlyLabel ) => {
							setMonthlyLabel( newMonthlyLabel );
						} }
					/>
				),
				admin_yearly_label: isPromoPreview ? (
					<EditorControls.RichText
						isSimple
						className="pricing-table_term-switch__yearly-label"
						key="term_yearly_label"
						value={ yearlyPromoLabel }
						onChange={ ( newYearlyPromoLabel ) => {
							setYearlyPromoLabel( newYearlyPromoLabel );
						} }
					/>
				) : (
					<EditorControls.RichText
						isSimple
						className="pricing-table_term-switch__yearly-label"
						key="term_yearly_promo_label"
						value={ yearlyLabel }
						onChange={ ( newYearlyLabel ) => {
							setYearlyLabel( newYearlyLabel );
						} }
					/>
				),
			} }
		/>
	);
};
