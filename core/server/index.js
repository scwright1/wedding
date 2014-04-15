var express = require('express'),
	async = require('async');

function boot(server) {

	catchExceptions();

	async.series([
		function(callback) {
			configServer(server, callback);
		},
		function(callback) {
			server.listen('3000', function() {
				console.log('Server Started');
				callback();
			});
		}
	],
	function(err, results) {
		if(err) {
			console.assert(err);
		}
	});
}

/**
 * [catchExceptions - fallback exception handling for error 500 on server]
 * @return {assert} [return assert and exit]
 */
function catchExceptions() {
	//Process uncaught exceptions (crude but catches the ones that slip through)
	process.on('uncaughtException', function(err, req, res, next) {
		console.error('Unhandled Exception');
	});
}

/**
 * [configServer description]
 * @param  {Function} callback [callback to async load]
 * @param {Object} server [the server object]
 * @return {callback}            [callback to async load]
 */
function configServer(server, callback) {
	try {
		console.warn('Configuring Server');
		server.use(express.static('../client'));
		server.set('view engine', 'hbs');
		server.set('views', '../client/views/errors');
		server.use(require('morgan')('dev'));
		server.use(require('body-parser')());
		server.use(require('method-override')());
		//not convinced we need this
		server.use(require('cookie-parser')('qL17C8iQnxPuDg50mYFDk56sdR0KuUm3'));
		console.log('✓ OK Express.use');
		return callback();
	} catch(e) {
		console.assert('Error in configServer', e);
	}
}


function init() {
	var server = express();
	boot(server);
}

module.exports = init;