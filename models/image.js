/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

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
	url: {
		type: String,
		require: true
	},
	width: {
		type: Number,
		require: true
	},
	height: {
		type: Number,
		require: true
	}
});

schema.index({customer: 1, name: 1}, {unique: true});

let Image = mongoose.model('Image', schema);

module.exports = Image;
