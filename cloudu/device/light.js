var runnable = function(cloudu){

	var deviceMgr = cloudu.deviceMgr;
	var socketMgr = cloudu.socketMgr;

	var Light = function(data){
		this.clouduid = data.clouduid;
		this.status = data.status;
		this.luminance = data.luminance || 100;
		this.desc = data.desc || "";
	}

	var actionHandler = {
		
		register : function(conn, data){
			var light = new Light(data);
			deviceMgr.add(light);
		},

		response : function(conn, data){
			var light = deviceMgr.find(data.clouduid);
		},

		listen : function(socket, data){
			var light = deviceMgr.find(data.clouduid);
			if(light){
				var result = {
					action : "listen",
					success : true,
					status : light.status,
					clouduid : light.clouduid
				};
				socket.emit("message", result);
			}else{
				socket.emit("message", {
					clouduid : light.clouduid,
					action : "listen",
					success : false,
					status : -1
				});
			}

		},

		open : function(data){
			var light = deviceMgr.find(data.clouduid);
			if(light){
				light.status = 1;//send to conn
			}
		},

		close : function(data){
			var light = deviceMgr.find(data.clouduid);
			if(light){
				light.status = 1;//send to conn
			}
		}
	}

	var clientProxy = function(socket, data){
		var handler = actionHandler[data.action];
		if(handler){
			handler(socket, data);
		}else{
			console.log("cannot find handler for", data.action, data);
		}
	}

	var proxy = function(conn, data){
		var handler = actionHandler[data.action];
		if(handler){
			handler.call(null, conn, data);
		}else{
			console.log("cannot find handler for", data.action, data);
		}
	}

	return {
		proxy : proxy,
		clientProxy : clientProxy
	}

}


module.exports = runnable;