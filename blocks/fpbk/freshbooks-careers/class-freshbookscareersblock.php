<?php
/**
 * FreshbooksCareers class.
 *
 * @package FreshpressBlocks\FreshbooksCareers
 * @subpackage FreshbooksCareers
 */

namespace FreshpressBlocks;

/**
 * Class FreshbooksCareers

 * @package FreshpressBlocks
 */
class FreshbooksCareersBlock extends ABlock {
	/**
	 * FreshbooksCareersBlock constructor.
	 *
	 * @param string $dir __DIR__ value.
	 */
	public function __construct( $dir ) {
		parent::__construct( $dir );

		$this->enqueue_editor_script();
		$this->enqueue_editor_style();
		$this->enqueue_script( 'freshbooks-careers-block' );
		$this->enqueue_style();

		$this->initiate_template_data();
	}

	/**
	 * Initiated static template data.
	 */
	private function initiate_template_data() {
		$this->set_static_template_data(
			[
				'str_all_departments' => __( 'All Departments', 'freshpress-website' ),
				'str_all_locations'   => __( 'All Locations', 'freshpress-website' ),
				'str_job_title'       => __( 'Job Title', 'freshpress-website' ),
				'str_department'      => __( 'Department', 'freshpress-website' ),
				'str_location'        => __( 'Location', 'freshpress-website' ),
			],
			'freshbooksCareerTemplateData'
		);
	}

	/**
	 * Function passed to "render_callback".
	 *
	 * @param array  $attributes Block's attributes.
	 * @param string $inner_blocks_content <InnerBlocks.Content /> passed from index.js.
	 *
	 * @return string
	 */
	public function render( $attributes, $inner_blocks_content ) {
		$wrapper_properties = $this->get_wrapper_properties(
			$attributes,
			[
				'class' => 'my-5 mx-auto',
			]
		);

		$block_template = $this->load_template( 'templates/block.mustache', $this->get_template_data( $attributes ) );

		return <<< HTML
<div {$wrapper_properties}>
	{$block_template}
</div>
HTML;
	}
}
