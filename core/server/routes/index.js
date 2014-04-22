var echojs = require('echojs');

module.exports = function(server, config) {
	try {
		server.get('/', function(req, res, next) {
			res.render('index', {status:200, url: req.url});
		});
		server.get('/song', function(req, res, next) {
			var echo = echojs({
				key: config.api.echonest
			});

			// http://developer.echonest.com/docs/v4/song.html#search
			echo('song/search').get({
				artist: 'radiohead',
				title: 'karma police',
				bucket: ['id:7digital-US','tracks']
			}, function (err, json) {
				res.send(json.response);
			});
		});
	} catch(e) {
		console.assert('Router Error:', e);
	}
};