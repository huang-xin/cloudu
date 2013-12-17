var isBAE = require('./bae').isBAE;
var config = {};

//Connetion config
config.TCPport = 18088;
config.TCPaddr = isBAE ? "180.149.144.13:30081" : "localhost";

//Database config
config.dbname = isBAE ? 'YKxfiVZNYvCEVGbkNdMb' : "test";
config.dbhost = isBAE ? 'mongo.duapp.com' : '127.0.0.1';
config.dbport = isBAE ? 8908 : 27017;
config.appkey = isBAE ? "ikt2kVkcMIjTxHDu7S6yEU50" : void 0;
config.secretkey = isBAE ? "8mPj2HTTE0DhOgr5o41uwKNLfRLNIUfa" : void 0;

//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
config.dbpath = (function(username, password, db_host, db_port, db_name){
	
	var path = 'mongodb://';
	if(username){ path += username + ':'; }
	if(password){ path += password + '@'; }
	
	path += db_host + ':';
	path += db_port + '/';
	path += db_name + '/';
	
	return path;
	
})(config.appkey, config.secretkey, config.dbhost, config.dbport, config.dbname);

module.exports = config;
