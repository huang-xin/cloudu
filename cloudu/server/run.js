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

//var httpServer = http.createServer(entry);
//httpServer.listen(BAE.port);

var io = require('socket.io').listen(BAE.port);
io.sockets.on('connection', function (socket) {
	socket.on('message', function (data) {
		console.log("data_write_from_client:", data);
	});
	socket.on('disconnect', function(){
		console.log('socket disconnected', socket);
	});
});

var tcpServer = net.createServer(function(conn){
	conn.on('data', function(data){
		conn.write(data.toString());
	});
	
	conn.on('end', function(){
		conn.write("close");
	});

});

tcpServer.listen(TCP.port);