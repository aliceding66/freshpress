import { BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import EditLinkModal from './Link/_EditLinkModal';
import InlineLink from './Link/_InlineLink';
import SidebarLink from './Link/_SidebarLink';
import EditorControls from '../../../_EditorControls';
import {
	getAttributeFromBlockStore,
	getAttributeValueFromContext,
	getDefaultOnChangeFromContext,
} from '../../_helpers';
import { trimChar } from 'scripts/helpers/_strings';

export const emptyLinkObject = {
	url: '',
	title: '',
	opensInNewTab: false,
	target: '_self',
	type: 'link',
};

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component based on ACF field with type "Basic: link".
 */
export default function ( props ) {
	const name = props.name ? props.name : null;
	let attribute = {};
	if ( name !== null ) {
		attribute = getAttributeFromBlockStore( name );
	}

	const {
		// eslint-disable-next-line no-unused-vars
		name: tmpName = null,
		className = '',
		extraModalFields = [],
		inline = false,
		instructions = attribute?.instructions,
		label = attribute?.label,
		onChange = attribute?.onChange,
		value = getAttributeValueFromContext( name, emptyLinkObject ),
	} = props;
	const onChangeCallback = onChange ? onChange : getDefaultOnChangeFromContext( name );

	const [ isModalOpen, setModalOpen ] = useState( false );
	const openModal = () => setModalOpen( true );
	const closeModal = () => setModalOpen( false );
	const addLink = () => {
		const linkToSet = { ...link, type: linkType };
		if ( linkText ) {
			linkToSet.title = linkText;
		}
		if ( linkType === 'open_link' ) {
			linkToSet.target = linkToSet.opensInNewTab ? '_blank' : '_self';
		} else if ( linkType === 'open_modal' ) {
			linkToSet.url = `#${ trimChar( link.url ) }`;
			linkToSet.target = 'modal';
		} else {
			linkToSet.url = link.url;
			linkToSet.target = link.target;
			linkToSet.script = link.script;
		}
		onChangeCallback( linkToSet );
		closeModal();
	};
	const removeLink = () => {
		onChangeCallback( emptyLinkObject );
		setLink( emptyLinkObject );
		setLinkText( '' );
		if ( inline ) {
			closeModal();
		}
	};
	const cancelLink = () => {
		setLink( emptyLinkObject );
		setLinkText( '' );
		closeModal();
	};

	const [ link, setLink ] = useState( value ? value : emptyLinkObject );
	const [ linkText, setLinkText ] = useState( value?.title ? value.title : '' );
	const [ linkType, setLinkType ] = useState(
		value?.type &&
			[ 'open_link', 'open_modal', 'open_drift', 'execute_script' ].includes( value.type )
			? value.type
			: 'open_link'
	);

	return (
		<EditorControls.Special.ConditionalLogic name={ name }>
			{ inline && (
				<InlineLink
					{ ...value }
					name={ name }
					className={ className }
					label={ label }
					openModal={ openModal }
					removeLink={ removeLink }
				/>
			) }

			{ ! inline && (
				// eslint-disable-next-line @wordpress/no-base-control-with-label-without-id
				<BaseControl label={ label } help={ instructions }>
					<SidebarLink { ...value } openModal={ openModal } removeLink={ removeLink } />
				</BaseControl>
			) }

			{ isModalOpen && (
				<EditLinkModal
					{ ...value }
					addLink={ addLink }
					cancelLink={ cancelLink }
					closeModal={ closeModal }
					extraModalFields={ extraModalFields }
					link={ link }
					linkText={ linkText }
					linkType={ linkType }
					removeLink={ inline ? removeLink : null }
					setLink={ setLink }
					setLinkText={ setLinkText }
					setLinkType={ setLinkType }
				/>
			) }
		</EditorControls.Special.ConditionalLogic>
	);
}
