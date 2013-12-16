var net = require("net");
var options;

if(process.env && process.env.SERVER_SOFTWARE === 'bae/3.0'){
	options = {
		port : 30081,
		host : '180.149.144.13'
	}
}else{
	options = {
		port : 18088,
		host : '192.168.199.234'
	}
}

var str = "hello from ONE.";

var client = net.connect(options, function(){
	console.log("connected");
	client.write("hello server");
});

client.on('data', function(data) {
	data = data.toString();
	console.log(data);
});

client.on("end", function(){
	console.log("disconnected");
});