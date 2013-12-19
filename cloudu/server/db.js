var config = require('./config.js');

var MongoClient = require('mongodb').MongoClient;

var getCollection;

MongoClient.connect(config.dbpath, function(err, db){
	if(err){throw err;}
	getCollection = db.collection;
});

exports.getCollection = getCollection;