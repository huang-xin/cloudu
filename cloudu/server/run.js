var cloudu = {};
var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	path = require('path'),
	net = require('net');

var BAE = cloudu.BAE = require('./bae'),
	TCP = cloudu.TCP = require('./tcp'),
	MIME = cloudu.MIME = require('./mime');

var rootdir = __dirname + "/../../";
var appdir = rootdir + "app";
	
var entry = function(req, res){
	var u = url.parse(req.url);
	var pathname = u.pathname;
	var destname = appdir + pathname;
	
	if(pathname === '/'){
		destname += 'index.html';
	}
	
	fs.readFile(destname, function(err, data){
		if(err){
			res.writeHead(404);
			res.end("404 you know it.");
			return;
		}
		res.writeHead(200, {'Content-Type': MIME.lookupExtension(path.extname(destname))});
		res.end(data);
	});
}

var connMgr = {};
var socketMgr = {};

var httpServer = http.createServer(entry);
var io = require('socket.io').listen(httpServer);
httpServer.listen(BAE.port);
io.set("log level", 1);
io.sockets.on('connection', function (socket) {
	socketMgr.yss = socket;
	socket.on('message', function (data) {
		console.log("data_write_from_client:", data);
		connMgr.yss.write(JSON.stringify({
			open : data.on
		}));
	});
	socket.on('disconnect', function(){
		console.log('socket disconnected');
	});
});

var tcpServer = net.createServer(function(conn){
	
	connMgr.yss = conn;
	conn.on('data', function(data){
		try{
			data = JSON.stringify(data);
			socketMgr.yss.emit('message', {
				status : data.status
			});
		}catch(e){
			console.log("errrrrr");
		}
	});
	
	conn.on('end', function(){
		
	});

	conn.on('error', function(err){
		console.log(err);
		conn.end();
	});

});

tcpServer.listen(TCP.port);