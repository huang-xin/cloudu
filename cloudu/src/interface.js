(function(){

	cloudu.listen = function(id){
		if(typeof id === 'object'){ id = id.id; }
		var cmd = {
			id : id,
			cmd : 'listen'
		}
		cloudu.socket.emit('message', cmd);
	}
	
	cloudu.on = function(id){
		if(typeof id === 'object'){ id = id.id; }
		var cmd = {
			id : id,
			cmd : 'on',
		}
		cloudu.socket.emit('message', cmd);
	}

	cloudu.off = function(id){
		if(typeof id === 'object'){ id = id.id; }
		var cmd = {
			id : id,
			cmd : 'off',
		}
		cloudu.socket.emit('message', cmd);
	}

	cloudu.set = function(id, values){
		var cmd = {
			id : id,
			values : values,
			cmd : 'set'
		}
		cloudu.socket.emit('message', cmd);
	}

	cloudu.get = function(id){
		var cmd = {
			id : id,
			cmd : 'get'
		}
		cloudu.socket.emit('message', cmd);
	}
	
})();