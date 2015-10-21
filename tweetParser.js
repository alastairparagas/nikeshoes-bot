"use strict";

var shoeOrderer = require('./shoeOrderer'),
	config = require('./config');

/**
*	Parses a tweet obtained from the Twitter API
*	@param {Object} tweet - Tweet Object from Twitter API
*	@link {https://dev.twitter.com/overview/api/tweets}
*/
function tweetParser(tweet) {
	
	var tweetUrls, nikeStoreLink;
	
	// No link? We can't do crap.
	if (!tweet || !tweet.entities || !tweet.entities.urls) {
		return;
	}
	tweetUrls = tweet.entities.urls;
	if (tweetUrls.constructor != Array) {
		return;
	}
	
	console.log("Streaming data from Twitter inbound --->");
	
	// Links available? Get the first swoo.sh link
	for (var i = 0; i < tweetUrls.length; i++) {
		var tweetUrlObject = tweetUrls[i];
		if (!tweetUrlObject || !tweetUrlObject.expanded_url) {
			return;
		}
		if (tweetUrlObject.expanded_url.indexOf("swoo.sh") == -1) {
			return;
		}
		nikeStoreLink = tweetUrlObject.expanded_url;
	}
	
	config.personsOrdering.forEach(function (personOrdering) {
		shoeOrderer(tweetUrlObject.expanded_url, personOrdering);
	});
	
}

module.exports = exports = tweetParser;