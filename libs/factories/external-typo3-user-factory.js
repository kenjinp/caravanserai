/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let dbTools = require('../utils/db-tools');
let ExternalUser = require('../../models/external-user');
let TwoLetterCode = require('../../models/two-letter-code');
let ecConnector = require('../apis/ec-connector');
const ENUMS = require('../../consts/enums');
const EXTERNAL_TYPES = ENUMS.ENUMS.EXTERNAL_TYPES;

function validateKey(key, name) {
	if (!key || !_.isFinite(key) || Number(key) < 1) {
		throw new Error('invalid' + name);
	}
}

function validateSpecials(specials) {
	if (!specials) {
		throw new Error('No specials given');
	}
	validateKey(specials.key1, 'Key1');
	validateKey(specials.key2, 'Key2');
}

function validateCustomer(customer) {
	if (!customer) {
		throw new Error('No customer given');
	}
	if (customer.type !== EXTERNAL_TYPES.TYPO3) {
		throw new Error('Invalid customer type for this user factory');
	}

	if (!customer.externalApiEndpointUrl) {
		throw new Error('No external api endpoint url');
	}
}

function validateExternalUserId(externalUserId) {
	let euid = Number(externalUserId);
	if (!externalUserId) {
		throw new Error('No external user id');
	}
	if (euid !== parseInt(euid) || euid < 0) {
		throw new Error('Invalid external user id');
	}
}

function getUserData(customer, externUserId, specials) {
	let options = {
		url: customer.externalApiEndpointUrl,
		key1: specials.key1,
		key2: specials.key2,
		action: 'getUserDetails',
		data: {
			asJson: true,
			userId: externUserId
		}
	};
	return ecConnector.sendRequest(options);
}

function createUser(customer, externalUserId, specials) {
	return new Promise((resolve, reject) => {
		try {
			validateCustomer(customer);
			validateExternalUserId(externalUserId);
			validateSpecials(specials);

			let externalUser = null;
			let debugUserDetails = null;
			getUserData(customer, externalUserId, specials).then((userDetails) => {
				debugUserDetails = userDetails;
				externalUser = {
					customer: customer._id,
					username: userDetails.username,
					firstName: userDetails.firstName,
					middleName: userDetails.middleName,
					lastName: userDetails.lastName,
					email: userDetails.email,
					title: userDetails.title,
					externalId: String(userDetails.id),
					type: ENUMS.VALUE_TO_KEY.EXTERNAL_TYPES[ENUMS.ENUMS.EXTERNAL_TYPES.TYPO3]
				};
				return dbTools.findOne(TwoLetterCode, {code: userDetails.language});
			}).then((twoLetterCode) => {
				if (!twoLetterCode) {
					throw new Error('Could not determine two letter code for user');
				}
				externalUser.language = twoLetterCode._id;
				let externalUserModel = new ExternalUser(externalUser);
				return dbTools.save(externalUserModel);
			}).then(resolve).catch((error) => {
				error.data = {externalUser: externalUser, userDetails: debugUserDetails};
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = {
	createUser: createUser
};
