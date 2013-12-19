var runnable = function(cloudu){

	var proxy = require('./proxy')(cloudu);
	
	var onSocketData = function(socket, data){
		console.log("socket proxy", data);
		proxy.sock(socket, data);
	}

	var onSocketErr = function(socket, err){
		console.log("socket error", err);
	}

	var onConnData = function(conn, data){
		data = JSON.parse(data);
		console.log("connection proxy", data);
		proxy.conn[data.action](conn, data);
	}

	var onConnErr = function(conn, err){
		console.log("connection error", err);
	}

	return {
		onSocketData : onSocketData,
		onSocketErr : onSocketErr,
		onConnData : onConnData,
		onConnErr : onConnErr
	}

}

module.exports = runnable;