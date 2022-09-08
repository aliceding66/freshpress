import { isConditionalLogicValidated } from '../../_helpers';

/**
 * @param {Object} props
 * @return {JSX.Element} Returns component that handles ACF's "Conditional Logic".
 */
export default function ( props ) {
	const fieldNameToCheck = props.name ? props.name : null;
	const show = isConditionalLogicValidated( fieldNameToCheck, props );

	return <>{ show ? props.children : null }</>;
}
