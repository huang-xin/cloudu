var cloudu = {};

cloudu.reg = function(name){
	if(typeof cloudu[name] === 'undefined'){
		cloudu[name] = {};
	}else{
		console.log('duplicate module name');
	}
	return cloudu[name];
};


(function(){
	
	var dispatcher = cloudu.reg("dispatcher");
	dispatcher.onMessage = function(message){
		console.log(message);
		try{
			cloudu[message.cmd][message.method].call(null, message.data);
		}catch(e){
			console.warm("cannot find handler", message);
		}
	}
	
	var socket = io.connect(location.origin);
	socket.on("message", dispatcher.onMessage);
	
	cloudu.socket = socket;
	
})();