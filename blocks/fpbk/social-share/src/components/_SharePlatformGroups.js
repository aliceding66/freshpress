import { PanelBody } from '@wordpress/components';
import { useEffect, useReducer } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import EditorControls from 'scripts/components/_EditorControls';
import { getEditorControlsContext } from 'scripts/components/EditorControls/_helpers';
import * as shareIconOrderActions from '../state/share_icons_order/_actions';
import shareIconsOrderReducer from '../state/share_icons_order/_reducer';

const excludeSharePlatforms = [ 'youtube', 'instagram' ];

export default () => {
	const { attributes, setAttributes, shareIconsOrderDefinition } = getEditorControlsContext();
	const [ shareIconsOrder, dispatchShareIconOrder ] = useReducer(
		shareIconsOrderReducer,
		attributes.share_icons_order
	);

	useEffect( () => {
		setAttributes( { share_icons_order: shareIconsOrder } );
	}, [ shareIconsOrder ] );

	return Object.keys( shareIconsOrderDefinition.choices ).map( ( sharePlatform ) => {
		if ( ! excludeSharePlatforms.includes( sharePlatform ) ) {
			const sharePlatformEnabled =
				Array.isArray( shareIconsOrder ) && shareIconsOrder.includes( sharePlatform );

			return (
				<PanelBody>
					<div className="position-relative">
						<EditorControls.TrueFalse
							label={ `${ __( 'Enable', 'freshpress-website' ) } ${
								shareIconsOrderDefinition.choices[ sharePlatform ]
							}` }
							value={ sharePlatformEnabled }
							onChange={ ( enabled ) => {
								if ( enabled ) {
									dispatchShareIconOrder( {
										type: shareIconOrderActions.ENABLE_SHARE_ICON,
										value: sharePlatform,
									} );
								} else if ( ! enabled ) {
									dispatchShareIconOrder( {
										type: shareIconOrderActions.DISABLE_SHARE_ICON,
										value: sharePlatform,
									} );
								}
							} }
						/>
					</div>
					{ sharePlatformEnabled === true && (
						<>
							<EditorControls.Range
								label={ __( 'Order', 'freshpress-website' ) }
								value={ shareIconsOrder.indexOf( sharePlatform ) + 1 }
								onChange={ ( newIndex ) => {
									dispatchShareIconOrder( {
										type: shareIconOrderActions.SET_SHARE_ICON_ORDER,
										index: newIndex,
										value: sharePlatform,
									} );
								} }
								min={ 1 }
								max={ shareIconsOrder.length }
							/>
							<EditorControls.Acf.Group
								key={ `share_icon_group_${ sharePlatform }` }
								name={ `share_on_${ sharePlatform }_group` }
							/>
						</>
					) }
				</PanelBody>
			);
		}

		return null;
	} );
};
