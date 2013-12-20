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
		host : '172.21.204.62' //'192.168.199.234'
	}
}

var lights = {
	'hz3u8mi6' : {
		id : 'hz3u8mi6',
		on : 0			//0代表关, 1代表开

	},
	'lbaezlsl' : {
		id : 'lbaezlsl',
		on : 0			//0代表关, 1代表开
	}
};

var client = net.connect(options, function(){

	client.puts = function(data){
		client.write(data + "!!!");
	};

	var reg1 = {
		action : "reg",
		type : "light",
		id : 'hz3u8mi6',
		info : {
			on : lights['hz3u8mi6'].on
		}
	};

	var reg2 = {
		action : "reg",
		type : "light",
		id : 'lbaezlsl',
		info : {
			on : lights['lbaezlsl'].on
		}
	}
	client.setNoDelay(true);
	client.puts(JSON.stringify(reg1));
	client.puts(JSON.stringify(reg2));
});

client.on('data', function(data) {
	//try{
		data = data.toString().slice(0,-3);

		data.split("!!!").forEach(function(item){

			item = JSON.parse(item);
			var action = item.action;
			var id = item.id;
			var uucode = item.uucode;

			if(action === "listen"){// return light status
				var retStatus = {
					uucode : uucode,
					action : "push",
					id : id,
					info : {
						on : lights[id].on
					}
				}

				client.setNoDelay(true);
				client.puts(JSON.stringify(retStatus));
				
			}else if(action === 'on'){
				lights[id].on = 1;
				console.log(id, "开灯");
				var res1 = {
					uucode : uucode,
					action : "push",
					id : id,
					info : {
						on : lights[id].on
					}
				}
				client.puts(JSON.stringify(res1));
			}else if(action === "off"){
				lights[id].on = 0;
				console.log(id, "关灯");
				var res2 = {
					uucode : uucode,
					action : "push",
					id : id,
					info : {
						on : lights[id].on
					}
				}
				client.setNoDelay(true);
				client.puts(JSON.stringify(res2));
			}else{
				console.log('unknown action');
			}

		});

		

	//}catch(e){
		//console.log('device error', e);
		//client.end();
	//}
});

client.on("end", function(){

});