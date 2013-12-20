var cloudu = {};
var net = require('net');
var util = cloudu.util = require('util');
var events = cloudu.events = require('events');

var BAE = require('./bae');
var utils = cloudu.utils = require('./utils');
var config = cloudu.config = require('./config');

var connMgr = cloudu.connMgr = require('./connMgr')(cloudu);
	socketMgr = cloudu.socketMgr = require('./socketMgr')(cloudu),
	deviceMgr = cloudu.deviceMgr = require('./deviceMgr')(cloudu);

var dispatcher = require('./dispatcher')(cloudu);

//socket
console.log("BAE.port", BAE.port);
var io = require('socket.io').listen(BAE.port);
io.set("log level", 1);
io.sockets.on('connection', function (socket) {

	var id = socketMgr.add(socket);

	socket.on('message', function (data) {
		console.log("socket message", data);
		dispatcher.onSocketData(socket, data);
	});
	
	socket.on('disconnect', function(){
		socketMgr.remove(id);
	});

	socket.on('error', function(err){
		dispatcher.onSocketErr(socket, err);
		socketMgr.remove(id);
	});

});

//conn
var tcpServer = net.createServer(function(conn){

	var cuid = connMgr.add(conn);
	
	conn.on('data', function(data){
		data = data.toString();
		dispatcher.onConnData.apply(null, [conn, data]);
	});
	
	conn.on('end', function(){
		connMgr.remove(cuid);
	});

	conn.on('error', function(err){
		dispatcher.onConnErr.apply(null, [conn, err]);
		connMgr.remove(cuid);
		conn.end();
	});

});

tcpServer.listen(config.TCPport);