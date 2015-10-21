"use strict";

var Twitter = require('twitter'),
	
	config = require('./config'),
	tweetParser = require('./tweetParser'),
	
	TwitterClient = new Twitter({
		consumer_key: config.Twitter.consumerKey,
		consumer_secret: config.Twitter.consumerSecret,
		access_token_key: config.Twitter.accessTokenKey,
		access_token_secret: config.Twitter.accessTokenSecret
});



// Alastair's Twitter ID = 2990119742
// Nike Store Twitter ID = 17351972
// Nike Twitter ID = 415859364

var streamParams = {
	follow: '17351972,415859364',
	track: config.trackShoeNames
};
TwitterClient.stream('statuses/filter', streamParams, function (stream) {
    stream.on('data', tweetParser);
	stream.on('error', function (error) {
		console.log('ERROR: ' + error.message);
	});
});