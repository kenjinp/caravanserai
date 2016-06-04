/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let log = require('../../libs/utils/logger').createLog('TwoLetterCodeValidator');

function validate(value, callback) {
	try {
		callback(_.isString(value) && value.length === 2 && value.toUpperCase() === value);
	} catch (error) {
		log.warn('Error on validation');
		callback(false);
	}
}

module.exports = (fieldName) => {
	return {
		validator: validate,
		message: `{VALUE} is not a valid upper case two-letter-code for field "${fieldName}"`
	};
};
