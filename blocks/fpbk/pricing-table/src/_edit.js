import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import { RawHTML, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import PromoPricesSidebar from './components/_PromoPricesSidebar';
import TermSwitchTemplate from './components/_TermSwitchTemplate';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import { fpParsePricingCsv, formatPriceSuffixes, extractPromoDataForPlan } from './_utils';
import columnPartial from '../templates/column/index.partial.mustache';
import { templateString as columnHeadingPartial } from '../templates/column/heading.partial.mustache';
import { templateString as columnPricingPartial } from '../templates/column/pricing.partial.mustache';
import { templateString as columnTopFeaturesPartial } from '../templates/column/top-features.partial.mustache';
import { templateString as columnAddOnsPartial } from '../templates/column/add-ons.partial.mustache';
import { templateString as columnLinksPartial } from '../templates/column/links.partial.mustache';
import { name as blockName } from '../block.json';

const STATE_VALUE = 0;
const STATE_DISPATCH = 1;

export default function ( { attributes, clientId, setAttributes } ) {
	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [ preview, setPreview ] = useState( 'standard' );
	const [ pricePeriod, setPricePeriod ] = useState(
		attributes.default_to_yearly ? 'yearly' : 'monthly'
	);
	const secondaryLinks = {};
	const promoSecondaryLinks = {};

	const parsedPlans = fpParsePricingCsv(
		attributes.base_pricing_info,
		',',
		true,
		attributes?.most_popular_plan ?? 'plus'
	);
	const plans = Object.keys( parsedPlans );

	plans.forEach( ( plan ) => {
		secondaryLinks[ plan ] = blockStateManager.addStateManager(
			`links_${ plan }_secondary_links`
		);
		promoSecondaryLinks[ plan ] = blockStateManager.addStateManager(
			`promo_${ plan }_links_secondary_links`
		);
	} );

	const compactViewClass = attributes.enable_compact_view ? ' compact' : '';
	const mobileCarouselClass = attributes.mobile_carousel ? ' swiper-wrapper' : '';
	const isPromoPreview = preview === 'promo';
	const priceSuffixes = formatPriceSuffixes( attributes );
	const blockProps = useBlockProps( {
		className: `pricing-table position-relative ${ getCommonBlockSettingsClass( attributes ) }`,
		'data-term': pricePeriod,
	} );

	const columnPartials = [];

	const mostPopularPlanOptions = {
		'': __( 'None', 'freshpress-website' ),
	};

	plans.forEach( ( plan ) => {
		mostPopularPlanOptions[ plan ] = parsedPlans[ plan ].name;

		if ( parsedPlans[ plan ] ) {
			const promoData = extractPromoDataForPlan( plan, attributes );

			columnPartials.push(
				<Template
					attributes={ {
						...attributes,
						...parsedPlans[ plan ],
						...pricingTableTemplateData, // eslint-disable-line no-undef
						...priceSuffixes,
						...promoData,
						enable_promo: isPromoPreview && ! promoData.exclude_plan,
						custom_pricing:
							( ! isPromoPreview && parsedPlans[ plan ].custom_pricing ) ||
							( isPromoPreview && promoData.promo_custom_pricing ),
					} }
					template={ columnPartial }
					partials={ {
						'partial__column-heading': columnHeadingPartial,
						'partial__column-pricing': columnPricingPartial,
						'partial__column-top-features': columnTopFeaturesPartial,
						'partial__column-add-ons': columnAddOnsPartial,
						'partial__column-links': columnLinksPartial,
					} }
					components={ {
						monthly_banner_image: (
							<div className="pricing-table_column-promo__ribbon-image m-auto monthly">
								<EditorControls.Image
									inline
									value={ attributes[ `promo_${ plan }_monthly_banner_image` ] }
									onChange={ ( newImage ) => {
										setAttributes( {
											[ `promo_${ plan }_monthly_banner_image` ]: newImage,
										} );
									} }
								/>
							</div>
						),
						standard_monthly_banner_subtext: (
							<EditorControls.RichText
								isSimple
								placeholder={ __( 'Insert banner subtext', 'freshpress-website' ) }
								value={ attributes[ `standard_${ plan }_monthly_banner_subtext` ] }
								onChange={ ( newSubtext ) => {
									setAttributes( {
										[ `standard_${ plan }_monthly_banner_subtext` ]: newSubtext,
									} );
								} }
							/>
						),
						promo_monthly_banner_subtext: (
							<EditorControls.RichText
								isSimple
								placeholder={ __( 'Insert banner subtext', 'freshpress-website' ) }
								value={ attributes[ `promo_${ plan }_monthly_banner_subtext` ] }
								onChange={ ( newSubtext ) => {
									setAttributes( {
										[ `promo_${ plan }_monthly_banner_subtext` ]: newSubtext,
									} );
								} }
							/>
						),
						yearly_banner_image: (
							<div className="pricing-table_column-promo__ribbon-image m-auto yearly">
								<EditorControls.Image
									inline
									value={ attributes[ `promo_${ plan }_yearly_banner_image` ] }
									onChange={ ( newImage ) => {
										setAttributes( {
											[ `promo_${ plan }_yearly_banner_image` ]: newImage,
										} );
									} }
								/>
							</div>
						),
						standard_yearly_banner_subtext: (
							<EditorControls.RichText
								isSimple
								placeholder={ __( 'Insert banner subtext', 'freshpress-website' ) }
								value={ attributes[ `standard_${ plan }_yearly_banner_subtext` ] }
								onChange={ ( newSubtext ) => {
									setAttributes( {
										[ `standard_${ plan }_yearly_banner_subtext` ]: newSubtext,
									} );
								} }
							/>
						),
						promo_yearly_banner_subtext: (
							<EditorControls.RichText
								isSimple
								placeholder={ __( 'Insert banner subtext', 'freshpress-website' ) }
								value={ attributes[ `promo_${ plan }_yearly_banner_subtext` ] }
								onChange={ ( newSubtext ) => {
									setAttributes( {
										[ `promo_${ plan }_yearly_banner_subtext` ]: newSubtext,
									} );
								} }
							/>
						),
						cta: (
							<div className="standard">
								<EditorControls.Link
									inline
									className={ `btn mb-2 standard px-1 ${
										'ghost' === promoData.cta_style
											? 'btn-outline-grey'
											: 'btn-cta-green'
									}` }
									name={ `links_${ plan }_cta` }
									extraModalFields={ [
										<EditorControls.Select
											key={ `links_${ plan }_cta_style` }
											name={ `links_${ plan }_cta_style` }
										/>,
									] }
								/>
							</div>
						),
						secondary_links: (
							<EditorControls.RichText
								disableLocalState
								placeholder={ __( 'Insert secondary links', 'freshpress-website' ) }
								value={ secondaryLinks[ plan ][ STATE_VALUE ] }
								onChange={ ( newSecondaryLinks ) => {
									secondaryLinks[ plan ][ STATE_DISPATCH ]( newSecondaryLinks );
								} }
							/>
						),
						promo_cta: (
							<div className="promo">
								<EditorControls.Link
									inline
									className={ `btn mb-2 promo px-0 ${
										'ghost' === promoData.promo_cta_style
											? 'btn-outline-grey'
											: 'btn-cta-green'
									}` }
									name={ `promo_${ plan }_links_cta` }
									extraModalFields={ [
										<EditorControls.Select
											key={ `promo_${ plan }_links_cta_style` }
											name={ `promo_${ plan }_links_cta_style` }
										/>,
									] }
								/>
							</div>
						),
						promo_secondary_links: (
							<EditorControls.RichText
								disableLocalState
								placeholder={ __( 'Insert secondary links', 'freshpress-website' ) }
								value={ promoSecondaryLinks[ plan ][ STATE_VALUE ] }
								onChange={ ( newPromoSecondaryLinks ) => {
									promoSecondaryLinks[ plan ][ STATE_DISPATCH ](
										newPromoSecondaryLinks
									);
								} }
							/>
						),
						// To pass validated HTML syntax.
						promo_price_monthly_subtext: (
							<RawHTML className="pricing-table_column-price__subtext position-absolute w-100">
								{ promoData.promo_price_monthly_subtext }
							</RawHTML>
						),
						promo_price_yearly_subtext: (
							<RawHTML className="pricing-table_column-price__subtext position-absolute w-100">
								{ promoData.promo_price_yearly_subtext }
							</RawHTML>
						),
					} }
				/>
			);
		}
	} );

	return (
		<EditorControls.Context.Provider
			value={ {
				attributes,
				blockName,
				clientId,
				isPromoPreview,
				pricePeriod,
				setAttributes,
				setPricePeriod,
			} }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.Select
						value={ preview }
						onChange={ ( newPreview ) => setPreview( newPreview ) }
						choices={ {
							standard: __( 'Standard', 'freshpress-website' ),
							promo: __( 'Promo', 'freshpress-website' ),
						} }
						label={ __( 'Block preview state', 'freshpress-website' ) }
						instructions={ __(
							'Change to preview and edit block in different states',
							'freshpress-website'
						) }
					/>
					<EditorControls.Select
						name="most_popular_plan"
						value={ attributes?.most_popular_plan ?? 'plus' }
						choices={ mostPopularPlanOptions }
						label={ __( 'Most popular plan', 'freshpress-website' ) }
					/>
					<EditorControls.Select name="price_disclaimer_align" />
					<EditorControls.TextArea name="base_pricing_info" />
					<EditorControls.TrueFalse name="default_to_yearly" ui="1" />
					<EditorControls.TrueFalse name="enable_compact_view" ui="1" />
					<EditorControls.TrueFalse name="enable_promo" ui="1" />
					<EditorControls.TrueFalse name="force_promo" ui="1" />
					<EditorControls.Acf.Group name="pricing_term_suffix" />
					{ attributes.enable_promo === true && (
						<Panel>
							<PanelBody
								title={ __( 'Promo prices', 'freshpress-website' ) }
								initialOpen={ false }
							>
								<PromoPricesSidebar plans={ plans } />
							</PanelBody>
						</Panel>
					) }
					<EditorControls.Acf.Accordion name="block_design" />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<TermSwitchTemplate />

				<div className="pricing-table" data-promo-show={ isPromoPreview }>
					<div
						className={ `pricing-table__price-disclaimer mx-auto pr-2 text-center text-md-${
							attributes?.price_disclaimer_align === 'left' ? 'left' : 'right'
						}` }
					>
						{ /* eslint-disable-next-line no-undef */ }
						{ pricingTableTemplateData.labels.pricing_grid_disclaimer }
					</div>

					<div
						className={ `pricing-table_grid row mx-auto justify-content-md-center pb-5${ compactViewClass }${ mobileCarouselClass }` }
					>
						{ columnPartials }
					</div>
				</div>
			</div>
		</EditorControls.Context.Provider>
	);
}
