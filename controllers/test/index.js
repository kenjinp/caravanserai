/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let express = require('express');

let errorHandler = require('../../libs/utils/error-handler');
let log = require('../../libs/utils/logger').createLog('test/indexController');
let AuthTokenModel = require('../../models/auth-token');
let dbTools = require('../../libs/utils/db-tools');

let router = express.Router();

function logging(req, res, next) {
	try {
		log.debug('Test requested', {params: req.params, query: req.query});
		next();
	} catch (error) {
		errorHandler.handleError(error, res);
	}
}

function allowCrossDomain(req, res, next) {
	try {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
		next();
	} catch (error) {
		errorHandler.handleError(error, res);
	}
}

function requestHandler(req, res) {
	try {
		let testId = req.params.id;
		let tokenId = req.query.token;
		dbTools.findById(AuthTokenModel, tokenId, 'user').then((authToken) => {
			let json = JSON.stringify({testId: testId, user: authToken.user.toJSON()}, null, '\t');
			console.log('Result:', json);
			res.status(200).send(`<html><head><title>Testacles Test</title></head><body><p>${json}</p></body></html>`);
		}).catch((error) => {
			errorHandler.handleError(error, res);
		});
	} catch (error) {
		errorHandler.handleError(error, res);
	}
}

router.get('/:id', logging, allowCrossDomain, requestHandler);

module.exports = router;
