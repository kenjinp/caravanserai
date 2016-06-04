/**
 * Authentication using passport
 */
'use strict';

const
	User = require('../models/internal-user'),
	LocalStrategy = require('passport-local').Strategy;

/**
 * Get the passport local strategy, to auth user
 * using username & password/token
 */
exports.localStrategy = () => {
	return new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
		// find a user with specified email
		User.findOne({email: email}, (err, user) => {

			if (err) {
				console.error('error during login:', err);
				return done(err);
			}

			// no user found
			if (!user) {
				console.error('user with that email does no exist');

				return done(null, false, {
					message: 'Wrong username or password'
				});
			}

			if (!user.emailVerified) {
				return done(null, false, {message: 'Please first activate your account, by clicking on the link in the activation email we sent to you.'});
			}

			// if the user is found but the password is wrong
			user.validPassword(password, (err, validPassword) => {
				if (err || !validPassword) {
					return done(null, false, {message: 'Wrong username or password'});
				} else {
					// all OK
					return done(null, user);
				}
			});
		});
	});
};

/**
 * passport function for serializing user
 */
exports.serializeUser = (user, done) => {
	done(null, user.id);
};

/**
 * passport function for de-serializing user
 */
exports.deserializeUser = (id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
};
