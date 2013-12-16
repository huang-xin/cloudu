var runnable = function(utils){

	var L = 8;
	var connections = {};

	var manager = {

		add : function(conn){
			var uid = utils.randomStr(8);
			conn.uid = uid;
			connections[uid] = conn;
			return uid;
		},

		remove : function(uid){
			delete connections[uid];
		}

	};

	return manager;
}

if(typeof module !='undefined' && module.exports){
    module.exports = runnable;
}