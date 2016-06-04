/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

let schema = mongoose.Schema({
	text: {
		type: {},
		validate: require('./validators/translation-object-validator')('text')
	},
	image: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image'
	},
	correct: {
		type: Boolean,
		require: true
	}
});

let Answer = mongoose.model('Answer', schema);

module.exports = Answer;
