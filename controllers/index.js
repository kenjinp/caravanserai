'use strict';

const IndexModel = require('../models/index');

module.exports = (router) => {

	var model = new IndexModel();

	router.get('/', (req, res) => {
		res.render('index', model);
	});
    router.get('/home', (req, res) => {
        res.render('index', model);
    });

	router.use('/api', require('./api/index'));
};
