<?php
/**
 * Tests fp_render_img() helper functions.
 *
 * @package FreshPress\Website
 */

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'class-fp-base-test.php';

/**
 *  FP_Render_Img_Test class.
 */
class FP_Render_Img_Test extends FP_Base_Test {

	const VALID_ASSET_ID = 1;
	const INVALID_ASSET_ID = 2;

	/**
	 *  Setup conditions for each test.
	 */
	public function setUp() {
		parent::setUp();

		if ( ! $this->isWindows() ) {
			$this->mock_dir( $this->getThemeRootPath() . '/dist' );
			$this->mock_dir( $this->getThemeRootPath() . '/dist/fp_render_img' );

			// 10x20 PNG image from manifest.
			$png = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAQAAAAe52TdAAAAE0lEQVR42mNM+c+AARhHBQeTIADH/RvRFPprrgAAAABJRU5ErkJggg==';
			$this->mock_file( $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'manifest-image.png', base64_decode( $png ) );
			$this->mockAssetsManifest(
				[
					'fp_render_img-manifest-image' => $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'manifest-image.png',
				]
			);
			// 10x20 PNG image not included in manifest.
			$png = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAQAAAAe52TdAAAAE0lEQVR42mNM+c+AARhHBQeTIADH/RvRFPprrgAAAABJRU5ErkJggg==';
			$this->mock_file( $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'image.png', base64_decode( $png ) );

			WP_Mock::userFunction(
				'wp_get_attachment_image',
				[
					'args'   => [ self::VALID_ASSET_ID, \WP_Mock\Functions::type( 'string' ), false, \WP_Mock\Functions::type( 'array' ) ],

					'return' => function( $asset_id, $size = 'thumbnail', $icon = false, $attributes = [] ) {
						$alt = $attributes['alt'] ?? '';
						$width = ! empty( $attributes['width'] ) ? " width=\"{$attributes['width']}\"" : '';
						$height = ! empty( $attributes['height'] ) ? " height=\"{$attributes['height']}\"" : '';

						return "<img src=\"wp-attachment.png\" alt=\"{$alt}\" data-size=\"{$size}\"{$width}{$height} />";
					},
				]
			);

			WP_Mock::userFunction(
				'wp_get_attachment_image',
				[
					'args'   => [ self::INVALID_ASSET_ID, \WP_Mock\Functions::type( 'string' ), false, \WP_Mock\Functions::type( 'array' ) ],
					'return' => '',
				]
			);
		}
	}

	/**
	 * Checks whether fp_render_img() return expected value for different cases.
	 *
	 * @dataProvider returnsExpectedResultDataProvider
	 *
	 * @param mixed  $asset_data Asset data to render.
	 * @param array  $attributes Attributes to be set in rendered image.
	 * @param array  $size Expected size of image.
	 * @param string $expected Expected <img /> value.
	 */
	public function testIfReturnsExpectedResult( $asset_data, $attributes, $size, $expected ) {
		if ( ! $this->isWindows() ) {
			$this->assertEquals( $expected, fp_render_img( $asset_data, $attributes, $size ) );
		}
	}

