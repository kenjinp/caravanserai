/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

const ENUMS = require('../consts/enums');

let schema = mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
		require: true,
		index: true
	},
	name: {
		type: String,
		require: true
	},
	template: {
		type: String,
		require: true
	},
	type: {
		type: String,
		enum: ENUMS.KEYS.QUESTION_TYPES,
		require: true
	}
});

schema.index({customer: 1, name: 1}, {unique: true});

let QuestionTemplate = mongoose.model('QuestionTemplate', schema);

module.exports = QuestionTemplate;
