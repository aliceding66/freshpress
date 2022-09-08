export function setCommonAttributes( attributes ) {
	// Starter object.
	const commonTopicAttributes = {};

	// Columns Number/Class.
	const columnsNumber = attributes.block_settings_icons_list_columns;
	let columnsClass = 'col-12';

	if ( '2' === columnsNumber ) {
		columnsClass += ' col-sm-6';
	} else if ( '3' === columnsNumber ) {
		columnsClass += ' col-sm-6 col-md-4';
	} else if ( '4' === columnsNumber ) {
		columnsClass += ' col-sm-6 col-md-4 col-lg-3';
	}

	// Stack.
	if ( attributes.block_settings_topic_elements_stack ) {
		columnsClass += ' flex-column justify-content-center';
	}

	commonTopicAttributes.columns_class = columnsClass;

	// Topic Icon Class.
	let topicIconClass = 'mr-3';
	if ( attributes.block_settings_topic_elements_stack ) {
		topicIconClass = 'mx-auto';
	}
	commonTopicAttributes.topic_icon_class = topicIconClass;

	// Description Class.
	let numberedTopicInfoClass = '';
	let showIcons = true;
	if ( attributes.block_settings_numbered_topics ) {
		numberedTopicInfoClass = 'pl-3 pl-md-1';
		showIcons = false;
	}
	commonTopicAttributes.show_icons = showIcons;
	commonTopicAttributes.numbered_topic_info_class = numberedTopicInfoClass;

	// Mobile Align Class.
	let mobileAlignClass = 'ml-0';
	if ( attributes.block_settings_numbered_topics ) {
		mobileAlignClass = 'text-left';
	} else if ( attributes.block_settings_topic_elements_stack ) {
		mobileAlignClass = 'mx-auto text-center';
	}
	commonTopicAttributes.mobile_align_class = mobileAlignClass;

	return commonTopicAttributes;
}

export function setTopicAttributes( iconListTopic, topicIndex ) {
	// Index.
	iconListTopic.index = topicIndex + 1;

	// Title Vertical Align Class / Has Description.
	let titleVerticalAlignClass = 'align-self-center';
	if ( iconListTopic.icons_list_topic_text ) {
		titleVerticalAlignClass = '';
	}
	iconListTopic.title_vertical_align_class = titleVerticalAlignClass;

	return iconListTopic;
}
