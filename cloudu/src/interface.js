(function(){
	
	//authorization
	var auth = cu.reg('auth');
	

	//swicher
	var switcher = cu.reg('switcher');

	switcher.on = function(data){
		data = data || 0;
		cu.socket.emit('message', { 
			id : data,
			on : true
		});
	}

	switcher.off = function(data){
		data = data || 0;
		cu.socket.emit('message', { 
			id : data,
			on : false
		});
	}
	
})();