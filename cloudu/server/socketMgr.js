var runnable = function(cloudu){

	var sockets = {};
	
	var manager = {

		add : function(socket){
			sockets[socket.id] = socket;
			return socket.id;
		},

		remove : function(id){
			delete sockets[id];
		}

	};
	
	return manager;
}

if(typeof module !='undefined' && module.exports){
    module.exports = runnable;
}