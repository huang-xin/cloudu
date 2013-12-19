var runnable = function(cloudu){

	var L = 10;
	var connections = {};

	var manager = {

		add : function(conn){
			var uid = cloudu.utils.randomStr(L);
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