"use strict";

var config = {
    // Consult the Twitter Developer Documentation to obtain your own 
    // Twitter keys as required below.
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
		nikeStoreUsername: '', // Your Nike Store Username
		nikeStorePassword: '', // Your Nike Store Password
		shoeSize: '', // Consult Nike website for shoe size names
		shoeQuantity: '', // # of shoes you want to buy
		cvv: '' // Credit/Debit card cvv
	}],
	shoeNames: '' // Comma-delimited list of shoe names
};

module.exports = exports = config;