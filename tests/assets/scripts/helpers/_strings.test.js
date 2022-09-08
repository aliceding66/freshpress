/* eslint-env jest */

import * as _strings from 'scripts/helpers/_strings';

const testPhrases = [
	{
		original: 'an example phrase',
		camel: 'anExamplePhrase',
		kebab: 'an-example-phrase',
		lower: 'an example phrase',
		pascal: 'AnExamplePhrase',
		snake: 'an_example_phrase',
		title: 'An Example Phrase',
		upper: 'AN EXAMPLE PHRASE',
	},
	{
		original: '...an example, with punctuation',
		camel: 'anExampleWithPunctuation',
		kebab: 'an-example-with-punctuation',
		lower: '...an example, with punctuation',
		pascal: 'AnExampleWithPunctuation',
		snake: 'an_example_with_punctuation',
		title: '...an Example, With Punctuation',
		upper: '...AN EXAMPLE, WITH PUNCTUATION',
	},
	{
		original: 'a phrase starting with one letter',
		camel: 'aPhraseStartingWithOneLetter',
		kebab: 'a-phrase-starting-with-one-letter',
		lower: 'a phrase starting with one letter',
		pascal: 'APhraseStartingWithOneLetter',
		snake: 'a_phrase_starting_with_one_letter',
		title: 'A Phrase Starting With One Letter',
		upper: 'A PHRASE STARTING WITH ONE LETTER',
	},
	{
		original: 'a question?',
		camel: 'aQuestion',
		kebab: 'a-question',
		lower: 'a question?',
		pascal: 'AQuestion',
		snake: 'a_question',
		title: 'A Question?',
		upper: 'A QUESTION?',
	},
	{
		original: 'example with 1 number',
		camel: 'exampleWith1Number',
		kebab: 'example-with-1-number',
		lower: 'example with 1 number',
		pascal: 'ExampleWith1Number',
		snake: 'example_with_1_number',
		title: 'Example With 1 Number',
		upper: 'EXAMPLE WITH 1 NUMBER',
	},
	{
		original: '2nd example with 2 numbers',
		camel: '2ndExampleWith2Numbers',
		kebab: '2nd-example-with-2-numbers',
		lower: '2nd example with 2 numbers',
		pascal: '2ndExampleWith2Numbers',
		snake: '2nd_example_with_2_numbers',
		title: '2nd Example With 2 Numbers',
		upper: '2ND EXAMPLE WITH 2 NUMBERS',
	},
	{
		original: 'MixedCase words like FreshBooks',
		camel: 'mixedCaseWordsLikeFreshBooks',
		kebab: 'mixed-case-words-like-fresh-books',
		lower: 'mixedcase words like freshbooks',
		pascal: 'MixedCaseWordsLikeFreshBooks',
		snake: 'mixed_case_words_like_fresh_books',
		title: 'MixedCase Words Like FreshBooks',
		upper: 'MIXEDCASE WORDS LIKE FRESHBOOKS',
	},
	{
		original: 'Example with under_scores',
		camel: 'exampleWithUnder_scores',
		kebab: 'example-with-under_scores',
		lower: 'example with under_scores',
		pascal: 'ExampleWithUnder_scores',
		snake: 'example_with_under_scores',
		title: 'Example With Under_scores',
		upper: 'EXAMPLE WITH UNDER_SCORES',
	},
];

describe( 'helpers/_strings', () => {
	describe( 'toCamelCase', () => {
		test( 'toCamelCase function exists', () => {
			expect( typeof _strings.toCamelCase ).toBe( 'function' );
		} );
		testPhrases.forEach( ( phrase ) => {
			test( `'${ phrase.original }' is '${ phrase.camel }'`, () => {
				expect( _strings.toCamelCase( phrase.original ) ).toBe( phrase.camel );
			} );
		} );
	} );

	describe( 'toKebabCase', () => {
		test( 'toKebabCase function exists', () => {
			expect( typeof _strings.toKebabCase ).toBe( 'function' );
		} );

		testPhrases.forEach( ( phrase ) => {
			test( `'${ phrase.original }' is '${ phrase.kebab }'`, () => {
				expect( _strings.toKebabCase( phrase.original ) ).toBe( phrase.kebab );
			} );
		} );
	} );

	describe( 'toPascalCase', () => {
		test( 'toPascalCase function exists', () => {
			expect( typeof _strings.toPascalCase ).toBe( 'function' );
		} );

		testPhrases.forEach( ( phrase ) => {
			test( `'${ phrase.original }' is '${ phrase.pascal }'`, () => {
				expect( _strings.toPascalCase( phrase.original ) ).toBe( phrase.pascal );
			} );
		} );
	} );

	describe( 'toSnakeCase', () => {
		test( 'toSnakeCase function exists', () => {
			expect( typeof _strings.toSnakeCase ).toBe( 'function' );
		} );

		testPhrases.forEach( ( phrase ) => {
			test( `'${ phrase.original }' is '${ phrase.snake }'`, () => {
				expect( _strings.toSnakeCase( phrase.original ) ).toBe( phrase.snake );
			} );
		} );
	} );

	describe( 'toTitleCase', () => {
		test( 'toTitleCase function exists', () => {
			expect( typeof _strings.toTitleCase ).toBe( 'function' );
		} );

		testPhrases.forEach( ( phrase ) => {
			test( `'${ phrase.original }' is '${ phrase.title }'`, () => {
				expect( _strings.toTitleCase( phrase.original ) ).toBe( phrase.title );
			} );
		} );
	} );

	describe( 'convertCase', () => {
		test( 'convertCase function exists', () => {
			expect( typeof _strings.convertCase ).toBe( 'function' );
		} );

		[ 'camel', 'kebab', 'lower', 'pascal', 'snake', 'title', 'upper' ].forEach( ( format ) => {
			testPhrases.forEach( ( phrase ) => {
				test( `'${ phrase.original }' is '${ phrase[ format ] }'`, () => {
					expect( _strings.convertCase( phrase.original, format ) ).toBe(
						phrase[ format ]
					);
				} );
			} );
		} );
	} );
} );
