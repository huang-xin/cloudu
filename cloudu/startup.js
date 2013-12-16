var cu = {};

cu.reg = function(name){
	if(typeof cu[name] === 'undefined'){
		cu[name] = {};
	}else{
		console.log('duplicate module name');
	}
	return cu[name];
};

(function(){
	
	var dispatcher = cu.reg("dispatcher");
	dispatcher.onMessage = function(message){
		console.log("message", message);
		try{
			cu[message.cmd][message.method].call(null, message.data);
		}catch(e){
			console.warn("cannot find handler", message);
		}
	}

	var socket = io.connect('http://192.168.199.153:8080');
	socket.on("message", dispatcher.onMessage);
	cu.socket = socket;
	
})();