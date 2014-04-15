function server() {
	return;
}

function start() {
	var srv = require('./server');
	srv();
}

server.start = start;

module.exports = server;