var Cloudu = {};

Cloudu.reg = function(name){
	if(typeof Cloudu[name] === 'undefined'){
		Cloudu[name] = {};
	}else{
		console.log('duplicate module name');
	}
	return Cloudu[name];
};

(function(){
	
	var dispatcher = Cloudu.reg("dispatcher");
	dispatcher.onMessage = function(message){
		console.log("message", message);
		try{
			Cloudu[message.cmd][message.method].call(null, message.data);
		}catch(e){
			console.warn("cannot find handler", message);
		}
	}

	var socket = io.connect(location.origin);
	socket.on("message", dispatcher.onMessage);
	Cloudu.socket = socket;
})();