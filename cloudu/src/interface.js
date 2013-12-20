(function(){

	cloudu.listen = function(options){
		var cmd = {
			id : options.id,
			action : 'listen',
			keys : options.keys
		}
		cloudu.socket.emit('message', cmd);
	}
	
	cloudu.on = function(options){
		var cmd = {
			id : options.id,
			action : 'on',
		}
		cloudu.socket.emit('message', cmd);
	}

	cloudu.off = function(options){
		var cmd = {
			id : options.id,
			action : 'off',
		}
		cloudu.socket.emit('message', cmd);
	}
	
})();