	/**
	 * Data provider for testIfReturnsExpectedResult().
	 *
	 * @return array
	 */
	public function returnsExpectedResultDataProvider() {
		$domain = 'https://www.dev.freshenv.com';
		$manifest_asset_key = 'fp_render_img-manifest-image';
		$manifest_asset_path = $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'manifest-image.png';
		$in_theme_asset_path = $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'image.png';
		$in_theme_missing_asset_path = $this->getThemeRootPath() . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'fp_render_img' . DIRECTORY_SEPARATOR . 'missing-image.png';

		return [
			'empty asset data'                          => [
				'asset_data' => '',
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => '',
			],
			'asset as WP attachment array with "id"'    => [
				'asset_data' => [
					'id' => self::VALID_ASSET_ID,
				],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => '<img src="wp-attachment.png" alt="Image asset" data-size="thumbnail" width="20" height="30" />',
			],
			'asset as WP attachment array with "ID" (capitalized param)' => [
				'asset_data' => [
					'ID' => self::VALID_ASSET_ID,
				],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => '<img src="wp-attachment.png" alt="Image asset" data-size="thumbnail" width="20" height="30" />',
			],
			'asset as not existing WP attachment array' => [
				'asset_data' => [ 'id' => self::INVALID_ASSET_ID ],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => '',
			],
			'asset as WP attachment numeric value'      => [
				'asset_data' => self::VALID_ASSET_ID,
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => '<img src="wp-attachment.png" alt="Image asset" data-size="thumbnail" width="20" height="30" />',
			],
			'asset as string - manifest path to in-theme asset - with passed attributes width and height' => [
				'asset_data' => $manifest_asset_key,
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" width=\"20\" height=\"30\" src=\"{$domain}{$manifest_asset_path}\" />",
			],
			'asset as string - manifest path to in-theme asset - without passed attributes width and height' => [
				'asset_data' => $manifest_asset_key,
				'attributes' => [
					'alt' => 'Image asset',
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" src=\"{$domain}{$manifest_asset_path}\" width=\"10\" height=\"20\" />",
			],
			'asset as manifest in-theme asset array with "url"' => [
				'asset_data' => [ 'url' => $manifest_asset_path ],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" width=\"20\" height=\"30\" src=\"{$manifest_asset_path}\" />",
			],
			'asset as non-manifest in-theme asset array with "url"' => [
				'asset_data' => [ 'url' => $in_theme_asset_path ],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" width=\"20\" height=\"30\" src=\"{$in_theme_asset_path}\" />",
			],
			'asset with "src" passed in attributes'     => [
				'asset_data' => $manifest_asset_key,
				'attributes' => [
					'alt' => 'Image asset',
					'src' => $manifest_asset_path,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" src=\"{$domain}{$manifest_asset_path}\" width=\"10\" height=\"20\" />",
			],
			'asset as string - path to missing file'    => [
				'asset_data' => $in_theme_missing_asset_path,
				'attributes' => [
					'alt' => 'Image asset',
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" src=\"{$domain}{$in_theme_missing_asset_path}\" width=\"0\" height=\"0\" />",
			],
			'asset with not existing size'              => [
				'asset_data' => [ 'id' => self::VALID_ASSET_ID ],
				'attributes' => [
					'alt'    => 'Image asset',
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'ultra-wide-HD',
				'expected'   => '<img src="wp-attachment.png" alt="Image asset" data-size="ultra-wide-HD" width="20" height="30" />',
			],
			'asset without alt attribute'               => [
				'asset_data' => $in_theme_asset_path,
				'attributes' => [
					'width'  => 20,
					'height' => 30,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img width=\"20\" height=\"30\" src=\"{$domain}{$in_theme_asset_path}\" alt=\"\" />",
			],
			'asset with attribute of type array'        => [
				'asset_data' => [ 'id' => self::VALID_ASSET_ID ],
				'attributes' => [
					'alt'                  => 'Image asset',
					'width'                => 20,
					'height'               => 30,
					'data-array-attribute' => [],
				],
				'size'       => 'thumbnail',
				'expected'   => '<img src="wp-attachment.png" alt="Image asset" data-size="thumbnail" width="20" height="30" />',
			],
			'asset with attribute of type bool'         => [
				'asset_data' => $in_theme_asset_path,
				'attributes' => [
					'alt'             => 'Image asset',
					'width'           => 20,
					'height'          => 30,
					'data-bool-true'  => true,
					'data-bool-false' => false,
				],
				'size'       => 'thumbnail',
				'expected'   => "<img alt=\"Image asset\" width=\"20\" height=\"30\" data-bool-true src=\"{$domain}{$in_theme_asset_path}\" />",
			],
		];
	}
}
