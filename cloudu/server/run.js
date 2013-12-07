var cloudu = {};
var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	path = require('path'),
	socket = require('socket.io');

var BAE = cloudu.BAE = require('./bae'),
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
			res.end();
			return;
		}
		
		res.writeHead(200, {'Content-Type': MIME.lookupExtension(path.extname(destname))});
		res.end(data);
	});
}

var httpServer = http.createServer(entry);
httpServer.listen(BAE.port);
console.log("http server listening on port", BAE.port);