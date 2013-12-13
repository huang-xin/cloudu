(function(){
	
	var switcher = cloudu.reg('switch');
	
	switcher.on = function(data){
		data = data || 0;
		cloudu.socket.emit('message', { 
			id : data,
			on : true 
		});
	}
	
	switcher.off = function(data){
		data = data || 0;
		cloudu.socket.emit('message', { 
			id : data,
			on : false 
		});
	}
	
})();