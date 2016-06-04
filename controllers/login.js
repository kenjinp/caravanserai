'use strict';

const
	passport = require('passport'),
	log = require('../libs/utils/logger').createLog('indexController');


module.exports = (router) => {

	router.post('/login',
		passport.authenticate('local', {
			successRedirect: '/',
			successFlash: 'Welcome!',
			failureRedirect: '/login',
			failureFlash: true
		})
	);

	router.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});

	router.get('/register', (req, res) => {
		res.render('register');
	});

	router.get('/auth/google',
		passport.authenticate('google', {scope: 'profile email'})
	);

};
