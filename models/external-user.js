/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');
let _ = require('underscore');

const ENUMS = require('../consts/enums');

let schema = mongoose.Schema(_.extend(_.clone(require('./rootSchema/user')), {
	externalId: {
		type: String,
		require: true,
		index: true
	},
	type: {
		type: String,
		enum: ENUMS.KEYS.EXTERNAL_TYPES,
		default: ENUMS.VALUE_TO_KEY.EXTERNAL_TYPES[ENUMS.ENUMS.EXTERNAL_TYPES.TYPO3],
		require: true
	}
}));

schema.index({customer: 1, username: 1}, {unique: true});
schema.index({customer: 1, externalId: 1}, {unique: true});

let ExternalUser = mongoose.model('ExternalUser', schema);

module.exports = ExternalUser;
