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
	
	spookyBrowser
		// Get correct shoe size
		.then([{
			somePersonShoeQuantity: somePerson.shoeQuantity
		}, function () {
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
				'select[name="qty"]': somePersonShoeQuantity
			});
		}])
		// Add to Cart click
		.thenClick('button#buyingtools-add-to-cart-button')
		.wait(3000)
		// Go to Cart click
		.then(function () {
			var url = this.evaluate(function () {
				return $('a.header-cart-glyph-custom-class.js-header-cart-glyph-custom-class').attr('href');
			});
			this.open(url);
		})
		// Checkout click
		.then(function () {
			this.evaluate(function () {
				$('input#ch4_cartCheckoutBtn').click();
			});
		})
		.wait(8000)
		// Log in to person's account
		.then([{
			personEmail: somePerson.nikeStoreUsername,
			personPassword: somePerson.nikeStorePassword
		}, function () {
			this.fill('form#loginTunnelForm', {
				'tunnelEmailInput': personEmail,
				'tunnelPasswordInput': personPassword
			});
			this.wait(3000);
			this.evaluate(function() {
				$('input#ch4_loginButton').click();
			});
		}])
		.wait(10000)
		// Process CVV
		.then([{
			personCvv: somePerson.cvv
		}, function () {
			this.withFrame(2, function () {
				this.fill('form#creditCardForm', {
					'cvv': personCvv
				});
				this.wait(3000);
				this.evaluate(function () {
					$('button.js-confirmCVV').click();
				});
				this.wait(4000);
				this.evaluate(function () {
					$('input[type="submit"][name="billSubmit"]').click();
				});
			});
		}]);
		.wait(10000)
		// Actually place the order
		.then(function () {
			this.evaluate(function () {
				$('input[type="button"].ch4_btn.ch4_btnPlaceOrder').first().click();
			});
		})
		.wait(10000);
	
	spookyBrowser.run();
}

module.exports = exports = shoeOrderer;