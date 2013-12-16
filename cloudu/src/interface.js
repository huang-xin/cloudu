(function(){
	
	var switcher = Cloudu.reg('switch');
	
	switcher.on = function(data){
		data = data || 0;
		Cloudu.socket.emit('message', { 
			id : data,
			on : true 
		});
	}
	
	switcher.off = function(data){
		data = data || 0;
		Cloudu.socket.emit('message', { 
			id : data,
			on : false 
		});
	}
	
})();