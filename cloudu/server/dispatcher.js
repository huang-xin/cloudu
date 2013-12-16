var runnable = function(cloudu){

	var socketMgr = cloudu.socketMgr;
	var connMgr = cloudu.connMgr;

	var onSocketData = function(socket, data){
		console.log("data from socket", data);
	}

	var onSocketErr = function(socket, err){
		console.log("error from socket", err);
	}

	var onConnData = function(conn, data){
		console.log("data from tcp connection", data);
	}

	var onConnErr = function(conn, data){
		console.log("error from tcp connection", err);
	}

	return {
		onSocketData : onSocketData,
		onSocketErr : onSocketErr,
		onConnData : onConnData,
		onConnErr : onConnErr
	}

}

module.exports = runnable;