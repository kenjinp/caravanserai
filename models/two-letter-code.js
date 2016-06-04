/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');

let schema = mongoose.Schema({
	code: {
		type: String,
		require: true,
		index: {unique: true},
		validate: require('./validators/two-letter-code-validator')('code')
	}
});

let TwoLetterCode = mongoose.model('TwoLetterCode', schema);

module.exports = TwoLetterCode;
