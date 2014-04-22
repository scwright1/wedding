var express		= require('express'),
		async			= require('async'),
		console		= require('buggr'),
		config		= require('./config'),
		configuration,
		dev = true;

function boot(server) {
	console.log('Bringing up System; Stand By...');
	catchExceptions();

	async.series([
		function(callback) {
			configServer(server, callback);
		},
		function(callback) {
			loadRoutes(server, callback);
		},
		function(callback) {
			server.listen(configuration.port, function() {
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
		server.use(express.static(config.paths().client));
		server.set('view engine', 'hbs');
		server.set('views', config.paths().server+'/views');
		server.use(require('morgan')('dev'));
		server.use(require('body-parser')());
		server.use(require('method-override')());
		//not convinced we need this
//		server.use(require('cookie-parser')('qL17C8iQnxPuDg50mYFDk56sdR0KuUm3'));
		if(dev) console.success('✓ OK Express.use');
		return callback();
	} catch(e) {
		console.assert('Error in configServer', e);
	}
}

/**
 * Load router
 * @param  {Object}   server   Contains server instance
 * @param  {Function} callback Callback to async load
 * @return {Function}            Callback to async load
 */
function loadRoutes(server, callback) {
	try {
		console.warn('Starting router');
		require('./routes')(server, configuration);
		server.use(function(req, res, next) {
			res.render('404', {status: 404, url: req.url});
		});
		return callback();
	} catch(e) {
		console.assert('Failed to start router:', e);
	}
}


function init() {
	configuration = config();
	if(configuration.mode === 'production') {
		dev = false;
	} else {
		console.log();
		console.warn('Starting in Development Mode');
		console.log();
	}
	var server = express();
	boot(server);
}

module.exports = init;