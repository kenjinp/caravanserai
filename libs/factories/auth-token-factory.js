/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let _ = require('underscore');

let AuthToken = require('../../models/auth-token');
let dbTools = require('../utils/db-tools');
let tools = require('../utils/tools');

function getToken(externalUser, specials) {
	return new Promise((resolve, reject) => {
		try {
			if (!externalUser || !externalUser.id) {
				throw new Error('No externalUser given');
			}
			specials = specials || {};
			let now = new Date();
			dbTools.find(AuthToken, {
				user: externalUser.id,
				validTill: {$gte: now}
			}).then((authTokens) => {
				if (authTokens.length > 1) {
					throw new Error('More than one valid auth token found');
				}
				if (authTokens.length === 1) {
					return authTokens[0];
				}
				return new AuthToken({
					user: externalUser.id
				});
			}).then((authToken) => {
				authToken.validTill = specials.validTill ? new Date(specials.validTill * 1000) : tools.addTime(now, {days: 1});
				if (!_.isEmpty(specials)) {
					authToken.specials = specials;
				}
				return dbTools.save(authToken);
			}).then((authToken) => {
				resolve(authToken);
			}).catch((error) => {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = {
	getToken: getToken
};
