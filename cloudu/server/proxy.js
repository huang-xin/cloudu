var runnable = function(cloudu){

	var deviceMgr = cloudu.deviceMgr;
	var socketMgr = cloudu.socketMgr;
	var connMgr = cloudu.connMgr;

	var Device = function(id){
		this.id = id;
	}

	cloudu.util.inherits(Device, cloudu.events.EventEmitter);

	var cluster = {};

	var sendCommand = function(conn, command, callback){
		var uucode = cloudu.utils.randomStr(12);
		cluster[uucode] = callback;
		command.uucode = uucode;
		console.log("command", command);
		puts(conn, JSON.stringify(command));
	}

	var puts = function(conn, data){
		conn.write(data + "!!!");
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
			console.log("device registry: ", data);
			var d = new Device(data.id);
			deviceMgr.add(d);
			var hanlder = function(socket, cmd){
				var command = {
					id : data.id,
					cmd : cmd.cmd,
					info : cmd.values
				}
				sendCommand(conn, command, function(data){
					var resp = {
						id : data.id,
						cmd : cmd.cmd,
						values : data.info || data.values,
						success : data.success
					}
					console.log("response", resp);
					socket.emit("message", resp);
					if(data.diff){
						socket.broadcast.emit("message", resp);
					}

				});
			}
			d.on("command", hanlder);
		}

	}

	var socketProxy = function(socket, cmd){
		var d = deviceMgr.find(cmd.id);
		d && d.emit("command", socket, cmd);
		if(!d){
			socket.emit("message", {
				id : cmd.id,
				action : cmd.action,
				values : {
					err : "device not found"
				},
				success : false
			});
		}
	}

	return {
		sock : socketProxy,
		conn : connProxy
	}
}

module.exports = runnable;

