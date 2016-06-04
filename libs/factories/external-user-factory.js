/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let dbTools = require('../utils/db-tools');
let ExternalUser = require('../../models/external-user');
let externalTypo3UserFactory = require('./external-typo3-user-factory');
const EXTERNAL_TYPES = require('../../consts/enums').ENUMS.EXTERNAL_TYPES;

function createUser(customer, externalUserId, specials) {
	return new Promise((resolve, reject) => {
		try {
			let createUserHandler = null;
			if (customer.type === EXTERNAL_TYPES.TYPO3) {
				createUserHandler = _.bind(externalTypo3UserFactory.createUser, externalTypo3UserFactory);
			}
			if (!createUserHandler) {
				throw new Error('No user creation handler for this customer type');
			}
			createUserHandler(customer, externalUserId, specials).then((user) => {
				resolve(user);
			}).catch((error) => {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

function getUser(customer, externalUserId, specials) {
	return new Promise((resolve, reject) => {
		try {
			if (!customer) {
				throw new Error('No customer given');
			}

			if (!externalUserId) {
				throw new Error('No externUserId given');
			}
			dbTools.find(ExternalUser, {customer: customer.id, externalId: externalUserId}).then((users) => {
				if (users.length > 1) {
					let e = new Error('Could not uniquely identify user');
					e.data = {
						customerId: customer.id,
						externalUserId: externalUserId
					};
					throw e;
				}
				if (users.length === 1) {
					return users[0];
				}
				return createUser(customer, externalUserId, specials);
			}).then((user) => {
				resolve(user);
			}).catch((error) => {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = {
	getUser: getUser
};
