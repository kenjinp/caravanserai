/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let logger = require('./utils/logger');
let log = logger.createLog('startup');
let mongoClient = require('./mongo-client');

function start(config, callback) {
	function cleanCallback(error) {
		if (error) {
			log.fatal('... failed startup process', error);
		} else {
			log.info('... finished startup');
		}
		callback(error);
	}

	try {
		log.info('Starting up ...');
		logger.init(config.get('logger'));
		mongoClient.init(config.get('mongo'))
		.then(() => {
			cleanCallback();
		}).catch(cleanCallback);
	} catch (error) {
		cleanCallback(error);
	}
}

exports.start = start;
