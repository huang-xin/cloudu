if(cloudu){
	console.warn("cloudu exist!");
}
var cloudu = {};

cloudu.reg = function(name){
	if(typeof cloudu[name] === 'undefined'){
		cloudu[name] = {};
	}else{
		console.log('duplicate module name');
	}
	return cloudu[name];
};

(function(){
	
	var devices = {};
	var device = cloudu.reg("device");
	
	device.init = function(id, cmd, onsuccess, onfail){
		if(!devices[id]){ devices[id] = {}; }
		if(!devices[id][cmd]){
			devices[id][cmd] = {};
			devices[id][cmd].onsuccess = onsuccess;
			devices[id][cmd].onfail = onfail;
		}
	}

	device.get = function(id){
		return devices[id];
	}

	device.show = function(){
		return devices;
	}

})();

(function(){
	
	var dispatcher = cloudu.reg("dispatcher");
	
	dispatcher.onData = function(data){
		var cmd = data.cmd;
		var success = data.success;
		var device = cloudu.device.get(data.id);
		if(success && device){
			device[cmd].onsuccess(data.values);
		}else{
			device[cmd].onfail(data.values);
		}
	}

	dispatcher.onDisconnect = function(data){
		console.log("onDisconnect", data);
	}

	var workAddr = "172.22.133.48:8080";
	var homeAddr = "192.168.199.234:8080";
	var baeAddr = "cloudu.duapp.com:18080";
	var hackathonAddr = "172.21.204.62:8080";
	
	var socket = io.connect(homeAddr);
	socket.on("message", dispatcher.onData);
	socket.on("disconnect", dispatcher.onDisconnect);
	
	cloudu.socket = socket;
	
})();