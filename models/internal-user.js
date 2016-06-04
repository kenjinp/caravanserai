/**
 * Created by René Simon <mail@rene-simon.eu> on 30.04.16.
 * Copyright © Testacles 2016
 */

'use strict';

let mongoose = require('mongoose');
let _ = require('underscore');

let schema = mongoose.Schema(_.clone(require('./rootSchema/user')));

schema.index({customer: 1, username: 1}, {unique: true});
schema.index({email: 1}, {unique: true, partialFilterExpression: {email: {$exists: true}}});

let InternalUser = mongoose.model('InternalUser', schema);

module.exports = InternalUser;
