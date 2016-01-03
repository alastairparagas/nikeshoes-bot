# Nike Shoe/Sneaker AutoBuying Bot
> Automatically buy a Nike Shoe/Sneaker that is expected to come out, given a Nike Store account.

Tracks shoe/sneaker names on Nike's Twitter feeds and based on the tracked shoe/sneaker name, if a relevant tweet with the link to the store to buy that shoe/sneaker appears on Nike's Twitter accounts, the bot proceeds to automatically buy that shoe. 

## Technologies Used

* [SpookyJS](https://github.com/SpookyJS/SpookyJS) - a Node.JS V8 bridge for CasperJS/PhantomJS.  CasperJS is an abstraction over the lower-level PhantomJS, which utilizes the Webkit engine (and thereby, a non-NodeJS compatible environment). SpookyJS allows us to work with PhantomJS on the V8 engine, thereby allowing us to get the programmable internet browsing capabilities of PhantomJS/CasperJS on NodeJS.
* [Twitter Streaming API](https://dev.twitter.com/streaming/overview) - Allows us to listen to a Twitter account's tweets in real-time.
* [Twitter NodeJS library](https://github.com/desmondmorris/node-twitter) - NodeJS Twitter client library

## Before starting up

Make sure to check on `config.js` to fill up required configuration information before starting up the bot. 