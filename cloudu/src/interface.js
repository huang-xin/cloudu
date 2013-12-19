(function(){

	cloudu.listen = function(options){
		var cmd = {
			id : options.id,
			action : 'listen',
			keys : options.keys
		}
		cloudu.socket.emit('message', cmd);
		cloudu.device.task(options.id, "listen", options.onsuccess, options.onfail);
	}
	
	cloudu.on = function(options){
		var cmd = {
			id : options.id,
			action : 'on',
		}
		cloudu.socket.emit('message', cmd);
		cloudu.device.task(options.id, "on", options.onsuccess, options.onfail);
	}

	cloudu.off = function(options){
		var cmd = {
			id : options.id,
			action : 'off',
		}
		cloudu.socket.emit('message', cmd);
		cloudu.device.task(options.id, "off", options.onsuccess, options.onfail);
	}
	
})();