var config		= require('./server/config'),
		console		= require('buggr');

function server() {
	return;
}

function start() {
	config.load().then(function() {
		if(process.env.NODE_ENV === 'development') console.emphasis('App Starting...');
		var srv = require('./server');
		srv();
	});
}

server.start = start;

module.exports = server;