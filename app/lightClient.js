var net = require("net");
var options;

var mode = "local";

if(mode === 'bae'){
	options = {
		port : 18088,
		host : '180.149.144.13:30081'
	}
}else{
	options = {
		port : 18088,
		host : '172.22.133.48' //'192.168.199.234'
	}
}

var lights = {
	'hz3u8mi6' : {
		id : 'hz3u8mi6',
		status : 0			//0代表关, 1代表开

	},
	'lbaezlsl' : {
		id : 'lbaezlsl',
		status : 0			//0代表关, 1代表开
	}
};

var client = net.connect(options, function(){

	client.setNoDelay(true);

	var reg1 = {
		action : "reg",
		type : "light",
		id : 'hz3u8mi6',
		info : {
			status : lights['hz3u8mi6'].status
		}
	};

	var reg2 = {
		action : "reg",
		type : "light",
		id : 'lbaezlsl',
		info : {
			status : lights['lbaezlsl'].status
		}
	}

	client.write(JSON.stringify(reg1));
	
	client.write(JSON.stringify(reg2));
});

client.on('data', function(data) {
	try{
		data = JSON.parse(data.toString());
		var action = data.action;
		var id = data.id;
		var status = data.status;
		var uucode = data.uucode;

		if(action === "listen"){// return light status
			var retStatus = {
				uucode : uucode,
				action : "push",
				id : id,
				info : {
					status : lights[id].status
				}
			}
			client.write(JSON.stringify(retStatus));
		}else if(action === 'on'){
			lights[id].status = 1;
			console.log(id, "开灯");
			var res1 = {
				uucode : uucode,
				action : "push",
				id : id,
				info : {
					status : lights[id].status
				}
			}
			client.write(JSON.stringify(res1));
		}else if(action === "off"){
			lights[id].status = 0;
			console.log(id, "关灯");
			var res2 = {
				uucode : uucode,
				action : "push",
				id : id,
				info : {
					status : lights[id].status
				}
			}
			client.write(JSON.stringify(res2));
		}else{
			console.log('unknown action');
		}

	}catch(e){
		console.log('device error', e);
		//client.end();
	}
});

client.on("end", function(){

});