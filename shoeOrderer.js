"use strict";

var Spooky = require('spooky'),
	
	config = require('./config');

/**
*	Orders the shoe from the provided Nike Store Link using a scraper
*	@param {string} nikeStoreLink - Link to Nike Store page where shoe 
*		of interest is at
*	@param {Object} somePerson - Person to process shoe order for
*		- username (for Nike store)
*		- password (for Nike store)
*		- CVV (for transaction)
*		- shoe size
*		- shoe quantity
*/
function shoeOrderer(nikeStoreLink, somePerson) {
	
	// Initialize Spooky
	var spookyBrowser = new Spooky(config.Spooky, function (error) {
		if (error) {
			var errorStatement = new Error("Cannot initialize Spooky: " + 
										   error.message);
			console.log(errorStatement.message);
			throw errorStatement;
		}
		
		spookyBrowser.start(nikeStoreLink);
	});
	spookyBrowser.on('error', function (error) {
		console.log(error);
	});
	
	// Get correct shoe size
	spookyBrowser.then(function () {
		// Get the skuAndSize value of shoe for the person's shoe size
		var skuAndSize = this.evaluate(function () {
			var skuAndSize;
			$('select[name="skuAndSize"] option[name="skuId"]')
				.each(function (index, dom) {
					var currentSkuAndSize = $(dom).attr('value');
					if (String(currentSkuAndSize).indexOf(
						String(somePerson.shoeSize)) > -1) {
						skuAndSize = currentSkuAndSize;
					}
				});
			return skuAndSize;
		});
		// Fill and submit form
		this.fillSelectors('form.add-to-cart-form.nike-buying-tools', {
			'select[name="skuAndSize"]': skuAndSize,
			'select[name="qty"]': somePerson.shoeQuantity
		});
	}).thenClick('button#buyingtools-add-to-cart-button');
	
}

module.exports = exports = shoeOrderer;