/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let tools = require('../libs/utils/tools');

const ENUMS = {
	EXTERNAL_TYPES: {
		TYPO3: 'TYPO3'
	},
	SCORE_TYPES: {
		QUESTIONS: 'questions',
		PERCENTAGE: 'percentage'
	},
	DISPLAY_RESULTS_TIMES: {
		NEVER: 'never',
		ON_FAIL: 'on fail',
		ALWAYS: 'always'
	},
	RESULT_TYPES: {
		WRONG_QUESTIONS: 'wrong questions',
		ALL_QUESTIONS: 'all question'
	},
	BACK_TRACKING_TYPES: {
		AFTER_QUESTION: 'after question',
		AFTER_RESULT: 'after result'
	},
	QUESTION_TYPES: {
		MULTIPLE_CHOICE: 'multiple choice',
		SINGLE_CHOICE: 'single choice',
		DRAG_AND_DROP: 'drag and drop'
	}
};

function getKeys() {
	return tools.mapObject(ENUMS, value => _.keys(value));
}

function getValues() {
	return tools.mapObject(ENUMS, value => _.values(value));
}

function getValueToKeyMappings() {
	let mapping = {};
	_.each(ENUMS, (value, enumName) => {
		let valueToKeyMapping = {};
		_.each(value, (value, key) => {
			//I am aware that this is only working as planned when the values per enum are unique
			//Otherwise the last key with this value is mapped. this is fine for me.
			valueToKeyMapping[value] = key;
		});
		mapping[enumName] = valueToKeyMapping;
	});
	return mapping;
}

const ENUM_PARTS = {
	KEYS: getKeys(),
	VALUES: getValues(),
	ENUMS: ENUMS,
	VALUE_TO_KEY: getValueToKeyMappings()
};

module.exports = ENUM_PARTS;

