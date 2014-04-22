var fs				= require('fs'),
		when			= require('when'),
		console		= require('buggr'),
		path			= require('path'),
		paths			= require('./paths');

function checkEnvironment() {
	var env = process.env.NODE_ENV || undefined,
			config;

	if(!env) {
		return console.assert("error", "Failed to find an appropriate NODE_ENV.  Please check the environment and try again");
	} else {
		try {
			config = require(paths().config)[env];
		} catch(e) {
			return console.assert('error', e);
		}

		if(!config) {
			return console.assert('error', 'Failed to read valid config');
		}

		return when.resolve(config);
	}
}

function loadConfig() {
	var loaded = when.defer(),
			pendingConfig;
	//just check that we can read the config file
	fs.open(paths().config, 'r', function(err, fd) {
		if(err) {
			return console.assert('error', err);
		} else {
			fs.close(fd);
			pendingConfig = paths().config;
		}
	});

	when(pendingConfig).then(checkEnvironment).then(loaded.resolve).otherwise(loaded.reject);

	return loaded.promise;
}

module.exports = loadConfig;

