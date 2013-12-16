var runnable = function(utils){

	var L = 8;
	var sockets = {};
	
	var manager = {

		add : function(socket){
			var uid = utils.randomStr(8);
			socket.uid = uid;
			sockets[uid] = socket;
			return uid;
		},

		remove : function(uid){
			delete sockets[uid];
		}

	};

	return manager;
}

if(typeof module !='undefined' && module.exports){
    module.exports = runnable;
}