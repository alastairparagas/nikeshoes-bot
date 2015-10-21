"use strict";

var config = {
	Twitter: {
		consumerKey: '',
		consumerSecret: '',
		accessTokenKey: '',
		accessTokenSecret: ''
	},
	Spooky: {
		child: {
			transport: 'http'	
		},
		casper: {
			userAgent: "Mozilla/5.0 (X11; Linux x86_64) " + 
			"AppleWebKit/537.36 (KHTML, like Gecko) " + 
			"Chrome/43.0.2357.125 Safari/537.36",
			XSSAuditingEnabled: true,
			loadImages: false,
			loadPlugins: false,
			clientScripts: ["node_modules/jquery/dist/jquery.min.js"]
		}
	},
	personsOrdering: [{
		nikeStoreUsername: '',
		nikeStorePassword: '',
		shoeSize: '',
		shoeQuantity: '',
		cvv: ''
	}],
	shoeNames: 'air mag,marty mcfly,back to the future'
};

module.exports = exports = config;