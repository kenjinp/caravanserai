'use strict';

const
	express = require('express'),
	router = express.Router(),
	version = require('../../../package.json').version;

router.get('/', (req, res) => res.status(200).json({version: version}));

module.exports = router;
