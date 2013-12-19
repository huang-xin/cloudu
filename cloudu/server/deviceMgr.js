var runnable = function(){

	var devices = {};
	var manager = {
		add : function(device){
			devices[device.id] = device;
		},
		remove : function(id){
			delete devices[id];
		},
		find : function(id){
			return devices[id];
		}
	};

	return manager;

}

module.exports = runnable;