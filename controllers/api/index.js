/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let express = require('express');

let router = express.Router();

router.use('/v1', require('./v1/index'));

module.exports = router;
