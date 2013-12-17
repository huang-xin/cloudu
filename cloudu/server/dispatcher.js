var runnable = function(cloudu){

	var socketMgr = cloudu.socketMgr;
	var connMgr = cloudu.connMgr;
	var deviceMgr = cloudu.deviceMgr;

	var onSocketData = function(socket, data){
		console.log("data from socket", data.toString());
	}

	var onSocketErr = function(socket, err){
		console.log("error from socket", err);
	}

	var onConnData = function(conn, data){
		console.log("data from tcp connection", data.toString());
	}

	var onConnErr = function(conn, err){
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