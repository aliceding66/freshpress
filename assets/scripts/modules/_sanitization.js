/**
 * Sanitization module.
 */

import escape from 'validator/lib/escape';
import unescape from 'validator/lib/unescape';
import ltrim from 'validator/lib/ltrim';
import trim from 'validator/lib/trim';
import rtrim from 'validator/lib/rtrim';
import normalizeEmail from 'validator/lib/normalizeEmail';

export default {
	escape,
	unescape,
	ltrim,
	rtrim,
	trim,
	normalizeEmail,
};
