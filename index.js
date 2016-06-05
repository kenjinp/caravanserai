'use strict';

const
	express = require('express'),
	kraken = require('kraken-js');


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
	onconfig: function (config, next) {
		require('./libs/startup').start(config, (error) => {
			next(error, config);
		});
	}
};

app = module.exports = express();
app.use(kraken(options));
// app.on('middleware:after:session', (eventArgs) => {
// 	//Give passport a way to serialize and deserialize a user. In this case, by the user's id.
// });
app.on('start', function () {
	console.log('Application ready to serve requests.');
	console.log('Environment: %s', app.kraken.get('env:env'));
});
