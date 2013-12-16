var onDataFromSocket = function(socket, data){
	console.log("read message from socket", data);
}

var onErrorFromSocket = function(socket, err){
	console.log("read error from socket", err);
}

var onDataFromConn = function(conn, data){
	console.log("read message from tcp connection", data);
}

var onErrorFromConn = function(conn, data){
	console.log("read error from tcp connection", err);
}

exports.onDataFromSocket = onDataFromSocket;
exports.onErrorFromSocket = onErrorFromSocket;
exports.onDataFromConn = onDataFromConn;
exports.onErrorFromConn = onErrorFromConn;