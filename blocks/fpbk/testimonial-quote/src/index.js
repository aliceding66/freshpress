import { registerBlockType } from '@wordpress/blocks';
import config from '../block.json';
import Edit from './_edit';
import './style.scss';
import freshbooksLogo from 'images/logos/freshbooks-logomark-reacty.svg';

const { name: blockName, ...restConfig } = config;

registerBlockType( blockName, {
	...restConfig,
	icon: <img src={ freshbooksLogo } alt="FreshBooks Logo" />,
	edit: Edit,
} );
