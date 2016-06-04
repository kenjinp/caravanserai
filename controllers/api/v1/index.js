/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let express = require('express');

let router = express.Router();

router.use('/version', require('./version'));

module.exports = router;
