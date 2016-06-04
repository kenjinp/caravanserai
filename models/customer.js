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
		require: true,
		index: {unique: true}
	},
	authUser: {
		type: String,
		require: true,
		index: {unique: true}
	},
	authPassword: {
		type: String,
		require: true,
		index: {unique: true}
	},
	type: {
		type: String,
		enum: ENUMS.KEYS.EXTERNAL_TYPES
	},
	externalApiEndpointUrl: {
		type: String
	}
});

let Customer = mongoose.model('Customer', schema);

module.exports = Customer;
