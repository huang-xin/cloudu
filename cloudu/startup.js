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
	
	device.init = function(id, action, onsuccess, onfail){
		if(!devices[id]){ devices[id] = {}; }
		if(!devices[id][action]){
			devices[id][action] = {};
			devices[id][action].onsuccess = onsuccess;
			devices[id][action].onfail = onfail;
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
		var action = data.action;
		var success = data.success;
		var device = cloudu.device.get(data.id);
		if(success && device){
			device[action].onsuccess(data.info);
		}else{
			device[action].onfail(data.info);
		}
	}

	dispatcher.onDisconnect = function(data){
		console.log("onDisconnect", data);
	}

	var workAddr = "172.22.133.48:8080";
	var homeAddr = "192.168.199.234:8080";
	var baeAddr = "cloudu.duapp.com:18080";
	
	var socket = io.connect(baeAddr);
	socket.on("message", dispatcher.onData);
	socket.on("disconnect", dispatcher.onDisconnect);
	
	cloudu.socket = socket;
	
})();