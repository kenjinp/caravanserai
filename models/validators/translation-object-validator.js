/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let TwoLetterCode = require('../two-letter-code');
let log = require('../../libs/utils/logger').createLog('TranslationObjectValidator');
let tools = require('../../libs/utils/tools');

function validate(value, callback) {
	try {
		if (_.isEmpty(value) || !tools.isHash(value)) {
			callback(false);
			return;
		}

		let nonStringValues = _.filter(_.values(value), translation => !_.isString(translation));

		if (nonStringValues.length > 0) {
			callback(false);
			return;
		}

		let twoLetterCodes = _.keys(value);
		TwoLetterCode.count({code: {$in: twoLetterCodes}}, (error, count) => {
			let isValid = false;
			if (error) {
				log.warn('Error on getting the twoLetterCodes on validation');
			} else {
				isValid = count === twoLetterCodes.length;
			}
			callback(isValid);
		});
	} catch (error) {
		log.warn('Error on validation');
		callback(false);
	}
}

module.exports = (fieldName) => {
	return {
		validator: validate,
		message: `{VALUE} is not a valid translation object for field "${fieldName}"`
	};
};
