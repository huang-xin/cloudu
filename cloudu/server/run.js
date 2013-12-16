//TIPS: net auth/socket auth/fe require/GruntDevJS

var cloudu = {};
var net = require('net');
var BAE = require('./bae');
var utils = cloudu.utils = require('./utils');
var config = cloudu.config = require('./config');

var connMgr = cloudu.connMgr = require('./TCPMgr')(cloudu);
	socketMgr = cloudu.socketMgr = require('./socketMgr')(cloudu),
	deviceMgr = cloudu.deviceMgr = require('./deviceMgr')(cloudu);

var dispatcher = require('./dispatcher')(cloudu);


//localhost:8080  -------- bae3.0:18080
var io = require('socket.io').listen(BAE.port);
io.set("log level", 1);
io.sockets.on('connection', function (socket) {
	
	var id = socketMgr.add(socket);
	
	socket.on('message', function (data) {
		dispatcher.onSocketData.apply(null, [socket, data]);
	});
	
	socket.on('disconnect', function(){
		socketMgr.remove(id);
	});

	socket.on('error', function(err){
		dispatcher.onSocketErr.apply(null, [socket, err]);
		socketMgr.remove(id);
	});

});

var tcpServer = net.createServer(function(conn){

	//DO auth
	var cuid = TCPMgr.add(conn);

	conn.on('data', function(data){
		dispatcher.onConnData.apply(null, [conn, data]);
	});
	
	conn.on('end', function(){
		TCPMgr.remove(cuid);
	});

	conn.on('error', function(err){
		dispatcher.onConnErr.apply(null, [conn, err]);
		TCPMgr.remove(cuid);
		conn.end();
	});

});

tcpServer.listen(config.TCPport);