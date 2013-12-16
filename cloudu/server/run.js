var net = require('net');
var BAE = require('./bae');
var utils = require('./utils');

var TCPMgr = require('./TCPMgr')(utils);
	socketMgr = require('./socketMgr')(utils),
	deviceMgr = require('./deviceMgr');

var dispatcher = require('./dispatcher');


//socket
//localhost:8080
//bae3.0:18080
var io = require('socket.io').listen(BAE.port);
io.set("log level", 1);
io.sockets.on('connection', function (socket) {
	
	var uid = socketMgr.add(socket);
	
	socket.on('message', function (data) {
		dispatcher.onMessage.apply(null, [socket, data]);
	});
	
	socket.on('disconnect', function(){
		socketMgr.remove(uid);
	});

	socket.on('error', function(err){
		dispatcher.onError.apply(null, [socket, err]);
		socketMgr.remove(uid);
	});

});

var tcpServer = net.createServer(function(conn){
	
	

	conn.on('data', function(data){
		
	});
	
	conn.on('end', function(){
		
	});

	conn.on('error', function(err){
		conn.end();
	});

});

tcpServer.listen(TCP.port);