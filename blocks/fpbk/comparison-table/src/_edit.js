import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import { fpFormatComparisonData } from './utils/_csv';
import Template from 'scripts/components/_Template';
import blockTemplate from '../templates/block.mustache';
import planHeaderPartialTemplate from '../templates/plan_header.partial.mustache';
import planCellPartialTemplate from '../templates/plan_cell.partial.mustache';
import { templateString as comparisonTablePartial } from '../templates/comparison_table.partial.mustache';
import { name as blockName } from '../block.json';

const adminData = {
	admin: true,
	edit_on_sidebar_label: __( 'Edit on Sidebar', 'freshpress-website' ),
};

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `comparison-table position-relative px-0 px-xl-3 mx-lg-auto ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const headerPartials = [];
	headerPartials.push(
		<Template
			attributes={ attributes }
			template={ planHeaderPartialTemplate }
			components={ {
				plan_header_trial_cell_title: (
					<EditorControls.RichText
						isSimple
						name="plan_header_trial_cell_title"
						placeholder={ __( 'Insert title', 'freshpress-website' ) }
					/>
				),
				plan_header_trial_cell_buy_cta: (
					<EditorControls.Link
						inline
						className="btn btn-cta-green d-inline-block mr-1"
						name="plan_header_trial_cell_buy_cta"
					/>
				),
				plan_header_trial_cell_promo_buy_cta: (
					<EditorControls.Link
						inline
						className="btn btn-cta-green d-inline-block mr-3"
						name="plan_header_trial_cell_promo_buy_cta"
					/>
				),
				plan_header_trial_cell_trial_cta: (
					<EditorControls.Link
						inline
						className="btn btn-outline-grey ml-1"
						name="plan_header_trial_cell_trial_cta"
					/>
				),
			} }
		/>
	);

	attributes.plan_header_plan_cells.forEach( ( planCell ) => {
		headerPartials.push(
			<Template
				attributes={ {
					...planCell,
					...adminData,
					enable_promo: attributes.enable_promo,
				} }
				template={ planCellPartialTemplate }
			/>
		);
	} );

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<PanelBody initialOpen={ true }>
					<EditorControls.TrueFalse name="enable_promo" />
					<EditorControls.Acf.Repeater name="plan_header_plan_cells" />
					<EditorControls.TextArea name="base_comparison_info" rows={ 10 } />
				</PanelBody>

				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				<div className="comparison-table__header-sticky table-sticky-header sticky-top">
					<table className="comparison-table__header-table table table-borderless table-responsive-lg mb-0 w-100">
						<thead className="comparison-table__header-row">
							<tr>{ headerPartials }</tr>
						</thead>
					</table>
				</div>
				<Template
					template={ blockTemplate }
					attributes={ {
						...attributes,
						comparison_table: fpFormatComparisonData(
							attributes.base_comparison_info,
							// eslint-disable-next-line no-undef
							comparisonTableTemplateData?.icons
						),
					} }
					partials={ {
						partial__comparison_table: comparisonTablePartial,
					} }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
