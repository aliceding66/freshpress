import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getCommonBlockSettingsClass } from 'scripts/components/EditorControls/_helpers';
import Template from 'scripts/components/_Template';
import mobileSegmentNavigationLinkPartial from '../templates/mobile_segment_navigation_link.partial.mustache';
import { BlockStateManager } from 'scripts/helpers/_fpbk_blocks';
import * as mobileSegmentNavigationLinksActions from './state/mobile_segment_navigation_links/_actions';
import mobileSegmentNavigationLinksReducer from './state/mobile_segment_navigation_links/_reducer';
import { name as blockName } from '../block.json';

export default function ( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `mobile-segment-navigation d-flex flex-wrap flex-column w-100 justify-content-between ${ getCommonBlockSettingsClass(
			attributes
		) }`,
	} );

	const blockStateManager = new BlockStateManager( attributes, setAttributes );
	const [
		mobileSegmentNavigationLinks,
		mobileSegmentNavigationLinkDispatch,
	] = blockStateManager.addReducerManager(
		mobileSegmentNavigationLinksReducer,
		'mobile_segment_navigation_links'
	);

	return (
		<EditorControls.Context.Provider
			value={ { attributes, blockName, clientId, setAttributes } }
		>
			<InspectorControls>
				<EditorControls.Acf.CommonBlockSettings />
			</InspectorControls>

			<div { ...blockProps }>
				{ mobileSegmentNavigationLinks.map( ( mobileSegmentNavigationLink, index ) => (
					<Template
						key={ mobileSegmentNavigationLink.key }
						template={ mobileSegmentNavigationLinkPartial }
						attributes={ mobileSegmentNavigationLink }
						components={ {
							mobile_segment_navigation_link: (
								<span className="w-100">
									<EditorControls.Link
										inline
										className="mobile-segment-navigation__link rounded d-flex align-items-center p-3 pr-4 text-decoration-none mb-1"
										value={
											mobileSegmentNavigationLink.mobile_segment_navigation_link
										}
										onChange={ ( value ) => {
											mobileSegmentNavigationLinkDispatch( {
												type:
													mobileSegmentNavigationLinksActions.EDIT_MOBILE_SEGMENT_NAVIGATION_LINK,
												index,
												value,
											} );
										} }
									/>
								</span>
							),
							admin_controls: (
								<div
									className="block-editor__block-controls d-flex flex-column pl-3"
									style={ { width: '35px' } }
								>
									{ index > 0 && (
										<Button
											isSmall
											onClick={ () => {
												mobileSegmentNavigationLinkDispatch( {
													type:
														mobileSegmentNavigationLinksActions.MOVE_MOBILE_SEGMENT_NAVIGATION_LINK_UP,
													index,
												} );
											} }
											icon="arrow-up-alt2"
										/>
									) }
									<Button
										isDestructive
										isSmall
										onClick={ () => {
											mobileSegmentNavigationLinkDispatch( {
												type:
													mobileSegmentNavigationLinksActions.REMOVE_MOBILE_SEGMENT_NAVIGATION_LINK,
												index,
											} );
										} }
										icon="no-alt"
									/>
									{ index < mobileSegmentNavigationLinks.length - 1 && (
										<Button
											isSmall
											onClick={ () => {
												mobileSegmentNavigationLinkDispatch( {
													type:
														mobileSegmentNavigationLinksActions.MOVE_MOBILE_SEGMENT_NAVIGATION_LINK_DOWN,
													index,
												} );
											} }
											icon="arrow-down-alt2"
										/>
									) }
								</div>
							),
						} }
					/>
				) ) }
				<Button
					isSecondary
					className="d-block mx-auto mt-4"
					onClick={ () => {
						mobileSegmentNavigationLinkDispatch( {
							type:
								mobileSegmentNavigationLinksActions.ADD_MOBILE_SEGMENT_NAVIGATION_LINK,
						} );
					} }
					icon="plus"
					text={ __( 'Add link', 'freshpress-website' ) }
				/>
			</div>
		</EditorControls.Context.Provider>
	);
}
