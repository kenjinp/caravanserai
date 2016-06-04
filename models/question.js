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
	text: {
		type: {},
		validate: require('./validators/translation-object-validator')('text')
	},
	image: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image'
	},
	template: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'QuestionTemplate',
		require: true
	},
	type: {
		type: String,
		enum: ENUMS.KEYS.QUESTION_TYPES,
		require: true
	},
	answers: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Answer'
		}]
	},
	draggableItems: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'DraggableItem'
		}]
	},
	dropZones: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'DropZone'
		}]
	}
});

schema.index({customer: 1, name: 1}, {unique: true});

let Question = mongoose.model('Question', schema);

module.exports = Question;
