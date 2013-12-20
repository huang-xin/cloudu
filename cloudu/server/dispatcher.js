var runnable = function(cloudu){

	var proxy = require('./proxy')(cloudu);
	
	var onSocketData = function(socket, data){
		proxy.sock(socket, data);
	}

	var onSocketErr = function(socket, err){
		console.log("socket error", err);
	}

	var onConnData = function(conn, data){
		data = data.split("!!!");
		data.forEach(function(item){
			var msg = JSON.parse(item);
			proxy.conn[msg.action](conn, msg);
		});
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