export default ( props ) => {
	const { active, onClick, type } = props;

	return (
		// eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<a
			className={ `product-tour__item-nav-link product-tour__item-nav-link_${ type } ${
				active > 0 ? 'product-tour__item-nav-link_active cursor-pointer' : ''
			}` }
			onClick={ onClick }
		/>
	);
};
