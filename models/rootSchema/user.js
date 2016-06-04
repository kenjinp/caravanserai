/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

module.exports = {
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
		require: true,
		index: true
	},
	username: {
		type: String,
		require: true,
		index: true
	},
	firstName: {
		type: String,
		require: true,
		index: true
	},
	middleName: {
		type: String,
		index: true
	},
	lastName: {
		type: String,
		require: true,
		index: true
	},
	email: {
		type: String
	},
	title: {
		type: String
	},
	language: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TwoLetterCode',
		require: true
	}
};
