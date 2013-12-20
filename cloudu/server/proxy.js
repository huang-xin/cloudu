var runnable = function(cloudu){

	var deviceMgr = cloudu.deviceMgr;
	var socketMgr = cloudu.socketMgr;
	var connMgr = cloudu.connMgr;

	var Device = function(id){
		this.id = id;
	}

	cloudu.util.inherits(Device, cloudu.events.EventEmitter);

	var cluster = {};

	var sendCommand = function(conn, cmd, callback){
		var uucode = cloudu.utils.randomStr(12);
		cluster[uucode] = callback;
		cmd.uucode = uucode;
		conn.write(JSON.stringify(cmd));
	}

	var connProxy = {
		push : function(conn, data){
			var d = deviceMgr.find(data.id);
			if(data.uucode){
				cluster[data.uucode](data);
				delete cluster[data.uucode];
			}else{
				console.log("uucode not found.", data);
			}
		},
		reg : function(conn, data){
			var d = new Device(data.id);
			deviceMgr.add(d);
			var hanlder = function(socket, action){
				var cmd = {
					id : data.id,
					action : action
				}

				sendCommand(conn, cmd, function(data){
					
					socket.broadcast.emit("message", {
						id : data.id,
						action : action,
						info : data.info,
						success : true
					});

					socket.emit("message", {
						id : data.id,
						action : action,
						info : data.info,
						success : true
					});

				});
			}
			d.on('listen', hanlder);
			d.on('on', hanlder);
			d.on('off', hanlder);
		}

	}

	var socketProxy = function(socket, data){
		var d = deviceMgr.find(data.id);
		d && d.emit(data.action, socket, data.action);
	}

	return {
		sock : socketProxy,
		conn : connProxy
	}
}

module.exports = runnable;

