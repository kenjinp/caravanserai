/**
 * Created by René Simon <mail@rene-simon.eu> on 15.05.16.
 * Copyright © Testacles 2016
 */

'use strict';

let request = require('request');
let _ = require('underscore');

const TIMEOUT = 3 * 60 * 1000;

function sendRequest(options) {
	return new Promise((resolve, reject) => {
		try {
			validateOptions(options);

			var key = getNewKey(options.key1, options.key2);
			var dataPackage = {
				ConVal1: options.key1,
				ConVal2: key,
				eCAction: options.action
			};
			if (options.data) {
				dataPackage.eCData = JSON.stringify(options.data);
			}
			request({
				url: options.url,
				method: 'POST',
				form: dataPackage,
				timeout: TIMEOUT,
				json: true
			}, (error, response, body) => {
				try {
					if (error) {
						throw new Error(error);
					}

					if (response.statusCode !== 200) {
						throw new Error((body || {}).error || 'Could not determine error on service side');
					}

					if (body.status !== 'success') {
						throw new Error((body || {}).error || 'Could not determine error on service side');
					}

					resolve(body.data);
				} catch (error) {
					reject(error);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
}

function validateOptions(options) {
	if (!options) {
		throw new Error('No options given');
	}


	if (!options.url) {
		throw new Error('No url given');
	}

	if (_.isEmpty(options.url) || !_.isString(options.url)) {
		throw new Error('Invalid url given');
	}

	validateKey(options.key1, 'key1');
	validateKey(options.key2, 'key2');

	if (!options.action) {
		throw new Error('No action given');
	}
	if (_.isEmpty(options.action) || !_.isString(options.action)) {
		throw new Error('Invalid action given');
	}
}

function validateKey(key, name) {
	if (!key || !_.isFinite(key) || Number(key) < 1) {
		throw new Error('Invalid ' + name + ' given');
	}
}

function getNewKey(conVal1, conVal2) {
	conVal1 = Number(conVal1);
	conVal2 = Number(conVal2);
	return Math.floor(((conVal1 * conVal2) / (conVal1 + conVal2)) + 2012);
}

exports.sendRequest = sendRequest;
