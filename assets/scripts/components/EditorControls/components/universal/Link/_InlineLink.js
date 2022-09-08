import { __ } from '@wordpress/i18n';

export default ( props ) => {
	const {
		openModal,
		className = 'btn btn-outline-grey',
		label = '',
		title = '',
		url = '',
		target = '',
	} = props;

	if ( url || target === 'drift' || target === 'script' ) {
		return (
			<button
				className={ className }
				onClick={ openModal }
				title={ __( 'Click to edit link', 'freshpress-website' ) }
			>
				{ title }
			</button>
		);
	}

	return (
		<button
			className="btn btn-outline-grey border-dashed text-muted my-1"
			onClick={ openModal }
			title={ __( 'Click to add link', 'freshpress-website' ) }
		>
			{ __( 'Add link', 'freshpress-website' ) } { label ? `(${ label })` : '' }
		</button>
	);
};
