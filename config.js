var config = {
	development: {
		mode:	'development',
		url:	'http://localhost',
		port:	3000,
		api: {
			echonest:			'IQ7DEYZWIRGZM6JNO',
			digikey:			'7dbwe8vbj4na',
			digisecret:		'4b2uzj32nzgscjn3'
		}
	},
	production: {
		mode:	'production',
		url:	'http://localhost',
		port:	5000,
		api: {
			echonest:			'IQ7DEYZWIRGZM6JNO',
			digikey:			'7dbwe8vbj4na',
			digisecret:		'4b2uzj32nzgscjn3'
		}
	}
};

module.exports = config;