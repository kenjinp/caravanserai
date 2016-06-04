/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

const ENUMS = require('../consts/enums');

let schema = mongoose.Schema({
	name: {
		type: String,
		index: true,
		require: true
	},
	title: {
		type: {},
		validate: require('./validators/translation-object-validator')('title'),
		require: true
	},
	externalId: {
		type: String
	},
	externalTestType: {
		type: String,
		enum: ENUMS.KEYS.EXTERNAL_TYPES,
		default: ENUMS.VALUE_TO_KEY.EXTERNAL_TYPES[ENUMS.ENUMS.EXTERNAL_TYPES.TYPO3]
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
		require: true,
		index: true
	},
	questions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	}],
	questionAmount: {
		type: Number
	},
	randomize: {
		type: Boolean
	},
	successThreshold: {
		type: Number
	},
	scoreType: {
		type: String,
		enum: ENUMS.KEYS.SCORE_TYPES,
		require: true
	},
	showOpenAttempts: {
		type: Boolean
	},
	displayResultTimes: {
		type: String,
		enum: ENUMS.KEYS.DISPLAY_RESULTS_TIMES,
		require: true
	},
	resultType: {
		type: String,
		enum: ENUMS.KEYS.RESULT_TYPES,
		require: true
	},
	backTracking: {
		type: String,
		enum: ENUMS.KEYS.BACK_TRACKING_TYPES,
		require: true
	}
});

schema.index({customer: 1, name: 1}, {unique: true});

let Test = mongoose.model('Test', schema);

module.exports = Test;
