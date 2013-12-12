var net = require("net");
var options = {
	port : 18088,
	host : '172.22.133.13'
}

var str = "hello, tcp server!";

var client = net.connect(options, function(){
	console.log('client connected');
	client.write(str);
});

client.on('data', function(data) {
	console.log(data.toString());
	client.end();
});

client.on("end", function(){
	console.log('client disconnected');
});