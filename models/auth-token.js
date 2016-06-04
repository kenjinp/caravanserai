/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

let schema = mongoose.Schema({
	validTill: {
		type: Date,
		require: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ExternalUser',
		require: true
	},
	specials: {
		type: {}
	}
});

let AuthToken = mongoose.model('AuthToken', schema);

module.exports = AuthToken;
