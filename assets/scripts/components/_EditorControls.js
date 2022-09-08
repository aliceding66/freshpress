import { createContext } from '@wordpress/element';
import Accordion from './EditorControls/components/acf/_Accordion';
import Checkbox from './EditorControls/components/universal/_Checkbox';
import ConditionalLogic from './EditorControls/components/special/_ConditionalLogic';
import ColourPicker from './EditorControls/components/universal/_ColourPicker';
import CommonBlockSettings from './EditorControls/components/acf/_CommonBlockSettings';
import File from './EditorControls/components/universal/_File';
import Gallery from './EditorControls/components/universal/_Gallery';
import Group from './EditorControls/components/acf/_Group';
import Image from './EditorControls/components/universal/_Image';
import Link from './EditorControls/components/universal/_Link';
import Number from './EditorControls/components/universal/_Number';
import Range from './EditorControls/components/universal/_Range';
import Repeater from './EditorControls/components/acf/_Repeater';
import RichText from './EditorControls/components/universal/RichText/_RichText';
import Select from './EditorControls/components/universal/_Select';
import Text from './EditorControls/components/universal/_Text';
import TextArea from './EditorControls/components/universal/_TextArea';
import TrueFalse from './EditorControls/components/universal/_TrueFalse';
import VariationPicker from './EditorControls/components/special/_VariationPicker';
import ModalPicker from './EditorControls/components/special/_ModalPicker';

const EditorControls = {
	/**
	 * Context to store commonly used variables by EditorControl.*
	 */
	Context: createContext( '' ),

	/**
	 * ACF-only EditorControl.Acf.* components
	 */
	Acf: {
		Accordion,
		CommonBlockSettings,
		Group,
		Repeater,
	},

	/**
	 * Special EditorControl.Special.* components
	 */
	Special: {
		ConditionalLogic,
		VariationPicker,
		ModalPicker,
	},

	/**
	 * Universal EditorControl.* components
	 */
	Checkbox,
	ColourPicker,
	File,
	Gallery,
	Image,
	Link,
	Number,
	Range,
	RichText,
	Select,
	Text,
	TextArea,
	TrueFalse,
};

export default EditorControls;
